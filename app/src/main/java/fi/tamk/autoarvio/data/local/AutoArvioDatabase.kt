package fi.tamk.autoarvio.data.local

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import fi.tamk.autoarvio.data.local.dao.MakeDao
import fi.tamk.autoarvio.data.local.dao.ModelDao
import fi.tamk.autoarvio.data.local.entity.MakeEntity
import fi.tamk.autoarvio.data.local.entity.ModelEntity

@Database(
    entities = [MakeEntity::class, ModelEntity::class],
    version = 1,
    exportSchema = false,
)
abstract class AutoArvioDatabase : RoomDatabase() {
    abstract fun makeDao(): MakeDao
    abstract fun modelDao(): ModelDao

    companion object {
        const val NAME = "autoarvio.db"

        fun build(context: Context): AutoArvioDatabase =
            Room.databaseBuilder(
                context.applicationContext,
                AutoArvioDatabase::class.java,
                NAME,
            ).build()
    }
}
