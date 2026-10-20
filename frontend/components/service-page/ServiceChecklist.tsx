import Link from "next/link";
import { CircleCheck } from "lucide-react";
import type { Service } from "@/lib/services";

// Checklist on the left, dark "book now" card on the right
export default function ServiceChecklist({ checklist }: { checklist: Service["checklist"] }) {
    return (
        <section className="w-full bg-white pb-16 sm:pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">

                <div className="rounded-2xl bg-[#F3F8FF] p-7 sm:p-10">
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#00061A]">
                        {checklist.title}
                    </h2>
                    <ul className="mt-6 space-y-4">
                        {checklist.items.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-base sm:text-lg text-[#33435C]">
                                <CircleCheck className="mt-0.5 w-6 h-6 shrink-0 text-[#0084FE]" strokeWidth={2} />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col justify-center rounded-2xl bg-[#121F29] p-7 sm:p-10 text-white">
                    <p className="text-sm font-bold uppercase tracking-wider text-[#FEE802]">Same day &amp; next day</p>
                    <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
                        We come right to you for free.
                    </h2>
                    <p className="mt-3 text-base text-white/80 leading-relaxed">
                        See your price online, pick a time that works, and a technician meets you at your vehicle.
                    </p>
                    <Link
                        href="/quote"
                        className="mt-7 inline-flex items-center justify-center self-start h-12 px-8 rounded-full bg-[#FEE802] hover:bg-[#F2DC00] text-[#02020E] text-base font-bold transition-colors active:scale-95"
                    >
                        Get quote + schedule
                    </Link>
                </div>

            </div>
        </section>
    );
}
