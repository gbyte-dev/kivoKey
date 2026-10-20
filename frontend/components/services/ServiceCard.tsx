import type { ComponentType, SVGProps } from "react";

type ServiceCardProps = {
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
};

export default function ServiceCard({ icon: Icon, title, description }: ServiceCardProps) {
    return (
        <div className="flex flex-col items-center text-center bg-white border border-gray-100 rounded-xl px-6 py-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <Icon className="w-16 h-16 text-[#0090FF] mb-5" />

            <h3 className="text-base font-bold text-gray-900 mb-2">
                {title}
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed max-w-[240px]">
                {description}
            </p>
        </div>
    );
}
