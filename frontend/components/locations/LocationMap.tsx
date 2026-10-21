import Link from "next/link";
import { ChevronRight, KeyRound, X } from "lucide-react";
import type { ServiceLocation } from "@/lib/locations";
import type { ServiceMap } from "@/lib/service-map";

type LocationMapProps = {
    map: ServiceMap;
    locations: ServiceLocation[];
    selected: string | null;
    highlighted: string | null; // hovered in the list
    matching: Set<string> | null; // cities matching the search (null = not searching)
    onSelect: (slug: string | null) => void;
};

// Like dropoff.com: whole-US map in one blue, pins on every city. While searching, the map and the
// other pins fade and only the matching cities stay bright; clicking a city opens its popup.
export default function LocationMap({ map, locations, selected, highlighted, matching, onSelect }: LocationMapProps) {
    const bySlug = new Map(locations.map((l) => [l.slug, l]));
    const selectedPin = map.pins.find((p) => p.slug === selected);
    const selectedLocation = selected ? bySlug.get(selected) : undefined;
    const filtering = matching !== null;

    return (
        <div className="relative w-full" style={{ aspectRatio: `${map.width} / ${map.height}` }}>
            <svg
                viewBox={`0 0 ${map.width} ${map.height}`}
                className={`absolute inset-0 w-full h-full transition-opacity duration-200 ${filtering ? "opacity-40" : "opacity-100"}`}
                role="img"
                aria-label="Map of KivoKey service locations"
            >
                {map.states.map((state) => (
                    // KivoKey logo blue
                    <path key={state.name} d={state.d} fill="#00A9FE" stroke="#fff" strokeWidth={1} strokeLinejoin="round" />
                ))}
                {map.insetFrames.map((d) => (
                    <path key={d} d={d} fill="none" stroke="#C9CDD2" strokeWidth={2} />
                ))}
            </svg>

            {/* Pins (selected / hovered ones on top) */}
            {map.pins.map((pin) => {
                const location = bySlug.get(pin.slug)!;
                const isSelected = pin.slug === selected;
                const isHighlighted = isSelected || pin.slug === highlighted;
                const isDimmed = filtering && !matching.has(pin.slug) && !isHighlighted;
                return (
                    <button
                        key={pin.slug}
                        type="button"
                        onClick={() => onSelect(isSelected ? null : pin.slug)}
                        aria-label={`${location.city}, ${location.state}`}
                        aria-pressed={isSelected}
                        className={`absolute flex items-center justify-center w-6 h-6 sm:w-7.5 sm:h-7.5 rounded-full bg-white shadow-md ring-[3px] ring-[#FEE802] -translate-x-1/2 -translate-y-1/2 transition-[opacity,scale] duration-200 hover:scale-115 ${isHighlighted ? "z-10 scale-115" : ""} ${isDimmed ? "opacity-35" : "opacity-100"}`}
                        style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                    >
                        <KeyRound className="w-1/2 h-1/2 text-[#0070D0]" strokeWidth={2.75} />
                    </button>
                );
            })}

            {/* Popup above the selected pin */}
            {selectedPin && selectedLocation && (
                <div
                    className="absolute z-20"
                    style={{
                        left: `${selectedPin.x}%`,
                        top: `${selectedPin.y}%`,
                        // centered over the pin, but shifted inward near the map's edges so it never gets cut off
                        transform: `translate(${selectedPin.x > 75 ? "-88%" : selectedPin.x < 25 ? "-12%" : "-50%"}, calc(-100% - 24px))`,
                    }}
                >
                    <div className="relative min-w-47 rounded-md bg-white px-8 pt-4 pb-3.5 text-center shadow-[0_4px_20px_rgba(0,0,0,0.18)]">
                        <button
                            type="button"
                            onClick={() => onSelect(null)}
                            aria-label="Close"
                            className="absolute right-1.5 top-1.5 p-1 text-[#00061A] hover:text-[#0070D0]"
                        >
                            <X className="w-4 h-4" strokeWidth={2.5} />
                        </button>
                        <p className="text-[15px] text-[#00061A]">
                            {selectedLocation.city}, {selectedLocation.state}
                        </p>
                        <Link
                            href={`/locations/${selectedLocation.slug}`}
                            className="mt-3 inline-flex items-center gap-0.5 text-[15px] text-[#0070D0] hover:underline"
                        >
                            View
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
