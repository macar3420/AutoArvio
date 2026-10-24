package fi.tamk.autoarvio.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val LightColors = lightColorScheme(
    primary = Ultramarine,
    onPrimary = Color.White,
    secondary = AccentTeal,
    onSecondary = Color.White,
    background = Mist,
    onBackground = Ink,
    surface = Color.White,
    onSurface = Ink,
)

private val DarkColors = darkColorScheme(
    primary = Ultramarine,
    onPrimary = Color.White,
    secondary = AccentTeal,
    onSecondary = Color.White,
    background = Ink,
    onBackground = Mist,
    surface = Color(0xFF152238),
    onSurface = Mist,
)

@Composable
fun AutoArvioTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit,
) {
    MaterialTheme(
        colorScheme = if (darkTheme) DarkColors else LightColors,
        typography = AutoArvioTypography,
        content = content,
    )
}
