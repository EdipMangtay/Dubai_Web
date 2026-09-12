'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { useRouteNavigation } from '../RouteTransition';

// Next's onNavigate already excludes downloads, external URLs and modified clicks.
// Same-page anchors retain Next/Lenis scrolling and browser history behavior.
export default function TransitionLink({ onNavigate, ...props }: ComponentProps<typeof Link>) {
  const navigate = useRouteNavigation();
  return <Link {...props} onNavigate={event => {
    let prevented = false;
    onNavigate?.({ preventDefault: () => { prevented = true; event.preventDefault(); } });
    if (prevented || !navigate || typeof props.href !== 'string' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const url = new URL(props.href, window.location.href);
    if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
    event.preventDefault();
    navigate({ href: `${url.pathname}${url.search}${url.hash}`, scroll: props.scroll, replace: props.replace });
  }} />;
}
