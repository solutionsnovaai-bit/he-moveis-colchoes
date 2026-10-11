import { useEffect, useRef, useState, type PointerEvent, type KeyboardEvent } from 'react';
import { animate, motion, useAnimationFrame, useMotionValue } from 'motion/react';
import { ArrowLeft, ArrowRight, MoveHorizontal } from 'lucide-react';
import { imagens } from '../../config/imagens';
import { site } from '../../config/site';
import { textos } from '../../content/textos';
import { useSceneActivity } from '../../hooks/useSceneActivity';
import { useMotionPreferences } from '../../hooks/useMotionPreferences';
import { Imagem } from '../ui/Imagem';
import { Titulo } from '../ui/Titulo';
import { Botao } from '../ui/Botao';

export function Galeria() {
  const { ref, ativo } = useSceneActivity(); const { desativado } = useMotionPreferences();
  const viewport = useRef<HTMLDivElement>(null); const grupo = useRef<HTMLDivElement>(null);
  const largura = useRef(0); const arrasto = useRef<{ id: number; inicio: number; posicao: number } | null>(null);
  const animacao = useRef<{ stop: () => void } | null>(null);
  const [limites, setLimites] = useState({ inicio: true, fim: false });
  const [hover, setHover] = useState(false); const [foco, setFoco] = useState(false); const x = useMotionValue(0);
  const t = textos.galeria;
  const normalizar = (valor: number) => largura.current ? -largura.current + ((valor % largura.current) + largura.current) % largura.current : 0;
  useEffect(() => {
    if (!grupo.current) return;
    const area = viewport.current;
    const atualizarLimites = () => {
      if (!area) return;
      setLimites({ inicio: area.scrollLeft <= 1, fim: area.scrollLeft + area.clientWidth >= area.scrollWidth - 1 });
    };
    const medir = () => {
      animacao.current?.stop(); animacao.current = null;
      largura.current = grupo.current?.getBoundingClientRect().width ?? 0;
      x.set(-largura.current); atualizarLimites();
    };
    if (area) area.scrollLeft = 0;
    medir(); const observer = new ResizeObserver(medir); observer.observe(grupo.current);
    if (area) { observer.observe(area); area.addEventListener('scroll', atualizarLimites, { passive: true }); }
    return () => { observer.disconnect(); area?.removeEventListener('scroll', atualizarLimites); animacao.current?.stop(); animacao.current = null; };
  }, [x, desativado]);
  useAnimationFrame((_, delta) => {
    if (ativo && !hover && !foco && !arrasto.current && !animacao.current) x.set(normalizar(x.get() - 28 * Math.min(delta, 40) / 1000));
  });
  const iniciar = (event: PointerEvent<HTMLDivElement>) => {
    if (desativado || event.button !== 0) return;
    animacao.current?.stop(); animacao.current = null; x.set(normalizar(x.get()));
    arrasto.current = { id: event.pointerId, inicio: event.clientX, posicao: x.get() }; event.currentTarget.setPointerCapture(event.pointerId);
  };
  const mover = (event: PointerEvent<HTMLDivElement>) => { if (arrasto.current) x.set(normalizar(arrasto.current.posicao + event.clientX - arrasto.current.inicio)); };
  const terminar = () => { arrasto.current = null; };
  const navegar = (direcao: number) => {
    const card = grupo.current?.querySelector('figure')?.getBoundingClientRect().width ?? 280;
    const espaco = grupo.current ? parseFloat(getComputedStyle(grupo.current).columnGap) || 0 : 24;
    const passo = card + espaco;
    if (desativado) viewport.current?.scrollBy({ left: direcao * passo, behavior: 'instant' });
    else {
      animacao.current?.stop();
      let inicio = normalizar(x.get());
      if (direcao < 0 && inicio + passo > 0) inicio -= largura.current;
      x.set(inicio);
      animacao.current = animate(x, inicio - direcao * passo, {
        duration: 0.55, ease: [0.22, 1, 0.36, 1],
        onComplete: () => { x.set(normalizar(x.get())); animacao.current = null; },
      });
    }
  };
  const teclado = (e: KeyboardEvent<HTMLDivElement>) => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); navegar(e.key === 'ArrowRight' ? 1 : -1); } };
  return <section id="galeria" className="galeria espaco" aria-labelledby="galeria-titulo" ref={ref}
    onFocusCapture={() => setFoco(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFoco(false); }}>
    <div className="container cabecalho-secao"><div><p className="eyebrow">{t.selo}</p><Titulo linhas={t.linhas} id="galeria-titulo" /></div><p className="cabecalho-nota">{t.descricao}</p></div>
    <div id="galeria-produtos" className={`galeria-viewport ${desativado ? 'galeria-parada' : ''}`} ref={viewport} role="region" aria-label={t.regiao} tabIndex={0}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onKeyDown={teclado}
      onPointerDown={iniciar} onPointerMove={mover} onPointerUp={terminar} onPointerCancel={terminar} onLostPointerCapture={terminar}>
      <motion.div className="galeria-trilha" style={{ x: desativado ? 0 : x }}>
        {Array.from({ length: desativado ? 1 : 3 }, (_, grupoIndice) => <div className="galeria-grupo" ref={grupoIndice === 0 ? grupo : undefined} key={grupoIndice} aria-hidden={grupoIndice > 0 || undefined}>
          {imagens.galeria.map((item, i) => <figure key={item.id} className="galeria-item">
            <Imagem fonte={imagens[item.fonte]} recorte={item.recorte} alt={grupoIndice === 0 ? t.itens[item.id].alt : ''} />
            <figcaption><span className="galeria-categoria">{t.itens[item.id].categoria}<small>{String(i + 1).padStart(2, '0')}</small></span><strong>{t.itens[item.id].titulo}</strong></figcaption>
          </figure>)}
        </div>)}
      </motion.div>
    </div>
    <div className="container galeria-base"><div><span className="arraste"><MoveHorizontal size={18} aria-hidden="true" />{t.arrastar}</span><p className="nota-pequena">{t.fotosNota}</p></div><div className="galeria-controles"><button type="button" onClick={() => navegar(-1)} aria-label={t.anterior} aria-controls="galeria-produtos" disabled={desativado && limites.inicio}><ArrowLeft aria-hidden="true" /></button><button type="button" onClick={() => navegar(1)} aria-label={t.proximo} aria-controls="galeria-produtos" disabled={desativado && limites.fim}><ArrowRight aria-hidden="true" /></button></div><Botao mensagem={site.mensagens.catalogo}>{t.cta}</Botao></div>
  </section>;
}
