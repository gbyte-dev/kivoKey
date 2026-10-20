import type { ReactNode } from "react";

// Rough yellow marker scribble behind a word (e.g. "KivoKey" in the heading)
export default function BrushHighlight({ children }: { children: ReactNode }) {
    return (
        <span className="relative isolate inline-block px-[0.1em]">
            <span
                aria-hidden="true"
                className="absolute -left-[0.06em] -right-[0.18em] top-[0.06em] -bottom-[0.1em] -z-10 bg-[#FEE55D] -rotate-1"
                style={{
                    clipPath:
                        "polygon(0% 18%, 6% 8%, 14% 12%, 22% 4%, 35% 9%, 48% 2%, 62% 7%, 75% 0%, 88% 6%, 100% 3%, 97% 22%, 100% 40%, 96% 58%, 99% 78%, 95% 94%, 82% 100%, 68% 93%, 54% 99%, 40% 92%, 26% 98%, 12% 91%, 3% 97%, 0% 80%, 3% 60%, 0% 40%)",
                }}
            />
            {children}
        </span>
    );
}
