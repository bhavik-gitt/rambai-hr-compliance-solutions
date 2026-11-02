import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Clock3,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Search,
  Sparkles,
  Target,
  Users,
  X,
} from 'lucide-react'
import { ConsultationForm } from './components/ConsultationForm'
import { articles, company, createWhatsAppUrl, directWhatsAppUrl, registrations, Service, services } from './data/siteData'

const heroPhoto = '/images/hr-consultation.jpg'
const aboutPhoto = '/images/office-team.jpg'

function Link({ href, className = '', children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const external = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')
  return <a href={href} className={className} {...props} {...(external ? { target: href.startsWith('http') ? '_blank' : undefined, rel: 'noreferrer' } : {})}>{children}</a>
}

function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className={`brand ${inverse ? 'brand-inverse' : ''}`} aria-label="RAMBAI home">
      <img src="/images/rambai-logo.png" alt="RAMBAI HR & Compliance Solutions" />
    </Link>
  )
}

function Header({ path }: { path: string }) {
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const mobileMenu = useRef<HTMLElement>(null)
  const active = (href: string) => href === '/' ? path === '/' : path.startsWith(href)
  useEffect(() => setOpen(false), [path])
  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    document.documentElement.classList.toggle('menu-open', open)
    if (open) {
      mobileMenu.current?.querySelector<HTMLAnchorElement>('a')?.focus()
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.classList.remove('menu-open')
      document.documentElement.classList.remove('menu-open')
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  function closeMobileMenuOnNavigation(event: React.MouseEvent<HTMLElement>) {
    if ((event.target as HTMLElement).closest('a')) setOpen(false)
  }

  return (
    <header className="site-header">
      <div className="topbar">
        <span>Professional HR & compliance support</span>
        <div><Link href={company.phoneHref}><Phone size={13} /> {company.phone}</Link><Link href={`mailto:${company.email}`}><Mail size={13} /> {company.email}</Link></div>
      </div>
      <nav className="nav-wrap" aria-label="Main navigation">
        <Brand />
        <div className="desktop-nav">
          <Link href="/" aria-current={active('/') ? 'page' : undefined} className={active('/') ? 'active' : ''}>Home</Link>
          <Link href="/about" aria-current={active('/about') ? 'page' : undefined} className={active('/about') ? 'active' : ''}>About Us</Link>
          <div className="nav-dropdown">
            <Link href="/services" aria-haspopup="true" aria-current={active('/services') ? 'page' : undefined} className={active('/services') ? 'active' : ''}>Services <ChevronDown size={14} /></Link>
            <div className="mega-menu" aria-label="Services menu">
              <div className="mega-intro"><span>OUR EXPERTISE</span><h3>People and compliance, considered together.</h3><Link href="/services">Explore all services <ArrowRight size={15} /></Link></div>
              <div className="mega-links">{services.map((service) => <Link key={service.slug} href={service.path}><service.icon size={18} /><span>{service.title}<small>{service.category}</small></span></Link>)}</div>
            </div>
          </div>
          <div className="nav-dropdown registration-drop">
            <Link href="/registrations" aria-haspopup="true" aria-current={active('/registrations') ? 'page' : undefined} className={active('/registrations') ? 'active' : ''}>Registrations <ChevronDown size={14} /></Link>
            <div className="sub-menu" aria-label="Registrations menu">{registrations.map((item) => <Link key={item.slug} href={item.path}>{item.title}<ChevronRight size={14} /></Link>)}</div>
          </div>
          <Link href="/insights" aria-current={active('/insights') ? 'page' : undefined} className={active('/insights') ? 'active' : ''}>Insights</Link>
          <Link href="/contact" aria-current={active('/contact') ? 'page' : undefined} className={active('/contact') ? 'active' : ''}>Contact</Link>
        </div>
        <Link href="/contact#consultation" className="button button-gold nav-cta">Request a Consultation</Link>
        <button ref={menuButton} className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-controls="mobile-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </nav>
      {open && <nav ref={mobileMenu} id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" onClick={closeMobileMenuOnNavigation}>
        <Link href="/">Home</Link><Link href="/about">About Us</Link><Link href="/services">Services</Link>
        <div className="mobile-sublinks">{services.map((s) => <Link key={s.slug} href={s.path}>{s.shortTitle}</Link>)}</div>
        <Link href="/registrations">Registrations</Link>
        <div className="mobile-sublinks">{registrations.map((r) => <Link key={r.slug} href={r.path}>{r.title}</Link>)}</div>
        <Link href="/insights">Insights</Link><Link href="/contact">Contact</Link>
        <Link href="/contact#consultation" className="button button-gold">Request a Consultation</Link>
      </nav>}
    </header>
  )
}

function Footer() {
  return (
    <footer>
      <div className="footer-cta">
        <div><p className="eyebrow">START A CONVERSATION</p><h2>Let’s make HR & compliance simpler for your business.</h2><p>Tell us about your requirements. We’ll help you explore appropriate support.</p></div>
        <div><Link href="/contact" className="button button-gold">Request a Consultation <ArrowRight size={17} /></Link><Link href={directWhatsAppUrl} className="button button-light"><MessageCircle size={18} /> Chat on WhatsApp</Link></div>
      </div>
      <div className="footer-main">
        <div className="footer-brand"><Brand inverse /><p>Professional HR consultancy, workforce management, payroll, labour compliance, and registration assistance for businesses.</p><span>{company.tagline}</span></div>
        <div><h3>Company</h3><Link href="/about">About RAMBAI</Link><Link href="/services">Our Services</Link><Link href="/insights">Knowledge Centre</Link><Link href="/contact">Contact Us</Link></div>
        <div><h3>Services</h3>{services.slice(0, 6).map((s) => <Link key={s.slug} href={s.path}>{s.shortTitle}</Link>)}</div>
        <div><h3>Registrations</h3>{registrations.slice(0, 6).map((r) => <Link key={r.slug} href={r.path}>{r.title.replace(' Registration', '')}</Link>)}</div>
        <div className="footer-contact"><h3>Connect</h3><Link href={company.phoneHref}><Phone size={16} /> {company.phone}</Link><Link href={`mailto:${company.email}`}><Mail size={16} /> {company.email}</Link><span><MapPin size={16} /> {company.location}</span><p><b>Founder & Proprietor</b><br />{company.founder}</p></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} {company.name}. All rights reserved.</span><div><Link href="/privacy-policy">Privacy Policy</Link><Link href="/terms-and-conditions">Terms & Conditions</Link></div></div>
    </footer>
  )
}

