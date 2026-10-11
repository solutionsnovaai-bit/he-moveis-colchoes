import { useState } from 'react';
import { MapPin, ArrowUpRight, Clock } from 'lucide-react';
import { site } from '../../config/site';
import { textos } from '../../content/textos';
import { linkMapa, mapaEmbed } from '../../lib/mapa';
import { whatsapp } from '../../lib/whatsapp';
import { Titulo } from '../ui/Titulo';
import { Revelar } from '../ui/Revelar';

export function OndeFica() {
  const [carregou, setCarregou] = useState(false); const t = textos.local;
  return <section id="onde-fica" className="local espaco" aria-labelledby="local-titulo"><div className="container local-grade">
    <div><p className="eyebrow">{t.selo}</p><Titulo linhas={t.linhas} id="local-titulo" /><p className="local-descricao">{t.descricao}</p>
      <div className="enderecos">{site.lojas.map(loja => <address key={loja.id}><span className="endereco-icone"><MapPin size={21} aria-hidden="true" /></span><div><span className="eyebrow">{loja.nome}</span><p>{loja.rua}{loja.confirmado ? `, ${loja.numero}` : ''}</p>
        {loja.confirmado ? <a className="link-seta" href={linkMapa} target="_blank" rel="noopener noreferrer">{t.mapa}<ArrowUpRight size={16} aria-hidden="true" /></a> : <><small>{t.enderecoPendente}</small><a className="link-seta" href={whatsapp(site.mensagens.endereco)} target="_blank" rel="noopener noreferrer">{t.confirmar}<ArrowUpRight size={16} aria-hidden="true" /></a></>}
      </div></address>)}</div>
      <div className="horarios"><Clock size={21} aria-hidden="true" /><div><h3>{t.horario}</h3><p>{site.horarios.domingo}</p><p>{site.horarios.demais}</p><a className="link-seta" href={whatsapp(site.mensagens.horario)} target="_blank" rel="noopener noreferrer">{t.consultar}<ArrowUpRight size={16} aria-hidden="true" /></a></div></div>
    </div>
    <Revelar className="mapa-coluna"><div className="mapa"><div className="mapa-reserva"><MapPin size={40} aria-hidden="true" /><p>{site.lojas[0].rua}, {site.lojas[0].numero}</p><small>{t.mapaReserva}</small></div><iframe src={mapaEmbed} title={t.mapaTitulo} width="640" height="620" loading="lazy" referrerPolicy="no-referrer-when-downgrade" onLoad={() => setCarregou(true)} className={carregou ? 'mapa-carregado' : ''} /></div><a className="mapa-link" href={linkMapa} target="_blank" rel="noopener noreferrer"><MapPin size={18} aria-hidden="true" />{t.mapa}<ArrowUpRight size={19} aria-hidden="true" /></a></Revelar>
  </div></section>;
}
