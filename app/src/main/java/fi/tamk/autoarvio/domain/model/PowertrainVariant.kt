package fi.tamk.autoarvio.domain.model

/**
 * One engine / powertrain version within a generation (e.g. A4 B8 2.0 TDI 143).
 * Tech figures are approximate brochure / type-approval (see [consumptionStandard]).
 */
data class PowertrainVariant(
    val id: String,
    val generationId: String,
    /** Display name, e.g. "2.0 TDI 143" */
    val name: String,
    /** petrol | diesel | hybrid | phev | bev (legacy: ice) */
    val powertrain: String? = null,
    val powerHp: Int? = null,
    val powerKw: Int? = null,
    val drivetrain: String? = null,
    val transmissionSummary: String? = null,
    val bodyStyles: String? = null,
    val consumptionCombinedL: Double? = null,
    val consumptionNote: String? = null,
    /** NEDC | WLTP */
    val consumptionStandard: String? = null,
    val batteryKwh: Double? = null,
    val electricRangeKm: Int? = null,
    val rangeStandard: String? = null,
    val consumptionCombinedKwh: Double? = null,
) {
    fun powertrainLabel(): String? = when (powertrain?.lowercase()) {
        "petrol", "gasoline", "ice-petrol" -> "Petrol"
        "diesel", "ice-diesel" -> "Diesel"
        // Legacy bulk rows used generic "ice" — infer from name, never show "Petrol / diesel"
        "ice" -> when {
            name.contains("TDI", ignoreCase = true) ||
                name.contains("CDI", ignoreCase = true) ||
                name.contains("HDI", ignoreCase = true) ||
                name.contains("TDCI", ignoreCase = true) ||
                name.contains("dCi", ignoreCase = true) ||
                Regex("""\bDiesel\b""", RegexOption.IGNORE_CASE).containsMatchIn(name) -> "Diesel"
            else -> "Petrol"
        }
        "hybrid" -> "Hybrid"
        "phev" -> "Plug-in hybrid"
        "bev" -> "Electric"
        else -> powertrain
    }

    fun powerLabel(): String? {
        val hp = powerHp?.let { "$it hp" }
        val kw = powerKw?.let { "$it kW" }
        return when {
            hp != null && kw != null -> "$hp ($kw)"
            hp != null -> hp
            else -> kw
        }
    }

    /** List subtitle: "143 hp · 6MT/S tronic · FWD" */
    fun listSubtitle(): String =
        listOfNotNull(
            powerHp?.let { "$it hp" },
            transmissionSummary,
            drivetrain,
        ).joinToString(" · ")

    fun hasOverviewExtras(): Boolean =
        powertrain != null || bodyStyles != null

    fun hasPerformance(): Boolean =
        powerLabel() != null || drivetrain != null || transmissionSummary != null

    fun hasEnergy(): Boolean =
        consumptionCombinedL != null ||
            consumptionNote != null ||
            batteryKwh != null ||
            electricRangeKm != null ||
            consumptionCombinedKwh != null
}
