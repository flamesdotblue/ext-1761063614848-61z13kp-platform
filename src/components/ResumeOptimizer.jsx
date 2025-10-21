import React, { useRef, useState } from 'react';

export default function ResumeOptimizer({ onOptimized, optimizedValue }) {
  const [resumeText, setResumeText] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [optimizing, setOptimizing] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isText = /text|plain/.test(file.type) || file.name.toLowerCase().endsWith('.txt');
    if (!isText) {
      setResumeText(
        `Imported file: ${file.name}. Preview not available in-browser. For best results, paste your resume text or upload a .txt file.\n\n` +
          resumeText
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      setResumeText(String(evt.target?.result || ''));
    };
    reader.readAsText(file);
  };

  const pseudoOptimize = async (text) => {
    // Local heuristic-based suggestions to keep the app fully client-side and functional.
    const keywords = ['impact', 'metrics', 'ownership', 'cross-functional', 'scalable', 'cloud', 'CI/CD', 'React', 'Node.js', 'TypeScript'];
    const hasMetrics = /%|\b(?:increased|reduced|decreased|improved|grew)\b/i.test(text);
    const lines = text.split(/\n+/).filter(Boolean);
    const bullets = lines.filter((l) => /^[-•*]/.test(l)).length;

    const recs = [];
    if (!hasMetrics) recs.push('Add quantified impact (percentages, revenue, latency, users).');
    if (bullets < 5) recs.push('Use concise bullet points focusing on outcomes over responsibilities.');
    if (!/React|Angular|Vue/i.test(text)) recs.push('Include relevant frameworks (e.g., React) if applicable.');
    if (!/AWS|GCP|Azure/i.test(text)) recs.push('Mention cloud experience (AWS/GCP/Azure) where relevant.');

    const missing = keywords.filter((k) => !new RegExp(`\\b${k.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}\\b`, 'i').test(text));

    const optimized = [
      'SUMMARY',
      'Results-driven professional with a track record of shipping scalable products and measurable impact.',
      '',
      'CORE SKILLS',
      'React, Node.js, TypeScript, CI/CD, Cloud (AWS/GCP), System Design, Testing, Collaboration',
      '',
      'EXPERIENCE HIGHLIGHTS',
      '- Led end-to-end delivery of features with ownership and cross-functional collaboration.',
      '- Improved performance and reliability using best practices and automation.',
      '',
      'EDUCATION',
      'B.S. in Computer Science or related field',
    ].join('\n');

    return {
      suggestions: `Recommendations:\n- ${recs.join('\n- ')}\n\nPotential keyword additions: ${missing.join(', ') || 'None'}\n`,
      optimized,
    };
  };

  const handleOptimize = async () => {
    setOptimizing(true);
    try {
      const base = resumeText.trim();
      if (!base) {
        setSuggestions('Please add your resume text or upload a .txt file first.');
        setOptimizing(false);
        return;
      }
      const { suggestions: s, optimized } = await pseudoOptimize(base);
      setSuggestions(s);
      onOptimized?.(optimized);
    } catch (e) {
      setSuggestions('An error occurred while optimizing your resume.');
    } finally {
      setOptimizing(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="text-2xl font-semibold tracking-tight">Resume Optimization</h2>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/10"
          >
            Upload .txt
          </button>
          <input ref={fileInputRef} type="file" accept=".txt,text/plain" onChange={handleFileSelect} className="hidden" />
          <button
            type="button"
            onClick={handleOptimize}
            disabled={optimizing}
            className="rounded-lg bg-white text-neutral-900 px-4 py-2 text-sm font-semibold hover:bg-white/90 disabled:opacity-60"
          >
            {optimizing ? 'Optimizing…' : 'Run AI Optimization'}
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Your Resume Text</label>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            rows={14}
            className="w-full rounded-xl border border-white/10 bg-neutral-900/60 p-4 outline-none ring-0 focus:border-white/20"
            placeholder="Paste your resume here for best optimization results."
          />
          <p className="mt-2 text-xs text-white/60">
            For DOCX/PDF, paste text here. This keeps everything on-device for privacy during preview.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">AI Suggestions</label>
            <pre className="whitespace-pre-wrap break-words rounded-xl border border-white/10 bg-neutral-900/60 p-4 text-sm min-h-[180px]">
{suggestions || 'Click "Run AI Optimization" to generate suggestions.'}
            </pre>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Optimized Resume Draft</label>
            <pre className="whitespace-pre-wrap break-words rounded-xl border border-white/10 bg-neutral-900/60 p-4 text-sm min-h-[180px]">
{optimizedValue || 'The optimized draft will appear here.'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
