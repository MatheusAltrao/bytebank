import Header from "@/components/header/header";
import HeroSection from "@/components/sections/hero-section";
import TransactionsList from "@/components/transactions/transactions-list";



export default function Home() {
  return (
    <div>
      <Header />
      <div className="w-full max-w-5xl p-2 mx-auto mt-10 space-y-8 " >
        <HeroSection />
        <TransactionsList />
      </div>
    </div>
  );
}
