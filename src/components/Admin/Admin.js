import React, { useState, useEffect, useCallback, useRef } from "react";
import { Container, Form, Button, Row, Col, Alert, Card } from "react-bootstrap";
import {
  loginAdmin,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getResume,
  uploadResume,
} from "../../api";

const emptyForm = {
  title: "",
  description: "",
  ghLink: "",
  demoLink: "",
  isBlog: false,
};

function Admin() {
  const fileInputRef = useRef(null);
  const resumeInputRef = useRef(null);
  const [token, setToken] = useState(
    () => localStorage.getItem("adminToken") || ""
  );
  const [password, setPassword] = useState("");
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [resumeMeta, setResumeMeta] = useState({ url: null, fileName: null });
  const [resumeFile, setResumeFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [removePublicIds, setRemovePublicIds] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!message && !error) return undefined;
    const timer = setTimeout(() => {
      setMessage("");
      setError("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [message, error]);

  const loadProjects = useCallback(async () => {
    try {
      const { data } = await getProjects();
      setProjects(data);
    } catch (err) {
      setError("Failed to load projects");
    }
  }, []);

  const loadResume = useCallback(async () => {
    try {
      const { data } = await getResume();
      setResumeMeta({
        url: data?.url || null,
        fileName: data?.fileName || null,
        updatedAt: data?.updatedAt || null,
      });
    } catch (err) {
      // ignore — resume is optional until uploaded
    }
  }, []);

  useEffect(() => {
    if (token) {
      loadProjects();
      loadResume();
    }
  }, [token, loadProjects, loadResume]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setBusy(true);
    try {
      const { data } = await loginAdmin(password);
      localStorage.setItem("adminToken", data.token);
      setToken(data.token);
      setPassword("");
      setMessage("Logged in");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setBusy(false);
    }
  };

  const clearFileInput = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    setSelectedFiles([]);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken("");
    setForm(emptyForm);
    clearFileInput();
    setEditingId(null);
    setExistingImages([]);
    setRemovePublicIds([]);
    setMessage("");
    setError("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setSelectedFiles(files ? Array.from(files) : []);
      return;
    }
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    clearFileInput();
    setEditingId(null);
    setExistingImages([]);
    setRemovePublicIds([]);
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setForm({
      title: project.title,
      description: project.description,
      ghLink: project.ghLink || "",
      demoLink: project.demoLink || "",
      isBlog: Boolean(project.isBlog),
    });
    clearFileInput();
    setExistingImages(project.images || []);
    setRemovePublicIds([]);
    setMessage("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const markImageForRemoval = (publicId) => {
    if (!publicId) return;
    setRemovePublicIds((prev) =>
      prev.includes(publicId) ? prev : [...prev, publicId]
    );
    setExistingImages((prev) => prev.filter((img) => img.publicId !== publicId));
  };

  const getFilesFromInput = () => {
    if (fileInputRef.current?.files?.length) {
      return Array.from(fileInputRef.current.files);
    }
    return selectedFiles;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setBusy(true);

    const files = getFilesFromInput();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("ghLink", form.ghLink);
    formData.append("demoLink", form.demoLink);
    formData.append("isBlog", String(form.isBlog));

    files.forEach((file) => {
      formData.append("images", file, file.name);
    });

    if (removePublicIds.length) {
      formData.append("removePublicIds", JSON.stringify(removePublicIds));
    }

    try {
      if (editingId) {
        if (existingImages.length + files.length === 0) {
          setError("Project must have at least one image");
          setBusy(false);
          return;
        }
        await updateProject(editingId, formData, token);
        setMessage(`Project updated (${files.length} new image(s) uploaded)`);
      } else {
        if (!files.length) {
          setError("Select at least one image (you can select many at once)");
          setBusy(false);
          return;
        }
        await createProject(formData, token);
        setMessage(`Project created with ${files.length} image(s)`);
      }
      resetForm();
      await loadProjects();
    } catch (err) {
      if (err.response?.status === 401) {
        handleLogout();
        setError("Session expired. Please log in again.");
      } else {
        setError(err.response?.data?.message || "Save failed");
      }
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    setError("");
    setMessage("");
    setBusy(true);
    try {
      await deleteProject(id, token);
      setMessage("Project deleted");
      if (editingId === id) resetForm();
      await loadProjects();
    } catch (err) {
      if (err.response?.status === 401) {
        handleLogout();
        setError("Session expired. Please log in again.");
      } else {
        setError(err.response?.data?.message || "Delete failed");
      }
    } finally {
      setBusy(false);
    }
  };

  const handleResumeUpload = async (e) => {
    e.preventDefault();
    const file = resumeFile || resumeInputRef.current?.files?.[0];
    if (!file) {
      setError("Select a PDF resume to upload");
      return;
    }
    setError("");
    setMessage("");
    setBusy(true);
    const formData = new FormData();
    formData.append("resume", file, file.name);
    try {
      const { data } = await uploadResume(formData, token);
      setResumeMeta({
        url: data.url,
        fileName: data.fileName,
        updatedAt: data.updatedAt,
      });
      setResumeFile(null);
      if (resumeInputRef.current) resumeInputRef.current.value = "";
      setMessage("Resume uploaded successfully");
    } catch (err) {
      if (err.response?.status === 401) {
        handleLogout();
        setError("Session expired. Please log in again.");
      } else {
        setError(err.response?.data?.message || "Resume upload failed");
      }
    } finally {
      setBusy(false);
    }
  };

  if (!token) {
    return (
      <Container style={{ paddingTop: "120px", paddingBottom: "60px", maxWidth: "420px" }}>
        <h2 style={{ color: "white", marginBottom: "20px" }}>Admin Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "white" }}>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" disabled={busy}>
            {busy ? "..." : "Login"}
          </Button>
        </Form>
      </Container>
    );
  }

  return (
    <Container style={{ paddingTop: "100px", paddingBottom: "60px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h2 style={{ color: "white", margin: 0 }}>Admin Dashboard</h2>
        <Button variant="outline-light" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}

      <Card
        style={{
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.2)",
          marginBottom: "32px",
        }}
      >
        <Card.Body>
          <h4 style={{ color: "white" }}>Resume</h4>
          <p style={{ color: "#bbb", marginBottom: "12px" }}>
            Upload a PDF. It will show on the public Resume page.
          </p>
          {resumeMeta.fileName && (
            <p style={{ color: "#c770f0" }}>
              Current: {resumeMeta.fileName}
              {resumeMeta.url && (
                <>
                  {" — "}
                  <a
                    href={resumeMeta.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#c770f0" }}
                  >
                    open
                  </a>
                </>
              )}
            </p>
          )}
          <Form onSubmit={handleResumeUpload}>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "white" }}>PDF file</Form.Label>
              <input
                ref={resumeInputRef}
                type="file"
                accept="application/pdf,.pdf"
                className="form-control"
                onChange={(e) =>
                  setResumeFile(e.target.files?.[0] || null)
                }
              />
            </Form.Group>
            <Button type="submit" disabled={busy}>
              {busy ? "Uploading..." : "Upload Resume"}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <h3 style={{ color: "white", marginBottom: "16px" }}>Projects</h3>

      <Card
        style={{
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.2)",
          marginBottom: "32px",
        }}
      >
        <Card.Body>
          <h4 style={{ color: "white" }}>
            {editingId ? "Edit Project" : "Add Project"}
          </h4>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "white" }}>Title</Form.Label>
                  <Form.Control
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "white" }}>
                    Images {editingId ? "(optional — adds more)" : ""}
                  </Form.Label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={handleChange}
                    required={!editingId}
                    className="form-control"
                  />
                  <Form.Text style={{ color: "#bbb", display: "block", marginTop: 6 }}>
                    Select multiple images at once (Cmd/Ctrl + click).
                    {selectedFiles.length > 0 && (
                      <>
                        <br />
                        <strong style={{ color: "#c770f0" }}>
                          {selectedFiles.length} file(s):{" "}
                          {selectedFiles.map((f) => f.name).join(", ")}
                        </strong>
                      </>
                    )}
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            {editingId && existingImages.length > 0 && (
              <div style={{ marginBottom: "16px" }}>
                <Form.Label style={{ color: "white" }}>Current images</Form.Label>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {existingImages.map((img) => (
                    <div key={img.publicId || img.url} style={{ position: "relative" }}>
                      <img
                        src={img.url}
                        alt="project"
                        style={{
                          width: "90px",
                          height: "70px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                      <Button
                        size="sm"
                        variant="danger"
                        style={{
                          position: "absolute",
                          top: "2px",
                          right: "2px",
                          padding: "0 6px",
                          lineHeight: 1.4,
                        }}
                        type="button"
                        onClick={() => markImageForRemoval(img.publicId)}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "white" }}>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={form.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "white" }}>GitHub Link</Form.Label>
                  <Form.Control
                    name="ghLink"
                    value={form.ghLink}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "white" }}>Demo Link</Form.Label>
                  <Form.Control
                    name="demoLink"
                    value={form.demoLink}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="isBlog"
                label="Is Blog"
                checked={form.isBlog}
                onChange={handleChange}
                style={{ color: "white" }}
              />
            </Form.Group>
            <Button type="submit" disabled={busy} style={{ marginRight: "10px" }}>
              {busy ? "Uploading..." : editingId ? "Update" : "Create"}
            </Button>
            {editingId && (
              <Button variant="secondary" type="button" onClick={resetForm}>
                Cancel
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>

      <h4 style={{ color: "white", marginBottom: "16px" }}>Existing Projects</h4>
      {projects.length === 0 && (
        <p style={{ color: "white" }}>No projects yet.</p>
      )}
      {projects.map((project) => (
        <Card
          key={project._id}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.15)",
            marginBottom: "12px",
          }}
        >
          <Card.Body
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", gap: "6px" }}>
              {(project.images || []).slice(0, 3).map((img) => (
                <img
                  key={img.publicId || img.url}
                  src={img.url}
                  alt={project.title}
                  style={{
                    width: "70px",
                    height: "55px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
              ))}
            </div>
            <div style={{ flex: 1, minWidth: "200px" }}>
              <div style={{ color: "white", fontWeight: 600 }}>{project.title}</div>
              <div style={{ color: "#ccc", fontSize: "0.9rem" }}>
                {project.description.slice(0, 120)}
                {project.description.length > 120 ? "..." : ""}
              </div>
              <div style={{ color: "#999", fontSize: "0.8rem" }}>
                {(project.images || []).length} image(s)
              </div>
            </div>
            <div>
              <Button
                size="sm"
                variant="primary"
                style={{ marginRight: "8px" }}
                onClick={() => handleEdit(project)}
                disabled={busy}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => handleDelete(project._id)}
                disabled={busy}
              >
                Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default Admin;
