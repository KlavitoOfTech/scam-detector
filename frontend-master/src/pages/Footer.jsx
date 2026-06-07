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
            <a href="#">Text Scan</a>
            <a href="#">Screenshot Scan</a>
            <a href="#">Camera Scan</a>
          </div>

          <div>
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Security</a>
            <a href="#">Privacy</a>
          </div>

          <div>
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">Contact</a>
            <a href="#">Report Scam</a>
          </div>

        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} TrustScan. All rights reserved.</p>
        <p className="footer-tag">
          Built with AI Security Intelligence
        </p>
      </div>

    </footer>
  );
}

export default Footer;