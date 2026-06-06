import {
  Shield,
  ArrowRight,
  LayoutDashboard
} from "lucide-react";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <p className="mini-title">
          <Shield size={16} />
          Safer browsing starts here.
        </p>

        <h1>
          Built for trust in a digital world.
        </h1>

        <p className="hero-subtitle">
          Detect phishing links, fake giveaways,
          suspicious messages, malicious websites,
          scam emails, impersonation attacks instantly.
        </p>

        <div className="hero-buttons">

          <button
            className="hero-btn"
            onClick={() => window.location.href="/signup"}
          >
            Get Started
            <ArrowRight size={20} />
          </button>

          <button
            className="secondary-btn"
            onClick={() => window.location.href="/login"}
          >
            Open Dashboard
            <LayoutDashboard size={20} />
          </button>

        </div>

      </div>

    </section>
  );
}

export default Hero;