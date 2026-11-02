import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Calculator,
  ClipboardCheck,
  FileCheck2,
  Handshake,
  Landmark,
  Scale,
  ShieldCheck,
  Users,
  UserSearch,
} from 'lucide-react'

export const company = {
  name: 'RAMBAI HR & COMPLIANCE SOLUTIONS',
  shortName: 'RAMBAI',
  tagline: 'People • Compliance • Progress',
  founder: 'Dhaval Ratnotar',
  phone: '+91 8200840016',
  phoneHref: 'tel:+918200840016',
  whatsapp: 'https://wa.me/918200840016',
  email: 'info.rambai@gmail.com',
  location: 'Ahmedabad, Gujarat, India',
}

export function createWhatsAppUrl(message: string) {
  return `${company.whatsapp}?text=${encodeURIComponent(message)}`
}

export const directWhatsAppUrl = createWhatsAppUrl(`Hello RAMBAI HR & COMPLIANCE SOLUTIONS,

I would like to enquire about your services.`)

export type Service = {
  slug: string
  path: string
  title: string
  shortTitle: string
  category: string
  cardLabel: string
  summary: string
  intro: string
  challenges: string[]
  covers: string[]
  documents: string[]
  benefits: string[]
  related: string[]
  icon: typeof BriefcaseBusiness
}

