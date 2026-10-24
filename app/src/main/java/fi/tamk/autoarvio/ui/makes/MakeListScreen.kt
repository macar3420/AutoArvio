package fi.tamk.autoarvio.ui.makes

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.KeyboardArrowRight
import androidx.compose.material.icons.filled.Clear
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import fi.tamk.autoarvio.domain.model.Make
import fi.tamk.autoarvio.ui.theme.OutfitFamily
import fi.tamk.autoarvio.ui.theme.Ultramarine

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MakeListScreen(
    viewModel: MakeListViewModel,
    onMakeClick: (Make) -> Unit,
    onModelClick: (Make, String) -> Unit,
) {
    val state by viewModel.searchState.collectAsStateWithLifecycle()
    val query by viewModel.searchQuery.collectAsStateWithLifecycle()
    val searching = query.isNotBlank()

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        text = "Choose a car",
                        fontFamily = OutfitFamily,
                        fontWeight = FontWeight.SemiBold,
                    )
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = Ultramarine,
                    titleContentColor = Color.White,
                ),
            )
        },
        containerColor = MaterialTheme.colorScheme.background,
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding),
        ) {
            OutlinedTextField(
                value = query,
                onValueChange = viewModel::onSearchQueryChange,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 12.dp),
                placeholder = {
                    Text(
                        text = "Search brands or models",
                        fontFamily = OutfitFamily,
                    )
                },
                leadingIcon = {
                    Icon(Icons.Default.Search, contentDescription = null, tint = Ultramarine)
                },
                trailingIcon = {
                    if (query.isNotEmpty()) {
                        IconButton(onClick = { viewModel.onSearchQueryChange("") }) {
                            Icon(Icons.Default.Clear, contentDescription = "Clear search")
                        }
                    }
                },
                singleLine = true,
                shape = MaterialTheme.shapes.medium,
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = Ultramarine,
                    cursorColor = Ultramarine,
                    focusedLeadingIconColor = Ultramarine,
                ),
            )

            val noResults = searching && state.makes.isEmpty() && state.models.isEmpty()
            if (noResults) {
                Text(
                    text = "No brands or models match \"$query\"",
                    modifier = Modifier.padding(horizontal = 20.dp, vertical = 8.dp),
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f),
                    fontFamily = OutfitFamily,
                )
            }

            LazyColumn(modifier = Modifier.fillMaxSize()) {
                if (state.makes.isNotEmpty()) {
                    item {
                        SectionHeader(
                            if (searching) {
                                "Brands · ${state.makes.size}"
                            } else {
                                "Brands"
                            },
                        )
                    }
                    items(state.makes, key = { "make-${it.id}" }) { make ->
                        MakeRow(make = make, onClick = { onMakeClick(make) })
                        HorizontalDivider(
                            modifier = Modifier.padding(start = 20.dp),
                            color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.08f),
                        )
                    }
                }

                if (state.models.isNotEmpty()) {
                    item {
                        SectionHeader("Models · ${state.models.size}")
                    }
                    items(state.models, key = { "model-${it.model.id}" }) { hit ->
                        ModelHitRow(
                            makeName = hit.make.name,
                            modelName = hit.model.name,
                            onClick = { onModelClick(hit.make, hit.model.name) },
                        )
                        HorizontalDivider(
                            modifier = Modifier.padding(start = 20.dp),
                            color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.08f),
                        )
                    }
                }

                item { Spacer(modifier = Modifier.height(24.dp)) }
            }
        }
    }
}

@Composable
private fun SectionHeader(text: String) {
    Text(
        text = text,
        modifier = Modifier.padding(horizontal = 20.dp, vertical = 8.dp),
        style = MaterialTheme.typography.bodySmall,
        color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.5f),
        fontFamily = OutfitFamily,
    )
}

@Composable
private fun MakeRow(make: Make, onClick: () -> Unit) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
            .padding(horizontal = 20.dp, vertical = 18.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Text(
            text = make.name,
            modifier = Modifier.weight(1f),
            style = MaterialTheme.typography.titleMedium,
            fontFamily = OutfitFamily,
            fontWeight = FontWeight.SemiBold,
            color = MaterialTheme.colorScheme.onBackground,
        )
        Icon(
            imageVector = Icons.AutoMirrored.Filled.KeyboardArrowRight,
            contentDescription = null,
            tint = Ultramarine.copy(alpha = 0.7f),
        )
    }
}

@Composable
private fun ModelHitRow(
    makeName: String,
    modelName: String,
    onClick: () -> Unit,
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
            .padding(horizontal = 20.dp, vertical = 16.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Column(modifier = Modifier.weight(1f)) {
            Text(
                text = "$makeName · $modelName",
                style = MaterialTheme.typography.titleMedium,
                fontFamily = OutfitFamily,
                fontWeight = FontWeight.SemiBold,
                color = MaterialTheme.colorScheme.onBackground,
            )
            Text(
                text = "Open models",
                style = MaterialTheme.typography.bodySmall,
                fontFamily = OutfitFamily,
                color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.5f),
            )
        }
        Icon(
            imageVector = Icons.AutoMirrored.Filled.KeyboardArrowRight,
            contentDescription = null,
            tint = Ultramarine.copy(alpha = 0.7f),
        )
    }
}
