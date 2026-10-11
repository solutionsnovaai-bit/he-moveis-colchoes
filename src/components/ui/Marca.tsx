import { imagens } from '../../config/imagens';
import { textos } from '../../content/textos';
import { Imagem } from './Imagem';
export function Marca({ className = '', decorativa = false, eager = false }: { className?: string; decorativa?: boolean; eager?: boolean }) {
  return <Imagem fonte={imagens.marca} recorte={imagens.marcaRecorte} alt={decorativa ? '' : textos.marcaAlt} className={`marca ${className}`} eager={eager} />;
}
