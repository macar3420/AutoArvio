package fi.tamk.autoarvio.ui.models

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
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
import fi.tamk.autoarvio.domain.model.Model
import fi.tamk.autoarvio.ui.theme.OutfitFamily
import fi.tamk.autoarvio.ui.theme.Ultramarine

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ModelListScreen(
    viewModel: ModelListViewModel,
    onBack: () -> Unit,
) {
    val models by viewModel.models.collectAsStateWithLifecycle()
    val query by viewModel.searchQuery.collectAsStateWithLifecycle()
    val searching = query.isNotBlank()

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        text = viewModel.makeName,
                        fontFamily = OutfitFamily,
                        fontWeight = FontWeight.SemiBold,
                    )
                },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(
                            imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                            contentDescription = "Back",
                            tint = Color.White,
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = Ultramarine,
                    titleContentColor = Color.White,
                    navigationIconContentColor = Color.White,
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
                        text = "Search models",
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

            when {
                models.isEmpty() && searching -> {
                    Text(
                        text = "No models match \"$query\"",
                        modifier = Modifier.padding(horizontal = 20.dp, vertical = 8.dp),
                        style = MaterialTheme.typography.bodyMedium,
                        fontFamily = OutfitFamily,
                        color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f),
                    )
                }
                models.isEmpty() -> {
                    Text(
                        text = "No models yet for this brand",
                        modifier = Modifier.padding(horizontal = 20.dp, vertical = 8.dp),
                        style = MaterialTheme.typography.bodyLarge,
                        fontFamily = OutfitFamily,
                        color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f),
                    )
                }
                else -> {
                    LazyColumn(modifier = Modifier.fillMaxSize()) {
                        items(models, key = { it.id }) { model ->
                            ModelRow(model = model)
                            HorizontalDivider(
                                modifier = Modifier.padding(start = 20.dp),
                                color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.08f),
                            )
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun ModelRow(model: Model) {
    val years = when {
        model.yearFrom != null && model.yearTo != null -> "${model.yearFrom}–${model.yearTo}"
        model.yearFrom != null -> "${model.yearFrom}–"
        else -> null
    }

    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 20.dp, vertical = 18.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Column(
            modifier = Modifier.weight(1f),
            verticalArrangement = Arrangement.spacedBy(4.dp),
        ) {
            Text(
                text = model.name,
                style = MaterialTheme.typography.titleMedium,
                fontFamily = OutfitFamily,
                fontWeight = FontWeight.SemiBold,
            )
            if (years != null) {
                Text(
                    text = years,
                    style = MaterialTheme.typography.bodySmall,
                    fontFamily = OutfitFamily,
                    color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.55f),
                )
            }
        }
    }
}
