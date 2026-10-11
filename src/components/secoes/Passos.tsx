import { useRef } from 'react';
import { motion, useScroll } from 'motion/react';
import { MessageCircle, ScanLine, Truck } from 'lucide-react';
import { textos } from '../../content/textos';
import { useMotionPreferences } from '../../hooks/useMotionPreferences';
import { Titulo } from '../ui/Titulo';
import { Revelar } from '../ui/Revelar';
const icones = [MessageCircle, ScanLine, Truck];
export function Passos() {
  const ref = useRef<HTMLDivElement>(null); const { desativado } = useMotionPreferences();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 50%'] });
  const t = textos.passos;
  return <section id="como-funciona" className="passos espaco" aria-labelledby="passos-titulo"><div className="container">
    <p className="eyebrow">{t.selo}</p><Titulo linhas={t.linhas} id="passos-titulo" />
    <div className="passos-grade" ref={ref}>
      <div className="passos-fio passos-fio-horizontal" aria-hidden="true"><motion.span style={{ scaleX: desativado ? 1 : scrollYProgress }} /></div>
      <div className="passos-fio passos-fio-vertical" aria-hidden="true"><motion.span style={{ scaleY: desativado ? 1 : scrollYProgress }} /></div>
      {t.itens.map((item, i) => { const Icon = icones[i]; return <Revelar className="passo" key={item.numero} delay={i * 0.08}><span className="passo-bolha"><Icon aria-hidden="true" /></span><span className="passo-numero">{item.numero}</span><h3>{item.titulo}</h3><p>{item.texto}</p></Revelar>; })}
    </div>
  </div></section>;
}
