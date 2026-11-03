<script setup lang="ts">
import { defineOgImage } from '#og-image/app'
import {
  ecosystemCategories,
  ecosystemEntries,
  ecosystemLanguages,
  type EcosystemCategory,
  type EcosystemLanguage,
  type EcosystemStatus,
} from '#shared/ecosystem'

const description = 'Discover community-built projects, tools, libraries, clients, and mods for Teeworlds and DDraceNetwork. Find your next building block in the TeeFrame ecosystem directory.'
const site = useSiteConfig()
const canonical = new URL('/ecosystem', site.url).href

useSeoMeta({
  title: 'Ecosystem | TeeFrame',
  description,
  ogTitle: 'The Teeworlds ecosystem | TeeFrame',
  ogDescription: description,
  ogUrl: canonical,
  twitterTitle: 'The Teeworlds ecosystem | TeeFrame',
  twitterDescription: description,
})
useHead({ link: [{ rel: 'canonical', href: canonical }] })
defineOgImage('Ecosystem.takumi', { count: ecosystemEntries.length }, {
  alt: 'The Teeworlds ecosystem. Explore. Build. Play. Community projects, tools, libraries, clients, and mods, curated by TeeFrame.',
})

const query = ref('')
const selectedCategory = ref<EcosystemCategory>('projects')
const selectedLanguage = ref<EcosystemLanguage | 'all'>('all')
const sort = ref('status')
const searchInput = useTemplateRef<HTMLInputElement>('searchInput')

const categories = ecosystemCategories.map(category => ({
  ...category,
  count: ecosystemEntries.filter(entry => entry.category === category.id).length,
}))
const categoryLabels = new Map(ecosystemCategories.map(category => [category.id, category.label]))
const statuses: Record<EcosystemStatus, { label: string; dotClass: string; order: number }> = {
  maintained: { label: 'Maintained', dotClass: 'bg-green-500', order: 0 },
  unclassified: { label: 'Unclassified', dotClass: 'bg-gray-400', order: 1 },
  abandoned: { label: 'Abandoned', dotClass: 'bg-red-500', order: 2 },
}
const languageIcons: Record<EcosystemLanguage, string> = {
  'Rust': 'i-simple-icons-rust',
  'Ruby': 'i-simple-icons-ruby',
  'Python': 'i-simple-icons-python',
  'JavaScript / TypeScript': 'i-simple-icons-typescript',
  'AngularJS': 'i-simple-icons-angular',
  'C#': 'i-lucide-code-xml',
  'C': 'i-simple-icons-c',
}
const heroIcons = [
  'i-lucide-map',
  'i-simple-icons-rust',
  'i-lucide-wrench',
  'i-lucide-code',
  'i-simple-icons-python',
  'i-lucide-blocks',
  'i-lucide-monitor',
]

const hasFilters = computed(() => query.value.trim() !== '' || selectedLanguage.value !== 'all')
const filteredEntries = computed(() => {
  const terms = query.value.toLowerCase().trim().split(/\s+/).filter(Boolean)
  const entries = ecosystemEntries.filter(entry => {
    if (entry.category !== selectedCategory.value) return false
    if (selectedLanguage.value !== 'all' && entry.language !== selectedLanguage.value) return false
    const searchable = [entry.name, entry.description, categoryLabels.get(entry.category), entry.language].join(' ').toLowerCase()
    return terms.every(term => searchable.includes(term))
  })

  if (sort.value === 'status') {
    entries.sort((a, b) => statuses[a.status].order - statuses[b.status].order)
  } else {
    entries.sort((a, b) => a.name.localeCompare(b.name, 'en') * (sort.value === 'name-desc' ? -1 : 1))
  }
  return entries
})

function selectCategory(category: EcosystemCategory) {
  selectedCategory.value = category
  selectedLanguage.value = 'all'
}

function clearFilters() {
  query.value = ''
  selectedLanguage.value = 'all'
  searchInput.value?.focus()
}

defineShortcuts({
  ctrl_k: (event) => {
    event?.preventDefault()
    searchInput.value?.focus()
  },
})
</script>

