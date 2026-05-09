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
      }}
    >
      <div>
        <Link
          to="/dashboard"
          style={{
            color: "white",
            marginRight: "15px",
          }}
        >
          Dashboard
        </Link>

        <Link
          to="/projects"
          style={{
            color: "white",
            marginRight: "15px",
          }}
        >
          Projects
        </Link>

        <Link
          to="/create-task"
          style={{
            color: "white",
          }}
        >
          Create Task
        </Link>
      </div>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}