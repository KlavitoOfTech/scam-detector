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
              <h3>
                <BookOpen size={18} className="resource-icon" />
                TrustScan Blog
              </h3>
              <p>Latest cybersecurity insights and guides.</p>
            </div>
            <ArrowRight size={22} />
          </a>

          <a href="#" className="resource-card">
            <div className="resource-info">
              <h3>
                <Puzzle size={18} className="resource-icon" />
                Browser Extension
              </h3>
              <p>Scan websites instantly while browsing.</p>
            </div>
            <ArrowRight size={22} />
          </a>

          <a href="#" className="resource-card">
            <div className="resource-info">
              <h3>
                <Newspaper size={18} className="resource-icon" />
                Security News
              </h3>
              <p>Latest scam alerts and threat reports.</p>
            </div>
            <ArrowRight size={22} />
          </a>

          <a href="#" className="resource-card">
            <div className="resource-info">
              <h3>
                <ShieldCheck size={18} className="resource-icon" />
                AI Scam Detection
              </h3>
              <p>See how our AI identifies threats.</p>
            </div>
            <ArrowRight size={22} />
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

          <div className="video-card card-left">
            <h4>Verify</h4>
            <p>KYC and risk checks</p>
          </div>

          <div className="video-card card-center">
            <h4>Approve</h4>
            <p>User consent workflow</p>
          </div>

          <div className="video-card card-right">
            <h4>Prove</h4>
            <p>Audit history records</p>
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