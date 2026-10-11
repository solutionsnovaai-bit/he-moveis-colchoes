import { site } from '../../config/site';
import { textos } from '../../content/textos';
import { whatsapp } from '../../lib/whatsapp';
import { BrandIcon } from '../ui/BrandIcon';
export function WhatsAppFab() {
  return <a className="whatsapp-fab" href={whatsapp(site.mensagens.geral)} aria-label={textos.fab.label} target="_blank" rel="noopener noreferrer"><span>{textos.fab.texto}</span><BrandIcon /></a>;
}
