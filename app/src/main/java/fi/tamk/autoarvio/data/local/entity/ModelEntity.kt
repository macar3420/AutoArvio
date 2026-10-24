package fi.tamk.autoarvio.data.local.entity

import androidx.room.Entity
import androidx.room.ForeignKey
import androidx.room.Index
import androidx.room.PrimaryKey

@Entity(
    tableName = "models",
    foreignKeys = [
        ForeignKey(
            entity = MakeEntity::class,
            parentColumns = ["id"],
            childColumns = ["makeId"],
            onDelete = ForeignKey.CASCADE,
        ),
    ],
    indices = [Index("makeId")],
)
data class ModelEntity(
    @PrimaryKey val id: String,
    val makeId: String,
    val name: String,
    val yearFrom: Int? = null,
    val yearTo: Int? = null,
)
