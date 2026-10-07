# 8. Obmedzenia, známe problémy a ďalší vývoj

## 8.1 Funkčné obmedzenia (očakávané pri demo app)

| # | Obmedzenie | Popis |
|---|---|---|
| 1 | Iba jedna obrazovka | žiadna história skenov, nastavenia, export |
| 2 | Iba Android overené | `README.md` uvádza len `npx expo run:android`; iOS priečinok nie je vygenerovaný |
| 3 | Iba offline | výsledky sa nikam neodosielajú |
| 4 | Jazyk | pevné anglické texty, bez i18n |
| 5 | Dark mode | `userInterfaceStyle: automatic`, ale štýly sú fixné (biele pozadie) |
| 6 | Bez testov | v repozitári nie sú unit/e2e testy ani `jest` konfigurácia |
| 7 | Bez CI | nie je prítomná GitHub Actions/workflow konfigurácia |
| 8 | Expo Updates vypnuté | `expo.modules.updates.ENABLED = false` – žiadne OTA aktualizácie |
| 9 | Posledný výsledok sa nikdy nečistí | po úspešnom skene zostáva na obrazovke (nie je „Clear“) |
| 10 | Web nie je plnohodnotný | `expo-gs1-syntax-engine` má web fallback (`ExpoGs1SyntaxEngineModule.web.ts`), no skener `launchScanner` je Android/iOS only |

## 8.2 Známe problémy / technický dlh

> Kód nebol menený touto dokumentáciou; nasleduje analytický prehľad pozorovaní v zdrojovom kóde.
> Stav **✅ opravené** / **⚠ čiastočne** označuje problémy vyriešené commitmi
> `a05b16f` a `2ef58f6` (07.10.2026); pôvodný popis ostáva uvedený pre kontext.

