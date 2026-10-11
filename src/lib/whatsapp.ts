import { site } from '../config/site';
export function whatsapp(mensagem: string = site.mensagens.geral): string {
  return `https://wa.me/${site.telefone}?text=${encodeURIComponent(mensagem)}`;
}
