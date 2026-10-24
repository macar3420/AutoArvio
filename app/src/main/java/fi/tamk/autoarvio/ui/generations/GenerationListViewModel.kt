package fi.tamk.autoarvio.ui.generations

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import fi.tamk.autoarvio.data.repository.CatalogRepository
import fi.tamk.autoarvio.domain.model.Generation
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn

class GenerationListViewModel(
    modelId: String,
    repository: CatalogRepository,
) : ViewModel() {
    val modelTitle: String = repository.modelTitle(modelId)

    val generations: StateFlow<List<Generation>> =
        repository.observeGenerations(modelId)
            .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())

    companion object {
        fun factory(
            modelId: String,
            repository: CatalogRepository,
        ): ViewModelProvider.Factory =
            object : ViewModelProvider.Factory {
                @Suppress("UNCHECKED_CAST")
                override fun <T : ViewModel> create(modelClass: Class<T>): T =
                    GenerationListViewModel(modelId, repository) as T
            }
    }
}
