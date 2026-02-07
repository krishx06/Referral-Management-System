import { useEffect, useState } from "react";
import { getMetrics } from "../api/candidate.api";

function MetricsCards({ refreshKey }) {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, [refreshKey]);

  const fetchMetrics = async () => {
    try {
      const res = await getMetrics();
      setMetrics(res.metrics);
    } catch (err) {
      console.error("Failed to fetch metrics", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading metrics...</p>;
  if (!metrics) return null;

  return (
    <div className="metrics-container">
      <div className="metric-card">
        <h4>Total Referrals</h4>
        <p>{metrics.totalCandidates}</p>
      </div>

      <div className="metric-card pending">
        <h4>Pending</h4>
        <p>{metrics.pending}</p>
      </div>

      <div className="metric-card reviewed">
        <h4>Reviewed</h4>
        <p>{metrics.reviewed}</p>
      </div>

      <div className="metric-card hired">
        <h4>Hired</h4>
        <p>{metrics.hired}</p>
      </div>
    </div>
  );
}

export default MetricsCards;
