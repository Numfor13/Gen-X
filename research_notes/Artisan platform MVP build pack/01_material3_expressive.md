# Material 3 Expressive: implementation-ready study for a React + Next.js (App Router) frontend (as of 12 Nov 2026)

Scope: what M3 Expressive is, every foundation (color, type, shape, motion, elevation/state, layout), the component catalogue, accessibility for low-literacy users on cheap Android phones (Cameroon artisan marketplace), and the best web stack.

Labels used throughout:
- **[OFFICIAL]**: Google primary source (androidx Compose Material3 token source files, material-color-utilities source, design.google, developer.android.com, Google Fonts docs).
- **[COMMUNITY]**: third-party libraries, articles, ports.
- **[INFERENCE]**: my derivation or recommendation. Verify before treating as fact.

Method note: m3.material.io pages are client-rendered and could not be fetched. The most precise official numbers come from the **androidx Compose Material3 token files** (`compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/*.kt`, fetched from the androidx-main branch on 12 Nov 2026). These files are generated from Google's design-token pipeline, so they are the closest machine-readable stand-in for the m3.material.io spec tables.

---

## 1. What M3 Expressive is, its research basis and principles, and how it differs from baseline M3

### Takeaway
M3 Expressive is an evidence-based extension of Material 3 (not a new major version). It was announced on 13 May 2025 (The Android Show: I/O Edition) and shipped to Pixels in Android 16 QPR1 (September 2025) and in Wear OS 6. It uses emphasis through color, shape, size, motion and containment so that key actions are found faster. It adds a spring-based motion scheme, a 35-shape library with morphing, emphasized type, new corner sizes, five new components (button groups, FAB menu, loading indicator, split button, toolbars), and expanded button and FAB size ranges. Google's research found it works only when familiar patterns and **text labels are kept**. That finding directly matters for low-literacy users.

