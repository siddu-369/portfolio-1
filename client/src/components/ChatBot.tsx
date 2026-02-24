import { useState, useRef, useEffect } from 'react'
import { Bot, X, Send, Minimize2, Sparkles, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const STARTER_QUESTIONS = [
  'What technologies do you specialize in?',
  'Tell me about your projects',
  'Are you available for hire?',
  'How can I contact you?',
]

const GREETING: Message = {
  role: 'assistant',
  content: "Hi! I'm Alex's AI assistant 👋 I can answer questions about his skills, projects, experience, and availability. What would you like to know?",
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([GREETING])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 150)
  }, [isOpen])

  // Escape to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isLoading) return

    const userMsg: Message = { role: 'user', content: trimmed }
    const updatedHistory = [...messages, userMsg]

    setMessages(updatedHistory)
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedHistory.map(({ role, content }) => ({ role, content })),
        }),
      })
      const data = await res.json()

      if (res.ok && data.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Is the server running?')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleReset = () => {
    setMessages([GREETING])
    setError(null)
    setInput('')
  }

  return (
    <>
      {/* Floating button */}
      <button
        id="chatbot-toggle"
        onClick={() => setIsOpen(prev => !prev)}
        className={cn(
          'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center',
          'bg-purple-600 text-white shadow-lg shadow-purple-500/40',
          'hover:bg-purple-500 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer',
          'ring-4 ring-purple-500/20',
          !isOpen && 'animate-pulse-slow'
        )}
        aria-label={isOpen ? 'Close AI assistant' : 'Open AI assistant'}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </button>

      {/* Chat panel */}
      <div
        className={cn(
          'fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[400px] max-h-[600px]',
          'flex flex-col rounded-2xl border border-white/15 bg-slate-900 shadow-2xl shadow-black/50',
          'transition-all duration-300 origin-bottom-right',
          isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none'
        )}
        aria-hidden={!isOpen}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 rounded-t-2xl bg-white/5 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Alex's AI Assistant</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/40 text-xs">Powered by Groq · Llama 3</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleReset}
              title="Reset conversation"
              className="p-1.5 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/10 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/10 transition-all cursor-pointer"
            >
              <Minimize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 max-h-96">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                'flex gap-2.5',
                msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              )}
            >
              {/* Avatar */}
              <div className={cn(
                'w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5',
                msg.role === 'assistant'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/10 text-white/60'
              )}>
                {msg.role === 'assistant' ? <Bot className="w-3.5 h-3.5" /> : '👤'}
              </div>

              {/* Bubble */}
              <div className={cn(
                'max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                msg.role === 'assistant'
                  ? 'bg-white/8 text-white/85 rounded-tl-sm'
                  : 'bg-purple-600 text-white rounded-tr-sm'
              )}>
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <div className="flex gap-2.5">
              <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="bg-white/8 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2 flex items-start gap-2">
              <span className="shrink-0 mt-0.5">⚠️</span>
              {error}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Starter suggestions (only on first message) */}
        {messages.length === 1 && !isLoading && (
          <div className="px-4 pb-3 flex flex-wrap gap-2 shrink-0">
            {STARTER_QUESTIONS.map(q => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="flex items-center gap-1 bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs px-3 py-1.5 rounded-full hover:bg-purple-500/20 transition-all cursor-pointer"
              >
                <Sparkles className="w-2.5 h-2.5" />
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input area */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 px-4 py-3 border-t border-white/10 shrink-0"
        >
          <input
            id="chatbot-input"
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask me anything about Alex..."
            disabled={isLoading}
            className={cn(
              'flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30',
              'focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40',
              'transition-all duration-200 disabled:opacity-50'
            )}
          />
          <Button
            type="submit"
            size="sm"
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 p-0 rounded-xl shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </>
  )
}
