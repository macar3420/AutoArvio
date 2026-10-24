package fi.tamk.autoarvio.data.repository

import fi.tamk.autoarvio.domain.model.Make
import fi.tamk.autoarvio.domain.model.Model
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flowOf

/**
 * MVP: in-memory placeholders.
 * Later: observe Room DAOs once [fi.tamk.autoarvio.data.seed.DatabaseSeeder] loads JSON.
 */
class CatalogRepository {
    fun observeMakes(): Flow<List<Make>> = flowOf(PlaceholderCatalog.makes)

    fun observeModels(makeId: String): Flow<List<Model>> =
        flowOf(PlaceholderCatalog.models.filter { it.makeId == makeId })

    fun makeName(makeId: String): String =
        PlaceholderCatalog.makes.firstOrNull { it.id == makeId }?.name ?: makeId
}

private object PlaceholderCatalog {
    val makes = listOf(
        Make(id = "toyota", name = "Toyota"),
        Make(id = "volkswagen", name = "Volkswagen"),
        Make(id = "volvo", name = "Volvo"),
        Make(id = "bmw", name = "BMW"),
        Make(id = "skoda", name = "Škoda"),
    )

    val models = listOf(
        Model(id = "corolla", makeId = "toyota", name = "Corolla", yearFrom = 2019),
        Model(id = "rav4", makeId = "toyota", name = "RAV4", yearFrom = 2019),
        Model(id = "yaris", makeId = "toyota", name = "Yaris", yearFrom = 2020),
        Model(id = "golf", makeId = "volkswagen", name = "Golf", yearFrom = 2020),
        Model(id = "passat", makeId = "volkswagen", name = "Passat", yearFrom = 2015, yearTo = 2022),
        Model(id = "tiguan", makeId = "volkswagen", name = "Tiguan", yearFrom = 2016),
        Model(id = "xc60", makeId = "volvo", name = "XC60", yearFrom = 2017),
        Model(id = "v60", makeId = "volvo", name = "V60", yearFrom = 2018),
        Model(id = "3series", makeId = "bmw", name = "3 Series", yearFrom = 2019),
        Model(id = "x3", makeId = "bmw", name = "X3", yearFrom = 2018),
        Model(id = "octavia", makeId = "skoda", name = "Octavia", yearFrom = 2020),
        Model(id = "kodiaq", makeId = "skoda", name = "Kodiaq", yearFrom = 2017),
    )
}
