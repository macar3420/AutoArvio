package fi.tamk.autoarvio.data.local.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "makes")
data class MakeEntity(
    @PrimaryKey val id: String,
    val name: String,
)
