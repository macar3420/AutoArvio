package fi.tamk.autoarvio.domain.model

data class Model(
    val id: String,
    val makeId: String,
    val name: String,
    val yearFrom: Int? = null,
    val yearTo: Int? = null,
)
