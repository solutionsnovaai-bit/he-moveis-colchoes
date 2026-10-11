export interface ImagemFonte { avif: string; webp: string; width: number; height: number }
export interface Recorte { x: number; y: number; width: number; height: number }
export const mediaMobile = '(max-width: 767px)';
const fonte = (base: string, width: number, height: number): ImagemFonte => ({ avif: `${base}.avif`, webp: `${base}.webp`, width, height });
export const imagens = {
  heroDesktop: fonte('/hero/showroom-desktop-v2', 1672, 941),
  heroMobile: fonte('/hero/showroom-mobile-v2', 941, 1672),
  marca: fonte('/marca/marca-original-v1', 710, 1536),
  marcaRecorte: { x: 121, y: 426, width: 468, height: 468 },
  catalogo: fonte('/fotos/catalogo-original-v1', 1170, 2532),
  instagram: fonte('/fotos/instagram-original-v1', 710, 1536),
  sobre: null as ImagemFonte | null,
  galeria: [
    { id: 'colchao', fonte: 'catalogo', recorte: { x: 100, y: 1100, width: 298, height: 300 } },
    { id: 'fogao', fonte: 'catalogo', recorte: { x: 436, y: 1100, width: 296, height: 300 } },
    { id: 'mesa', fonte: 'catalogo', recorte: { x: 436, y: 1440, width: 296, height: 299 } },
    { id: 'armario', fonte: 'instagram', recorte: { x: 475, y: 1090, width: 235, height: 280 } },
    { id: 'eletros', fonte: 'instagram', recorte: { x: 0, y: 1062, width: 235, height: 308 } },
  ] as const,
};
