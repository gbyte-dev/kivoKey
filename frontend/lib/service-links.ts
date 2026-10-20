// The service subpages. Kept separate from the full page content (lib/services.ts)
// so menus (client components) can import it without bundling all the page copy.
export const serviceLinks = [
    { slug: "car-key-replacement", title: "Car Key Replacement" },
    { slug: "spare-car-keys", title: "Spare Car Keys" },
    { slug: "all-keys-lost", title: "All Keys Lost" },
] as const;

export type ServiceSlug = (typeof serviceLinks)[number]["slug"];

export const serviceHref = (slug: ServiceSlug) => `/services/${slug}`;
