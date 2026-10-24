package fi.tamk.autoarvio.ui.splash

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import fi.tamk.autoarvio.R
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
        Image(
            painter = painterResource(R.drawable.autoarvio_logo),
            contentDescription = "AutoArvio",
            modifier = Modifier.fillMaxWidth(0.68f),
            contentScale = ContentScale.FillWidth,
        )
    }
}
