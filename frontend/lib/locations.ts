import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";
import type { StateAbbr } from "./us-states";
import sampleLocations from "./data/sample-locations.json";
import sampleZipAreas from "./data/sample-zip-areas.json";

export type ServiceLocation = {
    slug: string;
    city: string;
    state: StateAbbr;
    lat: number;
    lng: number;
    timeZone: string; // IANA zone; appointment windows are in the market's local time (spec §4)
    active: boolean; // only active locations are shown on the site
    zips: string[]; // ZIP codes served from this city (drawn as the service area on its map)
    nearbyAreas: string[]; // "We also cover these areas" (optional, can be empty)
};

export type ZipAreas = FeatureCollection<Polygon | MultiPolygon, { zip: string }>;

// TODO(backend): SAMPLE DATA so the UI looks complete (cities across the US, like dropoff.com). The real
// cities, their ZIP codes and nearby areas will come from the Node.js API (managed in the admin dashboard).
// Only Columbus is confirmed by the site copy. The ZIP lists are real ZIP codes around each city
// (US Census ZCTA data, nearest first), and data/sample-locations.json has the same shape the API should return.
const allLocations = sampleLocations as ServiceLocation[];

// --- Data access: the pages only call these. Swap the bodies for Node.js API calls later. ---

export async function getActiveLocations(): Promise<ServiceLocation[]> {
    return allLocations
        .filter((location) => location.active)
        .sort((a, b) => a.city.localeCompare(b.city));
}

export async function getLocation(slug: string): Promise<ServiceLocation | undefined> {
    return (await getActiveLocations()).find((location) => location.slug === slug);
}

// The active city (if any) whose service area includes this ZIP code
export async function findLocationByZip(zip: string): Promise<ServiceLocation | undefined> {
    return (await getActiveLocations()).find((location) => location.zips.includes(zip));
}

// Boundary shapes for the given ZIP codes (GeoJSON), used to draw a city's service area
export async function getZipAreas(zips: string[]): Promise<ZipAreas> {
    const wanted = new Set(zips);
    const all = sampleZipAreas as unknown as ZipAreas;
    return { type: "FeatureCollection", features: all.features.filter((f) => wanted.has(f.properties.zip)) };
}
