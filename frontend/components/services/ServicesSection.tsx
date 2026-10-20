import ServiceCard from "./ServiceCard";
import {
    MobileServiceIcon,
    UpfrontQuoteIcon,
    KeyFobIcon,
    TrustedShieldIcon,
} from "./ServiceIcons";

const services = [
    {
        icon: MobileServiceIcon,
        title: "Mobile Service",
        description:
            "Our technicians come to your home, work, or roadside location to cut and program keys on-site.",
    },
    {
        icon: UpfrontQuoteIcon,
        title: "Upfront Quotes",
        description:
            "Submit your vehicle details, get a quote, and schedule service without the hassle of calling multiple shops.",
    },
    {
        icon: KeyFobIcon,
        title: "Key & Fob Solutions",
        description:
            "We handle spare keys, lost key replacement, and key fob programming for many vehicle types.",
    },
    {
        icon: TrustedShieldIcon,
        title: "Trusted Convenience",
        description:
            "Skip the dealership and get fast, convenient service from experienced mobile key technicians.",
    },
];

export default function ServicesSection() {
    return (
        <section id="services" className="w-full bg-white py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 text-center mb-10 sm:mb-12">
                    Same Day &amp; Next Day Mobile Car Key Service
                </h2>

                {/* 1 col on mobile, 2 on tablet, 4 on desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
                    {services.map((service) => (
                        <ServiceCard key={service.title} {...service} />
                    ))}
                </div>

            </div>
        </section>
    );
}
