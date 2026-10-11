import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { site } from '../../config/site';
import { textos } from '../../content/textos';
import { Marca } from '../ui/Marca';
import { Botao } from '../ui/Botao';
import { useMotionPreferences } from '../../hooks/useMotionPreferences';

const focaveis = 'a[href], button:not([disabled]), [tabindex="0"]';

export function Topo({ aoAbrir }: { aoAbrir: (aberto: boolean) => void }) {
  const [aberto, setAberto] = useState(false);
  const [presente, setPresente] = useState(false);
  const [rolou, setRolou] = useState(false);
  const [ativo, setAtivo] = useState('');
  const botao = useRef<HTMLButtonElement>(null);
  const marca = useRef<HTMLAnchorElement>(null);
  const painel = useRef<HTMLDivElement>(null);
  const destino = useRef<string | null>(null);
  const esteveAberto = useRef(false);
  const { desativado } = useMotionPreferences();
  const semMovimento = useRef(desativado);

  useEffect(() => { semMovimento.current = desativado; }, [desativado]);

  useEffect(() => {
    const atualizar = () => setRolou(window.scrollY > 24);
    atualizar();
    window.addEventListener('scroll', atualizar, { passive: true });
    return () => window.removeEventListener('scroll', atualizar);
  }, []);

  useEffect(() => {
    const visiveis = new Set<string>();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const href = `#${entry.target.id}`;
        if (entry.isIntersecting) visiveis.add(href);
        else visiveis.delete(href);
      });
      setAtivo(textos.menu.links.find(link => visiveis.has(link.href))?.href ?? '');
    }, { rootMargin: '-18% 0px -55% 0px', threshold: 0 });
    textos.menu.links.forEach(link => {
      const secao = document.getElementById(link.href.slice(1));
      if (secao) observer.observe(secao);
    });
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    // Commit the parent's inert state before restoring focus on the next frame.
    // The lock remains active until the closing animation has finished.
    aoAbrir(presente);
  }, [presente, aoAbrir]);

  useEffect(() => {
    if (!presente) {
      if (!esteveAberto.current) return;
      esteveAberto.current = false;
      const frame = requestAnimationFrame(() => {
        const href = destino.current;
        destino.current = null;
        const secao = href ? document.getElementById(href.slice(1)) : null;
        if (secao && href) {
          const tinhaTabindex = secao.hasAttribute('tabindex');
          if (!tinhaTabindex) secao.setAttribute('tabindex', '-1');
          secao.focus({ preventScroll: true });
          if (!tinhaTabindex) secao.addEventListener('blur', () => secao.removeAttribute('tabindex'), { once: true });
          if (window.location.hash !== href) window.history.pushState(window.history.state, '', href);
          secao.scrollIntoView({ behavior: semMovimento.current ? 'auto' : 'smooth', block: 'start' });
        } else {
          (window.innerWidth < 900 ? botao.current : marca.current)?.focus({ preventScroll: true });
        }
      });
      return () => cancelAnimationFrame(frame);
    }

    esteveAberto.current = true;
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    painel.current?.querySelector<HTMLElement>(focaveis)?.focus({ preventScroll: true });
    const manterFoco = (event: FocusEvent) => {
      if (event.target instanceof Node && !painel.current?.contains(event.target)) {
        painel.current?.querySelector<HTMLElement>(focaveis)?.focus({ preventScroll: true });
      }
    };
    const teclado = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setAberto(false);
      }
      if (event.key !== 'Tab') return;
      const itens = painel.current?.querySelectorAll<HTMLElement>(focaveis);
      if (!itens?.length) return;
      const primeiro = itens[0];
      const ultimo = itens[itens.length - 1];
      if (event.shiftKey && document.activeElement === primeiro) {
        event.preventDefault();
        ultimo.focus();
      } else if (!event.shiftKey && document.activeElement === ultimo) {
        event.preventDefault();
        primeiro.focus();
      }
    };
    const ampliar = () => { if (window.innerWidth >= 900) setAberto(false); };
    document.addEventListener('keydown', teclado);
    document.addEventListener('focusin', manterFoco);
    window.addEventListener('resize', ampliar);
    return () => {
      document.body.style.overflow = overflowAnterior;
      document.removeEventListener('keydown', teclado);
      document.removeEventListener('focusin', manterFoco);
      window.removeEventListener('resize', ampliar);
    };
  }, [presente]);

  const abrir = () => {
    destino.current = null;
    setPresente(true);
    setAberto(true);
  };

  return <>
    <header className={`topo ${rolou ? 'topo-rolou' : ''}`} inert={presente}>
      <div className="topo-dentro">
        <a ref={marca} href="#inicio" className="topo-marca" aria-label={site.nome}>
          <Marca eager decorativa /><span>{site.nome}</span>
        </a>
        <nav className="nav-desktop" aria-label={textos.menu.nome}>
          {textos.menu.links.map(link => <a href={link.href} key={link.href} aria-current={ativo === link.href ? 'location' : undefined}>{link.label}</a>)}
        </nav>
        <div className="topo-contato"><Botao compacto>{textos.menu.conversar}</Botao></div>
        <button ref={botao} type="button" className="menu-toggle" aria-label={textos.menu.abrir} aria-expanded={aberto} aria-controls="menu-mobile" aria-haspopup="dialog" onClick={abrir}>
          <Menu aria-hidden="true" />
        </button>
      </div>
    </header>
    <AnimatePresence onExitComplete={() => setPresente(false)}>
      {aberto && <motion.div id="menu-mobile" ref={painel} className="menu-mobile" role="dialog" aria-modal="true" aria-label={textos.menu.nome} data-lenis-prevent
        initial={desativado ? false : { opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: desativado ? 0 : -10 }}
        transition={{ duration: desativado ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}>
        <div className="menu-mobile-topo">
          <div className="menu-mobile-marca"><Marca decorativa /><span>{site.nome}</span></div>
          <button type="button" className="menu-toggle" aria-label={textos.menu.fechar} onClick={() => setAberto(false)}><X aria-hidden="true" /></button>
        </div>
        <nav aria-label={textos.menu.nome}>
          {textos.menu.links.map((link, i) => <a href={link.href} key={link.href} aria-current={ativo === link.href ? 'location' : undefined} onClick={event => {
            event.preventDefault();
            destino.current = link.href;
            setAberto(false);
          }}>
            <small aria-hidden="true">{String(i + 1).padStart(2, '0')}</small><span>{link.label}</span><ArrowUpRight aria-hidden="true" />
          </a>)}
        </nav>
        <div className="menu-mobile-contato"><p className="eyebrow">{textos.rodape.local}</p><Botao>{textos.menu.conversar}</Botao></div>
      </motion.div>}
    </AnimatePresence>
  </>;
}
