import type { Service } from "@/lib/services";

export default function ServiceHighlights({ highlights }: { highlights: Service["highlights"] }) {
    return (
        <section className="w-full bg-white py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#00061A] text-center">
                    What&apos;s included
                </h2>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
                    {highlights.map(({ icon: Icon, title, description }) => (
                        <div
                            key={title}
                            className="flex flex-col items-center text-center bg-white border border-gray-100 rounded-xl px-6 py-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
                        >
                            <span className="flex items-center justify-center w-14 h-14 rounded-full bg-[#E3F2FD] text-[#0090FF]">
                                <Icon className="w-7 h-7" strokeWidth={1.75} />
                            </span>
                            <h3 className="mt-5 text-base font-bold text-gray-900">{title}</h3>
                            <p className="mt-2 max-w-[240px] text-sm leading-relaxed text-gray-600">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
