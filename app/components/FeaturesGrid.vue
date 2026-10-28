<script setup lang="ts">
const worlds = [
  { id: 'dm', label: 'DM', title: 'Deathmatch', map: 'dm1.map', number: '01' },
  { id: 'ctf', label: 'CTF', title: 'Capture the flag', map: 'ctf1.map', number: '02' },
  { id: 'custom', label: 'Custom', title: 'Your game mode', map: 'Your map', number: '03' },
] as const
const selectedWorld = ref<typeof worlds[number]>(worlds[0])
</script>

<template>
  <div class="features-grid grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
    <UCard class="feature-card sm:col-span-2 lg:col-span-4 lg:row-span-2" :ui="{ body: 'flex h-full flex-col' }">
      <div class="mb-4 flex items-center justify-between"><UIcon name="i-lucide-layers" class="size-5 text-accent" /><span class="eyebrow text-[9px]">MULTI-WORLD</span></div>
      <h3 class="text-base font-medium tracking-[-0.025em]">Multiple worlds. One server.</h3>
      <p class="mt-2 max-w-[420px] text-[13px] leading-6 text-muted">Run different maps and game modes together. Each world has its own controller, entities, and players.</p>
      <div class="world-schematic mt-auto pt-6">
        <div class="mx-auto flex w-fit items-center gap-2 rounded border border-accent/25 bg-surface px-4 py-2 font-mono text-[10px] text-accent"><UIcon name="i-lucide-box" class="size-3.5" /> TEEFRAME SERVER</div>
        <div class="world-connectors mx-auto h-8 w-[68%]" aria-hidden="true" />
        <div class="grid grid-cols-3 gap-2 sm:gap-3" role="group" aria-label="Example worlds">
          <UButton v-for="world in worlds" :key="world.id" color="neutral" variant="outline" :aria-pressed="selectedWorld.id === world.id" :aria-label="`Show ${world.title} world`" :class="selectedWorld.id === world.id ? 'border-accent/50 bg-surface' : 'bg-white'" :ui="{ base: 'world-button flex min-w-0 flex-col items-stretch justify-start gap-0 p-2 text-left sm:p-3' }" @click="selectedWorld = world">
            <span class="mb-2 font-mono text-[8px] font-normal tracking-wide text-muted">WORLD {{ world.number }}</span>
            <svg viewBox="0 0 140 65" fill="none" class="w-full text-accent/65" aria-hidden="true">
              <g stroke="currentColor" stroke-width="1.2" stroke-linejoin="round">
                <path v-if="world.id === 'dm'" d="M4 54h26V38h31v16h18V28h26v26h31M14 18h34m43-9h35" />
                <g v-else-if="world.id === 'ctf'"><path d="M4 54h27V39h20v15h38V39h20v15h27M32 38V13l16 6-16 6m76 13V13l-16 6 16 6M59 24h23" /></g>
                <path v-else d="M4 54h22V27h20v27h18V39h28v15h20V17h24M54 14h39" />
              </g>
              <path d="M4 60h132" stroke="currentColor" stroke-opacity=".3" stroke-dasharray="2 3" />
            </svg>
            <span class="mt-2 truncate text-[11px] font-medium">{{ world.label }}</span>
          </UButton>
        </div>
        <p class="world-caption mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] text-muted" aria-live="polite"><span class="text-accent">{{ selectedWorld.map }}</span><span aria-hidden="true">/</span>{{ selectedWorld.title }}</p>
      </div>
    </UCard>

    <UCard class="feature-card lg:col-span-2">
      <UIcon name="i-lucide-code" class="mb-4 size-5 text-accent" />
      <h3 class="text-base font-medium tracking-[-0.025em]">Custom game logic</h3>
      <p class="mt-2 text-[13px] leading-6 text-muted">Extend controllers, add entities, and register custom chat commands.</p>
       <p class="mt-4 font-mono text-[10px] text-accent">FULL MODULAR</p>
    </UCard>

    <UCard class="feature-card lg:col-span-2">
      <UIcon name="i-lucide-crosshair" class="mb-4 size-5 text-accent" />
      <h3 class="text-base font-medium tracking-[-0.025em]">Physics and snapshots</h3>
      <p class="mt-2 text-[13px] leading-6 text-muted">The engine handles character movement, weapons, and snapshots for the client.</p>
       <p class="mt-4 font-mono text-[10px] text-accent">WORRY FREE</p>
    </UCard>

    <UCard class="feature-card lg:col-span-3">
      <div class="flex items-start gap-4"><UIcon name="i-lucide-map" class="mt-0.5 size-5 shrink-0 text-accent" /><div><h3 class="text-base font-medium tracking-[-0.025em]">Maps and collision</h3><p class="mt-2 text-[13px] leading-6 text-muted">Load Teeworlds maps and use the game layer for collision, pickups, and spawn points.</p></div></div>
    </UCard>

    <UCard class="feature-card lg:col-span-3">
      <div class="flex items-start gap-4"><UIcon name="i-lucide-sliders-horizontal" class="mt-0.5 size-5 shrink-0 text-accent" /><div><h3 class="text-base font-medium tracking-[-0.025em]">Per-world tuning</h3><p class="mt-2 text-[13px] leading-6 text-muted">Set movement, gravity, hook, and weapon parameters separately for each world.</p></div></div>
    </UCard>
  </div>
</template>
