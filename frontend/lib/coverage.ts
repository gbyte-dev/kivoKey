import { findLocationByZip } from "./locations";
import { normalizeZip, type ZipCheckResult } from "./booking";

// Server-side only (reads the location data). Client components call it through
// the server action in app/(booking)/quote/actions.ts.
// TODO(backend): replace the body with the Node.js API coverage check.
export async function checkZipCoverage(value: string): Promise<ZipCheckResult> {
    const zip = normalizeZip(value);
    if (!zip) return { status: "invalid" };

    const location = await findLocationByZip(zip);
    if (!location) return { status: "unavailable", zip };

    return { status: "available", zip, city: location.city, state: location.state, slug: location.slug };
}
