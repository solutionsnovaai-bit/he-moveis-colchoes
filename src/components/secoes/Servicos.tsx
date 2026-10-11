import { useState } from 'react';
import { motion } from 'motion/react';
import { Armchair, BedDouble, CookingPot, Truck, Plus, Minus } from 'lucide-react';
import { grupos } from '../../content/servicos';
import { textos } from '../../content/textos';
import { site } from '../../config/site';
import { useMotionPreferences } from '../../hooks/useMotionPreferences';
import { Botao } from '../ui/Botao';
import { Titulo } from '../ui/Titulo';
import { Revelar } from '../ui/Revelar';

const icones = { movel: Armchair, cama: BedDouble, eletro: CookingPot, entrega: Truck };
export function Servicos() {
  const [aberto, setAberto] = useState<string>('moveis');
  const { desativado } = useMotionPreferences();
  const t = textos.servicos;
  return <section id="opcoes" className="servicos espaco" aria-labelledby="servicos-titulo"><div className="container">
    <div className="cabecalho-secao"><div><p className="eyebrow">{t.selo}</p><Titulo linhas={t.linhas} id="servicos-titulo" /></div><Revelar className="cabecalho-nota"><p>{t.descricao}</p></Revelar></div>
    <div className="servicos-grupos">{grupos.map(grupo => <div className="servicos-grupo" key={grupo.nome}><h3 className="eyebrow">{grupo.nome}</h3><div>
      {grupo.itens.map(item => { const estaAberto = aberto === item.id; const Icon = icones[item.icone]; return <article className={`servico ${estaAberto ? 'servico-aberto' : ''}`} key={item.id}>
        <h4><button className="servico-gatilho" id={`gatilho-${item.id}`} aria-expanded={estaAberto} aria-controls={`painel-${item.id}`} onClick={() => setAberto(estaAberto ? '' : item.id)}>
          <span className="servico-numero">{item.numero}</span><Icon className="servico-icone" aria-hidden="true" /><span className="servico-nome">{item.nome}</span><span className="servico-resumo">{item.resumo}</span>{estaAberto ? <Minus size={22} aria-hidden="true" /> : <Plus size={22} aria-hidden="true" />}
        </button></h4>
        <div id={`painel-${item.id}`} role="region" aria-labelledby={`gatilho-${item.id}`} hidden={!estaAberto}>
          {estaAberto && <motion.div className="servico-conteudo" initial={desativado ? false : { y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: desativado ? 0 : 0.3 }}><p>{item.descricao}</p><Botao compacto mensagem={site.mensagens.servico(item.nome)}>{t.cta}</Botao></motion.div>}
        </div>
      </article>; })}
    </div></div>)}</div>
    <Revelar className="condicoes"><h3>{t.condicaoTitulo}</h3><div className="condicoes-itens">{t.condicoes.map(condicao => <div key={condicao.nome}><span>{condicao.nome}</span><p>{condicao.texto}</p></div>)}</div><p className="nota-pequena">{t.condicaoNota}</p></Revelar>
  </div></section>;
}
