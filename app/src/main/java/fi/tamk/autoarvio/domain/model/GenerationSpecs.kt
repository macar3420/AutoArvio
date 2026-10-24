package fi.tamk.autoarvio.domain.model

/**
 * Optional technical summary for a generation.
 * Only populated fields are shown in the UI.
 *
 * Power: use [powerHp]/[powerKw] for a single figure, or min/max bands.
 * Consumption figures are brochure-era approximate (see [consumptionStandard]).
 */
data class GenerationSpecs(
    val generationId: String,
    /** ice | hybrid | phev | bev */
    val powertrain: String? = null,
    val powerHp: Int? = null,
    val powerKw: Int? = null,
    val powerHpMin: Int? = null,
    val powerHpMax: Int? = null,
    val powerKwMin: Int? = null,
    val powerKwMax: Int? = null,
    /** e.g. "FWD / quattro" */
    val drivetrain: String? = null,
    /** e.g. "6MT / Multitronic / 7DCT" */
    val transmissionSummary: String? = null,
    /** e.g. "Sedan, Avant" */
    val bodyStyles: String? = null,
    /** ICE/hybrid engine lineup summary */
    val enginesSummary: String? = null,
    /** Typical combined L/100 km (mid value) */
    val consumptionCombinedL: Double? = null,
    /** Free-text range when a single figure is misleading */
    val consumptionNote: String? = null,
    /** NEDC | WLTP */
    val consumptionStandard: String? = null,
    /** BEV/PHEV usable battery kWh */
    val batteryKwh: Double? = null,
    val electricRangeKm: Int? = null,
    /** NEDC | WLTP for electric range if different from fuel standard */
    val rangeStandard: String? = null,
    /** BEV kWh/100 km */
    val consumptionCombinedKwh: Double? = null,
) {
    fun powertrainLabel(): String? = when (powertrain?.lowercase()) {
        "petrol", "gasoline" -> "Petrol"
        "diesel" -> "Diesel"
        "ice" -> "Petrol" // legacy gen-level average; prefer per-variant labels
        "hybrid" -> "Hybrid"
        "phev" -> "Plug-in hybrid"
        "bev" -> "Electric"
        else -> powertrain
    }

    fun powerLabel(): String? {
        val hpBand = when {
            powerHpMin != null && powerHpMax != null -> "$powerHpMin–$powerHpMax hp"
            powerHp != null -> "$powerHp hp"
            else -> null
        }
        val kwBand = when {
            powerKwMin != null && powerKwMax != null -> "$powerKwMin–$powerKwMax kW"
            powerKw != null -> "$powerKw kW"
            else -> null
        }
        return when {
            hpBand != null && kwBand != null -> "$hpBand ($kwBand)"
            hpBand != null -> hpBand
            else -> kwBand
        }
    }

    fun hasOverviewExtras(): Boolean =
        powertrain != null || bodyStyles != null

    fun hasPerformance(): Boolean =
        powerLabel() != null || drivetrain != null || transmissionSummary != null || enginesSummary != null

    fun hasEnergy(): Boolean =
        consumptionCombinedL != null ||
            consumptionNote != null ||
            batteryKwh != null ||
            electricRangeKm != null ||
            consumptionCombinedKwh != null
}
