"use server";

import { KEY_STATUSES, KEY_TYPES, type KeyStatus, type KeyType } from "@/lib/booking";
import { checkZipCoverage } from "@/lib/coverage";
import { getQuote } from "@/lib/pricing";
import { getAvailability } from "@/lib/scheduling";
import { getVehicleMakes, getVehicleModels } from "@/lib/vehicles";

// Called from the "Check Your Location" step
export async function checkZipAction(zip: string) {
    return checkZipCoverage(zip);
}

// Called from the "Select Your Vehicle" step (Year → Make → Model)
export async function getVehicleMakesAction(year: number) {
    if (!Number.isInteger(year)) return [];
    return getVehicleMakes(year);
}

export async function getVehicleModelsAction(year: number, makeId: string) {
    if (!Number.isInteger(year) || typeof makeId !== "string") return [];
    return getVehicleModels(year, makeId);
}

// Called when leaving the "working key" step, to show the all-inclusive price
export async function getQuoteAction(input: { year: number; makeId: string; keyType: KeyType; keyStatus: KeyStatus }) {
    const validKeyType = KEY_TYPES.some((k) => k.id === input.keyType);
    const validKeyStatus = KEY_STATUSES.some((k) => k.id === input.keyStatus);
    if (!Number.isInteger(input.year) || typeof input.makeId !== "string" || !validKeyType || !validKeyStatus) {
        return { status: "manual" as const, reason: "We couldn't price this selection. Please go back and check your choices." };
    }
    return getQuote({ vehicle: { year: input.year, makeId: input.makeId }, keyType: input.keyType, keyStatus: input.keyStatus });
}

// Called when leaving the price step: bookable days and 2-hour windows for the customer's market
export async function getAvailabilityAction(locationSlug: string) {
    if (typeof locationSlug !== "string") return null;
    return getAvailability(locationSlug);
}
