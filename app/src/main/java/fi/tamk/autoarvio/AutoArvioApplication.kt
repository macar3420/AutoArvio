package fi.tamk.autoarvio

import android.app.Application
import fi.tamk.autoarvio.data.local.AutoArvioDatabase
import fi.tamk.autoarvio.data.seed.DatabaseSeeder
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch

class AutoArvioApplication : Application() {
    lateinit var database: AutoArvioDatabase
        private set

    private val appScope = CoroutineScope(SupervisorJob() + Dispatchers.IO)

    override fun onCreate() {
        super.onCreate()
        database = AutoArvioDatabase.build(this)
        // Prepares the Room path; seeder is a no-op until JSON assets land (AA-5).
        appScope.launch {
            DatabaseSeeder(database).seedIfEmpty()
        }
    }
}
