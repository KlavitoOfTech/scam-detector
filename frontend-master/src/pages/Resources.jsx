import video from "../assets/trustscan.mp4";

import {
  BookOpen,
  Puzzle,
  Newspaper,
  ShieldCheck,
  ArrowRight
} from "lucide-react";

function Resources() {
  return (
    <section className="insights-section" id="resources">

      {/* LEFT SIDE */}
      <div className="insights-left">

        <span className="section-badge">
          Resources
        </span>

        <h2>
          Learn, Stay Updated & Stay Protected
        </h2>

        <div className="resource-list">

          <a href="/blog" className="resource-card">
            <div className="resource-info">
              <h3>
                <BookOpen size={18} className="resource-icon" />
                TrustScan Blog
              </h3>
              <p>Latest cybersecurity insights and guides.</p>
            </div>
            <ArrowRight size={22} />
          </a>

          <a href="/extension" className="resource-card">
            <div className="resource-info">
              <h3>
                <Puzzle size={18} className="resource-icon" />
                Browser Extension
              </h3>
              <p>Scan websites instantly while browsing.</p>
            </div>
            <ArrowRight size={22} />
          </a>

          <a href="/security-news" className="resource-card">
            <div className="resource-info">
              <h3>
                <Newspaper size={18} className="resource-icon" />
                Security News
              </h3>
              <p>Latest scam alerts and threat reports.</p>
            </div>
            <ArrowRight size={22} />
          </a>

          <a href="/ai-detection" className="resource-card">
            <div className="resource-info">
              <h3>
                <ShieldCheck
                  size={18}
                  className="resource-icon"
                />
                Join the Community
              </h3>

              <p>
                Join discussions, get updates, and help build a safer internet.
              </p>
            </div>

            <ArrowRight size={22} />
          </a>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="insights-right">

        <div className="video-preview">

          <video
            src={video}
            autoPlay
            muted
            loop
            playsInline
          />

          <div className="video-card card-left">
            <h4>Detect</h4>
            <p>Identify phishing threats</p>
          </div>

          <div className="video-card card-center">
            <h4>Analyze</h4>
            <p>Check links and messages</p>
          </div>

          <div className="video-card card-right">
            <h4>Protect</h4>
            <p>User safety and security</p>
          </div>
          <div className="preview-badge">
            Platform Preview
          </div>

        </div>

      </div>

    </section>
  );
}

export default Resources;