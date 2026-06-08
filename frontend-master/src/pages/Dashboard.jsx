import { Link } from "react-router-dom";
import {
  Camera,
  Image,
  Link2,
  Clipboard,
  QrCode,
  Search
} from "lucide-react";

import "../styles/dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">

      <h1 className="dashboard-title">
        Scan
      </h1>

      <div className="dashboard-banner">
        <h2>What looks suspicious?</h2>
        <p>
          Scan texts, emails, screenshots, links,
          charities and more.
        </p>
      </div>

      <div className="scan-grid">

        <Link to="/camera-scan" className="scan-card">
          <Camera size={32} />
          <h3>Camera Scan</h3>
          <p>Scan documents & logos</p>
        </Link>

        <Link to="/screenshot" className="scan-card">
          <Image size={32} />
          <h3>Screenshot</h3>
          <p>Analyze a screenshot</p>
        </Link>

        <Link to="/paste-text" className="scan-card">
          <Clipboard size={32} />
          <h3>Paste Text</h3>
          <p>Paste a message or email</p>
        </Link>

        <Link to="/check-url" className="scan-card">
          <Link2 size={32} />
          <h3>Check URL</h3>
          <p>Verify a suspicious link</p>
        </Link>

        <Link to="/qr-code" className="scan-card">
          <QrCode size={32} />
          <h3>QR Code</h3>
          <p>Scan a QR code safely</p>
        </Link>

        <Link to="/search-name" className="scan-card">
          <Search size={32} />
          <h3>Search Name</h3>
          <p>Look up a charity or company</p>
        </Link>

      </div>

    </div>
  );
}

export default Dashboard;