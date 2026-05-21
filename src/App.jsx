import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import './App.css'
import profilePhoto from './assets/profile.png'
import receiptCert from './assets/receipt-certificate.png'
import receiptInvite from './assets/receipt-invite.png'
import balcitaLogo from './assets/balcita-logo.svg'
import balcitaScreenshot from './assets/balcita-screenshot.png'
import balcitaIcon from './assets/balcita-logo-icon.png'
import fujitsuLogo from './assets/fujitsu-logo.png'
import portfolioLogo from './assets/portfolio-logo.jpg'

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

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <polyline points="2 7 12 13 22 7" />
  </svg>
)

const INDUSTRY_ICONS = {
  'Banking & Finance': () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <polyline points="3 9 12 3 21 9" /><line x1="3" y1="9" x2="21" y2="9" />
      <line x1="5" y1="9" x2="5" y2="20" /><line x1="12" y1="9" x2="12" y2="20" /><line x1="19" y1="9" x2="19" y2="20" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  ),
  'Data Center': () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="7" rx="1" /><rect x="2" y="14" width="20" height="7" rx="1" />
      <circle cx="18" cy="6.5" r="1" fill="currentColor" stroke="none" /><circle cx="18" cy="17.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  'Healthcare': () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  ),
  'FMCG / Conglomerate': () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="11" width="5" height="10" /><rect x="9.5" y="6" width="5" height="15" /><rect x="17" y="14" width="5" height="7" />
      <line x1="1" y1="21" x2="23" y2="21" />
    </svg>
  ),
  'FMCG': () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="11" width="5" height="10" /><rect x="9.5" y="6" width="5" height="15" /><rect x="17" y="14" width="5" height="7" />
      <line x1="1" y1="21" x2="23" y2="21" />
    </svg>
  ),
  'Telecommunications': () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M4.5 19.5 A10.6 10.6 0 0 1 19.5 4.5" /><path d="M7.5 16.5 A7.5 7.5 0 0 1 16.5 7.5" />
      <path d="M10.5 13.5 A4.2 4.2 0 0 1 13.5 10.5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  'Entertainment & Integrated Resort': () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
    </svg>
  ),
  'Utilities': () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C12 2 5 10 5 14a7 7 0 0014 0C19 10 12 2 12 2z" />
    </svg>
  ),
  'IT Services': () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
    </svg>
  ),
  'Real Estate': () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <rect x="9" y="14" width="6" height="7" />
    </svg>
  ),
}

