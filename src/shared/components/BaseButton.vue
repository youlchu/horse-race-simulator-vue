<script setup lang="ts">
interface Props {
  disabled?: boolean;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  variant: "primary",
  type: "button",
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="py-2 px-6 rounded border border-slate-700 font-bold uppercase text-xs tracking-wider transition-all duration-200"
    :class="[
      disabled
        ? 'bg-gray-800 text-gray-600 cursor-not-allowed opacity-50'
        : variant === 'primary'
        ? 'bg-[#33415580] text-white hover:bg-[#334155]'
        : 'bg-gray-950 text-slate-300 hover:bg-black',
      !disabled && 'active:scale-95 shadow-lg',
    ]"
  >
    <slot />
  </button>
</template>
