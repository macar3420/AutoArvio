/**
 * Split combined EU gearbox strings into separate variant rows.
 * e.g. "6MT / 7 S tronic" → two rows with transmissionSummary "6MT" and "7 S tronic".
 * Single offerings (S tronic, 8AT, 1-speed) stay one row.
 */

const GEAR_TOKEN =
  /^(?:\d?\s*)?(?:MT|AT|DCT|DSG|CVT|S tronic|R tronic|Steptronic|tiptronic|e-CVT|1-speed|Multitronic)/i;

/**
 * @param {object[]} rows
 * @returns {object[]}
 */
export function splitGearboxRows(rows) {
  const out = [];
  for (const row of rows) {
    const gear = row.transmissionSummary;
    if (!gear || !gear.includes(" / ")) {
      out.push(row);
      continue;
    }
    const parts = gear.split(" / ").map((p) => p.trim()).filter(Boolean);
    const allGear = parts.length >= 2 && parts.every((p) => GEAR_TOKEN.test(p) || /\d\s*(MT|AT|DCT)/i.test(p));
    if (!allGear) {
      out.push(row);
      continue;
    }
    for (const part of parts) {
      const { id, ...rest } = row;
      out.push({
        ...rest,
        transmissionSummary: part,
        // drop fixed id so finalize can slug name+gear uniquely
      });
    }
  }
  return out;
}
