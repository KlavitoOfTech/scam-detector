import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

import CameraScan from "./components/CameraScan";
import Screenshot from "./components/Screenshot";
import PasteText from "./components/PasteText";
import CheckUrl from "./components/CheckUrl";
import QRCode from "./components/QRCode";
import SearchName from "./components/SearchName";

import "./styles/global.css";
import "./styles/navbar.css";
import "./styles/hero.css";
import "./styles/resources.css";
import "./styles/features.css";
import "./styles/about.css";
import "./styles/contact.css";
import "./styles/dashboard.css";
import "./styles/scrollbar.css";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Main Pages */}
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Dashboard Features */}
        <Route
          path="/camera-scan"
          element={<CameraScan />}
        />

        <Route
          path="/screenshot"
          element={<Screenshot />}
        />

        <Route
          path="/paste-text"
          element={<PasteText />}
        />

        <Route
          path="/check-url"
          element={<CheckUrl />}
        />

        <Route
          path="/qr-code"
          element={<QRCode />}
        />

        <Route
          path="/search-name"
          element={<SearchName />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;