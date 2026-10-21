import React, { useLayoutEffect, useState } from 'react';
import { flushSync } from 'react-dom';

// Keep the original desktop composition; resize it as one coordinate system.
function measureViewport() {
  const width = Math.max(1, window.innerWidth);
  const height = Math.max(1, window.innerHeight);
  const scale = Math.min(width / 1920, height / 1080);
  return { width: width / scale, height: height / scale, scale };
}

export default function DesktopViewport({ children }) {
  const [viewport, setViewport] = useState(measureViewport);
  useLayoutEffect(() => {
    // Apply the new coordinate system in the resize event, before the next paint.
    const resize = () => flushSync(() => setViewport(measureViewport()));
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);
  return <div className="desktop-viewport"><div className="desktop-stage" style={{
    width: viewport.width,
    height: viewport.height,
    transform: `scale(${viewport.scale})`,
    '--screen-width': `${viewport.width}px`,
    '--screen-height': `${viewport.height}px`,
  }}>{children}</div></div>;
}
