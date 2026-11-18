# AutoArvio

Android app for looking up a car sold in Finland. You pick a make, a model, and a generation, then open an engine and read a short review of that generation.

**Package:** `fi.tamk.autoarvio`

## What you can do

1. Search makes, or jump straight to a model.
2. Open the models for a make.
3. Open the generations, with the years that generation was sold.
4. Open an engine or version: power, fuel type, drive, gearbox, body, and consumption, battery, or electric range when the catalog has them.
5. Read the review for that generation. Owner threads, published road tests, and other web sources stay separate. The app then adds its own reading, running costs, and recalls. The score is AutoArvio's reading, not a magazine score.

## Stack

Kotlin, Jetpack Compose, and MVVM. Navigation Compose moves between the lists. The catalog is JSON in the app assets, read by `CatalogRepository`. Room is present as a later seed path and is not what the screens read today.

One system splash (Ultramarine `#0437F2` and the logo, via AndroidX SplashScreen), then the make list.

## Catalog data

| File | Contents |
|---|---|
| `app/src/main/assets/catalog/fi_catalog.json` | Makes and models |
| `app/src/main/assets/catalog/generations.json` | Generations |
| `app/src/main/assets/catalog/generation_specs.json` | Engines and versions |
| `app/src/main/assets/catalog/reviews.json` | Reviews |

`tools/` holds the per-brand lineup and engine sources, plus the scripts that write those JSON files back into the app.

## Open and run

1. Open the project folder in Android Studio (the folder that contains `settings.gradle.kts`).
2. Wait for Gradle sync. Use JDK 17 or newer if Android Studio asks.
3. Start an emulator or connect a device.
4. Run the `app` configuration.

`local.properties` points at the Android SDK on this machine and is gitignored. Another machine gets its own file from Android Studio.

## Layout

```
app/src/main/java/fi/tamk/autoarvio/
  ui/          Compose screens, ViewModels, theme, navigation
  data/        Catalog repository and the Room stub
  domain/      Make, model, generation, engine, and review models
app/src/main/assets/catalog/   The JSON the app reads
tools/         Brand lineups and the scripts that rebuild the catalog
```
