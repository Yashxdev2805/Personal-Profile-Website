import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

// Google Apps Script Web App bound to the response sheet (Name -> col A, Organization -> col B).
// Set VITE_GATE_ENDPOINT_URL in your .env file — see .env.example.
const ENDPOINT = import.meta.env.VITE_GATE_ENDPOINT_URL;

if (import.meta.env.DEV && !ENDPOINT) {
  // eslint-disable-next-line no-console
  console.warn(
    '[VisitorGate] VITE_GATE_ENDPOINT_URL is not set — copy .env.example to .env and fill it in.',
  );
}

const STORAGE_KEY = 'yy_portfolio_visitor_verified';

/**
 * Full-screen gate shown on a visitor's first visit. Collects name + organization,
 * fires it off to the linked Google Sheet, then reveals the site.
 * Returning visitors (flag already in localStorage) never see this at all.
 */
export default function VisitorGate() {
  const [visible, setVisible] = useState<boolean>(
    () => typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) !== 'true',
  );
  const [exiting, setExiting] = useState(false);
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !organization.trim()) {
      setError('Please fill in both fields.');
      return;
    }
    setError('');
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('organization', organization.trim());
      // no-cors: Apps Script doesn't return CORS headers, but the POST still
      // executes server-side and the row still gets written.
      await fetch(ENDPOINT, { method: 'POST', mode: 'no-cors', body: formData });
    } catch {
      // Don't block the visitor from entering just because logging failed.
    }

    localStorage.setItem(STORAGE_KEY, 'true');
    setExiting(true);
    setTimeout(() => setVisible(false), 550);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-[#07080a] px-5 ${
        exiting ? 'gate-exit' : 'gate-enter'
      }`}
    >
      <div className="w-full max-w-md">
        <p className="text-[11px] uppercase tracking-[0.25em] text-[#e8702a] mb-3 text-center">
          Welcome
        </p>
        <h1 className="font-playfair italic text-3xl sm:text-4xl text-white text-center mb-2">
          Before you go in&hellip;
        </h1>
        <p className="text-sm text-white/60 text-center mb-8">
          Tell me who's visiting — takes two seconds.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoFocus
            className="w-full bg-white/5 border border-white/15 focus:border-[#e8702a] rounded-xl px-4 py-3 text-white placeholder-white/40 outline-none transition-colors"
          />
          <input
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            placeholder="Organization / College / Company"
            className="w-full bg-white/5 border border-white/15 focus:border-[#e8702a] rounded-xl px-4 py-3 text-white placeholder-white/40 outline-none transition-colors"
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#e8702a] hover:bg-[#d2611f] disabled:opacity-60 text-white font-medium py-3.5 rounded-full flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-95"
          >
            {submitting ? 'Just a sec…' : 'View Portfolio'}
            {!submitting && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>
      </div>
    </div>
  );
}
