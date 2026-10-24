package fi.tamk.autoarvio.ui.navigation

import android.net.Uri

object Routes {
    const val MAKE_LIST = "makes"
    const val MODEL_LIST = "makes/{makeId}/models?q={q}"
    const val GENERATION_LIST = "models/{modelId}/generations"
    /** Engines & versions list for a generation. */
    const val GENERATION_DETAIL = "generations/{generationId}"
    const val VARIANT_DETAIL = "variants/{variantId}"

    fun modelList(makeId: String, query: String = ""): String {
        val encodedMake = Uri.encode(makeId)
        val encodedQ = Uri.encode(query)
        return "makes/$encodedMake/models?q=$encodedQ"
    }

    fun generationList(modelId: String): String =
        "models/${Uri.encode(modelId)}/generations"

    fun generationDetail(generationId: String): String =
        "generations/${Uri.encode(generationId)}"

    fun variantDetail(variantId: String): String =
        "variants/${Uri.encode(variantId)}"
}
