import { useState, useEffect } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");

      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Load projects on page load
  useEffect(() => {
    const loadProjects = async () => {
      await fetchProjects();
    };

    loadProjects();
  }, []);

  // Create new project
  const createProject = async (e) => {
    e.preventDefault();

    try {
      await API.post("/projects", form);

      alert("Project Created Successfully");

      fetchProjects();

      setForm({
        name: "",
        description: "",
      });
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Project creation failed"
      );
    }
  };

  return (
    <div>
      <Navbar />

      <div
        style={{
          padding: "20px",
          maxWidth: "800px",
          margin: "auto",
        }}
      >
        <h1>Projects</h1>

        {/* Admin Only Form */}
        {user?.role === "Admin" && (
          <form
            onSubmit={createProject}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "30px",
            }}
          >
            <h3>Create New Project</h3>

            <input
              type="text"
              placeholder="Project Name"
              required
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
              }}
            />

            <textarea
              placeholder="Project Description"
              required
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "10px",
                height: "100px",
                marginBottom: "15px",
              }}
            />

            <button
              type="submit"
              style={{
                padding: "10px 20px",
                cursor: "pointer",
              }}
            >
              Create Project
            </button>
          </form>
        )}

        {/* Project List */}
        <div>
          {projects.length === 0 ? (
            <p>No Projects Found</p>
          ) : (
            projects.map((project) => (
              <div
                key={project._id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "15px",
                  marginBottom: "15px",
                  background: "#f9f9f9",
                }}
              >
                <h2>{project.name}</h2>

                <p>{project.description}</p>

                <p>
                  <strong>Created By:</strong>{" "}
                  {project.createdBy?.name}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}