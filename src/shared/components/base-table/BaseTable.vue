<script setup lang="ts" generic="T = Record<string, unknown>">
import type { TableProps, TableColumn } from "./types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<TableProps<T>>();

const columns = ref<TableColumn<T>[]>([]);

const registerColumn = (column: TableColumn<T>) => {
  const existingIndex = columns.value.findIndex((col) => col.dataKey === column.dataKey);
  if (existingIndex === -1) {
    columns.value.push(column);
  }
};

const updateColumn = (dataKey: string, updatedColumn: TableColumn<T>) => {
  const index = columns.value.findIndex((col) => col.dataKey === dataKey);
  if (index !== -1) {
    columns.value[index] = { ...updatedColumn };
  }
};

const unregisterColumn = (dataKey: string) => {
  const index = columns.value.findIndex((col) => col.dataKey === dataKey);
  if (index !== -1) {
    columns.value.splice(index, 1);
  }
};

provide("registerColumn", registerColumn);
provide("updateColumn", updateColumn);
provide("unregisterColumn", unregisterColumn);

const getAlignClass = (align?: string) => {
  switch (align) {
    case "center":
      return "text-center";
    case "right":
      return "text-right";
    default:
      return "text-left";
  }
};

const getCellValue = (row: T, column: TableColumn<T>) => {
  const value = row[column.dataKey as keyof T];
  if (column.cellRenderer) {
    return column.cellRenderer({ row, value });
  }
  return value;
};
</script>

<template>
  <div class="w-full h-full overflow-auto">
    <slot />
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-slate-800 border-b border-slate-700">
          <th
            v-for="column in columns"
            :key="column.dataKey"
            :style="{ width: column.width }"
            :class="[
              'py-3 px-4 text-xs font-bold uppercase tracking-wider text-slate-300',
              getAlignClass(column.align),
            ]"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in data"
          :key="index"
          class="border-b border-slate-700 hover:bg-slate-800/50 transition-colors"
        >
          <td
            v-for="column in columns"
            :key="column.dataKey"
            :class="['py-3 px-4 text-sm text-slate-200', getAlignClass(column.align)]"
            v-html="getCellValue(row, column)"
          />
        </tr>
      </tbody>
    </table>
  </div>
</template>
