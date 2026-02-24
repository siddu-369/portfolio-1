import './index.css'
import { Navbar } from './components/Navbar'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { TechStack } from './sections/TechStack'
import { Projects } from './sections/Projects'
import { Contact } from './sections/Contact'
import { ChatBot } from './components/ChatBot'

function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 px-4 text-center text-white/30 text-sm">
      <p>
        Designed & Built by{' '}
        <span className="text-purple-400 font-medium">Siddu</span>
        {' · '}
        <span className="text-white/20">{new Date().getFullYear()}</span>
      </p>
    </footer>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <TechStack />
        <Contact />
      </main>
      <Footer />
      {/* Global floating AI chatbot */}
      <ChatBot />
    </div>
  )
}

export default App
