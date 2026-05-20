import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import './App.css'
import profilePhoto from './assets/profile.png'
import receiptCert from './assets/receipt-certificate.png'
import receiptInvite from './assets/receipt-invite.png'
import balcitaLogo from './assets/balcita-logo.svg'
import balcitaIcon from './assets/balcita-logo-icon.png'
import fujitsuLogo from './assets/fujitsu-logo.png'

// ===== SVG Icons =====
const IconNetwork = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="4" r="2.5" />
    <circle cx="4" cy="20" r="2.5" />
    <circle cx="20" cy="20" r="2.5" />
    <line x1="12" y1="6.5" x2="5.5" y2="17.5" />
    <line x1="12" y1="6.5" x2="18.5" y2="17.5" />
    <line x1="6.5" y1="20" x2="17.5" y2="20" />
  </svg>
)

const IconMonitor = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="13" rx="2" />
    <polyline points="8 21 12 17 16 21" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <polyline points="5 9 8 12 12 9 16 12 19 9" />
  </svg>
)

const IconFiber = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M3 12 C6 4, 10 4, 12 12 S18 20, 21 12" />
    <circle cx="3" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="21" cy="12" r="1.5" fill="currentColor" stroke="none" />
  </svg>
)

const IconServer = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="1.5" />
    <rect x="2" y="14" width="20" height="8" rx="1.5" />
    <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
    <circle cx="18" cy="18" r="1" fill="currentColor" stroke="none" />
    <line x1="6" y1="6" x2="13" y2="6" />
    <line x1="6" y1="18" x2="13" y2="18" />
  </svg>
)

const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2 L20 6 L20 12 C20 17.5 16 21.5 12 22 C8 21.5 4 17.5 4 12 L4 6 Z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
)

const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const IconGitHub = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
  </svg>
)

// ===== Hooks =====
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

function useTypewriter(items, typeSpeed = 80, deleteSpeed = 45, pauseTime = 2200) {
  const [displayed, setDisplayed] = useState('')
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = items[index]
    let timeout

    if (!deleting && displayed === current) {
      timeout = setTimeout(() => setDeleting(true), pauseTime)
    } else if (deleting && displayed === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % items.length)
    } else if (deleting) {
      timeout = setTimeout(() => setDisplayed((d) => d.slice(0, -1)), deleteSpeed)
    } else {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), typeSpeed)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, index])

  return displayed
}

// ===== Components =====
function FadeIn({ tag: Tag = 'div', children, ...props }) {
  const ref = useFadeIn()
  return <Tag ref={ref} className={`fade-in${props.className ? ' ' + props.className : ''}`} {...props}>{children}</Tag>
}

