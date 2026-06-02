import "../App.css";
import logo from "../assets/trustscan.png";
import logo1 from "../assets/dashboard.png";
import logo2 from "../assets/scanner.png";
import video from "../assets/trustscan.mp4";
import {
  Shield,
  AlertTriangle,
  Globe,
  Puzzle,
  Zap,
  LogIn,
  Lock,
  ArrowRight,
  LayoutDashboard,
  Mail,
  MessageCircle,
  X,
  Send
} from "lucide-react";

function Home() {

  return (

    <div className="home-page">

      {/* NAVBAR */}

      <nav className="navbar">

        <div className="logo">
          <img
            src={logo}
            alt="TrustScan Logo"
            className="logo-img"
           /> TrustScan
        </div>

        <div className="nav-links">

          <a href="/">Home</a>

          <a href="#features">Features</a>

          <a href="#about">About</a>

          <a href="#contact">Contact</a>

          <button
            className="nav-btn"
            onClick={() =>
              window.location.href = "/login"
            }
          >
            <LogIn size={18} />
            Login
          </button>

        </div>

      </nav>

      {/* HERO SECTION */}

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
              scam emails, impersonation attacks instantly with intelligent real-time protection
              built for modern internet users.
          </p>

          <div className="hero-buttons">

            <button
                className="hero-btn"
                onClick={() =>
                window.location.href =
                "/signup"
                }
            >
                Get Started
                <ArrowRight size={20} />
            </button>

            <button
                className="secondary-btn"
                onClick={() =>
                window.location.href =
                "/login"
                }
            >
                Open Dashboard
                <LayoutDashboard size={20} />
            </button>
          </div>

        </div>

      </section>

      <section className="insights-section">
        {/* LEFT SIDE - 40% */}
        <div className="insights-left">

          <span className="section-badge">
            Resources
          </span>

          <h2>
            Learn, Stay Updated & Stay Protected
          </h2>

          <div className="resource-list">

            <a href="#" className="resource-card">
              <div className="resource-info">
                <h3>TrustScan Blog</h3>
                <p>Latest cybersecurity insights and guides.</p>
              </div>
              <ArrowRight className="resource-arrow" size={22} />
            </a>

            <a href="#" className="resource-card">
              <div className="resource-info">
                <h3>Browser Extension</h3>
                <p>Scan websites instantly while browsing.</p>
              </div>
              <ArrowRight className="resource-arrow" size={22} />
            </a>

            <a href="#" className="resource-card">
              <div className="resource-info">
                <h3>Security News</h3>
                <p>Breaking scam alerts and threat reports.</p>
              </div>
              <ArrowRight className="resource-arrow" size={22} />
            </a>

            <a href="#" className="resource-card">
              <div className="resource-info">
                <h3>AI Scam Detection</h3>
                <p>Discover how our AI identifies threats.</p>
              </div>
              <ArrowRight className="resource-arrow" size={22} />
            </a>

          </div>

        </div>

        {/* RIGHT SIDE - 60% */}
        <div className="insights-right">

          <div className="video-preview">

            <video
              src={video}
              autoPlay
              muted
              loop
              playsInline
            />

            {/* floating cards like screenshot */}
            <div className="video-card card-left">
              <h4>Verify</h4>
              <p>KYC, documents, and risk checks</p>
            </div>

            <div className="video-card card-center">
              <h4>Approve</h4>
              <p>User consent before data disclosure</p>
            </div>

            <div className="video-card card-right">
              <h4>Prove</h4>
              <p>Reusable proof with audit history</p>
            </div>

            <div className="preview-badge">
              Platform Preview
            </div>

          </div>

        </div>

      </section>


      {/* FEATURES */}

        <section
          className="features"
          id="features"
        >

          <h2 className="mini-title">
            <Lock size={38} />
            Why TrustScan?
          </h2>

          <section className="feature-showcase">

          <div className="showcase-row">

            <div className="showcase-image">
              <img
                src={logo1}
                alt="TrustScan Dashboard"
              />
            </div>

            <div className="showcase-content">

              <span className="feature-badge">
                AI Protection
              </span>

              <h2>
                Detect scams before they cause damage
              </h2>

              <p>
                TrustScan uses machine learning to analyze
                suspicious messages, emails, and links in
                seconds, helping users identify scams before
                they become victims.
              </p>

              <ul>
                <li>Real-time scam detection</li>
                <li>Advanced phishing analysis</li>
                <li>Instant risk scoring</li>
              </ul>

            </div>

          </div>

          <div className="showcase-row reverse">

            <div className="showcase-image">
              <img
                src={logo2}
                alt="URL Scanner"
              />
            </div>

            <div className="showcase-content">

              <span className="feature-badge">
                URL Scanner
              </span>

              <h2>
                Stay safe while browsing online
              </h2>

              <p>
                Scan suspicious websites before visiting
                them. TrustScan identifies phishing pages,
                fake login portals, and dangerous domains.
              </p>

              <ul>
                <li>Detect fake websites</li>
                <li>Check domain reputation</li>
                <li>Prevent credential theft</li>
              </ul>

            </div>

          </div>

        </section>

        <div className="feature-grid">

          <div className="feature-card">

            <div className="feature-icon">
              <AlertTriangle size={34} />
            </div>

            <h3>Scam Detection</h3>

            <p>
              Analyze suspicious messages
              instantly using AI.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              <Globe size={34} />
            </div>

            <h3>URL Scanner</h3>

            <p>
              Detect dangerous phishing
              websites before opening them.
            </p>

          </div>

          <div className="feature-card">
            
            <div className="feature-icon">
              <Puzzle size={34} />
            </div>


            <h3>Browser Extension</h3>

            <p>
              Real-time protection directly
              inside your browser.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              <Zap size={34} />
            </div>

            <h3>Fast AI Analysis</h3>

            <p>
              Machine learning powered scam
              classification system.
            </p>

          </div>

        </div>

      </section>

      {/* ABOUT */}
      <section
        className="about-section"
        id="about"
      >
        <div className="about-card">

          <span className="about-badge">
            AI-Powered Cybersecurity
          </span>

          <h2>
            Protecting Users With Next-Generation AI
          </h2>

          <p className="about-description">
            TrustScan combines advanced Artificial Intelligence,
            machine learning, and threat intelligence to detect
            scams, phishing attempts, fake websites, and malicious
            messages before they cause harm.
          </p>

          <div className="about-grid">

             <div className="about-slider">

                <div className="about-track">

                  <div className="about-feature">
                    <h3>AI Detection</h3>
                    <p>
                      Instantly analyzes suspicious messages,
                      links, and websites.
                    </p>
                  </div>

                  <div className="about-feature">
                    <h3>Real-Time Analysis</h3>
                    <p>
                      Receive immediate risk assessments and
                      security recommendations.
                    </p>
                  </div>

                  <div className="about-feature">
                    <h3>Threat Intelligence</h3>
                    <p>
                      Continuously learns from emerging threats.
                    </p>
                  </div>

                  {/* Duplicate cards for seamless looping */}

                  <div className="about-feature">
                    <h3>AI Detection</h3>
                    <p>
                      Instantly analyzes suspicious messages,
                      links, and websites.
                    </p>
                  </div>

                  <div className="about-feature">
                    <h3>Real-Time Analysis</h3>
                    <p>
                      Receive immediate risk assessments and
                      security recommendations.
                    </p>
                  </div>

                  <div className="about-feature">
                    <h3>Threat Intelligence</h3>
                    <p>
                      Continuously learns from emerging threats.
                    </p>
                  </div>

                </div>

              </div>

          </div>

          <div className="about-stats">

            <div className="stat">
              <h3>24/7</h3>
              <span>AI Monitoring</span>
            </div>

            <div className="stat">
              <h3>Instant</h3>
              <span>Threat Detection</span>
            </div>

            <div className="stat">
              <h3>AI</h3>
              <span>Powered Security</span>
            </div>

          </div>

        </div>
      </section>
      {/* CONTACT */}
      <section className="contact-section" id="contact">

        <div className="contact-card">

          <span className="contact-badge">
            Get in Touch
          </span>

          <h2>Contact Our Team</h2>

          <p className="contact-subtext">
            Reach out for support, partnerships, or security inquiries.
          </p>

          <div className="contact-grid">

            <a href="mailto:trustscan@email.com" className="contact-item">
              <Mail size={32} />
              Email
              <span>trustscan@email.com</span>
            </a>

            <a href="https://wa.me/234XXXXXXXXXX" className="contact-item">
              <MessageCircle size={32} />
              WhatsApp
              <span>Chat with us instantly</span>
            </a>

            <a href="https://x.com/yourhandle" className="contact-item">
              <X size={32} />
              X (Twitter)
              <span>@trustscan</span>
            </a>

            <a href="https://t.me/yourchannel" className="contact-item">
              <Send size={32} />
              Telegram
              <span>Join updates & alerts</span>
            </a>

          </div>
        </div>
      </section>

    </div>

  );

}

export default Home;