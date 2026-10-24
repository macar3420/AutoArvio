package fi.tamk.autoarvio.ui.models

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import fi.tamk.autoarvio.data.repository.CatalogRepository
import fi.tamk.autoarvio.domain.model.Model
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn

class ModelListViewModel(
    makeId: String,
    repository: CatalogRepository,
) : ViewModel() {
    val makeName: String = repository.makeName(makeId)
    val models: StateFlow<List<Model>> = repository.observeModels(makeId)
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())

    companion object {
        fun factory(makeId: String, repository: CatalogRepository): ViewModelProvider.Factory =
            object : ViewModelProvider.Factory {
                @Suppress("UNCHECKED_CAST")
                override fun <T : ViewModel> create(modelClass: Class<T>): T =
                    ModelListViewModel(makeId, repository) as T
            }
    }
}
