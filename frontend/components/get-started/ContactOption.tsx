import type { ReactNode } from "react";

type ContactOptionProps = {
    icon: ReactNode;
    title: string;
    description: string;
    children?: ReactNode; // extra content shown under the description (e.g. phone + hours)
};

export default function ContactOption({ icon, title, description, children }: ContactOptionProps) {
    return (
        <div className="grid grid-cols-[auto_1fr] gap-x-5 sm:gap-x-7">

            {/* Light-blue icon circle */}
            <span className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E3F2FD] text-[#0095FE]">
                {icon}
            </span>

            <div className="sm:pt-1.5">
                <h3 className="text-2xl sm:text-[26px] font-bold text-[#00061A]">
                    {title}
                </h3>
                <p className="mt-2 max-w-sm text-base sm:text-lg text-[#33435C] leading-snug">
                    {description}
                </p>
                {children}
            </div>

        </div>
    );
}
