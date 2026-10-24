package fi.tamk.autoarvio.ui.navigation

import android.net.Uri

object Routes {
    const val MAKE_LIST = "makes"
    const val MODEL_LIST = "makes/{makeId}/models?q={q}"

    fun modelList(makeId: String, query: String = ""): String {
        val encodedMake = Uri.encode(makeId)
        val encodedQ = Uri.encode(query)
        return "makes/$encodedMake/models?q=$encodedQ"
    }
}
