import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/services";

type ServiceLinkCardProps = {
    service: Pick<Service, "title" | "summary" | "href" | "image">;
};

// Clickable card linking to a service subpage (used on /services and in "Other services")
export default function ServiceLinkCard({ service }: ServiceLinkCardProps) {
    return (
        <Link
            href={service.href}
            className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
        >
            <Image
                src={service.image.src}
                alt=""
                width={service.image.width}
                height={service.image.height}
                sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                className="w-full aspect-16/10 object-cover"
            />
            <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-extrabold text-[#00061A]">{service.title}</h3>
                <p className="mt-2 flex-1 text-base leading-relaxed text-[#33435C]">{service.summary}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-bold text-[#0084FE]">
                    Learn more
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
            </div>
        </Link>
    );
}
