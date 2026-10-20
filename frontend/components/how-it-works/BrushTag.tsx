import type { ReactNode } from "react";

// Yellow brush-stroke label (e.g. "ITS EASY!") — jagged ends via clip-path
export default function BrushTag({ children }: { children: ReactNode }) {
    return (
        <span className="relative isolate inline-block px-7 py-1.5 text-lg sm:text-xl font-bold uppercase tracking-wide text-[#030403]">
            <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[#FED021] -rotate-2"
                style={{
                    clipPath:
                        "polygon(2% 10%, 50% 4%, 98% 0%, 100% 18%, 97% 38%, 100% 58%, 96% 80%, 99% 100%, 50% 96%, 3% 100%, 0% 78%, 3% 55%, 0% 32%)",
                }}
            />
            {children}
        </span>
    );
}