const LogoMark = () => (
  <svg viewBox="0 0 28 28" width="26" height="26" fill="none" aria-hidden="true">
    <line x1="14" y1="3.5" x2="3.5" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="14" y1="3.5" x2="24.5" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="3.5" y1="14" x2="14" y2="24.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="24.5" y1="14" x2="14" y2="24.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="3.5" y1="14" x2="24.5" y2="14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
    <circle cx="14" cy="3.5" r="2.5" fill="currentColor" />
    <circle cx="3.5" cy="14" r="2.5" fill="currentColor" />
    <circle cx="24.5" cy="14" r="2.5" fill="currentColor" />
    <circle cx="14" cy="24.5" r="2.5" fill="currentColor" />
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
    sub: 'Project-Based / Site Deployment | Subcontractor -TechConnect I.T. Solutions',
    note: 'Field & site-based engagement -ran concurrently with university studies and OJT (2023–2024).',
    clients: null,
    bullets: [
      'Deployed enterprise fiber backbone across 9+ sites (banking, healthcare, telecom, data centers): fusion splicing, ODF/FDB termination, and OTDR/Fluke/Anritsu acceptance testing.',
      'Commissioned 100+ endpoints per engagement, including Wi-Fi APs, IP cameras, IP phones, and network devices; configured Cisco switches and routers for VLAN mapping and connectivity.',
      'Built server racks, patch panels, firewalls, and fiber distribution frames with proper labeling, airflow, and bend-radius compliance.',
      'Provided Tier 1 NOC monitoring in a 24/7 operations environment: incident triage, DHCP/AP troubleshooting, and SLA-aligned escalation with complete findings and logs.',
      'Supported Juniper Wi-Fi AP deployments, Nokia carrier-grade infrastructure validation, and CUCM IP phone configuration.',
      'Prepared as-built plans, BOQs, and test documentation; supervised site ocular inspections and coordinated technical staff.',
    ],
  },
  {
    company: 'Fujitsu Philippines Inc.',
    companyLogo: fujitsuLogo,
    role: 'IT Infrastructure and Systems Support Intern',
    period: 'Nov 2023 – Apr 2024',
    sub: 'University OJT Internship -Digital Systems Platform Unit (DSPU)',
    clients: null,
    note: 'Completed as part of BS Information Technology degree requirements (Lyceum of the Philippines University), concurrent with ongoing field work.',
    bullets: [
      'Provided Level 1/2 end-user desktop support across Windows and Microsoft 365 environments: troubleshooting connectivity, hardware, software, Exchange, and Office 365 issues for users across multiple locations and time zones (APAC, UK, US) via TeamViewer and AnyDesk.',
      'Administered Microsoft Azure Portal, Intune MDM (device enrollment, policy deployment, compliance), Active Directory (user account management, password resets), and Group Policy as part of daily infrastructure support workflows.',
      'Executed software and OS patching, version upgrades, and hardware installation; troubleshot workstations, Windows kiosks, AV systems (Poly/VC), and network printers (Canon/FollowYouPrint) including print server paths and GPO configuration.',
      'Monitored network gateways, switches, and servers using Uptime Kuma; logged incidents and changes in ServiceNow and Spiceworks under ITIL-aligned processes with SLA-compliant response times and complete audit records.',
      'Supported endpoint security operations using Sophos Endpoint and Microsoft Defender, assisting in threat detection, remediation, and user notification workflows.',
      'Coordinated with third-party vendors for warranty service and hardware support; accessed routers, switches, and servers via SecureCRT and PuTTY for remote diagnostics.',
    ],
  },
  {
    company: 'BALCITA Fiber Optic Installation Services',
    companyLogo: balcitaIcon,
    role: 'Web Developer -In-House Project',
    period: '2026',
    sub: 'Internal Web Development',
    clients: null,
    note: null,
    bullets: [
      'Designed and developed an 8-page company SPA from scratch using Angular 21 (Standalone Components), TypeScript 5.9, RxJS, HTML5, and CSS3.',
      'Built a serverless backend with Node.js and Netlify Functions: Nodemailer for transactional email, Netlify Forms for submission handling.',
      'Deployed on Netlify with GitHub CI/CD; wrote unit tests with Vitest and enforced formatting with Prettier.',
    ],
  },
]

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '10+', label: 'Industry Sectors' },
  { value: '100+', label: 'Endpoints per Engagement' },
  { value: 'CCNA', label: 'Cisco Certified' },
]

const clients = [
  { name: 'Financial Institution', industry: 'Banking & Finance' },
  { name: 'Co-location Data Center', industry: 'Data Center' },
  { name: 'Multi-Campus Hospital System', industry: 'Healthcare' },
  { name: 'Philippine Conglomerate', industry: 'FMCG / Conglomerate' },
  { name: 'Global Consumer Goods Firm', industry: 'FMCG' },
  { name: 'National Telco Provider', industry: 'Telecommunications' },
  { name: 'Integrated Resort & Casino', industry: 'Entertainment & Integrated Resort' },
  { name: 'National Water Utility', industry: 'Utilities' },
  { name: 'Managed IT Services Provider', industry: 'IT Services' },
  { name: 'Real Estate Developer', industry: 'Real Estate' },
]

