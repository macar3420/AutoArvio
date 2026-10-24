package fi.tamk.autoarvio.data.seed

import fi.tamk.autoarvio.data.local.AutoArvioDatabase

/**
 * Placeholder for the future JSON → Room seed pipeline (AA-5).
 *
 * Planned flow:
 * 1. Ship make/model JSON under `assets/` (or download once).
 * 2. On first launch, if [MakeDao.count] / [ModelDao.count] are 0, parse JSON and insert.
 * 3. Keep Room as the runtime source of truth for Make → Model lists.
 *
 * For MVP scaffolding we keep Room empty and serve placeholder data from
 * [fi.tamk.autoarvio.data.repository.CatalogRepository] instead.
 */
class DatabaseSeeder(
    private val database: AutoArvioDatabase,
) {
    suspend fun seedIfEmpty() {
        // Stub: no-op until JSON assets land.
        // Example later:
        // if (database.makeDao().count() == 0) { /* parse assets + insertAll */ }
        @Suppress("UNUSED_VARIABLE")
        val db = database
    }
}
