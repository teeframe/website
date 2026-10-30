<script setup lang="ts">
const props = defineProps<{
  to: string
}>()

const repository = computed(() => {
  const match = /^https?:\/\/(?:www\.)?github\.com\/([^/?#]+)\/([^/?#]+?)(?:\.git)?\/?(?:[?#].*)?$/i.exec(props.to)
  return match ? `${match[1]}/${match[2]}` : null
})

const { data: githubRepository } = useFetch<{ stargazers_count: number }>(
  () => repository.value === null ? '' : `https://api.github.com/repos/${repository.value}`,
  {
    key: () => `github-stars:${repository.value}`,
    server: false,
    lazy: true,
    timeout: 5000,
    retry: 0,
    enabled: () => repository.value !== null,
  },
)

const stars = computed(() => {
  const count = githubRepository.value?.stargazers_count
  return typeof count === 'number' && Number.isSafeInteger(count) && count >= 0 ? count : null
})

const formattedStars = computed(() => stars.value === null
  ? '?'
  : new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(stars.value))
</script>

<template>
  <ULink raw :to="to" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5" :aria-label="stars === null ? 'TeeFrame on GitHub' : `TeeFrame on GitHub, ${stars} stars`">
    <UIcon name="i-simple-icons-github" class="size-3.5" />
    <span class="inline-flex items-center font-mono text-[13px] tabular-nums" :title="stars === null ? 'GitHub stars' : `${stars} GitHub stars`">
      {{ formattedStars }}
    </span>
  </ULink>
</template>
