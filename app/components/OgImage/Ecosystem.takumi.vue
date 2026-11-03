<script setup lang="ts">
import TeeMark from '../TeeMark.vue'

defineProps<{ count: number }>()
</script>

<template>
  <div data-theme="light" class="relative flex h-full w-full flex-col bg-canvas font-sans text-foreground">
    <div class="absolute left-[40px] top-0 h-full w-px bg-line" />
    <div class="absolute right-[40px] top-0 h-full w-px bg-line" />
    <div class="flex h-[104px] shrink-0 items-center justify-between border-b border-line px-[88px]">
      <div class="flex items-center gap-2"><TeeMark :width="44" :height="44" class="text-accent" /><div class="text-[28px] font-semibold tracking-[-0.045em]">TeeFrame</div></div>
      <div class="font-mono text-[12px] tracking-[0.1em] text-muted">SERVER FRAMEWORK</div>
    </div>
    <div class="flex flex-1 items-center justify-between gap-10 px-[88px]">
      <div class="flex flex-col">
        <div class="mb-5 font-mono text-[12px] tracking-[0.1em] text-muted">COMMUNITY DIRECTORY</div>
        <div class="flex flex-col text-[64px] leading-[1.1] font-medium tracking-[-0.05em]">
          <div>The Teeworlds ecosystem.</div>
          <div class="text-accent">Explore. Build. Play.</div>
        </div>
        <div class="mt-6 max-w-[600px] text-[21px] leading-[34px] text-muted">Big ideas start with a few good tools. Explore the projects, libraries, and mods built by the Teeworlds community (0.6 Only).</div>
      </div>
      <div class="flex h-[208px] w-[208px] shrink-0 flex-col items-center justify-center rounded-md border border-accent/25 bg-surface" style="background-image: linear-gradient(#166aaf13 1px, transparent 1px), linear-gradient(90deg, #166aaf13 1px, transparent 1px); background-size: 26px 26px">
        <div class="text-[76px] leading-none font-medium tracking-[-0.06em] text-accent">{{ count }}</div>
        <div class="mt-4 font-mono text-[12px] tracking-[0.1em] text-muted">RESOURCES</div>
      </div>
    </div>
    <div class="flex h-[84px] shrink-0 items-center justify-between border-t border-line px-[88px]">
        <div class="flex items-center gap-5 font-mono text-[12px] tracking-[0.08em] text-muted">
          <div>PHP 8.5</div>
          <div class="text-accent/40">/</div>
          <div>COMPOSER</div>
          <div class="text-accent/40">/</div>
          <div>SWOOLE</div>
        </div>
      <div class="font-mono text-[15px] text-accent">teeframe.com/ecosystem</div>
    </div>
  </div>
</template>
