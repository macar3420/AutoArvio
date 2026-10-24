package fi.tamk.autoarvio.domain.model

/**
 * A model generation (e.g. Audi A4 B8).
 *
 * [imageAsset] is a drawable resource name without extension
 * (e.g. "generation_placeholder"). Real same-style photos can replace
 * the shared placeholder later without changing list/detail UI.
 */
data class Generation(
    val id: String,
    val modelId: String,
    val code: String,
    val yearFrom: Int,
    val yearTo: Int? = null,
    val imageAsset: String = "generation_placeholder",
) {
    fun yearLabel(): String =
        if (yearTo != null) "$yearFrom–$yearTo" else "$yearFrom–"
}
