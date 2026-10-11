import { ArrowDown, PackageCheck, Truck } from 'lucide-react';
import { imagens, mediaMobile } from '../../config/imagens';
import { site } from '../../config/site';
import { textos } from '../../content/textos';
import { Botao } from '../ui/Botao';
import { Titulo } from '../ui/Titulo';

export function Hero({ pronto }: { pronto: boolean }) {
  const t = textos.hero;
  return <section id="inicio" className="hero" aria-labelledby="hero-titulo">
    <div className="hero-stage">
      <picture className="hero-arte">
        <source media={mediaMobile} srcSet={imagens.heroMobile.avif} type="image/avif" width={imagens.heroMobile.width} height={imagens.heroMobile.height} />
        <source media={mediaMobile} srcSet={imagens.heroMobile.webp} type="image/webp" width={imagens.heroMobile.width} height={imagens.heroMobile.height} />
        <source srcSet={imagens.heroDesktop.avif} type="image/avif" />
        <img id="hero-imagem" src={imagens.heroDesktop.webp} width={imagens.heroDesktop.width} height={imagens.heroDesktop.height} alt={t.alt} fetchPriority="high" loading="eager" decoding="async" />
      </picture>
      <div className="hero-conteudo"><p className="eyebrow"><span className="ponto" />{t.selo}</p>
        <Titulo linhas={t.linhas} hero id="hero-titulo" ativo={pronto} />
        <p className="hero-descricao">{t.descricao}</p><Botao mensagem={site.mensagens.catalogo}>{t.cta}</Botao>
        <div className="hero-fatos"><span><PackageCheck size={18} aria-hidden="true" />{t.fatos[0]}</span><span><Truck size={18} aria-hidden="true" />{t.fatos[1]}</span></div>
      </div>
      <span className="hero-legenda">{t.legenda}</span>
      <a className="hero-rolar" href="#manifesto"><ArrowDown size={17} aria-hidden="true" />{t.rolar}</a>
    </div>
  </section>;
}
