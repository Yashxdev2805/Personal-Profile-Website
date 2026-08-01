import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Menu, 
  Mail, 
  Phone, 
  MessageSquare, 
  Download, 
  GraduationCap, 
  Briefcase, 
  Code2, 
  FolderGit2, 
  UserCheck, 
  ExternalLink,
  Sparkles,
  Cpu,
} from 'lucide-react';
import './App.css';
import VisitorGate from './components/VisitorGate';
import SkillsMarquee from './components/SkillsMarquee';
import CVPrintView from './components/CVPrintView';

// Self-hosted, crisp SVG circuit-pattern backgrounds — no third-party CDN
// dependency, and no soft/blurred gradient look.
const BG_IMAGE_1 = '/hero-bg-base.svg';
const BG_IMAGE_2 = '/hero-bg-reveal.svg';

const SPOTLIGHT_R = 260;

type TabType = 'Introduction' | 'Education' | 'Skill set' | 'Experience' | 'Projects' | 'Contact / CV';

interface RevealLayerProps {
  image: string;
  cursorX: number;
  cursorY: number;
}

const RevealLayer: React.FC<RevealLayerProps> = ({ image, cursorX, cursorY }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [maskUrl, setMaskUrl] = useState<string>('');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    if (cursorX >= 0 && cursorY >= 0) {
      const grad = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, SPOTLIGHT_R);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.4, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.6, 'rgba(255, 255, 255, 0.75)');
      grad.addColorStop(0.75, 'rgba(255, 255, 255, 0.4)');
      grad.addColorStop(0.88, 'rgba(255, 255, 255, 0.12)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2);
      ctx.fill();
    }

    setMaskUrl(canvas.toDataURL());
  }, [cursorX, cursorY]);

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ display: 'none' }} />
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none"
        style={{
          backgroundImage: `url("${image}")`,
          maskImage: maskUrl ? `url(${maskUrl})` : 'none',
          WebkitMaskImage: maskUrl ? `url(${maskUrl})` : 'none',
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
        }}
      />
    </>
  );
};