const projects = [
  {
    title: 'BALCITA Fiber Optics -Field Deployments',
    desc: 'End-to-end field deployments across 9 enterprise sites spanning banking, healthcare, telecommunications, and data center environments. Commissioned 100+ endpoints per engagement, including Wi-Fi APs, IP cameras, IP phones, and network devices. Delivered Juniper AP63 and HPE Aruba WLAN deployments, fiber ODF and patch panel termination, Fluke and Anritsu MT9083 OTDR acceptance testing, and co-location data center site assessment.',
    images: [balcitaScreenshot],
    tags: ['Juniper AP63', 'HPE Aruba', 'WLAN Deployment', 'OTDR Testing', 'Fluke', 'Fiber ODF', 'Co-location DC', 'Site Assessment'],
    live: null,
    github: null,
  },
  {
    title: 'BALCITA Fiber Optics -Company Website',
    desc: 'Designed and developed an 8-page company SPA using Angular 21 (Standalone Components), TypeScript 5.9, RxJS, Node.js, and Netlify Functions. Features a serverless backend with Nodemailer for transactional email and Netlify Forms for form handling, 3D CSS animations, inline SVG icons, and a mobile-first responsive layout. Deployed on Netlify with CI/CD connected to GitHub.',
    images: [balcitaScreenshot],
    tags: ['Angular 21', 'TypeScript', 'Node.js', 'Netlify Functions', 'HTML5 / CSS3', 'GitHub CI/CD'],
    live: 'https://balcita-fiberoptics.netlify.app',
    github: 'https://github.com/BalcitaFiberOpticInstallation/BalcitaFiberoptic',
  },
  {
    title: 'Personal Portfolio Website',
    desc: 'Designed and built this single-page portfolio from scratch using React 19 and Vite 8 -no UI library. Implemented custom hooks for IntersectionObserver scroll-triggered animations, a typewriter effect, animated stat counters with easing curves, an image lightbox with keyboard support, and an EmailJS dual-send contact form (notification + auto-reply). Fully responsive with hamburger navigation and prefers-reduced-motion accessibility support.',
    images: [portfolioLogo],
    tags: ['React 19', 'Vite 8', 'EmailJS', 'IntersectionObserver', 'CSS Animations', 'Responsive Design'],
    live: 'https://marcbalcita.vercel.app',
    github: 'https://github.com/Lycheegrr',
  },
  {
    title: 'ReceiptCo Mobile App',
    award: 'Best Research in Science and Technology, LPU 18th Annual Best Student Research Forum, March 10, 2025 · Accepted for Oral Presentation, Asian Graduate Studies Summit 2025 (A-GRASS 2025), Ho Chi Minh City, Vietnam, May 21-24, 2025',
    desc: 'BS Thesis -a 3-person team mobile app for financial management with a receipt scanner powered by Optical Character Recognition (OCR) and backed by Firebase (Firestore, Authentication, Storage). Selected to represent the College of Technology at the LPU Annual Best Student Research Forum, and accepted for Oral Presentation at the Asian Graduate Studies Summit 2025 in Ho Chi Minh City, Vietnam.',
    team: 'Marc Joseph G. Balcita · Mathew A. Dela Cruz · Joseph Andrian O. Mabalot',
    images: [receiptCert, receiptInvite],
    tags: ['Mobile App', 'OCR', 'Firebase', 'Firestore', 'Financial Management', 'Thesis', 'LPU College of Technology'],
    live: null,
    github: null,
  },
]

