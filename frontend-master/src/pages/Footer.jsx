import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-brand">
          <div className="footer-logo">
            🛡 TrustScan
          </div>

          <p>
            AI-powered scam detection system for messages,
            screenshots, and suspicious links.
          </p>
        </div>

        {/* LINKS */}
        <div className="footer-links">

          <div>
            <h4>Product</h4>
            <a href="/text-scan">Text Scan</a>
            <a href="/screenshot-scan">Screenshot Scan</a>
            <a href="/camera-scan">Camera Scan</a>
          </div>

          <div>
            <h4>Company</h4>
            <a href="/about">About</a>
            <a href="/security">Security</a>
            <a href="/privacy">Privacy</a>
          </div>

          <div>
            <h4>Support</h4>
            <a href="/help">Help Center</a>
            <a href="/contact">Contact</a>
            <a href="/report-scam">Report Scam</a>
          </div>

        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} TrustScan. All rights reserved.</p>
        <p className="footer-tag">
          Built with ❤️ by the TrustScan Team
        </p>
      </div>

    </footer>
  );
}

export default Footer;