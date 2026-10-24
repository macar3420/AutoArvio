package fi.tamk.autoarvio.ui.splash

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.offset
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import fi.tamk.autoarvio.ui.theme.OutfitFamily
import fi.tamk.autoarvio.ui.theme.Ultramarine
import kotlinx.coroutines.delay

private const val SplashDurationMs = 1_500L

@Composable
fun SplashScreen(
    onFinished: () -> Unit,
) {
    LaunchedEffect(Unit) {
        delay(SplashDurationMs)
        onFinished()
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Ultramarine),
        contentAlignment = Alignment.Center,
    ) {
        // Slightly above true center — Nettiauto-style wordmark placement.
        Row(
            modifier = Modifier.offset(y = (-36).dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Text(
                text = "Auto",
                color = Color.White,
                fontFamily = OutfitFamily,
                fontWeight = FontWeight.Bold,
                fontSize = 42.sp,
                letterSpacing = (-0.8).sp,
            )
            Text(
                text = "Arvio",
                color = Color.White,
                fontFamily = OutfitFamily,
                fontWeight = FontWeight.Normal,
                fontSize = 42.sp,
                letterSpacing = (-0.8).sp,
            )
        }
    }
}
