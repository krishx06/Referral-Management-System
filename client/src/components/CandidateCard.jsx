import { useState } from "react";
import StatusDropdown from "./StatusDropdown";
import { deleteCandidate, getResume } from "../api/candidate.api";

function CandidateCard({ candidate, onStatusUpdate }) {
  const [deleting, setDeleting] = useState(false);
  const [loadingResume, setLoadingResume] = useState(false);

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

  const handleViewResume = async () => {
    setLoadingResume(true);
    try {
      const blob = await getResume(candidate._id);
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (err) {
      alert("Failed to load resume");
    } finally {
      setLoadingResume(false);
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
          <button
            className="resume-link"
            onClick={handleViewResume}
            disabled={loadingResume}
            style={{ cursor: "pointer", background: "none", border: "none" }}
          >
            {loadingResume ? "Loading..." : "View Resume"}
          </button>
        ) : (
          <span className="no-resume">No resume</span>
        )}
      </div>
    </div>
  );
}

export default CandidateCard;
