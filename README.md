# Expo GS1 Barcode Syntax Engine Example App

This app serves as an example for [Expo GS1 Syntax Engine](https://github.com/GS1SlovakiaOrg/expo-gs1-syntax-engine) library.

It demonstrates how [Expo GS1 Syntax Engine](https://github.com/GS1SlovakiaOrg/expo-gs1-syntax-engine) library can be used in [Expo](https://docs.expo.dev/) or [React-Native](https://reactnative.dev/docs/environment-setup) mobile apps to decode scanned barcode data.

## Installation

1. Install dependencies

```bash
npm install
```

2. Prebuild app

```bash
npx expo prebuild
```

3. Run on Android

```bash
npx expo run:android
```

## Usage

The app has only single Stack screen.

![Screenshot of the app index screen](/assets/readmeImages/scanExample.jpg)

The bottom round button launches [Google Code Scanner](https://developers.google.com/ml-kit/vision/barcode-scanning/code-scanner). After successfull barcode scan, the data are passed to [Expo GS1 Syntax Engine](https://github.com/GS1SlovakiaOrg/expo-gs1-syntax-engine) and the decoding result is displayed on the main screen. 

## License

MIT