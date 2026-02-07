import { useEffect, useState } from "react";
import { getCandidates } from "../api/candidate.api";
import { removeToken } from "../utils/auth";

function Dashboard() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    getCandidates().then((res) => setCandidates(res.data));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => { removeToken(); window.location.reload(); }}>
        Logout
      </button>

      <ul>
        {candidates.map((c) => (
          <li key={c._id}>
            {c.name} - {c.jobTitle} - {c.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
