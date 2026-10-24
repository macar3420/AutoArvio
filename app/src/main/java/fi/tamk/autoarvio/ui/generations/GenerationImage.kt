package fi.tamk.autoarvio.ui.generations

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import fi.tamk.autoarvio.R
import fi.tamk.autoarvio.ui.theme.Mist

/** Shared 16:9 image slot; resolves [imageAsset] drawable name, falls back to placeholder. */
@Composable
fun GenerationImage(
    imageAsset: String,
    contentDescription: String?,
    modifier: Modifier = Modifier,
) {
    val context = LocalContext.current
    val resId = context.resources.getIdentifier(
        imageAsset,
        "drawable",
        context.packageName,
    ).takeIf { it != 0 } ?: R.drawable.generation_placeholder

    Box(
        modifier = modifier
            .aspectRatio(16f / 9f)
            .clip(RoundedCornerShape(8.dp))
            .background(Mist),
    ) {
        Image(
            painter = painterResource(resId),
            contentDescription = contentDescription,
            modifier = Modifier.fillMaxSize(),
            contentScale = ContentScale.Crop,
        )
    }
}
