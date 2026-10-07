# Changelog

## vxxx
- Update app by recommendation in docs (commit `a05b16f`)
    - Move type `barcodeScanResult` from `src/app/index.tsx` to `src/types/types.tsx`
      (removes circular import `index.tsx ↔ scanResultView.tsx`)
    - Rename `isloading` → `isEncoderInit` (flag now `true` when init finished)
    - Move `requestPermission()` into `useEffect`; show `Camera permissions not granted`
      instead of the scan button when permission is denied
    - Render `ViewFixedText` as a component (`<ViewFixedText viewText="…" />`)
    - Reset `isProcessingData` in the `if (!encoder)` branch of `processScannedData()`
- Add expo-camera config plugin and readability refactor (commits `cb9d7d2`, `2ef58f6`)
    - `app.json`: add `expo-camera` plugin (`cameraPermission`,
      `recordAudioAndroid: false`, `barcodeScannerEnabled: true`) – drops `RECORD_AUDIO`
      from the Android manifest on next `npx expo prebuild`
    - Rename `initGS1Encoder()` → `initGS1Engine()` and state `encoder` → `gs1Engine`
    - Wrap `processBarcode()` in `try/catch` with `setIsProcessingData(false)` in `finally`
- Add NavigationBar
    - change default theme to "dark"

## v1.0.0
- initial commit