import { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useScroll, useVelocity } from 'motion/react';
import { textos } from '../../content/textos';
import { useSceneActivity } from '../../hooks/useSceneActivity';
import { useMotionPreferences } from '../../hooks/useMotionPreferences';

export function Faixa() {
  const { ref, ativo } = useSceneActivity();
  const { desativado } = useMotionPreferences();
  const grupo = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0); const { scrollY } = useScroll(); const velocidade = useVelocity(scrollY);
  useAnimationFrame((_, delta) => {
    const largura = grupo.current?.offsetWidth ?? 0;
    if (!ativo || !largura) return;
    const passo = (38 + Math.min(200, Math.abs(velocidade.get()) * 0.05)) * Math.min(delta, 40) / 1000;
    x.set(-((Math.abs(x.get()) + passo) % largura));
  });
  return <div ref={ref} className={`faixa ${desativado ? 'faixa-parada' : ''}`} aria-label={textos.faixa.join(', ')}>
    <motion.div className="faixa-trilha" style={{ x: desativado ? 0 : x }} aria-hidden="true">
      {Array.from({ length: desativado ? 1 : 4 }, (_, i) => <div className="faixa-grupo" ref={i === 0 ? grupo : undefined} key={i}>{textos.faixa.map(texto => <span key={texto}>{texto}<i>✳</i></span>)}</div>)}
    </motion.div>
  </div>;
}