| # | Stav | Lokalita | Problém | Dopad | Odporúčanie |
|---|---|---|---|---|---|
| P1 | ✅ opravené | `cameraScanner.tsx` (effect) | pôvodne `requestPermission()` volané **priamo počas renderu**; teraz je vo `useEffect` závislom od `[permission, hasCameraPerms]` | pôvodne: opakované re-render/volania (React strict mode); zostal zakomentovaný pôvodný blok kódu | odstrániť zakomentovaný starý kód (render-time `requestPermission()` a starý `handlePress`) |
| P2 | otvorený | `cameraScanner.tsx` (listener) | `CameraView.dismissScanner()` je podľa dokumentácie Expo SDK 57 **iOS-only**; na Androide sa skener zatvorí automaticky | volanie na Androide je nadbytočné; ak by hodilo výnimku, *vnútri callbacku* ju nič nezachytí (try/after-the-fact blok obalí len registráciu listenera) | podmieniť platformou (`Platform.OS === 'ios'`) a pridať vlastný try/catch v callbacku |
| P3 | otvorený | `cameraScanner.tsx` | `event.raw` **nie je dokumentované** v type `ScanningResult` (docs SDK 57 uvádzajú len `data` a `type`); kód používa `event.raw?.…` | ak `raw` chýba, GS1 detekcia (`startsWithFnc1`) je `undefined`/false → kód nebude označený ako GS1 | overiť dostupnosť `raw` v použitej verzii `expo-camera`; mať fallback na `data.charCodeAt(0) === 29` |
| P4 | otvorený | `cameraScanner.tsx` (`catch`) | pri chybe registrácie listenera sa nastaví `timestamp: 0` | efekt v `index.tsx` podmieňuje `lastCameraScan.timestamp` truthiness → sken sa **nespracuje**, chyba sa nikde nezobrazí | nastaviť reálny timestamp a zobraziť `errorText` |
| P5 | ✅ opravené | `index.tsx` (`processScannedData`) | vetva `if (!encoder)` vracala skôr, než sa stihol `setIsProcessingData(false)`, a chýbal `try/finally` okolo `processBarcode()`; teraz je `setIsProcessingData(false)` vo **`finally`** a `processBarcode()` je v `try/catch` (chyba → `errorText: 'GS1 Syntax Engine error'`) | – (UI sa nemôže zaseknúť na „Processing scan data“) | – |
| P6 | otvorený | `index.tsx` | `doCameraTests()` sa viaže na `cameraRef` **skrytého** `CameraView`, ktorý sa odmontuje po `isInitialized=true` | ak by sa test mal opakovať (napr. po zmene oprávnení), ref už nie je dostupný | nechať ref počas života obrazovky alebo presunúť test inam |
| P7 | ✅ opravené | `src/types/types.tsx` | `barcodeScanResult` bol definovaný v `index.tsx` a importovaný späť zo `scanResultView.tsx` → kruhová závislosť; typ je teraz presunutý do `src/types/types.tsx` | – (kruh `index.tsx ↔ scanResultView.tsx` zanikol) | – |
| P8 | ✅ opravené | `index.tsx` | `isloading` (preklep) premenované na **`isEncoderInit`** so zmenenou semantikou (`true` = init skončený) a stav `encoder` → **`gs1Engine`** (`setGs1Engine`), funkcia `initGS1Encoder()` → `initGS1Engine()` | – | – |
| P9 | ✅ opravené | `cameraScannerView.tsx` | `ViewFixedText()` bola funkcia volaná ako `ViewFixedText('text')`; teraz je komponent s props `{ viewText }` a volá sa `<ViewFixedText viewText="…" />` | – | – |
| P10 | otvorený | `helpers.ts` | `calculateCheckDigit()` je **nevyužitý** duplikát metódy `GS1Engine.calculateCheckDigit()` | mŕtvy kód | odstrániť alebo delegovať na knižnicu |
| P11 | otvorený | `helpers.ts` | `getDateTimeMilisecs()` nepoužíva `padStart`, sekundy/ms sa nezapisujú na 2/3 číslice | nejednotný formát času (`06.10.2026 9:5:3:7`) | použiť `padStart(2,'0')` / `padStart(3,'0')` alebo `Intl.DateTimeFormat` |
| P12 | otvorený | `scanResultView.tsx` | `FlatList` (zoznam AI) je vnorený vo flex kontajneri v rámci jednej obrazovky bez samostatného scroll kontajnera | pri veľkom počte AI môže byť zoznam orezaný namiesto scrollu; zároveň sa ťažko kombinuje so scrollovaním celej stránky | použiť `map()` + scrollovať celú obrazovku, alebo spraviť z hlavnej obrazovky `FlatList` |
| P13 | otvorený | `index.tsx` | deduplikácia skenov cez `Date.now()` – dva skeny v tej istej ms by sa zlúčili | teoretická strata skenu | použiť unikátne id (napr. counter) |
| P14 | otvorený | `cameraScanner.tsx` | mapa typov kódov končí na `-1`/`0` (unknown) – chýbajú napr. RM (DataBar) kľúče | neznáme symbologie sa zobrazia ako „unknown“ | doplniť podľa ML Kit `Barcode.FORMAT_*` |
| P15 | otvorený | `README.md` vs kód | README uvádza „single Stack screen“ a „bottom round button“, ale nezmieňuje oprávnenia ani požiadavku GMS (Google Code Scanner) | nováčik môže naraziť na zariadeniach bez Google služieb | doplniť do README |
| P16 | otvorený | `cameraScanner.tsx` (import) | `import { Text } from 'expo-router/build/react-navigation'` – **interná (neverejná) cesta** `build/` namiesto `react-native`; ide o React Navigation wrapper, ktorý navyšuje `colors.text` + `fonts.regular` z témy | text *Camera permissions not granted* má inú farbu/písmo než zvyšok appky (RN `Text`); závisí od internej štruktúry `expo-router`, ktorá sa môže zmeniť pri update (zatiaľ sa compile – `tsc --noEmit` je čistý) | importovať `Text` z `react-native` (konzistentne s ostatnými komponentmi) |
| P17 | otvorený | `cameraScanner.tsx` (effect permissions) | podmienka `if (hasCameraPerms === false)` číta **starú** hodnotu stavu (nie čerstvé `permission.granted`) a effect závisí od `[permission, hasCameraPerms]` | `requestPermission()` sa spúšťa až v ďalšom behu effectu; ak `requestPermission()` pri zamietnutí vráti nový objekt `permission`, effect sa spustí znova → **hrozí opakované (smyčkové) volanie žiadosti o oprávnenie**; navyše pri `hasCameraPerms === undefined` sa renderuje text *Camera permissions not granted* | podmieniť na čerstvú hodnotu (`permsVal === false`) + zabrániť opakovaniu (napr. ref „už som žiadal“), prípadne zúžiť závislosti effectu |

## 8.3 Platformové špecifiká

| Funkcia | Android | iOS |
|---|---|---|
| `CameraView.launchScanner()` | Google Code Scanner (vyžaduje GMS) | `DataScannerViewController` (iOS 16+) |
| `CameraView.dismissScanner()` | automatické po načítaní kódu (volanie je nadbytočné) | **vyžadované** na zatvorenie modalu |
| `ScanningOptions` (barcodeTypes atď.) | podľa dokumentácie nie je použiteľné | áno (filtrácia typov kódov) |
| `getSupportedFeatures()` | áno | áno |
| `screenOrientation` portrait | zafixované v Manifeste | z `app.json` |
| Navigačná lišta | `expo-navigation-bar` (`style: dark`) | – |
| Hĺbka/spätná navigácia | `predictiveBackGestureEnabled: false` | – |

