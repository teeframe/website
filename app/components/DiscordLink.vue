<script setup lang="ts">
defineProps<{
  to: string
}>()
</script>

<template>
  <ULink raw :to="to" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5" aria-label="TeeFrame on Discord">
    <UIcon name="i-simple-icons-discord" class="size-3.5" />
  </ULink>
</template>
