/**
 * Hidden in normal browsing (display: none via .print-resume in App.css).
 * Only shown by @media print, so clicking "Download CV" -> window.print()
 * lets the visitor save a clean, properly formatted one-page PDF instead
 * of a raw .txt file.
 */
export default function CVPrintView() {
  return (
    <div className="print-resume">
      <h1 style={{ fontSize: 28, marginBottom: 4 }}>Yashbir Yadav</h1>
      <p style={{ fontSize: 14, marginBottom: 16 }}>AI &amp; Full-Stack Web Developer</p>

      <p style={{ fontSize: 12, marginBottom: 24 }}>
        developer.yashbir5082@gmail.com &nbsp;·&nbsp; +91 9034792806 &nbsp;·&nbsp;
        github.com/Yashxdev2805 &nbsp;·&nbsp; linkedin.com/in/yashbir-yadav-204663310
      </p>

      <h2 style={{ fontSize: 16, borderBottom: '1px solid #000', paddingBottom: 4, marginBottom: 8 }}>
        Education
      </h2>
      <p style={{ fontSize: 13, marginBottom: 2 }}>
        <strong>B.Tech, Computer Science &amp; Engineering (AI &amp; Machine Learning)</strong> — UIET, Kurukshetra University, 2025–2029 (2nd Year)
      </p>
      <p style={{ fontSize: 13, marginBottom: 8 }}>CGPA: 8.13 (1st Semester)</p>
      <p style={{ fontSize: 13, marginBottom: 2 }}>
        <strong>Diploma in Computer Applications (DCA)</strong> — 2024–2025, NCVET-recognized certification
      </p>
      <p style={{ fontSize: 13, marginBottom: 2 }}>
        <strong>Senior Secondary (Class XII)</strong> — 2024, 90.2%
      </p>
      <p style={{ fontSize: 13, marginBottom: 20 }}>
        <strong>Secondary (Class X)</strong> — 2022, 93.8%
      </p>

      <h2 style={{ fontSize: 16, borderBottom: '1px solid #000', paddingBottom: 4, marginBottom: 8 }}>
        Skills
      </h2>
      <p style={{ fontSize: 13, marginBottom: 4 }}>
        <strong>Languages:</strong> HTML5, CSS3, JavaScript, Python, C
      </p>
      <p style={{ fontSize: 13, marginBottom: 4 }}>
        <strong>Frontend:</strong> React, Next.js, Vite, Tailwind CSS, Framer Motion
      </p>
      <p style={{ fontSize: 13, marginBottom: 4 }}>
        <strong>Backend:</strong> FastAPI, JWT Auth, WebSockets, Docker
      </p>
      <p style={{ fontSize: 13, marginBottom: 20 }}>
        <strong>Version Control:</strong> Git &amp; GitHub
      </p>

      <h2 style={{ fontSize: 16, borderBottom: '1px solid #000', paddingBottom: 4, marginBottom: 8 }}>
        Experience
      </h2>
      <p style={{ fontSize: 13, marginBottom: 2 }}>
        <strong>Web Developer Intern</strong> — InAmigos Foundation
      </p>
      <p style={{ fontSize: 13, marginBottom: 12 }}>
        Contributing to web development initiatives at InAmigos Foundation.
      </p>
      <p style={{ fontSize: 13, marginBottom: 2 }}>
        <strong>Full-Stack &amp; AI Web Developer</strong> — Freelance / Remote
      </p>
      <p style={{ fontSize: 13, marginBottom: 12 }}>
        Building full-stack web applications using React, Next.js, Tailwind and Framer Motion on
        the frontend, with FastAPI backends featuring WebSockets and JWT authentication.
      </p>
      <p style={{ fontSize: 13, marginBottom: 2 }}>
        <strong>Founding Core Member</strong> — RepairHub Startup
      </p>
      <p style={{ fontSize: 13 }}>
        Co-founded RepairHub to address e-waste, technology education, and hardware refurbishment.
      </p>
    </div>
  );
}
