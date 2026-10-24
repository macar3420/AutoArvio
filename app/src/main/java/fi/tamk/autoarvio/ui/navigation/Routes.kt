package fi.tamk.autoarvio.ui.navigation

object Routes {
    const val MAKE_LIST = "makes"
    const val MODEL_LIST = "makes/{makeId}/models"

    fun modelList(makeId: String) = "makes/$makeId/models"
}
