'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronRight,
  CircleDot,
  Command,
  Download,
  ExternalLink,
  Github,
  LayoutDashboard,
  Linkedin,
  Mail,
  Menu,
  Search,
  Sparkles,
  X,
  Zap,
} from 'lucide-react'

const products = [
  {
    id: 'cs-bot',
    tag: 'BUILD vs BUY · CUSTOMER EXPERIENCE',
    title: 'Customer Service Bot',
    subtitle:
      'Replacing an expensive third-party support bot with an in-house resolution engine.',
    metrics: [
      '90% automated resolution',
      '60% third-party benchmark',
      '₹3.5L → ₹30K / month',
    ],
    impact: '91% monthly cost savings',
    accent: 'violet',
    visual: 'cs-bot',
    sections: {
      problem:
        'The existing third-party support bot automated roughly 60% of resolutions while costing ₹3.5L every month.',
      solution:
        'Led the build of an in-house customer service bot focused on automated issue resolution and higher closure quality.',
      result:
        'The in-house bot reached 90% automated resolution and was capped at ₹30K/month, replacing the third-party platform.',
      learning:
        'The strongest product decision was not simply automating support — it was recognizing when the economics and customer experience justified building the capability in-house.',
    },
  },
  {
    id: 'packing',
    tag: 'B2B · OPERATIONS · UX',
    title: 'Retailer Packing Checklist',
    subtitle:
      'Turning a recurring packing error into a simple, verifiable retailer workflow.',
    metrics: [
      '4% → <2% missing-item concerns',
      'One-tap item verification',
      'Photo proof of packing',
    ],
    impact: '50%+ reduction in concerns',
    accent: 'blue',
    visual: 'packing',
    sections: {
      problem:
        'Retailers were missing items in larger orders, especially orders with 4–5+ items. Around 4% of orders generated missing-item concerns.',
      solution:
        'Introduced a packing checklist with one-tap item confirmation, a progress indicator showing packing completion, and a single-click bag photo before marking an order packed.',
      result:
        'Missing-item concerns dropped from 4% to below 2%. Admin teams could also use retailer-submitted packing images to validate potentially invalid claims.',
      learning:
        'The product created a shared source of truth between retailer operations and customer support instead of relying only on post-order claims.',
    },
  },
  {
    id: 'otp',
    tag: 'B2B · OPERATIONS · WORKFLOW',
    title: 'B2B Pidge OTP',
    subtitle:
      'Putting the missing piece of delivery information directly inside the retailer workflow.',
    metrics: ['~2.5–3% → <1% MDND', 'B2B Android app', 'Cross-functional launch'],
    impact: 'MDND reduced below 1%',
    accent: 'green',
    visual: 'otp',
    info:
      'MDND = Marked Delivered, Not Delivered — an order recorded as delivered but not actually received by the customer.',
    sections: {
      problem:
        'For LL-DP orders, the OTP required to complete delivery was not visible where the retailer and delivery workflow needed it.',
      solution:
        'Introduced OTP visibility in the B2B app in collaboration with Design, React Native and Engineering.',
      result:
        'MDND incidents reduced from ~2.5–3% to below 1%.',
      learning:
        'Small pieces of contextual information can have outsized operational impact when placed directly inside the workflow.',
    },
  },
  {
    id: 'refund',
    tag: 'POST-ORDER · CUSTOMER EXPERIENCE',
    title: 'Item-level Refund Experience',
    subtitle:
      'Designing post-order resolution around the individual item that actually needs attention.',
    metrics: [
      'Item-level resolution',
      'Order-state complexity',
      'Customer-first recovery',
    ],
    impact: 'Post-order UX',
    accent: 'orange',
    visual: 'refund',
    sections: {
      problem:
        'Post-order issues often affect one item rather than an entire order, creating unnecessary complexity in resolution flows.',
      solution:
        'Designed the product experience around item-level resolution so customers can act on the specific item with an issue.',
      result:
        'A clearer post-order journey that handles partial-order problems without forcing customers through an all-or-nothing experience.',
      learning:
        'Post-order is a systems problem as much as a UX problem — every customer-facing state has to map cleanly to operational and financial rules.',
    },
  },
  {
    id: 'growth',
    tag: 'GROWTH · D2C · EXPERIMENTATION',
    title: 'Buy Experience & Growth',
    subtitle:
      'Using funnel signals, experiments and commercial levers to improve the D2C buying journey.',
    metrics: ['20% RPVisit uplift', '15% RPVisit uplift', '5% AOV uplift'],
    impact: 'Growth through product',
    accent: 'pink',
    visual: 'growth',
    sections: {
      problem:
        'D2C growth required continuous optimization across acquisition quality, buying journeys and commercial mechanics.',
      solution:
        'Worked across partnership and paid channel traffic, buying experience and A/B-tested commercial features including Buy More, Save More.',
      result:
        'Partnership traffic revenue per visit increased 20%; paid traffic revenue per visit increased 15%; AOV increased 5% through the Buy More, Save More feature.',
      learning:
        'Growth product work works best when customer behavior, funnel mechanics and commercial outcomes are considered together.',
    },
  },
  {
    id: 'ops',
    tag: 'LOGISTICS · SYSTEMS · SCALE',
    title: 'Order & Logistics Systems',
    subtitle:
      'Simplifying the systems behind ecommerce fulfilment and warehouse operations.',
    metrics: [
      '₹20L/month cost reduction',
      '₹2.4Cr annualized',
      'No-code WMS integrations',
    ],
    impact: '50% logistics cost reduction',
    accent: 'cyan',
    visual: 'ops',
    sections: {
      problem:
        'Order allocation and warehouse integrations created cost, dependency and scalability challenges across the ecommerce stack.',
      solution:
        'Improved order allocation logic, optimized the WMS and launched a no-code warehouse management system to reduce developer dependency for new integrations.',
      result:
        'Logistics costs reduced by 50%, equivalent to about ₹20L/month or ₹2.4Cr annually.',
      learning:
        'Operational product work becomes strategic when the product removes structural cost and dependency from the system.',
    },
  },
]

const experience = [
  {
    period: '2025 → NOW',
    company: 'LOVELOCAL',
    role: 'Product Manager',
    description:
      'B2B · Hyperlocal · Retail Tech · Customer Experience · Operations',
    current: true,
  },
  {
    period: '2021 → 2025',
    company: 'THE GOOD GLAMM GROUP',
    role: 'Senior Product Manager',
    description:
      'D2C · Growth · Customer Experience · Logistics · Platforms',
    current: false,
  },
  {
    period: '2018 → 2021',
    company: 'MYGLAMM',
    role: 'Quality Analyst / Product Owner',
    description:
      'E-commerce · Order Management · Operations · Product',
    current: false,
  },
  {
    period: '2017 → 2018',
    company: '3DI SYSTEMS LTD',
    role: 'Software Test Engineer',
    description: 'CRM · Testing · UAT · Software Delivery',
    current: false,
  },
]

