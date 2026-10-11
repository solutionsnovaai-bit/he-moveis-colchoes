import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { site } from './src/config/site';

const escapar = (valor: string) => valor.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
function metadados(): Plugin {
  const url = site.url.replace(/\/$/, '');
  if (site.indexar && !/^https:\/\/[^/]+/.test(url)) throw new Error('Preencha site.url com o domínio HTTPS antes de ativar indexar.');
  const tags = [
    `<meta name="robots" content="${site.indexar ? 'index,follow' : 'noindex,nofollow'}">`,
    `<meta property="og:image" content="${escapar(url)}/og.jpg">`,
    ...(url ? [`<link rel="canonical" href="${escapar(url)}/">`, `<meta property="og:url" content="${escapar(url)}/">`] : []),
  ].join('\n    ');
  return {
    name: 'metadados-locais',
    transformIndexHtml(html) {
      return html.replaceAll('__TITULO__', escapar(site.seo.titulo)).replaceAll('__DESCRICAO__', escapar(site.seo.descricao)).replace('__META__', tags);
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n${site.indexar ? `Sitemap: ${url}/sitemap.xml\n` : ''}` });
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${site.indexar ? `<url><loc>${escapar(url)}/</loc></url>` : ''}</urlset>` });
      this.emitFile({ type: 'asset', fileName: 'manifest.webmanifest', source: JSON.stringify({ name: site.nome, short_name: site.nomeCurto, lang: 'pt-BR', start_url: '/', display: 'browser', background_color: '#f2efe9', theme_color: '#102f46', icons: [{ src: '/icones/icone-192-v1.png', sizes: '192x192', type: 'image/png' }, { src: '/icones/icone-512-v1.png', sizes: '512x512', type: 'image/png' }] }) });
    },
  };
}
export default defineConfig({ plugins: [react(), tailwindcss(), metadados()], build: { target: 'es2022' } });
