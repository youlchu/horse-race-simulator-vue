<script setup lang="ts">
import RaceHeader from "../components/RaceHeader.vue";
</script>

<template>
  <div class="race-layout bg-[#0f172a] h-screen text-slate-200 overflow-hidden p-4 flex flex-col">
    <RaceHeader @generate="$emit('generate')" @start-pause="$emit('start-pause')" />

    <div class="grid grid-cols-12 gap-4 flex-1 overflow-hidden">
      <aside class="col-span-2 border border-slate-800 rounded">
        <slot name="left" />
      </aside>

      <main class="col-span-7 border border-slate-800 rounded">
        <slot name="center" />
      </main>

      <aside class="col-span-3 border border-slate-800 rounded">
        <slot name="right" />
      </aside>
    </div>
  </div>
</template>
