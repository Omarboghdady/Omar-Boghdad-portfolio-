import { useEffect, useState, type FormEvent } from "react";
import {
  Award,
  ExternalLink,
  FolderKanban,
  ImagePlus,
  LayoutDashboard,
  Pencil,
  Plus,
  Search,
  Settings,
  Trash2,
  X,
} from "lucide-react";
import {
  deleteCertificate as removeCertificate,
  deleteProject as removeProject,
  getCertificates,
  getProjects,
  IMAGE_ACCEPT,
  saveCertificate,
  saveProject,
  validateImage,
  type Certificate,
  type Project,
} from "../data/portfolioStorage";
import useObjectUrl from "../hooks/useObjectUrl";
import "./Admin.css";

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong. Please try again.";
}

function blobAsDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("Could not encode an image for export."));
    };
    reader.onerror = () => reject(reader.error ?? new Error("Could not read an image for export."));
    reader.readAsDataURL(blob);
  });
}

function ImagePreview({ blob, alt }: { blob?: Blob; alt: string }) {
  const imageUrl = useObjectUrl(blob);
  return imageUrl ? <img className="admin-image-preview" src={imageUrl} alt={alt} /> : null;
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const [noticeType, setNoticeType] = useState<"success" | "error">("success");

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectImage, setProjectImage] = useState<File | null>(null);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectTechnologies, setProjectTechnologies] = useState("");
  const [projectGithubUrl, setProjectGithubUrl] = useState("");
  const [projectDemoUrl, setProjectDemoUrl] = useState("");

  const [showCertificateForm, setShowCertificateForm] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);
  const [certificateImage, setCertificateImage] = useState<File | null>(null);
  const [certificateTitle, setCertificateTitle] = useState("");
  const [certificateIssuer, setCertificateIssuer] = useState("");
  const [certificateIssueDate, setCertificateIssueDate] = useState("");
  const [certificateId, setCertificateId] = useState("");
  const [certificateVerificationUrl, setCertificateVerificationUrl] = useState("");

  const projectPreview = useObjectUrl(projectImage ?? editingProject?.image);
  const certificatePreview = useObjectUrl(certificateImage ?? editingCertificate?.image);

  useEffect(() => {
    let active = true;
    Promise.all([getProjects(), getCertificates()])
      .then(([savedProjects, savedCertificates]) => {
        if (!active) return;
        setProjects(savedProjects);
        setCertificates(savedCertificates);
      })
      .catch((error: unknown) => {
        if (active) showMessage(`Could not load saved portfolio items: ${errorMessage(error)}`, "error");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  function showMessage(message: string, type: "success" | "error" = "success") {
    setNotice(message);
    setNoticeType(type);
  }

  function resetProjectForm() {
    setShowProjectForm(false);
    setEditingProject(null);
    setProjectImage(null);
    setProjectTitle("");
    setProjectDescription("");
    setProjectTechnologies("");
    setProjectGithubUrl("");
    setProjectDemoUrl("");
  }

  function resetCertificateForm() {
    setShowCertificateForm(false);
    setEditingCertificate(null);
    setCertificateImage(null);
    setCertificateTitle("");
    setCertificateIssuer("");
    setCertificateIssueDate("");
    setCertificateId("");
    setCertificateVerificationUrl("");
  }

  function chooseImage(file: File | undefined, kind: "project" | "certificate") {
    if (!file) return;
    const validationError = validateImage(file);
    if (validationError) {
      showMessage(validationError, "error");
      return;
    }
    setNotice("");
    if (kind === "project") setProjectImage(file);
    else setCertificateImage(file);
  }

  function validOptionalUrl(value: string, label: string) {
    if (!value.trim()) return true;
    try {
      const parsed = new URL(value.trim());
      if (parsed.protocol === "http:" || parsed.protocol === "https:") return true;
    } catch {
      // Report invalid user input through the dashboard notice.
    }
    showMessage(`${label} must start with http:// or https://.`, "error");
    return false;
  }

  async function handleSaveProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const image = projectImage ?? editingProject?.image;
    if (!image) {
      showMessage("Choose a project cover image before saving.", "error");
      return;
    }
    if (!validOptionalUrl(projectGithubUrl, "GitHub URL") || !validOptionalUrl(projectDemoUrl, "Live demo URL")) return;

    const project: Project = {
      id: editingProject?.id ?? Date.now(),
      image,
      imageName: projectImage?.name ?? editingProject?.imageName ?? "Project image",
      title: projectTitle.trim(),
      description: projectDescription.trim(),
      technologies: projectTechnologies.trim(),
      githubUrl: projectGithubUrl.trim(),
      demoUrl: projectDemoUrl.trim(),
      published: editingProject?.published ?? false,
    };

    setSaving(true);
    try {
      await saveProject(project);
      setProjects((previous) => editingProject
        ? previous.map((item) => item.id === project.id ? project : item)
        : [...previous, project]);
      resetProjectForm();
      showMessage(editingProject ? "Project changes saved." : "Project saved to this browser.");
    } catch (error) {
      showMessage(`Could not save project: ${errorMessage(error)}`, "error");
    } finally {
      setSaving(false);
    }
  }

  function editProject(project: Project) {
    setEditingProject(project);
    setProjectImage(null);
    setProjectTitle(project.title);
    setProjectDescription(project.description);
    setProjectTechnologies(project.technologies);
    setProjectGithubUrl(project.githubUrl);
    setProjectDemoUrl(project.demoUrl);
    setShowProjectForm(true);
    setNotice("");
  }

  async function deleteProject(id: number) {
    if (!window.confirm("Delete this project?")) return;
    try {
      await removeProject(id);
      setProjects((previous) => previous.filter((project) => project.id !== id));
      if (editingProject?.id === id) resetProjectForm();
      showMessage("Project deleted.");
    } catch (error) {
      showMessage(`Could not delete project: ${errorMessage(error)}`, "error");
    }
  }

  async function togglePublished(project: Project) {
    const updated = { ...project, published: !project.published };
    try {
      await saveProject(updated);
      setProjects((previous) => previous.map((item) => item.id === project.id ? updated : item));
      showMessage(updated.published ? "Project published." : "Project unpublished.");
    } catch (error) {
      showMessage(`Could not update project status: ${errorMessage(error)}`, "error");
    }
  }

  async function handleSaveCertificate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const image = certificateImage ?? editingCertificate?.image;
    if (!image) {
      showMessage("Choose a certificate image before saving.", "error");
      return;
    }
    if (!validOptionalUrl(certificateVerificationUrl, "Verification URL")) return;

    const certificate: Certificate = {
      id: editingCertificate?.id ?? Date.now(),
      image,
      imageName: certificateImage?.name ?? editingCertificate?.imageName ?? "Certificate image",
      title: certificateTitle.trim(),
      issuer: certificateIssuer.trim(),
      issueDate: certificateIssueDate,
      certificateId: certificateId.trim(),
      verificationUrl: certificateVerificationUrl.trim(),
    };

    setSaving(true);
    try {
      await saveCertificate(certificate);
      setCertificates((previous) => editingCertificate
        ? previous.map((item) => item.id === certificate.id ? certificate : item)
        : [...previous, certificate]);
      resetCertificateForm();
      showMessage(editingCertificate ? "Certificate changes saved." : "Certificate saved to this browser.");
    } catch (error) {
      showMessage(`Could not save certificate: ${errorMessage(error)}`, "error");
    } finally {
      setSaving(false);
    }
  }

  function editCertificate(certificate: Certificate) {
    setEditingCertificate(certificate);
    setCertificateImage(null);
    setCertificateTitle(certificate.title);
    setCertificateIssuer(certificate.issuer);
    setCertificateIssueDate(certificate.issueDate);
    setCertificateId(certificate.certificateId);
    setCertificateVerificationUrl(certificate.verificationUrl);
    setShowCertificateForm(true);
    setNotice("");
  }

  async function deleteCertificate(id: number) {
    if (!window.confirm("Delete this certificate?")) return;
    try {
      await removeCertificate(id);
      setCertificates((previous) => previous.filter((certificate) => certificate.id !== id));
      if (editingCertificate?.id === id) resetCertificateForm();
      showMessage("Certificate deleted.");
    } catch (error) {
      showMessage(`Could not delete certificate: ${errorMessage(error)}`, "error");
    }
  }

  async function exportIndexedDbData() {
    try {
      const [savedProjects, savedCertificates] = await Promise.all([getProjects(), getCertificates()]);
      const [projectsWithImages, certificatesWithImages] = await Promise.all([
        Promise.all(savedProjects.map(async ({ image, ...project }) => ({
          ...project,
          image: await blobAsDataUrl(image),
        }))),
        Promise.all(savedCertificates.map(async ({ image, ...certificate }) => ({
          ...certificate,
          image: await blobAsDataUrl(image),
        }))),
      ]);
      const exportedData = {
        exportedAt: new Date().toISOString(),
        projects: projectsWithImages,
        certificates: certificatesWithImages,
      };
      const file = new Blob([JSON.stringify(exportedData, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = "omar-portfolio-export.json";
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 0);
      showMessage("Portfolio data exported as JSON, including image data.");
    } catch (error) {
      showMessage(`Could not export portfolio data: ${errorMessage(error)}`, "error");
    }
  }

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <a className="admin-brand" href="/">
          OB<span>.</span>
          <small>PORTFOLIO ADMIN</small>
        </a>
        <p className="admin-menu-label">WORKSPACE</p>
        {[
          { name: "Overview", icon: LayoutDashboard },
          { name: "Projects", icon: FolderKanban },
          { name: "Certificates", icon: Award },
          { name: "Settings", icon: Settings },
        ].map(({ name, icon: Icon }) => (
          <button
            key={name}
            className={`admin-nav-item ${activeTab === name ? "active" : ""}`}
            onClick={() => {
              setActiveTab(name);
              setNotice("");
            }}
          >
            <Icon size={18} />
            {name}
          </button>
        ))}
        <div className="admin-sidebar-bottom">
          <a href="/" className="admin-back-link"><span aria-hidden="true">←</span> Back to Portfolio</a>
          <p>Omar Boghdady</p>
          <span>Portfolio workspace</span>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="admin-breadcrumb">Workspace / {activeTab}</p>
            <h1>{activeTab}</h1>
          </div>
          <a className="admin-view-site" href="/"><ExternalLink size={15} />View Website</a>
        </header>

        {notice && <div className={`admin-notice ${noticeType}`} role="status">{notice}</div>}
        {loading && <p className="admin-muted" role="status">Loading saved projects and certificates…</p>}

        {activeTab === "Overview" && (
          <>
            <section className="admin-welcome">
              <div>
                <p className="admin-kicker">YOUR CREATIVE SPACE</p>
                <h2>Welcome back, Omar.</h2>
                <p>Manage your portfolio projects and certificates.</p>
              </div>
              <button className="admin-primary-button" onClick={() => {
                setActiveTab("Projects");
                setShowProjectForm(true);
              }}>
                <Plus size={17} />Add Project
              </button>
            </section>
            <section className="admin-stats">
              <article className="admin-stat-card">
                <span className="admin-stat-icon blue"><FolderKanban size={20} /></span>
                <p>Total Projects</p><h3>{projects.length}</h3><small>Saved in this browser</small>
              </article>
              <article className="admin-stat-card">
                <span className="admin-stat-icon cyan"><Award size={20} /></span>
                <p>Certificates</p><h3>{certificates.length}</h3><small>Saved in this browser</small>
              </article>
              <article className="admin-stat-card">
                <span className="admin-stat-icon green"><ExternalLink size={20} /></span>
                <p>Published Projects</p><h3>{projects.filter((project) => project.published).length}</h3><small>Visible on your portfolio</small>
              </article>
            </section>
            <section className="admin-content-card">
              <div className="admin-section-heading">
                <div><h2>Recent Projects</h2><p>Your recently added projects will appear here.</p></div>
                <button className="admin-text-button" onClick={() => setActiveTab("Projects")}>View All</button>
              </div>
              {projects.length === 0 ? (
                <div className="admin-empty-state">
                  <FolderKanban size={30} /><h3>No projects yet</h3>
                  <p>Add an image to start building your portfolio.</p>
                  <button className="admin-primary-button" onClick={() => {
                    setActiveTab("Projects");
                    setShowProjectForm(true);
                  }}><Plus size={16} />Create First Project</button>
                </div>
              ) : (
                <div className="admin-project-list">
                  {projects.slice(-4).reverse().map((project) => (
                    <div className="admin-project-row" key={project.id}>
                      <div className="admin-project-info">
                        <ImagePreview blob={project.image} alt={project.title || "Project cover"} />
                        <div><strong>{project.title || "Untitled project"}</strong><p>{project.description || project.technologies || "Image-only project"}</p></div>
                      </div>
                      <span className={`admin-status ${project.published ? "published" : ""}`}>{project.published ? "Published" : "Draft"}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        {activeTab === "Projects" && (
          <section className="admin-content-card">
            <div className="admin-section-heading">
              <div><h2>All Projects</h2><p>Start with a cover image; every project detail is optional.</p></div>
              <button className="admin-primary-button" onClick={() => {
                if (showProjectForm) resetProjectForm();
                else {
                  setShowProjectForm(true);
                  setNotice("");
                }
              }}><Plus size={17} />Add Project</button>
            </div>

            {showProjectForm && (
              <form className="admin-project-form" onSubmit={handleSaveProject}>
                <div className="admin-form-title">
                  <h3>{editingProject ? "Edit Project" : "New Project"}</h3>
                  <button type="button" className="admin-close-button" onClick={resetProjectForm} aria-label="Close form"><X size={18} /></button>
                </div>
                <label className="admin-upload-label" htmlFor="project-image">
                  <ImagePlus size={18} />{projectImage || editingProject ? "Replace cover image" : "Upload Image"}
                </label>
                <input
                  className="admin-file-input"
                  id="project-image"
                  type="file"
                  accept={IMAGE_ACCEPT}
                  onChange={(event) => {
                    chooseImage(event.currentTarget.files?.[0], "project");
                    event.currentTarget.value = "";
                  }}
                />
                <p className="admin-form-help">PNG, JPG, JPEG, or WEBP · up to 8 MB. An image is the only required field.</p>
                {projectPreview && <div className="admin-preview-frame"><img src={projectPreview} alt="Project cover preview" /></div>}
                <label htmlFor="project-title">Title <span>Optional</span></label>
                <input id="project-title" value={projectTitle} onChange={(event) => setProjectTitle(event.target.value)} placeholder="e.g. Sales dashboard" maxLength={120} />
                <label htmlFor="project-description">Short description <span>Optional</span></label>
                <textarea id="project-description" value={projectDescription} onChange={(event) => setProjectDescription(event.target.value)} placeholder="What is this project about?" rows={3} maxLength={500} />
                <label htmlFor="project-technologies">Technologies <span>Optional</span></label>
                <input id="project-technologies" value={projectTechnologies} onChange={(event) => setProjectTechnologies(event.target.value)} placeholder="e.g. Power BI, Excel, SQL" maxLength={200} />
                <label htmlFor="project-github">GitHub URL <span>Optional</span></label>
                <input id="project-github" type="url" value={projectGithubUrl} onChange={(event) => setProjectGithubUrl(event.target.value)} placeholder="https://github.com/..." />
                <label htmlFor="project-demo">Live demo URL <span>Optional</span></label>
                <input id="project-demo" type="url" value={projectDemoUrl} onChange={(event) => setProjectDemoUrl(event.target.value)} placeholder="https://..." />
                <div className="admin-form-actions">
                  <button type="button" className="admin-cancel-button" onClick={resetProjectForm}>Cancel</button>
                  <button type="submit" className="admin-primary-button" disabled={saving}>{saving ? "Saving…" : editingProject ? "Save Changes" : "Save Project"}</button>
                </div>
              </form>
            )}

            <div className="admin-search"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search projects..." /></div>
            {filteredProjects.length === 0 ? (
              <div className="admin-empty-state"><FolderKanban size={28} /><h3>{search ? "No matching projects" : "No projects yet"}</h3><p>{search ? "Try a different search." : "Add a project image to get started."}</p></div>
            ) : (
              <div className="admin-project-list">
                {filteredProjects.map((project) => (
                  <article className="admin-project-row" key={project.id}>
                    <div className="admin-project-info">
                      <ImagePreview blob={project.image} alt={project.title || "Project cover"} />
                      <div>
                        <strong>{project.title || "Untitled project"}</strong>
                        {project.description && <p>{project.description}</p>}
                        {project.technologies && <p className="admin-project-tech">{project.technologies}</p>}
                      </div>
                    </div>
                    <div className="admin-row-actions">
                      <span className={`admin-status ${project.published ? "published" : ""}`}>{project.published ? "Published" : "Draft"}</span>
                      <button className="admin-icon-button" type="button" onClick={() => editProject(project)} aria-label={`Edit ${project.title || "project"}`}><Pencil size={15} />Edit</button>
                      <button className="admin-icon-button" type="button" onClick={() => void togglePublished(project)}>{project.published ? "Unpublish" : "Publish"}</button>
                      <button className="admin-icon-button danger" type="button" onClick={() => void deleteProject(project.id)} aria-label={`Delete ${project.title || "project"}`}><Trash2 size={15} />Delete</button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === "Certificates" && (
          <section className="admin-content-card">
            <div className="admin-section-heading">
              <div><h2>My Certificates</h2><p>Upload a certificate image. Adding a name or any other details is optional.</p></div>
              <button className="admin-primary-button" type="button" onClick={() => {
                if (showCertificateForm) resetCertificateForm();
                else {
                  setShowCertificateForm(true);
                  setNotice("");
                }
              }}><Plus size={17} />Add Certificate</button>
            </div>

            {showCertificateForm && (
              <form className="admin-certificate-form" onSubmit={handleSaveCertificate}>
                <div className="admin-form-title">
                  <h3>{editingCertificate ? "Edit Certificate" : "New Certificate"}</h3>
                  <button type="button" className="admin-close-button" onClick={resetCertificateForm} aria-label="Close form"><X size={18} /></button>
                </div>
                <label className="admin-upload-label" htmlFor="certificate-image">
                  <ImagePlus size={18} />{certificateImage || editingCertificate ? "Replace certificate image" : "Upload Image"}
                </label>
                <input
                  className="admin-file-input"
                  id="certificate-image"
                  type="file"
                  accept={IMAGE_ACCEPT}
                  onChange={(event) => {
                    chooseImage(event.currentTarget.files?.[0], "certificate");
                    event.currentTarget.value = "";
                  }}
                />
                <p className="admin-form-help">PNG, JPG, JPEG, or WEBP · up to 8 MB. The image is the only required field.</p>
                {certificatePreview && <div className="admin-preview-frame certificate-preview"><img src={certificatePreview} alt="Certificate image preview" /></div>}
                <label htmlFor="certificate-title">Certificate name <span>Optional</span></label>
                <input id="certificate-title" value={certificateTitle} onChange={(event) => setCertificateTitle(event.target.value)} placeholder="e.g. Data Analytics Certificate" maxLength={120} />
                <label htmlFor="certificate-issuer">Issuing organization <span>Optional</span></label>
                <input id="certificate-issuer" value={certificateIssuer} onChange={(event) => setCertificateIssuer(event.target.value)} placeholder="e.g. Google" maxLength={120} />
                <label htmlFor="certificate-date">Issue date <span>Optional</span></label>
                <input id="certificate-date" type="date" value={certificateIssueDate} onChange={(event) => setCertificateIssueDate(event.target.value)} />
                <label htmlFor="certificate-id">Certificate ID <span>Optional</span></label>
                <input id="certificate-id" value={certificateId} onChange={(event) => setCertificateId(event.target.value)} maxLength={120} />
                <label htmlFor="certificate-verification">Verification URL <span>Optional</span></label>
                <input id="certificate-verification" type="url" value={certificateVerificationUrl} onChange={(event) => setCertificateVerificationUrl(event.target.value)} placeholder="https://..." />
                <div className="admin-form-actions">
                  <button type="button" className="admin-cancel-button" onClick={resetCertificateForm}>Cancel</button>
                  <button type="submit" className="admin-primary-button" disabled={saving}>{saving ? "Saving…" : editingCertificate ? "Save Changes" : "Save Certificate"}</button>
                </div>
              </form>
            )}

            {certificates.length === 0 ? (
              <div className="admin-empty-state"><Award size={30} /><h3>No certificates yet</h3><p>Upload a certificate image to add your first one.</p></div>
            ) : (
              <div className="admin-certificate-grid">
                {certificates.map((certificate) => (
                  <article className="admin-certificate-card" key={certificate.id}>
                    <ImagePreview blob={certificate.image} alt={certificate.title || "Certificate"} />
                    <div className="admin-certificate-details">
                      {certificate.title && <h3>{certificate.title}</h3>}
                      {certificate.issuer && <p>{certificate.issuer}</p>}
                      {certificate.issueDate && <small>{new Date(`${certificate.issueDate}T00:00:00`).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</small>}
                      {certificate.certificateId && <small>Certificate ID: {certificate.certificateId}</small>}
                      {certificate.verificationUrl && <a href={certificate.verificationUrl} target="_blank" rel="noreferrer"><ExternalLink size={14} />Verify certificate</a>}
                    </div>
                    <div className="admin-row-actions">
                      <button className="admin-icon-button" type="button" onClick={() => editCertificate(certificate)} aria-label={`Edit ${certificate.title || "certificate"}`}><Pencil size={15} />Edit</button>
                      <button className="admin-icon-button danger" type="button" onClick={() => void deleteCertificate(certificate.id)} aria-label={`Delete ${certificate.title || "certificate"}`}><Trash2 size={15} />Delete</button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === "Settings" && (
          <section className="admin-content-card">
            <h2>Settings</h2>
            <p className="admin-muted">Portfolio images and details are stored in this browser using IndexedDB. They persist after refresh, but are not uploaded to a server or shared across devices.</p>
            <p className="admin-muted">Export a JSON backup of existing projects and certificates, including their images, before moving the portfolio to static data.</p>
            <button className="admin-primary-button" type="button" onClick={() => void exportIndexedDbData()}>Export Existing Data as JSON</button>
          </section>
        )}

        <footer className="admin-footer"><span>Portfolio Management</span><span>Omar Boghdady</span></footer>
      </main>
    </div>
  );
}
