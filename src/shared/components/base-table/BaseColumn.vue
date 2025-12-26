<script setup lang="ts">
import type { ColumnProps } from "./types";

const props = withDefaults(defineProps<ColumnProps>(), {
  align: "left",
});

const registerColumn = inject<(column: ColumnProps) => void>("registerColumn");
const unregisterColumn = inject<(dataKey: string) => void>("unregisterColumn");
const updateColumn = inject<(dataKey: string, column: ColumnProps) => void>("updateColumn");

onMounted(() => {
  if (registerColumn) {
    registerColumn({
      dataKey: props.dataKey,
      label: props.label,
      width: props.width,
      align: props.align,
      cellRenderer: props.cellRenderer,
    });
  }
});

watch([() => props.label, () => props.width, () => props.align], () => {
  if (updateColumn) {
    updateColumn(props.dataKey, {
      dataKey: props.dataKey,
      label: props.label,
      width: props.width,
      align: props.align,
      cellRenderer: props.cellRenderer,
    });
  }
});

onBeforeUnmount(() => {
  if (unregisterColumn) {
    unregisterColumn(props.dataKey);
  }
});
</script>

<template>
  <!-- This component doesn't render anything -->
</template>
