import { barcodeScanResult } from "@/app/index";
import { styles } from "@/styles/styles";
import { FlatList, Text, View } from "react-native";

type ScanResultViewProps = {
    scanResult: barcodeScanResult | null
}

export function ScanResultView(props: ScanResultViewProps) {

    if (!props || !props.scanResult) {
        return <Text style={[styles.textCenter]}>No scan data</Text>
    }

    const scanData = props.scanResult;

    if (props.scanResult.success === false) {
        return (
            <View>
                <Text><Text style={[styles.textWarning, styles.fontWeightBold]}>Info: </Text>Scanned data can not be decoded by GS1 Barcode Syntax Engine.</Text>
                <Text><Text style={[styles.textWarning, styles.fontWeightBold]}>Reason: </Text>{`${scanData.errorReason}`}</Text>
                <Text style={[styles.textCenter, styles.py2, styles.textGs1Blue]}>Scanned data:</Text>
                <BlueText heading={"Barcode data:"} content={`${scanData.data}`} />
                <BlueText heading={"Barcode type:"} content={`${scanData.decoder}`} />
                <BlueText heading={"Scanned at:"} content={`${scanData.timeAtDecode}`} />
            </View>
        )
    }

    return (
        <View>
            <BlueText heading={"Barcode data:"} content={`${scanData.data}`} />
            <BlueText heading={"Barcode type:"} content={`${scanData.decoder}`} />
            <BlueText heading={"Scanned at:"} content={`${scanData.timeAtDecode}`} />
            <GS1AiDataView data={scanData.aiDataPairs} order={scanData.aiOrder} />
        </View>
    )
}

/**
 * Data structure for single decoded GS1 Application Identifier data
 */
type AIDataItem = {
    name: string;
    value: string;
};

/**
 * Data structure for decoded GS1 Application Identifier data
 */
type AIDataPairs = Record<string, AIDataItem>;

type GS1AiDataViewProps = {
    data: AIDataPairs | undefined
    order: string[] | undefined
}
function GS1AiDataView(props: GS1AiDataViewProps) {

    if (!props.data || !props.order) {
        return (
            <View>
                <Text style={[styles.textCenter, styles.textGs1Blue]}>No GS1 AI data.</Text>
            </View>
        );
    }

    const formattedData = Object.entries(props.data).map(([key, item]) => ({
        id: key,
        ...item,
    }));
    formattedData.sort((a, b) => {
        const order = props.order ?? [];
        return order.indexOf(a.id) - order.indexOf(b.id);
    });

    return (
        <View style={[styles.py2]}>
            <FlatList
                data={formattedData}
                renderItem={({ item }) => <TwoColorText heading={`${item.name}`} content1={`(${item.id})`} content2={item.value} />}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

type BlueTextProps = {
    heading: string,
    content: string
}
function BlueText(props: BlueTextProps) {
    return (<Text><Text style={[styles.textGs1Blue, styles.fontWeightBold]}>{props.heading}</Text> {props.content}</Text>);
}

type TwoColorTextProps = {
    heading: string,
    content1: string
    content2: string
}
function TwoColorText(props: TwoColorTextProps) {
    return (
        <Text>
            <Text style={[styles.textGs1Blue, styles.fontWeightBold]}>{props.heading} </Text>
            <Text style={[styles.textGs1Orange, styles.fontWeightBold]}>{props.content1} </Text>
            {props.content2}
        </Text>
        );
}