import type { KeyStatus, KeyType, Quote, Vehicle } from "./booking";

// Server-side only. KivoKey's own pricing engine (spec §3): price depends on make + model-year range + key category,
// never on the model (spec §3.2, AC-04). All amounts are customer totals that already include the $99 mobile service
// amount, which is never shown separately (spec §1.1).
// TODO(backend): SEED catalog from the spec. Move to the database (pricing_rules / pricing_rule_versions) and check
// every figure against the owner's 2026 master price list before launch (spec §3.2, §14).

export const PRICE_RULE_VERSION = "spec-2026-10-18-seed";

type PriceRule = {
    id: string;
    makes: string[]; // make IDs as used by the vehicle catalog
    years: [number, number];
    prices: Partial<Record<KeyType, number>>; // key categories without a price need a manual quote
    notice?: string; // shown to the customer with the price
    manualIfAllKeysLost?: boolean;
};

const DOMESTIC_JAPANESE_KOREAN = [
    "buick", "cadillac", "chevrolet", "chrysler", "dodge", "ford", "gmc", "hummer", "jeep", "lincoln", "mercury",
    "oldsmobile", "pontiac", "ram", "saturn", "acura", "honda", "infiniti", "lexus", "mazda", "mitsubishi", "nissan",
    "scion", "subaru", "suzuki", "toyota", "genesis", "hyundai", "kia",
];

const all = (price: number): Record<KeyType, number> => ({ traditional: price, remote: price, smart: price });

const VIN_NOTICE = "Keys for some of these vehicles are ordered using your VIN, which can add time before your appointment. We'll confirm this with you.";

const RULES: PriceRule[] = [
    // spec §3.2
    { id: "djk-2000-2019", makes: DOMESTIC_JAPANESE_KOREAN, years: [2000, 2019], prices: { traditional: 198, remote: 248, smart: 298 } },
    { id: "djk-2020-plus", makes: DOMESTIC_JAPANESE_KOREAN, years: [2020, 9999], prices: { traditional: 298, remote: 348, smart: 398 } },

    // spec §3.3 European special prices
    { id: "alfa-2016-2024", makes: ["alfa-romeo"], years: [2016, 2024], prices: all(498) },
    { id: "audi-2000-2004", makes: ["audi"], years: [2000, 2004], prices: { traditional: 198, remote: 298 } },
    { id: "audi-2006-2026", makes: ["audi"], years: [2006, 2026], prices: all(798), notice: VIN_NOTICE },
    // "bladed / push-button": bladed keys (with or without buttons) vs push-to-start; mapping to confirm with the owner
    { id: "bmw-2000-2015", makes: ["bmw"], years: [2000, 2015], prices: { traditional: 298, remote: 298, smart: 498 } },
    { id: "bmw-2016-2026", makes: ["bmw"], years: [2016, 2026], prices: all(598), notice: VIN_NOTICE },
    { id: "jlr-2000-2026", makes: ["jaguar", "land-rover"], years: [2000, 2026], prices: all(698), manualIfAllKeysLost: true },
    // "bladed / proximity"
    { id: "maserati-2000-2020", makes: ["maserati"], years: [2000, 2020], prices: { traditional: 898, remote: 898, smart: 498 } },
    { id: "mercedes-2000-2013", makes: ["mercedes-benz"], years: [2000, 2013], prices: all(498) },
    { id: "mercedes-2014-2026", makes: ["mercedes-benz"], years: [2014, 2026], prices: all(1194) },
    { id: "vw-2000-2004", makes: ["volkswagen"], years: [2000, 2004], prices: { traditional: 198, remote: 298 } },
    { id: "vw-2006-2026", makes: ["volkswagen"], years: [2006, 2026], prices: all(498), notice: VIN_NOTICE },
    // "transponder / remote / proximity"
    { id: "volvo-2000-2025", makes: ["volvo"], years: [2000, 2025], prices: { traditional: 398, remote: 598, smart: 598 } },
];

type QuoteInput = { vehicle: Pick<Vehicle, "year" | "makeId">; keyType: KeyType; keyStatus: KeyStatus };

// Unlisted or ambiguous cases are never auto-priced: they go to manual review (spec §2 step 6, §3.4, AC-05)
export async function getQuote({ vehicle, keyType, keyStatus }: QuoteInput): Promise<Quote> {
    const rule = RULES.find((r) => r.makes.includes(vehicle.makeId) && vehicle.year >= r.years[0] && vehicle.year <= r.years[1]);
    if (!rule) {
        return { status: "manual", reason: "We can't give an instant price for this vehicle online yet." };
    }
    if (keyStatus === "all-keys-lost" && rule.manualIfAllKeysLost) {
        return { status: "manual", reason: "When all keys are lost, this vehicle needs a quick review by our team before we can give a price." };
    }
    const total = rule.prices[keyType];
    if (total === undefined) {
        return { status: "manual", reason: "This key type isn't available for instant booking on your vehicle." };
    }
    return { status: "priced", total, currency: "USD", ruleId: rule.id, ruleVersion: PRICE_RULE_VERSION, notice: rule.notice };
}
