import { useState, useEffect } from 'react'
import { ArrowDown, Download, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ResumeModal } from '@/components/ResumeModal'

const roles = ['Full-Stack Developer', 'React Enthusiast', 'UI/UX Tinkerer', 'Open-Source Advocate']

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [isResumeOpen, setIsResumeOpen] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIndex(i => (i + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIndex])

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[80px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Pill badge */}
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-1.5 text-sm text-purple-300 mb-8 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          Available for new opportunities
        </div>

        {/* Name */}
        <h1 className="text-5xl sm:text-7xl font-extrabold mb-4 tracking-tight">
          <span className="text-white">Hi, I'm </span>
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Siddu
          </span>
        </h1>

        {/* Typewriter */}
        <div className="h-14 flex items-center justify-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white/70">
            <span className="text-cyan-400">{displayed}</span>
            <span className="animate-pulse text-purple-400">|</span>
          </h2>
        </div>

        {/* Sub-headline */}
        <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-10">
          I craft clean, scalable web applications with modern technologies.
          Turning ideas into fast, beautiful, and user-friendly digital products.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" variant="default" onClick={scrollToProjects} className="gap-2 group">
            View My Projects
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" onClick={() => setIsResumeOpen(true)} className="gap-2">
            <Download className="w-4 h-4" />
            Download CV
          </Button>
        </div>

        {/* Scroll hint — mouse wheel indicator */}
        <div
          className="mt-24 flex flex-col items-center gap-3 cursor-pointer group"
          onClick={scrollToAbout}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/15 flex justify-center pt-2 group-hover:border-purple-500/50 transition-colors duration-300">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/20 group-hover:text-white/40 transition-colors duration-300">
            Scroll
          </span>
        </div>
      </div>

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  )
}
