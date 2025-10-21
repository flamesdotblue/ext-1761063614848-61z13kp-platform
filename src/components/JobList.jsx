import React from 'react';
import { Bookmark, ExternalLink } from 'lucide-react';

export default function JobList({ jobs = [], loading = false, onToggleSave, savedJobIds }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="h-5 w-2/3 rounded bg-white/10" />
            <div className="mt-3 h-4 w-1/2 rounded bg-white/10" />
            <div className="mt-4 h-20 w-full rounded bg-white/10" />
            <div className="mt-4 h-9 w-24 rounded bg-white/10" />
          </div>
        ))}
      </div>
    );
  }

  if (!jobs.length) {
    return <div className="text-white/70">No jobs yet. Try a search above.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => {
        const saved = savedJobIds?.has(job.id);
        return (
          <article key={job.id} className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/10">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold leading-tight">{job.title}</h3>
                <p className="text-sm text-white/70">{job.company} • {job.location}</p>
              </div>
              <span className="text-xs rounded-full border border-white/15 bg-neutral-900/60 px-2 py-1 text-white/70">
                {job.source}
              </span>
            </div>

            <p className="mt-3 text-sm text-white/80 line-clamp-4">{job.description}</p>

            <div className="mt-4 flex items-center gap-2">
              <a
                href={job.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-sm hover:bg-white/10"
              >
                View <ExternalLink size={16} />
              </a>
              <button
                type="button"
                onClick={() => onToggleSave?.(job)}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm border ${
                  saved ? 'bg-white text-neutral-900 border-white' : 'border-white/20 hover:bg-white/10'
                }`}
              >
                <Bookmark size={16} /> {saved ? 'Saved' : 'Save'}
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
