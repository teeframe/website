
import { env } from 'node:process'
import { siteDescription as description } from './shared/site'

const siteUrl = (env.NUXT_PUBLIC_SITE_URL || 'https://teeframe.com').replace(/\/+$/, '')


export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxt/fonts', '@nuxt/ui', 'nuxt-og-image'],
  site: {
    url: siteUrl,
    name: 'TeeFrame',
    description,
  },
  ogImage: {
    zeroRuntime: true,
    defaults: {
      width: 1200,
      height: 630,
      extension: 'png',
      emojis: false,
    },
  },
  nitro: {
    prerender: {
      routes: ['/'],
    },
  },
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
      { name: 'Geist', global: true },
      { name: 'Geist Mono', global: true },
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
        { name: 'twitter:description', content: description },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/favicon.png' },
        { rel: 'canonical', href: `${siteUrl}/` },
      ],
    },
  },
})
