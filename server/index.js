import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Groq from 'groq-sdk';
import { Resend } from 'resend';

const app = express();
const PORT = process.env.PORT || 5000;

// ── Clients ───────────────────────────────────────────────────────────────────
const groq = process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'your_groq_api_key_here'
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;

const resend = process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_your_api_key_here'
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// ── AI system prompt ──────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Siddu's personal AI assistant embedded in his portfolio website.
Answer questions about Siddu's professional background, skills, projects, and availability.
Politely redirect anything unrelated back to his professional profile.

NAME: Siddu
TITLE: Full-Stack Developer
LOCATION: Bengaluru, India
EXPERIENCE: 2+ years building scalable web applications
EDUCATION: M.C.A AI/ML
GitHub: github.com/siddu
LinkedIn: linkedin.com/in/siddu
AVAILABILITY: Open to new opportunities (full-time or contract)

TECH STACK:
- Frontend: React, Next.js, TypeScript, Tailwind CSS, Vite
- Backend: Node.js, Express
- AI/ML: Python, TensorFlow, PyTorch
- Databases: PostgreSQL, MongoDB, Redis
- DevOps: Docker, AWS, Git

KEY PROJECTS:
1. AI Portfolio — This site, with a Groq-powered AI assistant
2. DevFlow — Kanban task manager with GitHub integration
3. ShopSphere — E-commerce platform with Stripe payments
4. AI Content Generator — SaaS for blog/ad copy generation

Keep answers concise (2-4 sentences), friendly, and professional.
For hiring inquiries, direct them to the contact form.`;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: [
    'http://localhost:5173',   // vite dev server
    'http://127.0.0.1:5173',  // vite dev server alt
    'http://localhost',        // docker nginx (port 80)
    'http://localhost:80',     // docker nginx explicit port
  ],
  methods: ['GET', 'POST'],
  credentials: true,
}));
app.use(express.json());

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'Portfolio backend running ✅' });
});

// ── Contact notification email template ───────────────────────────────────────
const contactEmailHtml = ({ name, email, message, timestamp }) => `
<div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:auto;background:#0f172a;color:#e2e8f0;border-radius:12px;overflow:hidden">
  <div style="background:linear-gradient(135deg,#7c3aed,#06b6d4);padding:28px 32px">
    <h1 style="margin:0;font-size:20px;color:#fff">New Portfolio Message 📬</h1>
    <p style="margin:4px 0 0;opacity:.8;font-size:13px">${timestamp} IST</p>
  </div>
  <div style="padding:28px 32px">
    <table style="width:100%;border-collapse:collapse">
      <tr>
        <td style="padding:10px 0;color:#94a3b8;width:80px;font-size:13px">Name</td>
        <td style="padding:10px 0;font-weight:600">${name}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;color:#94a3b8;font-size:13px">Email</td>
        <td style="padding:10px 0"><a href="mailto:${email}" style="color:#a78bfa">${email}</a></td>
      </tr>
    </table>
    <div style="margin-top:16px;background:#1e293b;border-left:3px solid #7c3aed;border-radius:6px;padding:16px">
      <p style="margin:0;font-size:13px;color:#94a3b8">Message</p>
      <p style="margin:8px 0 0;line-height:1.7">${message.replace(/\n/g, '<br>')}</p>
    </div>
    <a href="mailto:${email}" style="display:inline-block;margin-top:24px;background:#7c3aed;color:#fff;text-decoration:none;padding:10px 24px;border-radius:8px;font-size:14px;font-weight:600">
      Reply to ${name}
    </a>
  </div>
</div>`;

// ── POST /api/contact ─────────────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return res.status(400).json({ success: false, error: 'All fields are required.' });

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });

  if (message.trim().length < 10)
    return res.status(400).json({ success: false, error: 'Message must be at least 10 characters.' });

  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  console.log(`📬 Contact from ${name} <${email}> at ${timestamp}`);

  if (resend) {
    try {
      await resend.emails.send({
        from:     'Portfolio Contact <onboarding@resend.dev>',
        to:       [process.env.EMAIL_TO],
        reply_to: email,   // ← clicking Reply in Gmail goes directly to the sender
        subject:  `📩 New message from ${name} — Portfolio`,
        html:     contactEmailHtml({ name, email, message, timestamp }),
      });
      console.log(`✅ Notification sent — reply_to: ${email}`);
    } catch (err) {
      console.error('❌ Resend error:', err.message);
    }
  }

  res.json({
    success: true,
    message: `Thanks ${name}! Your message has been received. I'll get back to you soon.`,
  });
});

// ── POST /api/chat ────────────────────────────────────────────────────────────
app.post('/api/chat', async (req, res) => {
  if (!groq)
    return res.status(503).json({ success: false, error: 'AI assistant not configured. Add GROQ_API_KEY to server/.env.' });

  const { messages } = req.body;
  if (!Array.isArray(messages) || messages.length === 0)
    return res.status(400).json({ success: false, error: 'messages array is required.' });

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages.map(({ role, content }) => ({ role, content }))],
      max_tokens: 350,
      temperature: 0.7,
    });
    res.json({ success: true, reply: completion.choices[0]?.message?.content ?? "Sorry, couldn't generate a response." });
  } catch (err) {
    console.error('Groq error:', err.message);
    res.status(500).json({ success: false, error: 'AI service error. Please try again.' });
  }
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀  http://localhost:${PORT}`);
  console.log(`🤖  Groq:  ${groq   ? 'enabled ✅' : 'add GROQ_API_KEY to .env ⚠️'}`);
  console.log(`📧  Email: ${resend ? 'enabled ✅' : 'add RESEND_API_KEY to .env ⚠️'}`);
});
