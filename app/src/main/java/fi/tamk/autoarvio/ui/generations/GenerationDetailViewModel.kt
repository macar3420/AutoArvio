package fi.tamk.autoarvio.ui.generations

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import fi.tamk.autoarvio.data.repository.CatalogRepository
import fi.tamk.autoarvio.domain.model.Generation

class GenerationDetailViewModel(
    generationId: String,
    repository: CatalogRepository,
) : ViewModel() {
    val generation: Generation? = repository.generationById(generationId)
    val modelTitle: String =
        generation?.let { repository.modelTitle(it.modelId) }.orEmpty()

    companion object {
        fun factory(
            generationId: String,
            repository: CatalogRepository,
        ): ViewModelProvider.Factory =
            object : ViewModelProvider.Factory {
                @Suppress("UNCHECKED_CAST")
                override fun <T : ViewModel> create(modelClass: Class<T>): T =
                    GenerationDetailViewModel(generationId, repository) as T
            }
    }
}
