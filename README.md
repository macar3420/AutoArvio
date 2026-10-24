# AutoArvio

Android MVP for car make → model browsing (TAMK thesis).  
Kotlin + Jetpack Compose, MVVM, Navigation, Room (seed path stubbed for later JSON).

**Package:** `fi.tamk.autoarvio`

## Open & run in Android Studio

1. Install / open **Android Studio** (already on this PC: `C:\Program Files\Android\Android Studio`).
2. **File → Open** → select `C:\Users\musta\Desktop\AutoArvio` (the folder that contains `settings.gradle.kts`).
3. Wait for Gradle sync. If prompted for a JDK, use **JDK 17+** (Temurin 17 is fine; Android Studio’s bundled JBR also works).
4. Connect a device or start an emulator (**Tools → Device Manager**).
5. Click **Run** (green triangle) on the `app` configuration.

### First-time SDK note

`local.properties` points at:

`C:\Users\musta\AppData\Local\Android\Sdk`

That file is gitignored — do not commit it. Other machines generate their own via Android Studio.

### Optional PATH (terminal builds)

If `java` / `adb` are missing from a new terminal:

```powershell
$env:JAVA_HOME = "C:\Users\musta\AppData\Local\Programs\Eclipse Adoptium\jdk-17.0.9.9-hotspot"
$env:ANDROID_HOME = "C:\Users\musta\AppData\Local\Android\Sdk"
$env:Path = "$env:JAVA_HOME\bin;$env:ANDROID_HOME\platform-tools;$env:Path"
.\gradlew.bat assembleDebug
```

## Project layout

```
app/src/main/java/fi/tamk/autoarvio/
  ui/          # Compose screens, ViewModels, theme, navigation
  data/        # Room DB, DAOs, repository, JSON→Room seeder stub
  domain/      # Make / Model models
```

Flow today: **Splash (Ultramarine `#0437F2` + Outfit wordmark) → Make list → Model list** (placeholder catalog). Room DB is created empty; `DatabaseSeeder` is ready for the JSON seed task.

## Thesis folder

`Thesis/` is **gitignored** so thesis Word/PDF files stay local and out of the app repository.
