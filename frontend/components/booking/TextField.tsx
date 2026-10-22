import type { InputHTMLAttributes, ReactNode } from "react";

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
    id: string;
    label: string;
    error?: string;
    optional?: boolean;
    icon?: ReactNode; // shown inside the field on the left
};

export const fieldClass = (hasError: boolean, withIcon = false) =>
    `w-full h-12 rounded-lg border bg-white ${withIcon ? "pl-11" : "pl-4"} pr-4 text-base outline-none transition-[border-color,box-shadow] placeholder:text-[#98A2B3] focus:ring-4 ${
        hasError ? "border-[#D92D20] focus:border-[#D92D20] focus:ring-[#D92D20]/10" : "border-[#C9D1DC] focus:border-[#0084FE] focus:ring-[#0084FE]/10"
    }`;

// Labelled input with an inline error message, styled like the rest of the booking flow
export default function TextField({ id, label, error, optional = false, icon, className = "", ...input }: TextFieldProps) {
    return (
        <div className={className}>
            <label htmlFor={id} className="block text-sm font-semibold">
                {label}
                {optional && <span className="font-normal text-[#98A2B3]"> (optional)</span>}
            </label>
            <div className="relative mt-1.5">
                {icon && <span aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#0084FE]">{icon}</span>}
                <input
                    id={id}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? `${id}-error` : undefined}
                    className={fieldClass(Boolean(error), Boolean(icon))}
                    {...input}
                />
            </div>
            {error && (
                <p id={`${id}-error`} className="mt-1.5 text-[13px] text-[#D92D20]">
                    {error}
                </p>
            )}
        </div>
    );
}
