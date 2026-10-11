import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { useMotionPreferences } from '../../hooks/useMotionPreferences';
export function Revelar({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { desativado } = useMotionPreferences();
  return <motion.div className={className} initial={desativado ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
    animate={desativado ? { opacity: 1, y: 0 } : undefined} viewport={{ once: true, amount: 0.15 }} transition={{ duration: desativado ? 0 : 0.65, delay: desativado ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
