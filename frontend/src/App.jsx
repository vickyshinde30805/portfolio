import { useEffect, useState } from 'react';
import { fetchPortfolioProfile } from './services/api';

export default function App() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchPortfolioProfile();
        setProfile(data);
      } catch (err) {
        setError(err.message || 'Unable to load profile data.');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return <div className="page-shell"><div className="loading">Loading portfolio...</div></div>;
  }

  if (error || !profile) {
    return <div className="page-shell"><div className="error-box">{error || 'Unable to load profile data.'}</div></div>;
  }

  const {
    full_name,
    headline,
    summary,
    github,
    leetcode,
    stats = [],
    projects = [],
    skills = [],
    activities = [],
    badges = [],
  } = profile;

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="container nav">
          <div className="brand">{full_name}</div>
          <nav>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#activity">Activity</a>
          </nav>
        </div>
      </header>

      <main className="container">
        <section className="hero section-gap">
          <div>
            <p className="eyebrow">Software Engineer in progress</p>
            <h1>{full_name}</h1>
            <p className="headline">{headline}</p>
            <p className="summary">{summary}</p>
            <div className="cta-row">
              <a className="btn primary" href={github} target="_blank" rel="noreferrer">GitHub Profile</a>
              <a className="btn secondary" href={leetcode} target="_blank" rel="noreferrer">LeetCode Profile</a>
            </div>
          </div>

          <aside className="panel stats-panel">
            <h3>LeetCode</h3>
            <p className="muted">Public profile overview</p>
            {activities.map((item) => (
              <div key={item.label} className="progress-row">
                <span>{item.label}</span>
                <div className="track"><div className="bar" style={{ width: `${Math.min((item.count / 140) * 100, 100)}%` }} /></div>
                <strong>{item.count}</strong>
              </div>
            ))}
            <div className="badge-group">
              {badges.map((badge) => (
                <span key={badge} className="badge">{badge}</span>
              ))}
            </div>
          </aside>
        </section>

        <section id="activity" className="stats-grid">
          {stats.map((stat) => (
            <div className="stat-card panel" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>

        <section id="about" className="section-gap">
          <h2>About</h2>
          <p className="paragraph">I am in my fourth year of B.Tech in Computer Science and Engineering at Nutan College of Engineering and Research (DBATU), graduating in 2027.</p>
          <p className="paragraph">My goal is to become a software engineer. I am working toward it through full stack Python development, data structures and algorithms, cloud, and AI/ML, and I learn best by building real projects and entering hackathons.</p>
        </section>

        <section id="projects" className="section-gap">
          <h2>Projects</h2>
          <div className="project-grid">
            {projects.map((project) => (
              <article key={project.title} className="project-card panel">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tag-list">
                  {project.tech_stack.map((tag) => (
                    <span key={`${project.title}-${tag}`} className="tag">{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section-gap">
          <h2>Skills</h2>
          <div className="skills-list">
            {skills.map((group) => (
              <div key={group.category} className="skill-group panel">
                <h3>{group.category}</h3>
                <div className="tag-list">
                  {group.items.map((item) => (
                    <span key={item} className="tag">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