export const services: Service[] = [
  {
    slug: 'hr-consultancy',
    path: '/services/hr-consultancy',
    title: 'HR Consultancy & Management',
    shortTitle: 'HR Consultancy',
    category: 'HR Solutions',
    cardLabel: 'HR Solutions',
    summary: 'Practical HR guidance designed around your people, policies, and business operations.',
    intro: 'Structured HR support helps businesses create clear people practices while keeping day-to-day management aligned with organisational needs.',
    challenges: ['Unstructured HR processes', 'Unclear employee policies', 'Growing workforce requirements', 'Inconsistent documentation'],
    covers: ['HR process review', 'Policy and documentation support', 'Workforce planning guidance', 'Day-to-day HR advisory'],
    documents: ['Organisation and workforce overview', 'Existing HR policies, if available', 'Current employee templates or process records', 'A list of immediate HR priorities'],
    benefits: ['More consistent people practices', 'Clearer responsibilities', 'Better organised HR operations', 'Support suited to business needs'],
    related: ['recruitment-staffing', 'payroll-management', 'labour-law-compliance'],
    icon: BriefcaseBusiness,
  },
  {
    slug: 'labour-law-compliance',
    path: '/services/labour-law-compliance',
    title: 'Labour Law Compliance',
    shortTitle: 'Labour Compliance',
    category: 'Statutory & Labour Compliance',
    cardLabel: 'Statutory Compliance',
    summary: 'Professional assistance for understanding and managing applicable labour compliance responsibilities.',
    intro: 'Labour compliance requires organised records, timely processes, and careful attention to the requirements that may apply to each establishment.',
    challenges: ['Understanding applicable obligations', 'Maintaining organised records', 'Coordinating recurring activities', 'Responding to compliance requirements'],
    covers: ['Compliance process guidance', 'Register and record support', 'Document coordination', 'Ongoing compliance assistance'],
    documents: ['Establishment profile and operating locations', 'Workforce categories and current headcount', 'Available registers and employment records', 'Relevant prior correspondence, if any'],
    benefits: ['Better organised compliance activity', 'Improved process visibility', 'More consistent documentation', 'Professional guidance when needed'],
    related: ['contractor-compliance', 'labour-code-support', 'pf-esic'],
    icon: Scale,
  },
  {
    slug: 'payroll-management',
    path: '/services/payroll-management',
    title: 'Payroll Management',
    shortTitle: 'Payroll Management',
    category: 'Payroll & Employee Benefits',
    cardLabel: 'Payroll Management',
    summary: 'Reliable payroll process support with a focus on accuracy, coordination, and confidentiality.',
    intro: 'A well-managed payroll process brings together attendance, salary inputs, deductions, and employee records in a consistent monthly workflow.',
    challenges: ['Complex payroll inputs', 'Changing employee data', 'Deduction coordination', 'Timely payroll processing'],
    covers: ['Payroll input coordination', 'Salary processing support', 'Payslip preparation', 'Payroll reporting assistance'],
    documents: ['Employee master information', 'Attendance and leave inputs', 'Salary structure and deduction inputs', 'Current payroll reports or payslips, if available'],
    benefits: ['A more structured payroll cycle', 'Clearer payroll records', 'Consistent employee documentation', 'Reduced administrative complexity'],
    related: ['pf-esic', 'hr-consultancy', 'labour-law-compliance'],
    icon: Calculator,
  },
  {
    slug: 'pf-esic',
    path: '/services/pf-esic',
    title: 'PF & ESIC Services',
    shortTitle: 'PF & ESIC Services',
    category: 'Payroll & Employee Benefits',
    cardLabel: 'Employee Benefits & Social Security',
    summary: 'Support for provident fund and ESIC processes, records, and employee coordination.',
    intro: 'PF and ESIC administration involves employee information, supporting records, recurring processes, and careful coordination.',
    challenges: ['Employee data coordination', 'Recurring process requirements', 'Record consistency', 'Employee queries'],
    covers: ['PF process assistance', 'ESIC process assistance', 'Employee record support', 'Documentation coordination'],
    documents: ['Establishment and employee master information', 'Existing registration or account details, if available', 'Employee joining and exit records', 'Available contribution or challan records'],
    benefits: ['More organised benefit administration', 'Clearer employee records', 'Better process continuity', 'Accessible professional support'],
    related: ['payroll-management', 'labour-law-compliance', 'hr-consultancy'],
    icon: ShieldCheck,
  },
  {
    slug: 'recruitment-staffing',
    path: '/services/recruitment-staffing',
    title: 'Recruitment & Staffing',
    shortTitle: 'Recruitment & Staffing',
    category: 'HR Solutions',
    cardLabel: 'Talent Acquisition',
    summary: 'Structured hiring support to help businesses identify people for defined workforce needs.',
    intro: 'Recruitment works best when role requirements, candidate communication, and selection coordination follow a clear process.',
    challenges: ['Defining role requirements', 'Finding relevant candidates', 'Screening applications', 'Coordinating hiring stages'],
    covers: ['Requirement understanding', 'Candidate sourcing support', 'Initial profile coordination', 'Interview scheduling assistance'],
    documents: ['Role description and key responsibilities', 'Required skills, location, and work arrangement', 'Employment terms available for discussion', 'Interview contacts and preferred timeline'],
    benefits: ['A clearer recruitment process', 'More focused candidate search', 'Efficient communication', 'Support for changing workforce needs'],
    related: ['hr-consultancy', 'contractor-compliance', 'payroll-management'],
    icon: UserSearch,
  },
  {
    slug: 'contractor-compliance',
    path: '/services/contractor-compliance',
    title: 'Contractor Compliance',
    shortTitle: 'Contractor Compliance',
    category: 'Statutory & Labour Compliance',
    cardLabel: 'Contractor Compliance',
    summary: 'Support for organising contractor-related workforce records and compliance processes.',
    intro: 'Businesses engaging contract labour benefit from clear documentation, coordinated records, and visibility across contractor processes.',
    challenges: ['Multiple contractor records', 'Workforce document coordination', 'Process oversight', 'Responsibility tracking'],
    covers: ['Contractor document review support', 'Workforce record coordination', 'Compliance process guidance', 'Periodic documentation assistance'],
    documents: ['Contractor list and scope of work', 'Contract workforce deployment information', 'Available agreements or licence details', 'Attendance, payment, and compliance records, if available'],
    benefits: ['Improved contractor visibility', 'More consistent documentation', 'Clearer coordination', 'Business-focused process support'],
    related: ['labour-law-compliance', 'labour-code-support', 'recruitment-staffing'],
    icon: Handshake,
  },
  {
    slug: 'labour-code-support',
    path: '/services/labour-code-support',
    title: 'Labour Code Support',
    shortTitle: 'Labour Code Support',
    category: 'Statutory & Labour Compliance',
    cardLabel: 'Statutory Compliance',
    summary: 'Practical support to help businesses review and prepare their people processes for evolving labour frameworks.',
    intro: 'Labour frameworks can affect policies, documentation, workforce practices, and internal responsibilities. Businesses need clear, context-specific guidance.',
    challenges: ['Understanding evolving frameworks', 'Reviewing existing practices', 'Preparing internal stakeholders', 'Updating documentation'],
    covers: ['Business impact discussions', 'Process readiness review', 'Documentation gap identification', 'Implementation support planning'],
    documents: ['Existing workforce policies and processes', 'Workforce and engagement-model overview', 'Available registers and supporting documents', 'Identified questions or readiness priorities'],
    benefits: ['Better organisational readiness', 'Clearer internal discussion', 'Prioritised process improvements', 'Professional support through change'],
    related: ['labour-law-compliance', 'contractor-compliance', 'hr-consultancy'],
    icon: FileCheck2,
  },
]

