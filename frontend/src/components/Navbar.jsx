import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      style={{
        background: "#222",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <Link
          to="/dashboard"
          style={{
            color: "white",
            marginRight: "15px",
            textDecoration: "none",
          }}
        >
          Dashboard
        </Link>

        <Link
          to="/projects"
          style={{
            color: "white",
            marginRight: "15px",
            textDecoration: "none",
          }}
        >
          Projects
        </Link>

        <Link
          to="/create-task"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Create Task
        </Link>
      </div>

      <button
        onClick={logout}
        style={{
          padding: "8px 15px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}