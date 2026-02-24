import { useState } from 'react'
import { Send, CheckCircle, AlertCircle, Mail, Github, Linkedin, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface FormState {
  name: string
  email: string
  message: string
}

interface Errors {
  name?: string
  email?: string
  message?: string
}

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
  { icon: Mail, label: 'Email', href: 'mailto:alex@example.com' },
]

export function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [serverMsg, setServerMsg] = useState('')

  const validate = (): boolean => {
    const newErrors: Errors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required.'
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email.'
    }
    if (!form.message.trim()) {
      newErrors.message = 'Message is required.'
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setServerMsg(data.message)
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
        setServerMsg(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setServerMsg('Network error. Please check your connection.')
    }
  }

  const handleChange = (field: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  return (
    <section id="contact" className="py-24 px-4 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-purple-400 text-sm font-semibold uppercase tracking-widest mb-3">Let's talk</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Get In Touch</h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">

          {/* Left panel */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Let's build something great together.</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Whether you need a full-stack web app, a quick landing page, or technical advice —
                reach out and I'll get back to you within 24 hours.
              </p>
            </div>

            {/* Socials */}
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Find me on</p>
              <div className="flex flex-col gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 text-white/60 hover:text-purple-300 transition-all duration-200 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-purple-500/40 group-hover:bg-purple-500/10 transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center text-center py-16 gap-4 rounded-2xl border border-green-500/30 bg-green-500/5">
                <CheckCircle className="w-14 h-14 text-green-400" />
                <h3 className="text-xl font-semibold text-white">Message sent!</h3>
                <p className="text-white/60 max-w-sm">{serverMsg}</p>
                <Button variant="outline" size="sm" onClick={() => setStatus('idle')}>
                  Send another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {status === 'error' && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {serverMsg}
                  </div>
                )}

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-white/70">Your Name</label>
                  <Input
                    id="contact-name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={e => handleChange('name', e.target.value)}
                    className={errors.name ? 'border-red-500/60 focus:ring-red-500/40' : ''}
                  />
                  {errors.name && <p className="text-red-400 text-xs">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-white/70">Email Address</label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={e => handleChange('email', e.target.value)}
                    className={errors.email ? 'border-red-500/60 focus:ring-red-500/40' : ''}
                  />
                  {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-white/70">Message</label>
                  <Textarea
                    id="contact-message"
                    placeholder="Tell me about your project..."
                    rows={5}
                    value={form.message}
                    onChange={e => handleChange('message', e.target.value)}
                    className={errors.message ? 'border-red-500/60 focus:ring-red-500/40' : ''}
                  />
                  {errors.message && <p className="text-red-400 text-xs">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
