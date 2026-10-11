import { Pause, Play } from 'lucide-react';
import { site } from '../../config/site';
import { textos } from '../../content/textos';
import { whatsapp } from '../../lib/whatsapp';
import { useMotionPreferences } from '../../hooks/useMotionPreferences';
import { Marca } from '../ui/Marca';
import { BrandIcon } from '../ui/BrandIcon';
export function Rodape() {
  const { pausado, reduzido, alternar } = useMotionPreferences();
  return <footer className="rodape"><div className="container">
    <div className="rodape-principal"><div><Marca /><p className="rodape-assinatura">{textos.rodape.assinatura}</p></div>
      <div><span className="eyebrow">{textos.rodape.contato}</span><a className="rodape-telefone" href={whatsapp()} target="_blank" rel="noopener noreferrer">{site.telefoneExibicao}</a><a className="rodape-instagram" href={site.instagram} target="_blank" rel="noopener noreferrer"><BrandIcon tipo="instagram" />{site.instagramExibicao}</a></div>
      <div><p>{textos.rodape.local}</p><p>{site.lojas[0].rua}, {site.lojas[0].numero}</p><p>{site.horarios.domingo}</p></div>
    </div>
    <div className="rodape-base"><small>© {new Date().getFullYear()} {textos.rodape.direitos}</small>
      <button className="controle-movimento" onClick={alternar} disabled={reduzido} aria-pressed={pausado || reduzido}>{pausado || reduzido ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}{reduzido ? textos.rodape.reduzido : pausado ? textos.rodape.retomar : textos.rodape.pausar}</button>
    </div>
  </div></footer>;
}
