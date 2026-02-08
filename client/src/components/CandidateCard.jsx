import { useState } from "react";
import StatusDropdown from "./StatusDropdown";
import { deleteCandidate } from "../api/candidate.api";

function CandidateCard({ candidate, onStatusUpdate }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Delete ${candidate.name}?`)) return;
    
    setDeleting(true);
    try {
      await deleteCandidate(candidate._id);
      onStatusUpdate();
    } catch (err) {
      alert("Failed to delete candidate");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="candidate-card">
      <div className="card-header">
        <h4 className="card-name">{candidate.name}</h4>
        <button
          className="delete-btn"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "..." : "×"}
        </button>
      </div>

      <p className="card-job">{candidate.jobTitle}</p>

      <div className="card-footer">
        <StatusDropdown
          candidateId={candidate._id}
          currentStatus={candidate.status}
          onUpdated={onStatusUpdate}
        />

        {candidate.resumeName ? (
          <a
            href={`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/candidates/${candidate._id}/resume`}
            target="_blank"
            rel="noopener noreferrer"
            className="resume-link"
          >
            View Resume
          </a>
        ) : (
          <span className="no-resume">No resume</span>
        )}
      </div>
    </div>
  );
}

export default CandidateCard;
