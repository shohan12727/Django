import Navbar from "@/components/navbar/page";
import Footer from "@/components/footer/page";
import BusinessOverview from "@/components/overview/page";
import FAQ from "@/components/faq/page";
import AboutPage from "@/components/misson_vision/page";
import TimelinePage from "@/components/timeline/page";
import BannerCarousel from "@/components/banner/page";

export default function Home() {
  return (
    <div>
      <Navbar />
      <BannerCarousel/>
      <BusinessOverview />
       <TimelinePage />
      <AboutPage />
      <FAQ />
      <Footer />
    </div>
  );
}
