import { useState, useEffect, useRef } from 'react'
import './App.css'
import profilePhoto from './assets/profile.png'

function useActiveSection(ids) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const observers = ids.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])
  return active
}

function useFadeIn() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

const experience = [
  {
    company: 'BALCITA Fiber Optic Installation Services',
    role: 'Network & Infrastructure Engineer',
    period: 'Jan 2023 – Present',
    sub: 'Project-Based / Site Deployment | Subcontractor — TechConnect I.T. Solutions',
    note: 'Field & site-based engagement with flexible scheduling — ran concurrently with university studies and OJT (2023–2024).',
    clients: 'St. Luke\'s Medical Center (QC & BGC), Bangko Sentral ng Pilipinas, San Miguel Corporation, Procter & Gamble, OKADA Manila, PLDT Vitro (Makati & Pasig), Equinix, Manila Water, TIM',
    bullets: [
      'Delivered enterprise fiber backbone termination, fusion splicing, and structured cabling across multiple sites, including hospitals, data centers, and corporate environments.',
      'Performed OTDR, Fluke copper/fiber, LinkWare, and Anritsu testing for commissioning, troubleshooting, and client acceptance.',
      'Installed, labeled, and documented fiber infrastructure in ODFs, FDBs, splice trays, and rack-mounted enclosures.',
      'Built and organized server racks, patch panels, switches, firewalls, and fiber distribution frames; executed rack-to-rack and rack-to-endpoint patching with proper labeling, airflow consideration, and bend-radius compliance.',
      'Supported deployment, validation, and connectivity checks for 100+ endpoints and access points, including enterprise Wi-Fi, IP cameras, IP phones, and network-connected devices.',
      'Configured and validated Cisco switches and routers for basic setup, VLAN mapping, and connectivity testing; supported Juniper Wi-Fi AP deployments and network troubleshooting.',
      'Monitored connectivity incidents and performed first-line troubleshooting including AP restarts, DHCP verification, and wired vs. wireless isolation; escalated unresolved incidents to Tier 2 with full logs.',
      'Supported controlled maintenance activities including service restarts, validation checks, and post-change service health confirmation.',
      'Supported bidding cost estimates, quotation preparation, and material scope validation for telecom and fiber optic infrastructure works.',
      'Coordinated technical staff and supervised site ocular inspections to validate project scope, materials, and implementation requirements.',
      'Prepared progress reports, bill of quantities, as-built plans, and test result documentation for completed works including projects under PLDT Metro Manila Operations.',
    ],
  },
  {
    company: 'Fujitsu Philippines Inc.',
    role: 'IT Infrastructure and Systems Support Intern',
    period: 'Nov 2023 – Apr 2024',
    sub: 'University OJT Internship — Digital Systems Platform Unit (DSPU)',
    clients: null,
    note: 'Completed as part of BS Information Technology degree requirements (Lyceum of the Philippines University), running concurrently with ongoing project-based field work.',
    bullets: [
      'Monitored network gateways, internal services, and infrastructure availability using Uptime Kuma and alert dashboards.',
      'Assisted in incident detection, service validation, and support for gateways, switches, servers, and internal connectivity.',
      'Performed endpoint and workstation troubleshooting including Wi-Fi, internet access, user readiness, and remote support.',
      'Accessed routers, switches, and servers using SecureCRT and PuTTY for validation and basic support tasks.',
      'Supported endpoint security operations using Sophos Endpoint and Microsoft Defender.',
      'Used virtual machines for testing, patching, and controlled troubleshooting.',
      'Logged and updated incidents and change activities in ServiceNow and Spiceworks under ITIL-aligned processes.',
    ],
  },
]

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '9+', label: 'Enterprise Clients' },
  { value: '100+', label: 'Endpoints per Engagement' },
  { value: 'CCNA', label: 'Cisco Certified' },
]

const clients = [
  { name: 'Bangko Sentral ng Pilipinas', industry: 'Banking & Finance' },
  { name: 'Equinix', industry: 'Data Center' },
  { name: 'St. Luke\'s Medical Center', industry: 'Healthcare' },
  { name: 'San Miguel Corporation', industry: 'FMCG / Conglomerate' },
  { name: 'Procter & Gamble', industry: 'FMCG' },
  { name: 'PLDT Vitro', industry: 'Telecommunications' },
  { name: 'OKADA Manila', industry: 'Hospitality' },
  { name: 'Manila Water', industry: 'Utilities' },
  { name: 'Total Information Management (TIM)', industry: 'IT Services' },
]

