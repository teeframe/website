<script setup lang="ts">
const route = useRoute()
const menuOpen = ref(false)

const links = {
  framework: 'https://github.com/teeframe/framework',
  protocol: 'https://protocol-docs.teeframe.com/',
  maps: 'https://map-docs.teeframe.com/',
  discord: 'https://discord.gg/sxmBrFP8J4',
}

const navigation = [
  { label: 'Documentation', to: '/#documentation' },
  { label: 'The purpose', to: '/#about' },
  { label: 'Framework', to: '/#framework' },
  { label: 'Features', to: '/#features' },
  { label: 'Ecosystem', to: '/ecosystem' },
]

watch(() => route.fullPath, () => { menuOpen.value = false })
</script>

<template>
  <div id="top" class="relative min-h-screen bg-canvas text-foreground">
    <ULink raw to="#main" external class="fixed top-3 left-3 z-50 -translate-y-24 rounded bg-accent px-3 py-2 text-sm text-white focus:translate-y-0">Skip to content</ULink>
    <div class="page-lines" aria-hidden="true"><span class="rail rail-left" /><span class="rail rail-right" /></div>

    <header class="site-header sticky top-0 z-40" @keydown.esc="menuOpen = false">
      <div class="frame relative mx-auto flex h-16 items-center justify-between gap-5 px-4 sm:px-7">
        <ULink raw to="/#top" class="flex items-center gap-2" aria-label="TeeFrame home" @click="menuOpen = false">
          <TeeMark class="h-8 w-8 text-accent" />
          <span class="text-lg font-semibold tracking-[-0.045em]">TeeFrame</span>
        </ULink>
        <nav aria-label="Main navigation" class="hidden items-center gap-4 text-[13px] lg:flex">
          <ULink v-for="item in navigation" :key="item.to" raw :to="item.to" class="transition-colors hover:text-accent" :class="{ 'text-accent': route.path === '/ecosystem' && item.to === '/ecosystem', 'font-semibold' : item.to === '/ecosystem' }" :aria-current="route.path === item.to ? 'page' : undefined">{{ item.label }}</ULink>
        </nav>
        <div class="flex items-center gap-3">
          <DiscordLink :to="links.discord" class="transition-colors hover:text-accent" />
          <GithubLink :to="links.framework" class="transition-colors hover:text-accent" />
          <UButton to="/#start" label="Get started" trailing-icon="i-lucide-arrow-right" class="hidden lg:inline-flex" />
          <UButton color="neutral" variant="outline" square class="size-9 p-0 text-muted lg:hidden" :icon="menuOpen ? 'i-lucide-x' : 'i-lucide-menu'" :aria-expanded="menuOpen" aria-controls="mobile-nav" :aria-label="menuOpen ? 'Close navigation' : 'Open navigation'" @click="menuOpen = !menuOpen" />
        </div>
      </div>
      <nav v-show="menuOpen" id="mobile-nav" aria-label="Mobile navigation" class="border-t border-line lg:hidden">
        <div class="frame relative mx-auto flex flex-col gap-4 px-4 py-5 text-[13px] sm:px-7">
          <ULink v-for="item in navigation" :key="item.to" raw :to="item.to" class="transition-colors hover:text-accent" :class="{ 'text-accent': route.path === '/ecosystem' && item.to === '/ecosystem', 'font-semibold' : item.to === '/ecosystem' }" :aria-current="route.path === item.to ? 'page' : undefined" @click="menuOpen = false">{{ item.label }}</ULink>
          <ULink raw to="/#start" class="transition-colors hover:text-accent" @click="menuOpen = false">Get started</ULink>
        </div>
      </nav>
    </header>

    <slot />

    <footer class="band">
      <div class="frame relative mx-auto flex flex-col justify-between gap-4 px-4 py-6 sm:flex-row sm:items-center sm:px-7">
        <div class="space-y-2">
          <div class="flex items-center gap-3"><span class="text-[13px] font-medium tracking-[-0.025em]">TeeFrame</span><span class="text-[11px] text-muted">© {{ new Date().getFullYear() }} · MIT</span></div>
          <p class="flex items-center gap-1 text-xs text-muted"><span>Created with</span><UIcon name="i-lucide-heart" class="h-3.5 w-3.5 text-rose-500 [&_path]:fill-current" /><span class="sr-only">love</span><span>by</span><ULink raw to="https://github.com/miguilimzero" target="_blank" rel="noopener noreferrer" class="hover:text-accent">Miguilim</ULink></p>
        </div>
        <nav aria-label="Footer navigation" class="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
          <ULink raw :to="links.protocol" class="hover:text-accent">Protocol docs</ULink>
          <ULink raw :to="links.maps" class="hover:text-accent">Map docs</ULink>
          <ULink raw to="/ecosystem" class="hover:text-accent">Ecosystem</ULink>
          <DiscordLink :to="links.discord" class="hover:text-accent" />
          <GithubLink :to="links.framework" class="hover:text-accent" />
        </nav>
      </div>
    </footer>
  </div>
</template>
