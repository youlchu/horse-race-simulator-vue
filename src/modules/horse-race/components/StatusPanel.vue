<script setup lang="ts">
import { programData, resultsData } from "../_mocks/panel";
</script>

<template>
  <div class="flex flex-col h-full gap-6">
    <div class="flex-1 flex flex-col min-h-0">
      <h3 class="text-[10px] font-bold tracking-widest text-blue-400 uppercase mb-2 px-2">
        Next Rounds
      </h3>
      <div class="flex-1 border border-slate-800 rounded bg-slate-900/30 overflow-hidden">
        <BaseTable :data="programData">
          <BaseColumn dataKey="round" label="Round" width="30%" align="center" />
          <BaseColumn
            dataKey="distance"
            label="Distance"
            width="40%"
            :cellRenderer="
              ({ value }: { value: number }) => `<span class='font-mono'>${value}m</span>`
            "
          />
          <BaseColumn
            dataKey="status"
            label="Status"
            width="30%"
            :cellRenderer="
              ({ value }: { value: string }) => {
                let colorClass = 'text-slate-400';
                if (value === 'Ready') colorClass = 'text-green-400 font-bold';
                else if (value === 'Next') colorClass = 'text-yellow-400 font-semibold';
                return `<span class='${colorClass}'>${value}</span>`;
              }
            "
          />
        </BaseTable>
      </div>
    </div>

    <div class="flex-1 flex flex-col min-h-0">
      <h3 class="text-[10px] font-bold tracking-widest text-green-400 uppercase mb-2 px-2">
        Race Results
      </h3>
      <div class="flex-1 border border-slate-800 rounded bg-slate-900/30 overflow-hidden">
        <BaseTable :data="resultsData">
          <BaseColumn
            dataKey="round"
            label="Round"
            width="20%"
            :cellRenderer="
              ({ value }: { value: number }) =>
                `<span class='font-bold text-slate-400'>R${value}</span>`
            "
          />
          <BaseColumn
            dataKey="winner"
            label="Winner"
            width="50%"
            :cellRenderer="
              ({ value }: { value: string }) =>
                `<span class='text-green-400 font-semibold'>🏆 ${value}</span>`
            "
          />
          <BaseColumn
            dataKey="time"
            label="Time"
            width="30%"
            :cellRenderer="
              ({ value }: { value: string }) =>
                `<span class='font-mono text-xs text-slate-400'>${value}</span>`
            "
          />
        </BaseTable>
      </div>
    </div>
  </div>
</template>
