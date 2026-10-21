import './demo-bridge.js';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './demo.css';
function Demo() {
  const [version, setVersion] = useState(0);
  const [message, setMessage] = useState('Архивное демо · RAGE MP');
  useEffect(() => {
    const handle = event => setMessage(event.detail);
    window.addEventListener('demo-feedback', handle);
    return () => window.removeEventListener('demo-feedback', handle);
  }, []);
  return <><App key={version}/><aside className="demo-toolbar"><span role="status">{message}</span><button onClick={() => {setVersion(v => v + 1); setMessage('Архивное демо · RAGE MP');}}>Сначала</button></aside></>;
}
createRoot(document.getElementById('root')).render(<Demo />);
