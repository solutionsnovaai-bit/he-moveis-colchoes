import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { MotionPreferencesProvider } from './hooks/useMotionPreferences';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(<StrictMode><MotionPreferencesProvider><App /></MotionPreferencesProvider></StrictMode>);
