package fi.tamk.autoarvio.data.repository

import fi.tamk.autoarvio.domain.model.Make
import fi.tamk.autoarvio.domain.model.Model
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flowOf

/**
 * MVP: in-memory placeholders (common EU / Finland brands).
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
        Make(id = "audi", name = "Audi"),
        Make(id = "bmw", name = "BMW"),
        Make(id = "citroen", name = "Citroën"),
        Make(id = "cupra", name = "Cupra"),
        Make(id = "dacia", name = "Dacia"),
        Make(id = "fiat", name = "Fiat"),
        Make(id = "ford", name = "Ford"),
        Make(id = "honda", name = "Honda"),
        Make(id = "hyundai", name = "Hyundai"),
        Make(id = "kia", name = "Kia"),
        Make(id = "mazda", name = "Mazda"),
        Make(id = "mercedes", name = "Mercedes-Benz"),
        Make(id = "mini", name = "MINI"),
        Make(id = "mitsubishi", name = "Mitsubishi"),
        Make(id = "nissan", name = "Nissan"),
        Make(id = "opel", name = "Opel"),
        Make(id = "peugeot", name = "Peugeot"),
        Make(id = "polestar", name = "Polestar"),
        Make(id = "porsche", name = "Porsche"),
        Make(id = "renault", name = "Renault"),
        Make(id = "seat", name = "SEAT"),
        Make(id = "skoda", name = "Škoda"),
        Make(id = "subaru", name = "Subaru"),
        Make(id = "suzuki", name = "Suzuki"),
        Make(id = "tesla", name = "Tesla"),
        Make(id = "toyota", name = "Toyota"),
        Make(id = "volkswagen", name = "Volkswagen"),
        Make(id = "volvo", name = "Volvo"),
    )

    val models = listOf(
        // Audi — FI/EU names; yearFrom = first introduction (MVP label, not generation).
        // Mirrored in assets/catalog/audi_models.json for AA-5 seed.
        Model(id = "audi-a1", makeId = "audi", name = "A1", yearFrom = 2010),
        Model(id = "audi-a3", makeId = "audi", name = "A3", yearFrom = 1996),
        Model(id = "audi-a4", makeId = "audi", name = "A4", yearFrom = 1994),
        Model(id = "audi-a5", makeId = "audi", name = "A5", yearFrom = 2007),
        Model(id = "audi-a6", makeId = "audi", name = "A6", yearFrom = 1994),
        Model(id = "audi-a6-etron", makeId = "audi", name = "A6 e-tron", yearFrom = 2024),
        Model(id = "audi-a7", makeId = "audi", name = "A7", yearFrom = 2010),
        Model(id = "audi-a8", makeId = "audi", name = "A8", yearFrom = 1994),
        Model(id = "audi-q2", makeId = "audi", name = "Q2", yearFrom = 2016),
        Model(id = "audi-q3", makeId = "audi", name = "Q3", yearFrom = 2011),
        Model(id = "audi-q4-etron", makeId = "audi", name = "Q4 e-tron", yearFrom = 2021),
        Model(id = "audi-q5", makeId = "audi", name = "Q5", yearFrom = 2008),
        Model(id = "audi-q6-etron", makeId = "audi", name = "Q6 e-tron", yearFrom = 2024),
        Model(id = "audi-q7", makeId = "audi", name = "Q7", yearFrom = 2005),
        Model(id = "audi-q8", makeId = "audi", name = "Q8", yearFrom = 2018),
        Model(id = "audi-q8-etron", makeId = "audi", name = "Q8 e-tron", yearFrom = 2023),
        Model(id = "audi-etron", makeId = "audi", name = "e-tron", yearFrom = 2018, yearTo = 2022),
        Model(id = "audi-etron-gt", makeId = "audi", name = "e-tron GT", yearFrom = 2021),
        Model(id = "audi-tt", makeId = "audi", name = "TT", yearFrom = 1998, yearTo = 2023),
        Model(id = "audi-r8", makeId = "audi", name = "R8", yearFrom = 2006, yearTo = 2023),
        Model(id = "3series", makeId = "bmw", name = "3 Series", yearFrom = 2019),
        Model(id = "x3", makeId = "bmw", name = "X3", yearFrom = 2018),
        Model(id = "c3", makeId = "citroen", name = "C3", yearFrom = 2017),
        Model(id = "born", makeId = "cupra", name = "Born", yearFrom = 2021),
        Model(id = "duster", makeId = "dacia", name = "Duster", yearFrom = 2018),
        Model(id = "500", makeId = "fiat", name = "500", yearFrom = 2015),
        Model(id = "focus", makeId = "ford", name = "Focus", yearFrom = 2018),
        Model(id = "kuga", makeId = "ford", name = "Kuga", yearFrom = 2020),
        Model(id = "civic", makeId = "honda", name = "Civic", yearFrom = 2017),
        Model(id = "i30", makeId = "hyundai", name = "i30", yearFrom = 2017),
        Model(id = "tucson", makeId = "hyundai", name = "Tucson", yearFrom = 2021),
        Model(id = "ceed", makeId = "kia", name = "Ceed", yearFrom = 2018),
        Model(id = "sportage", makeId = "kia", name = "Sportage", yearFrom = 2022),
        Model(id = "cx5", makeId = "mazda", name = "CX-5", yearFrom = 2017),
        Model(id = "cclass", makeId = "mercedes", name = "C-Class", yearFrom = 2018),
        Model(id = "glc", makeId = "mercedes", name = "GLC", yearFrom = 2016),
        Model(id = "cooper", makeId = "mini", name = "Cooper", yearFrom = 2014),
        Model(id = "outlander", makeId = "mitsubishi", name = "Outlander", yearFrom = 2015),
        Model(id = "qashqai", makeId = "nissan", name = "Qashqai", yearFrom = 2018),
        Model(id = "astra", makeId = "opel", name = "Astra", yearFrom = 2016),
        Model(id = "308", makeId = "peugeot", name = "308", yearFrom = 2021),
        Model(id = "polestar2", makeId = "polestar", name = "2", yearFrom = 2020),
        Model(id = "macan", makeId = "porsche", name = "Macan", yearFrom = 2019),
        Model(id = "clio", makeId = "renault", name = "Clio", yearFrom = 2019),
        Model(id = "leon", makeId = "seat", name = "Leon", yearFrom = 2020),
        Model(id = "octavia", makeId = "skoda", name = "Octavia", yearFrom = 2020),
        Model(id = "kodiaq", makeId = "skoda", name = "Kodiaq", yearFrom = 2017),
        Model(id = "enyaq", makeId = "skoda", name = "Enyaq", yearFrom = 2021),
        Model(id = "outback", makeId = "subaru", name = "Outback", yearFrom = 2015),
        Model(id = "vitara", makeId = "suzuki", name = "Vitara", yearFrom = 2015),
        Model(id = "model3", makeId = "tesla", name = "Model 3", yearFrom = 2019),
        Model(id = "modely", makeId = "tesla", name = "Model Y", yearFrom = 2021),
        Model(id = "corolla", makeId = "toyota", name = "Corolla", yearFrom = 2019),
        Model(id = "rav4", makeId = "toyota", name = "RAV4", yearFrom = 2019),
        Model(id = "yaris", makeId = "toyota", name = "Yaris", yearFrom = 2020),
        Model(id = "golf", makeId = "volkswagen", name = "Golf", yearFrom = 2020),
        Model(id = "passat", makeId = "volkswagen", name = "Passat", yearFrom = 2015, yearTo = 2022),
        Model(id = "tiguan", makeId = "volkswagen", name = "Tiguan", yearFrom = 2016),
        Model(id = "id4", makeId = "volkswagen", name = "ID.4", yearFrom = 2021),
        Model(id = "xc60", makeId = "volvo", name = "XC60", yearFrom = 2017),
        Model(id = "v60", makeId = "volvo", name = "V60", yearFrom = 2018),
        Model(id = "xc40", makeId = "volvo", name = "XC40", yearFrom = 2018),
    )
}
