import { imagens } from '../../config/imagens';
import { textos } from '../../content/textos';
import { Imagem } from '../ui/Imagem';
import { Titulo } from '../ui/Titulo';
import { Botao } from '../ui/Botao';
import { Revelar } from '../ui/Revelar';
export function Sobre() {
  if (!imagens.sobre) return null;
  const t = textos.sobre;
  return <section className="sobre espaco" id="sobre" aria-labelledby="sobre-titulo"><div className="container sobre-grade">
    <Revelar><Imagem fonte={imagens.sobre} alt={t.alt} /></Revelar><div><p className="eyebrow">{t.selo}</p><Titulo linhas={t.linhas} id="sobre-titulo" /><p>{t.texto}</p><Botao>{t.cta}</Botao></div>
  </div></section>;
}
