export const metadata = {
  title: "Style time",
  description: "Page description",
};

import Hero from "@/components/hero";
import Features from "@/components/features";
import FeaturesBlocks from "@/components/features-blocks";
import Testimonials from "@/components/testimonials";
import Newsletter from "@/components/newsletter";
import Header from "@/components/ui/header";
import Banner from "@/components/banner";
import Pricing from "@/components/pricing";

export default function Start() {
  return (
    <div className={`antialiased bg-white text-gray-900 tracking-tight`}>
      <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
        <Header />
        <Hero />
        <FeaturesBlocks />
        <Pricing />
        {/* <Testimonials /> */}
        <Newsletter />
        {/* <Banner /> */}
        {/* <Features /> */}
      </div>
    </div>
  );
}
