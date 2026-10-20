import { Star } from "lucide-react";

type StarRatingProps = {
    rating: number; // 0-5, whole stars
};

export default function StarRating({ rating }: StarRatingProps) {
    return (
        <div className="flex justify-center gap-2 lg:gap-[0.77cqw]" role="img" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, i) => (
                <Star
                    key={i}
                    className={`w-7 h-7 lg:w-[1.8cqw] lg:h-[1.8cqw] ${i < rating ? "fill-[#F7B304] text-[#F7B304]" : "fill-gray-200 text-gray-200"}`}
                />
            ))}
        </div>
    );
}