const skillDomains = [
  {
    domain: 'Infrastructure & Networking',
    key: 'net',
    categories: [
      {
        label: 'Networking & Routing',
        skills: ['LAN/WAN', 'VLANs', 'STP / RSTP / MSTP', 'OSPF', 'EIGRP', 'BGP Awareness', 'Subnetting', 'DHCP', 'DNS', 'NAT', 'ACLs', 'MPLS Awareness'],
      },
      {
        label: 'Security & VPN',
        skills: ['Palo Alto Firewall', 'GlobalProtect VPN', 'IDS / IPS', 'Port Security', 'Network Segmentation', 'Sophos Endpoint', 'Microsoft Defender MDE', 'Kali Linux', 'Wireshark'],
      },
      {
        label: 'Linux & Systems',
        skills: ['RHEL (Install, Config, Patch)', 'User & Group Management', 'YUM / DNF', 'Shell Scripting', 'Cron Jobs', 'MariaDB', 'Apache Web Server', 'VMware / Hyper-V'],
      },
      {
        label: 'Windows & Desktop Support',
        skills: ['Windows 10 / 11', 'Windows Server', 'Software Patching', 'OS Upgrades', 'Hardware Installation & Config', 'Endpoint Troubleshooting', 'Printer Deployment', 'L1 / L2 End-User Support'],
      },
      {
        label: 'Enterprise Platforms',
        skills: ['Cisco Catalyst', 'Cisco Meraki', 'Juniper', 'Nokia', 'AudioCodes SBC', 'Cisco CUCM', 'PABX', 'Poly / AV Systems'],
      },
      {
        label: 'Monitoring & Tools',
        skills: ['Uptime Kuma', 'Zabbix', 'Wireshark', 'SecureCRT', 'PuTTY', 'TeamViewer', 'AnyDesk', 'Postman', 'Quick Assist', 'RDP'],
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
    ],
  },
  {
    domain: 'Software Development',
    key: 'dev',
    categories: [
      {
        label: 'Frontend Development',
        skills: ['Angular 21', 'React 19', 'TypeScript 5.9', 'RxJS', 'HTML5 / CSS3', 'SVG', 'Responsive Design', 'SPA Architecture', 'Vite', 'Git', 'GitHub', 'Netlify', 'VS Code'],
      },
      {
        label: 'Backend & Serverless',
        skills: ['Node.js', 'Netlify Functions', 'Nodemailer', 'Netlify Forms', 'Firebase', 'Firestore', 'Vitest', 'npm'],
      },
    ],
  },
]


const services = [
  {
    icon: IconNetwork,
    title: 'Network Design & Deployment',
    desc: 'Design and deploy multi-site LAN/WAN infrastructure including VLAN segmentation, inter-VLAN routing, and OSPF/EIGRP configuration on Cisco platforms.',
  },
  {
    icon: IconMonitor,
    title: 'NOC & 24/7 Operations',
    desc: 'Monitor and triage enterprise infrastructure around the clock, managing incidents, escalations, and SLA compliance using Uptime Kuma and Zabbix.',
  },
  {
    icon: IconFiber,
    title: 'Fiber Optic & Structured Cabling',
    desc: 'End-to-end fiber installation from backbone termination and fusion splicing to ODF/FDB buildout and OTDR/Fluke acceptance testing on enterprise and data center sites.',
  },
  {
    icon: IconServer,
    title: 'Data Center & Rack Buildout',
    desc: 'Build and organize full server racks from scratch, including patch panels, structured cabling, airflow, and labeling for enterprise and co-location environments.',
  },
  {
    icon: IconShield,
    title: 'Security & VPN',
    desc: 'Configure and manage Palo Alto firewalls, GlobalProtect VPN, and IDS/IPS policies to enforce network segmentation and access control.',
  },
]

const publications = [
  {
    title: 'ReceiptCo: A Mobile-Based Financial Management App with OCR Receipt Scanner',
    venue: 'LPU 18th Annual Best Student Research Forum',
    award: 'Best Research in Science and Technology · Certificate of Recognition, Mar 2025',
    note: 'Accepted for Oral Presentation – Asian Graduate Studies Summit 2025 (A-GRASS), Ho Chi Minh City, Vietnam, May 21–24, 2025',
  },
]

const certifications = [
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
    detail: 'Hands-on lab training covering LAN/WAN design, VLANs, OSPF/EIGRP, ACLs, subnetting, and CUCM voice fundamentals using Cisco hardware.',
  },
  {
    label: 'Foundational Training & Coursework',
    org: 'Cisco NetAcad / LPU / Self-Study',
    date: '2020 – 2024',
    bullets: [
      'Networking: Network Support and Security, Network Addressing & Basic Troubleshooting, Networking Devices & Initial Configuration, Networking Basics & Foundations, Network Technician Career Path.',
      'Programming: Introduction to Python, Programming in C.',
      'Certifications & Assessments: MTA 98-388 – Microsoft Java Fundamentals, IC3 GS5 – Computing Fundamentals.',
      'Language Proficiency: TOEIC – Test of English for International Communication.',
    ],
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
  { href: '#clients', label: 'Industries' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [formState, setFormState] = useState('idle') // 'idle' | 'sending' | 'sent' | 'error'
  const [lightbox, setLightbox] = useState(null)
  const [flippedCard, setFlippedCard] = useState(null)
  const active = useActiveSection(['services', 'about', 'experience', 'clients', 'projects', 'skills', 'contact'])
  const typedRole = useTypewriter(HERO_ROLES)
  const menuRef = useRef(null)
  const formRef = useRef(null)

  const closeMenu = () => setMenuOpen(false)
  const openLightbox = (src, alt) => setLightbox({ src, alt })
  const closeLightbox = () => setLightbox(null)

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 500)
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
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
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
      <nav className="navbar" ref={menuRef}>
        <a href="#home" className="nav-logo" aria-label="Marc J. Balcita">
          <LogoMark />
        </a>
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
          <div className="open-badge">Open to Opportunities · PH &amp; International</div>
          <p className="hero-greeting">Hi, I'm</p>
          <h1>Marc Joseph G. Balcita</h1>
          <p className="hero-title">
            <span>{typedRole}</span>
            <span className="cursor" aria-hidden="true" />
          </p>
          <p className="hero-sub">
            NOC &amp; Infrastructure Operations · 3+ years delivering enterprise network design,
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
              What sets my profile apart is the combination of hands-on field deployment, 24/7 NOC
              operations, and software development across the same career span, covering physical
              infrastructure, enterprise systems, and client-facing web projects.
            </p>
            <p>
              I started taking enterprise deployments in January 2023 while still completing my degree,
              which put me in live production environments from my second year of university.
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
        <h2>Industries Served</h2>
        <p className="clients-sub">Sectors and environments I've deployed, configured, and supported across Luzon, Visayas &amp; Mindanao</p>
        <div className="clients-grid">
          {clients.map((c) => {
            const IndustryIcon = INDUSTRY_ICONS[c.industry]
            return (
              <div className="client-card" key={c.name}>
                {IndustryIcon && <span className="client-icon"><IndustryIcon /></span>}
                <span className="client-name">{c.name}</span>
                <span className="client-industry">{c.industry}</span>
              </div>
            )
          })}
        </div>
      </FadeIn>

      <FadeIn tag="section" id="projects">
        <h2>Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div
              className={`project-flip${flippedCard === project.title ? ' flipped' : ''}`}
              key={project.title}
              onClick={() => setFlippedCard(flippedCard === project.title ? null : project.title)}
            >
              <div className="project-flip-inner">

                <div className="project-card">
                  {project.images ? (
                    <div className="project-img-gallery">
                      {project.images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`${project.title} ${i + 1}`}
                          className="project-gallery-img"
                          loading="lazy"
                          onClick={(e) => { e.stopPropagation(); openLightbox(img, `${project.title} ${i + 1}`) }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="project-img-placeholder">Preview</div>
                  )}
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <div className="project-tags">
                      {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                    </div>
                  </div>
                  <p className="flip-hint">Click to view description</p>
                </div>

                <div className="project-back">
                  {project.award && (
                    <div className="project-award">
                      <span className="award-icon">🏆</span>
                      {project.award}
                    </div>
                  )}
                  <h3>{project.title}</h3>
                  <p className="project-back-desc">{project.desc}</p>
                  {project.team && <p className="project-team">{project.team}</p>}
                  {(project.live || project.github) && (
                    <div className="project-links" onClick={(e) => e.stopPropagation()}>
                      {project.live && (
                        <a href={project.live} className="btn btn-sm btn-primary" target="_blank" rel="noreferrer">Live Site</a>
                      )}
                      {project.github && (
                        <a href={project.github} className="btn btn-sm btn-outline" target="_blank" rel="noreferrer">GitHub</a>
                      )}
                    </div>
                  )}
                  <p className="flip-back-hint">Click anywhere to flip back</p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn tag="section" id="skills">
        <h2>Skills</h2>
        {skillDomains.map((domain) => (
          <div className={`skill-domain skill-domain--${domain.key}`} key={domain.domain}>
            <h3 className="skill-domain-label">{domain.domain}</h3>
            <div className="skills-categories">
              {domain.categories.map((cat) => (
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
          </div>
        ))}
        <div className="certifications">
          <h3>Publications</h3>
          <ul className="cert-list">
            {publications.map((pub, i) => (
              <li key={i} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                <span className="cert-label">{pub.title}</span>
                <span className="cert-detail" style={{ textAlign: 'left' }}>{pub.venue}</span>
                <span className="cert-detail" style={{ textAlign: 'left' }}>{pub.award}</span>
                <span className="cert-detail" style={{ textAlign: 'left' }}>{pub.note}</span>
              </li>
            ))}
          </ul>
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
                {t.date && <span className="cert-detail">{t.date}</span>}
              </div>
              <span className="training-org">{t.org}</span>
              {t.bullets ? (
                <ul className="training-bullets">
                  {t.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              ) : (
                <p className="training-detail">{t.detail}</p>
              )}
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
            Message sent! Check your inbox -a confirmation has been sent to you. I'll be in touch shortly.
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
          <a href="mailto:mjbalcitaa@gmail.com">mjbalcitaa@gmail.com</a>
        </div>
        <div className="social-links">
          <a href="https://linkedin.com/in/marc-joseph-balcita-95b528284" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/Lycheegrr" target="_blank" rel="noreferrer">GitHub</a>
          <a href="mailto:mjbalcitaa@gmail.com">Email</a>
        </div>
      </FadeIn>

      <footer>
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">MJ G. Balcita</span>
            <p className="footer-tagline">IT Network Engineer · CCNA Certified</p>
          </div>
          <div className="footer-contact">
            <span>Pateros, Metro Manila, Philippines</span>
            <a href="mailto:mjbalcitaa@gmail.com">mjbalcitaa@gmail.com</a>
          </div>
          <div className="footer-social">
            <a href="https://linkedin.com/in/marc-joseph-balcita-95b528284" target="_blank" rel="noreferrer" aria-label="LinkedIn"><IconLinkedIn /></a>
            <a href="https://github.com/Lycheegrr" target="_blank" rel="noreferrer" aria-label="GitHub"><IconGitHub /></a>
            <a href="mailto:mjbalcitaa@gmail.com" aria-label="Email"><IconMail /></a>
          </div>
        </div>
        <p className="footer-copy">&copy; {new Date().getFullYear()} Marc Joseph G. Balcita. All rights reserved.</p>
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
