import { useEffect, useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useScroll, useVelocity } from 'motion/react';
import { textos } from '../../content/textos';
import { useSceneActivity } from '../../hooks/useSceneActivity';
import { useMotionPreferences } from '../../hooks/useMotionPreferences';

export function Faixa() {
  const { ref, ativo } = useSceneActivity();
  const { desativado } = useMotionPreferences();
  const grupo = useRef<HTMLDivElement>(null);
  const largura = useRef(0);
  const x = useMotionValue(0); const { scrollY } = useScroll(); const velocidade = useVelocity(scrollY);
  useEffect(() => {
    if (!grupo.current) return;
    const medir = () => { largura.current = grupo.current?.offsetWidth ?? 0; };
    medir(); const observer = new ResizeObserver(medir); observer.observe(grupo.current);
    return () => observer.disconnect();
  }, [desativado]);
  useAnimationFrame((_, delta) => {
    if (!ativo || !largura.current) return;
    const passo = (38 + Math.min(200, Math.abs(velocidade.get()) * 0.05)) * Math.min(delta, 40) / 1000;
    x.set(-((Math.abs(x.get()) + passo) % largura.current));
  });
  return <div ref={ref} className={`faixa ${desativado ? 'faixa-parada' : ''}`}>
    <p className="faixa-leitura">{textos.faixa.join(', ')}</p>
    <motion.div className="faixa-trilha" style={{ x: desativado ? 0 : x }} aria-hidden="true">
      {Array.from({ length: desativado ? 1 : 4 }, (_, i) => <div className="faixa-grupo" ref={i === 0 ? grupo : undefined} key={i}>{textos.faixa.map(texto => <span key={texto}>{texto}<i>✳</i></span>)}</div>)}
    </motion.div>
  </div>;
}
