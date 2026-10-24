package fi.tamk.autoarvio.ui.generations

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
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
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.KeyboardArrowRight
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import fi.tamk.autoarvio.domain.model.PowertrainVariant
import fi.tamk.autoarvio.ui.theme.OutfitFamily
import fi.tamk.autoarvio.ui.theme.Ultramarine

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun GenerationDetailScreen(
    viewModel: GenerationDetailViewModel,
    onBack: () -> Unit,
    onVariantClick: (PowertrainVariant) -> Unit,
) {
    val generation = viewModel.generation
    val variants = viewModel.variants

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text(
                            text = generation?.let { "${viewModel.modelTitle} ${it.code}" }
                                ?: "Engines & versions",
                            fontFamily = OutfitFamily,
                            fontWeight = FontWeight.SemiBold,
                        )
                        Text(
                            text = "Engines & versions",
                            style = MaterialTheme.typography.bodySmall,
                            fontFamily = OutfitFamily,
                            color = Color.White.copy(alpha = 0.85f),
                        )
                    }
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
        when {
            generation == null -> {
                Text(
                    text = "Generation not found",
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(padding)
                        .padding(20.dp),
                    fontFamily = OutfitFamily,
                    color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f),
                )
            }
            variants.isEmpty() -> {
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(padding)
                        .padding(20.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp),
                ) {
                    Text(
                        text = generation.yearLabel(),
                        style = MaterialTheme.typography.bodyLarge,
                        fontFamily = OutfitFamily,
                        color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.65f),
                    )
                    Text(
                        text = "Engines coming soon for this generation.",
                        style = MaterialTheme.typography.bodyMedium,
                        fontFamily = OutfitFamily,
                        color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.5f),
                    )
                }
            }
            else -> {
                LazyColumn(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(padding),
                ) {
                    item {
                        Column(
                            modifier = Modifier.padding(horizontal = 20.dp, vertical = 16.dp),
                            verticalArrangement = Arrangement.spacedBy(4.dp),
                        ) {
                            Text(
                                text = generation.code,
                                style = MaterialTheme.typography.titleLarge,
                                fontFamily = OutfitFamily,
                                fontWeight = FontWeight.Bold,
                                color = Ultramarine,
                            )
                            Text(
                                text = generation.yearLabel(),
                                style = MaterialTheme.typography.bodyMedium,
                                fontFamily = OutfitFamily,
                                color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.55f),
                            )
                        }
                        HorizontalDivider(
                            color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.08f),
                        )
                    }
                    items(variants, key = { it.id }) { variant ->
                        VariantRow(
                            variant = variant,
                            onClick = { onVariantClick(variant) },
                        )
                        HorizontalDivider(
                            modifier = Modifier.padding(start = 20.dp),
                            color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.08f),
                        )
                    }
                    item { Spacer(modifier = Modifier.height(24.dp)) }
                }
            }
        }
    }
}

@Composable
private fun VariantRow(
    variant: PowertrainVariant,
    onClick: () -> Unit,
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
            .padding(horizontal = 20.dp, vertical = 16.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Column(
            modifier = Modifier.weight(1f),
            verticalArrangement = Arrangement.spacedBy(4.dp),
        ) {
            Text(
                text = variant.name,
                style = MaterialTheme.typography.titleMedium,
                fontFamily = OutfitFamily,
                fontWeight = FontWeight.SemiBold,
            )
            val subtitle = variant.listSubtitle()
            if (subtitle.isNotBlank()) {
                Text(
                    text = subtitle,
                    style = MaterialTheme.typography.bodyMedium,
                    fontFamily = OutfitFamily,
                    color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.55f),
                )
            }
        }
        Icon(
            imageVector = Icons.AutoMirrored.Filled.KeyboardArrowRight,
            contentDescription = null,
            tint = Ultramarine.copy(alpha = 0.7f),
        )
    }
}
