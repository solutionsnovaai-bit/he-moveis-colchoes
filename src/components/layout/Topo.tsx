import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { site } from '../../config/site';
import { textos } from '../../content/textos';
import { Marca } from '../ui/Marca';
import { Botao } from '../ui/Botao';
import { useMotionPreferences } from '../../hooks/useMotionPreferences';

export function Topo({ aoAbrir }: { aoAbrir: (aberto: boolean) => void }) {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const botao = useRef<HTMLButtonElement>(null); const painel = useRef<HTMLDivElement>(null);
  const { desativado } = useMotionPreferences();
  useEffect(() => {
    const atualizar = () => setRolou(window.scrollY > 32);
    atualizar(); window.addEventListener('scroll', atualizar, { passive: true });
    return () => window.removeEventListener('scroll', atualizar);
  }, []);
  useEffect(() => {
    aoAbrir(aberto);
    if (!aberto) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    painel.current?.querySelector<HTMLElement>('button, a')?.focus();
    const teclado = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setAberto(false);
      if (event.key !== 'Tab') return;
      const itens = painel.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!itens?.length) return;
      const primeiro = itens[0]; const ultimo = itens[itens.length - 1];
      if (event.shiftKey && document.activeElement === primeiro) { event.preventDefault(); ultimo.focus(); }
      else if (!event.shiftKey && document.activeElement === ultimo) { event.preventDefault(); primeiro.focus(); }
    };
    const ampliar = () => { if (window.innerWidth >= 900) setAberto(false); };
    document.addEventListener('keydown', teclado); window.addEventListener('resize', ampliar);
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', teclado); window.removeEventListener('resize', ampliar); botao.current?.focus(); };
  }, [aberto, aoAbrir]);
  return <>
    <header className={`topo ${rolou ? 'topo-rolou' : ''}`}>
      <div className="topo-dentro"><a href="#inicio" className="topo-marca" aria-label={site.nome}><Marca eager /><span>{site.nome}</span></a>
        <nav className="nav-desktop" aria-label={textos.menu.nome}>{textos.menu.links.map(link => <a href={link.href} key={link.href}>{link.label}</a>)}</nav>
        <div className="topo-contato"><Botao compacto>{textos.menu.conversar}</Botao></div>
        <button ref={botao} className="menu-toggle" aria-label={textos.menu.abrir} aria-expanded={aberto} aria-controls="menu-mobile" onClick={() => setAberto(true)}><Menu aria-hidden="true" /></button>
      </div>
    </header>
    <AnimatePresence>{aberto && <motion.div id="menu-mobile" ref={painel} className="menu-mobile" role="dialog" aria-modal="true" aria-label={textos.menu.nome}
      initial={desativado ? false : { opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: desativado ? 0 : 0.2 }}>
      <div className="menu-mobile-topo"><Marca /><button className="menu-toggle" aria-label={textos.menu.fechar} onClick={() => setAberto(false)}><X aria-hidden="true" /></button></div>
      <nav>{textos.menu.links.map((link, i) => <a href={link.href} key={link.href} onClick={() => setAberto(false)}><small>{String(i + 1).padStart(2, '0')}</small>{link.label}</a>)}</nav>
      <Botao>{textos.menu.conversar}</Botao>
    </motion.div>}</AnimatePresence>
  </>;
}
