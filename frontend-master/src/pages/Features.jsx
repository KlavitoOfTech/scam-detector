import logo1 from "../assets/dashboard.png";
import logo2 from "../assets/scanner.png";

import {
  AlertTriangle,
  Globe,
  Puzzle,
  Zap,
  Lock
} from "lucide-react";

function Features() {
  return (
    <section
      className="features"
      id="features"
    >

      <h2 className="mini-title">
        <Lock size={38}/>
        Why TrustScan?
      </h2>

      <section className="feature-showcase">

        <div className="showcase-row">

          <div className="showcase-image">
            <img src={logo1} alt="Dashboard"/>
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
            <img src={logo2} alt="URL Scanner"/>
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
  );
}

export default Features;