export default function App() {
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });
  const [activeTab, setActiveTab] = useState<TabType | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number | null>(null);

  // Keep the tab title in sync with whichever section is open
  useEffect(() => {
    document.title = activeTab
      ? `${activeTab} — Yashbir Yadav`
      : 'Yashbir Yadav | AI & Full-Stack Web Developer';
  }, [activeTab]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const updateSmoothPos = () => {
      if (smooth.current.x === -999 && mouse.current.x !== -999) {
        smooth.current = { ...mouse.current };
      } else {
        smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
        smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
      }

      setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      rafRef.current = requestAnimationFrame(updateSmoothPos);
    };

    rafRef.current = requestAnimationFrame(updateSmoothPos);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const tabs: TabType[] = ['Introduction', 'Education', 'Skill set', 'Experience', 'Projects', 'Contact / CV'];

  const handleCVDownload = () => {
    // Renders the hidden .print-resume view and opens the browser's print
    // dialog — visitors choose "Save as PDF" for a properly formatted CV
    // instead of a plain-text file.
    window.print();
  };

  return (
    <div className="min-h-screen bg-white tracking-[-0.02em]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Gate: asks first-time visitors for name + organization before anything else is visible */}
      <VisitorGate />

      {/* NAVIGATION OVER HERO */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('Introduction')}>
          <Cpu className="w-6 h-6 text-[#e8702a]" />
          <span className="text-white text-2xl font-playfair italic">Yashbir</span>
          <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-white/10 text-white/70 font-sans ml-1 hidden sm:inline-block">AI Web Dev</span>
        </div>

        {/* CENTER PILL NAVIGATION */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-2 py-2 items-center gap-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-white/80 hover:bg-white/20 hover:text-white'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* RIGHT CTA BUTTON */}
        <button
          onClick={() => setActiveTab('Contact / CV')}
          className="hidden md:flex items-center gap-2 bg-white text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100 transition-all hover:scale-[1.02]"
        >
          <Download className="w-4 h-4 text-[#e8702a]" />
          Hire Me / CV
        </button>

        {/* MOBILE MENU TOGGLE */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2 rounded-lg bg-black/40 backdrop-blur-md border border-white/20"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[90] bg-black/95 backdrop-blur-xl flex flex-col justify-center px-8 py-12 gap-4">
          <p className="text-xs uppercase tracking-widest text-[#e8702a] font-semibold mb-2">Yashbir — AI Web Developer</p>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setMobileMenuOpen(false);
              }}
              className="text-left text-2xl font-playfair italic text-white hover:text-[#e8702a] transition-colors py-2 border-b border-white/10"
            >
              {tab}
            </button>
          ))}
          <button
            onClick={() => {
              setActiveTab('Contact / CV');
              setMobileMenuOpen(false);
            }}
            className="mt-6 w-full bg-[#e8702a] text-white py-3.5 rounded-full font-medium flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download CV / Contact
          </button>
        </div>
      )}

      {/* FULL-SCREEN HERO SECTION */}
      <section className="relative w-full overflow-hidden h-screen bg-black" style={{ height: '100dvh' }}>
        {/* BASE IMAGE LAYER (Z-10) */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom"
          style={{ backgroundImage: `url("${BG_IMAGE_1}")` }}
        />

        {/* REVEAL LAYER (Z-30) */}
        <RevealLayer
          image={BG_IMAGE_2}
          cursorX={cursorPos.x}
          cursorY={cursorPos.y}
        />

        {/* HEADING (Z-50) */}
        <div className="absolute top-[14%] left-0 right-0 flex flex-col items-center text-center px-5 pointer-events-none z-50">
          <h1 className="text-white leading-[0.95]">
            <span
              className="block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl hero-anim hero-reveal"
              style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}
            >
              Vibe coding
            </span>
            <span
              className="block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1 hero-anim hero-reveal"
              style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}
            >
              intelligent web systems
            </span>
          </h1>
        </div>

        {/* BOTTOM-LEFT PARAGRAPH (Z-50) */}
        <div
          className="hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[280px] z-50 hero-anim hero-fade"
          style={{ animationDelay: '0.7s' }}
        >
          <p className="text-sm text-white/80 leading-relaxed">
            Engineering next-generation web applications powered by modern frontend frameworks, real-time WebSockets, fast API backends, and containerized AI workflows.
          </p>
        </div>

        {/* BOTTOM-RIGHT BLOCK (Z-50) */}
        <div
          className="absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[280px] flex flex-col items-start gap-4 sm:gap-5 z-50 hero-anim hero-fade"
          style={{ animationDelay: '0.85s' }}
        >
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Peel back the layers to explore full-stack architecture, rapid vibe coding capabilities, real-time backend pipelines, and interactive web tools.
          </p>
          <button 
            onClick={() => setActiveTab('Skill set')}
            className="bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Explore Stack
          </button>
        </div>
      </section>

      {/* ROLLING SKILLS STRIP */}
      <SkillsMarquee />

      {/* PORTFOLIO TAB DETAILS OVERLAY MODAL */}
      {activeTab && (
        <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fadeIn">
          <div className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-[#0d111a] border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 text-white shadow-2xl">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setActiveTab(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* TAB CONTENT: INTRODUCTION */}
            {activeTab === 'Introduction' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-[#e8702a]">
                  <UserCheck className="w-7 h-7" />
                  <span className="text-xs uppercase tracking-widest font-semibold">AI Web Developer</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-playfair italic">Introduction</h2>
                <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
                  Hi, I’m <strong className="text-white">Yashbir</strong>. I am an AIML undergraduate student pursuing my B.Tech in Artificial Intelligence & Machine Learning at UIET Kurukshetra University.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  I specialize in fast-paced full-stack web development through modern "vibe coding" paradigms, containerized deployments, real-time backend APIs, and integrated AI automation pipelines.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <h4 className="font-semibold text-white mb-1">Education</h4>
                    <p className="text-sm text-gray-400">B.Tech in CSE (AI &amp; ML) — UIET Kurukshetra University, 2nd Year</p>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <h4 className="font-semibold text-white mb-1">Focus Area</h4>
                    <p className="text-sm text-gray-400">AI Web Engineering, Vibe Coding & Realtime APIs</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: EDUCATION */}
            {activeTab === 'Education' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-[#e8702a]">
                  <GraduationCap className="w-7 h-7" />
                  <span className="text-xs uppercase tracking-widest font-semibold">Academic Foundation</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-playfair italic">Education</h2>

                <div className="space-y-4">
                  <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-3 animated-border">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-xl font-bold text-white">B.Tech, Computer Science &amp; Engineering (AI &amp; Machine Learning)</h3>
                      <span className="text-xs px-3 py-1 bg-[#e8702a]/20 text-[#e8702a] border border-[#e8702a]/30 rounded-full font-medium whitespace-nowrap">
                        2nd Year &middot; In Progress
                      </span>
                    </div>
                    <p className="text-[#e8702a] font-medium">UIET, Kurukshetra University</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-300">
                      <span>2025 &ndash; 2029</span>
                      <span>CGPA: 8.13 (1st Semester)</span>
                    </div>
                  </div>

                  <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-lg font-bold text-white">Diploma in Computer Applications (DCA)</h3>
                      <span className="text-sm text-gray-400 whitespace-nowrap">2024 &ndash; 2025</span>
                    </div>
                    <p className="text-sm text-gray-400">NCVET-recognized certification</p>
                  </div>

                  <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-lg font-bold text-white">Senior Secondary (Class XII)</h3>
                      <span className="text-sm text-gray-400 whitespace-nowrap">2024</span>
                    </div>
                    <p className="text-sm text-gray-400">90.2%</p>
                  </div>

                  <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-lg font-bold text-white">Secondary (Class X)</h3>
                      <span className="text-sm text-gray-400 whitespace-nowrap">2022</span>
                    </div>
                    <p className="text-sm text-gray-400">93.8%</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: SKILL SET */}
            {activeTab === 'Skill set' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-[#e8702a]">
                  <Code2 className="w-7 h-7" />
                  <span className="text-xs uppercase tracking-widest font-semibold">Technical Stack</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-playfair italic">Skill Set</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-white/5 border border-white/10 rounded-xl space-y-2">
                    <h3 className="text-lg font-semibold text-[#e8702a]">Core Languages</h3>
                    <p className="text-sm text-gray-300">HTML5, CSS3, JavaScript, Python, C</p>
                  </div>
                  <div className="p-5 bg-white/5 border border-white/10 rounded-xl space-y-2">
                    <h3 className="text-lg font-semibold text-[#e8702a]">Web Dev by Vibe Coding</h3>
                    <p className="text-sm text-gray-300">React, Next.js, Vite, Tailwind CSS, Framer Motion</p>
                  </div>
                  <div className="p-5 bg-white/5 border border-white/10 rounded-xl space-y-2">
                    <h3 className="text-lg font-semibold text-[#e8702a]">Backend & Infrastructure</h3>
                    <p className="text-sm text-gray-300">FastAPI, JWT Auth, WebSockets, Docker</p>
                  </div>
                  <div className="p-5 bg-white/5 border border-white/10 rounded-xl space-y-2">
                    <h3 className="text-lg font-semibold text-[#e8702a]">Version Control</h3>
                    <p className="text-sm text-gray-300">Git & GitHub</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: EXPERIENCE */}
            {activeTab === 'Experience' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-[#e8702a]">
                  <Briefcase className="w-7 h-7" />
                  <span className="text-xs uppercase tracking-widest font-semibold">Career Experience</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-playfair italic">Experience</h2>

                <div className="space-y-4">
                  <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-2 animated-border">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <h3 className="text-xl font-bold text-white">Web Developer Intern</h3>
                      <span className="text-xs text-gray-400">InAmigos Foundation</span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Working as a Web Developer Intern with InAmigos Foundation, contributing to their web development initiatives.
                    </p>
                  </div>

                  <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-2">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <h3 className="text-xl font-bold text-white">Full-Stack & AI Web Developer</h3>
                      <span className="text-xs text-gray-400">Freelance / Remote</span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Building full-stack web applications using vibe coding practices with Next.js, React, Tailwind, and Framer Motion on the frontend, combined with robust FastAPI backends featuring WebSockets and JWT Authentication.
                    </p>
                  </div>

                  <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-2">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <h3 className="text-xl font-bold text-white">Founding Core Member</h3>
                      <span className="text-xs text-gray-400">RepairHub Startup</span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Co-founded RepairHub to address e-waste, technology education, and hardware refurbishment. Designed automated scraping workflows to collect and index repair documentation into cloud directories.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: PROJECTS */}
            {activeTab === 'Projects' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-[#e8702a]">
                  <FolderGit2 className="w-7 h-7" />
                  <span className="text-xs uppercase tracking-widest font-semibold">Featured Work</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-playfair italic">Projects</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-white/5 border border-white/10 rounded-xl space-y-3 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Interactive Spotlight Hero Portfolio</h3>
                      <p className="text-xs text-[#e8702a] mb-2">React + TypeScript + Canvas Masking + Tailwind</p>
                      <p className="text-sm text-gray-300">
                        Full-screen web app featuring a custom canvas radial gradient mask for cursor spotlight reveal effects and smooth modal system navigation.
                      </p>
                    </div>
                    <a href="https://github.com/Yashxdev2805" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-[#e8702a] hover:underline">
                      View Repository <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="p-5 bg-white/5 border border-white/10 rounded-xl space-y-3 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">FastAPI & WebSocket Realtime Backend</h3>
                      <p className="text-xs text-[#e8702a] mb-2">FastAPI + JWT + WebSockets + Docker</p>
                      <p className="text-sm text-gray-300">
                        High-performance API backend template featuring real-time socket connections, JWT token authorization, and containerized Docker execution.
                      </p>
                    </div>
                    <a href="https://github.com/Yashxdev2805" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-[#e8702a] hover:underline">
                      View Repository <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: CONTACT / HIRE ME / CV */}
            {activeTab === 'Contact / CV' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-[#e8702a]">
                  <Mail className="w-7 h-7" />
                  <span className="text-xs uppercase tracking-widest font-semibold">Direct Contact</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-playfair italic">Contact & Hire Me</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a href="mailto:developer.yashbir5082@gmail.com" className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3 hover:border-[#e8702a] transition-colors">
                    <Mail className="w-5 h-5 text-[#e8702a]" />
                    <span className="text-sm text-gray-200">developer.yashbir5082@gmail.com</span>
                  </a>
                  <a href="tel:+919034792806" className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3 hover:border-[#e8702a] transition-colors">
                    <Phone className="w-5 h-5 text-[#e8702a]" />
                    <span className="text-sm text-gray-200">+91 9034792806</span>
                  </a>
                  <a href="https://wa.me/919034792806" target="_blank" rel="noreferrer" className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3 hover:border-[#25d366] transition-colors">
                    <MessageSquare className="w-5 h-5 text-[#25d366]" />
                    <span className="text-sm text-gray-200">WhatsApp Chat</span>
                  </a>
                  <a href="https://github.com/Yashxdev2805" target="_blank" rel="noreferrer" className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3 hover:border-[#e8702a] transition-colors">
                    <svg className="w-5 h-5 fill-[#e8702a]" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    <span className="text-sm text-gray-200">GitHub Profile</span>
                  </a>
                  <a href="https://www.linkedin.com/in/yashbir-yadav-204663310" target="_blank" rel="noreferrer" className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3 hover:border-[#e8702a] transition-colors sm:col-span-2">
                    <svg className="w-5 h-5 fill-[#e8702a]" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span className="text-sm text-gray-200">LinkedIn Profile</span>
                  </a>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-gray-400">Open for AI Web Engineering internships, full-stack projects, and collaborations.</p>
                  <button
                    onClick={handleCVDownload}
                    className="w-full sm:w-auto bg-[#e8702a] hover:bg-[#d2611f] text-white font-medium px-8 py-3 rounded-full flex items-center justify-center gap-2 transition-all hover:scale-105"
                  >
                    <Download className="w-4 h-4" />
                    Download CV (PDF)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Only visible when printing (Download CV button triggers window.print()) */}
      <CVPrintView />
    </div>
  );
}