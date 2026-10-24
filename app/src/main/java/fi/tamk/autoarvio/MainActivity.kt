package fi.tamk.autoarvio

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import fi.tamk.autoarvio.ui.AutoArvioApp
import fi.tamk.autoarvio.ui.theme.AutoArvioTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        // Single branded open: system splash (Ultramarine + logo). No second Compose splash.
        installSplashScreen()
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            AutoArvioTheme {
                AutoArvioApp()
            }
        }
    }
}
