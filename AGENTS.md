# AGENTS.md – pravidlá pre OpenCode (expo-gs1-s-e-example)

Tento súbor sa **načíta automaticky pri inicializácii OpenCode** v tejto pracovnej zložke
(project root `AGENTS.md`). Jeho pravidlá sú záväzné pre každú reláciu a každú úlohu.

---

## 0. Povinný úvod každej úlohy (kontext)

Pred akýmkoľvek zásahom do kódu, odpoveďou na otázku alebo úpravou dokumentácie **musíš najprv
načítať kontext** v tomto poradí:

1. **[`SPECS.md`](SPECS.md)** – prečítať CELÝ (aktuálny stav projektu: stack, štruktúra,
   dátový tok, kontrakty, príkazy, známe problémy, platné pravidlá).
2. **[`docs/README.md`](docs/README.md)** – index dokumentácie; z neho vybrať a prečítať
   **len kapitoly relevantné k úlohe** (pozri tabuľku nižšie).
3. Až potom pracovať s kódom.

Príklad zadania *„oprav skener“* → prečítaj `SPECS.md` + `docs/README.md` +
`docs/03-datovy-tok-a-zivotny-cyklus.md` + `docs/04-komponenty-a-stav.md`.

Ak dokumentácia a kód si odporujú, **pravdu má kód** – nájdi rozdiel, oprav ho a **aktualizuj
`SPECS.md` aj príslušnú kapitolu v `docs/`**.

### Mapa úloh → dokumentácia

