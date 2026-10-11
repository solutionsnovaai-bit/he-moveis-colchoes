import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { textos } from '../../content/textos';
import { useMotionPreferences } from '../../hooks/useMotionPreferences';
import { Marca } from '../ui/Marca';

export function Abertura({ concluir }: { concluir: () => void }) {
  const { desativado } = useMotionPreferences();
  const [progresso, setProgresso] = useState(0);
  const [saindo, setSaindo] = useState(false);
  useEffect(() => {
    if (desativado) { concluir(); return; }
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    let encerrado = false; let resolvidos = 0; let timer = 0; let finalizando = false;
    const inicio = performance.now();
    const terminou = () => {
      if (encerrado || finalizando) return;
      finalizando = true;
      clearTimeout(timer);
      try { sessionStorage.setItem('he-visitou', 'sim'); } catch { /* Sessão sem armazenamento. */ }
      timer = window.setTimeout(() => setSaindo(true), Math.max(0, 450 - (performance.now() - inicio)));
    };
    const atualizar = () => { if (!encerrado) { resolvidos++; setProgresso(Math.round(resolvidos / 3 * 100)); } };
    const img = document.getElementById('hero-imagem') as HTMLImageElement | null;
    let limparImagem = () => {};
    const carregarImagem = new Promise<void>(resolve => {
      if (!img || img.complete) { resolve(); return; }
      const feito = () => resolve();
      img.addEventListener('load', feito, { once: true }); img.addEventListener('error', feito, { once: true });
      limparImagem = () => { img.removeEventListener('load', feito); img.removeEventListener('error', feito); };
    }).then(() => img?.decode().catch(() => {}));
    const tarefas = [document.fonts.load('500 16px Manrope'), document.fonts.load('400 40px Newsreader'), carregarImagem];
    Promise.allSettled(tarefas.map(tarefa => Promise.resolve(tarefa).finally(atualizar))).then(terminou);
    timer = window.setTimeout(terminou, 2000);
    return () => { encerrado = true; clearTimeout(timer); limparImagem(); document.body.style.overflow = overflowAnterior; };
  }, [concluir, desativado]);
  if (desativado) return null;
  return <motion.div className="abertura" initial={false} animate={{ y: saindo ? '-100%' : 0 }}
    transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }} onAnimationComplete={() => { if (saindo) concluir(); }}>
    <button className="abertura-pular" onClick={() => {
      try { sessionStorage.setItem('he-visitou', 'sim'); } catch { /* Sessão sem armazenamento. */ }
      concluir();
      requestAnimationFrame(() => document.getElementById('conteudo')?.focus({ preventScroll: true }));
    }}>Pular abertura <span aria-hidden="true">↗</span></button>
    <div className="abertura-centro">
      <div className="abertura-montagem" aria-label={textos.abertura.marca}>
        {[0, 1, 2].map(i => <div className="abertura-recorte" key={i}><motion.div className="abertura-peca"
          style={{ left: `${i * -100}%` }} initial={{ y: 45, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.65, delay: i * 0.1 }}><Marca decorativa eager /></motion.div></div>)}
      </div>
      <p className="eyebrow">{textos.abertura.preparando}</p>
    </div>
    <div className="abertura-base"><span>{textos.abertura.pronto}</span><span className="abertura-numero" role="progressbar" aria-label={textos.abertura.preparando} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progresso}>{String(progresso).padStart(3, '0')}<small>%</small></span></div>
    <motion.div className="abertura-progresso" style={{ scaleX: progresso / 100 }} />
  </motion.div>;
}
