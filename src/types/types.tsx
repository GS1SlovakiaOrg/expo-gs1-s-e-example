import { ProcessBarcodeResult } from "expo-gs1-syntax-engine";

export type dateString = string | number;

export type cameraScanResult= {
    data: string;
    decoder: string;
    timeAtDecode: string;
    timestamp: number;
}

export interface barcodeScanResult extends ProcessBarcodeResult {
  data: string,
  decoder: string,
  timeAtDecode: string,
  timestamp: number
}