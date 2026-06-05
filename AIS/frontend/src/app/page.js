import Navbar from "@/components/navbar/page";
import Footer from "@/components/footer/page";
import BusinessOverview from "@/components/overview/page";
import FAQ from "@/components/faq/page";
import AboutPage from "@/components/misson_vision/page";

export default function Home() {
  return (
    <div>
      <Navbar />
      <BusinessOverview />
      <AboutPage/>
      <FAQ />
      <Footer />
    </div>
  );
}
