package fi.tamk.autoarvio.ui.generations

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
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
fun VariantDetailScreen(
    viewModel: VariantDetailViewModel,
    onBack: () -> Unit,
) {
    val variant = viewModel.variant
    val generation = viewModel.generation

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        text = variant?.name ?: "Engine",
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
        if (variant == null) {
            Text(
                text = "Engine not found",
                modifier = Modifier
                    .fillMaxSize()
                    .padding(padding)
                    .padding(20.dp),
                fontFamily = OutfitFamily,
                color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f),
            )
            return@Scaffold
        }

        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .verticalScroll(rememberScrollState())
                .padding(horizontal = 20.dp, vertical = 16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp),
        ) {
            Text(
                text = viewModel.modelTitle,
                style = MaterialTheme.typography.titleLarge,
                fontFamily = OutfitFamily,
                fontWeight = FontWeight.SemiBold,
            )
            Text(
                text = listOfNotNull(generation?.code, variant.name).joinToString(" · "),
                style = MaterialTheme.typography.headlineSmall,
                fontFamily = OutfitFamily,
                fontWeight = FontWeight.Bold,
                color = Ultramarine,
            )
            generation?.yearLabel()?.let { years ->
                Text(
                    text = years,
                    style = MaterialTheme.typography.bodyLarge,
                    fontFamily = OutfitFamily,
                    color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.65f),
                )
            }

            VariantSpecsSections(
                variant = variant,
                yearsLabel = generation?.yearLabel(),
            )
        }
    }
}

@Composable
private fun VariantSpecsSections(
    variant: PowertrainVariant,
    yearsLabel: String?,
) {
    Spacer(modifier = Modifier.height(4.dp))

    SpecSection(title = "Overview") {
        yearsLabel?.let { SpecRow(label = "Years", value = it) }
        variant.powertrainLabel()?.let { SpecRow(label = "Powertrain", value = it) }
        variant.bodyStyles?.let { SpecRow(label = "Body", value = it) }
    }

    if (variant.hasPerformance()) {
        SpecSection(title = "Performance") {
            variant.powerLabel()?.let { SpecRow(label = "Power", value = it) }
            variant.drivetrain?.let { SpecRow(label = "Drivetrain", value = it) }
            variant.transmissionSummary?.let { SpecRow(label = "Gearbox", value = it) }
        }
    }

    if (variant.hasEnergy()) {
        SpecSection(title = "Energy") {
            variant.consumptionCombinedL?.let { litres ->
                val standard = variant.consumptionStandard?.let { " ($it)" }.orEmpty()
                SpecRow(
                    label = "Consumption",
                    value = String.format("%.1f L/100 km%s", litres, standard),
                )
            }
            variant.consumptionNote?.let { SpecRow(label = "Note", value = it) }
            variant.batteryKwh?.let {
                SpecRow(label = "Battery", value = String.format("%.1f kWh usable", it))
            }
            variant.electricRangeKm?.let { range ->
                val standard = (variant.rangeStandard ?: variant.consumptionStandard)
                    ?.let { " ($it)" }
                    .orEmpty()
                SpecRow(label = "Electric range", value = "$range km$standard")
            }
            variant.consumptionCombinedKwh?.let {
                val standard = variant.consumptionStandard?.let { s -> " ($s)" }.orEmpty()
                SpecRow(
                    label = "Energy use",
                    value = String.format("%.1f kWh/100 km%s", it, standard),
                )
            }
        }
    }
}

@Composable
private fun SpecSection(
    title: String,
    content: @Composable () -> Unit,
) {
    Column(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        Text(
            text = title,
            style = MaterialTheme.typography.titleMedium,
            fontFamily = OutfitFamily,
            fontWeight = FontWeight.SemiBold,
            color = Ultramarine,
        )
        HorizontalDivider(
            color = Ultramarine.copy(alpha = 0.2f),
            thickness = 1.dp,
        )
        content()
        Spacer(modifier = Modifier.height(4.dp))
    }
}

@Composable
private fun SpecRow(
    label: String,
    value: String,
) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.Top,
    ) {
        Text(
            text = label,
            style = MaterialTheme.typography.bodyMedium,
            fontFamily = OutfitFamily,
            color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.55f),
            modifier = Modifier
                .weight(0.38f)
                .padding(end = 12.dp),
        )
        Text(
            text = value,
            style = MaterialTheme.typography.bodyMedium,
            fontFamily = OutfitFamily,
            fontWeight = FontWeight.Medium,
            color = MaterialTheme.colorScheme.onSurface,
            modifier = Modifier.weight(0.62f),
        )
    }
}
