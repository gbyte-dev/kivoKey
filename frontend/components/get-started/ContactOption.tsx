import type { ReactNode } from "react";

type ContactOptionProps = {
    icon: ReactNode;
    title: string;
    description: string;
    children?: ReactNode; // extra content shown under the description (e.g. phone + hours)
};

export default function ContactOption({ icon, title, description, children }: ContactOptionProps) {
    return (
        // Mobile: icon + title on one row, the rest full width below (so the phone number fits).
        // sm+: icon on the left spanning both rows, everything else in the right column.
        <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 sm:items-start sm:gap-x-7">

            {/* Light-blue icon circle */}
            <span className="flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 sm:row-span-2 rounded-full bg-[#E3F2FD] text-[#0095FE]">
                {icon}
            </span>

            <h3 className="text-[22px] sm:text-[26px] font-bold text-[#00061A] sm:pt-1.5">
                {title}
            </h3>

            <div className="col-span-2 mt-3 sm:col-span-1 sm:mt-2">
                <p className="max-w-sm text-base sm:text-lg text-[#33435C] leading-snug">
                    {description}
                </p>
                {children}
            </div>

        </div>
    );
}
