import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Guide Clinique Paro-Ortho Tunisie',
    short_name: 'Guide ParoOrtho',
    description: 'Application d\'évaluation clinique basée sur la thèse de Ounally Z. & Dalloul I. (2026). Comparaison des aligneurs transparents et systèmes multi-attachés.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFAF8',
    theme_color: '#041E4D',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