const projects = [
  {
    title: 'BALCITA Fiber Optics Website',
    desc: 'Designed and developed the company website from scratch using Angular 21, TypeScript, HTML5, and CSS3. Deployed on Netlify with continuous deployment connected to GitHub.',
    tags: ['Angular 21', 'TypeScript', 'HTML5', 'CSS3', 'Netlify', 'GitHub'],
    live: 'https://balcita-fiberoptics.netlify.app/home',
    github: null,
  },
  {
    title: 'ReceiptCo Mobile App',
    award: 'Best Research in Science and Technology — LPU 18th Annual Best Student Research Forum, March 10, 2025',
    desc: 'BS Thesis — a monitoring mobile app for financial management with receipt scanner using Optical Character Recognition (OCR). Selected to represent the College of Technology at the LPU Annual Best Student Research Forum.',
    team: 'Marc Joseph G. Balcita · Mathew A. Dela Cruz · Joseph Andrian O. Mabalot',
    tags: ['Mobile App', 'OCR', 'Financial Management', 'Thesis', 'LPU College of Technology'],
    live: null,
    github: null,
  },
]

const skillCategories = [
  {
    label: 'Networking & Routing',
    skills: ['LAN/WAN', 'VLANs', 'STP / RSTP / MSTP', 'OSPF', 'EIGRP', 'BGP Awareness', 'Subnetting', 'DHCP', 'DNS', 'NAT', 'ACLs', 'MPLS Awareness'],
  },
  {
    label: 'Security & VPN',
    skills: ['Palo Alto Firewall', 'GlobalProtect VPN', 'IDS / IPS', 'Port Security', 'Network Segmentation', 'Kali Linux', 'Wireshark'],
  },
  {
    label: 'Linux & Systems',
    skills: ['RHEL (Install, Config, Patch)', 'User & Group Management', 'YUM / DNF', 'Shell Scripting', 'Cron Jobs', 'MariaDB', 'Apache Web Server', 'VMware / Hyper-V'],
  },
  {
    label: 'Enterprise Platforms',
    skills: ['Cisco Catalyst', 'Cisco Meraki', 'Juniper', 'Nokia', 'AudioCodes SBC', 'Cisco CUCM', 'PABX', 'Poly / AV Systems'],
  },
  {
    label: 'Monitoring & Tools',
    skills: ['Uptime Kuma', 'Zabbix', 'Wireshark', 'SecureCRT', 'PuTTY', 'Postman', 'Quick Assist', 'RDP'],
  },
  {
    label: 'Cloud & Microsoft',
    skills: ['Microsoft 365', 'Azure Portal', 'Intune MDM', 'Active Directory', 'Exchange', 'Group Policy'],
  },
  {
    label: 'Physical Infrastructure',
    skills: ['Rack Buildout', 'Structured Cabling', 'Patch Panels', 'OTDR', 'Fluke / Anritsu', 'Fusion Splicing', 'ODF / FDB', 'Fiber Power Meter', 'NAP Testing', 'Control Panel Wiring'],
  },
  {
    label: 'ITSM & Change Management',
    skills: ['ServiceNow', 'Znuny / OTRS', 'Spiceworks', 'ITIL', 'RFC / MOP Creation', 'Change Management', 'SLA Adherence'],
  },
  {
    label: 'Web Development',
    skills: ['Angular 21', 'TypeScript', 'HTML5 / CSS3', 'Git', 'GitHub', 'Netlify CD', 'VS Code'],
  },
]

