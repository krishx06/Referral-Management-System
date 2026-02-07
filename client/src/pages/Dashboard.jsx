import { useEffect, useState } from "react";
import { getCandidates } from "../api/candidate.api";
import { removeToken } from "../utils/auth";
import CandidateCard from "../components/CandidateCard";
import CandidateForm from "../components/CandidateForm";
import MetricsCards from "../components/MetricsCards";
import "../styles/main.css";

function Dashboard() {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState("dashboard");

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
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-text">Referral Management</span>
        </div>

        <nav className="sidebar-nav">
          <p className="nav-label">MENU</p>
          <button
            className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            <span></span> Dashboard
          </button>
          <button
            className={`nav-item ${activeTab === "add" ? "active" : ""}`}
            onClick={() => setActiveTab("add")}
          >
            <span></span> Add Referral
          </button>
        </nav>

        <button className="sidebar-logout" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <h1>
            {activeTab === "dashboard" ? "Overview" : "Add New Referral"}
          </h1>
          {activeTab === "dashboard" && (
            <div className="header-search">
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
        </header>

        <div className="main-body">
          {activeTab === "dashboard" ? (
            <>
              <section className="stats-section">
                
                <h2>Your Referral Stats</h2>
                <MetricsCards refreshKey={refreshKey} />
              </section>

              <section className="candidates-section">
                <h3>All Candidates</h3>
                {loading ? (
                  <p className="loading-text">Loading candidates...</p>
                ) : filteredCandidates.length === 0 ? (
                  <p className="empty-text">No candidates found.</p>
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
              </section>
            </>
          ) : (
            <section className="form-section">
              <CandidateForm onSuccess={() => {
                fetchCandidates();
                setActiveTab("dashboard");
              }} />
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
