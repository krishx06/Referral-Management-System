import { useState } from "react";
import { updateCandidateStatus } from "../api/candidate.api";

function StatusDropdown({ candidateId, currentStatus, onUpdated }) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setLoading(true);

    try {
      await updateCandidateStatus(candidateId, newStatus);
      onUpdated?.(); 
    } catch (err) {
      alert("Failed to update status");
      setStatus(currentStatus); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={loading}
    >
      <option value="Pending">Pending</option>
      <option value="Reviewed">Reviewed</option>
      <option value="Hired">Hired</option>
    </select>
  );
}

export default StatusDropdown;
