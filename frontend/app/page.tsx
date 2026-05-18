"use client";

import { motion } from "framer-motion";
import {
    Activity,
    BookOpenCheck,
    Bot,
    Brain,
    CalendarDays,
    Cpu,
    Database,
    FileText,
    GraduationCap,
    LogOut,
    MessageSquareText,
    Mic2,
    PanelRight,
    Plus,
    Search,
    Send,
    ShieldCheck,
    Sparkles,
    UploadCloud,
    Zap,
    type LucideIcon,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  citations?: string[];
};

type Account = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatarSeed: number;
  createdAt: string;
};

type AuthMode = "login" | "signup";

const ACCOUNTS_KEY = "edugenie_accounts";
const SESSION_KEY = "edugenie_session";

const modules = [
  { icon: MessageSquareText, label: "RAG Chat", detail: "Ask across PDFs with citations and page references." },
  { icon: UploadCloud, label: "Smart Upload", detail: "PDF, DOCX, TXT, PPT and OCR-ready ingestion." },
  { icon: BookOpenCheck, label: "Quiz Engine", detail: "MCQ, viva and difficulty-aware practice." },
  { icon: Brain, label: "Weak Topics", detail: "Detect gaps from questions, scores and mistakes." },
  { icon: CalendarDays, label: "Study Planner", detail: "Adaptive schedules from deadlines and progress." },
  { icon: Mic2, label: "Voice AI", detail: "Speak questions and revise hands-free." },
];

const documents = [
  { name: "Thermodynamics Notes.pdf", meta: "42 pages indexed", status: "Synced" },
  { name: "AI Research Paper.pdf", meta: "18 sections parsed", status: "Vectorized" },
  { name: "Lecture Deck.pptx", meta: "31 slides ready", status: "OCR ready" },
];

const quickPrompts = [
  "Explain this topic like I am preparing for an exam",
  "Create 5 MCQs from selected documents",
  "Find weak topics from my latest quiz",
  "Make a 7-day study plan",
];

const starterMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "EduGenie core is online. Upload notes, choose a study mode, and ask anything. I will answer with source-backed explanations, revision points and next actions.",
    citations: ["System / RAG workspace initialized"],
  },
  {
    id: 2,
    role: "user",
    content: "Explain entropy from my thermodynamics notes in simple exam language.",
  },
  {
    id: 3,
    role: "assistant",
    content:
      "Entropy measures how spread out energy is in a system. In exam answers, connect it with spontaneity: an isolated system naturally moves toward higher entropy. Add one line about disorder only after explaining energy dispersal.",
    citations: ["Thermodynamics Notes.pdf / p. 12", "Lecture Deck.pptx / slide 18"],
  },
];

export default function Home() {
  const [currentUser, setCurrentUser] = useState<Account | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const sessionId = window.localStorage.getItem(SESSION_KEY);
    const accounts = getStoredAccounts();
    const account = accounts.find((item) => item.id === sessionId) ?? null;

    setCurrentUser(account);
    setIsHydrated(true);
  }, []);

  function handleLogin(account: Account) {
    window.localStorage.setItem(SESSION_KEY, account.id);
    setCurrentUser(account);
  }

  function handleLogout() {
    window.localStorage.removeItem(SESSION_KEY);
    setCurrentUser(null);
  }

  if (!isHydrated) {
    return (
      <main className="grid min-h-screen place-items-center">
        <div className="fixed inset-0 -z-10 tech-grid" />
        <div className="panel px-5 py-4 text-sm text-cyan-100">Booting EduGenie auth...</div>
      </main>
    );
  }

  if (!currentUser) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return <Dashboard user={currentUser} onLogout={handleLogout} />;
}

