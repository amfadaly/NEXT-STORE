import Image from "next/image";
import Hero from "./src/components/Hero";
import Products from "./src/components/Products";

export default function Home() {
  return (
    <main className="main-container">
      <Hero />
      <Products />
    </main>
  );
}
