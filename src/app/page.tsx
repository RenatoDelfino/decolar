import Image from "next/image";
import Hero from "./containers/home/Hero";
import About from "./containers/home/About";
import Tickets from "./components/Tickets";
import Footer from "./components/layout/Footer";

export default function Home() {
  return (
    <>
      <Tickets />
      <Hero />
      <About />
    </>
  );
}