function AuthScreen({ onLogin }: { onLogin: (account: Account) => void }) {
  const [mode, setMode] = useState<AuthMode>("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const avatarSeed = useMemo(() => hashText(`${name}-${email}`), [name, email]);
  const heading = mode === "signup" ? "Create your AI study cockpit" : "Welcome back to your cockpit";

  function submitAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();
    const accounts = getStoredAccounts();

    setError("");

    if (!normalizedEmail || !password) {
      setError("Email and password are required.");
      return;
    }

    if (mode === "signup") {
      if (!trimmedName) {
        setError("Name is required for a new account.");
        return;
      }

      if (accounts.some((account) => account.email === normalizedEmail)) {
        setError("This email already exists. Switch to login.");
        return;
      }

      const account: Account = {
        id: crypto.randomUUID(),
        name: trimmedName,
        email: normalizedEmail,
        password,
        avatarSeed,
        createdAt: new Date().toISOString(),
      };

      saveAccounts([...accounts, account]);
      onLogin(account);
      return;
    }

    const account = accounts.find(
      (item) => item.email === normalizedEmail && item.password === password,
    );

    if (!account) {
      setError("Invalid email or password.");
      return;
    }

    onLogin(account);
  }

  return (
    <main className="min-h-screen overflow-hidden px-5 py-6">
      <div className="fixed inset-0 -z-10 tech-grid" />
      <section className="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-7xl items-center gap-6 lg:grid-cols-[1fr_28rem]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-sm text-cyan-100">
            <Sparkles className="h-4 w-4" />
            Personalized RAG learning workspace
          </div>
          <h1 className="text-5xl font-semibold leading-[1.02] text-white md:text-7xl">
            EduGenie AI
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            A premium study assistant with document chat, citations, quizzes, flashcards, weak-topic detection, planner mode and a unique identity for every learner.
          </p>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            <Signal icon={Database} value="RAG" label="Document intelligence" />
            <Signal icon={Brain} value="AI" label="Adaptive learning" />
            <Signal icon={ShieldCheck} value="Local" label="Demo credentials" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55 }}
          className="panel p-5"
        >
          <div className="mb-5 flex items-center gap-4">
            <CartoonAvatar seed={avatarSeed} size="large" />
            <div>
              <p className="text-xl font-semibold text-white">{heading}</p>
              <p className="mt-1 text-sm text-slate-400">
                {mode === "signup"
                  ? "New credentials generate a unique study avatar."
                  : "Use the credentials you created on this browser."}
              </p>
            </div>
          </div>

          <div className="mb-5 grid grid-cols-2 gap-2 rounded-lg border border-white/10 bg-slate-950/50 p-1">
            <button
              onClick={() => setMode("signup")}
              className={`rounded-md px-3 py-2 text-sm font-semibold ${mode === "signup" ? "bg-cyan-300 text-slate-950" : "text-slate-400"}`}
            >
              Sign up
            </button>
            <button
              onClick={() => setMode("login")}
              className={`rounded-md px-3 py-2 text-sm font-semibold ${mode === "login" ? "bg-fuchsia-300 text-slate-950" : "text-slate-400"}`}
            >
              Login
            </button>
          </div>

          <form onSubmit={submitAuth} className="space-y-4">
            {mode === "signup" && (
              <Field
                label="Full name"
                value={name}
                onChange={setName}
                placeholder="Saksham Sharma"
              />
            )}
            <Field
              label="Email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
              type="email"
            />
            <Field
              label="Password"
              value={password}
              onChange={setPassword}
              placeholder="Minimum 6 characters"
              type="password"
            />

            {error && (
              <div className="rounded-lg border border-rose-300/30 bg-rose-400/10 px-3 py-2 text-sm text-rose-100">
                {error}
              </div>
            )}

            <button className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-cyan-300 text-sm font-semibold text-slate-950 transition hover:bg-fuchsia-300">
              {mode === "signup" ? "Create account" : "Login"}
              <Zap className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-4 text-xs leading-5 text-slate-500">
            Demo note: credentials are stored in browser localStorage for frontend testing. FastAPI JWT auth can replace this in the next phase.
          </p>
        </motion.div>
      </section>
    </main>
  );
}

