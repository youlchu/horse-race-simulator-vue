<script setup lang="ts">
import Hippodrome from "../components/Hippodrome.vue";
import HorseList from "../components/HorseList.vue";
import StatusPanel from "../components/StatusPanel.vue";
import HorseRaceLayout from "../layouts/HorseRaceLayout.vue";
</script>

<template>
  <HorseRaceLayout>
    <template #left>
      <HorseList />
    </template>

    <template #center>
      <Hippodrome />
    </template>

    <template #right>
      <StatusPanel />
    </template>
  </HorseRaceLayout>
</template>
