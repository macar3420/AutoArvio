package fi.tamk.autoarvio.ui.generations

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import fi.tamk.autoarvio.domain.model.CarReview
import fi.tamk.autoarvio.domain.model.ReviewSource
import fi.tamk.autoarvio.ui.theme.OutfitFamily
import fi.tamk.autoarvio.ui.theme.Ultramarine

@Composable
fun ReviewSection(review: CarReview) {
    val uriHandler = LocalUriHandler.current
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(bottom = 8.dp),
    ) {
        Text(
            text = "Reviews",
            fontFamily = OutfitFamily,
            fontWeight = FontWeight.SemiBold,
            fontSize = 14.sp,
            lineHeight = 18.sp,
            color = Ultramarine,
        )
        HorizontalDivider(
            color = Ultramarine.copy(alpha = 0.2f),
            thickness = 0.5.dp,
            modifier = Modifier.padding(top = 3.dp, bottom = 8.dp),
        )
        review.ratingOutOfFive?.let { rating ->
            Text(
                text = "AutoArvio $rating/5",
                fontFamily = OutfitFamily,
                fontWeight = FontWeight.SemiBold,
                fontSize = 15.sp,
                color = MaterialTheme.colorScheme.onSurface,
            )
            ReviewBody("This is the app's reading of the sources below, not a magazine score.")
        }
        ReviewBody(review.summary)
        review.scopeNote?.let { note ->
            Text(
                text = note,
                modifier = Modifier.padding(top = 8.dp),
                fontFamily = OutfitFamily,
                fontSize = 13.sp,
                lineHeight = 18.sp,
                color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.7f),
            )
        }
        SourceBlock(
            title = "Reddit",
            sources = review.reddit,
            empty = "No Reddit thread on this car turned up in this pass.",
            onOpen = uriHandler::openUri,
        )
        SourceBlock(
            title = "Published tests",
            sources = review.published,
            empty = "No published road test of this generation was used.",
            onOpen = uriHandler::openUri,
        )
        SourceBlock(
            title = "Web",
            sources = review.web,
            empty = "No other web page was used for this generation.",
            onOpen = uriHandler::openUri,
        )
        ReviewHeading("AI reading")
        ReviewBody(review.aiReading)
        ReviewHeading("Running costs")
        ReviewBody(review.runningCosts)
        ReviewHeading("Recalls")
        ReviewBody(review.recalls)
    }
}

@Composable
private fun SourceBlock(
    title: String,
    sources: List<ReviewSource>,
    empty: String,
    onOpen: (String) -> Unit,
) {
    ReviewHeading(title)
    if (sources.isEmpty()) {
        ReviewBody(empty)
        return
    }
    sources.forEach { source ->
        Text(
            text = "${source.source} · ${source.title}",
            modifier = Modifier
                .padding(top = 8.dp)
                .clickable { onOpen(source.url) },
            fontFamily = OutfitFamily,
            fontWeight = FontWeight.SemiBold,
            fontSize = 13.sp,
            lineHeight = 17.sp,
            color = Ultramarine,
        )
        ReviewBody(source.text)
    }
}

@Composable
private fun ReviewHeading(title: String) {
    Text(
        text = title,
        modifier = Modifier.padding(top = 14.dp, bottom = 2.dp),
        fontFamily = OutfitFamily,
        fontWeight = FontWeight.SemiBold,
        fontSize = 13.sp,
        lineHeight = 17.sp,
        color = MaterialTheme.colorScheme.onSurface,
    )
}

@Composable
private fun ReviewBody(text: String) {
    Text(
        text = text,
        modifier = Modifier.padding(top = 4.dp),
        fontFamily = OutfitFamily,
        fontSize = 13.sp,
        lineHeight = 18.sp,
        color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.82f),
    )
}
