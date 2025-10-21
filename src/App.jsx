import React, { useMemo, useState } from 'react';
import HeroSection from './components/HeroSection.jsx';
import ResumeOptimizer from './components/ResumeOptimizer.jsx';
import JobSearchPanel from './components/JobSearchPanel.jsx';
import JobList from './components/JobList.jsx';

export default function App() {
  const [optimizedResume, setOptimizedResume] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [savedJobIds, setSavedJobIds] = useState(() => new Set());

  const handleResumeOptimized = (text) => {
    setOptimizedResume(text || '');
  };

  const handleSearchJobs = async ({ jobTitle, location, useResume }) => {
    setLoadingJobs(true);

    // Mock results to keep app functional without backend/APIs.
    const seed = (jobTitle + location + (useResume ? optimizedResume.slice(0, 40) : '')).toLowerCase();
    const sources = ['LinkedIn', 'Glassdoor', 'Naukri'];
    const companies = ['Lumina Tech', 'BluePeak Systems', 'Northbridge Labs', 'OrbitSoft', 'Silverline Data'];
    const cities = location ? [location] : ['Remote', 'New York, NY', 'San Francisco, CA', 'Bengaluru, IN'];

    const mkId = (i) => `${seed.replace(/[^a-z0-9]/g, '')}-${i}-${Date.now()}`;

    const mock = Array.from({ length: 9 }, (_, i) => ({
      id: mkId(i),
      title: jobTitle || 'Software Engineer',
      company: companies[i % companies.length],
      location: cities[i % cities.length],
      source: sources[i % sources.length],
      url: 'https://example.com/job/' + mkId(i),
      description:
        'We are seeking a ' + (jobTitle || 'skilled engineer') +
        ' to join our team. Experience with React, Node.js, cloud services, and CI/CD preferred. Competitive compensation and flexible work culture.',
    }));

    // Simulate network delay
    setTimeout(() => {
      setJobs(mock);
      setLoadingJobs(false);
    }, 700);
  };

  const handleToggleSave = (job) => {
    setSavedJobIds((prev) => {
      const next = new Set(prev);
      if (next.has(job.id)) next.delete(job.id);
      else next.add(job.id);
      return next;
    });
  };

  const savedJobs = useMemo(() => jobs.filter((j) => savedJobIds.has(j.id)), [jobs, savedJobIds]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <HeroSection />

      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 py-16">
        <section id="optimizer" className="scroll-mt-24">
          <ResumeOptimizer onOptimized={handleResumeOptimized} optimizedValue={optimizedResume} />
        </section>

        <section id="jobs" className="scroll-mt-24">
          <JobSearchPanel onSearch={handleSearchJobs} hasOptimizedResume={Boolean(optimizedResume)} />
        </section>

        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Job Results</h2>
          <JobList jobs={jobs} loading={loadingJobs} onToggleSave={handleToggleSave} savedJobIds={savedJobIds} />
        </section>

        {savedJobs.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Saved Jobs</h2>
            <JobList jobs={savedJobs} loading={false} onToggleSave={handleToggleSave} savedJobIds={savedJobIds} />
          </section>
        )}
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-sm text-white/60">
        Built with AI resume optimization and multi-source job discovery.
      </footer>
    </div>
  );
}