function StatCounter({ value, label }) {
  const ref = useRef(null)
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  const num = parseInt(value)
  const isNumeric = !isNaN(num)
  const suffix = isNumeric ? value.replace(String(num), '') : ''

  useEffect(() => {
    if (!isNumeric) return
    const el = ref.current
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect() } },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started || !isNumeric) return
    const startTime = performance.now()
    const duration = 1400
    const animate = (now) => {
      const t = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setCount(Math.floor(eased * num))
      if (t < 1) requestAnimationFrame(animate)
      else setCount(num)
    }
    requestAnimationFrame(animate)
  }, [started])

  return (
    <div className="stat-item" ref={ref}>
      <span className="stat-value">{isNumeric ? `${count}${suffix}` : value}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

// ===== Data =====
const HERO_ROLES = [
  'IT Network Engineer',
  'NOC & Infrastructure Ops',
  'CCNA Certified',
  'Fiber Optic Specialist',
]

const experience = [
  {
    company: 'BALCITA Fiber Optic Installation Services',
    companyLogo: balcitaIcon,
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
    companyLogo: fujitsuLogo,
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
  {
    company: 'BALCITA Fiber Optic Installation Services',
    companyLogo: balcitaIcon,
    role: 'Web Developer — In-House Project',
    period: '2026',
    sub: 'Internal Web Development',
    clients: null,
    note: null,
    bullets: [
      'Designed and developed the company website from scratch using Angular 21, TypeScript, HTML5, and CSS3 — building multiple pages including Home, About, Services, Portfolio, Clients, Team, and Contact.',
      'Deployed and hosted the live site on Netlify with continuous deployment (CD) connected to GitHub, ensuring automatic builds on every code push.',
      'Managed full version control using Git and GitHub throughout the entire development process, maintaining clean commit history and project structure.',
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
  { name: 'OKADA Manila', industry: 'Entertainment & Integrated Resort' },
  { name: 'Manila Water', industry: 'Utilities' },
  { name: 'Total Information Management (TIM)', industry: 'IT Services' },
]

const projects = [
  {
    title: 'BALCITA Fiber Optics',
    desc: 'Led field deployments and site assessments under BALCITA Fiber Optics, including HPE Aruba access point installations and the NIR Backbone and WLAN Deployment project for Equinix (MN1 and MN2 sites, August 2025). Also designed and developed the company website from scratch using Angular 21, TypeScript, HTML5, and CSS3, deployed on Netlify with continuous deployment.',
    images: [balcitaLogo],
    tags: ['HPE Aruba', 'WLAN Deployment', 'Site Assessment', 'Equinix', 'Angular 21', 'TypeScript', 'Netlify'],
    live: 'https://balcita-fiberoptics.netlify.app/home',
    github: null,
  },
  {
    title: 'ReceiptCo Mobile App',
    award: 'Best Research in Science and Technology, LPU 18th Annual Best Student Research Forum, March 10, 2025 · Accepted for Oral Presentation, Asian Graduate Studies Summit 2025 (A-GRASS 2025), Ho Chi Minh City, Vietnam, May 21-24, 2025',
    desc: 'BS Thesis, a monitoring mobile app for financial management with receipt scanner using Optical Character Recognition (OCR). Selected to represent the College of Technology at the LPU Annual Best Student Research Forum, and accepted for Oral Presentation at the Asian Graduate Studies Summit 2025 in Ho Chi Minh City, Vietnam.',
    team: 'Marc Joseph G. Balcita · Mathew A. Dela Cruz · Joseph Andrian O. Mabalot',
    images: [receiptCert, receiptInvite],
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
    icon: IconNetwork,
    title: 'Network Design & Deployment',
    desc: 'Enterprise LAN/WAN design, VLAN configuration, inter-VLAN routing, OSPF/EIGRP, and multi-site Cisco infrastructure deployment.',
  },
  {
    icon: IconMonitor,
    title: 'NOC & 24/7 Operations',
    desc: 'Tier 1/L1 NOC monitoring, incident triage, SLA-based escalation, and proactive infrastructure health monitoring using Uptime Kuma and Zabbix.',
  },
  {
    icon: IconFiber,
    title: 'Fiber Optic & Structured Cabling',
    desc: 'Enterprise backbone termination, fusion splicing, ODF/FDB installation, and OTDR/Fluke acceptance testing for data centers and corporate sites.',
  },
  {
    icon: IconServer,
    title: 'Data Center & Rack Buildout',
    desc: 'Full rack assembly, patch panel installation, structured patching, airflow management, and cable labeling for enterprise and co-location environments.',
  },
  {
    icon: IconShield,
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

// ===== EmailJS Config =====
// Replace these with your real IDs from emailjs.com dashboard
const EMAILJS_SERVICE_ID      = 'service_jfskfli'
const EMAILJS_NOTIFY_TEMPLATE = 'template_jp481po'
const EMAILJS_REPLY_TEMPLATE  = 'template_7vn2yga'
const EMAILJS_PUBLIC_KEY      = 'RRKmtH6TWKpMSgL34'

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
  const [showTop, setShowTop] = useState(false)
  const [formState, setFormState] = useState('idle') // 'idle' | 'sending' | 'sent' | 'error'
  const [lightbox, setLightbox] = useState(null)
  const active = useActiveSection(['services', 'about', 'experience', 'clients', 'projects', 'skills', 'contact'])
  const typedRole = useTypewriter(HERO_ROLES)
  const menuRef = useRef(null)
  const formRef = useRef(null)

  const closeMenu = () => setMenuOpen(false)
  const openLightbox = (src, alt) => setLightbox({ src, alt })
  const closeLightbox = () => setLightbox(null)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const handleOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) closeMenu()
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [menuOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormState('sending')
    try {
      // Send notification to Marc
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_NOTIFY_TEMPLATE,
        formRef.current,
        EMAILJS_PUBLIC_KEY,
      )
      // Send auto-reply to the person who contacted
      const data = new FormData(formRef.current)
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_REPLY_TEMPLATE,
        { to_name: data.get('name'), to_email: data.get('email') },
        EMAILJS_PUBLIC_KEY,
      )
      setFormState('sent')
      formRef.current.reset()
    } catch {
      setFormState('error')
    }
  }

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => { if (e.key === 'Escape') closeLightbox() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  return (
    <>
      <nav className="navbar" ref={menuRef}>
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
        <div className="nav-icons">
          <a href="https://linkedin.com/in/marc-joseph-balcita-95b528284" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <IconLinkedIn />
          </a>
          <a href="https://github.com/Lycheegrr" target="_blank" rel="noreferrer" aria-label="GitHub">
            <IconGitHub />
          </a>
        </div>
        <button className={`hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </nav>

      <section id="hero">
        <div className="hero-content">
          <div className="open-badge">Open to Opportunities</div>
          <p className="hero-greeting">Hi, I'm</p>
          <h1>Marc Joseph G. Balcita</h1>
          <p className="hero-title">
            <span>{typedRole}</span>
            <span className="cursor" aria-hidden="true" />
          </p>
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
          <StatCounter key={s.label} value={s.value} label={s.label} />
        ))}
      </div>

      <FadeIn tag="section" id="services">
        <h2>What I Do</h2>
        <div className="services-grid">
          {services.map((s) => {
            const ServiceIcon = s.icon
            return (
              <div className="service-card" key={s.title}>
                <span className="service-icon"><ServiceIcon /></span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            )
          })}
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
              a BS in Information Technology, demonstrating the ability to apply academic learning
              directly in live production settings from early in my career.
            </p>
            <div className="about-edu">
              <span className="edu-degree">BS Information Technology (Information Security)</span>
              <span className="edu-school">Lyceum of the Philippines University, Sep 2020 - Sep 2024</span>
              <span className="edu-note">Working in enterprise environments from Jan 2023 while completing degree</span>
            </div>
            <a href="#" className="btn btn-primary" download>Download Resume</a>
          </div>
        </div>
      </FadeIn>

      <FadeIn tag="section" id="experience">
        <h2>Experience</h2>
        <div className="experience-list">
          {experience.map((job, i) => (
            <div className="exp-card" key={`${job.company}-${i}`}>
              <div className="exp-header">
                <div className="exp-title-block">
                  <div className="exp-company-row">
                    {job.companyLogo && <img src={job.companyLogo} alt={job.company} className="exp-company-logo" loading="lazy" />}
                    <h3>{job.company}</h3>
                  </div>
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
                {job.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
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
              {project.images ? (
                <div className="project-img-gallery">
                  {project.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${project.title} ${i + 1}`}
                      className="project-gallery-img"
                      loading="lazy"
                      onClick={() => openLightbox(img, `${project.title} ${i + 1}`)}
                    />
                  ))}
                </div>
              ) : (
                <div className="project-img-placeholder">Preview</div>
              )}
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
        <form className="contact-form" onSubmit={handleSubmit} ref={formRef}>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" rows={5} required />
          <button type="submit" className="btn btn-primary" disabled={formState === 'sending'}>
            {formState === 'sending' ? 'Sending…' : 'Send Message'}
          </button>
        </form>
        {formState === 'sent' && (
          <p className="form-feedback form-success">
            Message sent! Check your inbox — a confirmation has been sent to you. I'll be in touch shortly.
          </p>
        )}
        {formState === 'error' && (
          <p className="form-feedback form-error">
            Something went wrong. Email me directly at{' '}
            <a href="mailto:mjbalcitaa@gmail.com">mjbalcitaa@gmail.com</a>.
          </p>
        )}
        <div className="contact-meta">
          <span>Pateros, Metro Manila, Philippines</span>
          <span>0918 266 1465</span>
          <a href="mailto:mjbalcitaa@gmail.com">mjbalcitaa@gmail.com</a>
        </div>
        <div className="social-links">
          <a href="https://linkedin.com/in/marc-joseph-balcita-95b528284" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/Lycheegrr" target="_blank" rel="noreferrer">GitHub</a>
          <a href="mailto:mjbalcitaa@gmail.com">Email</a>
        </div>
      </FadeIn>

      <footer>
        <p>Built by Marc Joseph G. Balcita &copy; {new Date().getFullYear()}</p>
      </footer>

      <button
        className={`scroll-top${showTop ? ' visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        ↑
      </button>

      {lightbox && (
        <div className="lightbox-overlay" onClick={closeLightbox} role="dialog" aria-modal="true">
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">✕</button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}

export default App
