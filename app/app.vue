<script setup lang="ts">
import { defineOgImage } from '#og-image/app'
import { siteDescription } from '#shared/site'

defineOgImage('TeeFrame.takumi', { description: siteDescription }, {
  alt: 'TeeFrame. Stop rebasing. Build your mod. The tee wearing a hard hat and carrying a hammer on a light blueprint grid.',
})

const menuOpen = ref(false)
const copiedStep = ref<string | null>(null)
const toast = useToast()
let clipboardToastId: string | number | undefined
let feedbackTimer: ReturnType<typeof setTimeout> | undefined

const links = {
  skeleton: 'https://github.com/teeframe/skeleton',
  framework: 'https://github.com/teeframe/framework',
  protocol: 'https://protocol-docs.teeframe.com/',
  maps: 'https://map-docs.teeframe.com/',
  discord: 'https://discord.gg/sxmBrFP8J4',
}

const steps = [
  { id: 'clone', number: '02', title: 'Clone the skeleton', commands: ['git clone https://github.com/teeframe/teeframe.git', 'cd teeframe'] },
  { id: 'install', number: '03', title: 'Install dependencies', commands: ['composer install'] },
  { id: 'run', number: '04', title: 'Start the server', commands: ['php server.php'] },
]

const docs = [
  {
    title: 'Protocol documentation', href: links.protocol, icon: 'i-lucide-code',
    description: 'How the Teeworlds client and server communicate.',
    topics: ['Packet structure and encoding', 'System and game messages', 'Snapshots and delta compression'],
    action: 'Read protocol docs', label: 'NETWORK PROTOCOL',
  },
  {
    title: 'Map documentation', href: links.maps, icon: 'i-lucide-layers',
    description: 'How Teeworlds maps are stored and loaded.',
    topics: ['Datafile structure and map items', 'Layers and envelopes', 'Game tiles and collision'],
    action: 'Read map docs', label: 'MAP FORMAT',
  },
]

async function copyCommands(step: typeof steps[number]) {
  clearTimeout(feedbackTimer)
  let title = 'Commands copied.'
  try {
    await navigator.clipboard.writeText(step.commands.join('\n'))
    copiedStep.value = step.id
  } catch {
    copiedStep.value = null
    title = 'Clipboard unavailable. Select the commands to copy them.'
  }
  if (clipboardToastId !== undefined) {
    toast.remove(clipboardToastId)
  }
  clipboardToastId = toast.add({ title, close: false, progress: false, duration: 3500 }).id
  feedbackTimer = setTimeout(() => {
    copiedStep.value = null
  }, 3500)
}

onUnmounted(() => clearTimeout(feedbackTimer))
</script>

