import { ARRIVAL_WINDOWS, type Availability, type AvailabilityDay } from "./booking";
import { getLocation } from "./locations";

// Server-side only. Which days / 2-hour windows can be booked in a market (spec §2 step 7, §4).
// TODO(backend): SAMPLE rules. Operating days, blackout dates, lead time, booking cutoff and capacity are configured
// per market in the admin dashboard; Monday–Saturday 8 AM–8 PM is the homepage reference, pending owner approval.
const SAMPLE_MARKET_RULES = {
    operatingDays: [1, 2, 3, 4, 5, 6], // Mon–Sat (0 = Sunday)
    blackoutDates: [] as string[], // "YYYY-MM-DD"
    leadTimeHours: 2, // a window must start at least this long from now
    daysAhead: 14,
};

// The market's local calendar date and clock time right now
function localNow(timeZone: string) {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone,
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hourCycle: "h23",
    }).formatToParts(new Date());
    const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
    return { year: get("year"), month: get("month"), day: get("day"), hours: get("hour") + get("minute") / 60 };
}

export async function getAvailability(locationSlug: string): Promise<Availability | null> {
    const location = await getLocation(locationSlug);
    if (!location) return null;

    const rules = SAMPLE_MARKET_RULES;
    const now = localNow(location.timeZone);

    const days: AvailabilityDay[] = Array.from({ length: rules.daysAhead }, (_, i) => {
        // pure calendar math in UTC, so daylight-saving changes never shift a date
        const day = new Date(Date.UTC(now.year, now.month - 1, now.day + i));
        const date = day.toISOString().slice(0, 10);
        const closed = !rules.operatingDays.includes(day.getUTCDay()) || rules.blackoutDates.includes(date);

        return {
            date,
            label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : day.toLocaleDateString("en-US", { timeZone: "UTC", weekday: "short" }),
            monthDay: day.toLocaleDateString("en-US", { timeZone: "UTC", month: "short", day: "numeric" }),
            closed,
            windows: ARRIVAL_WINDOWS.map((w) => ({
                id: w.id,
                available: !closed && (i > 0 || w.startHour >= now.hours + rules.leadTimeHours),
            })),
        };
    });

    const timeZoneName =
        new Intl.DateTimeFormat("en-US", { timeZone: location.timeZone, timeZoneName: "long" })
            .formatToParts(new Date())
            .find((p) => p.type === "timeZoneName")?.value ?? location.timeZone;

    return { timeZone: location.timeZone, timeZoneName, days };
}
