import type { Service } from "@/lib/services";
import ServiceLinkCard from "./ServiceLinkCard";

export default function OtherServices({ services }: { services: Service[] }) {
    return (
        <section className="w-full bg-white pt-16 sm:pt-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#00061A] text-center">
                    Other services
                </h2>
                <div className="mt-10 grid gap-6 md:grid-cols-2">
                    {services.map((service) => (
                        <ServiceLinkCard key={service.slug} service={service} />
                    ))}
                </div>
            </div>
        </section>
    );
}