function PageHero({ label, title, text, image, mark }: { label: string; title: string; text: string; image?: string; mark?: React.ReactNode }) {
  return <section className={`page-hero ${mark ? 'page-hero-service' : ''}`}><div className="page-hero-lines" /><div className="container page-hero-inner"><div><Breadcrumb /><p className="eyebrow light">{label}</p><h1>{title}</h1><p>{text}</p></div>{image && <div className="page-hero-image"><img src={image} alt="" /></div>}{mark && <div className="service-hero-mark" aria-hidden="true">{mark}<span>RAMBAI<br />Professional Support</span></div>}</div></section>
}

function Breadcrumb() {
  const parts = location.pathname.split('/').filter(Boolean)
  return <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link>{parts.map((part, i) => <span key={part}><ChevronRight size={13} />{i === parts.length - 1 ? <b>{part.replace(/-/g, ' ')}</b> : <Link href={`/${parts.slice(0, i + 1).join('/')}`}>{part.replace(/-/g, ' ')}</Link>}</span>)}</nav>
}

function SectionTitle({ label, title, text, align = 'left' }: { label: string; title: string; text?: string; align?: 'left' | 'center' }) {
  return <div className={`section-title ${align}`}><p className="eyebrow">{label}</p><h2>{title}</h2>{text && <p>{text}</p>}</div>
}

function ServiceGrid({ limit }: { limit?: number }) {
  const cards = limit ? services.slice(0, limit - 1) : services
  return <div className="service-grid">{cards.map((service, index) => <ServiceCard key={service.slug} service={service} index={index} />)}{limit && <article className="service-card registration-card"><span className="card-number">08</span><div className="icon-box"><BriefcaseBusiness /></div><h3>Registrations & Licensing</h3><p>Support for business and workforce-related registrations with clear process coordination.</p><div className="card-links"><Link href="/registrations">Learn More <ArrowRight size={15} /></Link><Link href="/contact">Enquire Now <ArrowUpRight size={14} /></Link></div></article>}</div>
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon
  return <article className="service-card"><span className="card-number">{String(index + 1).padStart(2, '0')}</span><div className="icon-box"><span /><Icon /></div><p className="card-category">{service.cardLabel}</p><h3><Link href={service.path}>{service.title}</Link></h3><p>{service.summary}</p><div className="card-links"><Link href={service.path} aria-label={`Learn more about ${service.title}`}>Explore Service <ArrowRight size={15} /></Link><Link href={`/contact?service=${service.slug}`} aria-label={`Enquire about ${service.title}`}>Enquire <ArrowUpRight size={14} /></Link></div></article>
}

function FounderSection({ expanded = false }: { expanded?: boolean }) {
  return <section className={`founder-section ${expanded ? 'expanded' : ''}`}><div className="founder-monogram" aria-hidden="true">R</div><div className="container founder-grid"><div className="founder-photo"><img src="/images/founder.jpg" loading="lazy" alt="Dhaval Ratnotar, Founder and Proprietor of RAMBAI" /><div className="founder-seal"><span>Founder-led</span><b>RAMBAI</b></div><div className="photo-caption"><b>Dhaval Ratnotar</b><span>Founder & Proprietor</span></div></div><div className="founder-copy"><p className="eyebrow light">LEADERSHIP</p><h2>A personal commitment to professional business support.</h2><div className="leadership-meta"><span>FOUNDER-LED CONSULTANCY</span><span>AHMEDABAD · INDIA</span></div><div className="gold-rule" /><h3>Dhaval Ratnotar</h3><span>Founder & Proprietor<br />RAMBAI HR & COMPLIANCE SOLUTIONS</span><p>RAMBAI is led by Founder & Proprietor Dhaval Ratnotar, with a focus on providing professional HR consultancy and compliance support to businesses. The company’s approach centres on understanding business requirements and helping organisations navigate their HR and compliance responsibilities.</p>{expanded && <p>His leadership approach is grounded in clear communication, responsible assistance, and solutions considered in the context of each business. No one-size-fits-all promises—just a professional conversation about what support may be appropriate.</p>}<Link href="/contact" className="text-link">Connect With RAMBAI <ArrowRight size={17} /></Link></div></div></section>
}

