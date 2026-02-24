import { useEffect, useRef, useState } from 'react'

const DI = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons'

interface Skill {
  name: string
  icon: string
  invert?: boolean // white-on-dark icons (GitHub, Flask, Django, Vercel, Next.js...)
}

/* ── Pyramid rows (matches the inspiration layout) ─────────────────────── */
const ROWS: Skill[][] = [
  [
    { name: 'Python',      icon: `${DI}/python/python-original.svg` },
    { name: 'JavaScript',  icon: `${DI}/javascript/javascript-original.svg` },
    { name: 'TypeScript',  icon: `${DI}/typescript/typescript-original.svg` },
    { name: 'C',           icon: `${DI}/c/c-original.svg` },
    { name: 'C++',         icon: `${DI}/cplusplus/cplusplus-original.svg` },
    { name: 'Kotlin',      icon: `${DI}/kotlin/kotlin-original.svg` },
    { name: 'HTML',        icon: `${DI}/html5/html5-original.svg` },
    { name: 'CSS',         icon: `${DI}/css3/css3-original.svg` },
    { name: 'React',       icon: `${DI}/react/react-original.svg` },
    { name: 'Next.js',     icon: `${DI}/nextjs/nextjs-original.svg`, invert: true },
    { name: 'Bootstrap',   icon: `${DI}/bootstrap/bootstrap-original.svg` },
  ],
  [
    { name: 'Node.js',     icon: `${DI}/nodejs/nodejs-original.svg` },
    { name: 'Django',      icon: `${DI}/django/django-plain.svg`, invert: true },
    { name: 'Flask',       icon: `${DI}/flask/flask-original.svg`, invert: true },
    { name: 'FastAPI',     icon: `${DI}/fastapi/fastapi-original.svg` },
    { name: 'TensorFlow',  icon: `${DI}/tensorflow/tensorflow-original.svg` },
    { name: 'PyTorch',     icon: `${DI}/pytorch/pytorch-original.svg` },
    { name: 'Scikit-learn',icon: `${DI}/scikitlearn/scikitlearn-original.svg` },
    { name: 'OpenCV',      icon: `${DI}/opencv/opencv-original.svg` },
    { name: 'NumPy',       icon: `${DI}/numpy/numpy-original.svg` },
    { name: 'Tailwind',    icon: `${DI}/tailwindcss/tailwindcss-original.svg` },
  ],
  [
    { name: 'Pandas',      icon: `${DI}/pandas/pandas-original.svg` },
    { name: 'MySQL',       icon: `${DI}/mysql/mysql-original.svg` },
    { name: 'PostgreSQL',  icon: `${DI}/postgresql/postgresql-original.svg` },
    { name: 'MongoDB',     icon: `${DI}/mongodb/mongodb-original.svg` },
    { name: 'Firebase',    icon: `${DI}/firebase/firebase-original.svg` },
    { name: 'Redis',       icon: `${DI}/redis/redis-original.svg` },
    { name: 'Docker',      icon: `${DI}/docker/docker-original.svg` },
    { name: 'Azure',       icon: `${DI}/azure/azure-original.svg` },
  ],
  [
    { name: 'Git',         icon: `${DI}/git/git-original.svg` },
    { name: 'GitHub',      icon: `${DI}/github/github-original.svg`, invert: true },
    { name: 'Linux',       icon: `${DI}/linux/linux-original.svg` },
    { name: 'AWS',         icon: `${DI}/amazonwebservices/amazonwebservices-plain-wordmark.svg`, invert: true },
    { name: 'VS Code',     icon: `${DI}/vscode/vscode-original.svg` },
    { name: 'Vercel',      icon: `${DI}/vercel/vercel-original.svg`, invert: true },
  ],
  [
    { name: 'Jupyter',     icon: `${DI}/jupyter/jupyter-original.svg` },
    { name: 'Figma',       icon: `${DI}/figma/figma-original.svg` },
    { name: 'Postman',     icon: `${DI}/postman/postman-original.svg` },
    { name: 'Anaconda',    icon: `${DI}/anaconda/anaconda-original.svg` },
  ],
  [
    { name: 'Hugging Face', icon: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg' },
    { name: 'PyPI',         icon: `${DI}/pypi/pypi-original.svg` },
  ],
]

/* ── Single skill tile ──────────────────────────────────────────────────── */
function SkillTile({
  skill,
  floatDelay,
  enterDelay,
  visible,
}: {
  skill: Skill
  floatDelay: number
  enterDelay: number
  visible: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const [imgOk, setImgOk] = useState(true)

  return (
    /* Float wrapper — only animates translateY so hover scale doesn't conflict */
    <div
      className="skill-float"
      style={{ animationDelay: `${floatDelay}s`, animationPlayState: hovered ? 'paused' : 'running' }}
    >
      {/* Entrance wrapper */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1) translateY(0)' : 'scale(0.85) translateY(16px)',
          transition: `opacity 0.45s ease ${enterDelay}s, transform 0.45s ease ${enterDelay}s`,
        }}
      >
        {/* Card */}
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          title={skill.name}
          className="relative flex flex-col items-center justify-center gap-1.5 w-[76px] h-[76px] rounded-2xl cursor-default select-none"
          style={{
            background: hovered
              ? 'rgba(168,85,247,0.12)'
              : 'rgba(255,255,255,0.04)',
            border: hovered
              ? '1px solid rgba(168,85,247,0.55)'
              : '1px solid rgba(255,255,255,0.09)',
            boxShadow: hovered
              ? '0 0 22px rgba(168,85,247,0.35), 0 0 6px rgba(168,85,247,0.2) inset'
              : 'none',
            transform: hovered ? 'scale(1.14)' : 'scale(1)',
            transition: 'background 0.25s, border 0.25s, box-shadow 0.25s, transform 0.2s',
          }}
        >
          {imgOk ? (
            <img
              src={skill.icon}
              alt={skill.name}
              loading="lazy"
              className="w-9 h-9 object-contain"
              style={{
                filter: hovered
                  ? skill.invert ? 'brightness(0) invert(1)' : 'grayscale(0) brightness(1)'
                  : skill.invert ? 'brightness(0) invert(0.6)' : 'grayscale(1) brightness(0.65)',
                transition: 'filter 0.3s ease',
              }}
              onError={() => setImgOk(false)}
            />
          ) : (
            /* Fallback: first two letters of name */
            <span className="text-white/30 text-xs font-bold leading-none text-center px-1">
              {skill.name.slice(0, 3)}
            </span>
          )}

          {/* Name label */}
          <span
            className="text-[9px] font-medium leading-none text-center truncate w-full px-1"
            style={{
              color: hovered ? 'rgba(216,180,254,0.95)' : 'rgba(255,255,255,0.35)',
              transition: 'color 0.25s',
            }}
          >
            {skill.name}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ── Main section ───────────────────────────────────────────────────────── */
export function TechStack() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.06 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  /* Compute a flat global index for stagger delays */
  let globalIdx = 0

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 px-4 overflow-hidden"
    >
      {/* ── Background ─────────────────────────────────────────────────── */}
      {/* Purple nebula blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-purple-700/20 blur-[120px]" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-purple-900/20 blur-[80px]" />
        <div className="absolute top-2/3 right-1/4 w-48 h-48 rounded-full bg-cyan-800/10 blur-[80px]" />
      </div>

      {/* Dot grid — network feel */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(168,85,247,0.18) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-purple-400 text-sm font-semibold uppercase tracking-widest mb-3">
            What I work with
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Tech Stack</h2>
          <p className="text-white/40 mt-4 text-sm max-w-md mx-auto">
            Hover over any icon to see it come alive. My stack spans languages, frameworks, AI/ML, and DevOps.
          </p>
        </div>

        {/* Pyramid grid */}
        <div className="flex flex-col items-center gap-3">
          {ROWS.map((row, ri) => {
            const rowEl = (
              <div key={ri} className="flex flex-wrap justify-center gap-3">
                {row.map((skill, ci) => {
                  const idx = globalIdx++
                  const floatDelay = ((ri * 0.6 + ci * 0.2) % 3)
                  const enterDelay = idx * 0.035
                  return (
                    <SkillTile
                      key={`${ri}-${ci}`}
                      skill={skill}
                      floatDelay={floatDelay}
                      enterDelay={enterDelay}
                      visible={visible}
                    />
                  )
                })}
              </div>
            )
            return rowEl
          })}
        </div>

        {/* Bottom caption */}
        <p className="text-center text-white/20 text-xs mt-10">
          {ROWS.flat().length}+ tools · hover any icon to highlight
        </p>
      </div>
    </section>
  )
}
