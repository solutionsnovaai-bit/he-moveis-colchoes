import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export const prefereReduzido = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const salvo = () => { try { return localStorage.getItem('he-pausar') === 'sim'; } catch { return false; } };
interface Preferencias { reduzido: boolean; pausado: boolean; desativado: boolean; alternar: () => void }
const Contexto = createContext<Preferencias>({ reduzido: false, pausado: false, desativado: false, alternar: () => {} });
export function MotionPreferencesProvider({ children }: { children: ReactNode }) {
  const [reduzido, setReduzido] = useState(prefereReduzido);
  const [pausado, setPausado] = useState(salvo);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const atualizar = () => setReduzido(query.matches);
    query.addEventListener('change', atualizar);
    return () => query.removeEventListener('change', atualizar);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.movimento = reduzido || pausado ? 'pausado' : 'ativo';
    try { localStorage.setItem('he-pausar', pausado ? 'sim' : 'nao'); } catch { /* Preferência mantida em memória. */ }
  }, [reduzido, pausado]);
  const value = useMemo(() => ({ reduzido, pausado, desativado: reduzido || pausado, alternar: () => setPausado(v => !v) }), [reduzido, pausado]);
  return <Contexto.Provider value={value}>{children}</Contexto.Provider>;
}
export const useMotionPreferences = () => useContext(Contexto);
