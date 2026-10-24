package fi.tamk.autoarvio.ui.generations

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import fi.tamk.autoarvio.data.repository.CatalogRepository
import fi.tamk.autoarvio.domain.model.Generation
import fi.tamk.autoarvio.domain.model.PowertrainVariant

class VariantDetailViewModel(
    variantId: String,
    repository: CatalogRepository,
) : ViewModel() {
    val variant: PowertrainVariant? = repository.variantById(variantId)
    val generation: Generation? =
        variant?.let { repository.generationById(it.generationId) }
    val modelTitle: String =
        generation?.let { repository.modelTitle(it.modelId) }.orEmpty()

    companion object {
        fun factory(
            variantId: String,
            repository: CatalogRepository,
        ): ViewModelProvider.Factory =
            object : ViewModelProvider.Factory {
                @Suppress("UNCHECKED_CAST")
                override fun <T : ViewModel> create(modelClass: Class<T>): T =
                    VariantDetailViewModel(variantId, repository) as T
            }
    }
}
