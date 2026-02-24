import { useEffect } from 'react'
import { X, Download, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    if (isOpen) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Resume preview"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="relative z-10 w-full max-w-5xl h-[90vh] flex flex-col rounded-2xl border border-white/15 bg-slate-900 shadow-2xl shadow-black/50 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-600/30 border border-purple-500/40 flex items-center justify-center">
              <ExternalLink className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <h2 className="font-semibold text-white text-sm">Siddu — Resume</h2>
              <p className="text-white/40 text-xs">PDF Preview</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/resume.pdf"
              download="SidduResume.pdf"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-purple-500/20"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </a>
            <Button variant="ghost" size="sm" onClick={onClose} className="w-9 h-9 p-0 rounded-lg">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* PDF iframe */}
        <div className="flex-1 bg-slate-950 relative">
          <iframe
            src="/resume.pdf"
            title="Resume Preview"
            className="w-full h-full border-0"
          />
          {/* Fallback for browsers that block PDF iframes */}
          <noscript>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white/50">
              <p>Preview unavailable.</p>
              <a href="/resume.pdf" download className="text-purple-400 underline">Download the PDF instead</a>
            </div>
          </noscript>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/10 flex items-center justify-between shrink-0">
          <p className="text-white/30 text-xs">Replace <code className="text-purple-400">client/public/resume.pdf</code> with your actual resume</p>
          <button onClick={onClose} className="text-white/30 hover:text-white/60 text-xs transition-colors cursor-pointer">
            Press Esc to close
          </button>
        </div>
      </div>
    </div>
  )
}
