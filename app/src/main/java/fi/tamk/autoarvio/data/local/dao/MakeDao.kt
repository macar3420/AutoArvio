package fi.tamk.autoarvio.data.local.dao

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import fi.tamk.autoarvio.data.local.entity.MakeEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface MakeDao {
    @Query("SELECT * FROM makes ORDER BY name ASC")
    fun observeMakes(): Flow<List<MakeEntity>>

    @Query("SELECT COUNT(*) FROM makes")
    suspend fun count(): Int

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(makes: List<MakeEntity>)
}
