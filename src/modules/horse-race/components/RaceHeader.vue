<script setup lang="ts">
defineEmits(["generate", "start-pause"]);
</script>

<template>
  <header
    class="flex items-center justify-between p-4 border border-slate-800 rounded mb-4 shadow-sm"
  >
    <div class="flex items-center gap-4">
      <router-link
        to="/"
        class="flex items-center justify-center p-2 rounded-full hover:bg-slate-800 transition-colors group"
        title="Back to Menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-slate-400 group-hover:text-orange-500 transition-colors"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </router-link>

      <div class="text-xl uppercase">Horse Racing</div>
    </div>

    <div class="flex gap-4">
      <BaseButton variant="secondary" @click="$emit('generate')"> Generate Program </BaseButton>

      <BaseButton variant="primary" @click="$emit('start-pause')"> Start / Pause </BaseButton>
    </div>
  </header>
</template>
