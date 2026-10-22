import { ChevronDown, LoaderCircle } from "lucide-react";

type SelectFieldProps = {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    placeholder: string;
    disabled?: boolean;
    loading?: boolean;
};

// Native <select> (keeps the phone's own picker) styled like the rest of the booking flow
export default function SelectField({ id, label, value, onChange, options, placeholder, disabled = false, loading = false }: SelectFieldProps) {
    const isDisabled = disabled || loading;

    return (
        <div>
            <label htmlFor={id} className={`block text-[15px] font-semibold ${isDisabled ? "text-[#98A2B3]" : ""}`}>
                {label}
            </label>
            <div className="relative mt-2">
                <select
                    id={id}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={isDisabled}
                    aria-busy={loading}
                    className={`w-full h-14 appearance-none rounded-lg border bg-white pl-4 pr-12 text-base outline-none transition-[border-color,box-shadow] focus:border-[#0084FE] focus:ring-4 focus:ring-[#0084FE]/10 disabled:cursor-not-allowed disabled:border-[#E4E7EC] disabled:bg-[#F5F6F8] ${
                        value ? "border-[#C9D1DC] text-[#00061A]" : "border-[#C9D1DC] text-[#667085]"
                    }`}
                >
                    <option value="" disabled>
                        {loading ? "Loading…" : placeholder}
                    </option>
                    {options.map((o) => (
                        <option key={o.value} value={o.value} className="text-[#00061A]">
                            {o.label}
                        </option>
                    ))}
                </select>
                <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                    {loading ? (
                        <LoaderCircle className="w-5 h-5 animate-spin text-[#0084FE]" />
                    ) : (
                        <ChevronDown className={`w-5 h-5 ${isDisabled ? "text-[#98A2B3]" : "text-[#0084FE]"}`} />
                    )}
                </span>
            </div>
        </div>
    );
}
