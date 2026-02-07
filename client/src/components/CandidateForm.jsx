import { useState } from "react";
import { createCandidate } from "../api/candidate.api";

function CandidateForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    resume: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleFileChange = (e) => {
    setForm({ ...form, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key]) data.append(key, form[key]);
      });

      await createCandidate(data);
      onSuccess();
      setForm({ name: "", email: "", phone: "", jobTitle: "", resume: null });
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to refer candidate"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="candidate-form" onSubmit={handleSubmit}>
      <h3>Refer a Candidate</h3>

      {error && <p className="error">{error}</p>}

      <input name="name" placeholder="Candidate Name" value={form.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
      <input name="jobTitle" placeholder="Job Title" value={form.jobTitle} onChange={handleChange} required />
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <p style={{ fontSize: "12px", color: "#6b7280" }}>
        PDF only • Max size 2MB
      </p>


      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Referral"}
      </button>
    </form>
  );
}

export default CandidateForm;
