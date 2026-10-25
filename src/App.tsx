
import { useEffect, useState } from "react";
import "./App.css";
import Admin from "./admin/Admin";
import { projects, type DashboardScreenshot, type Project } from "./data/projects";
import { certificates, type Certificate } from "./data/certificates";
import { contactLinks } from "./data/contact";

const copyrightYear = new Date().getFullYear();

function ContactLinks({ footer = false }: { footer?: boolean }) {
  return (
    <div className={`contact-links${footer ? " footer-contact-links" : ""}`}>
      {contactLinks.map(({ id, label, href, Icon, external }) => (
        <a
          className="contact-link"
          key={id}
          href={href}
          aria-label={label}
          title={label}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          <Icon size={footer ? 17 : 20} aria-hidden="true" />
          <span className="contact-link-tooltip" role="tooltip">{label}</span>
        </a>
      ))}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      className="portfolio-project-card"
      href={`/projects/${project.id}`}
      aria-label={`Read the ${project.title} case study`}
    >
      <img className="portfolio-project-image" src={project.imagePath} alt={`${project.title} dashboard preview`} />
      <div className="portfolio-project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="portfolio-project-tags">
          {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
        </div>
        <span className="project-card-cta">View case study <span aria-hidden="true">↗</span></span>
      </div>
    </a>
  );
}

function ProjectDetail({ project }: { project: Project }) {
  const [selectedScreenshot, setSelectedScreenshot] = useState<DashboardScreenshot | null>(null);
  const currentIndex = projects.findIndex(({ id }) => id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="portfolio project-detail-layout">
      <nav className="navbar project-navbar" aria-label="Project navigation">
        <a className="logo" href="/#home">OB<span>.</span></a>
        <a className="project-back-link" href="/#projects">← Back to Projects</a>
        <a className="contact-btn" href="/#contact">Let's Talk ↗</a>
      </nav>

      <main className="project-detail">
        <header className="project-detail-header">
          <p className="eyebrow">DATA STORY</p>
          <h1>{project.title}</h1>
          <p className="project-detail-subtitle">{project.subtitle}</p>
          <p className="project-detail-overview">{project.description}</p>
          <div className="portfolio-project-tags project-detail-tags">
            {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
          </div>
        </header>

        <section className="project-detail-section" aria-labelledby="project-problem-title">
          <p className="eyebrow">THE BUSINESS CHALLENGE</p>
          <h2 id="project-problem-title">{project.challengeHeading}</h2>
          <p>{project.businessProblem}</p>
        </section>

        <section className="project-detail-section" aria-labelledby="dashboard-preview-title">
          <p className="eyebrow">DASHBOARD PREVIEW</p>
          <h2 id="dashboard-preview-title">Explore the dashboard views</h2>
          <div className="project-dashboard-gallery">
            {project.screenshots.map((screenshot) => (
              <figure className="project-dashboard-preview" key={screenshot.imagePath}>
                <button
                  className="project-dashboard-image-button"
                  type="button"
                  onClick={() => setSelectedScreenshot(screenshot)}
                  aria-label={`Enlarge ${screenshot.title} dashboard screenshot`}
                >
                  <img src={screenshot.imagePath} alt={screenshot.alt} />
                  <span className="project-dashboard-zoom-hint">Click to enlarge</span>
                </button>
                <figcaption>{screenshot.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {project.metrics.length > 0 && (
          <section className="project-detail-section" aria-labelledby="project-metrics-title">
            <p className="eyebrow">THE HEADLINE MEASURES</p>
            <h2 id="project-metrics-title">What the dashboard measures</h2>
            <div className="project-metrics-grid">
              {project.metrics.map(({ label, value, detail }) => (
                <article className="project-metric-card" key={label}>
                  <p>{label}</p>
                  <strong>{value}</strong>
                  {detail && <small>{detail}</small>}
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="project-detail-section" aria-labelledby="project-insights-title">
          <p className="eyebrow">WHAT THE EVIDENCE SAYS</p>
          <h2 id="project-insights-title">{project.insightHeading}</h2>
          <ul className="project-detail-list">
            {project.insights.map((insight) => <li key={insight}>{insight}</li>)}
          </ul>
        </section>

        <section className="project-detail-section" aria-labelledby="project-recommendations-title">
          <p className="eyebrow">FROM FINDING TO ACTION</p>
          <h2 id="project-recommendations-title">{project.recommendationHeading}</h2>
          <ul className="project-detail-list">
            {project.recommendations.map((recommendation) => <li key={recommendation}>{recommendation}</li>)}
          </ul>
        </section>

        <section className="project-detail-section project-impact" aria-labelledby="project-impact-title">
          <p className="eyebrow">POTENTIAL BUSINESS VALUE</p>
          <h2 id="project-impact-title">{project.impactHeading}</h2>
          <p>{project.expectedImpact}</p>
        </section>

        <div className="project-detail-actions">
          <a className="primary-btn" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            View Full Project on GitHub <span aria-hidden="true">↗</span>
          </a>
          <a className="secondary-btn" href={`/projects/${nextProject.id}`}>
            Next case study <span aria-hidden="true">→</span>
          </a>
        </div>
        <a className="project-bottom-back-link" href="/#projects">← Back to Projects</a>
      </main>

      <footer className="footer">
        <a className="logo" href="/#home">OB<span>.</span></a>
        <p>Designed to turn data into meaningful insights.</p>
        <ContactLinks footer />
        <p>© {copyrightYear} Omar Boghdady</p>
      </footer>
      {selectedScreenshot && (
        <DashboardLightbox
          screenshot={selectedScreenshot}
          onClose={() => setSelectedScreenshot(null)}
        />
      )}
    </div>
  );
}

function DashboardLightbox({
  screenshot,
  onClose,
}: {
  screenshot: DashboardScreenshot;
  onClose: () => void;
}) {
  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return (
    <div
      className="certificate-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${screenshot.title} dashboard screenshot`}
      onClick={onClose}
    >
      <button
        className="certificate-lightbox-close"
        type="button"
        onClick={onClose}
        aria-label="Close dashboard preview"
      >
        ×
      </button>
      <figure className="project-dashboard-lightbox-content" onClick={(event) => event.stopPropagation()}>
        <img src={screenshot.imagePath} alt={screenshot.alt} />
        <figcaption>{screenshot.title}</figcaption>
      </figure>
    </div>
  );
}

function HeroProfile() {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="hero-profile">
      {imageFailed ? (
        <span className="hero-profile-fallback">OB</span>
      ) : (
        <img src="/profile.jpg" alt="Omar Boghdady" onError={() => setImageFailed(true)} />
      )}
    </div>
  );
}

function CertificateCard({ certificate, onOpen }: { certificate: Certificate; onOpen: (certificate: Certificate) => void }) {
  const [imageUnavailable, setImageUnavailable] = useState(false);

  return (
    <button className="portfolio-certificate-card" type="button" onClick={() => onOpen(certificate)}>
      {imageUnavailable ? (
        <span className="portfolio-certificate-placeholder">Certificate image unavailable</span>
      ) : (
        <img src={certificate.image} alt={certificate.title || "Certificate"} onError={() => setImageUnavailable(true)} />
      )}
      <span className="portfolio-certificate-caption">
        {certificate.title && <strong>{certificate.title}</strong>}
        {certificate.issuer && <small>{certificate.issuer}</small>}
        {certificate.date && <small>{certificate.date}</small>}
        {certificate.description && <small>{certificate.description}</small>}
        <span className="portfolio-certificate-category">{certificate.category}</span>
      </span>
      <span className="portfolio-certificate-hint">Click to enlarge</span>
    </button>
  );
}

function CertificateLightbox({ certificate, onClose }: { certificate: Certificate; onClose: () => void }) {
  const [imageUnavailable, setImageUnavailable] = useState(false);
  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return (
    <div className="certificate-lightbox" role="dialog" aria-modal="true" aria-label={certificate.title || "Certificate image"} onClick={onClose}>
      <button className="certificate-lightbox-close" type="button" onClick={onClose} aria-label="Close certificate preview">×</button>
      {imageUnavailable ? (
        <div className="certificate-lightbox-placeholder" onClick={(event) => event.stopPropagation()}>Certificate image unavailable</div>
      ) : (
        <img src={certificate.image} alt={certificate.title || "Certificate"} onError={() => setImageUnavailable(true)} onClick={(event) => event.stopPropagation()} />
      )}
    </div>
  );
}

function App() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  if (window.location.pathname === "/admin") {
    return <Admin />;
  }

  const projectRoute = window.location.pathname.match(/^\/projects\/([^/]+)\/?$/);
  if (projectRoute) {
    const projectId = decodeURIComponent(projectRoute[1]);
    const project = projects.find(({ id }) => id === projectId);
    if (project) return <ProjectDetail project={project} />;

    return (
      <main className="project-not-found">
        <a className="logo" href="/#home">OB<span>.</span></a>
        <h1>Project not found</h1>
        <a className="primary-btn" href="/#projects">Back to Projects</a>
      </main>
    );
  }

  return (
    <div className="portfolio">
      <nav className="navbar">
        <a className="logo" href="#home">OB<span>.</span></a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#certificates">Certificates</a>
          <a href="#contact">Contact</a>
        </div>

        <a className="contact-btn" href="#contact">Let's Talk ↗</a>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="availability">
              <span className="status-dot"></span>
              Available for Opportunities
            </div>

            <p className="eyebrow">DATA ANALYST · BUSINESS INTELLIGENCE</p>

            <h1>
              Turning Data Into
              <br />
              <span>Meaningful Insights.</span>
            </h1>

            <p className="hero-description">
              I'm Omar Boghdady, a Business Information Systems student
              passionate about data analytics and transforming data into
              insights that help businesses make better decisions.
            </p>

            <div className="hero-actions">
              <a className="primary-btn" href="#projects">
                Explore My Work <span>↗</span>
              </a>
              <a className="secondary-btn" href="#about">
                More About Me
              </a>
            </div>

            <div className="social-links">
              <a
                href="https://github.com/Omarboghdady"
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>
              <a
                href="https://www.linkedin.com/in/omar-kamal-boghdady-37a456287"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-glow"></div>
            <HeroProfile />
          </div>
        </section>

        <section className="about section" id="about">
          <p className="eyebrow">01 / ABOUT ME</p>
          <h2>
            Curious mind.
            <br />
            <span>Data-driven thinking.</span>
          </h2>
          <p className="section-description">
            I'm studying Business Information Systems at the Faculty of
            Commerce. I enjoy learning new technologies, solving problems,
            and discovering the stories hidden inside data. My goal is to
            turn information into practical insights that create real value.
          </p>
        </section>

        <section className="skills section" id="skills">
          <p className="eyebrow">02 / MY TOOLKIT</p>
          <h2>Skills & Expertise</h2>
          <div className="skills-grid">
            {[
              ["01", "Microsoft Excel", "Data organization & analysis"],
              ["02", "Power BI", "Dashboards & visualization"],
              ["03", "Database Fundamentals", "Structured data concepts"],
              ["04", "Communication", "Sharing insights clearly"],
              ["05", "Teamwork", "Collaborative problem-solving"],
              ["06", "Continuous Learning", "Always improving"],
            ].map(([number, title, description]) => (
              <article className="skill-card" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="projects section" id="projects">
          <p className="eyebrow">03 / SELECTED WORK</p>
          <h2>Projects & Case Studies</h2>
          <p className="section-description">
            A space for my data analytics projects, interactive dashboards,
            and practical learning experiences.
          </p>

          {projects.length > 0 ? (
            <div className="portfolio-project-grid">
              {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
          ) : (
            <div className="empty-projects">
              <div className="empty-icon">↗</div>
              <h3>Projects coming soon</h3>
              <p>My work will appear here as I prepare each project for my portfolio.</p>
            </div>
          )}
        </section>

        <section className="certificates section" id="certificates">
          <p className="eyebrow">04 / CERTIFICATES</p>
          <h2>Learning & Achievements</h2>
          <p className="section-description">A collection of certificates and milestones.</p>
          {certificates.length > 0 ? (
            <div className="portfolio-certificate-grid">
              {certificates.map((certificate) => (
                <CertificateCard key={certificate.id} certificate={certificate} onOpen={setSelectedCertificate} />
              ))}
            </div>
          ) : (
            <div className="empty-projects">
              <div className="empty-icon">✦</div>
              <h3>Certificates coming soon</h3>
              <p>Certificates will appear here as they are added to the portfolio.</p>
            </div>
          )}
        </section>

        <section className="contact section" id="contact">
          <p className="eyebrow">05 / GET IN TOUCH</p>
          <h2>
            Have a project in mind?
            <br />
            <span>Let's connect.</span>
          </h2>
          <p className="section-description">
            I'm always interested in learning, collaborating, and exploring
            opportunities in data analytics.
          </p>
          <ContactLinks />
        </section>

      </main>

      <footer className="footer">
        <a className="logo" href="#home">OB<span>.</span></a>
        <p>Designed to turn data into meaningful insights.</p>
        <ContactLinks footer />
        <p>© {copyrightYear} Omar Boghdady</p>
      </footer>
      {selectedCertificate && <CertificateLightbox certificate={selectedCertificate} onClose={() => setSelectedCertificate(null)} />}
    </div>
  );
}

export default App;
