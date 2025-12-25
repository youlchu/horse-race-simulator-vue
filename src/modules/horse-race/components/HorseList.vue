<script setup lang="ts">
import { mockHorses } from "../_mocks/horses";
</script>

<template>
  <BaseTable :data="mockHorses">
    <BaseColumn dataKey="name" label="horse Name" width="40%" align="left" />
    <BaseColumn dataKey="condition" label="" width="10%" align="center" />
    <BaseColumn
      dataKey="color"
      label="Color"
      width="30%"
      align="center"
      :cellRenderer="
        ({ row }: { row: { color: string } }) =>
          `<div class='inline-flex'>
            <span class='w-6 h-6 rounded' style='background-color: ${row.color}'></span>
          </div>`
      "
    />
  </BaseTable>
</template>
