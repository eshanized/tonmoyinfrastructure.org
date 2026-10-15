'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/page-header';
import { Callout } from '@/components/shared/callout';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Send, CheckCircle, MapPin, ExternalLink, Navigation, AlertCircle, Loader2, Phone } from 'lucide-react';
import { getContactCategories, getOfficeAddress } from '@/lib/institutional';

export default function ContactPage() {
  const categories = getContactCategories();
  const office = getOfficeAddress();

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [category, setCategory] = useState('general');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isUnconfigured, setIsUnconfigured] = useState(false);
  const [lastSubmit, setLastSubmit] = useState(0);

  const mountTimeRef = useRef<number>(0);

  useEffect(() => {
    mountTimeRef.current = Date.now();
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const catParam = searchParams.get('category');
      if (catParam && categories.some((c) => c.value === catParam.toLowerCase())) {
        setCategory(catParam.toLowerCase());
      }
    }
  }, [categories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setIsUnconfigured(false);

    const now = Date.now();
    if (now - lastSubmit < 15000) {
      setErrors({ form: 'Please wait a few moments before sending another message.' });
      return;
    }

    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    else if (name.trim().length > 100) newErrors.name = 'Name must be 100 characters or fewer';

    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      newErrors.email = 'Please enter a valid email address';
    else if (email.trim().length > 254)
      newErrors.email = 'Email must be 254 characters or fewer';

    if (!message.trim()) newErrors.message = 'Message is required';
    else if (message.trim().length < 10)
      newErrors.message = 'Message must be at least 10 characters';
    else if (message.trim().length > 5000)
      newErrors.message = 'Message must be under 5000 characters';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setStatus('submitting');

    try {
      const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || '/api/contact';
      const payload = {
        name: name.trim(),
        email: email.trim(),
        category,
        message: message.trim(),
        hp: honeypot,
        submittedAt: mountTimeRef.current,
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      let responseData: { success?: boolean; error?: string; code?: string } = {};
      try {
        responseData = await response.json();
      } catch {
        responseData = {};
      }

      if (response.ok && responseData.success) {
        setStatus('success');
        setLastSubmit(now);
      } else {
        setStatus('error');
        if (responseData.code === 'UNCONFIGURED' || response.status === 503) {
          setIsUnconfigured(true);
          setServerError(
            responseData.error ||
              'The contact delivery service is currently not configured with live credentials. Please contact our official office directly via telephone or address.'
          );
        } else {
          setServerError(
            responseData.error ||
              'We were unable to deliver your message at this time. Please try again or reach out by telephone.'
          );
        }
      }
    } catch {
      setStatus('error');
      setServerError(
        'Network error: unable to reach the contact delivery endpoint. Please reach out to TIV directly via office telephone or mail.'
      );
    }
  };

  return (
    <>
      <PageHeader
        index="CONTACT"
        label="Get in Touch"
        title="Contact TIV."
        description="Reach out about general inquiries, sales, hosting, domains, technical questions, security, research, partnerships, press, careers, or investor matters. Private recipient addresses are not exposed in frontend bundles."
      />

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs items={[{ label: 'Contact' }]} />
        </div>
      </section>

      <section>
        <div className="tiv-container py-16 md:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px]">
            {/* Form Column */}
            <div>
              {status === 'success' ? (
                <div className="border border-border bg-card p-8" role="status" aria-live="polite">
                  <CheckCircle className="h-8 w-8 text-emerald-400" />
                  <h2 className="mt-4 font-display text-2xl text-foreground">Message delivered</h2>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                    Thank you for reaching out. Your transmission has been confirmed by our receiving
                    system. We will respond to your message as soon as possible. For security-related matters,
                    please follow our responsible disclosure guidelines.
                  </p>
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setName('');
                      setEmail('');
                      setMessage('');
                      setCategory('general');
                      setHoneypot('');
                      mountTimeRef.current = Date.now();
                    }}
                    className="mt-6 inline-flex items-center gap-2 border border-border px-4 py-2 text-sm transition-colors hover:border-brand hover:text-brand"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Honeypot field for bot defense (visually and auditorially hidden) */}
                  <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                    <label htmlFor="hp_field">Do not fill this field</label>
                    <input
                      id="hp_field"
                      type="text"
                      name="hp"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {errors.form && (
                    <div
                      className="border border-destructive/40 bg-destructive/10 p-4"
                      role="alert"
                    >
                      <p className="text-sm text-destructive">{errors.form}</p>
                    </div>
                  )}

                  {serverError && (
                    <div
                      className="border border-destructive/40 bg-destructive/10 p-5 space-y-3"
                      role="alert"
                    >
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-sm font-semibold text-destructive">
                            {isUnconfigured ? 'Contact Service Unconfigured' : 'Delivery Failure'}
                          </h3>
                          <p className="mt-1 text-xs text-destructive/90 leading-relaxed">
                            {serverError}
                          </p>
                        </div>
                      </div>

                      {/* Verified alternative contact options */}
                      <div className="border-t border-destructive/20 pt-3 text-xs text-foreground font-mono space-y-1">
                        <p className="font-semibold text-muted-foreground uppercase text-[10px]">
                          Verified Direct Contact Alternative:
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Phone className="h-3 w-3 text-brand" />
                          <span>Office Phone: </span>
                          <a
                            href={office.telephoneUri}
                            className="text-brand hover:underline font-semibold"
                          >
                            {office.phone}
                          </a>
                        </p>
                        <p className="text-muted-foreground">
                          Address: {office.street}, {office.city}, {office.region} {office.postalCode}, {office.country}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Category */}
                  <div>
                    <label className="tiv-meta mb-3 block" id="category-label">
                      Category
                    </label>
                    <div
                      role="radiogroup"
                      aria-labelledby="category-label"
                      className="flex flex-wrap gap-2"
                    >
                      {categories.map((cat) => (
                        <button
                          key={cat.value}
                          type="button"
                          role="radio"
                          aria-checked={category === cat.value}
                          onClick={() => setCategory(cat.value)}
                          title={cat.description}
                          className={`border px-3 py-1.5 text-sm transition-colors ${
                            category === cat.value
                              ? 'border-brand text-brand font-medium'
                              : 'border-border text-muted-foreground hover:border-brand/40'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="tiv-meta mb-2 block">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      disabled={status === 'submitting'}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-border bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand disabled:opacity-50"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-xs text-destructive">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="tiv-meta mb-2 block">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      disabled={status === 'submitting'}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-border bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand disabled:opacity-50"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-xs text-destructive">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="tiv-meta mb-2 block">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      value={message}
                      disabled={status === 'submitting'}
                      onChange={(e) => setMessage(e.target.value)}
                      maxLength={5000}
                      className="w-full resize-none border border-border bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand disabled:opacity-50"
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    <div className="mt-1 flex items-center justify-between">
                      {errors.message ? (
                        <p id="message-error" className="text-xs text-destructive">
                          {errors.message}
                        </p>
                      ) : (
                        <span />
                      )}
                      <span className="font-mono text-xs text-muted-foreground/60">
                        {message.length}/5000
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="group inline-flex items-center gap-2 bg-brand px-6 py-3 font-medium text-brand-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="border border-border p-6">
                <span className="tiv-meta mb-4 block">Contact Information</span>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                  Private recipient addresses are not exposed in the frontend source.
                  Messages are routed securely to the appropriate team based on the selected
                  category.
                </p>
                <div className="mt-6 space-y-4 border-t border-border pt-4">
                  <div>
                    <span className="tiv-meta">Security</span>
                    <p className="mt-1 text-sm">
                      For security disclosures, please see our{' '}
                      <Link href="/security" className="text-brand hover:underline">
                        security center
                      </Link>{' '}
                      for responsible disclosure guidelines.
                    </p>
                  </div>
                  <div>
                    <span className="tiv-meta">Investors</span>
                    <p className="mt-1 text-sm text-muted-foreground">
                      For investor or stakeholder inquiries, visit the{' '}
                      <Link href="/investors" className="text-brand hover:underline">
                        investors page
                      </Link>
                      .
                    </p>
                  </div>
                  <div>
                    <span className="tiv-meta">Response Time</span>
                    <p className="mt-1 text-sm text-muted-foreground">
                      We aim to respond within 3-5 business days for general
                      inquiries. Security reports are prioritized.
                    </p>
                  </div>
                </div>
              </div>

              {/* Official Office Address */}
              <div className="border border-border p-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-brand" aria-hidden="true" />
                  <span className="tiv-meta">Official Office Address</span>
                </div>
                <div className="mt-4 space-y-1 text-sm leading-relaxed">
                  <p className="font-medium text-foreground">
                    {office.street}
                  </p>
                  <p className="text-muted-foreground">
                    {office.city}, {office.region} {office.postalCode}
                  </p>
                  <p className="text-muted-foreground">
                    {office.country}
                  </p>
                </div>

                <div className="mt-5 space-y-3 border-t border-border pt-4">
                  <div>
                    <span className="tiv-meta">Telephone</span>
                    <p className="mt-1">
                      <a
                        href={office.telephoneUri}
                        className="font-mono text-sm text-foreground transition-colors hover:text-brand"
                      >
                        {office.phone}
                      </a>
                    </p>
                  </div>
                  <div className="pt-1">
                    <a
                      href={office.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
                    >
                      <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
                      View map &amp; directions
                      <ExternalLink className="h-3 w-3 opacity-70" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <Callout type="info" title="Privacy">
                  Your message is processed to route it to the right team. We do not
                  share your information with third parties. No tracking or
                  analytics are used on this form.
                </Callout>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
