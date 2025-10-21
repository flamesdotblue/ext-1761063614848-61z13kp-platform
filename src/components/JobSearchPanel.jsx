import React, { useState } from 'react';

export default function JobSearchPanel({ onSearch, hasOptimizedResume }) {
  const [jobTitle, setJobTitle] = useState('Software Engineer');
  const [location, setLocation] = useState('Remote');
  const [useResume, setUseResume] = useState(hasOptimizedResume);

  const submit = (e) => {
    e.preventDefault();
    onSearch?.({ jobTitle, location, useResume });
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <h2 className="text-2xl font-semibold tracking-tight">Job Search</h2>
      <p className="mt-2 text-white/70 text-sm">
        Search by profession and location. Optionally use your optimized resume to refine relevance.
      </p>

      <form onSubmit={submit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-white/80 mb-2">Profession / Title</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-neutral-900/60 px-4 py-2 outline-none focus:border-white/20"
            placeholder="e.g., Software Engineer, Marketing Manager"
          />
        </div>
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-white/80 mb-2">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-neutral-900/60 px-4 py-2 outline-none focus:border-white/20"
            placeholder="e.g., Remote, New York, Bengaluru"
          />
        </div>
        <div className="sm:col-span-2 flex items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={useResume}
              onChange={(e) => setUseResume(e.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-neutral-900/60"
              disabled={!hasOptimizedResume}
            />
            <span className={hasOptimizedResume ? '' : 'text-white/40'}>Use optimized resume for matching</span>
          </label>

          <button
            type="submit"
            className="rounded-lg bg-white text-neutral-900 px-5 py-2.5 font-semibold hover:bg-white/90"
          >
            Search Jobs
          </button>
        </div>
      </form>

      <div className="mt-4 text-xs text-white/60">
        Sources: LinkedIn, Glassdoor, Naukri (mocked for demo; integrate with Apify actors in backend).
      </div>
    </div>
  );
}
