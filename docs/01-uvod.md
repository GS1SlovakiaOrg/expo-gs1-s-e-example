# 1. Úvod

## 1.1 Čo je táto aplikácia

**expo-gs1-s-e-example** je jednoúčelová (single-purpose) ukážková mobilná aplikácia postavená na
**Expo SDK 57** / **React Native 0.86**. Jej jediným účelom je demonštrovať, ako sa v aplikácii
postavenej na Expo alebo React Native dá použiť knižnica
**[expo-gs1-syntax-engine](https://github.com/GS1SlovakiaOrg/expo-gs1-syntax-engine)** na
dekódovanie (parsovanie a validáciu) údajov naskenovaných GS1 čiarových kódov.

Aplikácia **nie je produkčná aplikácia** – je to referenčná/ukážková aplikácia (example app),
zdrojový kód je možné voľne kopírovať ako štartovací bod pre vlastné riešenie.

| Vlastnosť | Hodnota |
|---|---|
| Názov balíka (`package.json`) | `expo-gs1-s-e-example` |
| Verzia | `1.0.0` |
| Popis | *This app serves as an example for GS1 Barcode Syntax Engine library.* |
| Autor | Viliam \<info@gs1sk.org\> (GS1SlovakiaOrg) |
| Licencia | MIT |
| Homepage | <https://github.com/GS1SlovakiaOrg/expo-gs1-s-e-example#readme> |
| Android applicationId | `com.expogs1sk.expogs1seexample` |
| URL schéma | `expogs1seexample` |
| Orientácia | portrait (zafixovaná) |
| Primárna platforma | Android (`npx expo run:android`) |

## 1.2 Funkčný rozsah

Aplikácia má **jedinú obrazovku** (jediný Stack screen – `index`).

1. **Spustenie skenera** – guľaté tlačidlo vpravo dole spustí natívny
   [Google Code Scanner](https://developers.google.com/ml-kit/vision/barcode-scanning/code-scanner)
   (na Android) resp. systémový skener (na iOS cez `CameraView.launchScanner()`).
2. **Normalizácia skenu** – z natívnej udalosti sa pripraví reťazec s AIM prefixom, rozpozná sa
   symbologia a prípadný GS1 separator (FNC1/GS, ASCII 29).
3. **Dekódovanie** – normalizované údaje sa odovzdajú do `GS1Engine.processBarcode()`.
4. **Zobrazenie výsledku** – názvy a hodnoty GS1 Application Identifiers (AI), prípadne chyba
   s dôvodom zlyhania, plus metadeta skenu (typ kódu, čas, surové údaje).
5. **Stavové a chybové hlášky** – loading, „kamera nie je podporovaná“, „kamera nie je povolená“,
   chyba inicializácie C engine.

Mimo rozsahu: história skenov, export, sieťové volania, viac obrazoviek, nastavenia, testy.

## 1.3 Príklad použitia (z README)

```text
Scan Result
Barcode data: ]d201085800000000091126071610Lot858GS21Serial01
Barcode type: GS1 Data Matrix (est.)
Scanned at:  06.10.2026 10:15:32:418
Lot / Batch Number (10) Lot858
Expiry date (17) 260716
Serial Number (21) Serial01
```

Referenčný screenshot indexovej obrazovky: `assets/readmeImages/scanExample.jpg`
(na tento súbor odkazuje `README.md`).

## 1.4 Základné pojmy

### GS1 Barcode Syntax Engine

Referenčná C-knižnica organizácie GS1 AISBL, ktorá dokáže:

- prijať údaje z čiarového kódu v rôznych formátoch (AIM scan data, bracketed AI reťazec,
  nebracketed AI reťazec, GS1 Digital Link URI),
- skontrolovať syntax a pravidlá pre konkrétne AI (validácie),
- vygenerovať **HRI** (Human-Readable Interpretation) – čitateľnú podobu údajov,
- vygenerovať **GS1 Digital Link URI**,
- vygenerovať **AI data pairs** (mapu `AI → {name, value}`) a poradie AI.

### Application Identifier (AI)

Dvoj až štvorciferný prefix v GS1 čiarovom kóde, ktorý určuje význam nasledujúcich údajov.
Príklady: `01` = GTIN, `17` = dátum exspirácie, `10` = číslo šarže, `21` = sériové číslo.

### AIM prefix (AIM symbology identifier)

Trojznakový prefix (napr. `]C1`, `]d2`, `]E0`) štandardizovaný organizáciou AIM, ktorý identifikuje
symbologiu a jej variant. Aplikácia ho pri dekódovaní pripája k dátam, aby engine vedel určiť symbologiu.

### FNC1 / GS separator

Riadiaci znak ASCII **29** (GP, `{GS}`), ktorý oddeľuje premenné dĺžky polí v GS1
element stringu. Pri skene sa prejavuje ako úvodný znak reťazca alebo znak vnútri dát.

## 1.5 Prehľad použitých technológií

| Kategória | Technológia | Verzia |
|---|---|---|
| Framework | Expo | `^57.0.16` |
| UI runtime | React Native | `0.86.2` |
| React | React | `19.2.3` |
| Routing | expo-router (file-based) | `~57.0.16` |
| Kamera / skener | expo-camera (`CameraView.launchScanner`) | `~57.0.4` |
| GS1 dekódovanie | **expo-gs1-syntax-engine** | `^0.1.8` |
| Navigačná lišta Android | expo-navigation-bar | `~57.0.2` |
| Ikony | `@react-native-vector-icons/ant-design` | `^13.1.2` |
| Jazyk | TypeScript (strict) | `~6.0.3` |
| Build | EAS Build / `expo prebuild` (CNG) | CLI `>= 21.0.2` |

> V repozitári je prítomný vygenerovaný priečinok `android/` (výsledok `npx expo prebuild`).
> iOS priečinok nie je prítomný.

## 1.6 Cieľové publikum dokumentácie

- vývojári, ktorí chcú použiť `expo-gs1-syntax-engine` vo vlastnej Expo/RN aplikácii,
- maintaineri tohto repozitára,
- kodoví recenzenti a integrátori.
