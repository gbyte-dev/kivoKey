import type { ReactNode } from "react";
import { Check } from "lucide-react";

type ChoiceCardProps = {
    name: string; // radio group name
    value: string;
    checked: boolean;
    onSelect: () => void;
    visual: ReactNode; // illustration / icon
    title: ReactNode;
    description: string;
};

// Big selectable card backed by a real radio input (keyboard arrows + screen readers work).
// Phones: picture on the left; sm+: picture on top.
export default function ChoiceCard({ name, value, checked, onSelect, visual, title, description }: ChoiceCardProps) {
    return (
        <label
            className={`relative flex cursor-pointer items-center gap-3 min-[375px]:gap-4 rounded-2xl border-2 p-3.5 min-[375px]:p-4 transition-[border-color,background-color,box-shadow] sm:flex-col sm:items-stretch sm:gap-0 sm:p-5 has-[input:focus-visible]:ring-4 has-[input:focus-visible]:ring-[#0084FE]/25 ${
                checked ? "border-[#0084FE] bg-[#F3F9FF] shadow-[0_0_0_4px_rgba(0,132,254,0.08)]" : "border-[#E4E7EC] bg-white hover:border-[#9CC9FF]"
            }`}
        >
            <input type="radio" name={name} value={value} checked={checked} onChange={onSelect} className="sr-only" />

            {/* Radio indicator */}
            <span
                aria-hidden="true"
                className={`absolute right-3 top-3 sm:right-4 sm:top-4 flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors ${
                    checked ? "border-[#0084FE] bg-[#0084FE] text-white" : "border-[#C9D1DC] bg-white"
                }`}
            >
                {checked && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
            </span>

            <span
                className={`flex shrink-0 items-center justify-center rounded-xl w-18 h-20 min-[375px]:w-22 min-[375px]:h-24 sm:w-auto sm:h-40 ${checked ? "bg-white" : "bg-[#F5F8FC]"}`}
            >
                {visual}
            </span>

            <span className="min-w-0 pr-7 sm:pr-0 sm:mt-5">
                <span className="block text-base sm:text-lg font-semibold leading-snug">{title}</span>
                <span className="mt-1 block text-[13px] sm:text-sm leading-relaxed text-[#475467]">{description}</span>
            </span>
        </label>
    );
}
