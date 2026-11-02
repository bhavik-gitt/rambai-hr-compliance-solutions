import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, LoaderCircle, MessageCircle, Send } from 'lucide-react'
import { allServiceOptions, createWhatsAppUrl, registrations, services } from '../data/siteData'
import { normalizeEnquiry, validateEnquiry } from '../lib/enquiryValidation'
import { EnquiryConfigurationError, EnquirySubmissionError, submitEnquiry } from '../services/enquiryService'
import { EnquiryDraft, EnquiryField, EnquiryFieldErrors } from '../types/enquiry'

const emptyForm: EnquiryDraft = {
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  city: '',
  serviceRequired: '',
  message: '',
}

export function ConsultationForm({ compact = false }: { compact?: boolean }) {
  const formElement = useRef<HTMLFormElement>(null)
  const submissionInProgress = useRef(false)
  const [form, setForm] = useState(() => {
    const requested = new URLSearchParams(location.search).get('service')
    const selected = services.find((item) => item.slug === requested)?.title
      ?? registrations.find((item) => item.slug === requested)?.title
      ?? ''
    return { ...emptyForm, serviceRequired: selected }
  })
  const [errors, setErrors] = useState<EnquiryFieldErrors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'unconfigured'>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  useEffect(() => {
    const requested = new URLSearchParams(location.search).get('service')
    const selected = services.find((item) => item.slug === requested)?.title
      ?? registrations.find((item) => item.slug === requested)?.title
    if (selected) setForm((current) => ({ ...current, serviceRequired: selected }))
  }, [])

  const whatsappUrl = useMemo(() => {
    const message = `Hello RAMBAI HR & COMPLIANCE SOLUTIONS,

I would like to enquire about your services.

Name: ${form.fullName}
Company: ${form.companyName}
Email: ${form.email}
Phone: ${form.phone}
City: ${form.city}
Service Required: ${form.serviceRequired}
Message: ${form.message}`
    return createWhatsAppUrl(message)
  }, [form])

  function validate() {
    const next = validateEnquiry(form, allServiceOptions)
    setErrors(next)
    if (Object.keys(next).length > 0) {
      requestAnimationFrame(() => formElement.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus())
    }
    return Object.keys(next).length === 0
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (submissionInProgress.current) return
    if (!validate()) return
    submissionInProgress.current = true
    setStatus('loading')
    setStatusMessage('')
    try {
      const response = await submitEnquiry({
        ...normalizeEnquiry(form),
        submittedAt: new Date().toISOString(),
      })
      setStatus('success')
      setStatusMessage(response.message ?? 'Your enquiry was submitted successfully. RAMBAI will review your request.')
      setForm(emptyForm)
    } catch (error) {
      const unconfigured = error instanceof EnquiryConfigurationError
      if (error instanceof EnquirySubmissionError && error.fieldErrors) {
        setErrors(error.fieldErrors)
        requestAnimationFrame(() => formElement.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus())
      }
      setStatus(unconfigured ? 'unconfigured' : 'error')
      setStatusMessage(error instanceof Error ? error.message : 'Unable to submit your enquiry.')
    } finally {
      submissionInProgress.current = false
    }
  }

  function update(field: EnquiryField, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }))
    if (status !== 'idle') setStatus('idle')
  }

  const field = (name: EnquiryField, label: string, type = 'text', placeholder = '', autoComplete = 'off') => (
    <label className="field" htmlFor={`enquiry-${name}`}>
      <span>{label}{['fullName', 'email', 'phone'].includes(name) && <b aria-hidden="true"> *</b>}</span>
      <input
        id={`enquiry-${name}`}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={['fullName', 'email', 'phone'].includes(name)}
        value={form[name]}
        onChange={(event) => update(name, event.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      />
      {errors[name] && <small id={`${name}-error`} className="field-error">{errors[name]}</small>}
    </label>
  )

  return (
    <div className={`form-shell ${compact ? 'form-compact' : ''}`}>
      <div className="form-heading">
        <p className="eyebrow">REQUEST A CONSULTATION</p>
        <h2>Tell us what your business needs.</h2>
        <p>Share a few details and choose how you would like to continue. Fields marked * are required.</p>
      </div>
      <form ref={formElement} onSubmit={handleSubmit} noValidate aria-label="Consultation enquiry" aria-busy={status === 'loading'}>
        <div className="form-grid">
          {field('fullName', 'Full Name', 'text', 'Your name', 'name')}
          {field('companyName', 'Company / Organisation Name', 'text', 'Business name', 'organization')}
          {field('email', 'Business Email', 'email', 'name@company.com', 'email')}
          {field('phone', 'Mobile Number', 'tel', '+91', 'tel')}
          {field('city', 'City', 'text', 'Your city', 'address-level2')}
          <label className="field" htmlFor="enquiry-service">
            <span>Service Required <b aria-hidden="true">*</b></span>
            <select id="enquiry-service" name="serviceRequired" required value={form.serviceRequired} onChange={(event) => update('serviceRequired', event.target.value)} aria-invalid={Boolean(errors.serviceRequired)} aria-describedby={errors.serviceRequired ? 'service-error' : undefined}>
              <option value="">Select a service</option>
              {allServiceOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
            {errors.serviceRequired && <small id="service-error" className="field-error">{errors.serviceRequired}</small>}
          </label>
        </div>
        <label className="field field-wide" htmlFor="enquiry-message">
          <span>Message / Business Requirements <b aria-hidden="true">*</b></span>
          <textarea id="enquiry-message" name="message" required rows={compact ? 4 : 5} value={form.message} onChange={(event) => update('message', event.target.value)} placeholder="Tell us how we can support your business" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : 'message-help'} />
          {errors.message ? <small id="message-error" className="field-error">{errors.message}</small> : <small id="message-help" className="field-help">Include your workforce size, location, or timing if relevant.</small>}
        </label>
        {statusMessage && <div className={`form-status ${status}`} role={status === 'error' || status === 'unconfigured' ? 'alert' : 'status'} aria-live="polite">{statusMessage}</div>}
        <div className="form-actions">
          <button className="button button-gold" type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? <LoaderCircle className="spin" size={18} /> : <Send size={18} />}
            {status === 'loading' ? 'Submitting…' : 'Submit Enquiry'}
          </button>
          <a className="button button-outline" href={whatsappUrl} target="_blank" rel="noreferrer">
            <MessageCircle size={18} /> Continue on WhatsApp <ArrowUpRight size={16} />
          </a>
        </div>
        <p className="form-note">WhatsApp opens with your details pre-filled. You choose whether to send the message inside WhatsApp.</p>
      </form>
    </div>
  )
}
