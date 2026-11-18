package fi.tamk.autoarvio.data.repository

import android.content.Context
import fi.tamk.autoarvio.domain.model.CarReview
import fi.tamk.autoarvio.domain.model.ReviewSource
import org.json.JSONArray
import org.json.JSONObject

fun loadReviews(context: Context): Map<String, CarReview> {
    val json = context.assets.open("catalog/reviews.json")
        .bufferedReader()
        .use { it.readText() }
    val array = JSONObject(json).optJSONArray("reviews") ?: return emptyMap()
    return buildMap {
        for (i in 0 until array.length()) {
            val review = array.getJSONObject(i).toReview()
            put(review.generationId, review)
        }
    }
}

private fun JSONObject.toReview(): CarReview = CarReview(
    generationId = getString("generationId"),
    ratingOutOfFive = if (isNull("ratingOutOfFive")) null else getInt("ratingOutOfFive"),
    summary = getString("summary"),
    scopeNote = optNullableString("scopeNote"),
    reddit = optJSONArray("reddit").toSources(),
    published = optJSONArray("published").toSources(),
    web = optJSONArray("web").toSources(),
    aiReading = getString("aiReading"),
    runningCosts = getString("runningCosts"),
    recalls = getString("recalls"),
)

private fun JSONArray?.toSources(): List<ReviewSource> {
    if (this == null) return emptyList()
    return buildList {
        for (i in 0 until length()) {
            val o = getJSONObject(i)
            add(
                ReviewSource(
                    source = o.getString("source"),
                    title = o.getString("title"),
                    text = o.getString("text"),
                    url = o.getString("url"),
                ),
            )
        }
    }
}

private fun JSONObject.optNullableString(key: String): String? {
    if (!has(key) || isNull(key)) return null
    val value = optString(key)
    return value.ifBlank { null }
}
