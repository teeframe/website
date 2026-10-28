<script setup lang="ts">
const props = defineProps<{
  to: string
  stars: number | null
}>()

const formattedStars = computed(() => props.stars === null
  ? ''
  : new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(props.stars))
</script>

<template>
  <ULink raw :to="to" target="_blank" rel="noopener noreferrer" class="github-link inline-flex items-center gap-1.5" :aria-label="stars === null ? 'TeeFrame on GitHub' : `TeeFrame on GitHub, ${stars} stars`">
    <UIcon name="i-simple-icons-github" class="size-3.5" />
    <span v-if="stars !== null" class="github-stars inline-flex items-center font-mono text-[13px] tabular-nums" :title="`${stars} GitHub stars`">
      {{ formattedStars }}
    </span>
  </ULink>
</template>
