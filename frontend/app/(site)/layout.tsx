import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Header and footer shared by the marketing pages (home, services, locations)
export default function SiteLayout({ children }: LayoutProps<"/">) {
    return (
        <>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </>
    );
}