<template>
  <main id="main">
    <section class="band ecosystem-hero" aria-labelledby="ecosystem-title">
      <div class="hero-grid" aria-hidden="true" />
      <div class="frame relative mx-auto px-4 pt-10 pb-8 sm:px-7 sm:pt-14 sm:pb-10">
        <div class="ecosystem-icon-ribbon mb-7 flex items-center justify-center gap-2.5 sm:gap-4" aria-hidden="true">
          <span v-for="(icon, index) in heroIcons" :key="icon" class="ecosystem-icon-tile flex size-10 items-center justify-center rounded-md border border-accent/15 bg-white text-accent sm:size-12" :class="{ 'hidden sm:flex': index === 0 || index === heroIcons.length - 1 }">
            <UIcon :name="icon" class="size-5 sm:size-6" />
          </span>
        </div>
        <div class="relative mx-auto max-w-2xl text-center">
          <p class="mb-4 font-mono text-[10px] tracking-[0.12em] text-muted">COMMUNITY DIRECTORY</p>
          <h1 id="ecosystem-title" class="text-[clamp(2.125rem,5vw,3.5rem)] leading-[1.08] font-medium tracking-[-0.055em]">The Teeworlds ecosystem.<br /><span class="text-accent">Explore. Build. Play.</span></h1>
          <p class="mx-auto mt-5 max-w-[490px] text-sm leading-7 text-muted">Big ideas start with a few good tools. Explore the projects, libraries, and mods built by the Teeworlds community (0.6 Only).</p>
        </div>

        <div class="mx-auto mt-9 max-w-[750px]">
          <div class="flex flex-col gap-2.5 sm:flex-row">
            <div class="ecosystem-search relative flex min-w-0 flex-1 items-center rounded border border-line bg-white transition-colors focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/10" role="search">
              <label for="ecosystem-search" class="sr-only">Search ecosystem resources</label>
              <UIcon name="i-lucide-search" class="pointer-events-none absolute left-3.5 size-4 text-muted" />
              <input id="ecosystem-search" ref="searchInput" v-model="query" type="search" placeholder="Search projects, tools, libraries…" autocomplete="off" class="h-11 w-full min-w-0 rounded bg-transparent pr-16 pl-10 text-sm text-foreground placeholder:text-muted/80 focus:outline-none" aria-controls="ecosystem-results" aria-keyshortcuts="Control+k" @keydown.esc="query = ''" />
              <button v-if="query" type="button" class="absolute right-2 flex size-8 items-center justify-center rounded text-muted hover:bg-surface hover:text-accent" aria-label="Clear search" @click="query = ''; searchInput?.focus()"><UIcon name="i-lucide-x" class="size-4" /></button>
              <kbd v-else class="pointer-events-none absolute right-3 hidden h-5 items-center justify-center rounded-sm border border-line px-1 font-mono text-[9px] text-muted sm:flex" aria-hidden="true">Ctrl K</kbd>
            </div>
            <div class="relative shrink-0">
              <label for="ecosystem-sort" class="sr-only">Sort resources</label>
              <UIcon name="i-lucide-arrow-down-wide-narrow" class="pointer-events-none absolute top-3.5 left-3 size-4 text-muted" />
              <select id="ecosystem-sort" v-model="sort" class="h-11 w-full appearance-none rounded border border-line bg-white pr-9 pl-9 text-xs text-foreground focus:border-accent focus:outline-2 focus:outline-offset-2 focus:outline-accent sm:w-44">
                <option value="status">Status</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
              <UIcon name="i-lucide-chevron-down" class="pointer-events-none absolute top-4 right-3 size-3 text-muted" />
            </div>
          </div>
        </div>

        <div class="mx-auto mt-5 flex max-w-2xl flex-wrap justify-center gap-2" role="group" aria-label="Filter resources by category">
          <button v-for="category in categories" :key="category.id" type="button" class="ecosystem-filter inline-flex min-h-9 items-center gap-2 rounded border px-3 text-xs transition-colors" :class="selectedCategory === category.id ? 'border-accent/30 bg-accent/5 text-accent' : 'border-line bg-white text-muted'" :aria-pressed="selectedCategory === category.id" @click="selectCategory(category.id)">
            <UIcon :name="category.icon" class="size-3.5" /> {{ category.label }} <span class="font-mono text-[10px] opacity-65">{{ category.count }}</span>
          </button>
        </div>
        <div v-if="selectedCategory === 'libraries'" class="mt-4 flex flex-wrap items-center justify-center gap-1.5 border-t border-dashed border-line pt-4" role="group" aria-label="Filter libraries by language">
          <span class="mr-2 font-mono text-[9px] tracking-[0.08em] text-muted">LANGUAGE</span>
          <button type="button" class="ecosystem-subfilter" :class="{ 'is-selected': selectedLanguage === 'all' }" :aria-pressed="selectedLanguage === 'all'" @click="selectedLanguage = 'all'">All languages</button>
          <button v-for="language in ecosystemLanguages" :key="language" type="button" class="ecosystem-subfilter" :class="{ 'is-selected': selectedLanguage === language }" :aria-pressed="selectedLanguage === language" @click="selectedLanguage = language"><UIcon :name="languageIcons[language]" class="size-3.5" />{{ language }}</button>
        </div>
      </div>
    </section>

    <section class="band" aria-labelledby="directory-title">
      <div class="frame relative mx-auto px-4 py-7 sm:px-7 sm:py-9">
        <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 id="directory-title" class="text-sm font-medium tracking-[-0.025em]">{{ categoryLabels.get(selectedCategory) }}</h2>
            <p class="font-mono text-[10px] text-muted" role="status">{{ filteredEntries.length }} {{ filteredEntries.length === 1 ? 'resource' : 'resources' }}{{ hasFilters ? ' found' : ' to discover' }}</p>
          </div>
          <button v-if="hasFilters" type="button" class="inline-flex min-h-8 items-center gap-1.5 text-xs text-accent hover:underline" @click="clearFilters"><UIcon name="i-lucide-x" class="size-3.5" />Reset filters</button>
        </div>

        <div id="ecosystem-results" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article v-for="entry in filteredEntries" :key="entry.id" class="ecosystem-card feature-card group flex min-w-0 flex-col rounded-md border border-line bg-white p-5 transition-colors hover:border-accent/40 hover:bg-blueprint-50/50 focus-within:border-accent/40" :aria-labelledby="'resource-' + entry.id">
            <div class="mb-4 flex items-center justify-between gap-3">
              <span class="blueprint-board flex size-10 shrink-0 items-center justify-center rounded border border-accent/15 text-accent" aria-hidden="true"><UIcon :name="entry.icon" class="size-5" /></span>
              <span class="inline-flex items-center gap-1.5 rounded-sm border border-line bg-surface/70 px-2 py-1 font-mono text-[9px] text-muted">
                <span class="size-1.5 shrink-0 rounded-full" :class="statuses[entry.status].dotClass" aria-hidden="true" />
                {{ statuses[entry.status].label }}
              </span>
            </div>
            <h3 :id="'resource-' + entry.id" class="text-[15px] leading-6 font-medium tracking-[-0.025em] [overflow-wrap:anywhere]"><ULink raw :to="entry.url" target="_blank" rel="noopener noreferrer" class="transition-colors hover:text-accent">{{ entry.name }}<span class="sr-only"> (opens in a new tab)</span></ULink></h3>
            <p class="mt-2 mb-5 text-[13px] leading-6 text-muted">{{ entry.description }}</p>
            <div class="mt-auto flex items-center justify-between gap-3 border-t border-dashed border-line pt-3">
                <ULink raw :to="entry.url" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-7 items-center gap-1.5 text-xs font-medium text-accent" :aria-label="'Explore ' + entry.name + ' (opens in a new tab)'">Explore <UIcon name="i-lucide-arrow-up-right" class="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></ULink>

                <div class="flex items-center gap-2">
                    <ULink v-if="entry.repository && entry.repository !== entry.url" raw :to="entry.repository" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-7 items-center gap-1.5 rounded-sm px-1 text-[11px] text-muted transition-colors hover:text-accent" :aria-label="'View source for ' + entry.name + ' (opens in a new tab)'">
                        <UIcon name="i-lucide-git-branch" class="size-3.5" /> Source
                    </ULink>

                    <UTooltip v-if="entry.teeframe" text="Uses TeeFrame under the hood">
                        <span tabindex="0" class="ml-auto inline-flex min-h-7 shrink-0 items-center gap-1 text-[11px] font-medium text-green-700">
                            <UIcon name="i-lucide-badge-check" class="size-3.5 -translate-y-px" aria-hidden="true" />
                            TeeFrame
                        </span>
                    </UTooltip>
                </div>
            </div>
          </article>
        </div>
        <div v-if="filteredEntries.length === 0" class="blueprint-board flex flex-col items-center rounded-md border border-dashed border-accent/25 px-5 py-16 text-center">
          <span class="mb-4 flex size-12 items-center justify-center rounded-md border border-line bg-white text-accent"><UIcon name="i-lucide-search-x" class="size-5" /></span>
          <h3 class="text-base font-medium tracking-[-0.025em]">No resources found.</h3>
          <p class="mt-2 max-w-sm text-[13px] leading-6 text-muted">Try another search or clear your filters to explore this category.</p>
        </div>

        <div class="mt-8 flex flex-col justify-between gap-3 border-t border-dashed border-line pt-5 sm:flex-row sm:items-start">
          <p class="max-w-[530px] text-[11px] leading-5 text-muted">A community directory, not a compatibility list. These projects are independently maintained; check their documentation for supported versions and requirements.</p>
        </div>
      </div>
    </section>

    <section class="band bg-surface/50" aria-labelledby="community-title">
      <div class="frame relative mx-auto flex flex-col justify-between gap-5 px-4 py-8 sm:flex-row sm:items-center sm:px-7 sm:py-10">
        <div class="flex items-start gap-4">
          <span class="hidden size-11 shrink-0 items-center justify-center rounded border border-accent/20 bg-white text-accent sm:flex"><UIcon name="i-lucide-git-pull-request" class="size-5" /></span>
          <div><p class="mb-2 font-mono text-[9px] tracking-[0.08em] text-muted">BETTER TOGETHER</p><h2 id="community-title" class="text-lg font-medium tracking-[-0.035em]">Good tools deserve to be found.</h2><p class="mt-2 text-[13px] leading-6 text-muted">Know something the community should see? Help grow the list.</p></div>
        </div>
        <UButton to="https://github.com/teeframe/website" target="_blank" rel="noopener noreferrer" label="Contribute to the list" color="neutral" variant="outline" trailing-icon="i-lucide-arrow-up-right" class="self-start sm:self-center" />
      </div>
    </section>
  </main>
