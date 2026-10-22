import { SAMPLE_MAKES } from "./data/sample-vehicles";
import type { VehicleOption } from "./booking";

// Server-side only. Client components reach these through the server actions in app/(booking)/quote/actions.ts,
// the same way the real CarAPI calls will (API keys must stay on the server, spec §3.1).
// TODO(backend): replace the sample catalog with Node.js API / CarAPI calls; keep the exclusion filter below.

// Spec §3.4: never offered for instant booking, whatever the catalog returns
const EXCLUDED_MAKES = new Set(["tesla", "rivian", "scout", "freightliner"]);
const EXCLUDED_MODELS = new Set(["chrysler crossfire", "dodge sprinter", "infiniti qx30", "toyota supra"]);

const slug = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const inYears = (ranges: [number, number][], year: number) => ranges.some(([from, to]) => year >= from && year <= to);
const isExcluded = (make: string, model?: string) =>
    EXCLUDED_MAKES.has(make.toLowerCase()) || (model !== undefined && EXCLUDED_MODELS.has(`${make} ${model}`.toLowerCase()));

const byName = (a: VehicleOption, b: VehicleOption) => a.name.localeCompare(b.name, "en", { numeric: true });

export async function getVehicleYears(): Promise<number[]> {
    const years = new Set(SAMPLE_MAKES.flatMap((m) => m.years.flatMap(([from, to]) => Array.from({ length: to - from + 1 }, (_, i) => from + i))));
    return [...years].sort((a, b) => b - a);
}

export async function getVehicleMakes(year: number): Promise<VehicleOption[]> {
    return SAMPLE_MAKES.filter((m) => inYears(m.years, year) && !isExcluded(m.name))
        .map((m) => ({ id: slug(m.name), name: m.name }))
        .sort(byName);
}

export async function getVehicleModels(year: number, makeId: string): Promise<VehicleOption[]> {
    const make = SAMPLE_MAKES.find((m) => slug(m.name) === makeId);
    if (!make || !inYears(make.years, year) || isExcluded(make.name)) return [];

    return make.models
        .map((m) => (typeof m === "string" ? { name: m, years: make.years } : m))
        .filter((m) => inYears(m.years, year) && !isExcluded(make.name, m.name))
        .map((m) => ({ id: `${makeId}-${slug(m.name)}`, name: m.name }))
        .sort(byName);
}