### Cited Findings
- [OFFICIAL] The research base is **46 separate research studies**, hundreds of designs, and **more than 18,000 participants** worldwide. Methods included eye tracking, surveys, focus groups, experiments and usability testing. — [design.google: Expressive Material Design research](https://design.google/library/expressive-material-design-google-research)
- [OFFICIAL] Expressive designs were preferred across all age groups, most strongly by 18–24-year-olds (**up to 87%**). A strong minority preferred calmer versions. — [design.google](https://design.google/library/expressive-material-design-google-research)
- [OFFICIAL] Participants spotted key UI elements **up to 4x faster** across 10 apps. In an email case study, the enlarged Send button was found 4x faster. — [design.google](https://design.google/library/expressive-material-design-google-research)
- [OFFICIAL] Users aged 45+ located key elements about as fast as younger users, which removed the usual age gap in fixation time. — [design.google](https://design.google/library/expressive-material-design-google-research)
- [OFFICIAL] Desirability rose: subculture perception +32%, modernity +34%, rebelliousness +30%. Expressive designs scored higher on "energetic", "playful" and "friendly". — [design.google](https://design.google/library/expressive-material-design-google-research)
- [OFFICIAL] The levers are **color, shape, size, motion and containment**, used to draw attention to key actions and group related elements. Component tactics include larger buttons, high-contrast containment and a floating toolbar, with tap targets and contrast set above existing standards. — [design.google](https://design.google/library/expressive-material-design-google-research)
- [OFFICIAL] The research also set limits. Breaking established patterns hurt usability. A playlist redesign with unlabeled album art scored lower, and **removing text labels from email actions reduced usability**. — [design.google](https://design.google/library/expressive-material-design-google-research)
- [COMMUNITY/press] It was unveiled on 13 May 2025 for Android 16 and Wear OS 6, ahead of Google I/O. — [Gigazine](https://www.gigazine.net/gsc_news/en/20250514-android-16-wear-6-material-3-expressive); [AndroidSage](https://androidsage.com/2025/05/13/google-material-3-expressive-design-for-android-and-wear-os); [Android Authority](https://androidauthority.com/material-design-expressive-google-io-3545058/)
- [COMMUNITY/press] Android 16 QPR1 brought M3 Expressive to Pixel 6 and newer (plus Pixel Tablet) with the September 2025 Feature Drop. The QPR1 beta had been available since 20 May 2025. — [heise](https://heise.de/-10631292); [Android Central](https://www.androidcentral.com/apps-software/android-os/android-16-qpr1-beta-1-now-starts-rolling)
- [OFFICIAL] In Compose it shipped first in `androidx.compose.material3:material3:1.4.0-alpha10`. Apps opt in with `MaterialExpressiveTheme(colorScheme, typography, shapes, motionScheme = MotionScheme.expressive())`. — [Android Developers Blog: Androidify](https://android-developers.googleblog.com/2025/05/androidify-building-delightful-ui-with-compose.html)
- [COMMUNITY] The five new components introduced at I/O 2025 are **button groups, FAB menu, loading indicator, split button and toolbars**. — [supercharge.design](https://supercharge.design/blog/material-3-expressive); [ProAndroidDev part 2](https://proandroiddev.com/material-3-expressive-design-a-new-era-part-2-6a93483c98b0)
- [COMMUNITY/press] Expressive menus continued rolling out in Google apps in late 2025. — [9to5Google, 22 Nov 2025](https://9to5google.com/2025/11/22/material-3-expressive-menus/)

### Differences from baseline M3 (2021–2024)

| Area | Baseline M3 | M3 Expressive (from androidx tokens unless noted) |
|---|---|---|
| Motion | Duration + cubic-bezier easing tokens | **Spring MotionScheme** (spatial vs effects × fast/default/slow); `standard()` and `expressive()` schemes ([ExpressiveMotionTokens](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ExpressiveMotionTokens.kt)) |
| Shape | Corner scale none → full (0/4/8/12/16/28/full) | Adds **large-increased 20dp, extra-large-increased 32dp, extra-extra-large 48dp** ([ShapeTokens](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ShapeTokens.kt)), 35 `MaterialShapes` and shape morphing |
| Type | 15 styles | Adds 15 **Emphasized** styles (heavier weight) ([TypeScaleTokens](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/TypeScaleTokens.kt)) |
| Buttons | One 40dp height | **XS 32 / S 40 / M 56 / L 96 / XL 136dp**, round or square, with shape morph on press and select |
| FAB | 40/56/96 | FAB 56 / Medium 80 / Large 96; Extended FAB S/M/L |
| Color | Spec 2021 | MCU adds spec versions **'2025'** and **'2026'** ([color_spec.ts](https://github.com/material-foundation/material-color-utilities/blob/main/typescript/dynamiccolor/color_spec.ts)) |
| New components | – | Button group, split button, FAB menu, loading indicator, docked/floating toolbars, expanded nav rail, flexible app bars, wavy progress |

### Inferences
- For a low-literacy audience, the most relevant result is "up to 4x faster to find key actions" combined with "removing labels hurts". Use large, high-contrast primary actions and always pair icons with text.
- Expressive is opt-in in Compose, and its default MotionScheme is still standard. On the web, "M3 Expressive" means using the expressive token values and components on top of an M3 token base.

### Gaps
- The official m3.material.io "Expressive" pages and the M3 blog post could not be fetched (client-rendered). Exact wording of the official principles list is unverified.
- No confirmed stable date for Wear OS 6 was found in the sources consulted.

---

## 2. Color: dynamic color, HCT, tonal palettes, roles, variants, contrast; generating a scheme with material-color-utilities

### Takeaway
Generate the whole scheme at build time from one brand seed with `@material/material-color-utilities` **0.4.0** (published 21 Jan 2026). Use `SchemeTonalSpot` or `SchemeExpressive`/`SchemeVibrant` with `specVersion: '2025'`. Emit CSS custom properties named `--md-sys-color-<role>` for light, dark and the medium/high contrast levels. The library defaults to spec `'2021'`, so you must pass `'2025'` or `'2026'` explicitly to get Expressive-era color behaviour.

### Cited Findings
- [OFFICIAL] npm `@material/material-color-utilities`: latest **0.4.0**, published 2026-01-21. It describes itself as "Algorithms and utilities that power the Material Design 3 (M3) color system". — [npm registry](https://www.npmjs.com/package/@material/material-color-utilities)
- [OFFICIAL] Install with `npm i @material/material-color-utilities`. The legacy helper API is `Hct.fromInt`, `argbFromHex`, `themeFromSourceColor(argb, customColors)` and `applyTheme(theme, {target, dark})`. — [MCU TypeScript README](https://github.com/material-foundation/material-color-utilities/blob/main/typescript/README.md)
- [OFFICIAL] The `Variant` enum is `MONOCHROME, NEUTRAL, TONAL_SPOT, VIBRANT, EXPRESSIVE, FIDELITY, CONTENT, RAINBOW, FRUIT_SALAD, CMF`. — [variant.ts](https://github.com/material-foundation/material-color-utilities/blob/main/typescript/dynamiccolor/variant.ts)
- [OFFICIAL] Scheme classes in `typescript/scheme/` are `scheme_tonal_spot, scheme_expressive, scheme_vibrant, scheme_fidelity, scheme_content, scheme_monochrome, scheme_neutral, scheme_rainbow, scheme_fruit_salad, scheme_cmf` (plus `scheme_android`). — [MCU scheme dir](https://github.com/material-foundation/material-color-utilities/tree/main/typescript/scheme)
- [OFFICIAL] The constructor signature (e.g. SchemeTonalSpot) is `(sourceColorOrList: Hct|Hct[], isDark: boolean, contrastLevel: number, specVersion: SpecVersion = DEFAULT_SPEC_VERSION, platform: Platform = DEFAULT_PLATFORM)`. — [scheme_tonal_spot.ts](https://github.com/material-foundation/material-color-utilities/blob/main/typescript/scheme/scheme_tonal_spot.ts)
- [OFFICIAL] `contrastLevel` ranges from -1 to 1 (-1 = minimum, 0 = standard; the M3 convention is 0.5 = medium and 1 = high). `Platform = 'phone'|'watch'`. `DEFAULT_SPEC_VERSION = '2021'`, `DEFAULT_PLATFORM = 'phone'`. — [dynamic_scheme.ts](https://github.com/material-foundation/material-color-utilities/blob/main/typescript/dynamiccolor/dynamic_scheme.ts)
- [OFFICIAL] `export type SpecVersion = '2021'|'2025'|'2026'`, implemented by `ColorSpecDelegateImpl2021/2025/2026`. — [color_spec.ts](https://github.com/material-foundation/material-color-utilities/blob/main/typescript/dynamiccolor/color_spec.ts)
- [OFFICIAL] The **exact role names** (`MaterialDynamicColors`) are: `background, onBackground, surface, surfaceDim, surfaceBright, surfaceContainerLowest, surfaceContainerLow, surfaceContainer, surfaceContainerHigh, surfaceContainerHighest, onSurface, surfaceVariant, onSurfaceVariant, inverseSurface, inverseOnSurface, outline, outlineVariant, shadow, scrim, surfaceTint, primary, onPrimary, primaryContainer, onPrimaryContainer, inversePrimary, secondary, onSecondary, secondaryContainer, onSecondaryContainer, tertiary, onTertiary, tertiaryContainer, onTertiaryContainer, error, onError, errorContainer, onErrorContainer, primaryFixed, primaryFixedDim, onPrimaryFixed, onPrimaryFixedVariant, secondaryFixed, secondaryFixedDim, onSecondaryFixed, onSecondaryFixedVariant, tertiaryFixed, tertiaryFixedDim, onTertiaryFixed, onTertiaryFixedVariant`. Key-color helpers are `primaryPaletteKeyColor, secondaryPaletteKeyColor, tertiaryPaletteKeyColor, neutralPaletteKeyColor, neutralVariantPaletteKeyColor`. An instance field `allColors: DynamicColor[]` lists them all. — [material_dynamic_colors.ts](https://github.com/material-foundation/material-color-utilities/blob/main/typescript/dynamiccolor/material_dynamic_colors.ts)
- [OFFICIAL] Component tokens reference these roles. Example: the floating toolbar's standard container is `SurfaceContainer`, its vibrant container is `PrimaryContainer` and vibrant unselected icons are `OnPrimaryContainer`. The loading indicator's active color is `Primary`, and the contained variant uses `PrimaryContainer`/`OnPrimaryContainer`. — [FloatingToolbarTokens](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/FloatingToolbarTokens.kt); [LoadingIndicatorTokens](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/LoadingIndicatorTokens.kt)

### Code: build-time token generator (Node script → `app/tokens.css`)
[INFERENCE: written against the API surface shown in the source files above. Check the exact export names in 0.4.0 `index.d.ts` before relying on it.]
```ts
// scripts/gen-color-tokens.ts  (run: pnpm tsx scripts/gen-color-tokens.ts)
import {
  argbFromHex, hexFromArgb, Hct,
  SchemeTonalSpot, SchemeExpressive, SchemeVibrant, SchemeFidelity, SchemeContent,
  MaterialDynamicColors, DynamicScheme,
} from '@material/material-color-utilities';
import { writeFileSync } from 'node:fs';

const SEED = '#0B6E4F';            // brand seed (example: trust-green), pick your own
const SPEC = '2025' as const;      // MUST be explicit; library default is '2021'
const Scheme = SchemeTonalSpot;    // or SchemeExpressive / SchemeVibrant for more chroma

const kebab = (s: string) => s.replace(/([A-Z])/g, '-$1').toLowerCase();

function block(selector: string, scheme: DynamicScheme) {
  const lines = new MaterialDynamicColors().allColors
    .map(c => `  --md-sys-color-${kebab(c.name)}: ${hexFromArgb(c.getArgb(scheme))};`);
  return `${selector} {\n${lines.join('\n')}\n}\n`;
}

const src = Hct.fromInt(argbFromHex(SEED));
const mk = (dark: boolean, contrast: number) => new Scheme(src, dark, contrast, SPEC);

const css = [
  block(':root', mk(false, 0)),
  block(':root[data-theme="dark"]', mk(true, 0)),
  // OS-driven dark when no explicit choice
  `@media (prefers-color-scheme: dark){${block(':root:not([data-theme="light"])', mk(true, 0))}}`,
  block(':root[data-contrast="medium"]', mk(false, 0.5)),
  block(':root[data-contrast="high"]', mk(false, 1.0)),
  block(':root[data-theme="dark"][data-contrast="high"]', mk(true, 1.0)),
  `@media (prefers-contrast: more){${block(':root:not([data-contrast])', mk(false, 1.0))}}`,
].join('\n');

writeFileSync('app/tokens.css', css);
```
Notes: `DynamicColor.name` is snake_case in some MCU versions (e.g. `primary_container`). The `kebab()` helper must handle both, e.g. `.replace(/_/g,'-')`. Generate at build time only and ship the static CSS (about 3 KB gzipped). Do not ship MCU to the client, since end users get no wallpaper-based dynamic color on the web.

### Inferences
- [INFERENCE, from prior knowledge of the 2021 spec, not re-verified here] In the 2021 spec, light-scheme `primary` = tone 40, `onPrimary` = 100, `primaryContainer` = 90, `onPrimaryContainer` = 10, `surface` = neutral 98. Dark mode uses tone 80/20/30/90 with `surface` at 6. The 2025/2026 specs change some tone choices per variant, so always use the generator rather than hand-picking tones.
- Variant choice for this platform: **Tonal Spot** (calm, default Android) for the base UI, **Fidelity/Content** if the brand hue must be reproduced exactly (Fidelity keeps the seed's chroma), and **Expressive/Vibrant** only for marketing surfaces. Low-cost LCD screens with poor gamut favour higher-contrast schemes. Offer `data-contrast="medium"` as the default if outdoor sunlight readability is a concern (as in many Cameroonian markets).
- Use the `error` roles for verification failures and disputes. Add a custom "success/verified" colour by harmonising it to the seed. The legacy `themeFromSourceColor(..., customColors with blend: true)` path supports this per the README.

### Gaps
- Exact behavioural differences between specs 2025 and 2026, and whether 2026 needs a newer variant set, were not documented in sources reached. Read `color_spec_2026.ts` before choosing.
- No official HCT explainer page could be fetched. HCT is described here from source code only: Hue/Chroma from CAM16, Tone = L* from CIELAB.

---

## 3. Typography: type scale, emphasized styles, variable fonts

### Takeaway
M3 Expressive keeps the 15-role scale and adds an **Emphasized** twin for every role (one weight step heavier). Display, Headline and Title Large use the "Brand" typeface. Title M/S, Body and Label use the "Plain" typeface. On the web, self-host one variable font subset (Roboto Flex or Google Sans Flex, both OFL) with Latin + Latin-Ext for French and Cameroonian names.

### Cited Findings
- [OFFICIAL] Current androidx-main type scale (sp ≈ CSS px at 1x; weights: Regular 400, Medium 500, Bold 700 [weight numbers are INFERENCE from the TypefaceTokens names]). — [TypeScaleTokens.kt](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/TypeScaleTokens.kt); token wiring in [TypographyTokens.kt](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/TypographyTokens.kt)

| Role | Size / Line height | Weight (std → **emph**) | Tracking (std / emph) | Font |
|---|---|---|---|---|
| displayLarge | 57 / 64 | Regular → **Medium** | -0.2 / 0 | Brand |
| displayMedium | 45 / 52 | Regular → **Medium** | 0 / 0 | Brand |
| displaySmall | 36 / 44 | Regular → **Medium** | 0 / 0 | Brand |
| headlineLarge | 32 / 40 | Regular → **Medium** | 0 / 0 | Brand |
| headlineMedium | 28 / 36 | Regular → **Medium** | 0 / 0 | Brand |
| headlineSmall | 24 / 32 | Regular → **Medium** | 0 / 0 | Brand |
| titleLarge | 22 / 28 | Regular → **Medium** | 0 / 0 | Brand |
| titleMedium | 16 / 24 | Medium → **Bold** | 0.2 / 0.15 | Plain |
| titleSmall | 14 / 20 | Medium → **Bold** | 0.1 / 0.1 | Plain |
| bodyLarge | 16 / 24 | Regular → **Medium** | 0.5 / 0.15 | Plain |
| bodyMedium | 14 / 20 | Regular → **Medium** | 0.2 / 0.25 | Plain |
| bodySmall | 12 / 16 | Regular → **Medium** | 0.4 / 0.4 | Plain |
| labelLarge | 14 / 20 | Medium → **Bold** | 0.1 / 0.1 | Plain |
| labelMedium | 12 / 16 | Medium → **Bold** | 0.5 / 0.5 | Plain |
| labelSmall | 11 / 16 | Medium → **Bold** | 0.5 / 0.5 | Plain |

- [OFFICIAL] The Emphasized tokens in `TypographyTokens.kt` carry `// TODO update with the generated tokens once available`, so they may still change. — [TypographyTokens.kt](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/TypographyTokens.kt)
- [OFFICIAL/press] **Google Sans Flex** was open-sourced under the SIL OFL in 2025 and is on Google Fonts. Google describes its design in "Making Google Sans Flex". — [design.google: Making Google Sans Flex](https://design.google/library/google-sans-flex-font); [OMG! Ubuntu, Nov 2025](https://www.omgubuntu.co.uk/2025/11/google-sans-flex-font-ubuntu)
- [COMMUNITY] Its axes include weight, width, optical size, slant and a "rounded" (roundness) axis. Sources disagree on the count (5 or 6) and on whether a grade axis exists. — [Abduzeedo](https://www.abduzeedo.com/google-sans-flex-free-font-six-variable-axes-one-file); [It's FOSS](https://itsfoss.com/news/google-sans-flex/)
- [COMMUNITY] Self-hostable npm packages exist: `@fontsource-variable/google-sans-flex` 5.3.2 (2026-10-11, OFL-1.1) and `@fontsource-variable/roboto-flex` 5.3.0 (2026-07-19). — [npm registry](https://www.npmjs.com/package/@fontsource-variable/google-sans-flex); [Fontsource](https://fontsource.org/fonts/google-sans-flex)

### Code: CSS type tokens (pattern)
```css
:root{
  --md-ref-typeface-brand: "Google Sans Flex", "Roboto Flex", system-ui, sans-serif;
  --md-ref-typeface-plain: "Google Sans Flex", "Roboto Flex", system-ui, sans-serif;
  --md-sys-typescale-body-large-size: 1rem;      /* 16 */
  --md-sys-typescale-body-large-line-height: 1.5rem; /* 24 */
  --md-sys-typescale-body-large-weight: 400;
  --md-sys-typescale-body-large-tracking: 0.03125rem; /* 0.5px */
  /* ...repeat per role; emphasized: --md-sys-typescale-emphasized-body-large-weight: 500; */
}
```
Use `rem` so Android's system font-size setting (which Chrome maps to its text-scaling preference) scales the text.

### Inferences
- For low-literacy users, set the **default reading style to bodyLarge (16/24)**, use labelLarge-emphasized (14 Bold) or titleMedium for button labels, and avoid bodySmall/labelSmall for anything essential.
- Use Google Sans Flex's roundness axis only for brand headlines. One variable WOFF2 subset (Latin + Latin-Ext, wght 400–700, no slant) is likely about 40–70 KB [INFERENCE, measure after subsetting]. Use `font-display: swap` and `size-adjust` fallbacks.

### Gaps
- The exact `TypefaceTokens` weight integers and the Brand/Plain family names on Android were not fetched. On Pixels, Brand is likely Google Sans Flex (unverified).
- Official m3.material.io guidance on which roles should use emphasized could not be fetched.

---

## 4. Shape: corner scale, the 35-shape library, morphing, and how to do it on the web

### Takeaway
Use a 10-step corner scale (0/4/8/12/16/20/28/32/48/full). Use the 35 `MaterialShapes` sparingly for avatars, badges, loading and hero accents. On the web, use **`shape-morph`** (MIT, a TS port of androidx.graphics.shapes, ships the same 35 shapes) to output SVG paths or fixed-vertex `clip-path: polygon()` strings that CSS can transition.

### Cited Findings
- [OFFICIAL] Corner tokens: — [ShapeTokens.kt](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ShapeTokens.kt)

| Token | dp | CSS var suggestion |
|---|---|---|
| CornerNone | 0 | `--md-sys-shape-corner-none: 0` |
| CornerExtraSmall | 4 | `--md-sys-shape-corner-extra-small: 4px` |
| CornerSmall | 8 | `...-small: 8px` |
| CornerMedium | 12 | `...-medium: 12px` |
| CornerLarge | 16 | `...-large: 16px` |
| **CornerLargeIncreased** | 20 | `...-large-increased: 20px` |
| CornerExtraLarge | 28 | `...-extra-large: 28px` |
| **CornerExtraLargeIncreased** | 32 | `...-extra-large-increased: 32px` |
| **CornerExtraExtraLarge** | 48 | `...-extra-extra-large: 48px` |
| CornerFull | circle | `...-full: 9999px` |
Directional variants: `ExtraSmallTop` (4,4,0,0), `LargeTop` (16,16,0,0), `LargeStart`, `LargeEnd`, `ExtraLargeTop` (28,28,0,0; bottom sheets).

- [OFFICIAL] The **35 MaterialShapes** (androidx `MaterialShapes.kt`): Arch, Arrow, Boom, Bun, Burst, Circle, ClamShell, Clover4Leaf, Clover8Leaf, Cookie4Sided, Cookie6Sided, Cookie7Sided, Cookie9Sided, Cookie12Sided, Diamond, Fan, Flower, Gem, Ghostish, Heart, Oval, Pentagon, Pill, PixelCircle, PixelTriangle, Puffy, PuffyDiamond, SemiCircle, Slanted, SoftBoom, SoftBurst, Square, Sunny, Triangle, VerySunny. — [MaterialShapes.kt](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/MaterialShapes.kt)
- [OFFICIAL] Concepts in androidx.graphics.shapes: `RoundedPolygon` (built from a vertex count or an ordered vertex list, with per-corner `CornerRounding(radius, smoothing)`), plus `.normalized()` and `Morph(start, end)`, which creates an interpolable shape. Compose converts with `.toShape()`/`toPath()`. — [androidx.graphics.shapes package summary](https://developer.android.com/reference/kotlin/androidx/graphics/shapes/package-summary); [Shapes in Compose](https://developer.android.com/jetpack/compose/graphics/draw/shapes); [Medium: The Shape of Things to Come](https://medium.com/androiddevelopers/the-shape-of-things-to-come-1c7663d9dbc0)
- [OFFICIAL] Androidify clips its capture button to `MaterialShapes.Cookie9Sided.toShape()`. It morphs `RoundedPolygon.rectangle()` → `circle()` with `Morph` driven by transition progress. — [Androidify blog](https://android-developers.googleblog.com/2025/05/androidify-building-delightful-ui-with-compose.html)
- [OFFICIAL] Buttons morph corners on interaction. Round buttons use `CornerFull`, and their pressed shape is `CornerSmall` (XS/S), `CornerMedium` (M) or `CornerLarge` (L/XL). Square buttons use `CornerMedium` (XS/S), `CornerLarge` (M) or `CornerExtraLarge` (L/XL). — [ButtonSmallTokens](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ButtonSmallTokens.kt); [ButtonLargeTokens](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ButtonLargeTokens.kt)
- [COMMUNITY] **shape-morph** is "a TypeScript port of Android's androidx.graphics.shapes", shipping 35 preset shapes. `Morph` aligns convex/concave corners and flat edges and subdivides both shapes to equal segment counts. Outputs are `toPathD()` (SVG), `toClipPathPolygon()` (fixed vertex count, so CSS transitions work), React `<Shape>` and `useMorph`, and Tailwind v4 `clip-*` utilities. npm `shape-morph` 0.4.0 (2026-02-13, MIT). — [shape-morph docs](https://shape-morph.thereallo.dev/docs); [npm](https://www.npmjs.com/package/shape-morph)
- [COMMUNITY] Flutter has an equivalent `androidx_graphics_shapes` port, which corroborates that the shapes are portable. — [pub.dev androidx_graphics_shapes](https://pub.dev/documentation/androidx_graphics_shapes/1.3.2/shapes)

### Code
```tsx
// Static shape: prerender SVG path at build time (zero JS on client)
import { useMorph } from "shape-morph/react";
export function VerifiedAvatar({ hovered, src }: { hovered: boolean; src: string }) {
  const { clipPath } = useMorph("Circle", "Cookie9Sided", { progress: hovered ? 1 : 0, duration: 300 });
  return <img src={src} alt="" style={{ clipPath }} className="size-14" />;
}
```
```css
/* Corner morph on press, pure CSS (button) */
.btn { border-radius: var(--md-sys-shape-corner-full);
       transition: border-radius 150ms var(--md-sys-motion-spring-fast-spatial); }
.btn:active { border-radius: var(--md-sys-shape-corner-small); }
```
[INFERENCE] Transitioning `border-radius` from `9999px` to `8px` looks wrong because the interpolation is linear over 9999. Use `calc(var(--h)/2)` (half the container height) for "full" so the morph animates smoothly.

### Inferences
- Pre-compute shape SVG paths at build time (React Server Components) and inline them. Use JS morphing only for the loading indicator and one or two hero moments, to protect low-end CPUs.
- Use a recognisable shape language to reinforce trust levels (e.g. Cookie9Sided frame = "verified artisan"). Always pair it with a text or icon label, never shape alone.

### Gaps
- Official m3.material.io guidance on which shapes suit which contexts was not reachable.
- I did not benchmark shape-morph runtime cost on low-end devices.

---

## 5. Motion: spring physics, exact values, and web reproduction

### Takeaway
M3 Expressive motion is defined by **springs** (stiffness + damping ratio), split into **spatial** (position/size/shape, which may overshoot) and **effects** (color/opacity, no overshoot), each with fast/default/slow speeds. There are two schemes: `standard` and `expressive`. On the web, use Motion for React with stiffness/damping converted from damping *ratio*. For CSS-only paths, pre-generate `linear()` easing curves.

### Cited Findings
- [OFFICIAL] **Expressive** scheme — [ExpressiveMotionTokens.kt](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ExpressiveMotionTokens.kt)
- [OFFICIAL] **Standard** scheme — [StandardMotionTokens.kt](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/StandardMotionTokens.kt)

| Token | Expressive stiffness / ζ | Standard stiffness / ζ | Motion `damping` (expr / std)* | Overshoot (expr)* | ~Settle (expr)* |
|---|---|---|---|---|---|
| fastSpatial | **800 / 0.6** | 1400 / 0.9 | 33.9 / 67.3 | ~9.5% | ~0.23 s |
| defaultSpatial | **380 / 0.8** | 700 / 0.9 | 31.2 / 47.6 | ~1.5% | ~0.25 s |
| slowSpatial | **200 / 0.8** | 300 / 0.9 | 22.6 / 31.2 | ~1.5% | ~0.35 s |
| fastEffects | 3800 / 1.0 | 3800 / 1.0 | 123.3 | 0 | ~0.09 s |
| defaultEffects | 1600 / 1.0 | 1600 / 1.0 | 80.0 | 0 | ~0.15 s |
| slowEffects | 800 / 1.0 | 800 / 1.0 | 56.6 | 0 | ~0.21 s |

\*[INFERENCE] computed with mass = 1: `damping = 2·ζ·√stiffness`. Overshoot = `exp(-ζπ/√(1-ζ²))`. Settle ≈ `ln(50)/(ζ·√k)` (2% band). Verify visually.

- [COMMUNITY] A Flutter port reports the same expressive values (spatial default 380/0.8, effects default 1600/1), which corroborates the androidx file. — [pub.dev M3EMotion](https://pub.dev/documentation/m3e_slider/0.0.2/common_m3e_common/M3EMotion-class.html)
- [OFFICIAL] Compose usage is `MaterialTheme.motionScheme.defaultSpatialSpec<Float>()` for position/rotation/scale, with `MotionScheme.expressive()` set in `MaterialExpressiveTheme`. — [Androidify blog](https://android-developers.googleblog.com/2025/05/androidify-building-delightful-ui-with-compose.html); [MotionScheme API (kotlinlang)](https://kotlinlang.org/api/compose-multiplatform/material3/androidx.compose.material3/-motion-scheme/-companion/index.html)
- [COMMUNITY] The default MotionScheme in `MaterialExpressiveTheme` contexts is reportedly standard unless set. — [Speaker Deck (ym223)](https://speakerdeck.com/ym223/hazimetenomaterial3-expressive)
- [OFFICIAL-vendor] Motion (npm `motion` 14.12.0, 2026-11-10) springs are either physics-based (`stiffness`, `damping`, `mass`) or duration-based (`visualDuration`/`duration` + `bounce`). Its docs state "bounce and duration will be overridden if stiffness, damping or mass are set". Docs list defaults `damping: 10`, `bounce: 0.25` and `stiffness: 1` (the stiffness default conflicts with the `useSpring` reference, which says 100). — [Motion transitions docs](https://motion.dev/docs/react-transitions); [npm motion](https://www.npmjs.com/package/motion); conflicting default: [Mintlify mirror of useSpring](https://www.mintlify.com/motiondivision/motion/api/use-spring)
- [OFFICIAL-vendor] CSS `linear()` interpolates linearly between many points, so it can approximate spring and bounce curves. It is supported in Chrome 113, Edge 113, Firefox 112 and Safari 17.2. — [Chrome for Developers: linear()](https://developer.chrome.com/docs/css-ui/css-linear-easing-function)

### Code: motion tokens for the web
```ts
// lib/motion-tokens.ts
const d = (k: number, z: number) => 2 * z * Math.sqrt(k); // mass = 1
export const spring = {
  fastSpatial:    { type: 'spring', stiffness: 800,  damping: d(800, 0.6) },
  defaultSpatial: { type: 'spring', stiffness: 380,  damping: d(380, 0.8) },
  slowSpatial:    { type: 'spring', stiffness: 200,  damping: d(200, 0.8) },
  fastEffects:    { type: 'spring', stiffness: 3800, damping: d(3800, 1) },
  defaultEffects: { type: 'spring', stiffness: 1600, damping: d(1600, 1) },
  slowEffects:    { type: 'spring', stiffness: 800,  damping: d(800, 1) },
} as const;

// app/providers.tsx (client)
'use client';
import { MotionConfig, LazyMotion, domAnimation } from 'motion/react';
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={spring.defaultSpatial}>{children}</MotionConfig>
    </LazyMotion>
  );
}
```
```ts
// scripts/gen-spring-css.ts: bake springs into CSS linear() at build time
function springLinear(k: number, z: number, points = 40) {
  const w = Math.sqrt(k), T = Math.log(1000) / (z * w); // ~0.1% settle
  const wd = w * Math.sqrt(Math.max(1e-6, 1 - z * z));
  const xs = Array.from({ length: points + 1 }, (_, i) => {
    const t = (i / points) * T;
    const x = z < 1
      ? 1 - Math.exp(-z * w * t) * (Math.cos(wd * t) + (z * w / wd) * Math.sin(wd * t))
      : 1 - Math.exp(-w * t) * (1 + w * t);
    return +x.toFixed(4);
  });
  return { easing: `linear(${xs.join(', ')})`, durationMs: Math.round(T * 1000) };
}
// emit: --md-sys-motion-spring-default-spatial: linear(...); --md-sys-motion-spring-default-spatial-duration: 300ms;
```
```css
@media (prefers-reduced-motion: reduce){
  *,*::before,*::after{ animation-duration:1ms!important; transition-duration:1ms!important; }
}
```

### Inferences
- Map spatial springs to transforms (translate/scale) and effects springs to opacity/colour. Animate only `transform` and `opacity` on low-end Android (compositor-only properties).
- Default to CSS `linear()` transitions for state changes (press, hover, toggle). Reserve Motion (JS) for gesture-driven or interruptible animations (sheets, FAB menu, shared layout). Lazy-load Motion via `LazyMotion` + `domAnimation` to cut bundle size.
- The fast-spatial expressive spring overshoots about 9.5%. Use it for small elements (button press, chip select), not for large panels where overshoot looks jittery on 60 Hz low-end screens.

### Gaps
- The official m3.material.io motion page (with recommended token-to-component mapping) could not be fetched.
- Motion's official `stiffness` default is inconsistent across its own docs. This does not matter if you always pass explicit values.

---

## 6. Component catalogue: anatomy, sizes, states (Expressive additions and updates)

### Takeaway
All sizes below come from the androidx Compose token files (official, current main branch). The web implementation should treat 1dp = 1 CSS px. For this audience, make **Medium (56dp) the default primary button size on mobile** and keep Small (40dp) for secondary actions inside a 48dp touch target.

### Cited Findings

**Buttons (filled, tonal, outlined, elevated, text) — XS to XL** [OFFICIAL] — [ButtonXSmallTokens](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ButtonXSmallTokens.kt), [ButtonSmallTokens](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ButtonSmallTokens.kt), [ButtonMediumTokens](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ButtonMediumTokens.kt), [ButtonLargeTokens](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ButtonLargeTokens.kt), [ButtonXLargeTokens](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ButtonXLargeTokens.kt)

| Size | Height | Icon | Leading/trailing pad | Icon–label gap | Outline | Round shape → pressed | Square shape |
|---|---|---|---|---|---|---|---|
| XS | 32 | 20 | 16 / 16 | 8 | 1 | full → small(8) | medium(12) |
| S (default) | 40 | 20 | 16 / 16 | 8 | 1 | full → small(8) | medium(12) |
| M | 56 | 24 | 24 / 24 | 8 | 1 | full → medium(12) | large(16) |
| L | 96 | 32 | 48 / 48 | 12 | 2 | full → large(16) | extra-large(28) |
| XL | 136 | 40 | 64 / 64 | 16 | 3 | full → large(16) | extra-large(28) |
Selected (toggle button) shape: round stays `full`, square stays the size's square token. Label type is labelLarge for S (larger sizes use bigger title/headline styles; mapping not fetched).

**Button group / split button** [OFFICIAL]
- Button group (small) height 40, between-space 12. — [ButtonGroupSmallTokens](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ButtonGroupSmallTokens.kt)
- Split button (small): height 40, shape full, **2dp gap** between halves, leading button padding 16/12, trailing (menu) button padding 13/13, trailing icon 22. — [SplitButtonSmallTokens](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/SplitButtonSmallTokens.kt)
- [COMMUNITY] Button groups work with all sizes XS–XL. The split button's menu half "spins and changes shape when activated". — [supercharge.design](https://supercharge.design/blog/material-3-expressive)

**FABs** [OFFICIAL] — [FabBaselineTokens](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/FabBaselineTokens.kt), [FabMediumTokens](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/FabMediumTokens.kt), [FabLargeTokens](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/FabLargeTokens.kt), [ExtendedFabSmallTokens](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ExtendedFabSmallTokens.kt), [ExtendedFabMediumTokens](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ExtendedFabMediumTokens.kt), [ExtendedFabLargeTokens](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ExtendedFabLargeTokens.kt)

| Variant | Container | Icon | Shape | Extended pad / gap |
|---|---|---|---|---|
| FAB | 56×56 | 24 | large (16) | S: 16/16, gap 8 (h 56) |
| Medium FAB | 80×80 | 28 | (not captured; likely large-increased 20, unverified) | M: 26/26, gap 16 (h 80) |
| Large FAB | 96×96 | 32 | extra-large (28) | L: 28/28, gap 20, shape XL (h 96) |

**FAB menu** [OFFICIAL]: close button 56×56 (full, icon 20, elevation level 3). Menu items are 56dp-high pills (full) with 4dp gaps, icon 24, padding 24/24, icon–label 8 and elevation level 3. — [FabMenuBaselineTokens](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/FabMenuBaselineTokens.kt). [COMMUNITY] It opens from any FAB size and works with any FAB colour style. — [supercharge.design](https://supercharge.design/blog/material-3-expressive)

**Loading indicator** [OFFICIAL]: 48×48 container (shape full), 38dp active morphing shape, colour `primary`. The "contained" variant uses `primaryContainer` with `onPrimaryContainer`. — [LoadingIndicatorTokens](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/LoadingIndicatorTokens.kt). [COMMUNITY] It is meant for waits under about 5 s, including pull-to-refresh, and replaces most indeterminate circular progress. — [supercharge.design](https://supercharge.design/blog/material-3-expressive)

**Progress indicators** [OFFICIAL]: active, track and stop-indicator shapes are all `CornerFull`. — [ProgressIndicatorTokens](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ProgressIndicatorTokens.kt). [COMMUNITY] Expressive adds wavy linear/circular variants. — [ProAndroidDev](https://proandroiddev.com/android-16-x-material-3-e-biggest-ui-change-yet-updates-for-android-jetpack-compose-and-flutter-35d6b53a5242)

**Toolbars** [OFFICIAL]
- Floating toolbar: height 64, shape full, padding 8/8, item gap 4, 16dp external margin. Standard colour is `surfaceContainer`. Vibrant colour is `primaryContainer` with `onPrimaryContainer` content, and the selected item uses a `surfaceContainer` pill with `onSurface`. — [FloatingToolbarTokens](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/FloatingToolbarTokens.kt)
- Docked toolbar: height 64, shape none, padding 16/16, item spacing 4–32. — [DockedToolbarTokens](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/DockedToolbarTokens.kt)
- Androidify uses `HorizontalFloatingToolbar`. — [Androidify blog](https://android-developers.googleblog.com/2025/05/androidify-building-delightful-ui-with-compose.html)

**Navigation rail** [OFFICIAL]: collapsed width 96 (narrow 80), top space 44, item gap 4. Expanded width 220–360. The modal expanded variant uses elevation level 2 and shape large (16). — [NavigationRailCollapsedTokens](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/NavigationRailCollapsedTokens.kt); [NavigationRailExpandedTokens](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/NavigationRailExpandedTokens.kt)

**Slider (Expressive)** [OFFICIAL]: track height 16 (active and inactive, full shape), handle 4×44 (2dp when pressed or focused), 6dp gap around the handle, 4dp stop indicators. The value indicator uses labelLarge. — [SliderTokens](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/SliderTokens.kt)

### Component spec guidance for the web [INFERENCE, based on official anatomy where cited]
| Component | Web build | Notes for this product |
|---|---|---|
| Button / toggle button | `<button>` + React Aria `useButton`/`ToggleButton` | Height tokens above; pressed corner morph; `aria-pressed` for toggles |
| Button group / segmented | React Aria `ToggleButtonGroup` | Use for "Filter: Plumber / Electrician / Tailor" with icon + label |
| Split button | Button + React Aria `MenuTrigger` | 2dp gap, trailing chevron rotates 180° |
| FAB / FAB menu | `<button>` + Popover | Primary action "Request a service"; Extended FAB with label, not icon-only |
| Loading indicator | SVG + shape-morph cycle | Respect reduced motion: static shape + text "Chargement…" |
| Toolbars | `role="toolbar"` (React Aria `Toolbar`) | Floating toolbar for job-detail actions (Call, WhatsApp, Share) |
| Navigation bar | `<nav>` with 3–5 destinations, icon + always-visible label | Compact width; labels mandatory for low literacy |
| Navigation rail | `<nav>` | ≥ 600dp |
| App bars (flexible/search) | `<header>`; search via React Aria `SearchField` | Big search field at top of home |
| Cards | `<article>` (elevated/filled/outlined) | Artisan card: photo, name, trade icon + label, verified badge, rating |
| Chips | React Aria `TagGroup` / `ToggleButton` | Assist/filter/input/suggestion |
| Lists | `<ul>` / React Aria `GridList` | One-line 56dp min height recommended |
| Sheets | Radix/Vaul-style drawer + Motion spring | Corner extra-large-top (28) |
| Dialogs | React Aria `Dialog` / `Modal` | Corner extra-large (28) |
| Text fields | React Aria `TextField` | Filled/outlined; large label; phone input with +237 prefix |
| Snackbar | `role="status"` live region | Short, plain-language confirmations |
| Badges | `<span>` | Small 6dp dot; large 16dp with count |
| Sliders | React Aria `Slider` | Expressive 16dp track for budget/distance |
| Carousel | CSS scroll-snap | Portfolio photos; lazy images |

### Inferences
- The Expressive button sizes make **L (96dp)** suitable for one hero action per screen (e.g. "Trouver un artisan").
- Carousel, list, chip, dialog, text field, snackbar and badge sizes for Expressive were not fetched. Use the baseline M3 values the implementer already knows and verify against the Figma kit.

### Gaps
- Token files for navigation bar (`ShortNavigationBarTokens` returned no matching values), carousel, chips, lists, dialogs, text fields, snackbar, badges and flexible app bar were not retrieved in this pass. Fetch them from the same androidx `tokens/` directory.
- The Medium FAB container shape and the button label type per size were not captured.

---

## 7. Elevation, state layers, adaptive layout

### Takeaway
Elevation has 6 levels (0/1/3/6/8/12dp). M3 prefers tonal surface containers to shadows. Current state-layer opacities are hover 8%, focus 10%, pressed 10% and dragged 16%. Layout uses five width classes (compact < 600, medium < 840, expanded < 1200, large < 1600, extra-large ≥ 1600).

### Cited Findings
- [OFFICIAL] Elevation tokens: Level0 0dp, Level1 1dp, Level2 3dp, Level3 6dp, Level4 8dp, Level5 12dp. — [ElevationTokens.kt](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ElevationTokens.kt)
- [OFFICIAL] State layers: `HoverStateLayerOpacity = 0.08`, `FocusStateLayerOpacity = 0.1`, `PressedStateLayerOpacity = 0.1`, `DraggedStateLayerOpacity = 0.16`. — [StateTokens.kt](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/StateTokens.kt)
- [OFFICIAL] Window size classes (width): **compact < 600dp** (99.96% of phones in portrait), **medium 600–839**, **expanded 840–1199**, **large 1200–1599**, **extra-large ≥ 1600**. Height: compact < 480, medium 480–899, expanded ≥ 900. Large and extra-large are newer additions for desktop and connected displays. — [Android Developers: window size classes](https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes)
- [OFFICIAL] Window size classes should drive high-level decisions such as choosing a canonical layout. Google advises against `isTablet` logic. — [Android Developers](https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes)

### Code
```css
/* State layer via pseudo-element; color = the on-color of the container */
.state { position: relative; isolation: isolate; }
.state::before { content:""; position:absolute; inset:0; border-radius:inherit;
  background: currentColor; opacity:0; transition: opacity 90ms; pointer-events:none; }
@media (hover:hover){ .state:hover::before{ opacity:.08; } }
.state:focus-visible::before{ opacity:.10; }
.state:active::before{ opacity:.10; }
```
```css
@theme { /* Tailwind v4 breakpoints = M3 window classes (dp ≈ CSS px) */
  --breakpoint-medium: 600px; --breakpoint-expanded: 840px;
  --breakpoint-large: 1200px; --breakpoint-xlarge: 1600px; }
```

### Inferences
- [INFERENCE, from prior knowledge] Baseline M3 docs historically used 0.12 for focus and pressed. The current androidx tokens say 0.10. Follow the token file, but note the discrepancy.
- Canonical layouts: list-detail (artisan list + profile), supporting pane (job + chat) and feed (portfolio). Almost all of this audience is in **compact** width, so design compact-first and add list-detail at ≥ 840px for desktop admin/back-office.
- Use tonal surfaces (`surfaceContainerLow…Highest`) instead of shadows to separate cards. This is cheaper to paint on low-end GPUs and reads better on low-contrast LCDs.

### Gaps
- Official canonical-layout pane breakpoints and spacing (margins 16/24dp, pane gaps) were not fetched in this pass.

---

## 8. Accessibility for low-literacy users on cheap Android phones

### Takeaway
Google's own research says Expressive gains depend on keeping labels and familiar patterns. Combine 48dp minimum touch targets, large primary buttons (56–96dp), icon + text everywhere, high-contrast schemes (MCU contrast 0.5/1.0), reduced-motion support and short French/English (and possibly Pidgin) microcopy.

### Cited Findings
- [OFFICIAL] Removing text labels from email actions reduced usability, and unlabeled album art scored lower. Breaking established patterns hurt usability. — [design.google](https://design.google/library/expressive-material-design-google-research)
- [OFFICIAL] Expressive tap targets and contrast were set above existing standards. Users aged 45+ found key elements as quickly as younger users. — [design.google](https://design.google/library/expressive-material-design-google-research)
- [OFFICIAL] MCU supports contrast levels from -1 to 1, so medium (0.5) and high (1.0) schemes can be generated. — [dynamic_scheme.ts](https://github.com/material-foundation/material-color-utilities/blob/main/typescript/dynamiccolor/dynamic_scheme.ts)
- [OFFICIAL] Expressive slider handles are 44dp tall with 16dp tracks, and buttons go up to 136dp. — [SliderTokens](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/SliderTokens.kt); [ButtonXLargeTokens](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ButtonXLargeTokens.kt)

### Inferences (design rules for the spec)
1. Touch targets must be at least 48×48 CSS px for every interactive element (pad XS/S buttons, 40dp icon buttons and chips with an invisible hit area). This is the M3 minimum from prior knowledge, not re-fetched here.
2. Every icon gets a visible text label (navigation bar labels always shown, never "selected-only"). Use icons from Material Symbols *Rounded* with FILL=1 for the selected state.
3. One primary action per screen at Medium (56) or Large (96) size, using `primary`/`onPrimary`.
4. Use trade pictograms (Material Symbols: `electrical_services`, `plumbing`, `content_cut`, `car_repair`, `construction`, `checkroom`) plus a text label, plus optional audio help (a speaker icon reading the label via the Web Speech API, or pre-recorded audio).
5. Make the colour-independent trust signal a badge with shape + icon + text ("Vérifié").
6. Body text at least 16px. Never fix font sizes in px on containers, so OS text scaling (up to 200%) works.
7. Respect `prefers-reduced-motion`. Motion should never be the only feedback.
8. Contrast: default to MCU contrast 0 with WCAG AA checks, and offer a "high contrast" toggle mapped to contrast 1.0.

### Gaps
- No M3-specific official guidance on low-literacy design was found. The rules above are synthesis and need user testing in Cameroon.
- The official 48dp touch-target text from m3.material.io accessibility pages was not fetched in this pass.

---

## 9. Implementation in React/Next.js: official web status, libraries, Tailwind v4, Material Symbols, recommended stack

### Takeaway
**Google has no official, maintained M3 Expressive implementation for the web.** `@material/web` is still in maintenance mode, with only small releases (v2.5.0, July 2026, adds a custom-elements manifest) and no Expressive components. **MUI v9 still implements Material Design 2.** Community Expressive libraries exist (the strongest is `@m3e/web` + `@m3e/react`, MIT), but all are unofficial. Recommended path: **build your own thin component layer** using Tailwind v4 + generated M3 CSS variables + React Aria Components (behaviour/accessibility) + Motion (springs, lazy-loaded) + shape-morph (shapes) + a self-hosted Material Symbols subset.

### Cited Findings
**Official web status**
- [OFFICIAL] The material-web README says: "MWC is in maintenance mode pending new maintainers". For Angular it recommends Angular Material. — [material-web README](https://github.com/material-components/material-web); [Discussion #5642](https://github.com/material-components/material-web/discussions/5642)
- [OFFICIAL] Releases: v2.3.0 (2025-03-26), v2.4.0 (2025-08-21), v2.4.1 (2025-10-27), **v2.5.0 (2026-07-14)**. v2.5.0 adds a custom-elements.json manifest and CSSStyleSheet exports, with no Expressive features listed. — [material-web releases](https://github.com/material-components/material-web/releases); [npm @material/web](https://www.npmjs.com/package/@material/web)
- [COMMUNITY/press] Maintenance mode was announced in June 2024 after the engineers were reassigned. — [9to5Google](https://9to5google.com/2024/06/25/material-web-components/)

**MUI**
- [OFFICIAL] The MUI docs overview states: "Material UI supports Material Design 2." — [MUI overview source](https://github.com/mui/material-ui/blob/master/docs/data/material/getting-started/overview/overview.md)
- [OFFICIAL] Issue #29345 "Adopt Material Design 3 / Material You" is **still open** (174 comments, last updated 2026-06-03). — [GitHub issue #29345](https://github.com/mui/material-ui/issues/29345)
- [OFFICIAL] Material UI skipped v8 and went v7 → **v9 (April 2026)**. The npm latest is `@mui/material` 9.5.0 (2026-10-09). — [Introducing MUI v9](https://mui.com/blog/introducing-mui-v9/); [MUI versions](https://mui.com/versions/); [npm @mui/material](https://www.npmjs.com/package/@mui/material)

**Community M3 / M3 Expressive libraries** [COMMUNITY], with npm data as of 12 Nov 2026:
| Package | Version / date | Nature | Notes |
|---|---|---|---|
| `@m3e/web` + `@m3e/react` | 2.12.1 / 2026-11-11 | Lit-style web components + React bindings | MIT, ~331 GitHub stars, "Material 3 Expressive Web Components", also `@m3e/icons`, `@m3e/mcp`; not affiliated with Google — [GitHub matraic/m3e](https://github.com/matraic/m3e); [npm @m3e/react](https://www.npmjs.com/package/@m3e/react) |
| `material-expressive-react` | 0.2.1 / 2026-03-01 | React wrappers over `@material/web` | inherits MWC maintenance status — [dev.to author post](https://dev.to/prudhvi_raj/i-built-a-react-library-for-material-3-expressive-with-motion-demos-docs-mb1); [pkgstats](https://www.pkgstats.com/pkg:material-expressive-react) |
| `@ibx34/m3x` | 0.3.1 / 2026-08-11 | React components + tokens | pre-1.0 — [GitHub tankrap/m3x](https://github.com/tankrap/m3x) |
| `@hadi_gunawan/md3-expressive-ds` | 0.7.0 / 2026-07-23 | React + TS, 40+ components | pre-1.0 — [jsDelivr](https://www.jsdelivr.com/package/npm/@hadi_gunawan/md3-expressive-ds) |
| `mdui` | 2.1.5 / 2026-07-14 | Material You web components | M3 baseline (not Expressive), suggested as an MWC alternative — [MWC discussion](https://github.com/material-components/material-web/discussions/5642); [npm mdui](https://www.npmjs.com/package/mdui) |
| `beercss` | 5.0.3 / 2026-08-04 | CSS-only Material | lightweight — [npm beercss](https://www.npmjs.com/package/beercss) |
| `shape-morph` | 0.4.0 / 2026-02-13 | Shapes + morph, React hook | MIT — [docs](https://shape-morph.thereallo.dev/docs) |

**Tailwind v4**
- [OFFICIAL-vendor] Theme variables are defined with `@theme` and create utilities (e.g. `--color-mint-500` → `bg-mint-500`). They must be top-level, not nested under selectors or media queries. `--breakpoint-*` defines responsive variants. — [Tailwind docs: theme](https://tailwindcss.com/docs/theme). npm `tailwindcss` 4.3.5 (2026-11-06). — [npm](https://www.npmjs.com/package/tailwindcss)
- [COMMUNITY] For runtime theme switching, map Tailwind tokens to CSS variables (`@theme inline { --color-primary: var(--md-sys-color-primary); }`). Sources disagree on `@theme inline` pitfalls, which only bite when literal values are inlined. — [shadcn Tailwind v4 notes](https://v3.shadcn.com/docs/tailwind-v4)

**Material Symbols**
- [OFFICIAL] There are four variable axes. **FILL** 0–1, **wght** 100–700 (default 400), **GRAD** (e.g. -25 low emphasis to 200 high emphasis, default 0) and **opsz** 20–48 (default 48). Licence is Apache 2.0, with self-hosting supported. — [Google Fonts: Material Symbols guide](https://developers.google.com/fonts/docs/material_symbols)
- [OFFICIAL] Subset with `&icon_names=` (an **alphabetically sorted**, comma-separated list). The full font is 3,800+ icons at **295 KB**, while a 3-icon subset is **1.7 KB**. Also "instance" the axes to only the values you use. Example: `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&icon_names=home,palette,settings&display=block`. — [Material Symbols guide](https://developers.google.com/fonts/docs/material_symbols)
- [COMMUNITY] Unsorted `icon_names` lists render as literal text. — [Qiita](https://qiita.com/signo/items/211e50c172c5dfe1a294)
- [COMMUNITY] npm `material-symbols` / `@material-symbols/font-400` 0.49.0 (2026-11-12) and `@fontsource-variable/material-symbols-rounded` 5.3.9 exist (full fonts, which are large). — [npm material-symbols](https://www.npmjs.com/package/material-symbols); [npm @fontsource-variable/material-symbols-rounded](https://www.npmjs.com/package/@fontsource-variable/material-symbols-rounded)

**Supporting stack versions** [OFFICIAL-vendor npm]: `next` 16.4.6 (2026-11-09), `react-aria-components` 1.22.1 (2026-10-09), `motion` 14.12.0 (2026-11-10). — [npm next](https://www.npmjs.com/package/next); [npm react-aria-components](https://www.npmjs.com/package/react-aria-components); [npm motion](https://www.npmjs.com/package/motion)

### Recommended stack (ONE) [INFERENCE]
**Next.js 16 App Router + Tailwind CSS v4 + build-time M3 tokens (MCU 0.4, spec 2025) as CSS variables + React Aria Components + Motion (LazyMotion, only where needed) + shape-morph + self-hosted, subsetted Material Symbols Rounded + one self-hosted variable text font (Google Sans Flex or Roboto Flex, subset).**

Reasons:
1. No official React or web Expressive library exists, and MUI is MD2. Owning the components avoids lock-in to pre-1.0 community projects.
2. React Aria provides robust accessibility (focus, keyboard, screen readers, i18n/RTL, touch press handling with 48dp hit areas) with zero styling, so the M3 visual layer stays yours. Radix is an acceptable alternative.
3. Tailwind v4's CSS-first `@theme` maps 1:1 onto `--md-sys-*` tokens and generates no runtime JS.
4. RSC by default means most of the UI ships zero JS. Only interactive islands hydrate.
5. CSS `linear()` springs cover about 80% of motion with no JS. Motion handles gestures and sheets.

Tailwind mapping:
```css
/* app/globals.css */
@import "tailwindcss";
@import "./tokens.css";            /* generated --md-sys-color-* per theme/contrast */
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
@theme inline {
  --color-primary: var(--md-sys-color-primary);
  --color-on-primary: var(--md-sys-color-on-primary);
  --color-primary-container: var(--md-sys-color-primary-container);
  --color-on-primary-container: var(--md-sys-color-on-primary-container);
  --color-surface: var(--md-sys-color-surface);
  --color-surface-container-low: var(--md-sys-color-surface-container-low);
  --color-surface-container: var(--md-sys-color-surface-container);
  --color-surface-container-high: var(--md-sys-color-surface-container-high);
  --color-on-surface: var(--md-sys-color-on-surface);
  --color-on-surface-variant: var(--md-sys-color-on-surface-variant);
  --color-outline: var(--md-sys-color-outline);
  --color-outline-variant: var(--md-sys-color-outline-variant);
  --color-error: var(--md-sys-color-error);
  /* ...all roles */
}
@theme {
  --radius-xs: 4px; --radius-sm: 8px; --radius-md: 12px; --radius-lg: 16px;
  --radius-lg-inc: 20px; --radius-xl: 28px; --radius-xl-inc: 32px; --radius-2xl: 48px;
  --font-brand: "Google Sans Flex", system-ui, sans-serif;
  --text-body-lg: 1rem; --text-body-lg--line-height: 1.5rem; --text-body-lg--letter-spacing: .03125rem;
  --breakpoint-medium: 600px; --breakpoint-expanded: 840px; --breakpoint-large: 1200px; --breakpoint-xlarge: 1600px;
}
```

Material Symbols self-hosted subset (build step):
```bash
# 1) download a pinned subset once at build time (names sorted!), commit the WOFF2
curl -A "Mozilla/5.0 Chrome/120" "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0..1,0&icon_names=arrow_back,build,call,car_repair,check_circle,checkroom,construction,content_cut,electrical_services,home,person,plumbing,search,star,verified&display=block" > symbols.css
# 2) fetch the woff2 URL inside symbols.css → public/fonts/symbols.woff2 ; reference via next/font/local
```
```tsx
// app/fonts.ts
import localFont from 'next/font/local';
export const symbols = localFont({ src: './fonts/symbols.woff2', display: 'block', variable: '--font-symbols' });
// usage: <span className="font-[var(--font-symbols)] [font-variation-settings:'FILL'_1,'wght'_400,'GRAD'_0,'opsz'_24]" aria-hidden>plumbing</span>
```
Alternative with no font at all: inline the needed icons as SVG React components (from the Material Symbols SVG set) so each icon costs only its own bytes and needs no FOIT handling. [INFERENCE] For fewer than about 40 icons, inline SVG is usually smaller and more robust offline.

### Risks [INFERENCE]
- **No official web spec implementation.** Expressive component behaviour must be reverse-engineered from Compose and the Figma kit, so drift is likely as Google updates tokens (e.g. emphasized type is marked TODO).
- MCU's default spec is '2021'. Forgetting `'2025'` silently produces old-style schemes. Its API is pre-1.0 (0.4.0).
- Community Expressive libs are pre-1.0 or single-maintainer. If you adopt `@m3e/react` for speed, isolate it behind your own wrapper components.
- Web components (m3e, MWC) need hydration care in RSC/SSR (Declarative Shadow DOM support varies), which adds JS cost.
- Motion bundle cost on 2G/3G. Use `LazyMotion` and restrict it to client islands.
- Trademark: do not name the product UI kit "Material".
- Shape morphing and wavy progress are CPU-heavy on low-end devices. Gate them behind `prefers-reduced-motion` and device heuristics (`navigator.hardwareConcurrency <= 4`, `navigator.connection.saveData`).

### Gaps
- MUI's official public plans for M3 in 2026 ("2026 and beyond" blog) could not be fetched (connection reset). Treat MUI M3 support as "not shipped" based on the docs statement and the open issue.
- Download counts, test coverage and Expressive-coverage completeness of the community libraries were not audited.

---

## 10. Performance on low-end Android (fonts, motion, data)

### Takeaway
Ship static CSS tokens, one subsetted variable text font, a subsetted icon font or inline SVGs, and CSS `linear()` transitions by default. Lazy-load JS springs, honour `prefers-reduced-motion` and Save-Data, and animate only transform and opacity.

### Cited Findings
- [OFFICIAL] An icon font subset cuts payload from 295 KB to 1.7 KB for 3 icons. Instancing axes further reduces size. — [Material Symbols guide](https://developers.google.com/fonts/docs/material_symbols)
- [OFFICIAL-vendor] `linear()` approximates springs in pure CSS. It is supported in Chrome/Edge 113+, Firefox 112+ and Safari 17.2+. — [Chrome for Developers](https://developer.chrome.com/docs/css-ui/css-linear-easing-function)
- [OFFICIAL-vendor] Motion supports duration-based springs and global config through `MotionConfig`. Physics springs incorporate gesture velocity. — [Motion transitions docs](https://motion.dev/docs/react-transitions)
- [COMMUNITY] Self-hostable variable font packages exist for Google Sans Flex, Roboto Flex and Material Symbols (OFL/Apache). — [Fontsource Google Sans Flex](https://fontsource.org/fonts/google-sans-flex)

### Inferences (performance budget for the spec)
- Budget: about 170 KB total JS for first load on the home route (gzip), under 60 KB fonts, and CSS tokens under 10 KB. Measure on a real low-end Android device (e.g. 2 GB RAM, Android Go) with Chrome DevTools throttling ("Slow 4G", 4x CPU slowdown).
- Fonts: use `next/font/local` with a pre-subset WOFF2 (Latin + Latin-Ext; glyphs for French accents and Cameroonian names). Pin the weight axis range to 400–700 and drop slant/width axes unless used. If budget is tight, fall back to `system-ui` (Roboto is already on Android). On most target devices Roboto is local, so **Roboto Flex is optional**. Choosing a system font for body text and a webfont for headlines only is a valid low-data option.
- Motion: CSS transitions with spring `linear()` for press, hover, toggle and fades. Use Motion only for sheets, the FAB menu, drag gestures and layout animations. Wrap with `MotionConfig reducedMotion="user"`. Detect `navigator.connection?.saveData` and disable decorative motion and morphs.
- Images (artisan portfolios): use `next/image` with AVIF/WebP, explicit sizes, `loading="lazy"` and low `quality` (about 60). Use blurred placeholders generated at build time.
- Offline and repeat visits: cache fonts, icons and CSS immutably. Consider a service worker (e.g. Serwist) for the app shell.
- Avoid `backdrop-filter`, large box-shadows and animated `clip-path` on long lists. Use tonal surfaces instead of shadows.

### Gaps
- No measured benchmarks of Motion vs CSS spring performance on low-end Android were found in sources consulted.
- Exact WOFF2 sizes for subsetted Google Sans Flex were not measured.

---

## Numbered source list

1. design.google, "Expressive Material Design: Google research": https://design.google/library/expressive-material-design-google-research
2. androidx ExpressiveMotionTokens.kt: https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ExpressiveMotionTokens.kt
3. androidx StandardMotionTokens.kt: https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/StandardMotionTokens.kt
4. androidx TypeScaleTokens.kt: https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/TypeScaleTokens.kt
5. androidx TypographyTokens.kt: https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/TypographyTokens.kt
6. androidx ShapeTokens.kt: https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ShapeTokens.kt
7. androidx MaterialShapes.kt: https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/MaterialShapes.kt
8. androidx ButtonXSmallTokens.kt: https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ButtonXSmallTokens.kt
9. androidx ButtonSmallTokens.kt: https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ButtonSmallTokens.kt
10. androidx ButtonMediumTokens.kt: https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ButtonMediumTokens.kt
11. androidx ButtonLargeTokens.kt: https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ButtonLargeTokens.kt
12. androidx ButtonXLargeTokens.kt: https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ButtonXLargeTokens.kt
13. androidx ButtonGroupSmallTokens.kt: https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ButtonGroupSmallTokens.kt
14. androidx SplitButtonSmallTokens.kt: https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/SplitButtonSmallTokens.kt
15. androidx FabBaselineTokens.kt: https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/FabBaselineTokens.kt
16. androidx FabMediumTokens.kt: https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/FabMediumTokens.kt
17. androidx FabLargeTokens.kt: https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/FabLargeTokens.kt
18. androidx ExtendedFab{Small,Medium,Large}Tokens.kt: https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ExtendedFabMediumTokens.kt
19. androidx FabMenuBaselineTokens.kt: https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/FabMenuBaselineTokens.kt
20. androidx LoadingIndicatorTokens.kt: https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/LoadingIndicatorTokens.kt
21. androidx ProgressIndicatorTokens.kt: https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ProgressIndicatorTokens.kt
22. androidx FloatingToolbarTokens.kt: https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/FloatingToolbarTokens.kt
23. androidx DockedToolbarTokens.kt: https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/DockedToolbarTokens.kt
24. androidx NavigationRailCollapsedTokens.kt / NavigationRailExpandedTokens.kt: https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/NavigationRailExpandedTokens.kt
25. androidx SliderTokens.kt: https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/SliderTokens.kt
26. androidx StateTokens.kt: https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/StateTokens.kt
27. androidx ElevationTokens.kt: https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ElevationTokens.kt
28. Android Developers Blog, "Androidify: Building delightful UIs with Compose" (May 2025): https://android-developers.googleblog.com/2025/05/androidify-building-delightful-ui-with-compose.html
29. Kotlin/Compose MotionScheme API reference: https://kotlinlang.org/api/compose-multiplatform/material3/androidx.compose.material3/-motion-scheme/-companion/index.html
30. Android Developers, Use window size classes: https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes
31. Android Developers, androidx.graphics.shapes package summary: https://developer.android.com/reference/kotlin/androidx/graphics/shapes/package-summary
32. Android Developers, Shapes in Compose: https://developer.android.com/jetpack/compose/graphics/draw/shapes
33. Android Developers (Medium), "The Shape of Things to Come": https://medium.com/androiddevelopers/the-shape-of-things-to-come-1c7663d9dbc0
34. material-color-utilities TypeScript README: https://github.com/material-foundation/material-color-utilities/blob/main/typescript/README.md
35. MCU variant.ts: https://github.com/material-foundation/material-color-utilities/blob/main/typescript/dynamiccolor/variant.ts
36. MCU dynamic_scheme.ts: https://github.com/material-foundation/material-color-utilities/blob/main/typescript/dynamiccolor/dynamic_scheme.ts
37. MCU color_spec.ts: https://github.com/material-foundation/material-color-utilities/blob/main/typescript/dynamiccolor/color_spec.ts
38. MCU material_dynamic_colors.ts: https://github.com/material-foundation/material-color-utilities/blob/main/typescript/dynamiccolor/material_dynamic_colors.ts
39. MCU scheme_tonal_spot.ts (and scheme dir): https://github.com/material-foundation/material-color-utilities/blob/main/typescript/scheme/scheme_tonal_spot.ts
40. npm @material/material-color-utilities: https://www.npmjs.com/package/@material/material-color-utilities
41. material-web README: https://github.com/material-components/material-web
42. material-web Discussion #5642 "MWC is in maintenance mode": https://github.com/material-components/material-web/discussions/5642
43. material-web releases: https://github.com/material-components/material-web/releases
44. npm @material/web: https://www.npmjs.com/package/@material/web
45. 9to5Google, Material Web Components maintenance mode (June 2024): https://9to5google.com/2024/06/25/material-web-components/
46. MUI overview doc source ("supports Material Design 2"): https://github.com/mui/material-ui/blob/master/docs/data/material/getting-started/overview/overview.md
47. MUI GitHub issue #29345 "Adopt Material Design 3": https://github.com/mui/material-ui/issues/29345
48. MUI blog, Introducing Material UI and MUI X v9: https://mui.com/blog/introducing-mui-v9/
49. MUI versions page: https://mui.com/versions/
50. npm @mui/material: https://www.npmjs.com/package/@mui/material
51. GitHub matraic/m3e (M3E web components): https://github.com/matraic/m3e
52. npm @m3e/react: https://www.npmjs.com/package/@m3e/react
53. dev.to, material-expressive-react author post: https://dev.to/prudhvi_raj/i-built-a-react-library-for-material-3-expressive-with-motion-demos-docs-mb1
54. pkgstats material-expressive-react: https://www.pkgstats.com/pkg:material-expressive-react
55. GitHub tankrap/m3x: https://github.com/tankrap/m3x
56. jsDelivr @hadi_gunawan/md3-expressive-ds: https://www.jsdelivr.com/package/npm/@hadi_gunawan/md3-expressive-ds
57. npm mdui: https://www.npmjs.com/package/mdui
58. npm beercss: https://www.npmjs.com/package/beercss
59. shape-morph docs: https://shape-morph.thereallo.dev/docs
60. npm shape-morph: https://www.npmjs.com/package/shape-morph
61. pub.dev androidx_graphics_shapes (Flutter port): https://pub.dev/documentation/androidx_graphics_shapes/1.3.2/shapes
62. pub.dev M3EMotion (Flutter m3e_slider): https://pub.dev/documentation/m3e_slider/0.0.2/common_m3e_common/M3EMotion-class.html
63. Motion docs, React transitions: https://motion.dev/docs/react-transitions
64. npm motion: https://www.npmjs.com/package/motion
65. Mintlify mirror of Motion useSpring API: https://www.mintlify.com/motiondivision/motion/api/use-spring
66. Chrome for Developers, CSS linear() easing: https://developer.chrome.com/docs/css-ui/css-linear-easing-function
67. Tailwind CSS docs, Theme variables: https://tailwindcss.com/docs/theme
68. npm tailwindcss: https://www.npmjs.com/package/tailwindcss
69. shadcn/ui, Tailwind v4 notes: https://v3.shadcn.com/docs/tailwind-v4
70. Google Fonts, Material Symbols guide: https://developers.google.com/fonts/docs/material_symbols
71. Qiita, icon_names ordering gotcha: https://qiita.com/signo/items/211e50c172c5dfe1a294
72. npm material-symbols: https://www.npmjs.com/package/material-symbols
73. npm @fontsource-variable/material-symbols-rounded: https://www.npmjs.com/package/@fontsource-variable/material-symbols-rounded
74. design.google, Making Google Sans Flex: https://design.google/library/google-sans-flex-font
75. OMG! Ubuntu, Google Sans Flex open source (Nov 2025): https://www.omgubuntu.co.uk/2025/11/google-sans-flex-font-ubuntu
76. Abduzeedo, Google Sans Flex axes: https://www.abduzeedo.com/google-sans-flex-free-font-six-variable-axes-one-file
77. It's FOSS, Google Sans Flex: https://itsfoss.com/news/google-sans-flex/
78. Fontsource, Google Sans Flex: https://fontsource.org/fonts/google-sans-flex
79. npm @fontsource-variable/google-sans-flex: https://www.npmjs.com/package/@fontsource-variable/google-sans-flex
80. heise, Android 16 Pixel update with M3 Expressive: https://heise.de/-10631292
81. Android Central, Android 16 QPR1 Beta 1 with M3 Expressive: https://www.androidcentral.com/apps-software/android-os/android-16-qpr1-beta-1-now-starts-rolling
82. Gigazine, Android 16 / Wear OS 6 M3 Expressive announcement: https://www.gigazine.net/gsc_news/en/20250514-android-16-wear-6-material-3-expressive
83. AndroidSage, M3 Expressive revealed (13 May 2025): https://androidsage.com/2025/05/13/google-material-3-expressive-design-for-android-and-wear-os
84. Android Authority, Material Design Expressive at I/O: https://androidauthority.com/material-design-expressive-google-io-3545058/
85. supercharge.design, M3 Expressive for designers: https://supercharge.design/blog/material-3-expressive
86. ProAndroidDev, M3 Expressive Design Part 2: https://proandroiddev.com/material-3-expressive-design-a-new-era-part-2-6a93483c98b0
87. ProAndroidDev, Android 16 x M3E updates: https://proandroiddev.com/android-16-x-material-3-e-biggest-ui-change-yet-updates-for-android-jetpack-compose-and-flutter-35d6b53a5242
88. 9to5Google, M3 Expressive menus (Nov 2025): https://9to5google.com/2025/11/22/material-3-expressive-menus/
89. Speaker Deck (ym223), M3 Expressive intro: https://speakerdeck.com/ym223/hazimetenomaterial3-expressive
90. npm next: https://www.npmjs.com/package/next
91. npm react-aria-components: https://www.npmjs.com/package/react-aria-components
