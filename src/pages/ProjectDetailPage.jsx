import { useParams, useNavigate } from "react-router-dom";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "1rem" }}>
        ← Back
      </button>
      <h1>Project {id}</h1>
      <p>Project details coming soon...</p>
    </div>
  );
}