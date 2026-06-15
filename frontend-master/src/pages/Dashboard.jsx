import { Link } from "react-router-dom";
import { useState } from "react";

import {
  Camera,
  Image,
  Clipboard,
  Link2,
  QrCode,
  Search,
  Home,
  UserCircle,
  Users,
  Menu,
  Clock3,
  ChevronRight
} from "lucide-react";

import "../styles/dashboard.css";

function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="dashboard">

      {/* TOP NAV */}

      <div className="dashboard-topbar">

        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu size={30} />
        </button>

        <div className="brand">
          <span className="shield">🛡️</span>

          <div>
            <h2>
              TRUST<span>SCAN</span>
            </h2>

            <p>
              Detect. Analyze. Stay Safe.
            </p>
          </div>
        </div>

        {/* Desktop Search */}

        <div className="search-box">
          <Search size={20} />

          <input
            type="text"
            placeholder="Search scans..."
          />
        </div>

        {/* Mobile Search */}

        <button className="mobile-search-btn">
          <Search size={22} />
        </button>

      </div>

      {/* SIDEBAR MENU */}

      {menuOpen && (
        <div className="sidebar-menu">

          <Link to="/">
            <Home size={28} />
            <span>Go to Home</span>
          </Link>

          <Link to="/login">
            <UserCircle size={28} />
            <span>Login / Signup</span>
          </Link>

          <Link to="/community">
            <Users size={28} />
            <span>Join Community</span>
          </Link>

        </div>
      )}

      {/* HERO */}

      <div className="dashboard-hero">

        <h1>
          Welcome to <span>TrustScan</span>
        </h1>

        <p>
          Scan. Analyze. Protect yourself from online scams.
        </p>

      </div>

      {/* CARDS */}

      <div className="scan-grid">

        <Link to="/camera-scan" className="scan-card blue">

          <div className="icon-circle">
            <Camera size={42} />
          </div>

          <h3>Camera Scan</h3>

          <p>
            Use your camera to scan suspicious content.
          </p>

          <div className="arrow-btn">
            <ChevronRight />
          </div>

        </Link>

        <Link to="/screenshot" className="scan-card green">

          <div className="icon-circle">
            <Image size={42} />
          </div>

          <h3>Screenshot Scan</h3>

          <p>
            Upload a screenshot to analyze for threats.
          </p>

          <div className="arrow-btn">
            <ChevronRight />
          </div>

        </Link>

        <Link to="/paste-text" className="scan-card purple">

          <div className="icon-circle">
            <Clipboard size={42} />
          </div>

          <h3>Paste Text</h3>

          <p>
            Paste suspicious text to check if it is a scam.
          </p>

          <div className="arrow-btn">
            <ChevronRight />
          </div>

        </Link>

        <Link to="/check-url" className="scan-card cyan">

          <div className="icon-circle">
            <Link2 size={42} />
          </div>

          <h3>Check URL</h3>

          <p>
            Verify suspicious website links safely.
          </p>

          <div className="arrow-btn">
            <ChevronRight />
          </div>

        </Link>

        <Link to="/qr-code" className="scan-card orange">

          <div className="icon-circle">
            <QrCode size={42} />
          </div>

          <h3>QR Code</h3>

          <p>
            Scan QR codes before opening links.
          </p>

          <div className="arrow-btn">
            <ChevronRight />
          </div>

        </Link>

        <Link to="/search-name" className="scan-card pink">

          <div className="icon-circle">
            <Search size={42} />
          </div>

          <h3>Search Name</h3>

          <p>
            Look up a company, charity or business.
          </p>

          <div className="arrow-btn">
            <ChevronRight />
          </div>

        </Link>

      </div>

      {/* RECENT SCANS */}

      <div className="recent-scans">

        <div className="recent-left">

          <div className="recent-icon">
            <Clock3 />
          </div>

          <div>
            <h3>Recent Scans</h3>
            <p>
              View your recent scans and analysis results.
            </p>
          </div>

        </div>

        <button className="view-btn">
          View All
        </button>

      </div>

    </div>
  );
}

export default Dashboard;