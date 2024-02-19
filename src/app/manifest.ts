import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Agência de Viagens Online com Descontos HOJE | Decolar',
    short_name: 'Decolar',
    description: 'Planeje sua viagem com a Decolar, a maior agência de viagens online do Brasil. Monte o seu pacote de viagem e tire todas as suas dúvidas conosco!',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}