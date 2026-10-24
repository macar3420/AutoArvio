package fi.tamk.autoarvio.data.repository

import fi.tamk.autoarvio.domain.model.Make
import fi.tamk.autoarvio.domain.model.Model
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flowOf

/**
 * MVP catalog for the Finnish market (passenger-focused).
 * yearFrom ≈ first introduction; yearTo only when discontinued.
 * Mirrored in assets/catalog/fi_catalog.json for AA-5 Room seed.
 *
 * Chinese brands included only with real FI registrations / official import
 * (BYD, MG, Maxus, XPeng, Aion, Voyah, Smart). Leapmotor / Zeekr / NIO /
 * Ora / Lynk & Co omitted until FI retail presence is clearer.
 */
class CatalogRepository {
    fun observeMakes(): Flow<List<Make>> = flowOf(PlaceholderCatalog.makes)

    fun observeModels(makeId: String): Flow<List<Model>> =
        flowOf(PlaceholderCatalog.models.filter { it.makeId == makeId })

    fun makeName(makeId: String): String =
        PlaceholderCatalog.makes.firstOrNull { it.id == makeId }?.name ?: makeId
}

private fun m(
    id: String,
    makeId: String,
    name: String,
    yearFrom: Int,
    yearTo: Int? = null,
) = Model(id = id, makeId = makeId, name = name, yearFrom = yearFrom, yearTo = yearTo)

private object PlaceholderCatalog {
    val makes = listOf(
        Make(id = "aion", name = "Aion"),
        Make(id = "audi", name = "Audi"),
        Make(id = "bmw", name = "BMW"),
        Make(id = "byd", name = "BYD"),
        Make(id = "citroen", name = "Citroën"),
        Make(id = "cupra", name = "Cupra"),
        Make(id = "dacia", name = "Dacia"),
        Make(id = "fiat", name = "Fiat"),
        Make(id = "ford", name = "Ford"),
        Make(id = "honda", name = "Honda"),
        Make(id = "hyundai", name = "Hyundai"),
        Make(id = "kia", name = "Kia"),
        Make(id = "landrover", name = "Land Rover"),
        Make(id = "lexus", name = "Lexus"),
        Make(id = "mazda", name = "Mazda"),
        Make(id = "maxus", name = "Maxus"),
        Make(id = "mercedes", name = "Mercedes-Benz"),
        Make(id = "mg", name = "MG"),
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
        Make(id = "smart", name = "Smart"),
        Make(id = "subaru", name = "Subaru"),
        Make(id = "suzuki", name = "Suzuki"),
        Make(id = "tesla", name = "Tesla"),
        Make(id = "toyota", name = "Toyota"),
        Make(id = "volkswagen", name = "Volkswagen"),
        Make(id = "volvo", name = "Volvo"),
        Make(id = "voyah", name = "Voyah"),
        Make(id = "xpeng", name = "XPeng"),
    )