export type Registration = {
  slug: string
  path: string
  title: string
  summary: string
  icon: typeof Landmark
  covers: string[]
}

export const registrations: Registration[] = [
  { slug: 'professional-tax', path: '/registrations/professional-tax', title: 'Professional Tax Registration', summary: 'Application and documentation assistance for applicable professional tax requirements.', icon: Landmark, covers: ['Requirement review', 'Document checklist', 'Application coordination', 'Follow-up assistance'] },
  { slug: 'lwf', path: '/registrations/lwf', title: 'LWF Registration', summary: 'Process support for Labour Welfare Fund registration where applicable.', icon: Users, covers: ['Applicability discussion', 'Document preparation support', 'Registration coordination', 'Record guidance'] },
  { slug: 'pf', path: '/registrations/pf', title: 'Provident Fund Registration', summary: 'Structured support for establishment PF registration and related documentation.', icon: ShieldCheck, covers: ['Information review', 'Document checklist', 'Application assistance', 'Process coordination'] },
  { slug: 'shop-establishment', path: '/registrations/shop-establishment', title: 'Shop & Establishment Registration', summary: 'Registration assistance for businesses under applicable local requirements.', icon: Building2, covers: ['Requirement discussion', 'Document coordination', 'Application assistance', 'Process updates'] },
  { slug: 'msme', path: '/registrations/msme', title: 'MSME Registration', summary: 'Support for eligible businesses seeking MSME registration assistance.', icon: BadgeCheck, covers: ['Eligibility information', 'Data checklist', 'Registration support', 'Record assistance'] },
  { slug: 'labour-license', path: '/registrations/labour-license', title: 'Labour License Registration', summary: 'Documentation and application coordination for applicable labour licensing needs.', icon: ClipboardCheck, covers: ['Requirement review', 'Document preparation support', 'Application coordination', 'Follow-up guidance'] },
]

export const allServiceOptions = [
  ...services.map((service) => service.title),
  ...registrations.map((registration) => registration.title),
]

export const articles = [
  { slug: 'importance-labour-law-compliance', category: 'Labour Law Compliance', title: 'The Importance of an Organised Labour Compliance Process', excerpt: 'A practical overview of why documentation, ownership, and recurring review matter for business operations.', read: '5 min read' },
  { slug: 'understanding-payroll-management', category: 'Payroll Management', title: 'Understanding the Building Blocks of Payroll Management', excerpt: 'Explore the inputs and coordination that contribute to a consistent monthly payroll process.', read: '4 min read' },
  { slug: 'pf-esic-business-overview', category: 'PF & ESIC', title: 'PF and ESIC: A Business Process Overview', excerpt: 'A non-legal overview of employee data, documentation, and recurring administration.', read: '4 min read' },
  { slug: 'hr-practices-growing-businesses', category: 'HR Management', title: 'HR Management Practices for Growing Businesses', excerpt: 'Simple ways to bring greater structure to policies, employee records, and people communication.', read: '6 min read' },
  { slug: 'registration-readiness', category: 'Business Registrations', title: 'Preparing Business Information for Registration Support', excerpt: 'How an organised information checklist can make registration coordination more efficient.', read: '3 min read' },
  { slug: 'clear-hiring-requirements', category: 'Recruitment & Staffing', title: 'Why Clear Role Requirements Improve Hiring Conversations', excerpt: 'A practical guide to defining role purpose, responsibilities, and expectations before sourcing begins.', read: '4 min read' },
]
