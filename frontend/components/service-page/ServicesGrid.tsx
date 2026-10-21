import { services } from "@/lib/services";
import ServiceLinkCard from "./ServiceLinkCard";

// The three service cards with a heading (used on the locations pages)
export default function ServicesGrid({ title = "Our services" }: { title?: string }) {
    return (
        <section className="w-full bg-white pt-14 sm:pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#00061A] text-center">{title}</h2>
                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <ServiceLinkCard key={service.slug} service={service} />
                    ))}
                </div>
            </div>
        </section>
    );
}
