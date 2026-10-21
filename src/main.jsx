import './demo-bridge.js';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import DesktopViewport from './DesktopViewport.jsx';
import './demo.css';

function Demo() {
  const [version, setVersion] = useState(0);
  const [message, setMessage] = useState('');
  useEffect(() => {
    let timer;
    const handle = event => {
      setMessage(event.detail);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setMessage(''), 3200);
    };
    window.addEventListener('demo-feedback', handle);
    return () => { window.removeEventListener('demo-feedback', handle); window.clearTimeout(timer); };
  }, []);
  return <>
    <DesktopViewport><App key={version}/></DesktopViewport>
    <button className="demo-reset" aria-label="Начать заново" title="Начать заново" onClick={() => { setVersion(v => v + 1); setMessage(''); }}>↻</button>
    {message && <div className="demo-feedback" role="status">{message}</div>}
  </>;
}
createRoot(document.getElementById('root')).render(<Demo />);
