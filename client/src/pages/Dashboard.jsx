import { useEffect, useState } from "react";
import { getCandidates } from "../api/candidate.api";
import { removeToken } from "../utils/auth";
import CandidateCard from "../components/CandidateCard";
import CandidateForm from "../components/CandidateForm";
import SearchBar from "../components/SearchBar";
import MetricsCards from "../components/MetricsCards";
import "../styles/main.css";

function Dashboard() {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await getCandidates();
      setCandidates(res.data);
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      console.error("Failed to fetch candidates");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    removeToken();
    window.location.reload();
  };

  const filteredCandidates = candidates.filter((c) => {
    const query = searchTerm.toLowerCase();
    return (
      c.name.toLowerCase().includes(query) ||
      c.jobTitle.toLowerCase().includes(query) ||
      c.status.toLowerCase().includes(query)
    );
  });

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Referral Management System</h2>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <main className="dashboard-content">
        <MetricsCards refreshKey={refreshKey} />
        <CandidateForm onSuccess={fetchCandidates} />

        <h3>Candidates</h3>

        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        {loading ? (
          <p>Loading candidates...</p>
        ) : filteredCandidates.length === 0 ? (
          <p>No matching candidates found.</p>
        ) : (
          <div className="candidate-list">
            {filteredCandidates.map((candidate) => (
                <CandidateCard
                key={candidate._id}
                candidate={candidate}
                onStatusUpdate={fetchCandidates}
                />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