const faqs = [
  ['What services does RAMBAI provide?', 'RAMBAI provides HR consultancy, recruitment, payroll support, labour law and contractor compliance assistance, PF and ESIC services, labour code support, and business registration assistance.'],
  ['Does RAMBAI support labour law compliance?', 'Yes. RAMBAI can assist businesses with organising applicable compliance processes, records, and documentation. The exact support depends on the establishment and its requirements.'],
  ['Can I enquire about payroll services?', 'Yes. Share your workforce and payroll requirements through the consultation form, phone, email, or WhatsApp.'],
  ['Does RAMBAI assist with PF and ESIC?', 'Yes. Support is available for PF and ESIC processes, employee record coordination, and related administration.'],
  ['Does RAMBAI provide business registration support?', 'Yes. RAMBAI assists with the listed professional tax, LWF, PF, Shop & Establishment, MSME, and labour licence registration processes where applicable.'],
  ['How do I request a consultation?', 'Use the consultation form, call +91 8200840016, email info.rambai@gmail.com, or continue to WhatsApp.'],
  ['How can I contact the company?', 'RAMBAI is available by phone and WhatsApp at +91 8200840016 and by email at info.rambai@gmail.com.'],
]

function FAQ({ items = faqs.slice(0, 5) }: { items?: string[][] }) {
  return <div className="faq-list">{items.map(([question, answer], i) => <details key={question} open={i === 0}><summary><span>{String(i + 1).padStart(2, '0')}</span>{question}<ChevronDown size={19} /></summary><p>{answer}</p></details>)}</div>
}