function Dashboard({ user, onLogout }: { user: Account; onLogout: () => void }) {
  const [messages, setMessages] = useState<Message[]>(starterMessages);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("RAG Chat");

  const lastCitations = useMemo(
    () => messages.flatMap((message) => message.citations ?? []).slice(-4),
    [messages],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = input.trim();

    if (!trimmed) {
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: trimmed,
    };

    const assistantMessage: Message = {
      id: Date.now() + 1,
      role: "assistant",
      content: buildMockAnswer(trimmed, mode, user.name),
      citations: ["Thermodynamics Notes.pdf / p. 12", "AI Research Paper.pdf / p. 4"],
    };

    setMessages((current) => [...current, userMessage, assistantMessage]);
    setInput("");
  }

  function usePrompt(prompt: string) {
    setInput(prompt);
  }

  return (
    <main className="min-h-screen overflow-hidden">
      <div className="fixed inset-0 -z-10 tech-grid" />
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-lg border border-cyan-300/30 bg-cyan-400/15 text-cyan-200 shadow-glow">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-none text-white">EduGenie AI</p>
            <p className="text-xs text-cyan-100/60">Neural RAG study console</p>
          </div>
        </div>
        <div className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-cyan-100/65 backdrop-blur md:flex">
          <Search className="h-4 w-4" />
          <span>Search notes, quizzes, papers</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 sm:flex">
            <CartoonAvatar seed={user.avatarSeed} />
            <div>
              <p className="text-sm font-semibold leading-none text-white">{user.name}</p>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.06] text-cyan-100 shadow-sm backdrop-blur transition hover:border-rose-300/40 hover:text-rose-100"
            aria-label="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </nav>

      <section className="mx-auto grid w-full max-w-7xl gap-5 px-5 pb-10 lg:grid-cols-[16rem_1fr_18rem]">
        <aside className="panel p-4">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Workspace</p>
            <ShieldCheck className="h-4 w-4 text-emerald-300" />
          </div>
          <div className="mb-5 rounded-lg border border-cyan-300/20 bg-cyan-300/[0.06] p-3">
            <div className="mb-3 flex items-center gap-3">
              <CartoonAvatar seed={user.avatarSeed} />
              <div>
                <p className="text-sm font-semibold text-white">{user.name.split(" ")[0]}'s cockpit</p>
                <p className="text-xs text-slate-400">Session active</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {modules.map(({ icon: Icon, label }) => (
              <button
                key={label}
                onClick={() => setMode(label)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${
                  mode === label
                    ? "border border-cyan-300/30 bg-cyan-300/15 text-cyan-100"
                    : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-dashed border-cyan-300/30 bg-cyan-300/[0.06] p-3">
            <div className="mb-3 flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-cyan-300/15 text-cyan-200">
                <UploadCloud className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Drop files</p>
                <p className="text-xs text-slate-400">PDF, DOCX, TXT, PPT</p>
              </div>
            </div>
            <button className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-cyan-300 text-sm font-semibold text-slate-950">
              <Plus className="h-4 w-4" />
              Add document
            </button>
          </div>
        </aside>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="panel flex min-h-[calc(100vh-7rem)] flex-col"
        >
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 p-4">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)]" />
                <p className="text-sm font-semibold text-white">{mode}</p>
              </div>
              <p className="text-xs text-slate-400">Hybrid retrieval ready: embeddings + BM25 + reranker</p>
            </div>
            <div className="flex items-center gap-2">
              {["RAG Chat", "Quiz Engine", "Study Planner"].map((item) => (
                <button
                  key={item}
                  onClick={() => setMode(item)}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                    mode === item ? "bg-fuchsia-400 text-slate-950" : "border border-white/10 text-slate-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </header>

          <div className="grid gap-3 border-b border-white/10 p-4 md:grid-cols-4">
            <Signal icon={Database} value="3" label="Docs indexed" />
            <Signal icon={Cpu} value="842" label="Chunks ready" />
            <Signal icon={Activity} value="98ms" label="Retriever ping" />
            <Signal icon={Zap} value="Live" label="Frontend brain" />
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((message) => (
              <ChatBubble key={message.id} message={message} user={user} />
            ))}
          </div>

          <div className="border-t border-white/10 p-4">
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => usePrompt(prompt)}
                  className="shrink-0 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-300 transition hover:border-cyan-300/40 hover:text-cyan-100"
                >
                  {prompt}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={`Ask EduGenie, ${user.name.split(" ")[0]}...`}
                className="h-12 min-w-0 flex-1 rounded-lg border border-cyan-300/20 bg-slate-950/70 px-4 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-300/60"
              />
              <button className="grid h-12 w-12 place-items-center rounded-lg bg-cyan-300 text-slate-950 transition hover:bg-fuchsia-300" aria-label="Send message">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </motion.section>

        <aside className="grid gap-4">
          <section className="panel p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-white">Sources</p>
              <PanelRight className="h-4 w-4 text-cyan-200" />
            </div>
            <div className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.name} className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                  <div className="mb-2 flex items-start gap-2">
                    <FileText className="mt-0.5 h-4 w-4 text-cyan-200" />
                    <p className="text-sm font-medium leading-5 text-white">{doc.name}</p>
                  </div>
                  <p className="text-xs text-slate-400">{doc.meta}</p>
                  <p className="mt-2 inline-flex rounded-md bg-emerald-300/10 px-2 py-1 text-xs text-emerald-200">{doc.status}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="panel p-4">
            <p className="mb-4 text-sm font-semibold text-white">Latest citations</p>
            <div className="space-y-2">
              {lastCitations.map((citation) => (
                <div key={citation} className="rounded-lg border border-cyan-300/20 bg-cyan-300/[0.06] p-3 text-xs leading-5 text-cyan-100">
                  {citation}
                </div>
              ))}
            </div>
          </section>

          <section className="panel p-4">
            <p className="mb-4 text-sm font-semibold text-white">Learning pulse</p>
            <div className="space-y-3">
              <Metric label="Quiz accuracy" value="92%" />
              <Metric label="Weak topics" value="4" />
              <Metric label="Flashcards due" value="18" />
            </div>
          </section>
        </aside>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-10 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => (
          <FeatureTile key={module.label} {...module} />
        ))}
      </section>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-200">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        className="h-12 w-full rounded-lg border border-cyan-300/20 bg-slate-950/70 px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-300/60"
      />
    </label>
  );
}

function CartoonAvatar({ seed, size = "small" }: { seed: number; size?: "small" | "large" }) {
  const palette = getAvatarPalette(seed);
  const isLarge = size === "large";
  const wrapperSize = isLarge ? "h-24 w-24" : "h-10 w-10";
  const faceSize = isLarge ? "h-16 w-16" : "h-7 w-7";

  return (
    <div
      className={`relative grid shrink-0 place-items-center overflow-hidden rounded-lg border border-white/15 ${wrapperSize}`}
      style={{ background: `linear-gradient(135deg, ${palette.back}, ${palette.glow})` }}
      aria-label="Generated user avatar"
    >
      <div className={`relative rounded-full ${faceSize}`} style={{ background: palette.face }}>
        <span className="absolute left-[22%] top-[36%] h-[10%] w-[10%] rounded-full bg-slate-950" />
        <span className="absolute right-[22%] top-[36%] h-[10%] w-[10%] rounded-full bg-slate-950" />
        <span className="absolute left-[34%] top-[58%] h-[7%] w-[32%] rounded-full bg-slate-950/70" />
        <span
          className="absolute left-[18%] top-[-16%] h-[26%] w-[64%] rounded-full"
          style={{ background: palette.hair }}
        />
      </div>
      <span
        className="absolute bottom-[-16%] h-[34%] w-[72%] rounded-t-full"
        style={{ background: palette.suit }}
      />
      <span className="absolute right-[12%] top-[12%] h-2 w-2 rounded-full bg-white/80 shadow-[0_0_16px_rgba(255,255,255,0.8)]" />
    </div>
  );
}

function buildMockAnswer(question: string, mode: string, name: string) {
  if (mode === "Quiz Engine") {
    return `${name}, quiz mode is active. Based on your prompt, I would generate MCQs with answer keys, difficulty tags and source citations. First draft topic: "${question}".`;
  }

  if (mode === "Study Planner") {
    return `${name}, planner mode is active. I would split "${question}" into daily study blocks, revision checkpoints and a final practice test. Backend integration will later save this to your calendar.`;
  }

  return `${name}, I analyzed your request: "${question}". In the full RAG version, this answer will come from uploaded documents using hybrid retrieval, reranking and citations. For now, login, logout, persistent credentials and the frontend chat flow are working.`;
}

function ChatBubble({ message, user }: { message: Message; user: Account }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[86%] rounded-lg px-4 py-3 text-sm leading-6 ${
          isUser
            ? "bg-fuchsia-400 text-slate-950"
            : "border border-cyan-300/20 bg-cyan-300/[0.06] text-slate-100"
        }`}
      >
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] opacity-70">
          {isUser ? <CartoonAvatar seed={user.avatarSeed} /> : <Bot className="h-3.5 w-3.5" />}
          {isUser ? user.name : "EduGenie"}
        </div>
        {message.content}
        {message.citations && (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.citations.map((citation) => (
              <span key={citation} className="rounded-md border border-white/10 bg-slate-950/45 px-2 py-1 text-xs text-cyan-100">
                {citation}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Signal({ icon: Icon, value, label }: { icon: LucideIcon; value: string; label: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
      <Icon className="mb-3 h-4 w-4 text-cyan-200" />
      <p className="text-lg font-semibold text-white">{value}</p>
      <p className="text-xs text-slate-400">{label}</p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-slate-400">{label}</span>
        <span className="font-semibold text-white">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-white/10">
        <div className="h-2 rounded-full bg-cyan-300" style={{ width: value.includes("%") ? value : "58%" }} />
      </div>
    </div>
  );
}

function FeatureTile({
  icon: Icon,
  label,
  detail,
}: {
  icon: LucideIcon;
  label: string;
  detail: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.05] p-4 shadow-sm backdrop-blur">
      <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-cyan-300/10 text-cyan-200">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-sm font-semibold text-white">{label}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{detail}</p>
    </div>
  );
}

function getStoredAccounts() {
  try {
    return JSON.parse(window.localStorage.getItem(ACCOUNTS_KEY) ?? "[]") as Account[];
  } catch {
    return [];
  }
}

function saveAccounts(accounts: Account[]) {
  window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function hashText(value: string) {
  return value.split("").reduce((hash, char) => {
    return (hash * 31 + char.charCodeAt(0)) >>> 0;
  }, 7);
}

function getAvatarPalette(seed: number) {
  const palettes = [
    { back: "#0ea5e9", glow: "#d946ef", face: "#f8c7a4", hair: "#111827", suit: "#22d3ee" },
    { back: "#14b8a6", glow: "#f97316", face: "#deb887", hair: "#3b2416", suit: "#a7f3d0" },
    { back: "#6366f1", glow: "#22c55e", face: "#f3d2b3", hair: "#581c87", suit: "#c4b5fd" },
    { back: "#f43f5e", glow: "#06b6d4", face: "#c98b63", hair: "#0f172a", suit: "#f9a8d4" },
    { back: "#84cc16", glow: "#8b5cf6", face: "#ffd7b5", hair: "#422006", suit: "#bef264" },
  ];

  return palettes[seed % palettes.length];
}

