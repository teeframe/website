<script setup lang="ts">
import TeeMark from '../TeeMark.vue'

defineProps<{
  description: string
}>()
</script>

<template>
  <div data-theme="light" class="relative flex h-full w-full flex-col overflow-hidden bg-canvas font-sans text-foreground">
    <div class="absolute left-[40px] top-0 h-full w-px bg-[#bfd3e3]" />
    <div class="absolute right-[40px] top-0 h-full w-px bg-[#bfd3e3]" />

    <div v-for="top in [104, 546]" :key="top" class="absolute left-0 h-px w-full bg-[#bfd3e3]" :style="{ top: `${top}px` }">
      <div class="absolute right-[60px] top-0 h-[12px] w-[80px]" style="background-image: repeating-linear-gradient(-45deg, #146aaf40 0 1px, transparent 1px 6px)" />
      <div class="absolute left-[36px] -top-1 h-[9px] w-[9px]">
        <div class="absolute left-1 top-0 h-full w-px bg-[#4384b6]" />
        <div class="absolute left-0 top-1 h-px w-full bg-[#4384b6]" />
      </div>
      <div class="absolute right-[36px] -top-1 h-[9px] w-[9px]">
        <div class="absolute left-1 top-0 h-full w-px bg-[#4384b6]" />
        <div class="absolute left-0 top-1 h-px w-full bg-[#4384b6]" />
      </div>
    </div>

    <div class="relative flex h-[104px] shrink-0 items-center justify-between px-[88px]">
      <div class="flex items-center gap-2">
        <TeeMark :width="44" :height="44" class="shrink-0 text-accent" />
        <div class="text-[28px] font-semibold tracking-[-0.045em]">TeeFrame</div>
      </div>
      <div class="font-mono text-[12px] tracking-[0.08em] text-muted">SERVER FRAMEWORK</div>
    </div>

    <div class="relative flex h-[442px] shrink-0 items-center justify-between gap-[72px] px-[88px]">
      <div class="flex w-[598px] shrink-0 flex-col">
        <div class="mb-5 font-mono text-[12px] tracking-[0.08em] text-muted">PHP FRAMEWORK / TEEWORLDS 0.6</div>
        <div class="flex flex-col text-[74px] leading-[1.08] font-medium tracking-[-0.05em]">
          <div>Stop rebasing.</div>
          <div class="text-accent">Build your mod.</div>
        </div>
        <div class="mt-6 max-w-[570px] text-[22px] leading-[34px] text-muted">{{ description }}</div>
      </div>

      <div
        class="relative flex h-[352px] w-[354px] shrink-0 overflow-hidden rounded-md border border-accent/25 bg-blueprint-50"
        style="background-image: linear-gradient(#166aaf13 1px, transparent 1px), linear-gradient(90deg, #166aaf13 1px, transparent 1px), linear-gradient(#166aaf06 1px, transparent 1px), linear-gradient(90deg, #166aaf06 1px, transparent 1px); background-size: 64px 64px, 64px 64px, 16px 16px, 16px 16px; background-position: center"
      >
        <svg :width="354" :height="352" viewBox="0 0 354 352" fill="none" class="absolute left-0 top-0">
          <g stroke="#bfd3e3" stroke-width=".8">
            <circle cx="177" cy="164" r="136" />
            <circle cx="177" cy="164" r="106" stroke-dasharray="2 5" />
            <path d="M177 25v288M28 164h298" stroke-dasharray="3 5" />
            <path d="M35 67v221m-4-221h8m-8 221h8M63 311h230m-230-4v8m230-8v8" />
            <path d="M14 15h9m-4-4v9m312-5h9m-4-4v9M14 335h9m-4-4v9m312-5h9m-4-4v9" />
          </g>
        </svg>
        <TeeMark :width="320" :height="320" class="absolute left-[12px] top-0 text-accent" />
      </div>
    </div>

    <div class="relative flex h-[84px] shrink-0 items-center justify-between px-[88px]">
      <div class="flex items-center gap-5 font-mono text-[12px] tracking-[0.08em] text-muted">
        <div>PHP 8.5</div>
        <div class="text-accent/40">/</div>
        <div>COMPOSER</div>
        <div class="text-accent/40">/</div>
        <div>SWOOLE</div>
      </div>
      <div class="font-mono text-[15px] text-accent">teeframe.com</div>
    </div>
  </div>
</template>
