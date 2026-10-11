import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import { useMotionPreferences } from './useMotionPreferences';

export function useSceneActivity<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const visivel = useInView(ref, { margin: '100px' });
  const { desativado } = useMotionPreferences();
  const [abaVisivel, setAbaVisivel] = useState(!document.hidden);
  useEffect(() => {
    const atualizar = () => setAbaVisivel(!document.hidden);
    document.addEventListener('visibilitychange', atualizar);
    return () => document.removeEventListener('visibilitychange', atualizar);
  }, []);
  return { ref, ativo: visivel && abaVisivel && !desativado };
}
