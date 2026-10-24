package fi.tamk.autoarvio.ui.makes

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import fi.tamk.autoarvio.data.repository.CatalogRepository
import fi.tamk.autoarvio.domain.model.Make
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn

class MakeListViewModel(
    repository: CatalogRepository,
) : ViewModel() {
    val makes: StateFlow<List<Make>> = repository.observeMakes()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())

    companion object {
        fun factory(repository: CatalogRepository): ViewModelProvider.Factory =
            object : ViewModelProvider.Factory {
                @Suppress("UNCHECKED_CAST")
                override fun <T : ViewModel> create(modelClass: Class<T>): T =
                    MakeListViewModel(repository) as T
            }
    }
}
