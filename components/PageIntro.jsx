'use client';

import { useEffect, useState } from 'react';

export default function PageIntro() {
  const [phase, setPhase] = useState('visible');

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) {
      const reducedMotionTimer = setTimeout(() => setPhase('hidden'), 0);
      return () => clearTimeout(reducedMotionTimer);
    }

    let isDone = false;
    let leaveTimer;
    let removeTimer;

    const startExit = () => {
      if (isDone) return;
      isDone = true;

      // Small delay so the user experiences the finished loader
      leaveTimer = setTimeout(() => {
        setPhase('leaving');
        window.dispatchEvent(new CustomEvent('pageintro-done'));
        removeTimer = setTimeout(() => {
          setPhase('hidden');
        }, 550);
      }, 500);
    };

    // Wait until document and all assets are completely loaded
    if (document.readyState === 'complete') {
      startExit();
    } else {
      window.addEventListener('load', startExit, { once: true });
      // Fallback timer (maximum 3.5 seconds) in case of slow third-party assets
      const maxWait = setTimeout(startExit, 3500);

      return () => {
        window.removeEventListener('load', startExit);
        clearTimeout(maxWait);
        clearTimeout(leaveTimer);
        clearTimeout(removeTimer);
      };
    }

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (phase === 'hidden') return null;

  return (
    <div className={`page-intro ${phase}`} aria-hidden="true">
      <div className="intro-pattern" />
      <div className="intro-mark" />
      <p>UNIVERSITAS SIBER MUHAMMADIYAH</p>
      <strong>EduPortal SiberMu</strong>
      <span>ILMU · IMAN · AMAL</span>
      <i />
    </div>
  );
}
