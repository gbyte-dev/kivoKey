import HeroHeading from "./HeroHeading";
import ZipCodeForm from "./ZipCodeForm";

export default function HeroCard() {
    return (
        // lg+: sizes are in cqw (% of hero width) to match the Figma card at every screen size
        <div className="w-full max-w-[560px] bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:absolute lg:left-[3.9%] lg:top-[20.2%] lg:w-[37.5%] lg:max-w-none lg:min-h-[57.4%] lg:rounded-[1cqw] lg:pt-[1.15cqw] lg:pr-[1.9cqw] lg:pb-[1cqw] lg:pl-[2.95cqw] lg:shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
            <HeroHeading />

            <p className="mt-3 text-base sm:text-lg text-[#00061A] leading-relaxed lg:mt-[0.45cqw] lg:text-[length:1.45cqw] lg:leading-[1.31]">
                Home. Work. Wherever. Our car key experts will come to you for{" "}
                <strong className="font-bold">free.</strong>
            </p>

            <div className="mt-5 lg:mt-[1.4cqw]">
                <ZipCodeForm />
            </div>
        </div>
    );
}
