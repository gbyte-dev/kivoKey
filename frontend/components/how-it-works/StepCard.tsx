import Image from "next/image";

type StepCardProps = {
    step: number;
    image: string;
    title: string;
    description: string;
};

export default function StepCard({ step, image, title, description }: StepCardProps) {
    return (
        <article className="flex flex-col w-full overflow-hidden rounded-2xl bg-[#121F29] shadow-lg">

            {/* Photo, fading into the dark panel at the bottom */}
            <div className="relative aspect-936/412">
                <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 576px, 100vw"
                    className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-b from-transparent to-[#121F29]" />
            </div>

            {/* Number badge + title on one row, description under the title */}
            <div className="relative -mt-3 flex-1 grid grid-cols-[auto_1fr] items-center gap-x-4 px-5 pb-6 lg:gap-x-5 lg:px-6">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#0084FE] text-white text-2xl font-bold lg:w-14 lg:h-14 lg:text-3xl">
                    {step}
                </span>
                <h3 className="text-lg font-bold text-white leading-snug xl:text-2xl">
                    {title}
                </h3>
                <p className="col-start-2 mt-1 text-sm text-white/85 leading-relaxed lg:text-base">
                    {description}
                </p>
            </div>

        </article>
    );
}
