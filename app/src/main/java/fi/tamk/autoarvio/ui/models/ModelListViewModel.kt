package fi.tamk.autoarvio.ui.models

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import fi.tamk.autoarvio.data.repository.CatalogRepository
import fi.tamk.autoarvio.domain.model.Model
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn

class ModelListViewModel(
    makeId: String,
    repository: CatalogRepository,
    initialQuery: String = "",
) : ViewModel() {
    val makeName: String = repository.makeName(makeId)

    private val query = MutableStateFlow(initialQuery)
    val searchQuery: StateFlow<String> = query.asStateFlow()

    val models: StateFlow<List<Model>> = combine(
        repository.observeModels(makeId),
        query,
    ) { models, q ->
        val trimmed = q.trim()
        if (trimmed.isEmpty()) {
            models
        } else {
            models.filter { it.name.contains(trimmed, ignoreCase = true) }
        }
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())

    fun onSearchQueryChange(value: String) {
        query.value = value
    }

    companion object {
        fun factory(
            makeId: String,
            repository: CatalogRepository,
            initialQuery: String = "",
        ): ViewModelProvider.Factory =
            object : ViewModelProvider.Factory {
                @Suppress("UNCHECKED_CAST")
                override fun <T : ViewModel> create(modelClass: Class<T>): T =
                    ModelListViewModel(makeId, repository, initialQuery) as T
            }
    }
}
