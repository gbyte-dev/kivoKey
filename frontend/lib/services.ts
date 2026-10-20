import type { LucideIcon } from "lucide-react";
import { Car, Copy, Cpu, KeyRound, MapPin, ReceiptText, ShieldCheck, Wrench } from "lucide-react";
import { serviceHref, serviceLinks, type ServiceSlug } from "./service-links";

export type ServiceContent = {
    metaDescription: string;
    tagline: string;
    intro: string;
    summary: string; // short text for service cards
    image: { src: string; width: number; height: number; alt: string };
    highlights: { icon: LucideIcon; title: string; description: string }[];
    checklist: { title: string; items: string[] };
    faqs: { question: string; answer: string }[];
};

export type Service = ServiceContent & {
    slug: ServiceSlug;
    title: string;
    href: string;
};

// Page content for each service (Record<ServiceSlug, ...> makes TypeScript require every slug)
const content: Record<ServiceSlug, ServiceContent> = {
    "car-key-replacement": {
        metaDescription:
            "Mobile car key replacement in Columbus, OH. We cut and program new keys, remotes, and smart fobs at your home, work, or roadside location.",
        tagline: "A new key, cut and programmed wherever you are.",
        intro:
            "Broken, worn out, or just stopped working? Our mobile technicians come to your home, work, or roadside location to cut and program a replacement key on the spot. No tow and no dealership visit.",
        summary: "Broken, worn, or faulty key? We cut and program a new key, remote, or smart fob at your vehicle.",
        image: {
            src: "/images/step-1-vehicle.jpg",
            width: 936,
            height: 412,
            alt: "Two car key fobs held up in front of a parked sedan",
        },
        highlights: [
            { icon: KeyRound, title: "On-site key cutting", description: "Standard, high-security, and laser-cut keys cut right at your vehicle." },
            { icon: Cpu, title: "Chip & fob programming", description: "Transponder keys, remotes, and push-to-start fobs programmed to your car before we leave." },
            { icon: Wrench, title: "Shell & button fixes", description: "Cracked case or worn-out buttons? We can replace the shell or the whole key." },
            { icon: ReceiptText, title: "Upfront quote", description: "Enter your vehicle details to see your price before you book." },
        ],
        checklist: {
            title: "When to call us",
            items: [
                "Your key is broken, bent, or snapped",
                "Remote buttons have stopped working",
                "Your key is worn and no longer turns smoothly",
                "Your car doesn't recognize the key and won't start",
            ],
        },
        faqs: [
            {
                question: "Do I need to tow my car to a dealership?",
                answer: "No. We come to your vehicle and cut and program the new key right there.",
            },
            {
                question: "Can you replace smart keys and push-to-start fobs?",
                answer: "Yes, for many makes and models, including transponder keys, remote head keys, and proximity fobs. Enter your vehicle details when you request a quote and we'll confirm we can service your car.",
            },
            {
                question: "How long does a replacement take?",
                answer: "Most replacements are finished in a single visit. Your technician will give you a time estimate when they arrive.",
            },
            {
                question: "What happens to my old key?",
                answer: "If it still works, we can keep it programmed alongside the new one. If it was lost or stolen, we can usually remove it from your car's memory so it can no longer start the vehicle.",
            },
        ],
    },

    "spare-car-keys": {
        metaDescription:
            "Get a spare car key or fob cut and programmed at your home or office in Columbus, OH. Mobile spare key service from KivoKey.",
        tagline: "Get a spare before you need one.",
        intro:
            "A spare key is the easiest way to avoid a lockout or a stranded afternoon. We'll cut and program an extra key or fob for your vehicle at your home or office, on your schedule.",
        summary: "Add an extra key or fob for your vehicle, cut and programmed at your home or office.",
        image: {
            src: "/images/testimonial-bg-mobile.jpg",
            width: 1728,
            height: 1187,
            alt: "Smiling driver holding up a car key fob next to his SUV",
        },
        highlights: [
            { icon: Copy, title: "Extra keys & fobs", description: "Add a spare key, remote, or smart fob that works just like your original." },
            { icon: Cpu, title: "Programmed to your car", description: "Every spare is programmed and tested on your vehicle before we leave." },
            { icon: MapPin, title: "Done where you are", description: "We come to your driveway, office parking lot, or wherever your car is parked." },
            { icon: ReceiptText, title: "Upfront quote", description: "Enter your vehicle details to see your price before you book." },
        ],
        checklist: {
            title: "When a spare makes sense",
            items: [
                "You only have one working key",
                "Someone new in your household needs their own key",
                "Your used car came with a single key",
                "You want a backup before a long trip",
            ],
        },
        faqs: [
            {
                question: "Do I need my existing key?",
                answer: "It helps. With a working key, adding a spare is usually quicker. If you don't have any working keys, our All Keys Lost service is the right fit.",
            },
            {
                question: "Will the spare work like my original key?",
                answer: "Yes. Your spare is cut to match your vehicle and programmed to lock, unlock, and start it just like your original.",
            },
            {
                question: "Can you make a spare for a push-to-start car?",
                answer: "Yes, for many makes and models. Enter your vehicle details when you request a quote and we'll confirm we can service your car.",
            },
            {
                question: "How many spares can I add?",
                answer: "Most vehicles can store several keys. Your technician can tell you how many your car supports.",
            },
        ],
    },

    "all-keys-lost": {
        metaDescription:
            "Lost every car key? KivoKey creates and programs a brand-new key at your vehicle in Columbus, OH. No tow or dealership needed.",
        tagline: "Lost every key? We'll get you back on the road.",
        intro:
            "When there's no working key left, you don't need a tow to the dealer. We come to your vehicle, create a new key from scratch, and program it so your car starts again.",
        summary: "No keys at all? We create and program a brand-new key at your vehicle, no tow needed.",
        image: {
            src: "/images/step-2-quote.jpg",
            width: 881,
            height: 412,
            alt: "KivoKey technician programming a key with a diagnostic tablet inside a customer's car",
        },
        highlights: [
            { icon: KeyRound, title: "No key needed", description: "We create a new key from scratch, without an existing one to copy." },
            { icon: ShieldCheck, title: "Lost keys disabled", description: "Where your vehicle supports it, missing keys are erased so they can't start your car." },
            { icon: Car, title: "No tow required", description: "We work at your vehicle, wherever it's parked." },
            { icon: ReceiptText, title: "Upfront quote", description: "Enter your vehicle details to see your price before you book." },
        ],
        checklist: {
            title: "What to have ready",
            items: [
                "A valid photo ID",
                "Proof of ownership, like your registration or title",
                "Your vehicle's make, model, and year",
                "Where the vehicle is parked (and the VIN, if you have it)",
            ],
        },
        faqs: [
            {
                question: "Can you make a key if I've lost all of them?",
                answer: "Yes. That's exactly what this service is for. We create a new key for your vehicle without needing an existing one.",
            },
            {
                question: "Why do you need proof of ownership?",
                answer: "To protect you and your car, we confirm that the person requesting a key is authorized to have one before we make it.",
            },
            {
                question: "What if my keys were stolen?",
                answer: "We'll program new keys and, where your vehicle supports it, remove the stolen keys from its memory so they no longer start the car.",
            },
            {
                question: "Is there a charge for coming to me?",
                answer: "No. We come right to you for free, wherever your car is parked.",
            },
        ],
    },
};

export const services: Service[] = serviceLinks.map((link) => ({
    ...link,
    href: serviceHref(link.slug),
    ...content[link.slug],
}));

export function getService(slug: string): Service | undefined {
    return services.find((service) => service.slug === slug);
}
