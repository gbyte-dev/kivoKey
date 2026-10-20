import Form from "next/form";
import { MapPin } from "lucide-react";

export default function ZipCodeForm() {
    return (
        // Submits to /quote?zip=12345 with client-side navigation.
        // Mobile: input and button stacked. sm+: button sits inside the bordered input (Figma style).
        <Form
            action="/quote"
            className="flex flex-col gap-3 sm:flex-row sm:gap-0 sm:rounded-lg sm:border sm:border-gray-200 sm:transition-colors sm:focus-within:border-[#0090FF] sm:focus-within:ring-2 sm:focus-within:ring-[#0090FF]/20 lg:h-[3.5cqw] lg:rounded-[0.5cqw]"
        >

            {/* ZIP Code Input */}
            <label className="flex flex-1 min-w-0 items-center gap-3 rounded-lg border border-gray-200 px-4 py-2.5 cursor-text max-sm:focus-within:border-[#0090FF] max-sm:focus-within:ring-2 max-sm:focus-within:ring-[#0090FF]/20 sm:border-0 lg:gap-[0.85cqw] lg:py-0 lg:pl-[0.75cqw] lg:pr-[0.5cqw]">
                <MapPin className="w-6 h-6 shrink-0 fill-[#009CFC] text-white lg:w-[1.9cqw] lg:h-[1.9cqw]" />
                <span className="flex flex-col min-w-0">
                    <span className="text-sm text-[#00061A] leading-tight whitespace-nowrap lg:text-[length:max(12px,1.1cqw)]">
                        Enter service ZIP code
                    </span>
                    <input
                        type="text"
                        name="zip"
                        inputMode="numeric"
                        autoComplete="postal-code"
                        pattern="[0-9]{5}"
                        maxLength={5}
                        required
                        placeholder="(e.g. 43215)"
                        title="Please enter a 5-digit ZIP code"
                        className="w-full bg-transparent text-sm text-[#00061A] placeholder:text-[#7B7F8E] outline-none lg:text-[length:max(11px,0.95cqw)]"
                    />
                </span>
            </label>

            {/* Yellow Action Button (sm+: -m-px so it overlaps the input border) */}
            <button
                type="submit"
                className="bg-[#FFE600] hover:bg-[#F2D800] text-[#00061A] font-bold px-6 py-3.5 rounded-lg text-[15px] shadow-sm transition-transform active:scale-95 whitespace-nowrap sm:-m-px lg:w-[16cqw] lg:shrink-0 lg:p-0 lg:rounded-[0.5cqw] lg:text-[length:max(12px,1.2cqw)]"
            >
                Get quote + schedule
            </button>

        </Form>
    );
}
