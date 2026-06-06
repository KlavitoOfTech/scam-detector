function About() {
  return (
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
          TrustScan combines AI, machine learning,
          and threat intelligence to detect scams
          before they cause harm.
        </p>

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
  );
}

export default About;