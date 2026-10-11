import type { CSSProperties } from 'react';
import type { ImagemFonte, Recorte } from '../../config/imagens';

interface Props { fonte: ImagemFonte; alt: string; className?: string; recorte?: Recorte; eager?: boolean }
export function Imagem({ fonte, alt, className = '', recorte, eager = false }: Props) {
  const corte: CSSProperties | undefined = recorte ? {
    width: `${fonte.width / recorte.width * 100}%`, maxWidth: 'none',
    left: `${-recorte.x / recorte.width * 100}%`, top: `${-recorte.y / recorte.height * 100}%`,
  } : undefined;
  const picture = <picture>
    <source srcSet={fonte.avif} type="image/avif" />
    <img src={fonte.webp} width={fonte.width} height={fonte.height} alt={alt}
      loading={eager ? 'eager' : 'lazy'} decoding="async" draggable={false} style={corte} />
  </picture>;
  return recorte ? <div className={`imagem-recorte ${className}`} style={{ aspectRatio: `${recorte.width}/${recorte.height}` }}>{picture}</div>
    : <div className={`imagem ${className}`}>{picture}</div>;
}
