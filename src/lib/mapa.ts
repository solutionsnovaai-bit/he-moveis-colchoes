import { site } from '../config/site';
export const enderecoMapa = `${site.lojas[0].rua}, ${site.lojas[0].numero}, ${site.bairro}, ${site.cidade}, ${site.estado}, Brasil`;
export const linkMapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enderecoMapa)}`;
export const mapaEmbed = `https://www.google.com/maps?q=${encodeURIComponent(enderecoMapa)}&output=embed`;
