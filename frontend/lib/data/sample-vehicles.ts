// TODO(backend): SAMPLE vehicle catalog for building the UI. The real Year → Make → Model data comes from
// CarAPI through the Node.js API (spec §3.1). Makes and their year ranges follow the spec's pricing tables
// (§3.2 / §3.3); model lists are common models for each make and are NOT filtered by year here.

export type SampleMake = {
    name: string;
    years: [number, number][]; // model years the spec allows for instant quotes
    models: (string | { name: string; years: [number, number][] })[];
};

const ALL: [number, number][] = [[2000, 2027]];

export const SAMPLE_MAKES: SampleMake[] = [
    // --- Domestic (spec §3.2) ---
    { name: "Buick", years: ALL, models: ["Century", "Enclave", "Encore", "Envision", "LaCrosse", "LeSabre", "Lucerne", "Regal", "Rendezvous", "Verano"] },
    { name: "Cadillac", years: ALL, models: ["ATS", "CT4", "CT5", "CT6", "CTS", "DeVille", "DTS", "Escalade", "SRX", "STS", "XT4", "XT5", "XT6"] },
    { name: "Chevrolet", years: ALL, models: ["Blazer", "Camaro", "Cobalt", "Colorado", "Corvette", "Cruze", "Equinox", "Express", "HHR", "Impala", "Malibu", "Silverado 1500", "Sonic", "Spark", "Suburban", "Tahoe", "Trailblazer", "Traverse", "Trax"] },
    { name: "Chrysler", years: ALL, models: ["200", "300", "Pacifica", "PT Cruiser", "Sebring", "Town & Country", "Voyager"] },
    { name: "Dodge", years: ALL, models: ["Avenger", "Caliber", "Challenger", "Charger", "Dakota", "Dart", "Durango", "Grand Caravan", "Journey", "Magnum", "Neon", "Nitro"] },
    { name: "Ford", years: ALL, models: ["Bronco", "Bronco Sport", "EcoSport", "Edge", "Escape", "Expedition", "Explorer", "F-150", "F-250 Super Duty", "Fiesta", "Five Hundred", "Focus", "Freestyle", "Fusion", "Maverick", "Mustang", "Ranger", "Taurus", "Transit", "Transit Connect"] },
    { name: "GMC", years: ALL, models: ["Acadia", "Canyon", "Envoy", "Savana", "Sierra 1500", "Terrain", "Yukon", "Yukon XL"] },
    { name: "Hummer", years: [[2000, 2010]], models: ["H1", "H2", "H3"] },
    { name: "Jeep", years: ALL, models: ["Cherokee", "Commander", "Compass", "Gladiator", "Grand Cherokee", "Liberty", "Patriot", "Renegade", "Wagoneer", "Wrangler"] },
    { name: "Lincoln", years: ALL, models: ["Aviator", "Continental", "Corsair", "MKC", "MKS", "MKX", "MKZ", "Nautilus", "Navigator", "Town Car"] },
    { name: "Mercury", years: [[2000, 2011]], models: ["Grand Marquis", "Mariner", "Milan", "Montego", "Mountaineer", "Sable"] },
    { name: "Oldsmobile", years: [[2000, 2004]], models: ["Alero", "Aurora", "Bravada", "Intrigue", "Silhouette"] },
    { name: "Pontiac", years: [[2000, 2010]], models: ["Aztek", "Bonneville", "G6", "G8", "Grand Am", "Grand Prix", "Montana", "Solstice", "Torrent", "Vibe"] },
    { name: "Ram", years: [[2011, 2027]], models: ["1500", "2500", "3500", "ProMaster", "ProMaster City"] },
    { name: "Saturn", years: [[2000, 2010]], models: ["Aura", "Ion", "L-Series", "Outlook", "Relay", "S-Series", "Sky", "Vue"] },

    // --- Japanese (spec §3.2) ---
    { name: "Acura", years: ALL, models: ["ILX", "Integra", "MDX", "RDX", "RL", "RSX", "TL", "TLX", "TSX", "ZDX"] },
    { name: "Honda", years: ALL, models: ["Accord", "Civic", "CR-V", "Element", "Fit", "HR-V", "Insight", "Odyssey", "Passport", "Pilot", "Ridgeline"] },
    { name: "Infiniti", years: ALL, models: ["EX35", "FX35", "G35", "G37", "M35", "Q50", "Q60", "QX50", "QX56", "QX60", "QX80"] },
    { name: "Lexus", years: ALL, models: ["ES", "GS", "GX", "IS", "LS", "LX", "NX", "RX", "TX", "UX"] },
    { name: "Mazda", years: ALL, models: ["CX-3", "CX-30", "CX-5", "CX-50", "CX-9", "CX-90", "Mazda3", "Mazda6", "MX-5 Miata", "Tribute"] },
    { name: "Mitsubishi", years: ALL, models: ["Eclipse", "Eclipse Cross", "Endeavor", "Galant", "Lancer", "Mirage", "Outlander", "Outlander Sport"] },
    { name: "Nissan", years: ALL, models: ["Altima", "Armada", "Frontier", "Juke", "Kicks", "Leaf", "Maxima", "Murano", "Pathfinder", "Quest", "Rogue", "Sentra", "Titan", "Versa", "Xterra"] },
    { name: "Scion", years: [[2004, 2016]], models: ["FR-S", "iA", "iM", "iQ", "tC", "xA", "xB", "xD"] },
    { name: "Subaru", years: ALL, models: ["Ascent", "BRZ", "Crosstrek", "Forester", "Impreza", "Legacy", "Outback", "Tribeca", "WRX"] },
    { name: "Suzuki", years: [[2000, 2013]], models: ["Aerio", "Equator", "Forenza", "Grand Vitara", "Kizashi", "SX4", "XL-7"] },
    { name: "Toyota", years: ALL, models: ["4Runner", "Avalon", "C-HR", "Camry", "Corolla", "Corolla Cross", "FJ Cruiser", "Grand Highlander", "Highlander", "Land Cruiser", "Matrix", "Prius", "RAV4", "Sequoia", "Sienna", "Tacoma", "Tundra", "Venza", "Yaris"] },

    // --- Korean (spec §3.2) ---
    { name: "Genesis", years: [[2017, 2027]], models: ["G70", "G80", "G90", "GV60", "GV70", "GV80"] },
    { name: "Hyundai", years: ALL, models: ["Accent", "Azera", "Elantra", "Ioniq 5", "Kona", "Palisade", "Santa Cruz", "Santa Fe", "Sonata", "Tucson", "Veloster", "Venue"] },
    { name: "Kia", years: ALL, models: ["Carnival", "Forte", "K5", "Niro", "Optima", "Rio", "Sedona", "Seltos", "Sorento", "Soul", "Sportage", "Stinger", "Telluride"] },

    // --- European special-price makes (spec §3.3) ---
    { name: "Alfa Romeo", years: [[2016, 2024]], models: ["Giulia", "Stelvio"] },
    { name: "Audi", years: [[2000, 2004], [2006, 2026]], models: ["A3", "A4", "A5", "A6", "A7", "A8", "e-tron", "Q3", "Q5", "Q7", "Q8", "TT"] },
    { name: "BMW", years: [[2000, 2026]], models: ["2 Series", "3 Series", "4 Series", "5 Series", "7 Series", "i3", "X1", "X3", "X5", "X6", "X7", "Z4"] },
    { name: "Jaguar", years: [[2000, 2026]], models: ["E-PACE", "F-PACE", "F-TYPE", "I-PACE", "S-Type", "X-Type", "XE", "XF", "XJ", "XK"] },
    { name: "Land Rover", years: [[2000, 2026]], models: ["Defender", "Discovery", "Discovery Sport", "LR2", "LR3", "LR4", "Range Rover", "Range Rover Evoque", "Range Rover Sport", "Range Rover Velar"] },
    { name: "Maserati", years: [[2000, 2020]], models: ["Ghibli", "GranTurismo", "Levante", "Quattroporte"] },
    {
        name: "Mercedes-Benz",
        years: [[2000, 2026]],
        models: [
            "C-Class", "CLA", "E-Class", "G-Class", "GL/GLS-Class", "GLA", "GLC", "GLE",
            // spec §3.3: "early bladed ML excluded" (exact year cutoff to confirm with the owner)
            { name: "M-Class (ML)", years: [[2006, 2015]] },
            "S-Class",
        ],
    },
    { name: "Volkswagen", years: [[2000, 2004], [2006, 2026]], models: ["Atlas", "Beetle", "CC", "Golf", "GTI", "ID.4", "Jetta", "Passat", "Taos", "Tiguan", "Touareg"] },
    { name: "Volvo", years: [[2000, 2025]], models: ["C30", "S40", "S60", "S80", "S90", "V60", "V70", "XC40", "XC60", "XC70", "XC90"] },
];
