<script setup lang="ts" generic="T = Record<string, unknown>">
import type { ColumnProps } from "./types";

const props = withDefaults(defineProps<ColumnProps<T>>(), {
  align: "left",
});

const registerColumn = inject<(_column: ColumnProps<T>) => void>("registerColumn");
const unregisterColumn = inject<(_dataKey: string) => void>("unregisterColumn");
const updateColumn = inject<(_dataKey: string, _column: ColumnProps<T>) => void>("updateColumn");

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
