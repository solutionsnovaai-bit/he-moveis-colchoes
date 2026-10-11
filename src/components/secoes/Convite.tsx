import { imagens } from '../../config/imagens';
import { textos } from '../../content/textos';
import { site } from '../../config/site';
import { Titulo } from '../ui/Titulo';
import { Botao } from '../ui/Botao';
import { Imagem } from '../ui/Imagem';
import { Revelar } from '../ui/Revelar';
export function Convite() {
  const t = textos.convite;
  return <section id="converse" className="convite espaco" aria-labelledby="convite-titulo"><div className="container convite-grade">
    <Revelar className="convite-imagem"><Imagem fonte={imagens.heroDesktop} alt={t.alt} /></Revelar>
    <div><p className="eyebrow">{t.selo}</p><Titulo linhas={t.linhas} id="convite-titulo" /><p className="convite-texto">{t.texto}</p><Botao mensagem={site.mensagens.geral}>{t.cta}</Botao></div>
  </div></section>;
}
