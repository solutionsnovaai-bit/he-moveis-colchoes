import { site } from '../../config/site';
export function DadosEstruturados() {
  const dados = {
    '@context': 'https://schema.org', '@type': 'FurnitureStore', name: site.nome,
    description: site.seo.descricao, telephone: `+${site.telefone}`, sameAs: [site.instagram],
    ...(site.url ? { url: site.url, image: `${site.url.replace(/\/$/, '')}/og.jpg` } : {}),
    address: { '@type': 'PostalAddress', streetAddress: `${site.lojas[0].rua}, ${site.lojas[0].numero}`, addressLocality: site.cidade, addressRegion: site.estado, addressCountry: site.pais },
    areaServed: { '@type': 'Place', name: site.areaAtendida },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dados).replace(/</g, '\\u003c') }} />;
}
