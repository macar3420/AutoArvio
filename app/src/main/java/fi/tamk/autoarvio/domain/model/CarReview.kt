package fi.tamk.autoarvio.domain.model

data class ReviewSource(
    val source: String,
    val title: String,
    val text: String,
    val url: String,
)

/**
 * Editorial review for one generation. Sources stay separated:
 * Reddit posts, published tests, other web pages, and a labelled AI reading.
 * [ratingOutOfFive] is this app's reading, not a magazine score.
 */
data class CarReview(
    val generationId: String,
    val ratingOutOfFive: Int?,
    val summary: String,
    /** Set when the catalog engine row is not the car the sources tested. */
    val scopeNote: String?,
    val reddit: List<ReviewSource>,
    val published: List<ReviewSource>,
    val web: List<ReviewSource>,
    val aiReading: String,
    val runningCosts: String,
    val recalls: String,
)
