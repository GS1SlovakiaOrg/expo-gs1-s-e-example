import { getDateTimeMilisecs } from '@/scripts/helpers';
import { styles } from '@/styles/styles';
import { cameraScanResult } from '@/types/types';
import { CameraView, useCameraPermissions } from "expo-camera";
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Alert, View } from 'react-native';
import { CameraBtn } from '../buttons/buttons';

type CameraViewProps = {
  setLastCameraScan: Dispatch<SetStateAction<cameraScanResult>>
}

export function CameraScanner(props: CameraViewProps) {
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    let subscription = {} as any;

    try {
      subscription = CameraView.onModernBarcodeScanned((event) => {
        const timestamp = Date.now();
        const timestring = getDateTimeMilisecs();
        const bcType = (event.raw?.startsWith(']C1')) ? 'C1' : `${event.type}`;
        const startsWithFnc1 = event.raw?.charCodeAt(0) === 29;
        const dataString = (startsWithFnc1 === true) ? event.data.slice(1) : event.data;
        const includesGS = event.raw?.includes(String.fromCharCode(29));
        const isEstimatedGS1Barcode = (`${event.type}` === '256') ? includesGS === true : startsWithFnc1;
        const barcodeTypeData = getBarcodeTypeData(bcType, isEstimatedGS1Barcode);

        const scanResult = {
          "data": `${barcodeTypeData.aimPrefix}${dataString}`,
          "decoder": `${barcodeTypeData.type}`,
          "timeAtDecode": `${timestring}`,
          "timestamp": timestamp
        };

        props.setLastCameraScan(scanResult);

        // Dismiss the native scanner view once a code is read
        if (CameraView.isModernBarcodeScannerAvailable) {
          CameraView.dismissScanner();
        }
      });
    } catch (error) {
      const scanResult = {
        "data": `error`,
        "decoder": `error`,
        "timeAtDecode": `error`,
        "timestamp": 0
      };
      props.setLastCameraScan(scanResult);
    }

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  const handlePress = async () => {
    // Launch the system's modern barcode scanner
    try {
      await CameraView.launchScanner();
    } catch (error) {
      // Expo catches 'Barcode scanning was cancelled' event as an error
      // Back button navigation is evaluated as 'Barcode scanning failed' event
      // Thus it is not possible to differentiate an error from Back button press
      if (`${error}`.includes('cancelled') === false) {
        createCameraAlert(`${error}`);
      }
    }
  };

  const createCameraAlert = (errorMsg: string) =>
    Alert.alert('Error', `Camera Scanner error. ${errorMsg}`, [
      {
        text: 'Close',
        style: 'cancel'
      },
    ]);

  // const handlePress = async () => {
  //   // Launch the system's modern barcode scanner
  //   await CameraView.launchScanner();
  // };

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    requestPermission();
  }

  return (
    <View style={[styles.containerAbsoluteBR, styles.backgroundWhite, styles.containerRounded]}>
      <View style={[styles.px3, styles.py3]}>
        <CameraBtn
          doOnClick={handlePress} />
      </View>
    </View>
  );
}
const getBarcodeTypeData = (barcodeType: string, isEstimatedGS1Barcode: boolean) => {
  const barcodeData = {
    "0": {
      type: "unknown",
      aimPrefix: "null"
    },
    "4096": {
      type: "AZTEC",
      aimPrefix: "]z0"
    },
    "8": {
      type: "Codabar",
      aimPrefix: "]F0"
    },
    "1": {
      type: "Code 128",
      aimPrefix: "]C0"
    },
    "C1": {
      type: "GS1 128",
      aimPrefix: "]C1"
    },
    "2": {
      type: "Code 39",
      aimPrefix: "]A0"
    },
    "4": {
      type: "Code 93",
      aimPrefix: "]G0"
    },
    "16": {
      type: (isEstimatedGS1Barcode === true) ? "GS1 Data Matrix (est.)" : "Data Matrix",
      aimPrefix: (isEstimatedGS1Barcode === true) ? "]d2" : "]d0"
    },
    "32": {
      type: "EAN-13",
      aimPrefix: "]E0"
    },
    "64": {
      type: "EAN-8",
      aimPrefix: "]E4"
    },
    "128": {
      type: "ITF",
      aimPrefix: "]I0"
    },
    "2048": {
      type: "PDF-417",
      aimPrefix: "]L1"
    },
    "256": {
      type: (isEstimatedGS1Barcode === true) ? "GS1 QR Code (est.)" : "QR Code",
      aimPrefix: (isEstimatedGS1Barcode === true) ? "]Q3" : "]Q1"
    },
    "-1": {
      type: "unknown",
      aimPrefix: "null"
    },
    "512": {
      type: "UPC-A",
      aimPrefix: "]E0"
    },
    "1024": {
      type: "UPC-E",
      aimPrefix: "]E0"
    }
  }

  if (Object.keys(barcodeData).includes(barcodeType)) {
    return barcodeData[barcodeType as keyof typeof barcodeData];
  } else {
    return barcodeData["0"];
  }
}