    val models = listOf(
        // --- Aion (GAC) — FI 2025 ---
        m("aion-v", "aion", "V", 2024),

        // --- Audi (FI/EU) ---
        m("audi-a1", "audi", "A1", 2010),
        m("audi-a3", "audi", "A3", 1996),
        m("audi-a4", "audi", "A4", 1994),
        m("audi-a5", "audi", "A5", 2007),
        m("audi-a6", "audi", "A6", 1994),
        m("audi-a6-etron", "audi", "A6 e-tron", 2024),
        m("audi-a7", "audi", "A7", 2010),
        m("audi-a8", "audi", "A8", 1994),
        m("audi-q2", "audi", "Q2", 2016),
        m("audi-q3", "audi", "Q3", 2011),
        m("audi-q4-etron", "audi", "Q4 e-tron", 2021),
        m("audi-q5", "audi", "Q5", 2008),
        m("audi-q6-etron", "audi", "Q6 e-tron", 2024),
        m("audi-q7", "audi", "Q7", 2005),
        m("audi-q8", "audi", "Q8", 2018),
        m("audi-q8-etron", "audi", "Q8 e-tron", 2023),
        m("audi-etron", "audi", "e-tron", 2018, 2022),
        m("audi-etron-gt", "audi", "e-tron GT", 2021),
        m("audi-tt", "audi", "TT", 1998, 2023),
        m("audi-r8", "audi", "R8", 2006, 2023),

        // --- BMW ---
        m("bmw-1", "bmw", "1 Series", 2004),
        m("bmw-2", "bmw", "2 Series", 2014),
        m("bmw-3", "bmw", "3 Series", 1975),
        m("bmw-4", "bmw", "4 Series", 2013),
        m("bmw-5", "bmw", "5 Series", 1972),
        m("bmw-7", "bmw", "7 Series", 1977),
        m("bmw-x1", "bmw", "X1", 2009),
        m("bmw-x2", "bmw", "X2", 2018),
        m("bmw-x3", "bmw", "X3", 2003),
        m("bmw-x4", "bmw", "X4", 2014),
        m("bmw-x5", "bmw", "X5", 1999),
        m("bmw-x6", "bmw", "X6", 2008),
        m("bmw-x7", "bmw", "X7", 2019),
        m("bmw-ix1", "bmw", "iX1", 2022),
        m("bmw-ix3", "bmw", "iX3", 2020),
        m("bmw-ix", "bmw", "iX", 2021),
        m("bmw-i4", "bmw", "i4", 2021),
        m("bmw-i5", "bmw", "i5", 2023),

        // --- BYD (FI) ---
        m("byd-atto3", "byd", "Atto 3", 2022),
        m("byd-dolphin", "byd", "Dolphin", 2023),
        m("byd-seal", "byd", "Seal", 2023),
        m("byd-seal-u", "byd", "Seal U", 2024),
        m("byd-han", "byd", "Han", 2020),
        m("byd-tang", "byd", "Tang", 2021),

        // --- Citroën ---
        m("citroen-c3", "citroen", "C3", 2002),
        m("citroen-c3-aircross", "citroen", "C3 Aircross", 2017),
        m("citroen-c4", "citroen", "C4", 2004),
        m("citroen-c5-aircross", "citroen", "C5 Aircross", 2018),
        m("citroen-berlingo", "citroen", "Berlingo", 1996),
        m("citroen-ec4", "citroen", "ë-C4", 2020),

        // --- Cupra ---
        m("cupra-formentor", "cupra", "Formentor", 2020),
        m("cupra-leon", "cupra", "Leon", 2020),
        m("cupra-ateca", "cupra", "Ateca", 2018),
        m("cupra-born", "cupra", "Born", 2021),
        m("cupra-tavascan", "cupra", "Tavascan", 2024),

        // --- Dacia ---
        m("dacia-sandero", "dacia", "Sandero", 2008),
        m("dacia-duster", "dacia", "Duster", 2010),
        m("dacia-jogger", "dacia", "Jogger", 2022),
        m("dacia-spring", "dacia", "Spring", 2021),
        m("dacia-logan", "dacia", "Logan", 2004),

        // --- Fiat ---
        m("fiat-500", "fiat", "500", 2007),
        m("fiat-500e", "fiat", "500e", 2020),
        m("fiat-panda", "fiat", "Panda", 1980),
        m("fiat-tipo", "fiat", "Tipo", 2015),
        m("fiat-doblo", "fiat", "Doblo", 2001),

        // --- Ford ---
        m("ford-fiesta", "ford", "Fiesta", 1976, 2023),
        m("ford-focus", "ford", "Focus", 1998),
        m("ford-puma", "ford", "Puma", 2019),
        m("ford-kuga", "ford", "Kuga", 2008),
        m("ford-mustang-mach-e", "ford", "Mustang Mach-E", 2020),
        m("ford-explorer-ev", "ford", "Explorer", 2024),
        m("ford-transit-connect", "ford", "Transit Connect", 2002),

        // --- Honda ---
        m("honda-civic", "honda", "Civic", 1972),
        m("honda-jazz", "honda", "Jazz", 2001),
        m("honda-hrv", "honda", "HR-V", 1998),
        m("honda-crv", "honda", "CR-V", 1995),
        m("honda-e", "honda", "e", 2020, 2024),

        // --- Hyundai ---
        m("hyundai-i10", "hyundai", "i10", 2007),
        m("hyundai-i20", "hyundai", "i20", 2008),
        m("hyundai-i30", "hyundai", "i30", 2007),
        m("hyundai-kona", "hyundai", "Kona", 2017),
        m("hyundai-tucson", "hyundai", "Tucson", 2004),
        m("hyundai-santa-fe", "hyundai", "Santa Fe", 2000),
        m("hyundai-ioniq5", "hyundai", "IONIQ 5", 2021),
        m("hyundai-ioniq6", "hyundai", "IONIQ 6", 2022),

        // --- Kia ---
        m("kia-picanto", "kia", "Picanto", 2004),
        m("kia-rio", "kia", "Rio", 1999),
        m("kia-ceed", "kia", "Ceed", 2006),
        m("kia-xceed", "kia", "XCeed", 2019),
        m("kia-sportage", "kia", "Sportage", 1993),
        m("kia-sorento", "kia", "Sorento", 2002),
        m("kia-niro", "kia", "Niro", 2016),
        m("kia-ev6", "kia", "EV6", 2021),
        m("kia-ev9", "kia", "EV9", 2023),
        m("kia-stonic", "kia", "Stonic", 2017),

        // --- Land Rover ---
        m("lr-defender", "landrover", "Defender", 1983),
        m("lr-discovery", "landrover", "Discovery", 1989),
        m("lr-discovery-sport", "landrover", "Discovery Sport", 2014),
        m("lr-range-rover", "landrover", "Range Rover", 1970),
        m("lr-range-rover-sport", "landrover", "Range Rover Sport", 2005),
        m("lr-range-rover-evoque", "landrover", "Range Rover Evoque", 2011),
        m("lr-range-rover-velar", "landrover", "Range Rover Velar", 2017),

        // --- Lexus ---
        m("lexus-ux", "lexus", "UX", 2018),
        m("lexus-nx", "lexus", "NX", 2014),
        m("lexus-rx", "lexus", "RX", 1998),
        m("lexus-es", "lexus", "ES", 1989),
        m("lexus-lbx", "lexus", "LBX", 2023),
        m("lexus-rz", "lexus", "RZ", 2022),

        // --- Mazda ---
        m("mazda-2", "mazda", "2", 2003),
        m("mazda-3", "mazda", "3", 2003),
        m("mazda-6", "mazda", "6", 2002, 2024),
        m("mazda-cx30", "mazda", "CX-30", 2019),
        m("mazda-cx5", "mazda", "CX-5", 2012),
        m("mazda-cx60", "mazda", "CX-60", 2022),
        m("mazda-mx30", "mazda", "MX-30", 2020),

        // --- Maxus (FI) ---
        m("maxus-mifa9", "maxus", "MIFA 9", 2021),
        m("maxus-euniq6", "maxus", "Euniq 6", 2021),
        m("maxus-deliver9", "maxus", "Deliver 9", 2020),
        m("maxus-t90", "maxus", "T90 EV", 2021),

        // --- Mercedes-Benz ---
        m("mb-a", "mercedes", "A-Class", 1997),
        m("mb-b", "mercedes", "B-Class", 2005),
        m("mb-c", "mercedes", "C-Class", 1993),
        m("mb-e", "mercedes", "E-Class", 1993),
        m("mb-s", "mercedes", "S-Class", 1972),
        m("mb-cla", "mercedes", "CLA", 2013),
        m("mb-glb", "mercedes", "GLB", 2019),
        m("mb-glc", "mercedes", "GLC", 2015),
        m("mb-gle", "mercedes", "GLE", 1997),
        m("mb-gla", "mercedes", "GLA", 2013),
        m("mb-eqa", "mercedes", "EQA", 2021),
        m("mb-eqb", "mercedes", "EQB", 2021),
        m("mb-eqc", "mercedes", "EQC", 2019, 2023),
        m("mb-eqe", "mercedes", "EQE", 2022),
        m("mb-eqs", "mercedes", "EQS", 2021),

        // --- MG (FI) ---
        m("mg-4", "mg", "MG4", 2022),
        m("mg-5", "mg", "MG5", 2020),
        m("mg-zs", "mg", "ZS", 2017),
        m("mg-hs", "mg", "HS", 2018),
        m("mg-marvel-r", "mg", "Marvel R", 2021),
        m("mg-cyberster", "mg", "Cyberster", 2023),

        // --- MINI ---
        m("mini-cooper", "mini", "Cooper", 2001),
        m("mini-countryman", "mini", "Countryman", 2010),
        m("mini-clubman", "mini", "Clubman", 2007, 2024),
        m("mini-cooper-e", "mini", "Cooper E", 2023),
        m("mini-countryman-e", "mini", "Countryman E", 2023),

        // --- Mitsubishi ---
        m("mitsubishi-asx", "mitsubishi", "ASX", 2010),
        m("mitsubishi-eclipse-cross", "mitsubishi", "Eclipse Cross", 2017),
        m("mitsubishi-outlander", "mitsubishi", "Outlander", 2001),
        m("mitsubishi-space-star", "mitsubishi", "Space Star", 2012),
        m("mitsubishi-l200", "mitsubishi", "L200", 1978),

        // --- Nissan ---
        m("nissan-micra", "nissan", "Micra", 1982),
        m("nissan-juke", "nissan", "Juke", 2010),
        m("nissan-qashqai", "nissan", "Qashqai", 2006),
        m("nissan-xtrail", "nissan", "X-Trail", 2001),
        m("nissan-leaf", "nissan", "Leaf", 2010),
        m("nissan-ariya", "nissan", "Ariya", 2021),

        // --- Opel ---
        m("opel-corsa", "opel", "Corsa", 1982),
        m("opel-astra", "opel", "Astra", 1991),
        m("opel-mokka", "opel", "Mokka", 2012),
        m("opel-crossland", "opel", "Crossland", 2017),
        m("opel-grandland", "opel", "Grandland", 2017),
        m("opel-combo", "opel", "Combo", 1986),

        // --- Peugeot ---
        m("peugeot-208", "peugeot", "208", 2012),
        m("peugeot-2008", "peugeot", "2008", 2013),
        m("peugeot-308", "peugeot", "308", 2007),
        m("peugeot-3008", "peugeot", "3008", 2008),
        m("peugeot-5008", "peugeot", "5008", 2009),
        m("peugeot-408", "peugeot", "408", 2022),
        m("peugeot-e208", "peugeot", "e-208", 2019),

        // --- Polestar ---
        m("polestar-2", "polestar", "2", 2020),
        m("polestar-3", "polestar", "3", 2023),
        m("polestar-4", "polestar", "4", 2023),

        // --- Porsche ---
        m("porsche-911", "porsche", "911", 1963),
        m("porsche-cayenne", "porsche", "Cayenne", 2002),
        m("porsche-macan", "porsche", "Macan", 2014),
        m("porsche-panamera", "porsche", "Panamera", 2009),
        m("porsche-taycan", "porsche", "Taycan", 2019),
        m("porsche-boxster", "porsche", "718 Boxster", 1996),
        m("porsche-cayman", "porsche", "718 Cayman", 2005),

        // --- Renault ---
        m("renault-clio", "renault", "Clio", 1990),
        m("renault-captur", "renault", "Captur", 2013),
        m("renault-megane", "renault", "Mégane", 1995),
        m("renault-austral", "renault", "Austral", 2022),
        m("renault-scenic", "renault", "Scénic", 1996),
        m("renault-scenic-e", "renault", "Scénic E-Tech", 2023),
        m("renault-zoe", "renault", "Zoe", 2012, 2024),
        m("renault-trafic", "renault", "Trafic", 1980),

        // --- SEAT ---
        m("seat-ibiza", "seat", "Ibiza", 1984),
        m("seat-leon", "seat", "Leon", 1999),
        m("seat-arona", "seat", "Arona", 2017),
        m("seat-ateca", "seat", "Ateca", 2016),
        m("seat-tarraco", "seat", "Tarraco", 2018),

        // --- Škoda ---
        m("skoda-fabia", "skoda", "Fabia", 1999),
        m("skoda-scala", "skoda", "Scala", 2019),
        m("skoda-octavia", "skoda", "Octavia", 1996),
        m("skoda-superb", "skoda", "Superb", 2001),
        m("skoda-kamiq", "skoda", "Kamiq", 2019),
        m("skoda-karoq", "skoda", "Karoq", 2017),
        m("skoda-kodiaq", "skoda", "Kodiaq", 2016),
        m("skoda-enyaq", "skoda", "Enyaq", 2020),
        m("skoda-elroq", "skoda", "Elroq", 2024),

        // --- Smart ---
        m("smart-fortwo", "smart", "Fortwo", 1998),
        m("smart-forfour", "smart", "Forfour", 2004, 2021),
        m("smart-1", "smart", "#1", 2022),
        m("smart-3", "smart", "#3", 2023),

        // --- Subaru ---
        m("subaru-impreza", "subaru", "Impreza", 1992),
        m("subaru-xv", "subaru", "XV / Crosstrek", 2011),
        m("subaru-forester", "subaru", "Forester", 1997),
        m("subaru-outback", "subaru", "Outback", 1994),
        m("subaru-solterra", "subaru", "Solterra", 2022),

        // --- Suzuki ---
        m("suzuki-swift", "suzuki", "Swift", 1983),
        m("suzuki-ignis", "suzuki", "Ignis", 2016),
        m("suzuki-vitara", "suzuki", "Vitara", 1988),
        m("suzuki-s-cross", "suzuki", "S-Cross", 2013),
        m("suzuki-jimny", "suzuki", "Jimny", 1970),

        // --- Tesla ---
        m("tesla-model-s", "tesla", "Model S", 2012),
        m("tesla-model-3", "tesla", "Model 3", 2017),
        m("tesla-model-x", "tesla", "Model X", 2015),
        m("tesla-model-y", "tesla", "Model Y", 2020),

        // --- Toyota ---
        m("toyota-aygo", "toyota", "Aygo / Aygo X", 2005),
        m("toyota-yaris", "toyota", "Yaris", 1999),
        m("toyota-yaris-cross", "toyota", "Yaris Cross", 2020),
        m("toyota-corolla", "toyota", "Corolla", 1966),
        m("toyota-camry", "toyota", "Camry", 1982),
        m("toyota-c-hr", "toyota", "C-HR", 2016),
        m("toyota-rav4", "toyota", "RAV4", 1994),
        m("toyota-highlander", "toyota", "Highlander", 2000),
        m("toyota-land-cruiser", "toyota", "Land Cruiser", 1951),
        m("toyota-hilux", "toyota", "Hilux", 1968),
        m("toyota-proace", "toyota", "Proace City", 2012),
        m("toyota-bz4x", "toyota", "bZ4X", 2022),

        // --- Volkswagen ---
        m("vw-polo", "volkswagen", "Polo", 1975),
        m("vw-golf", "volkswagen", "Golf", 1974),
        m("vw-passat", "volkswagen", "Passat", 1973),
        m("vw-arteon", "volkswagen", "Arteon", 2017),
        m("vw-taigo", "volkswagen", "Taigo", 2021),
        m("vw-t-roc", "volkswagen", "T-Roc", 2017),
        m("vw-t-cross", "volkswagen", "T-Cross", 2018),
        m("vw-tiguan", "volkswagen", "Tiguan", 2007),
        m("vw-touareg", "volkswagen", "Touareg", 2002),
        m("vw-id3", "volkswagen", "ID.3", 2020),
        m("vw-id4", "volkswagen", "ID.4", 2020),
        m("vw-id5", "volkswagen", "ID.5", 2021),
        m("vw-id7", "volkswagen", "ID.7", 2023),
        m("vw-id-buzz", "volkswagen", "ID. Buzz", 2022),

        // --- Volvo ---
        m("volvo-v40", "volvo", "V40", 2012, 2019),
        m("volvo-v60", "volvo", "V60", 2010),
        m("volvo-v90", "volvo", "V90", 2016),
        m("volvo-s60", "volvo", "S60", 2000),
        m("volvo-s90", "volvo", "S90", 2016),
        m("volvo-xc40", "volvo", "XC40", 2017),
        m("volvo-xc60", "volvo", "XC60", 2008),
        m("volvo-xc90", "volvo", "XC90", 2002),
        m("volvo-ex30", "volvo", "EX30", 2023),
        m("volvo-ex40", "volvo", "EX40", 2024),
        m("volvo-ec40", "volvo", "EC40", 2024),
        m("volvo-ex90", "volvo", "EX90", 2024),

        // --- Voyah (FI) ---
        m("voyah-free", "voyah", "Free", 2021),
        m("voyah-passion", "voyah", "Passion", 2023),
        m("voyah-courage", "voyah", "Courage", 2024),

        // --- XPeng (FI 2025) ---
        m("xpeng-g6", "xpeng", "G6", 2023),
        m("xpeng-g9", "xpeng", "G9", 2022),
        m("xpeng-p7", "xpeng", "P7", 2020),
    )
}
