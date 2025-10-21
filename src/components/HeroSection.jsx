import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroSection() {
  return (
    <header className="relative w-full bg-neutral-950">
      <div className="relative h-[520px] overflow-hidden">
        <div className="absolute inset-0">
          <Spline
            scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-950/10 via-neutral-950/30 to-neutral-950" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-neutral-950 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Optimize your resume. Find the right job.
            </h1>
            <p className="mt-4 text-white/80 text-lg">
              AI-powered resume enhancements and multi-platform job search across LinkedIn, Glassdoor, and Naukri.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#optimizer"
                className="inline-flex items-center rounded-lg bg-white px-5 py-3 text-neutral-900 font-semibold hover:bg-white/90 transition"
              >
                Optimize Resume
              </a>
              <a
                href="#jobs"
                className="inline-flex items-center rounded-lg border border-white/20 px-5 py-3 font-semibold hover:bg-white/10 transition"
              >
                Search Jobs
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
