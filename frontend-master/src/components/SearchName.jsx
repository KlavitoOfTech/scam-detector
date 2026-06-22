import { useState } from "react";
import "../styles/searchName.css";

function SearchName() {

  const API = process.env.REACT_APP_API_URL;

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSearch = async () => {

    if (!name.trim()) return;

    setLoading(true);

    try {
      console.log("API URL:", API);
      console.log("Request URL:", `${API}/search-org`);
      const response = await fetch(
        `${API}/search-org`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name
          })
        }
      );

      const data = await response.json();

      setResult(data);

    } catch (error) {

      console.error(error);

    }

    setLoading(false);
  };

  return (

    <section className="organization-search-page">

      <div className="organization-search-content">

        <h1>
          Search Charity <br />
          & Organization
        </h1>

        <p className="organization-search-content .search-subtitle">
          Verify charities, NGOs, companies and
          organizations before donating, investing,
          or sharing personal information.
        </p>

        <div className="organization-search-box">

          <input
            type="text"
            placeholder="Enter organization name..."
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <button
            onClick={handleSearch}
            className="organization-search-btn"
          >
            {loading
              ? "Searching..."
              : "Search"}
          </button>

        </div>

        {result && (

          <div className="result-card">

            <h2>
              {result.organization}
            </h2>

            <p>
              <strong>Website:</strong>{" "}
              {result.website}
            </p>

            <p>
              <strong>Risk:</strong>{" "}
              {result.risk}
            </p>

            {result.domain_created && (
              <p>
                <strong>Created:</strong>{" "}
                {result.domain_created}
              </p>
            )}

            {result.message && (
              <p>{result.message}</p>
            )}

          </div>

        )}

      </div>

    </section>
  );
}

export default SearchName;