| Úloha | Povinné čítanie |
|---|---|
| Ktorokoľvek zásah do kódu | `SPECS.md`, `docs/README.md` |
| Zmeny v `src/app/*` (stav, hooky, tok) | `docs/03-datovy-tok-a-zivotny-cyklus.md`, `docs/04-komponenty-a-stav.md` |
| Zmeny komponentov / props | `docs/04-komponenty-a-stav.md` |
| Práca s GS1 engine, `processBarcode`, validáciami | `docs/05-gs1-syntax-engine.md` |
| `app.json`, `eas.json`, build, oprávnenia, `android/` | `docs/06-konfiguracia-a-build.md` |
| Štýly, farby, layout | `docs/07-dizajn-a-styly.md` |
| „Oprav známy problém“, „technický dlh“ | `docs/08-obmedzenia-a-znama-problemy.md` (P1–P15) |
| Architektúra, routing, závislosti | `docs/02-architektura.md` |
| Účel appky, pojmy, rozsah | `docs/01-uvod.md` |
| **Príkaz „Aktualizuj dokumentáciu“** | **celý postup v [§5](#5-špeciálny-príkaz-aktualizuj-dokumentáciu)** |

---

## 1. Expo HAS CHANGED

Read the exact versioned docs at <https://docs.expo.dev/versions/v57.0.0/> **before writing any
code**. Projekt beží na **Expo SDK 57 / React Native 0.86 / React 19.2** – nepoužívaj API z
starších verzií ani z „latest“ dokumentácie.

---

## 2. Pravidlá práce s kódom (z SPECS.md §8)

1. **Nikdy neupravuj `android/` ručne** (generované cez `npx expo prebuild`) → zmeny len
   cez `app.json` + `npx expo prebuild --clean`.
2. **Farby len cez `src/styles/Colors.tsx`**, štýly len cez `src/styles/styles.tsx`
   (žiadne hex literály priamo v komponentoch).
3. Pri `GS1Engine` **vždy** zaisti cleanup `close()` v `useEffect` (únik C pamäte).
4. Nové typy pridávať do `src/types/types.tsx` (rieši kruhový import P7).
5. Kód ostáva v **strict TypeScripte**; importy cez alias `@/…` (`@/*` → `./src/*`).
6. Texty UI sú pevné anglické – nepridávať i18n framework bez výslovnej požiadavky.
7. Zachovaj existujúci štýl kódu (utility štýly, `props` typovanie, žiadne nové závislosti
   bez súhlasu používateľa).

## 3. Overenie po zmene

- `npx tsc --noEmit` alebo `npm run lint` po úprave `.ts`/`.tsx` (ak je prostredie dostupné).
- Overiť volané API voči dokumentácii Expo SDK 57.
- **Aktualizovať `SPECS.md` a príslušnú kapitolu `docs/`** – inak je kontext neaktuálny.

## 4. Zdroj pravdy

| Poradie | Súbor | Úloha |
|---|---|---|
| 1 | `SPECS.md` | aktuálny kontext (vždy čítať ako prvé) |
| 2 | `docs/*` | detailná dokumentácia (01–08) |
| 3 | `README.md` | oficiálny readme projektu |
| – | `AGENTS.md` (tento) | pravidlá správania agenta |
| – | `CLAUDE.md` | len odkaz `@AGENTS.md` (pre iné nástroje; OpenCode V2 číta len `AGENTS.md`) |
| – | `ToDo.md`, `changelog.md` | plán zmien / história verzií |

---

## 5. Špeciálny príkaz: „Aktualizuj dokumentáciu“

Príkaz sa aktivuje, keď používateľ napíše správu obsahujúcu **„Aktualizuj dokumentáciu“**
(rovnako: „update docs“, „sync dokumentáciu“). Potom je **povinné** vykonať kontrolu
konzistencie medzi súbormi projektu a dokumentáciou a podľa výsledku zapracovať zmeny.

### 5.1 Krok 1 – Kontrola časov (vždy ako prvé)

1. Načítaj kontext podľa §0 (`SPECS.md` + `docs/README.md`).
2. Získaj **referenčný čas `T_doc`** = najnovší `LastWriteTime` medzi `SPECS.md` a `docs/*.md`.
3. Vyhľadaj súbory projektu **mladšie (neskôr zmenené) ako `T_doc`** – tie sú kandidátom na
   nezdokumentované zmeny.

```powershell
# T_doc = najnovší zápis dokumentácie
$Tdoc = Get-ChildItem SPECS.md, docs\*.md |
        Sort-Object LastWriteTime -Descending |
        Select-Object -First 1 -ExpandProperty LastWriteTime
Write-Host "T_doc: $Tdoc"

# Súbory projektu zmenené NESKÔR ako dokumentácia
Get-ChildItem -Recurse -File |
  Where-Object {
    $_.LastWriteTime -gt $Tdoc -and
    $_.FullName -notmatch '\\(node_modules|\.git|\.expo|\.vscode|\.claude|docs)\\' -and
    $_.Name -notin 'SPECS.md','AGENTS.md','CLAUDE.md','package-lock.json'
  } |
  Sort-Object LastWriteTime |
  Select-Object LastWriteTime, FullName
```

**Výnimky (nikdy nespúšťajú aktualizáciu dokumentácie):**

| Vylúčené | Dôvod |
|---|---|
| `node_modules/`, `.git/`, `.expo/`, `.vscode/`, `.claude/` | systémové/odvodené súbory |
| `SPECS.md`, `AGENTS.md`, `CLAUDE.md`, `docs/*` | ide o samotnú dokumentáciu |
| `package-lock.json` | auto-generovaný lock (mení sa pri každom `npm install`) |
| `android/**` | **generované** (`expo prebuild`) – nemení sa dokumentácia podľa neho; príčinu hľadaj v `app.json` / pluginoch |
| `.gradle/`, `build/`, `*.log` | artefakty buildu |

> Ak je k dispozícii git, doplň kontrolu o `git status --porcelain` a `git diff --stat`
> (obsahuje aj zmeny, ktoré ešte nemajú novší čas ako `T_doc` – napr. po `git checkout`).

### 5.2 Krok 2 – Analýza a rozhodnutie

| Výsledok kontroly | Konanie |
|---|---|
| Žiadne súbory mladšie ako `T_doc` | **Dokumentácia je aktuálna** → žiadne zápisy, len stručná správa |
| Súbory mladšie ako `T_doc` existujú | Prečítať obsah/`git diff` každého, zmapovať ho na kapitolu cez tabuľku v §0 a rozhodnúť: |

Rozhodovacie pravidlo pre každý súbor:

- **Ovplyvňuje dokumentované správanie** (zmena props, stavu, toku, konfigurácie, závislosti,
  príkazov, farieb, oprávnení, verejného API) → **zapracovať zmenu do príslušnej kapitoly
  `docs/` aj do `SPECS.md`** (sekcia, ktorú zmena ovplyvňuje).
- **Bez dopadu na dokumentáciu** (formatovanie, komentáre, premenovanie lokálnej premennej,
  zmena v súbore mimo mapy v §0) → **nedokumentovať**, uviesť dôvod v správe.
- Súbor spadá do viacerých tém → aktualizovať **všetky** dotknuté kapitoly naraz.
- Zmena mení verejné správanie alebo pridáva funkciu → dopísať riadok do `changelog.md`
  (do pracovnej sekcie `## vxxx`).

**Nikdy nemeň kód** počas tohto príkazu – upravuje sa len dokumentácia (`SPECS.md`, `docs/*`,
prípadne `changelog.md`). Ak pri analýze nájdeš chybu v kóde, zapíš ju do
`docs/08-obmedzenia-a-znama-problemy.md` (riadok P16+) namiesto opravy.

### 5.3 Krok 3 – Výstupná správa

Na konci **vždy uveď** výsledok v tabuľke:

| Súbor projektu | Čas zmeny vs. `T_doc` | Dopad | Aktualizovaná kapitola |
|---|---|---|---|
| `src/app/index.tsx` | +2 h | áno | `docs/03-…`, `SPECS.md §4` |
| `docs` – bez zmien | – | – | – |

A jednu z týchto vetiev:

- `✅ Dokumentácia aktualizovaná: <zoznam kapitol>` alebo
- `✅ Dokumentácia je aktuálna (žiadne zmeny v projekte neskôr ako $T_doc).`

