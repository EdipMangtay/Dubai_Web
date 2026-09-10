'use client';

import { Component, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useIntroGate } from '@/hooks/useIntroGate';

const CinematicIntro = dynamic(() => import('./intro/CinematicIntro'), { ssr: false });

class IntroBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { active, finish } = useIntroGate(pathname);

  return (
    <>
      <div data-travia-page inert={active}>
        {children}
      </div>
      {active && (
        <IntroBoundary onFailure={finish}>
          <CinematicIntro onComplete={finish} />
        </IntroBoundary>
      )}
    </>
  );
}
