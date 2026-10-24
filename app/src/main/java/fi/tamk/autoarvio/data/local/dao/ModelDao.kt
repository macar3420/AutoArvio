package fi.tamk.autoarvio.data.local.dao

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import fi.tamk.autoarvio.data.local.entity.ModelEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface ModelDao {
    @Query("SELECT * FROM models WHERE makeId = :makeId ORDER BY name ASC")
    fun observeModelsForMake(makeId: String): Flow<List<ModelEntity>>

    @Query("SELECT COUNT(*) FROM models")
    suspend fun count(): Int

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(models: List<ModelEntity>)
}
