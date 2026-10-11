import { motion } from 'motion/react';
import { useMotionPreferences } from '../../hooks/useMotionPreferences';
export function Titulo({ linhas, id, hero = false, ativo = true }: { linhas: readonly string[]; id?: string; hero?: boolean; ativo?: boolean }) {
  const { desativado } = useMotionPreferences();
  const Tag = hero ? 'h1' : 'h2';
  return <Tag id={id} className={`titulo ${hero ? 'titulo-hero' : ''}`}>
    {linhas.map((linha, i) => <span className="linha-mascara" key={linha}><motion.span
      initial={desativado ? false : { y: '108%', opacity: 0 }}
      whileInView={ativo ? { y: 0, opacity: 1 } : undefined}
      animate={desativado ? { y: 0, opacity: 1 } : undefined}
      viewport={{ once: true }} transition={{ duration: desativado ? 0 : 0.85, delay: desativado ? 0 : i * 0.1, ease: [0.22, 1, 0.36, 1] }}>
      {linha}
    </motion.span></span>)}
  </Tag>;
}
