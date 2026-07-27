import CameraScannerView from "@/components/views/cameraScannerView";
import { ScanResultView } from "@/components/views/scanResultView";
import { styles } from "@/styles/styles";
import { cameraScanResult } from "@/types/types";
import { CameraView } from "expo-camera";
import { GS1Engine, ProcessBarcodeResult } from 'expo-gs1-syntax-engine';
import { NavigationBar } from 'expo-navigation-bar';
import { useIsFocused } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface barcodeScanResult extends ProcessBarcodeResult {
  data: string,
  decoder: string,
  timeAtDecode: string,
  timestamp: number
}

async function initGS1Encoder(): Promise<GS1Engine> {
  const gs1encoder = new GS1Engine();
  await gs1encoder.init();

  // Configuring an instance using get/set properties
  gs1encoder.permitUnknownAIs = true;
  gs1encoder.setValidationEnabled(GS1Engine.validation.RequisiteAIs, true);
  gs1encoder.includeDataTitlesInHRI = true;
  gs1encoder.permitZeroSuppressedGTINinDLuris = false;

  return gs1encoder;
}

export default function Index() {
  const cameraRef = useRef<CameraView>(null);
  const isFocused = useIsFocused();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isCameraSupported, setIsCameraSupported] = useState(false);
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);

  const [isProcessingData, setIsProcessingData] = useState(false);
  const [lastCameraScanTime, setLastCameraScanTime] = useState(0);
  const [lastCameraScan, setLastCameraScan] = useState({} as cameraScanResult);

  const [scanResult, setScanResult] = useState<barcodeScanResult | null>(null);

  const [encoder, setEncoder] = useState<GS1Engine | null>(null);
  const [isloading, setIsLoading] = useState<boolean>(true);
  const [errorText, setErrorText] = useState<string>('');

  // init GS1 Syntax Engine
  useEffect(() => {
    let activeEncoder: GS1Engine | null = null;

    async function setup() {
      try {
        setIsLoading(true);
        // Calling init
        activeEncoder = await initGS1Encoder();
        setEncoder(activeEncoder);
        setErrorText('');
      } catch (err: any) {
        setErrorText(`Error initializing the C engine: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    }

    setup();

    // Memory cleanup: When a component is unmounted, the native context is closed
    return () => {
      if (activeEncoder) {
        // Freeing up GS1 Syntax Engine from C memory.
        console.log('Freeing up GS1 Syntax Engine from C memory.');
        activeEncoder.close();
      }
    };
  }, []);

  useEffect(() => {
    if (isFocused === true && isInitialized === false) {
      // Test device camera availability and features
      doCameraTests();
    }

  }, [isFocused, isInitialized])

  useEffect(() => {
    if (lastCameraScan.timestamp && lastCameraScanTime !== lastCameraScan.timestamp) {
      setIsProcessingData(true);
      setLastCameraScanTime(lastCameraScan.timestamp);
      processScannedData(lastCameraScan);
    }
  }, [lastCameraScan])

  const processScannedData = (scannData: cameraScanResult) => {
    if (!encoder) {
      setErrorText('GS1 Syntax Engine is not ready.');
      return;
    }
    const decodingResult = encoder.processBarcode(scannData.data);
    setScanResult({ ...decodingResult, ...scannData });
    setErrorText('');
    setIsProcessingData(false);
  }

  // Test device camera availability and features
  const doCameraTests = () => {
    const features = cameraRef.current?.getSupportedFeatures();

    if (features === undefined) {
      // device camera is not available
      setIsCameraSupported(false);
    } else {
      // device camera is available
      setIsCameraSupported(true);
      if (features.isModernBarcodeScannerAvailable && features.isModernBarcodeScannerAvailable === true) {
        // device camera barcode scanner is available
        setIsCameraEnabled(true);
      } else {
        // device camera barcode scanner is not available
        setIsCameraEnabled(false);
      }
    }
    setIsInitialized(true);
  }

  return (
    <SafeAreaView style={styles.containerBase} edges={['bottom', 'left', 'right']}>
      <View style={styles.containerBase}>

        <Text style={[styles.textCenter, styles.h3, styles.py3]}>Expo GS1 Syntax Engine Example App</Text>
        <Text style={[styles.textCenter, styles.pb3, styles.textGs1Blue]}>Use the round bottom button to scan barcodes.</Text>
        {(errorText === '') ? <></> : <Text style={[styles.textCenter, styles.pb3, styles.textDanger]}>{errorText}</Text>}

        <View style={[styles.px2]}>
          <Text style={[styles.h4, styles.textCenter]}>Scan Result</Text>
          <ScanResultView
            scanResult={scanResult}
          />
        </View>

        <CameraScannerView
          isInitialized={isInitialized && !isloading}
          isProcessingData={isProcessingData}
          isCameraSupported={isCameraSupported}
          isCameraEnabled={isCameraEnabled}
          setLastCameraScan={setLastCameraScan}
        />

        {(isInitialized === false) && <CameraView
          style={{ display: 'none' }}
          ref={cameraRef}
          mode={'picture'}
          facing={'back'}
          mute={false}
          responsiveOrientationWhenOrientationLocked
        />}
      </View>
      <NavigationBar style="dark" />
    </SafeAreaView>
  );
}