const services = [
  {
    icon: '⬡',
    title: 'Network Design & Deployment',
    desc: 'Enterprise LAN/WAN design, VLAN configuration, inter-VLAN routing, OSPF/EIGRP, and multi-site Cisco infrastructure deployment.',
  },
  {
    icon: '◈',
    title: 'NOC & 24/7 Operations',
    desc: 'Tier 1/L1 NOC monitoring, incident triage, SLA-based escalation, and proactive infrastructure health monitoring using Uptime Kuma and Zabbix.',
  },
  {
    icon: '◎',
    title: 'Fiber Optic & Structured Cabling',
    desc: 'Enterprise backbone termination, fusion splicing, ODF/FDB installation, and OTDR/Fluke acceptance testing for data centers and corporate sites.',
  },
  {
    icon: '▣',
    title: 'Data Center & Rack Buildout',
    desc: 'Full rack assembly, patch panel installation, structured patching, airflow management, and cable labeling for enterprise and co-location environments.',
  },
  {
    icon: '◬',
    title: 'Security & VPN',
    desc: 'Palo Alto firewall policy management, GlobalProtect VPN deployment and validation, IDS/IPS configuration, and network access control.',
  },
]

const certifications = [
  { label: 'Best Research in Science and Technology — LPU 18th Annual Best Student Research Forum', detail: 'Certificate of Recognition, Mar 2025' },
  { label: 'Cisco Certified Network Associate (CCNA)', detail: 'Active' },
  { label: 'Fiber Optic Termination and Testing', detail: 'Training Certification' },
  { label: 'Fluke Networks Copper and Fiber Testing', detail: 'Training Certification' },
  { label: 'Telephone Copper and Fiber Cable Splicing, Termination, and Testing', detail: 'Training Certification' },
]

const training = [
  {
    label: 'Network Engineer – CCNA Bootcamp (Hands-On Training)',
    org: 'Rivan IT / RivanCyber Training Institute',
    date: 'Sep 2025',
    detail: 'LAN/WAN topology setup, VLANs and trunking, OSPF and EIGRP fundamentals, subnetting, IP tools and diagnostics, ACL basics, wireless fundamentals, and simulated WAN validation.',
  },
]

function FadeIn({ tag: Tag = 'div', children, ...props }) {
  const ref = useFadeIn()
  return <Tag ref={ref} className={`fade-in${props.className ? ' ' + props.className : ''}`} {...props}>{children}</Tag>
}