## 8.4 Bezpečnosť a súkromie

- Aplikácia **neodosiela žiadne údaje** na server; dekódovanie prebieha lokálne v natívnom C engine.
- Oprávnenia: `CAMERA` (nevyhnutné), plus štandardné Expo povolenia pridané do Manifestu
  (`INTERNET`, `VIBRATE`, `READ/WRITE_EXTERNAL_STORAGE` ≤ SDK 32, `SYSTEM_ALERT_WINDOW`).
  `RECORD_AUDIO` sa už **nepridáva** – plugin `expo-camera` je v `app.json` nastavený na
  `recordAudioAndroid: false` (prejaví sa po `npx expo prebuild --clean`; starší vygenerovaný
  manifest ho ešte obsahuje).
- Odporúčanie: pre produkčnú aplikáciu prehodnotiť nutnosť `SYSTEM_ALERT_WINDOW`
  (minimalizácia oprávnení) – pridáva sa konfiguráciou `app.json → android.permissions`;
  minimalizácia `RECORD_AUDIO` je už vyriešená cez plugin `expo-camera`.
- Obsah kódu pochádza z dôveryhodného zdroja (používateľ), no `processBarcode` spracováva
  ľubovoľný reťazec – engine je na to navrhnutý (validácia vstupu na strane C knižnice).

## 8.5 Changelog a plán (podľa repozitára)

`changelog.md`:

| Verzia | Zmeny |
|---|---|
| `vxxx` (pracovná) | Pridaná `NavigationBar`, predvolená téma „dark“ |
| `vxxx` (pracovná) | Opravy podľa `docs/` (commit `a05b16f`): typ `barcodeScanResult` presunutý do `src/types/types.tsx`, `isloading` → `isEncoderInit`, `requestPermission()` presunuté do `useEffect` + fallback text *Camera permissions not granted*, `ViewFixedText` ako komponent, `setIsProcessingData(false)` aj vo vetve chyby |
| `vxxx` (pracovná) | Pridaný plugin `expo-camera` do `app.json` (`cameraPermission`, `recordAudioAndroid: false`, `barcodeScannerEnabled: true`); premenovanie `initGS1Encoder` → `initGS1Engine` a stavu `encoder` → `gs1Engine`; `processScannedData()` zabalené do `try/catch/finally` |
| `v1.0.0` | initial commit |

`ToDo.md` – obsahuje len nadpis `# ToDo` (zoznam úloh je zatiaľ prázdny).

### Návrh backlogu (odvodený z analýzy)

```mermaid
flowchart TD
    B[Backlog] --> T1["Refactor: odstrániť zakomentovaný kód v cameraScanner<br/>(premenovanie encoder → gs1Engine je hotové)"]
    B --> T2["Robustnosť: zobrazenie chýb listenera (P4)<br/>(try/finally pri processScannedData je hotové)"]
    B --> T3["Permissions: opraviť podmienku v useEffect (P17)<br/>– čerstvá hodnota + ochrana proti opakovaniu"]
    B --> T4["Platform: dismissScanner len na iOS,<br/>overiť event.raw"]
    B --> T5["UX: tlačidlo Clear, počet AI, zobrazenie HRI<br/>a DL URI (už ich engine vracia)"]
    B --> T6["Kvalita: unit testy (helpers, mapovanie typov),<br/>lint v CI"]
    B --> T7["Dokumentácia: README rozšíriť o oprávnenia<br/>a požiadavku Google Code Scanner"]
    B --> T8["Kód: Text importovať z react-native (P16)"]
```

## 8.6 Nevyužitý potenciál knižnice

Engine už vracia dáta, ktoré aplikácia nezobrazuje – vhodné rozšírenia UI:

| Pole výsledku | Možné zobrazenie |
|---|---|
| `hri` | čitateľný HRI riadok (vrátane oddeľovača `--` pri kompozitných kódoch) |
| `dlUri` | klikateľná GS1 Digital Link URI (`expo-web-browser` je už v závislostiach) |
| `dataStr` / `aiDataStr` | surové vs. bracketed údaje (napr. pre zdieľanie) |
| `symbologyName` | automatické určenie symbologie namiesto odhadu „(est.)“ |
| `errorMarkup` | zvýraznenie chybných znakov v údajoch |
| `aimPrefix` | zobraziť AIM prefix samostatne |