<template>
  <UApp :toaster="{ position: 'bottom-right', duration: 3500 }">
  <div class="relative min-h-screen bg-canvas text-foreground">
    <ULink raw to="#main" external class="fixed top-3 left-3 z-50 -translate-y-24 rounded bg-accent px-3 py-2 text-sm text-white focus:translate-y-0">Skip to content</ULink>
    <div class="page-lines" aria-hidden="true"><span class="rail rail-left" /><span class="rail rail-right" /></div>

    <header class="site-header sticky top-0 z-40" @keydown.esc="menuOpen = false">
      <div class="frame relative mx-auto px-4 sm:px-7 flex h-16 items-center justify-between gap-5">
        <ULink raw to="#" external class="flex items-center gap-2" aria-label="TeeFrame home" @click="menuOpen = false">
          <TeeMark class="h-8 w-8 text-accent" />
          <span class="text-lg font-semibold tracking-[-0.045em]">TeeFrame</span>
        </ULink>
        <nav aria-label="Main navigation" class="hidden items-center gap-4 text-[13px] md:flex">
          <ULink raw to="#documentation" external class="transition-colors hover:text-accent text-accent">Documentation</ULink>
          <ULink raw to="#about" external class="transition-colors hover:text-accent">The purpose</ULink>
          <ULink raw to="#framework" external class="transition-colors hover:text-accent">Framework</ULink>
          <ULink raw to="#features" external class="transition-colors hover:text-accent">Features</ULink>
        </nav>
        <div class="flex items-center gap-3">
          <DiscordLink :to="links.discord" class="transition-colors hover:text-accent" />
          <GithubLink :to="links.framework" class="transition-colors hover:text-accent" />
          <UButton to="#start" external label="Get started" trailing-icon="i-lucide-arrow-right" class="hidden sm:inline-flex" />
          <UButton color="neutral" variant="outline" square class="size-9 p-0 text-muted md:hidden" :icon="menuOpen ? 'i-lucide-x' : 'i-lucide-menu'" :aria-expanded="menuOpen" aria-controls="mobile-nav" :aria-label="menuOpen ? 'Close navigation' : 'Open navigation'" @click="menuOpen = !menuOpen" />
        </div>
      </div>
      <nav v-show="menuOpen" id="mobile-nav" aria-label="Mobile navigation" class="border-t border-line md:hidden">
        <div class="frame relative mx-auto px-4 sm:px-7 flex flex-col gap-4 py-5 text-[13px]">
          <ULink raw to="#documentation" external class="text-accent" @click="menuOpen = false">Documentation</ULink>
          <ULink raw to="#about" external class="transition-colors hover:text-accent" @click="menuOpen = false">The purpose</ULink>
          <ULink raw to="#framework" external class="transition-colors hover:text-accent" @click="menuOpen = false">Framework</ULink>
          <ULink raw to="#features" external class="transition-colors hover:text-accent" @click="menuOpen = false">Features</ULink>
          <ULink raw to="#start" external class="transition-colors hover:text-accent" @click="menuOpen = false">Get started</ULink>
        </div>
      </nav>
    </header>

    <main id="main">
      <section class="band" aria-labelledby="hero-title">
        <div class="hero-grid" aria-hidden="true" />
        <div class="frame relative mx-auto px-4 sm:px-7 grid grid-cols-1 items-center gap-8 py-12 md:grid-cols-[1.2fr_0.8fr] md:gap-10">
          <div>
            <p class="font-mono text-[10px] tracking-[0.08em] text-muted mb-5">PHP FRAMEWORK / TEEWORLDS 0.6</p>
            <h1 id="hero-title" class="text-[clamp(2.125rem,4.5vw,3.25rem)] leading-[1.1] font-medium tracking-[-0.05em]">Stop rebasing.<br /><span class="text-accent">Build your mod.</span></h1>
            <p class="mt-5 max-w-[410px] text-sm leading-7 text-muted">{{ siteDescription }}</p>
            <div class="mt-6 flex flex-wrap gap-2.5">
              <UButton to="#documentation" external label="Read the documentation" icon="i-lucide-book-open" />
              <UButton to="#start" external label="Get started" color="neutral" variant="outline" trailing-icon="i-lucide-arrow-right" />
            </div>
          </div>
          <BlueprintScene class="mx-auto w-full max-w-[310px]" />
        </div>
      </section>

      <section id="documentation" class="band" aria-labelledby="docs-title">
        <div class="frame relative mx-auto px-4 sm:px-7 py-10 sm:py-12">
          <div class="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p class="font-mono text-[10px] tracking-[0.08em] text-muted mb-3">01 / DOCUMENTATION</p>
              <h2 id="docs-title" class="text-[clamp(1.375rem,2.5vw,1.625rem)] leading-[1.25] font-medium tracking-[-0.035em]">Protocol and map references.</h2>
            </div>
          </div>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ULink raw v-for="doc in docs" :key="doc.href" :to="doc.href" class="doc-card group relative block rounded-md">
              <UCard class="doc-card-panel h-full">
              <div class="mb-4 flex items-center justify-between">
                <span class="flex items-center gap-2.5"><UIcon :name="doc.icon" class="h-4 w-4 text-accent" /><span class="font-mono text-[9px] tracking-[0.08em] text-muted">{{ doc.label }}</span></span>
                <UIcon name="i-lucide-arrow-up-right" class="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <h3 class="text-base font-medium tracking-[-0.025em]">{{ doc.title }}</h3>
              <p class="mt-2 text-[13px] leading-6 text-muted">{{ doc.description }}</p>
              <ul class="mt-4 space-y-2 text-xs text-muted">
                <li v-for="(topic, index) in doc.topics" :key="topic" class="flex gap-3"><span class="font-mono text-[10px] text-accent/65">0{{ index + 1 }}</span>{{ topic }}</li>
              </ul>
              <span class="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-accent">{{ doc.action }} <UIcon name="i-lucide-arrow-right" class="h-3.5 w-3.5" /></span>
              </UCard>
            </ULink>
          </div>
        </div>
      </section>

      <section id="about" class="band" aria-labelledby="about-title">
        <div class="frame relative mx-auto px-4 sm:px-7 grid grid-cols-1 gap-7 py-10 sm:py-12 md:grid-cols-[0.85fr_1.15fr] md:gap-12">
          <div>
            <p class="font-mono text-[10px] tracking-[0.08em] text-muted mb-3">02 / THE PURPOSE</p>
            <h2 id="about-title" class="text-[clamp(1.375rem,2.5vw,1.625rem)] leading-[1.25] font-medium tracking-[-0.035em]">Mods deserve their own project.</h2>
          </div>
          <div class="space-y-3 text-sm leading-7 text-muted">
            <p>TeeFrame is a PHP framework for building Teeworlds 0.6 game servers. It provides the networking, physics, snapshots, and map handling, so you can focus on building your mod instead of maintaining a fork.</p>
            <p>When your mod lives inside a fork, keeping it up to date means merging upstream commits, resolving conflicts, and checking how the changes affect your own code. Maintaining the fork becomes part of maintaining the game.</p>
            <p>TeeFrame exists to separate those responsibilities. Your mod lives in its own project, while the engine is installed through Composer. Update the framework as a dependency instead of repeatedly rebasing for every new change upstream.</p>
          </div>
        </div>
      </section>

      <section id="framework" class="band" aria-labelledby="framework-title">
        <div class="frame relative mx-auto px-4 sm:px-7 grid grid-cols-1 gap-7 py-10 sm:py-12 md:grid-cols-2 md:items-center md:gap-12">
          <div>
            <p class="font-mono text-[10px] tracking-[0.08em] text-muted mb-3">03 / FRAMEWORK</p>
            <h2 id="framework-title" class="text-[clamp(1.375rem,2.5vw,1.625rem)] leading-[1.25] font-medium tracking-[-0.035em]">Your mod isn't a full-game fork.</h2>
            <p class="mt-4 text-sm leading-7 text-muted">Write your controllers, entities, and commands in the skeleton. The engine stays in <code class="rounded-sm bg-surface px-1 font-mono text-[11px] text-accent">vendor/</code>, managed by Composer.</p>
            <p class="mt-3 text-[13px] leading-6 text-muted">Update the framework without merging engine commits into your game code.</p>
            <ULink raw :to="links.framework" class="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-accent" target="_blank" rel="noopener noreferrer">Browse the framework <UIcon name="i-lucide-arrow-up-right" class="h-3.5 w-3.5" /></ULink>
          </div>
          <UCard class="project-diagram min-w-0" :ui="{ body: 'p-0 sm:p-0' }">
            <template #header>
              <div class="flex items-center justify-between"><span class="font-mono text-[11px] text-muted">teeframe/</span><span class="font-mono text-[9px] tracking-[0.08em] text-muted">PROJECT STRUCTURE</span></div>
            </template>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              <div class="p-4 sm:border-r sm:border-line md:border-r-0 lg:border-r">
                <UBadge label="YOUR MOD" size="xs" variant="subtle" />
                <div class="mt-3 space-y-2 font-mono text-[11px] text-muted"><p class="text-foreground">app/</p><p class="pl-3">GameController.php</p><p class="pl-3">World.php</p><p class="text-foreground">server.php</p></div>
              </div>
              <div class="border-t border-line bg-surface p-4 sm:border-t-0 md:border-t lg:border-t-0">
                <UBadge label="THE ENGINE" size="xs" variant="subtle" />
                <div class="mt-3 space-y-2 font-mono text-[11px] text-muted"><p class="text-foreground">vendor/teeframe/framework/</p><p class="pl-3">game/</p><p class="pl-3">network/</p><p class="pl-3">server/</p></div>
              </div>
            </div>
            <template #footer>
              <p class="mb-1.5 font-mono text-[10px] text-muted">UPDATE THE ENGINE</p><pre class="overflow-x-auto font-mono text-[11px] leading-6 text-accent" tabindex="0" aria-label="Composer command to update the framework"><code>composer update teeframe/framework</code></pre>
            </template>
          </UCard>
        </div>
      </section>

      <section id="features" class="band" aria-labelledby="features-title">
        <div class="frame relative mx-auto px-4 sm:px-7 py-10 sm:py-12">
          <div class="mb-6">
            <p class="font-mono text-[10px] tracking-[0.08em] text-muted mb-3">04 / FEATURES</p>
            <h2 id="features-title" class="text-[clamp(1.375rem,2.5vw,1.625rem)] leading-[1.25] font-medium tracking-[-0.035em]">What's in the engine.</h2>
          </div>
          <FeaturesGrid />
        </div>
      </section>

      <section id="start" class="band" aria-labelledby="start-title">
        <div class="frame relative mx-auto px-4 sm:px-7 grid grid-cols-1 gap-7 py-10 sm:py-12 md:grid-cols-[0.85fr_1.15fr] md:gap-12">
          <div>
            <p class="font-mono text-[10px] tracking-[0.08em] text-muted mb-3">05 / GET STARTED</p>
            <h2 id="start-title" class="text-[clamp(1.375rem,2.5vw,1.625rem)] leading-[1.25] font-medium tracking-[-0.035em]">Run your first server.</h2>
            <p class="mt-4 max-w-[325px] text-[13px] leading-6 text-muted">The skeleton includes a deathmatch world. Start it locally, then change the game logic in <code class="rounded-sm bg-surface px-1 font-mono text-[11px] text-accent">app/</code>.</p>
            <ULink raw :to="links.skeleton" class="mt-3 inline-flex items-center gap-2 text-[13px] text-accent" target="_blank" rel="noopener noreferrer">Browse the skeleton <UIcon name="i-lucide-arrow-up-right" class="h-3 w-3" /></ULink>
          </div>
          <div class="min-w-0 space-y-4">
            <div>
              <h3 class="mb-2 flex items-center gap-2.5 text-xs font-medium"><span class="font-mono text-[10px] font-normal text-accent">01</span>Install system dependencies</h3>
              <div class="flex flex-wrap items-start justify-between gap-3">
                <div class="flex min-w-min flex-1 flex-wrap gap-2" role="group" aria-label="Requirements">
                  <UBadge v-for="requirement in ['PHP 8.5', 'Composer', 'Swoole Extension']" :key="requirement" :label="requirement" color="primary" variant="subtle" />
                </div>
                <InstallationGuide />
              </div>
            </div>
            <div v-for="step in steps" :key="step.id">
              <h3 class="mb-2 flex items-center gap-2.5 text-xs font-medium"><span class="font-mono text-[10px] font-normal text-accent">{{ step.number }}</span>{{ step.title }}</h3>
              <div class="relative rounded border border-line bg-white">
                <pre class="overflow-x-auto px-3 py-2.5 pr-12 font-mono text-[11px] leading-6" tabindex="0" :aria-label="step.title + ' commands'"><code><span v-for="command in step.commands" :key="command" class="block"><span class="mr-2 select-none text-accent/60" aria-hidden="true">$</span>{{ command }}</span></code></pre>
                <UButton color="neutral" variant="ghost" size="xs" square class="absolute top-1.5 right-1.5 size-8 p-0" :icon="copiedStep === step.id ? 'i-lucide-check' : 'i-lucide-copy'" :aria-label="copiedStep === step.id ? 'Commands copied' : 'Copy ' + step.title.toLowerCase() + ' commands'" @click="copyCommands(step)" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="band">
      <div class="frame relative mx-auto px-4 sm:px-7 flex flex-col justify-between gap-4 py-6 sm:flex-row sm:items-center">
        <div class="space-y-2">
          <div class="flex items-center gap-3"><span class="text-[13px] font-medium tracking-[-0.025em]">TeeFrame</span><span class="text-[11px] text-muted">© {{ new Date().getFullYear() }} · MIT</span></div>
          <p class="flex items-center gap-1 text-xs text-muted"><span>Created with</span><UIcon name="i-lucide-heart" class="h-3.5 w-3.5 text-rose-500 [&_path]:fill-current" /><span class="sr-only">love</span><span>by</span><ULink raw to="https://github.com/miguilimzero" target="_blank" rel="noopener noreferrer" class="hover:text-accent">Miguilim</ULink></p>
        </div>
        <nav aria-label="Footer navigation" class="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
            <ULink raw :to="links.protocol" class="hover:text-accent">Protocol docs</ULink>
            <ULink raw :to="links.maps" class="hover:text-accent">Map docs</ULink>
            <DiscordLink :to="links.discord" class="hover:text-accent" />
            <GithubLink :to="links.framework" class="hover:text-accent" />
        </nav>
      </div>
    </footer>

  </div>
  </UApp>
</template>
