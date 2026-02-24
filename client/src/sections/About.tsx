import { MapPin, Coffee, GraduationCap, Heart } from 'lucide-react'
import sidduImg from '../assets/siddu.jpg'

const stats = [
  { value: '2+', label: 'Years Experience' },
  { value: '20+', label: 'Projects Built' },
  { value: '10+', label: 'Happy Clients' },
  { value: '1k+', label: 'GitHub Commits' },
]

const highlights = [
  { icon: MapPin, text: 'Based in Bengaluru, India' },
  { icon: GraduationCap, text: 'M.C.A AI/ML' },
  { icon: Coffee, text: 'Powered by coffee & curiosity' },
  { icon: Heart, text: 'Open source contributor' },
]

export function About() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-purple-400 text-sm font-semibold uppercase tracking-widest mb-3">Get to know me</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">About Me</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile image */}
          <div className="relative flex justify-center">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 p-0.5 rotate-3">
                <div className="w-full h-full rounded-2xl bg-slate-900" />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 p-0.5 -rotate-3 opacity-50">
                <div className="w-full h-full rounded-2xl bg-slate-900" />
              </div>
              {/* Avatar placeholder */}
              <div className="absolute inset-1 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
                <img src={sidduImg} alt="Siddu" className="w-full h-full object-cover" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-purple-600 text-white rounded-xl px-4 py-2 text-sm font-bold shadow-lg shadow-purple-500/30">
                Open to Work 🟢
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">
              I build things for the web — and love every second of it.
            </h3>
            <p className="text-white/60 leading-relaxed">
              I'm a passionate full-stack developer with 3+ years of experience building scalable web
              applications. I specialize in React, Node.js, and TypeScript, and I care deeply about
              writing clean, maintainable code and great developer experiences.
            </p>
            <p className="text-white/60 leading-relaxed">
              When I'm not coding, you'll find me contributing to open source projects, exploring new
              tech stacks, or obsessing over UI details that nobody else notices (but everyone feels).
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {highlights.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-white/60 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-purple-400" />
                  </div>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-20">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-white/8 transition-all duration-300"
            >
              <div className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {value}
              </div>
              <div className="text-white/50 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
