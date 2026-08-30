import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Advantages from "@/components/Advantages";
import Masters from "@/components/Masters";
import FirstVisit from "@/components/FirstVisit";
import Reviews from "@/components/Reviews";
import Gift from "@/components/Gift";
import FAQ from "@/components/FAQ";
import Contacts from "@/components/Contacts";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { SelectionProvider } from "@/components/SelectionContext";
import { SelectionBar } from "@/components/SelectionBar";

export default function Home() {
  return (
    <SelectionProvider>
      <Header />
      <div className="relative overflow-hidden">
        {/* Continuous ambient glow — keeps sections blending with no hard seams */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute left-[10%] top-[8%] h-[60vh] w-[70vw] rounded-full opacity-70"
            style={{
              background:
                "radial-gradient(closest-side, rgba(211,172,87,0.14), transparent)",
            }}
          />
          <div
            className="absolute right-[-10%] top-[26%] h-[58vh] w-[65vw] rounded-full opacity-65"
            style={{
              background:
                "radial-gradient(closest-side, rgba(169,127,47,0.15), transparent)",
            }}
          />
          <div
            className="absolute left-[-10%] top-[46%] h-[55vh] w-[65vw] rounded-full opacity-60"
            style={{
              background:
                "radial-gradient(closest-side, rgba(211,172,87,0.12), transparent)",
            }}
          />
          <div
            className="absolute right-[-5%] top-[66%] h-[55vh] w-[65vw] rounded-full opacity-60"
            style={{
              background:
                "radial-gradient(closest-side, rgba(169,127,47,0.13), transparent)",
            }}
          />
          <div
            className="absolute left-[5%] top-[86%] h-[55vh] w-[70vw] rounded-full opacity-55"
            style={{
              background:
                "radial-gradient(closest-side, rgba(211,172,87,0.12), transparent)",
            }}
          />
        </div>

        <main>
          <Hero />
          <About />
          <Services />
          <Advantages />
          <Masters />
          <FirstVisit />
          <Reviews />
          <Gift />
          <FAQ />
          <Contacts />
          <BookingForm />
        </main>
      </div>
      <Footer />
      <FloatingActions />
      <SelectionBar />
    </SelectionProvider>
  );
}