const aiExperiments = [
  {
    title: 'AI Job Hunter',
    eyebrow: 'AUTOMATION · N8N · JOB SEARCH',
    description:
      'A scraper and n8n workflow that finds relevant roles, tailors a resume for each opportunity and sends a daily digest to Gmail.',
    tags: ['n8n', 'Web scraping', 'Gmail automation'],
    href: 'https://github.com/darshanshetty10/ai-job-hunter',
    cta: 'View on GitHub',
  },
  {
    title: 'Virtual Darshan',
    eyebrow: 'AI PERSONA · LLM · PRODUCT EXPERIMENT',
    description:
      'A locally-developed, cloud-deployed AI persona that answers questions about Darshan’s career, skills, projects and interests.',
    tags: ['AI persona', 'Streamlit', 'LLM'],
    href: 'https://virtual-darshan-chatbot.streamlit.app/',
    github: 'https://github.com/darshanshetty10/virtual-darshan',
    cta: 'Try the live demo',
  },
  {
    title: 'AI Concierge — UAE',
    eyebrow: 'AI PRODUCT CONCEPT',
    description:
    "An AI relocation concierge that turns UAE visa, neighborhood, cost-of-living and settling-in questions into a personalized relocation plan.",
    tags: ['AI PM', 'UAE', 'Lovable'],
    href: "https://salaam-uae-relo-buddy.lovable.app/",
    cta: "View live Product"
  },
]

