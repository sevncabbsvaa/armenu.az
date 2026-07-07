import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import IngredientReveal from "@/components/sections/IngredientReveal";
import HowItWorks from "@/components/sections/HowItWorks";
import ArPreview from "@/components/sections/ArPreview";
import AiWaiter from "@/components/sections/AiWaiter";
import Analytics from "@/components/sections/Analytics";
import Manifesto from "@/components/sections/Manifesto";
import Cta from "@/components/sections/Cta";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <IngredientReveal />
        <HowItWorks />
        <ArPreview />
        <AiWaiter />
        <Analytics />
        <Manifesto />
        <Cta />
      </main>
    </>
  );
}
