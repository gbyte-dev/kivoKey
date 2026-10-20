import Image from "next/image";
import type { Service } from "@/lib/services";
import Breadcrumbs from "./Breadcrumbs";
import CtaButtons from "./CtaButtons";

export default function ServiceHero({ service }: { service: Service }) {
    return (
        <section className="w-full bg-[#F3F8FF]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-center">

                {/* Text */}
                <div>
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Services", href: "/services" },
                            { label: service.title },
                        ]}
                    />
                    <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight text-[#00061A]">
                        {service.title}
                    </h1>
                    <p className="mt-3 text-xl sm:text-2xl font-bold text-[#0084FE]">
                        {service.tagline}
                    </p>
                    <p className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-[#33435C]">
                        {service.intro}
                    </p>
                    <CtaButtons className="mt-8" />
                </div>

                {/* Photo */}
                <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    width={service.image.width}
                    height={service.image.height}
                    sizes="(min-width: 1024px) 600px, 100vw"
                    preload
                    className="w-full aspect-16/10 rounded-2xl object-cover shadow-xl"
                />

            </div>
        </section>
    );
}
