import { useCallback, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { textos } from './content/textos';
import { useMotionPreferences } from './hooks/useMotionPreferences';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { Abertura } from './components/abertura/Abertura';
import { Topo } from './components/layout/Topo';
import { Rodape } from './components/layout/Rodape';
import { WhatsAppFab } from './components/layout/WhatsAppFab';
import { DadosEstruturados } from './components/layout/DadosEstruturados';
import { Hero } from './components/secoes/Hero';
import { Faixa } from './components/secoes/Faixa';
import { Manifesto } from './components/secoes/Manifesto';
import { Servicos } from './components/secoes/Servicos';
import { Galeria } from './components/secoes/Galeria';
import { Sobre } from './components/secoes/Sobre';
import { Passos } from './components/secoes/Passos';
import { OndeFica } from './components/secoes/OndeFica';
import { Convite } from './components/secoes/Convite';

export default function App() {
  const { desativado } = useMotionPreferences();
  const [abrindo, setAbrindo] = useState(!desativado);
  const [menu, setMenu] = useState(false);
  const concluir = useCallback(() => setAbrindo(false), []);
  const emAbertura = abrindo && !desativado;
  useSmoothScroll(emAbertura || menu);
  return <MotionConfig reducedMotion={desativado ? 'always' : 'never'}>
    <DadosEstruturados />
    <a className="pular" href="#conteudo">{textos.pular}</a>
    <div inert={emAbertura}><Topo aoAbrir={setMenu} /></div>
    <main id="conteudo" tabIndex={-1} inert={emAbertura || menu}>
      <Hero pronto={!emAbertura} /><Faixa /><Manifesto /><Servicos /><Galeria /><Sobre /><Passos /><OndeFica /><Convite />
    </main>
    <div inert={emAbertura || menu}><Rodape /></div>
    {emAbertura && <Abertura concluir={concluir} />}
    <WhatsAppFab />
  </MotionConfig>;
}
