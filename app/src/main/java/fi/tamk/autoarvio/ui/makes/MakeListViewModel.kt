package fi.tamk.autoarvio.ui.makes

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import fi.tamk.autoarvio.data.repository.CatalogRepository
import fi.tamk.autoarvio.domain.model.Make
import fi.tamk.autoarvio.domain.model.Model
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn

data class ModelSearchHit(
    val model: Model,
    val make: Make,
)

data class ChooseCarSearchState(
    val makes: List<Make> = emptyList(),
    val models: List<ModelSearchHit> = emptyList(),
    val query: String = "",
)

class MakeListViewModel(
    repository: CatalogRepository,
) : ViewModel() {
    private val query = MutableStateFlow("")
    val searchQuery: StateFlow<String> = query.asStateFlow()

    val searchState: StateFlow<ChooseCarSearchState> = combine(
        repository.observeMakes(),
        repository.observeAllModels(),
        query,
    ) { makes, allModels, q ->
        val trimmed = q.trim()
        if (trimmed.isEmpty()) {
            ChooseCarSearchState(makes = makes, models = emptyList(), query = "")
        } else {
            val matchedMakes = makes.filter { it.name.contains(trimmed, ignoreCase = true) }
            val makeById = makes.associateBy { it.id }
            val matchedModels = allModels
                .asSequence()
                .filter { it.name.contains(trimmed, ignoreCase = true) }
                .mapNotNull { model ->
                    val make = makeById[model.makeId] ?: return@mapNotNull null
                    ModelSearchHit(model = model, make = make)
                }
                .take(MAX_MODEL_HITS)
                .toList()
            ChooseCarSearchState(
                makes = matchedMakes,
                models = matchedModels,
                query = trimmed,
            )
        }
    }.stateIn(
        viewModelScope,
        SharingStarted.WhileSubscribed(5_000),
        ChooseCarSearchState(),
    )

    fun onSearchQueryChange(value: String) {
        query.value = value
    }

    companion object {
        private const val MAX_MODEL_HITS = 60

        fun factory(repository: CatalogRepository): ViewModelProvider.Factory =
            object : ViewModelProvider.Factory {
                @Suppress("UNCHECKED_CAST")
                override fun <T : ViewModel> create(modelClass: Class<T>): T =
                    MakeListViewModel(repository) as T
            }
    }
}
