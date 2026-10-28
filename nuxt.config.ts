
import { env } from 'node:process'

const siteUrl = (env.NUXT_PUBLIC_SITE_URL || 'https://teeframe.com').replace(/\/+$/, '')
const description = 'A PHP framework for Teeworlds 0.6. Keep your mod separate from the engine and update through Composer instead of rebasing a server fork.'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxt/fonts', '@nuxt/ui'],
  ui: {
    fonts: false,
    colorMode: false,
    theme: {
      colors: ['primary', 'error'],
      defaultVariants: { size: 'sm' },
    },
  },
  icon: {
    mode: 'svg',
    clientBundle: {
      icons: [
        'lucide:arrow-right', 'lucide:arrow-up-right', 'lucide:book-open',
        'lucide:menu', 'lucide:x', 'lucide:code', 'lucide:layers',
        'lucide:copy', 'lucide:check', 'lucide:heart', 'lucide:star',
        'lucide:box', 'lucide:crosshair', 'lucide:map', 'lucide:sliders-horizontal',
        'simple-icons:github',
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  fonts: {
    provider: 'google',
    defaults: {
      weights: ['400 600'],
      styles: ['normal'],
      subsets: ['latin'],
    },
    families: [
      { name: 'Geist' },
      { name: 'Geist Mono' },
    ],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'TeeFrame | Build your mod. Skip the rebasing.',
      meta: [
        { name: 'theme-color', content: '#fcfdff' },
        { name: 'description', content: description },
        { property: 'og:title', content: 'TeeFrame | Build your mod. Skip the rebasing.' },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: `${siteUrl}/` },
        { property: 'og:image', content: `${siteUrl}/og-image.png` },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'TeeFrame. Build your mod. Skip the rebasing.' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'canonical', href: `${siteUrl}/` },
      ],
    },
  },
})
