const SKILLS = [
  'HTML5',
  'CSS3',
  'JavaScript',
  'Python',
  'C',
  'React',
  'Next.js',
  'Vite',
  'Tailwind CSS',
  'Framer Motion',
  'FastAPI',
  'JWT Auth',
  'WebSockets',
  'Docker',
  'Git & GitHub',
];

/**
 * Continuously scrolling horizontal strip of skill tags. Content is duplicated
 * once so the CSS translateX loop wraps seamlessly. Pauses on hover, and the
 * whole strip's border cycles color continuously via .animated-border.
 */
export default function SkillsMarquee() {
  const items = [...SKILLS, ...SKILLS];

  return (
    <div className="marquee-wrap relative w-full overflow-hidden border-y-2 border-[#e8702a] bg-[#0d111a] py-4 animated-border">
      <div className="marquee-track flex gap-3 px-3">
        {items.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="shrink-0 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-200 hover:text-[#e8702a] hover:border-[#e8702a] hover:scale-105 transition-all"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
