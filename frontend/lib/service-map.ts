import { geoAlbersUsa, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";
import statesTopology from "us-atlas/states-10m.json";
import { US_STATES } from "./us-states";
import type { ServiceLocation } from "./locations";

// Builds the locations map on the server (plain SVG paths + pin positions), so the browser
// doesn't need a map library. Like dropoff.com: the whole US, with Alaska and Hawaii as insets.

const WIDTH = 960;
const HEIGHT = 600;
const PADDING = 10;

export type ServiceMap = {
    width: number;
    height: number;
    states: { name: string; d: string }[];
    insetFrames: string[]; // gray lines separating the Alaska / Hawaii insets
    pins: { slug: string; x: number; y: number }[]; // x/y in % of the map box
};

const topology = statesTopology as unknown as Topology<{ states: GeometryCollection<{ name: string }> }>;
const stateNames = new Set<string>(US_STATES.map((s) => s.name));
const usStates = (feature(topology, topology.objects.states) as FeatureCollection<Geometry, { name: string }>).features
    // 50 states + DC only (no territories, which this projection can't place)
    .filter((f) => stateNames.has(f.properties.name));

const projection = geoAlbersUsa().fitExtent(
    [[PADDING, PADDING], [WIDTH - PADDING, HEIGHT - PADDING]],
    { type: "FeatureCollection", features: usStates },
);
const path = geoPath(projection).digits(1);

// The state shapes never change, so they're computed once
const statePaths = usStates.map((f) => ({ name: f.properties.name, d: path(f) ?? "" })).filter((s) => s.d);

function insetFrames(): string[] {
    const bounds = (name: string) => path.bounds(usStates.find((f) => f.properties.name === name) as Feature);
    const [[akX0, akY0], [akX1]] = bounds("Alaska");
    const [[hiX0, hiY0], [hiX1]] = bounds("Hawaii");
    const gap = 10;
    const frameTop = Math.min(akY0, hiY0) - gap;
    const r = (n: number) => Math.round(n);
    return [
        // Alaska: along the top of the inset, then a slanted corner down to the bottom edge
        `M${r(akX0 - gap)} ${r(frameTop)}H${r(akX1 - 30)}L${r(hiX0 - gap)} ${r(hiY0 - gap)}V${HEIGHT}`,
        // Hawaii: same shape, to the right of Alaska
        `M${r(hiX0 - gap)} ${r(hiY0 - gap)}H${r(hiX1 - 20)}L${r(hiX1 + gap)} ${r(hiY0 + 30)}V${HEIGHT}`,
    ];
}
const frames = insetFrames();

export function buildServiceMap(locations: ServiceLocation[]): ServiceMap {
    const pins = locations.flatMap((l) => {
        const point = projection([l.lng, l.lat]);
        return point ? [{ slug: l.slug, x: (point[0] / WIDTH) * 100, y: (point[1] / HEIGHT) * 100 }] : [];
    });

    return { width: WIDTH, height: HEIGHT, states: statePaths, insetFrames: frames, pins };
}
