// Booking flow: steps and shared types. Safe to import from client components (no data, no server code).

export const BOOKING_STEPS = [
    { id: "location", label: "Location", title: "Check Your Location" },
    { id: "vehicle", label: "Vehicle", title: "Select Your Vehicle" },
    { id: "key-type", label: "Key Type", title: "What type of key do you need?" },
    { id: "key-status", label: "Key Status", title: "Do you currently have a working key?" },
    { id: "price", label: "Price", title: "Your All-Inclusive Price" },
    { id: "window", label: "Window", title: "Select Your Arrival Window" },
    { id: "details", label: "Details", title: "Service Address & Contact Information" },
    { id: "payment", label: "Payment", title: "Review Your Order & Secure Payment" },
] as const;

export type ServiceArea = { zip: string; city: string; state: string; slug: string };

export type VehicleOption = { id: string; name: string };

// Catalog IDs plus a readable snapshot, so a booking still makes sense if the catalog changes (spec §3.1)
export type Vehicle = { year: number; makeId: string; make: string; modelId: string; model: string };

export const vehicleLabel = (v: Vehicle) => `${v.year} ${v.make} ${v.model}`;

// The three customer-friendly key categories (spec §2 step 4). Prices are set per category (spec §3.2).
export const KEY_TYPES = [
    {
        id: "traditional",
        label: "Traditional car key",
        detail: "with chip",
        description: "A metal key with a chip in the plastic head. You turn it to start the car.",
    },
    {
        id: "remote",
        label: "Key with remote buttons",
        detail: null,
        description: "Lock and unlock buttons are built into the key head. Includes flip keys.",
    },
    {
        id: "smart",
        label: "Smart key / Push-to-start",
        detail: null,
        description: "A keyless fob. Your car starts with a START button instead of a key.",
    },
] as const;

export type KeyType = (typeof KEY_TYPES)[number]["id"];

export const keyTypeLabel = (id: KeyType) => KEY_TYPES.find((k) => k.id === id)!.label;

// "Do you have a working key?" (spec §2 step 5). All keys lost may change feasibility/price (spec §2.1, §3.3).
export const KEY_STATUSES = [
    {
        id: "working",
        label: "Yes, I have a working key",
        short: "Have a working key",
        description: "I need a replacement or a spare made from my current key.",
    },
    {
        id: "all-keys-lost",
        label: "No, all keys are lost",
        short: "All keys lost",
        description: "I don't have any key that starts my vehicle.",
    },
] as const;

export type KeyStatus = (typeof KEY_STATUSES)[number]["id"];

export const keyStatusLabel = (id: KeyStatus) => KEY_STATUSES.find((k) => k.id === id)!.short;

// One all-inclusive customer total, or a manual-review path when the case can't be priced automatically (spec §2 step 6).
// ruleId / ruleVersion are stored with the booking so later price changes don't alter it (spec §2.1, §10).
export type Quote =
    | { status: "priced"; total: number; currency: "USD"; ruleId: string; ruleVersion: string; notice?: string }
    | { status: "manual"; reason: string };

// The six 2-hour arrival windows, in the market's local time (spec §4, AC-06). Never an exact arrival time.
export const ARRIVAL_WINDOWS = [
    { id: "08-10", startHour: 8, label: "8:00 AM – 10:00 AM", short: "8–10 AM", part: "Morning" },
    { id: "10-12", startHour: 10, label: "10:00 AM – 12:00 PM", short: "10 AM–12 PM", part: "Morning" },
    { id: "12-14", startHour: 12, label: "12:00 PM – 2:00 PM", short: "12–2 PM", part: "Afternoon" },
    { id: "14-16", startHour: 14, label: "2:00 PM – 4:00 PM", short: "2–4 PM", part: "Afternoon" },
    { id: "16-18", startHour: 16, label: "4:00 PM – 6:00 PM", short: "4–6 PM", part: "Evening" },
    { id: "18-20", startHour: 18, label: "6:00 PM – 8:00 PM", short: "6–8 PM", part: "Evening" },
] as const;

export type ArrivalWindowId = (typeof ARRIVAL_WINDOWS)[number]["id"];

export const arrivalWindow = (id: ArrivalWindowId) => ARRIVAL_WINDOWS.find((w) => w.id === id)!;

export type AvailabilityDay = {
    date: string; // YYYY-MM-DD in the market's time zone
    label: string; // "Today", "Tomorrow", "Mon"
    monthDay: string; // "Oct 22"
    closed: boolean; // not an operating day / blackout date
    windows: { id: ArrivalWindowId; available: boolean }[];
};

export type Availability = { timeZone: string; timeZoneName: string; days: AvailabilityDay[] };

// What gets stored with the booking: local date + window + the zone they're in, so DST can't shift it (spec §4)
export type Schedule = { date: string; windowId: ArrivalWindowId; timeZone: string };

export const isScheduleAvailable = (availability: Availability, s: Schedule) =>
    availability.days.some((d) => d.date === s.date && d.windows.some((w) => w.id === s.windowId && w.available));

// "Thu, Oct 22" from a YYYY-MM-DD calendar date (no time zone shifting)
export const formatDay = (date: string, style: "short" | "long" = "short") =>
    new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
        timeZone: "UTC",
        weekday: style,
        month: style,
        day: "numeric",
    });

// Step 7: where to go and who to contact (spec §2 step 8, §2.1)
export type ServiceAddress = { street: string; unit: string; city: string; state: string; zip: string; notes: string };
export type Customer = { firstName: string; lastName: string; phone: string; email: string }; // phone: 10 digits
// Consent timestamps (ISO) are kept with the booking (spec §2.1, §11)
export type Consents = { termsAcceptedAt: string; smsConsentAt: string | null };
export type BookingDetails = { address: ServiceAddress; customer: Customer; consents: Consents };

// "(380) 324-5459" from any typed phone number (US)
export function formatPhone(value: string): string {
    const digits = value.replace(/\D/g, "").replace(/^1(?=\d{10})/, "").slice(0, 10);
    if (digits.length < 4) return digits;
    if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);

export type ZipCheckResult =
    | ({ status: "available" } & ServiceArea)
    | { status: "unavailable"; zip: string }
    | { status: "invalid" };

// Accepts "43215" or ZIP+4 "43215-1234"; returns the 5-digit ZIP or null
export function normalizeZip(value: string): string | null {
    const match = value.trim().match(/^(\d{5})(?:-\d{4})?$/);
    return match ? match[1] : null;
}
