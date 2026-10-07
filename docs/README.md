# Dokumentácia – Expo GS1 Syntax Engine Example App

Kompletná technická dokumentácia k mobilnej aplikácii **expo-gs1-s-e-example** (React Native / Expo).

Aplikácia je ukážkovou (demo) aplikáciou pre knižnicu
[expo-gs1-syntax-engine](https://github.com/GS1SlovakiaOrg/expo-gs1-syntax-engine) –
Expo/React Native wrapper pre [GS1 Barcode Syntax Engine](https://github.com/gs1/gs1-syntax-engine).

---

## Obsah dokumentácie

| # | Súbor | Obsah |
|---|-------|-------|
| 1 | [01-uvod.md](01-uvod.md) | Účel aplikácie, funkčný rozsah, publikum, základné pojmy (GS1, AIM, HRI) |
| 2 | [02-architektura.md](02-architektura.md) | Technologický stack, štruktúra repozitára, routing, vrstvy a závislosti komponentov |
| 3 | [03-datovy-tok-a-zivotny-cyklus.md](03-datovy-tok-a-zivotny-cyklus.md) | Tok dát od skenu po zobrazenie, životný cyklus obrazovky, stavový automat UI, normalizácia skenu |
| 4 | [04-komponenty-a-stav.md](04-komponenty-a-stav.md) | Referencia všetkých komponentov, ich props, stavových premenných a hookov |
| 5 | [05-gs1-syntax-engine.md](05-gs1-syntax-engine.md) | Použité API knižnice `expo-gs1-syntax-engine`, konfigurácia engine, štruktúra výsledku |
| 6 | [06-konfiguracia-a-build.md](06-konfiguracia-a-build.md) | Konfigurácia Expo (`app.json`), EAS build (`eas.json`), skripty, oprávnenia, spustenie a build |
| 7 | [07-dizajn-a-styly.md](07-dizajn-a-styly.md) | Farebná paleta, typografia, utility štýly (`styles.tsx`), tlačidlá a ikony |
| 8 | [08-obmedzenia-a-znama-problemy.md](08-obmedzenia-a-znama-problemy.md) | Známe problémy, technický dlh, platformové špecifiká a návrhy ďalších zmien |

---

## Rýchly štart

```bash
npm install
npx expo prebuild
npx expo run:android
```

Podrobnosti: [06-konfiguracia-a-build.md](06-konfiguracia-a-build.md).

## Ilustrácia k dokumentácii

| Názov súboru | Použitie |
|---|---|
| `assets/readmeImages/scanExample.jpg` | Screenshot indexovej obrazovky, na ktorý odkazuje `README.md` |
| `assets/images/*` | Ikony, splash screen, favicon (konfigurované v `app.json`) |
| `assets/expo.icon/*` | iOS ikona a jej zdrojové podklady |

> Obsah obrázkov nie je súčasťou dokumentácie; uvádzajú sa len ich názvy a účel.

## Konvencie

- Kód je v TypeScripte (`strict: true`), alias `@/*` → `./src/*`, `@/assets/*` → `./assets/*`.
- Diagramy sú v [Mermaid](https://mermaid.syntax.com) syntaxe (zobrazia sa v GitHub/GitLab UI).
- Dokumentácia popisuje stav repozitára k verzii aplikácie **1.0.0** (Expo SDK 57, React Native 0.86).

## Licencia

MIT – pozri [../LICENSE](../LICENSE) a [08-obmedzenia-a-znama-problemy.md](08-obmedzenia-a-znama-problemy.md).