const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#clients', label: 'Clients' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(['services', 'about', 'experience', 'clients', 'projects', 'skills', 'contact'])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav className="navbar">
        <span className="nav-logo">Marc J. Balcita</span>
        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className={active === href.slice(1) ? 'nav-active' : ''} onClick={closeMenu}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <button className={`hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </nav>

      <section id="hero">
        <div className="hero-content">
          <div className="open-badge">Open to Opportunities</div>
          <p className="hero-greeting">Hi, I'm</p>
          <h1>Marc Joseph G. Balcita</h1>
          <p className="hero-title">IT Network Engineer &amp; CCNA Certified</p>
          <p className="hero-sub">
            NOC &amp; Infrastructure Operations — 3+ years delivering enterprise network design,
            security, and multi-site deployments across banking, healthcare, telecom, and data center environments.
          </p>
          <div className="hero-actions">
            <a href="#experience" className="btn btn-primary">View Experience</a>
            <a href="#contact" className="btn btn-outline">Contact Me</a>
          </div>
        </div>
      </section>

      <div className="stats-bar">
        {stats.map((s) => (
          <div className="stat-item" key={s.label}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <FadeIn tag="section" id="services">
        <h2>What I Do</h2>
        <div className="services-grid">
          {services.map((s) => (
            <div className="service-card" key={s.title}>
              <span className="service-icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn tag="section" id="about">
        <h2>About Me</h2>
        <div className="about-grid">
          <div className="about-avatar">
            <img src={profilePhoto} alt="Marc Joseph G. Balcita" className="avatar-img" />
          </div>
          <div className="about-text">
            <p>
              CCNA-certified IT Network Engineer with 3+ years of hands-on experience designing,
              implementing, and maintaining enterprise network infrastructure across corporate, healthcare,
              banking, telecom, and data center environments.
            </p>
            <p>
              Experienced in Cisco routing and switching, VLAN configuration, OSPF, EIGRP, Palo Alto
              firewall management, GlobalProtect VPN deployment, IDS/IPS monitoring, and structured
              incident and change management. Delivered multi-site infrastructure for clients including
              Bangko Sentral ng Pilipinas, Equinix, PLDT Vitro, St. Luke's Medical Center BGC, and
              San Miguel Corporation across Luzon, Visayas, and Mindanao.
            </p>
            <p>
              Started working in enterprise network environments in 2023 while concurrently completing
              a BS in Information Technology — demonstrating the ability to apply academic learning
              directly in live production settings from early in my career.
            </p>
            <div className="about-edu">
              <span className="edu-degree">BS Information Technology (Information Security)</span>
              <span className="edu-school">Lyceum of the Philippines University — Sep 2020 – Sep 2024</span>
              <span className="edu-note">Working in enterprise environments from Jan 2023 while completing degree</span>
            </div>
            <a href="#" className="btn btn-primary" download>Download Resume</a>
          </div>
        </div>
      </FadeIn>

      <FadeIn tag="section" id="experience">
        <h2>Experience</h2>
        <div className="experience-list">
          {experience.map((job) => (
            <div className="exp-card" key={job.company}>
              <div className="exp-header">
                <div className="exp-title-block">
                  <h3>{job.company}</h3>
                  <p className="exp-role">{job.role}</p>
                  {job.sub && <p className="exp-sub">{job.sub}</p>}
                  {job.clients && (
                    <p className="exp-clients">
                      <strong>Key Clients:</strong> {job.clients}
                    </p>
                  )}
                  {job.note && <p className="exp-note">{job.note}</p>}
                </div>
                <span className="exp-period">{job.period}</span>
              </div>
              <ul className="exp-bullets">
                {job.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn tag="section" id="clients">
        <h2>Enterprise Clients</h2>
        <p className="clients-sub">Environments I've deployed, configured, and supported across Luzon, Visayas &amp; Mindanao</p>
        <div className="clients-grid">
          {clients.map((c) => (
            <div className="client-card" key={c.name}>
              <span className="client-name">{c.name}</span>
              <span className="client-industry">{c.industry}</span>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn tag="section" id="projects">
        <h2>Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div className="project-card" key={project.title}>
              <div className="project-img-placeholder">Preview</div>
              <div className="project-info">
                {project.award && (
                  <div className="project-award">
                    <span className="award-icon">🏆</span>
                    {project.award}
                  </div>
                )}
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                {project.team && <p className="project-team">{project.team}</p>}
                <div className="project-tags">
                  {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                </div>
                <div className="project-links">
                  {project.live && (
                    <a href={project.live} className="btn btn-sm btn-primary" target="_blank" rel="noreferrer">Live Site</a>
                  )}
                  {project.github && (
                    <a href={project.github} className="btn btn-sm btn-outline" target="_blank" rel="noreferrer">GitHub</a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn tag="section" id="skills">
        <h2>Skills</h2>
        <div className="skills-categories">
          {skillCategories.map((cat) => (
            <div className="skill-category" key={cat.label}>
              <h3 className="skill-cat-label">{cat.label}</h3>
              <div className="skills-grid">
                {cat.skills.map((skill) => (
                  <span className="skill-badge" key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="certifications">
          <h3>Certifications</h3>
          <ul className="cert-list">
            {certifications.map((cert, i) => (
              <li key={i}>
                <span className="cert-label">{cert.label}</span>
                <span className="cert-detail">{cert.detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="certifications" style={{ marginTop: '24px' }}>
          <h3>Professional Training</h3>
          {training.map((t) => (
            <div className="training-item" key={t.label}>
              <div className="training-header">
                <span className="training-label">{t.label}</span>
                <span className="cert-detail">{t.date}</span>
              </div>
              <span className="training-org">{t.org}</span>
              <p className="training-detail">{t.detail}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn tag="section" id="contact">
        <h2>Get In Touch</h2>
        <p className="contact-sub">
          Open to network engineering opportunities, consulting, and collaborations.
          My inbox is always open.
        </p>
        <form
          className="contact-form"
          action="https://formspree.io/f/mjbalcitaa"
          method="POST"
        >
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" rows={5} required />
          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
        <div className="contact-meta">
          <span>Pateros, Metro Manila, Philippines</span>
          <span>0918 266 1465</span>
          <a href="mailto:mjbalcitaa@gmail.com">mjbalcitaa@gmail.com</a>
        </div>
        <div className="social-links">
          <a href="https://linkedin.com/in/marc-joseph-balcita-95b528284" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:mjbalcitaa@gmail.com">Email</a>
        </div>
      </FadeIn>

      <footer>
        <p>Built by Marc Joseph G. Balcita &copy; {new Date().getFullYear()}</p>
      </footer>
    </>
  )
}

export default App