function Metric({
  value,
  label,
}: {
  value: string
  label: string
}) {
  return (
    <div className="metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  )
}

function ProductVisual({ type }: { type: string }) {
  if (type === 'cs-bot') {
    return (
      <div className="product-visual product-visual-bot">
        <div className="mini-window-header">
          <div className="mini-window-title">
            <span className="mini-icon">
              <Sparkles size={10} />
            </span>
            <span>Support Automation</span>
          </div>
  
          <span className="mini-status">
            <span className="mini-status-dot" />
            LIVE
          </span>
        </div>
  
        <div className="bot-layout">
          <div className="bot-chat">
            <div className="bot-chat-label">
              CUSTOMER QUERY
            </div>
  
            <div className="chat-bubble user">
              Where is my refund?
            </div>
  
            <div className="chat-bubble bot">
              Checking your refund status...
              <span className="chat-dots">•••</span>
            </div>
  
            <div className="chat-resolution">
              <div className="resolution-icon">
                <Zap size={10} />
              </div>
  
              <div>
                <strong>Resolved automatically</strong>
                <span>No agent intervention</span>
              </div>
            </div>
          </div>
  
          <div className="bot-metrics">
            <div className="bot-metric-card">
              <span>Resolution</span>
  
              <div className="bot-metric-values">
                <strong>60%</strong>
                <ArrowUpRight size={11} />
                <strong className="metric-highlight">90%</strong>
              </div>
  
              <div className="bot-mini-bar">
                <span />
              </div>
            </div>
  
            <div className="bot-metric-card">
              <span>Monthly cost</span>
  
              <div className="bot-cost">
                <strong>₹30K</strong>
                <small>vs ₹3.5L</small>
              </div>
  
              <div className="cost-label">
                IN-HOUSE
              </div>
            </div>
          </div>
        </div>
  
        <div className="bot-footer">
          <span>BUILD vs BUY</span>
          <span>91% lower monthly cost</span>
        </div>
      </div>
    )
  }

  if (type === 'packing') {
    return (
      <div className="product-visual product-visual-packing">
        <div className="packing-header">
          <div>
            <span className="packing-eyebrow">PACKING ORDER</span>
            <strong>#LL-48291</strong>
          </div>
  
          <span className="packing-state">
            IN PROGRESS
          </span>
        </div>
  
        <div className="packing-progress">
          <div className="packing-progress-top">
            <span>Items packed</span>
            <strong>4 / 5</strong>
          </div>
  
          <div className="packing-progress-track">
            <span style={{ width: '80%' }} />
          </div>
        </div>
  
        <div className="packing-items">
          <div className="packing-item packed">
            <span className="packing-check">✓</span>
  
            <div>
              <strong>Shampoo · 250ml</strong>
              <span>Qty 1</span>
            </div>
  
            <span className="packing-done">PACKED</span>
          </div>
  
          <div className="packing-item packed">
            <span className="packing-check">✓</span>
  
            <div>
              <strong>Face Wash · 100ml</strong>
              <span>Qty 1</span>
            </div>
  
            <span className="packing-done">PACKED</span>
          </div>
  
          <div className="packing-item packed">
            <span className="packing-check">✓</span>
  
            <div>
              <strong>Sunscreen · SPF 50</strong>
              <span>Qty 1</span>
            </div>
  
            <span className="packing-done">PACKED</span>
          </div>
  
          <div className="packing-item packed">
            <span className="packing-check">✓</span>
  
            <div>
              <strong>Lip Balm · 4.5g</strong>
              <span>Qty 1</span>
            </div>
  
            <span className="packing-done">PACKED</span>
          </div>
  
          <div className="packing-item current">
            <span className="packing-check">+</span>
  
            <div>
              <strong>Moisturiser · 50g</strong>
              <span>Tap to verify item</span>
            </div>
  
            <span className="packing-required">REQUIRED</span>
          </div>
        </div>
  
        <div className="packing-footer">
          <div>
            <span>FINAL STEP</span>
            <strong>Verify bag before dispatch</strong>
          </div>
  
          <span className="packing-action">
            Take bag photo →
          </span>
        </div>
      </div>
    )
  }

  if (type === 'otp') {
    return (
      <div className="product-visual product-visual-otp">
        <div className="otp-top">
          <div>
            <span className="otp-eyebrow">DELIVERY VERIFICATION</span>
            <strong>LL-DP ORDER</strong>
          </div>
  
          <span className="otp-live">
            <span />
            LIVE
          </span>
        </div>
  
        <div className="otp-order">
          <div>
            <span>ORDER</span>
            <strong>#LL-90421</strong>
          </div>
  
          <div>
            <span>STATUS</span>
            <strong className="otp-status">OUT FOR DELIVERY</strong>
          </div>
        </div>
  
        <div className="otp-card">
          <div className="otp-card-header">
            <div>
              <span>DELIVERY PARTNER OTP</span>
              <strong>Share with delivery partner</strong>
            </div>
  
            <div className="otp-lock">
              🔒
            </div>
          </div>
  
          <div className="otp-digits">
            <span>4</span>
            <span>8</span>
            <span>2</span>
            <span>7</span>
          </div>
  
          <div className="otp-validity">
            <span>OTP visible to retailer</span>
            <span>Valid for 10 min</span>
          </div>
        </div>
  
        <div className="otp-impact">
          <div className="otp-impact-header">
            <span>MDND INCIDENTS</span>
            <span>POST LAUNCH</span>
          </div>
  
          <div className="otp-impact-values">
            <strong>~2.5–3%</strong>
            <ArrowDownRight size={12} />
            <strong className="otp-highlight">&lt;1%</strong>
          </div>
  
          <div className="otp-impact-bar">
            <span />
          </div>
        </div>
  
        <div className="otp-info">
          MDND = Marked Delivered, Not Delivered
        </div>
      </div>
    )
  }
  if (type === 'refund') {
    return (
      <div className="product-visual product-visual-refund">
        <div className="refund-header">
          <div>
            <span className="refund-eyebrow">ORDER SUPPORT</span>
            <strong>Which item needs help?</strong>
          </div>
  
          <span className="refund-order">
            #LL-73184
          </span>
        </div>
  
        <div className="refund-items">
          <div className="refund-item">
            <div className="refund-thumb refund-thumb-one">
              <span>01</span>
            </div>
  
            <div className="refund-product">
              <strong>Vitamin C Serum</strong>
              <span>₹699 · Delivered</span>
            </div>
  
            <span className="refund-item-status">
              ✓
            </span>
          </div>
  
          <div className="refund-item selected">
            <div className="refund-thumb refund-thumb-two">
              <span>02</span>
            </div>
  
            <div className="refund-product">
              <strong>Face Moisturiser</strong>
              <span>₹499 · Delivered</span>
            </div>
  
            <span className="refund-item-status selected">
              ✓
            </span>
          </div>
  
          <div className="refund-item">
            <div className="refund-thumb refund-thumb-three">
              <span>03</span>
            </div>
  
            <div className="refund-product">
              <strong>Sunscreen SPF 50</strong>
              <span>₹799 · Delivered</span>
            </div>
  
            <span className="refund-item-status">
              ✓
            </span>
          </div>
        </div>
  
        <div className="refund-reason">
          <span>REASON FOR REFUND</span>
  
          <div className="refund-reason-row">
            <span className="refund-reason-selected">
              Item damaged
            </span>
  
            <ChevronRight size={10} />
          </div>
        </div>
  
        <div className="refund-footer">
          <div>
            <span>REFUND AMOUNT</span>
            <strong>₹499</strong>
          </div>
  
          <span className="refund-action refund-selected">
            Refund item →
          </span>
        </div>
      </div>
    )
  }

  if (type === 'growth') {
    return (
      <div className="product-visual product-visual-growth">
        <div className="growth-header">
          <div>
            <span className="growth-eyebrow">BUY EXPERIENCE</span>
            <strong>Growth Dashboard</strong>
          </div>
  
          <span className="growth-period">
            IMPACT
          </span>
        </div>
  
        <div className="growth-flow">
          <div className="growth-stage">
            <div className="growth-stage-top">
              <span>PARTNERSHIP</span>
              <ArrowUpRight size={11} />
            </div>
  
            <strong>+20%</strong>
            <span className="growth-stage-label">
              RPVisit
            </span>
  
            <div className="growth-bar">
              <span style={{ width: '82%' }} />
            </div>
          </div>
  
          <div className="growth-stage">
            <div className="growth-stage-top">
              <span>PAID TRAFFIC</span>
              <ArrowUpRight size={11} />
            </div>
  
            <strong>+15%</strong>
            <span className="growth-stage-label">
              RPVisit
            </span>
  
            <div className="growth-bar">
              <span style={{ width: '65%' }} />
            </div>
          </div>
        </div>
  
        <div className="growth-conversion">
          <div className="growth-conversion-copy">
            <span>MONETISATION</span>
            <strong>Average Order Value</strong>
          </div>
  
          <div className="growth-aov">
            <ArrowUpRight size={12} />
            <strong>+5%</strong>
          </div>
        </div>
  
        <div className="growth-journey">
          <span>TRAFFIC</span>
          <ChevronRight size={9} />
          <span>BUY EXPERIENCE</span>
          <ChevronRight size={9} />
          <span>CONVERSION</span>
          <ChevronRight size={9} />
          <span>AOV</span>
        </div>
      </div>
    )
  }

  return (
    <div className="product-visual product-visual-ops">
      <div className="ops-header">
        <div>
          <span className="ops-eyebrow">ORDER ORCHESTRATION</span>
          <strong>Logistics Control</strong>
        </div>
  
        <span className="ops-status">
          <span />
          SYSTEM LIVE
        </span>
      </div>
  
      <div className="ops-flow">
        <div className="ops-node">
          <div className="ops-node-icon">
            ORD
          </div> 
  
          <div>
            <span>ORDER</span>
            <strong>#LL-82194</strong>
          </div>
        </div>
  
        <div className="ops-connector">
          <ChevronRight size={10} />
        </div>
  
        <div className="ops-node active">
          <div className="ops-node-icon">
            WMS
          </div>
  
          <div>
            <span>WAREHOUSE</span>
            <strong>ALLOCATED</strong>
          </div>
        </div>
  
        <div className="ops-connector">
          <ChevronRight size={10} />
        </div>
  
        <div className="ops-node">
          <div className="ops-node-icon">
            DP
          </div>
  
          <div>
            <span>COURIER</span>
            <strong>ASSIGNED</strong>
          </div>
        </div>
      </div>
  
      <div className="ops-system-row">
        <div className="ops-system-card">
          <span>FULFILMENT</span>
          <strong>NO-CODE WMS</strong>
          <small>Order → warehouse → courier</small>
        </div>
  
        <div className="ops-system-card">
          <span>COST IMPACT</span>
          <strong>−50%</strong>
          <small>Logistics cost reduction</small>
        </div>
      </div>
  
      <div className="ops-impact">
        <div>
          <span>MONTHLY IMPACT</span>
          <strong>₹20L</strong>
        </div>
  
        <div className="ops-impact-divider" />
  
        <div>
          <span className="ops-impact-label">ANNUALISED</span>
          <strong>₹2.4Cr</strong>
        </div>
      </div>
    </div>
  )
}


export default function Home() {
  const [mode, setMode] = useState<
    'default' | 'recruiter' | 'product'
  >('default')

  const [selected, setSelected] = useState<
    (typeof products)[number] | null
  >(null)

  const [palette, setPalette] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        (e.metaKey || e.ctrlKey) &&
        e.key.toLowerCase() === 'k'
      ) {
        e.preventDefault()
        setPalette((v) => !v)
      }

      if (e.key === 'Escape') {
        setPalette(false)
        setSelected(null)
        setMobileMenu(false)
      }
    }

    window.addEventListener('keydown', handler)

    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, [])

  const visibleProducts = products

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth' })

    setMobileMenu(false)
  }

  return (
    <main>
      {/* NAVIGATION */}

      <nav className="topbar">
  <button
    className="brand"
    onClick={() => scrollTo('home')}
    aria-label="Go to homepage"
  >
    <span className="brand-mark">⌘</span>
    DARSHAN.OS
  </button>

  <div className="navlinks">
    <button onClick={() => scrollTo('products')}>
      Products
    </button>

    <button onClick={() => scrollTo('experience')}>
      Experience
    </button>

    <button onClick={() => scrollTo('playbook')}>
      Playbook
    </button>

    <button onClick={() => scrollTo('ai-lab')}>
      AI Lab
    </button>

    <button onClick={() => scrollTo('impact')}>
      Impact
    </button>

    <button onClick={() => scrollTo('toolkit')}>
      Toolkit
    </button>
  </div>

  <div className="nav-actions">
    <button
      className="command-pill"
      onClick={() => setPalette(true)}
      aria-label="Open search"
    >
      <Search size={14} />
      <span>Search</span>
      <kbd>⌘ K</kbd>
    </button>

    <button
      className="contact-btn"
      onClick={() => scrollTo('contact')}
    >
      Contact
    </button>

    <button
      className="mobile-menu"
      onClick={() => setMobileMenu((v) => !v)}
      aria-label={
        mobileMenu
          ? 'Close navigation menu'
          : 'Open navigation menu'
      }
      aria-expanded={mobileMenu}
    >
      <Menu size={19} />
    </button>
  </div>
</nav>

{mobileMenu && (
  <div className="mobile-nav">
    {[
      ['Products', 'products'],
      ['Experience', 'experience'],
      ['Playbook', 'playbook'],
      ['AI Lab', 'ai-lab'],
      ['Impact', 'impact'],
      ['Toolkit', 'toolkit'],
      ['Contact', 'contact'],
    ].map(([label, id]) => (
      <button
        key={id}
        onClick={() => scrollTo(id)}
      >
        {label}
      </button>
    ))}
  </div>
)}

      {/* HERO */}

      <section
  id="home"
  className="hero section-shell"
>
  <div className="hero-copy">

    <div className="eyebrow">
      <span className="status-dot" />
      PRODUCT MANAGER · COMMERCE · AI
    </div>

    <h1>
      Turning messy
      <br />
      customer problems
      <br />
      <em>into simple,</em>
      <br />
      scalable products.
    </h1>

    <p className="hero-sub">
      Product Manager with 8+ years across D2C,
      e-commerce and hyperlocal commerce, building
      customer experiences, growth products and
      operational systems — now experimenting with AI.
    </p>

    <div className="hero-actions">

      <button
        className="primary-btn"
        onClick={() => scrollTo('products')}
      >
        Explore my work
        <ChevronRight size={16} />
      </button>

      <a
        className="secondary-btn"
        href="/assets/Darshan_Shetty_Resume.pdf"
        download
      >
        <Download size={15} />
        Download resume
      </a>

    </div>

    <div className="hero-meta">

      <span>
        CURRENTLY <b>LoveLocal</b>
      </span>

      <span>
        PREVIOUSLY <b>Good Glamm Group</b>
      </span>

      <span>
        <b>6+ years</b> in Product
      </span>

    </div>

  </div>

  <div className="hero-visual">

    <div className="ambient-grid" />

    <div className="hero-orbit orbit-a" />
    <div className="hero-orbit orbit-b" />

    <div className="profile-card">

      <div className="profile-image-wrap">
      <Image
  src="/assets/darshan.jpg"
  alt="Darshan Shetty — Product Manager"
  fill
  priority
  sizes="(max-width: 720px) 66vw, 58vw"
  className="profile-photo"
/>
      </div>

      <div className="profile-info">
        <span>PROFILE / 01</span>
        <strong>Darshan Shetty</strong>
        <small>Product Manager</small>
      </div>

      <div className="profile-signal">
        <CircleDot size={13} />
        Building products
      </div>

    </div>

    <div className="floating-panel panel-one">
      <span>IMPACT</span>
      <strong>₹2.4Cr</strong>
      <small>
        annual logistics cost reduction
      </small>
    </div>

    <div className="floating-panel panel-two">
      <span>AI LAB</span>
      <strong>03</strong>
      <small>
        live builds & experiments
      </small>
    </div>

  </div>
</section>

      {/* INTENT */}

      <section
        className="intent section-shell"
        id="os"
      >
        <div className="section-head center">
          <span className="eyebrow">
            PRODUCT OS / ENTRY
          </span>

          <h2>
            Same person.
            <br />
            <em>Different journeys.</em>
          </h2>

          <p>
            Choose what you want to explore. The interface
            adapts to your intent.
          </p>
        </div>

        <div className="intent-grid">
          <button
            className="intent-card"
            onClick={() => {
              setMode('recruiter')
              scrollTo('dashboard')
            }}
          >
            <div className="intent-icon">
              <BriefcaseBusiness size={20} />
            </div>

            <strong>I'm Hiring</strong>
            <span>Show me products and imapct</span>
            <ChevronRight />
          </button>

          <button
            className="intent-card"
            onClick={() => {
              setMode('default')
              scrollTo('products')
            }}
          >
            <div className="intent-icon">
              <Zap size={20} />
            </div>

            <strong>I want to see your work</strong>
            <span>Show me products and impact</span>
            <ChevronRight />
          </button>

          <button
            className="intent-card"
            onClick={() => scrollTo('ai-lab')}
          >
            <div className="intent-icon">
              <Sparkles size={20} />
            </div>

            <strong>Show me your AI Experiments</strong>
            <span>Explore AI products and prototypes</span>
            <ChevronRight />
          </button>

          <button
            className="intent-card"
            onClick={() => {
              setMode('product')
              scrollTo('playbook')
            }}
          >
            <div className="intent-icon">
              <LayoutDashboard size={20} />
            </div>

            <strong>How do I think?</strong>
            <span>Explore the product playbook</span>
            <ChevronRight />
          </button>
        </div>
      </section>

      {/* DASHBOARD */}

      <section
  id="dashboard"
  className="dashboard section-shell dark-panel"
>
  <div className="section-head">
    <div>
      <span className="eyebrow">
        DARSHAN.OS /{' '}
        {mode === 'recruiter'
          ? 'RECRUITER SNAPSHOT'
          : 'PRODUCT PROFILE'}
      </span>

      <h2>
        How I <em>build.</em>
      </h2>

      <p className="dashboard-intro">
        I work across customer experience, growth and
        operational systems — turning messy problems into
        measurable product outcomes.
      </p>
    </div>

    <button
      className="mini-btn"
      onClick={() => setPalette(true)}
    >
      <Command size={14} />
      Explore OS
    </button>
  </div>

  {/* PROFILE */}
  <div className="dashboard-grid">

    <div className="dash-profile">
      <img
        src="/assets/darshan.jpg"
        alt="Darshan Shetty"
      />

      <div>
        <span>PRODUCT MANAGER</span>
        <h3>Darshan Shetty</h3>
        <p>
          8+ years D2C · 6+ years Product
        </p>
      </div>

      <a
        href="/assets/Darshan_Shetty_Resume.pdf"
        download
        aria-label="Download resume"
      >
        <Download size={14} />
      </a>
    </div>

    <div className="dash-stat">
      <span>CURRENT</span>
      <strong>LoveLocal</strong>
      <small>
        Product Manager · Hyperlocal Commerce
      </small>
    </div>

    <div className="dash-stat">
      <span>PREVIOUS</span>
      <strong>Good Glamm Group</strong>
      <small>
        Senior Product Manager · D2C
      </small>
    </div>

  </div>

  {/* DOMAINS */}
  <div className="dashboard-domains">

    <div>
      <span>01</span>
      <strong>Customer Experience</strong>
      <small>
        Buy · Post-order · Support
      </small>
    </div>

    <div>
      <span>02</span>
      <strong>Commerce & Growth</strong>
      <small>
        D2C · Marketplace · Experimentation
      </small>
    </div>

    <div>
      <span>03</span>
      <strong>Operations & Systems</strong>
      <small>
        Logistics · WMS · Retail workflows
      </small>
    </div>

    <div>
      <span>04</span>
      <strong>AI Products</strong>
      <small>
        LLMs · Automation · Prototypes
      </small>
    </div>

  </div>

  {/* IMPACT */}
  <div className="dashboard-bottom">

    <div>
      <span className="eyebrow">
        SELECTED IMPACT
      </span>

      <div className="impact-mini-grid">

        <Metric
          value="90%"
          label="CS bot closure"
        />

        <Metric
          value="50%+"
          label="fewer missing-item concerns"
        />

        <Metric
          value="<1%"
          label="MDND after intervention"
        />

        <Metric
          value="₹2.4Cr"
          label="annual logistics impact"
        />

      </div>
    </div>

    <div className="os-note">
      <span>BUILDING NOW</span>

      <strong>
        <i />
        Product + AI
      </strong>

      <p>
        Building products, experimenting with AI and
        documenting the decisions behind both.
      </p>
    </div>

  </div>

</section>

      {/* EXPERIENCE */}

      <section
        id="experience"
        className="experience section-shell"
      >
        <div className="section-head">
          <div>
            <span className="eyebrow">
              / EXPERIENCE
            </span>

            <h2>
              Career as a
              <br />
              <em>system log.</em>
            </h2>
          </div>

          <span className="section-count">
            08+ YEARS
          </span>
        </div>

        <div className="experience-log">
          {experience.map((item) => (
            <div
              className={`experience-row ${
                item.current
                  ? 'experience-current'
                  : ''
              }`}
              key={`${item.company}-${item.period}`}
            >
              <div className="experience-marker">
                <span className="experience-dot" />
                <span className="experience-line" />
              </div>

              <div className="experience-period">
                {item.period}
              </div>

              <div className="experience-main">
                <span className="experience-company">
                  {item.company}
                </span>

                <h3>{item.role}</h3>

                <p>{item.description}</p>
              </div>

              <div className="experience-status">
                {item.current ? (
                  <span className="current-badge">
                    <i />
                    CURRENT
                  </span>
                ) : (
                  <span className="completed-badge">
                    COMPLETED
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}

      <section
        id="products"
        className="products section-shell"
      >
        <div className="section-head">
          <div>
            <span className="eyebrow">/ PRODUCTS</span>

            <h2>
              Real problems.
              <br />
              <em>Real products.</em> Real impact.
            </h2>
          </div>

          <span className="section-count">
            06 SELECTED
          </span>
        </div>

        <div className="product-grid">
        {visibleProducts.map((product, index) => (
  <article
    key={product.id}
    className={`product-card accent-${product.accent}`}
    role="button"
    tabIndex={0}
    onClick={() => setSelected(product)}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setSelected(product)
      }
    }}
  >
              <div className="product-card-top">
                <span>
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span>{product.tag}</span>
              </div>

              <ProductVisual
                type={product.visual}
              />

              <div className="product-card-body">
                <h3>{product.title}</h3>

                <p>{product.subtitle}</p>

                <div className="card-metrics">
                  {product.metrics.map(
                    (metric) => (
                      <span key={metric}>
                        {metric}
                      </span>
                    )
                  )}
                </div>

                {product.info && (
                  <div className="product-info">
                    {product.info}
                  </div>
                )}

                <div className="card-link">
                  View case study
                  <ArrowUpRight size={15} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* IMPACT */}

      <section
        id="impact"
        className="impact section-shell dark-panel"
      >
        <div className="section-head">
          <div>
            <span className="eyebrow">/ IMPACT</span>

            <h2>
              Numbers tell
              <br />
              <em>part of the story.</em>
            </h2>
          </div>

          <p className="head-note">
            Click into the products for the decisions
            behind the numbers.
          </p>
        </div>

        <div className="big-metrics">
          <div>
            <strong>90%</strong>
            <span>in-house CS bot closure</span>
            <small>
              vs 60% third-party benchmark
            </small>
          </div>

          <div>
            <strong>₹3.2L+</strong>
            <span>monthly cost difference</span>
            <small>
              ₹3.5L third-party → max ₹30K
            </small>
          </div>

          <div>
            <strong>4% → &lt;1%</strong>
            <span>MDND incidents</span>
            <small>
              Marked Delivered, Not Delivered
            </small>
          </div>

          <div>
            <strong>₹2.4Cr</strong>
            <span>
              annual logistics cost reduction
            </span>
            <small>
              50% reduction in logistics costs
            </small>
          </div>
        </div>
      </section>

      {/* PLAYBOOK */}

      <section
  id="playbook"
  className="playbook section-shell"
>
  <div className="section-head center">
    <span className="eyebrow">
      / PLAYBOOK
    </span>

    <h2>
      How I <em>think</em> about products.
    </h2>

    <p>
      Not a collection of frameworks. A working loop I use
      to move from ambiguity to measurable outcomes.
    </p>
  </div>

  {/* PRODUCT THINKING LOOP */}
  <div className="playbook-loop">

    {[
      'Problem',
      'Customer',
      'Insight',
      'Hypothesis',
      'Experiment',
      'Product',
      'Impact',
      'Learning',
    ].map((step, index) => (
      <div
        className="playbook-step"
        key={step}
      >
        <div className="playbook-step-card">
          <span>
            {String(index + 1).padStart(2, '0')}
          </span>

          <strong>
            {step}
          </strong>
        </div>

        {index < 7 && (
          <ChevronRight
            className="playbook-step-arrow"
            size={16}
            strokeWidth={1.5}
          />
        )}
      </div>
    ))}

  </div>

  {/* THINKING PRINCIPLES */}
  <div className="playbook-cards">

    <article>
      <span>01 / DISCOVERY</span>

      <h3>
        Find the problem worth solving.
      </h3>

      <p>
        Understand the user, business context and
        constraint before jumping to a solution.
      </p>
    </article>

    <article>
      <span>02 / PRIORITIZATION</span>

      <h3>
        Make trade-offs explicit.
      </h3>

      <p>
        Balance impact, reach, confidence, effort
        and strategic importance.
      </p>
    </article>

    <article>
      <span>03 / EXECUTION</span>

      <h3>
        Ship with the whole team.
      </h3>

      <p>
        PRD, design, engineering, QA, launch and
        measurement are one product loop.
      </p>
    </article>

  </div>
</section>

      {/* AI LAB */}

      <section
  id="ai-lab"
  className="ai-lab section-shell dark-panel"
>
  <div className="section-head">
    <div>
      <span className="eyebrow">
        / AI LAB
      </span>

      <h2>
        Building with AI,
        <br />
        <em>Learning by Shipping.</em>
      </h2>
    </div>

    <span className="section-count">
      03 LIVE BUILDS
    </span>
  </div>

  <div className="ai-grid">
    {aiExperiments.map((experiment, index) => {

      const isUaeConcierge =
        experiment.title === "AI Concierge — UAE"

      const isConcept =
        experiment.href === "#"

      return (
        <article
          className="ai-card"
          key={experiment.title}
        >

          {/* TOP ROW */}

          <div className="ai-card-top">

            <div className="ai-card-number">
              0{index + 1}
            </div>

            <span
              className={`ai-status ${
                isUaeConcierge
                  ? "beta"
                  : isConcept
                    ? "concept"
                    : "built"
              }`}
            >
              <span />

              {isUaeConcierge
                ? "BUILT · BETA"
                : isConcept
                  ? "CONCEPT"
                  : "BUILT"}
            </span>

          </div>

          {/* TITLE */}

          <span className="eyebrow">
            {experiment.eyebrow}
          </span>

          <h3>
            {experiment.title}
          </h3>

          <p>
            {experiment.description}
          </p>

          {/* PRODUCT FLOW */}

          <div className="ai-flow">

            {index === 0 && (
              <>
                <span>DISCOVER</span>
                <b>→</b>
                <span>FILTER</span>
                <b>→</b>
                <span>AI</span>
                <b>→</b>
                <span>GMAIL</span>
              </>
            )}

            {index === 1 && (
              <>
                <span>PERSONA</span>
                <b>→</b>
                <span>LLM</span>
                <b>→</b>
                <span>CHAT</span>
              </>
            )}

            {index === 2 && (
              <>
                <span>PROFILE</span>
                <b>→</b>
                <span>PLAN</span>
                <b>→</b>
                <span>GUIDANCE</span>
                <b>→</b>
                <span>MOVE</span>
              </>
            )}

          </div>

          {/* TAGS */}

          <div className="ai-tags">
            {experiment.tags.map((tag) => (
              <span key={tag}>
                {tag}
              </span>
            ))}
          </div>

          {/* LINKS */}

          {experiment.href !== "#" ? (
            <div className="ai-links">

              <a
                href={experiment.href}
                target="_blank"
                rel="noreferrer"
              >
                {experiment.cta}
                <ExternalLink size={13} />
              </a>

              {experiment.github && (
                <a
                  href={experiment.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={13} />
                  GitHub
                </a>
              )}

            </div>
          ) : (
            <span className="ai-coming">
              Product concept · Exploring
            </span>
          )}

        </article>
      )
    })}
  </div>
</section>

      {/* TOOLKIT */}

      <section
  id="toolkit"
  className="toolkit section-shell dark-panel"
>
  <div className="toolkit-head">
    <span className="eyebrow">/ TOOLKIT</span>

    <h2>
      Tools I <em>build with.</em>
    </h2>

    <p>
      A curated set of tools I rely on to discover,
      design, execute and experiment.
    </p>
  </div>

  <div className="toolkit-widget-grid">

    {/* DISCOVER */}
    <article className="toolkit-widget">
      <div className="toolkit-widget-top">
        <span className="toolkit-index">01</span>
        <span className="toolkit-widget-label">
          DISCOVER
        </span>
      </div>

      <div className="toolkit-widget-title">
        <h3>Analytics &amp; Data</h3>
        <p>Find signals, understand behaviour.</p>
      </div>

      <div className="tool-widget-tools">

        <div className="tool-mini">
          <span className="tool-icon sql-icon">SQL</span>
          <span>SQL</span>
        </div>

        <div className="tool-mini">
          <img
            src="https://cdn.simpleicons.org/googlebigquery/4285F4"
            alt=""
          />
          <span>BigQuery</span>
        </div>

        <div className="tool-mini">
          <img
            src="https://cdn.simpleicons.org/googleanalytics/F9AB00"
            alt=""
          />
          <span>Google Analytics</span>
        </div>

        <div className="tool-mini">
          <img
            src="https://cdn.simpleicons.org/firebase/FFCA28"
            alt=""
          />
          <span>Firebase</span>
        </div>

        <div className="tool-mini">
          <span className="tool-text-logo adobe-logo">
            A
          </span>
          <span>Adobe Analytics</span>
        </div>

      </div>

      <div className="toolkit-widget-footer">
        <span>DATA</span>
        <span>05 TOOLS</span>
      </div>
    </article>


    {/* DESIGN */}
    <article className="toolkit-widget">
      <div className="toolkit-widget-top">
        <span className="toolkit-index">02</span>
        <span className="toolkit-widget-label">
          DESIGN
        </span>
      </div>

      <div className="toolkit-widget-title">
        <h3>UX &amp; Prototyping</h3>
        <p>Turn ideas into tangible experiences.</p>
      </div>

      <div className="tool-widget-tools">

        <div className="tool-mini">
          <img
            src="https://cdn.simpleicons.org/figma/F24E1E"
            alt=""
          />
          <span>Figma</span>
        </div>

        <div className="tool-mini">
          <img
            src="https://cdn.simpleicons.org/excalidraw/6965DB"
            alt=""
          />
          <span>Excalidraw</span>
        </div>

        <div className="tool-mini">
          <span className="tool-text-logo stitch-logo">
            S
          </span>
          <span>Google Stitch</span>
        </div>

        <div className="tool-mini">
          <span className="tool-text-logo lovable-logo">
            ✦
          </span>
          <span>Lovable</span>
        </div>

      </div>

      <div className="toolkit-widget-footer">
        <span>DESIGN</span>
        <span>04 TOOLS</span>
      </div>
    </article>


    {/* EXECUTE */}
    <article className="toolkit-widget">
      <div className="toolkit-widget-top">
        <span className="toolkit-index">03</span>
        <span className="toolkit-widget-label">
          EXECUTE
        </span>
      </div>

      <div className="toolkit-widget-title">
        <h3>Product Delivery</h3>
        <p>Plan, ship and collaborate.</p>
      </div>

      <div className="tool-widget-tools">

        <div className="tool-mini">
          <img
            src="https://cdn.simpleicons.org/jira/2684FF"
            alt=""
          />
          <span>Jira</span>
        </div>

        <div className="tool-mini">
          <img
            src="https://cdn.simpleicons.org/notion/FFFFFF"
            alt=""
          />
          <span>Notion</span>
        </div>

        <div className="tool-mini">
          <img
            src="https://cdn.simpleicons.org/github/FFFFFF"
            alt=""
          />
          <span>GitHub</span>
        </div>

        <div className="tool-mini">
          <img
            src="https://cdn.simpleicons.org/cursor/FFFFFF"
            alt=""
          />
          <span>Cursor</span>
        </div>

      </div>

      <div className="toolkit-widget-footer">
        <span>DELIVERY</span>
        <span>04 TOOLS</span>
      </div>
    </article>


    {/* AI */}
    <article className="toolkit-widget toolkit-widget-ai">
      <div className="toolkit-widget-top">
        <span className="toolkit-index">04</span>
        <span className="toolkit-widget-label">
          AI
        </span>
      </div>

      <div className="toolkit-widget-title">
        <h3>Build &amp; Experiment</h3>
        <p>Prototype with modern AI tooling.</p>
      </div>

      <div className="tool-widget-tools">

        <div className="tool-mini">
          <img
            src="https://cdn.simpleicons.org/claudecode/D97757"
            alt=""
          />
          <span>Claude Code</span>
        </div>

        <div className="tool-mini">
          <span className="tool-text-logo chatgpt-logo">
            ◎
          </span>
          <span>ChatGPT</span>
        </div>

        <div className="tool-mini">
          <img
            src="https://cdn.simpleicons.org/n8n/EA4B71"
            alt=""
          />
          <span>n8n</span>
        </div>

        <div className="tool-mini">
          <img
            src="https://cdn.simpleicons.org/python/3776AB"
            alt=""
          />
          <span>Python</span>
        </div>

        <div className="tool-mini">
          <img
            src="https://cdn.simpleicons.org/streamlit/FF4B4B"
            alt=""
          />
          <span>Streamlit</span>
        </div>

        <div className="tool-mini">
          <img
            src="https://cdn.simpleicons.org/ollama/FFFFFF"
            alt=""
          />
          <span>Ollama</span>
        </div>

      </div>

      <div className="toolkit-widget-footer">
        <span>AI LAB</span>
        <span>06 TOOLS</span>
      </div>
    </article>

  </div>
</section>

      {/* CONTACT */}

      <section
  id="contact"
  className="contact section-shell dark-panel"
>
  <div className="contact-copy">
    <span className="eyebrow">
      / LET&apos;S CONNECT
    </span>

    <h2>
      Have a product
      <br />
      <em>worth building?</em>
    </h2>

    <p>
      I&apos;m open to conversations around Product,
      AI and interesting problems worth solving.
    </p>

    <div className="contact-primary">
      <a
        className="contact-email"
        href="mailto:darshanshetty36@gmail.com"
      >
        <Mail size={17} />
        Start a conversation
      </a>

      <a
        className="contact-resume"
        href="/assets/Darshan_Shetty_Resume.pdf"
        download
      >
        <Download size={16} />
        Download resume
      </a>
    </div>
  </div>

  <div className="contact-actions">

    <a
      href="https://www.linkedin.com/in/darshan-shetty-4396a2159/"
      target="_blank"
      rel="noreferrer"
    >
      <Linkedin size={17} />
      <span>
        <small>CONNECT</small>
        LinkedIn
      </span>
    </a>

    <a
      href="https://github.com/darshanshetty10"
      target="_blank"
      rel="noreferrer"
    >
      <Github size={17} />
      <span>
        <small>BUILD</small>
        GitHub
      </span>
    </a>

    <a
      href="mailto:darshanshetty36@gmail.com"
    >
      <Mail size={17} />
      <span>
        <small>EMAIL</small>
        darshanshetty36@gmail.com
      </span>
    </a>

  </div>
</section>

      {/* FOOTER */}

      <footer className="footer section-shell">
        <span>© 2026 DARSHAN.OS</span>

        <span>
          Designed as a product, not a portfolio.
        </span>

        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
        >
          <ArrowUpRight size={14} />
          Back to top
        </button>
      </footer>

      {/* CASE STUDY MODAL */}

      {selected && (
  <div
    className="modal-backdrop"
    onClick={() => setSelected(null)}
  >
    <article
      className="case-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="modal-close"
        onClick={() => setSelected(null)}
        aria-label="Close case study"
      >
        <X size={18} />
      </button>

      {/* HEADER */}
      <div className="case-header">
        <div>
          <span className="eyebrow">
            {selected.tag}
          </span>

          <h2>{selected.title}</h2>

          <p className="modal-subtitle">
            {selected.subtitle}
          </p>
        </div>

        <div className="case-status">
          <span className="status-dot" />
          SHIPPED
        </div>
      </div>

      {/* IMPACT METRICS */}
      <div className="case-metrics case-metrics-large">
        {selected.metrics.map((metric) => (
          <div
            className="case-metric"
            key={metric}
          >
            <span>{metric}</span>
          </div>
        ))}
      </div>

      {/* CONTEXT */}
      {selected.info && (
        <div className="product-info">
          <span>CONTEXT</span>
          <p>{selected.info}</p>
        </div>
      )}

{/* PRODUCT STORY */}
{/* PRODUCT STORY */}
<div className="case-product-story">

  <div className="case-product-story-header">
    <span>PRODUCT SYSTEM</span>
    <span>LIVE SYSTEM VIEW</span>
  </div>

  <ProductVisual type={selected.id} />

  {/* CASE-SPECIFIC PRODUCT FLOW */}
  <div className="case-flow">

    <div className="case-flow-label">
      PRODUCT THINKING FLOW
    </div>

    <div className="case-flow-track">

      {selected.id === "bot" && (
        <>
          <div className="case-flow-node">
            <span>01</span>
            Customer query
          </div>

          <ChevronRight
            size={14}
            className="case-flow-arrow"
          />

          <div className="case-flow-node">
            <span>02</span>
            Automated resolution
          </div>

          <ChevronRight
            size={14}
            className="case-flow-arrow"
          />

          <div className="case-flow-node">
            <span>03</span>
            In-house ownership
          </div>

          <ChevronRight
            size={14}
            className="case-flow-arrow"
          />

          <div className="case-flow-node">
            <span>04</span>
            Lower cost
          </div>
        </>
      )}

      {selected.id === "packing" && (
        <>
          <div className="case-flow-node">
            <span>01</span>
            Pick items
          </div>

          <ChevronRight
            size={14}
            className="case-flow-arrow"
          />

          <div className="case-flow-node">
            <span>02</span>
            One-tap verify
          </div>

          <ChevronRight
            size={14}
            className="case-flow-arrow"
          />

          <div className="case-flow-node">
            <span>03</span>
            Track progress
          </div>

          <ChevronRight
            size={14}
            className="case-flow-arrow"
          />

          <div className="case-flow-node">
            <span>04</span>
            Bag photo
          </div>

          <ChevronRight
            size={14}
            className="case-flow-arrow"
          />

          <div className="case-flow-node">
            <span>05</span>
            Dispatch
          </div>
        </>
      )}

      {selected.id === "otp" && (
        <>
          <div className="case-flow-node">
            <span>01</span>
            Delivery order
          </div>

          <ChevronRight
            size={14}
            className="case-flow-arrow"
          />

          <div className="case-flow-node">
            <span>02</span>
            OTP visibility
          </div>

          <ChevronRight
            size={14}
            className="case-flow-arrow"
          />

          <div className="case-flow-node">
            <span>03</span>
            Delivery verification
          </div>

          <ChevronRight
            size={14}
            className="case-flow-arrow"
          />

          <div className="case-flow-node">
            <span>04</span>
            MDND reduction
          </div>
        </>
      )}

      {selected.id === "refund" && (
        <>
          <div className="case-flow-node">
            <span>01</span>
            Order issue
          </div>

          <ChevronRight
            size={14}
            className="case-flow-arrow"
          />

          <div className="case-flow-node">
            <span>02</span>
            Select affected item
          </div>

          <ChevronRight
            size={14}
            className="case-flow-arrow"
          />

          <div className="case-flow-node">
            <span>03</span>
            Select reason
          </div>

          <ChevronRight
            size={14}
            className="case-flow-arrow"
          />

          <div className="case-flow-node">
            <span>04</span>
            Item-level resolution
          </div>
        </>
      )}

      {selected.id === "growth" && (
        <>
          <div className="case-flow-node">
            <span>01</span>
            Traffic
          </div>

          <ChevronRight
            size={14}
            className="case-flow-arrow"
          />

          <div className="case-flow-node">
            <span>02</span>
            Buy experience
          </div>

          <ChevronRight
            size={14}
            className="case-flow-arrow"
          />

          <div className="case-flow-node">
            <span>03</span>
            Experimentation
          </div>

          <ChevronRight
            size={14}
            className="case-flow-arrow"
          />

          <div className="case-flow-node">
            <span>04</span>
            Conversion / AOV
          </div>
        </>
      )}

      {selected.id === "ops" && (
        <>
          <div className="case-flow-node">
            <span>01</span>
            Order
          </div>

          <ChevronRight
            size={14}
            className="case-flow-arrow"
          />

          <div className="case-flow-node">
            <span>02</span>
            Warehouse allocation
          </div>

          <ChevronRight
            size={14}
            className="case-flow-arrow"
          />

          <div className="case-flow-node">
            <span>03</span>
            Courier assignment
          </div>

          <ChevronRight
            size={14}
            className="case-flow-arrow"
          />

          <div className="case-flow-node">
            <span>04</span>
            Cost reduction
          </div>
        </>
      )}

    </div>
  </div>

</div>

      {/* CASE STUDY */}
      <div className="case-study">

        <section className="case-section">
          <div className="case-section-label">
            <span>01</span>
            PROBLEM
          </div>

          <div className="case-section-content">
            <h3>What was broken?</h3>
            <p>
              {selected.sections.problem}
            </p>
          </div>
        </section>

        <section className="case-section">
          <div className="case-section-label">
            <span>02</span>
            APPROACH
          </div>

          <div className="case-section-content">
            <h3>How I approached it</h3>
            <p>
              I broke the problem down into the
              customer pain point, operational
              constraint and the underlying
              product/system dependency before
              defining the solution.
            </p>
          </div>
        </section>

        <section className="case-section">
          <div className="case-section-label">
            <span>03</span>
            SOLUTION
          </div>

          <div className="case-section-content">
            <h3>What we built</h3>
            <p>
              {selected.sections.solution}
            </p>
          </div>
        </section>

        <section className="case-section case-section-impact">
          <div className="case-section-label">
            <span>04</span>
            IMPACT
          </div>

          <div className="case-section-content">
            <h3>What changed</h3>
            <p>
              {selected.sections.result}
            </p>
          </div>
        </section>

        <section className="case-section">
          <div className="case-section-label">
            <span>05</span>
            PM LENS
          </div>

          <div className="case-section-content">
            <h3>What I took away</h3>
            <p>
              {selected.sections.learning}
            </p>
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <div className="case-footer">
        <span>CASE STUDY · DARSHAN.OS</span>

        <button
          onClick={() => setSelected(null)}
        >
          CLOSE CASE STUDY
          <X size={14} />
        </button>
      </div>
    </article>
  </div>
)}

      {/* COMMAND PALETTE */}

      {palette && (
        <div
          className="modal-backdrop"
          onClick={() => setPalette(false)}
        >
          <div
            className="palette"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="palette-search">
              <Search size={17} />

              <input
                autoFocus
                placeholder="Search Darshan OS..."
              />

              <kbd>ESC</kbd>
            </div>

            <div className="palette-list">
              {[
                ['Experience', 'experience'],
                ['Products', 'products'],
                ['Impact', 'impact'],
                ['Playbook', 'playbook'],
                ['AI Lab', 'ai-lab'],
                ['Toolkit', 'toolkit'],
                ['Contact', 'contact'],
              ].map(([name, id]) => (
                <button
                  key={id}
                  onClick={() => {
                    setPalette(false)
                    scrollTo(id)
                  }}
                >
                  <span>{name}</span>
                  <ChevronRight size={15} />
                </button>
              ))}

              <a
                href="/assets/Darshan_Shetty_Resume.pdf"
                download
                onClick={() => setPalette(false)}
              >
                <span>Download Resume</span>
                <Download size={15} />
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}