import { useEffect } from 'react';
import Lenis from 'lenis';
import { useMotionPreferences } from './useMotionPreferences';

export function useSmoothScroll(bloqueado = false) {
  const { desativado } = useMotionPreferences();
  useEffect(() => {
    if (desativado || bloqueado) return;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false, anchors: { offset: -90 } });
    let frame = 0;
    const atualizar = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(atualizar); };
    frame = requestAnimationFrame(atualizar);
    const visibilidade = () => document.hidden ? lenis.stop() : lenis.start();
    document.addEventListener('visibilitychange', visibilidade);
    return () => { cancelAnimationFrame(frame); document.removeEventListener('visibilitychange', visibilidade); lenis.destroy(); };
  }, [desativado, bloqueado]);
}