function Home() {
  return <main>
    <section className="hero">
      <div className="hero-pattern" />
      <div className="container hero-grid">
        <div className="hero-copy"><div className="hero-index">01 <span>RAMBAI</span></div><p className="eyebrow light">HR CONSULTANCY & STATUTORY COMPLIANCE</p><h1>Building stronger workforces. <em>Simplifying compliance.</em></h1><p>Your trusted partner for HR consultancy, payroll management, labour law compliance, recruitment, and business registration support.</p><div className="hero-actions"><Link href="/services" className="button button-gold">Explore Our Services <ArrowRight size={17} /></Link><Link href="/contact" className="button button-ghost">Request a Consultation</Link></div><div className="hero-tagline"><span /><b>{company.tagline}</b></div></div>
        <div className="hero-visual"><div className="hero-image"><img src={heroPhoto} fetchPriority="high" alt="Business professionals discussing workforce requirements in an office meeting" /><span className="image-credit">Photo: Smartworks Coworking / Unsplash</span></div><div className="hero-card"><Sparkles size={20} /><span>Practical support for growing organisations</span></div><div className="hero-location"><MapPin size={17}/><span>Ahmedabad, Gujarat<br /><b>Supporting businesses across India</b></span></div><div className="gold-frame" /></div>
      </div>
    </section>
    <section className="trust-strip"><div className="container">{['HR Consultancy', 'Labour Compliance', 'Payroll Management', 'Business Registrations'].map((item, i) => <div key={item}><span>0{i + 1}</span>{item}</div>)}</div></section>
    <section className="section intro-section"><div className="container intro-grid"><div className="intro-image"><img src={aboutPhoto} loading="lazy" alt="Professional team collaborating around a meeting table" /><span>BUSINESS SUPPORT · INDIA</span></div><div><SectionTitle label="ABOUT RAMBAI" title="Supporting businesses beyond everyday HR." text="RAMBAI HR & COMPLIANCE SOLUTIONS supports organisations with professional HR consultancy, workforce management, payroll services, labour law compliance, and statutory registration assistance." /><p>Based in Ahmedabad and available to support organisations across India, RAMBAI approaches every engagement with professional attention and clear communication.</p><Link href="/about" className="text-link">Discover RAMBAI <ArrowRight size={17} /></Link></div></div></section>
    <section className="section services-section"><div className="container"><SectionTitle align="center" label="WHAT WE DO" title="Integrated support for people, process, and compliance." text="Explore professional services shaped around the practical needs of growing organisations." /><ServiceGrid limit={8} /></div></section>
    <FounderSection />
    <section className="section why-section"><div className="container"><SectionTitle label="WHY RAMBAI" title="A considered approach to business support." /><div className="feature-grid">{[['Professional Guidance','Clear support grounded in your stated requirements.'],['Business-Focused Solutions','Recommendations considered in an operational context.'],['Compliance-Oriented Support','Organised assistance for relevant responsibilities.'],['Dedicated Client Communication','Direct, professional coordination throughout.']].map(([title,text],i)=><article key={title}><span>0{i+1}</span><CircleCheck /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className="section process-section"><div className="container"><SectionTitle align="center" label="HOW WE WORK" title="A clear path from requirement to support." /><div className="timeline">{['Understand Your Requirements','Evaluate Your Business Needs','Provide Suitable Solutions','Continue Professional Support'].map((title,i)=><div key={title}><span>0{i+1}</span><h3>{title}</h3><p>{['We listen carefully to your situation.','We consider the scope and operating context.','We outline appropriate support options.','We remain available for continued coordination.'][i]}</p></div>)}</div></div></section>
    <RegistrationsPreview />
    <InsightsPreview />
  </main>
}

function RegistrationsPreview() {
  return <section className="section registrations-section"><div className="container"><div className="split-title"><SectionTitle label="REGISTRATIONS & LICENSING" title="Structured assistance. Clearer processes." text="Explore support for key business and workforce-related registrations." /><Link href="/registrations" className="text-link">View All Registration Services <ArrowRight size={17} /></Link></div><div className="registration-grid">{registrations.map((item, i) => <Link href={item.path} key={item.slug} className="registration-item"><span>0{i + 1}</span><item.icon /><h3>{item.title}</h3><p>{item.summary}</p><b>Explore service <ArrowUpRight size={15} /></b></Link>)}</div></div></section>
}

function InsightsPreview() {
  return <section className="section insights-preview"><div className="container"><SectionTitle label="KNOWLEDGE CENTRE" title="Practical perspectives for responsible business operations." text="Sample educational content only—not legal updates or professional legal advice." /><div className="article-grid">{articles.slice(0, 4).map((article, i) => <ArticleCard article={article} key={article.slug} index={i} />)}</div><Link href="/insights" className="button button-dark">Visit Knowledge Centre <ArrowRight size={17} /></Link></div></section>
}

function ArticleCard({ article, index }: { article: typeof articles[number]; index: number }) {
  return <article className="article-card"><div className="article-visual"><BookOpen /><span>RAMBAI INSIGHT · {String(index + 1).padStart(2, '0')}</span></div><div><p className="card-category">{article.category}</p><h3><Link href={`/insights/${article.slug}`}>{article.title}</Link></h3><p>{article.excerpt}</p><span className="read-time"><Clock3 size={14} /> {article.read}</span><Link href={`/insights/${article.slug}`} className="text-link">Read sample article <ArrowRight size={15} /></Link></div></article>
}

function About() {
  return <main><PageHero label="ABOUT RAMBAI" title="Professional support for responsible, people-focused businesses." text="RAMBAI helps organisations bring greater structure to HR, workforce, payroll, compliance, and registration processes." image="/images/founder.jpg" />
    <section className="section"><div className="container editorial-grid"><div><SectionTitle label="OUR COMPANY" title="Supporting organisations with clarity and care." /><p>RAMBAI HR & COMPLIANCE SOLUTIONS is an Ahmedabad-based consultancy supporting startups, SMEs, manufacturers, contractors, service providers, and growing organisations in Gujarat and across India.</p><p>Our work brings together people operations and compliance coordination—helping business owners and internal teams navigate practical responsibilities with professional support.</p></div><aside className="statement-card"><span>RAMBAI</span><blockquote>“People, compliance, and business progress should move forward together.”</blockquote><p>{company.tagline}</p></aside></div></section>
    <section className="section purpose-section"><div className="container"><div className="purpose-grid"><article><Target /><p className="eyebrow">OUR MISSION</p><h3>Practical support that contributes to responsible operations.</h3><p>To support businesses with practical HR solutions and professional compliance assistance that contribute to efficient workforce management and responsible business operations.</p></article><article><Sparkles /><p className="eyebrow">OUR VISION</p><h3>A dependable partner for growing organisations.</h3><p>To become a trusted business partner for organisations seeking dependable HR consultancy and compliance support.</p></article></div></div></section>
    <section className="section values-section"><div className="container"><SectionTitle align="center" label="OUR VALUES" title="Principles that shape every interaction." /><div className="values-row">{['Professionalism','Transparency','Responsibility','Client Focus','Continuous Improvement'].map((v,i)=><div key={v}><span>0{i+1}</span><h3>{v}</h3></div>)}</div></div></section>
    <section className="section"><div className="container approach-grid"><div><SectionTitle label="OUR APPROACH" title="Listen first. Understand the context. Support responsibly." /><p>Every business has different workforce structures, operating realities, and support needs. RAMBAI begins by understanding those requirements before discussing a suitable path forward.</p></div><div className="check-list">{['A direct conversation about your requirements','A practical review of the business context','Clear scope and communication','Coordinated, professional support','No unsupported promises or guaranteed approvals'].map(x=><p key={x}><Check size={18} />{x}</p>)}</div></div></section>
    <FounderSection expanded />
    <section className="section faq-section"><div className="container faq-grid"><SectionTitle label="WHY APPROACH RAMBAI" title="Start with a clear business conversation." text="Whether you are formalising HR processes, reviewing compliance support, managing payroll, or preparing a registration, RAMBAI can help you explore the appropriate next step." /><FAQ /></div></section>
  </main>
}

function ServicesPage() {
  return <main><PageHero label="OUR SERVICES" title="People and compliance support, built around business needs." text="Explore focused services for HR management, workforce administration, statutory processes, payroll, recruitment, and registrations." />
    <section className="section services-catalog"><div className="container"><div className="category-section"><p className="eyebrow">Consultancy Services</p><div className="service-grid service-catalog-grid">{services.map((service,index)=><ServiceCard service={service} index={index} key={service.slug}/>)}</div></div><div className="category-section registration-catalog"><p className="eyebrow">Registrations & Licensing</p><div className="registration-grid">{registrations.map((r,i)=><Link href={r.path} className="registration-item" key={r.slug}><span>0{i+1}</span><r.icon/><h3>{r.title}</h3><p>{r.summary}</p><b>Explore service <ArrowRight size={15}/></b></Link>)}</div></div></div></section>
    <section className="section faq-section"><div className="container faq-grid"><SectionTitle label="COMMON QUESTIONS" title="Clear answers before you begin." /><FAQ /></div></section>
  </main>
}

function ServiceDetail({ service }: { service: Service }) {
  return <main><PageHero label={service.category} title={service.title} text={service.summary} mark={<service.icon />} />
    <section className="section detail-intro"><div className="container editorial-grid"><div><SectionTitle label="SERVICE OVERVIEW" title={`Professional support for ${service.shortTitle.toLowerCase()}.`} /><p>{service.intro}</p><p>RAMBAI starts by understanding your stated requirements and operational context before discussing a suitable scope of assistance.</p></div><aside className="detail-quick"><service.icon /><h3>Discuss this service</h3><p>Tell us about your organisation and the support you are looking for.</p><Link href={`/contact?service=${service.slug}`} className="button button-gold">Request a Consultation</Link><Link href={createWhatsAppUrl(`Hello RAMBAI HR & COMPLIANCE SOLUTIONS,\n\nI would like to enquire about ${service.title}.`)}>or continue on WhatsApp <ArrowUpRight size={14}/></Link></aside></div></section>
    <section className="section detail-band"><div className="container three-list"><div><SectionTitle label="BUSINESS CHALLENGES" title="Where businesses may need support." /><ul>{service.challenges.map(x=><li key={x}><span/><div><h3>{x}</h3><p>Bring greater clarity and structure to this part of your process.</p></div></li>)}</ul></div><div><SectionTitle label="WHAT IT COVERS" title="A practical scope of assistance." /><div className="check-list">{service.covers.map(x=><p key={x}><Check size={18}/>{x}</p>)}</div></div><div><SectionTitle label="INFORMATION TO PREPARE" title="Useful records for the first discussion." /><p className="document-note">The exact documents depend on the agreed scope. Where available, the following information can help RAMBAI understand your requirements.</p><div className="check-list">{service.documents.map(x=><p key={x}><Check size={18}/>{x}</p>)}</div></div></div></section>
    <section className="section"><div className="container"><SectionTitle align="center" label="POTENTIAL BUSINESS BENEFITS" title="More organised processes. Clearer coordination." /><div className="feature-grid">{service.benefits.map((x,i)=><article key={x}><span>0{i+1}</span><CircleCheck/><h3>{x}</h3><p>Potential outcomes depend on your business context, information, and applicable requirements.</p></article>)}</div></div></section>
    <section className="section assistance-section"><div className="container assistance-grid"><div><p className="eyebrow light">HOW RAMBAI CAN ASSIST</p><h2>A professional process from discussion to ongoing support.</h2></div><div className="check-list light">{['Understand your requirement and operating context','Identify a suitable support scope','Coordinate information and documentation','Communicate clearly through the process','Remain available for agreed ongoing assistance'].map(x=><p key={x}><Check size={18}/>{x}</p>)}</div></div></section>
    <section className="section"><div className="container faq-grid"><SectionTitle label="FREQUENTLY ASKED QUESTIONS" title={`Questions about ${service.shortTitle.toLowerCase()}.`} /><FAQ items={[[`What does ${service.shortTitle} support include?`, `Support may include ${service.covers.join(', ').toLowerCase()}. The final scope is discussed for your business.`],[`Is this service suitable for a growing business?`,'RAMBAI supports startups, SMEs, manufacturers, contractors, service providers, and growing organisations. Suitability depends on your requirements.'],['Can RAMBAI guarantee an approval or compliance outcome?','No. RAMBAI provides professional assistance and process coordination but does not make unsupported guarantees or promise statutory approvals.'],['How do we begin?','Share your requirements through the consultation form, WhatsApp, phone, or email.']]}/></div></section>
    <RelatedServices slugs={service.related}/>
  </main>
}

function RelatedServices({ slugs }: { slugs: string[] }) {
  return <section className="section related-section"><div className="container"><SectionTitle label="RELATED SERVICES" title="Continue exploring RAMBAI support." /><div className="service-grid three">{slugs.map((slug,i)=>{const s=services.find(x=>x.slug===slug)!;return <ServiceCard key={slug} service={s} index={i}/>})}</div></div></section>
}

function RegistrationsPage() {
  return <main><PageHero label="REGISTRATIONS & LICENSING" title="Clear, coordinated support for essential business registrations." text="RAMBAI helps businesses organise information, documentation, and process coordination for the registration services listed below." />
    <section className="section"><div className="container"><SectionTitle align="center" label="REGISTRATION SERVICES" title="Choose the support your business needs." text="Applicability and requirements can vary. RAMBAI begins with a discussion about your business."/><div className="registration-grid large">{registrations.map((r,i)=><Link href={r.path} className="registration-item" key={r.slug}><span>0{i+1}</span><r.icon/><h3>{r.title}</h3><p>{r.summary}</p><b>View service <ArrowRight size={15}/></b></Link>)}</div></div></section>
    <section className="section process-section"><div className="container"><SectionTitle align="center" label="OUR PROCESS" title="From requirement review to coordinated follow-up."/><div className="timeline">{['Discuss applicability','Prepare information','Coordinate application','Support follow-up'].map((x,i)=><div key={x}><span>0{i+1}</span><h3>{x}</h3><p>{['Start with your business context.','Organise the available documents.','Assist with the relevant process.','Provide updates and practical guidance.'][i]}</p></div>)}</div></div></section>
  </main>
}

function RegistrationDetail({ registration }: { registration: typeof registrations[number] }) {
  return <main><PageHero label="REGISTRATION & LICENSING" title={registration.title} text={registration.summary} mark={<registration.icon />}/>
    <section className="section"><div className="container editorial-grid"><div><SectionTitle label="OVERVIEW" title={`Practical assistance for ${registration.title.toLowerCase()}.`}/><p>RAMBAI can help businesses understand the information and documentation commonly needed to coordinate this registration process. Applicability, documentation, and processing can depend on the business and relevant authority requirements.</p><p>Support is professional and process-focused. Statutory approval is never guaranteed.</p></div><aside className="detail-quick"><registration.icon/><h3>Start your enquiry</h3><p>Share your business details so RAMBAI can discuss the appropriate next step.</p><Link href={`/contact?service=${registration.slug}`} className="button button-gold">Request Support</Link></aside></div></section>
    <section className="section detail-band"><div className="container two-list"><div><SectionTitle label="WHAT SUPPORT MAY COVER" title="Organised from the beginning."/><div className="check-list">{registration.covers.map(x=><p key={x}><Check size={18}/>{x}</p>)}</div></div><div><SectionTitle label="BEFORE YOU BEGIN" title="Prepare for a useful discussion."/><div className="check-list">{['Your business structure and location','The nature of your business activities','Available establishment information','Relevant workforce information, where applicable'].map(x=><p key={x}><Check size={18}/>{x}</p>)}</div></div></div></section>
    <section className="section"><div className="container faq-grid"><SectionTitle label="FREQUENTLY ASKED QUESTIONS" title="Registration support, explained."/><FAQ items={[[`Does RAMBAI assist with ${registration.title}?`,'Yes. RAMBAI can assist with information review, document coordination, and process support based on your requirements.'],['Are registration approvals guaranteed?','No. Approval and processing are controlled by the relevant authority. RAMBAI does not guarantee statutory outcomes.'],['What documents are required?','Requirements vary by registration and business context. RAMBAI can discuss a relevant checklist after understanding your organisation.'],['How can I begin?','Request a consultation or contact RAMBAI directly by WhatsApp, phone, or email.']]}/></div></section>
    <RegistrationsPreview/>
  </main>
}

function Insights() {
  const [query,setQuery]=useState('')
  const [category,setCategory]=useState('All')
  const categories=['All',...Array.from(new Set(articles.map(a=>a.category)))]
  const filtered=articles.filter(a=>(category==='All'||a.category===category)&&`${a.title} ${a.excerpt}`.toLowerCase().includes(query.toLowerCase()))
  return <main><PageHero label="KNOWLEDGE CENTRE" title="Practical ideas for people and responsible business operations." text="Educational sample content about HR, payroll, compliance processes, registrations, and recruitment. No fabricated legal updates or deadlines."/>
    <section className="section insights-page"><div className="container"><div className="insight-controls"><label><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search the knowledge centre" aria-label="Search articles"/></label><div className="filters">{categories.map(c=><button className={category===c?'active':''} onClick={()=>setCategory(c)} key={c}>{c}</button>)}</div></div><p className="sample-notice"><CircleCheck size={17}/> These are clearly marked sample educational articles and should not be treated as legal advice or current statutory notifications.</p><div className="article-grid">{filtered.map((a,i)=><ArticleCard key={a.slug} article={a} index={i}/>)}</div>{!filtered.length&&<div className="empty-state"><Search/><h3>No articles match your search.</h3><button onClick={()=>{setQuery('');setCategory('All')}}>Clear filters</button></div>}</div></section>
  </main>
}

function ArticleDetail({ slug }: { slug: string }) {
  const article=articles.find(a=>a.slug===slug) ?? articles[0]
  const sections=[
    ['Begin with clear ownership','A consistent business process starts with knowing who gathers information, who reviews it, and who keeps the relevant records organised.'],
    ['Keep information structured','Simple checklists, defined document locations, and recurring review points can make routine administration easier to coordinate.'],
    ['Review as the business changes','Workforce size, locations, engagement models, and internal responsibilities can change. Your processes should be reviewed when the operating context changes.'],
  ]
  return <main><PageHero label={`${article.category} · SAMPLE ARTICLE`} title={article.title} text={article.excerpt}/>
    <article className="section article-detail"><div className="article-body"><div className="sample-notice"><BookOpen size={17}/> Educational sample content only. It is not legal advice, a statutory update, or a statement of current deadlines.</div><p className="lead">Organised people and compliance processes can help a business work with greater clarity. The goal is not complexity—it is to make responsibilities, records, and communication easier to understand.</p>{sections.map(([h,p])=><section key={h}><h2>{h}</h2><p>{p}</p></section>)}<blockquote>Good process design makes the next responsible action easier to see.</blockquote><p>For advice relevant to your organisation, discuss your specific circumstances with an appropriate professional.</p></div><aside><h3>Article details</h3><p>{article.category}</p><p>{article.read}</p><hr/><h3>Discuss your requirements</h3><p>RAMBAI can help you explore practical HR and compliance support.</p><Link href="/contact" className="button button-gold">Request a Consultation</Link></aside></article>
    <section className="section related-section"><div className="container"><SectionTitle label="RELATED ARTICLES" title="Continue reading."/><div className="article-grid">{articles.filter(a=>a.slug!==slug).slice(0,3).map((a,i)=><ArticleCard key={a.slug} article={a} index={i}/>)}</div></div></section>
  </main>
}

function Contact() {
  return <main><PageHero label="CONTACT RAMBAI" title="Start a professional conversation about your business needs." text="Connect from Ahmedabad or anywhere in India by consultation form, phone, email, or WhatsApp."/>
    <section className="section contact-section"><div className="container contact-grid"><div className="contact-info"><SectionTitle label="DIRECT CONTACT" title="Choose the channel that works for you." text="For faster coordination, share your company name and the service you are looking for."/><div className="contact-cards"><Link href={company.phoneHref}><Phone/><span>CALL RAMBAI<b>{company.phone}</b></span><ArrowUpRight/></Link><Link href={directWhatsAppUrl}><MessageCircle/><span>WHATSAPP<b>{company.phone}</b></span><ArrowUpRight/></Link><Link href={`mailto:${company.email}`}><Mail/><span>BUSINESS EMAIL<b>{company.email}</b></span><ArrowUpRight/></Link><div><MapPin/><span>LOCATION<b>{company.location}</b></span></div></div><div className="availability"><span/><div><b>Professional enquiry support</b><p>We’ll respond through the contact details you provide. Response time is not guaranteed.</p></div></div></div><div id="consultation"><ConsultationForm compact/></div></div></section>
  </main>
}

function LegalPage({ type }: { type: 'privacy'|'terms' }) {
  const privacy=type==='privacy'
  return <main><PageHero label="LEGAL INFORMATION" title={privacy?'Privacy Policy':'Terms & Conditions'} text={privacy?'How information submitted through this website is intended to be handled.':'Important information about using this website and its content.'}/>
    <section className="section legal-page"><div className="container"><p className="updated">General website information · RAMBAI HR & COMPLIANCE SOLUTIONS</p>{(privacy?[
      ['Information you provide','When you contact RAMBAI, you may provide your name, company, email, phone number, city, requested service, and message.'],
      ['How information is used','Information is intended to be used to understand and respond to business enquiries, coordinate requested services, and maintain appropriate business communication.'],
      ['Enquiry delivery','The online API submission service may not yet be configured. WhatsApp, email, and phone actions are initiated by you through the relevant provider.'],
      ['Data sharing and security','RAMBAI does not intend to sell personal information. Reasonable care should be taken with submitted information, but no internet transmission can be guaranteed completely secure.'],
      ['Your choices','You may choose not to use the form and contact RAMBAI directly. You can request correction or deletion of enquiry information by emailing the company.'],
      ['Contact','Privacy questions can be sent to info.rambai@gmail.com.'],
    ]:[
      ['Website purpose','This website provides general information about RAMBAI and its HR, compliance, payroll, recruitment, and registration support services.'],
      ['No legal advice','Website content is general business information and does not constitute legal advice. Requirements may vary by business and applicable authority.'],
      ['No guarantee of outcomes','RAMBAI does not guarantee statutory approvals, registration outcomes, processing times, or specific business results.'],
      ['Accuracy and updates','RAMBAI aims to present accurate company information. Service content may be updated as business offerings evolve.'],
      ['Third-party services','Links to WhatsApp, email clients, phone services, and external image providers are subject to those providers’ terms.'],
      ['Contact','Questions about these terms can be sent to info.rambai@gmail.com.'],
    ]).map(([h,p])=><section key={h}><h2>{h}</h2><p>{p}</p></section>)}</div></section>
  </main>
}

function FloatingActions() {
  return <div className="floating-actions"><Link href={directWhatsAppUrl} aria-label="Chat on WhatsApp"><MessageCircle/><span>WhatsApp</span></Link><Link href="/contact#consultation" aria-label="Request a consultation"><BriefcaseBusiness/><span>Consultation</span></Link></div>
}

const titles: Record<string,string> = {
  '/':'HR & Compliance Consultancy','/about':'About Us','/services':'HR & Compliance Services','/registrations':'Registrations & Licensing','/insights':'Knowledge Centre','/contact':'Contact Us','/privacy-policy':'Privacy Policy','/terms-and-conditions':'Terms & Conditions'
}

function Router({ path }: { path: string }) {
  if(path==='/') return <Home/>
  if(path==='/about') return <About/>
  if(path==='/services') return <ServicesPage/>
  if(path==='/registrations') return <RegistrationsPage/>
  if(path==='/insights') return <Insights/>
  if(path==='/contact') return <Contact/>
  if(path==='/privacy-policy') return <LegalPage type="privacy"/>
  if(path==='/terms-and-conditions') return <LegalPage type="terms"/>
  const service=services.find(s=>s.path===path)
  if(service) return <ServiceDetail service={service}/>
  const registration=registrations.find(r=>r.path===path)
  if(registration) return <RegistrationDetail registration={registration}/>
  if(path.startsWith('/insights/')) return <ArticleDetail slug={path.split('/').pop()!}/>
  return <main><PageHero label="PAGE NOT FOUND" title="We couldn’t find that page." text="The link may have changed. Explore our services or return to the homepage."/><section className="section center-actions"><Link href="/" className="button button-dark">Return Home</Link><Link href="/services" className="button button-outline">Explore Services</Link></section></main>
}

export default function App() {
  const [path,setPath]=useState(location.pathname.replace(/\/$/,'')||'/')
  useEffect(()=>{
    const navigate=(event:MouseEvent)=>{
      const anchor=(event.target as HTMLElement).closest('a')
      if(!anchor||anchor.target==='_blank'||anchor.origin!==location.origin)return
      event.preventDefault()
      history.pushState({},'',anchor.href)
      setPath(location.pathname.replace(/\/$/,'')||'/')
      if (location.hash) {
        window.setTimeout(() => document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' }), 0)
      } else {
        window.scrollTo({top:0,behavior:'smooth'})
      }
    }
    const pop=()=>setPath(location.pathname.replace(/\/$/,'')||'/')
    document.addEventListener('click',navigate);window.addEventListener('popstate',pop)
    return()=>{document.removeEventListener('click',navigate);window.removeEventListener('popstate',pop)}
  },[])
  useEffect(()=>{
    const entity=services.find(s=>s.path===path)||registrations.find(r=>r.path===path)
    const pageTitle = `${entity?.title||titles[path]||'RAMBAI'} | RAMBAI HR & Compliance Solutions`
    document.title=pageTitle
    let meta=document.querySelector('meta[name="description"]')
    if(!meta){meta=document.createElement('meta');meta.setAttribute('name','description');document.head.appendChild(meta)}
    meta.setAttribute('content',entity?.summary||'Professional HR consultancy, labour compliance, payroll, recruitment, and registration support in Ahmedabad and across India.')
    let canonical=document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.appendChild(canonical)}
    canonical.href=`${location.origin}${path}`
    document.querySelector('meta[property="og:title"]')?.setAttribute('content',pageTitle)
    window.setTimeout(() => {
      if (location.hash) {
        document.querySelector(location.hash)?.scrollIntoView()
      } else {
        document.getElementById('main-content')?.focus({ preventScroll: true })
      }
    }, 250)
  },[path])
  const jsonLd=useMemo(()=>JSON.stringify({'@context':'https://schema.org','@type':'ProfessionalService',name:company.name,founder:company.founder,email:company.email,telephone:company.phone,address:{'@type':'PostalAddress',addressLocality:'Ahmedabad',addressRegion:'Gujarat',addressCountry:'IN'},areaServed:'India'}),[])
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd}}/><a className="skip-link" href="#main-content">Skip to main content</a><Header path={path}/><div id="main-content" className="page-transition" key={path} tabIndex={-1}><Router path={path}/></div><Footer/><FloatingActions/></>
}
