export default function HeroHeading() {
    return (
        <h1 className="text-[34px] sm:text-5xl font-extrabold leading-[1.1] tracking-tight text-[#00061A] lg:text-[length:3.5cqw] lg:leading-[1.05] lg:whitespace-nowrap">
            We come right
            <br />
            to you for{" "}
            {/* Yellow marker highlight behind "free." (isolate keeps it above the card background) */}
            <span className="relative isolate inline-block text-[#008BFF]">
                <span
                    aria-hidden="true"
                    className="absolute -left-[0.25em] -right-[0.3em] top-[0.08em] bottom-[0.07em] -z-10 rounded-[0.25em] bg-[#FEED4F] -rotate-1"
                />
                free.
            </span>
        </h1>
    );
}
