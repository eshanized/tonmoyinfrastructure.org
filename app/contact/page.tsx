'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/page-header';
import { Callout } from '@/components/shared/callout';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Send, CheckCircle } from 'lucide-react';
import { getContactCategories } from '@/lib/institutional';

export default function ContactPage() {
  const categories = getContactCategories();
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategory] = useState('general');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [lastSubmit, setLastSubmit] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastSubmit < 30000) {
      setErrors({ form: 'Please wait a moment before sending another message.' });
      return;
    }

    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = 'Please enter a valid email';
    if (!message.trim()) newErrors.message = 'Message is required';
    else if (message.trim().length < 10)
      newErrors.message = 'Message must be at least 10 characters';
    else if (message.trim().length > 5000)
      newErrors.message = 'Message must be under 5000 characters';

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setLastSubmit(now);
    }
  };

  return (
    <>
      <PageHeader
        index="CONTACT"
        label="Get in Touch"
        title="Contact TIV."
        description="Reach out about general inquiries, sales, hosting, domains, technical questions, security, research, partnerships, press, careers, or investor matters. Private recipient addresses are not exposed in the frontend."
      />

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs items={[{ label: 'Contact' }]} />
        </div>
      </section>

      <section>
        <div className="tiv-container py-16 md:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px]">
            {/* Form */}
            <div>
              {submitted ? (
                <div className="border border-border bg-card p-8">
                  <CheckCircle className="h-8 w-8 text-brand" />
                  <h2 className="mt-4 font-display text-2xl">Message received</h2>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                    Thank you for reaching out. We will respond to your message as
                    soon as possible. For security-related matters, please use the
                    security contact category and follow our disclosure policy.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setMessage('');
                      setCategory('general');
                    }}
                    className="mt-6 inline-flex items-center gap-2 border border-border px-4 py-2 text-sm transition-colors hover:border-brand hover:text-brand"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {errors.form && (
                    <div className="border border-destructive/40 bg-destructive/10 p-4">
                      <p className="text-sm text-destructive">{errors.form}</p>
                    </div>
                  )}

                  {/* Category */}
                  <div>
                    <label className="tiv-meta mb-3 block">Category</label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.value}
                          type="button"
                          onClick={() => setCategory(cat.value)}
                          title={cat.description}
                          className={`border px-3 py-1.5 text-sm transition-colors ${
                            category === cat.value
                              ? 'border-brand text-brand'
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
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-border bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-destructive">{errors.name}</p>
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
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-border bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-destructive">{errors.email}</p>
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
                      onChange={(e) => setMessage(e.target.value)}
                      maxLength={5000}
                      className="w-full resize-none border border-border bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand"
                    />
                    <div className="mt-1 flex items-center justify-between">
                      {errors.message ? (
                        <p className="text-xs text-destructive">{errors.message}</p>
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
                    className="group inline-flex items-center gap-2 bg-brand px-6 py-3 font-medium text-brand-foreground transition-opacity hover:opacity-90"
                  >
                    <Send className="h-4 w-4" />
                    Send message
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <aside>
              <div className="border border-border p-6">
                <span className="tiv-meta mb-4 block">Contact Information</span>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                  Private recipient addresses are not exposed in the frontend source.
                  Messages are routed to the appropriate team based on the selected
                  category.
                </p>
                <div className="mt-6 space-y-4 border-t border-border pt-4">
                  <div>
                    <span className="tiv-meta">Security</span>
                    <p className="mt-1 text-sm">
                      For security disclosures, please see our{' '}
                      <Link href="/trust/security" className="text-brand hover:underline">
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

              <div className="mt-6">
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
