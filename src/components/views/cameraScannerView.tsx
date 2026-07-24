import { styles } from "@/styles/styles";
import { cameraScanResult } from "@/types/types";
import { Dispatch, SetStateAction } from "react";
import { Text, View } from "react-native";
import { ActivityIndicatorCentered } from "../activityIndicator/activityIndicatorCentered";
import { CameraScanner } from "../cameraScanner/cameraScanner";

type CameraScannerViewProps = {
    isInitialized: boolean,
    isProcessingData: boolean,
    isCameraSupported: boolean,
    isCameraEnabled: boolean,
    setLastCameraScan: Dispatch<SetStateAction<cameraScanResult>>
}

export default function CameraScannerView(props: CameraScannerViewProps) {

    if (props.isInitialized === false) {
        return (
            <ActivityIndicatorCentered
                heading="Loading"
                text="The availability of device camera is being verified."
            />
        );
    }
    if (props.isProcessingData === true) {
        return (
            <ActivityIndicatorCentered
                heading="Processing scan data"
                text=""
            />
        );
    }
    if (props.isCameraSupported === false) {
        return ViewFixedText('Camera is not supported.');
    }
    if (props.isCameraEnabled === false) {
        return ViewFixedText('Camera is not enabled. Enable camera and reopen app.');
    }

    return <CameraScanner setLastCameraScan={props.setLastCameraScan} />
}

function ViewFixedText(viewText: string) {
    return (
        <View style={styles.containerBase}>
            <Text>{viewText}</Text>
        </View>
    )
}