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
      <h4>{candidate.name}</h4>

      <p>
        <strong>Job Title:</strong> {candidate.jobTitle}
      </p>

      <p>
        <strong>Status:</strong>
      </p>

      <StatusDropdown
        candidateId={candidate._id}
        currentStatus={candidate.status}
        onUpdated={onStatusUpdate}
      />

      {candidate.resumeUrl ? (
        <a
          href={`http://localhost:5000${candidate.resumeUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="resume-link"
        >
          📄 View Resume
        </a>
      ) : (
        <p className="no-resume">No resume uploaded</p>
      )}

      <button
        className="delete-btn"
        onClick={handleDelete}
        disabled={deleting}
      >
        {deleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}

export default CandidateCard;
