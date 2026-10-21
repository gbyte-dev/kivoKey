"use client";

import "leaflet/dist/leaflet.css";
import { useMemo } from "react";
import L, { type PathOptions } from "leaflet";
import { GeoJSON, MapContainer, Marker, TileLayer } from "react-leaflet";
import type { ZipAreas } from "@/lib/locations";

export type ServiceAreaMapProps = {
    areas: ZipAreas;
    center: [number, number]; // [lat, lng] of the city
    label: string;
};

// TODO(launch): OpenStreetMap's own tiles are fine for development, but their usage policy doesn't allow
// heavy production traffic. Before going live, switch to a tile provider (Mapbox / MapTiler / Google);
// only these two constants need to change.
const TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const AREA_STYLE: PathOptions = { color: "#0070D0", weight: 1.5, fillColor: "#0090FF", fillOpacity: 0.28 };
const AREA_HOVER_STYLE: PathOptions = { ...AREA_STYLE, weight: 2.5, fillOpacity: 0.5 };

// Same pin as on the state map: white circle, yellow ring, blue key
const cityPin = L.divIcon({
    className: "",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    html: `<span class="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md ring-[3px] ring-[#FEE802]">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#0070D0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"/>
            <circle cx="16.5" cy="7.5" r=".5" fill="#0070D0"/>
        </svg>
    </span>`,
});

export default function ServiceAreaMapInner({ areas, center, label }: ServiceAreaMapProps) {
    // Fit the map to the ZIP areas (or just center on the city if there are none)
    const bounds = useMemo(() => (areas.features.length ? L.geoJSON(areas).getBounds() : undefined), [areas]);

    return (
        <MapContainer
            bounds={bounds}
            boundsOptions={{ padding: [24, 24] }}
            center={bounds ? undefined : center}
            zoom={bounds ? undefined : 11}
            scrollWheelZoom={false}
            // grayscale street tiles (only the tiles) so the blue service area stands out
            className="h-full w-full [&_.leaflet-tile-pane]:grayscale [&_.leaflet-tile-pane]:brightness-105 [&_.leaflet-tile-pane]:contrast-90"
        >
            <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />
            <GeoJSON
                data={areas}
                style={() => AREA_STYLE}
                onEachFeature={(feature, layer) => {
                    layer.bindTooltip(`ZIP ${feature.properties.zip}`, { sticky: true, direction: "top" });
                    layer.on({
                        mouseover: (e) => (e.target as L.Path).setStyle(AREA_HOVER_STYLE),
                        mouseout: (e) => (e.target as L.Path).setStyle(AREA_STYLE),
                    });
                }}
            />
            <Marker position={center} icon={cityPin} title={label} alt={label} />
        </MapContainer>
    );
}
