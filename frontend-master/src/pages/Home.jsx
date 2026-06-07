import "../App.css";

import Navbar from "./Navbar";
import Hero from "./Hero";
import Resources from "./Resources";
import Features from "./Features";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";

function Home() {
  return (
    <div className="home-page">

      <Navbar />

      <Hero />

      <Resources />

      <Features />

      <About />

      <Contact />

      <Footer />

    </div>
  );
}

export default Home;