</template>

<style scoped>
.ecosystem-hero {
  background: radial-gradient(ellipse at 50% 0%, var(--color-blueprint-100), transparent 65%);
}

.ecosystem-icon-ribbon {
  position: relative;
}

.ecosystem-icon-ribbon::before {
  position: absolute;
  top: 50%;
  left: 12%;
  right: 12%;
  z-index: 0;
  border-top: 1px dashed var(--color-blueprint-200);
  content: '';
}

.ecosystem-icon-tile {
  position: relative;
  box-shadow: 0 3px 0 var(--color-blueprint-100);
}

.ecosystem-icon-tile:nth-child(2n) { transform: translateY(-5px); }
.ecosystem-icon-tile:first-child,
.ecosystem-icon-tile:last-child { opacity: .55; }

.ecosystem-filter:hover {
  border-color: var(--color-blueprint-300);
  color: var(--color-accent);
}

.ecosystem-subfilter {
  display: inline-flex;
  min-height: 32px;
  align-items: center;
  gap: 6px;
  padding: 5px 9px;
  border: 1px solid transparent;
  border-radius: 3px;
  color: var(--color-muted);
  font-size: 11px;
  transition: color 160ms ease, background-color 160ms ease, border-color 160ms ease;
}

.ecosystem-subfilter:hover,
.ecosystem-subfilter.is-selected {
  border-color: var(--color-blueprint-200);
  background: white;
  color: var(--color-accent);
}


.ecosystem-search input::-webkit-search-cancel-button { display: none; }
</style>
