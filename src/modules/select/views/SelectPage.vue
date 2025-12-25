/* filepath: src/modules/select/views/SelectPage.vue */
<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
import BaseButton from "@/shared/components/BaseButton.vue";
import horseImg from "@/assets/horse-1.png";
</script>

<template>
  <MainLayout>
    <div class="h-full flex flex-col items-center justify-center p-6">
      <div class="flex flex-col w-80 gap-6">
        <div class="flex flex-col items-center gap-4">
          <img
            :src="horseImg"
            alt="Horse Image"
            class="w-48 object-contain drop-shadow-2xl"
          />

          <router-link to="/game" class="w-full">
            <BaseButton class="w-full"> Horse Racing Game </BaseButton>
          </router-link>
        </div>

        <div class="flex flex-col gap-4">
          <BaseButton :disabled="true"> Car Game </BaseButton>

          <BaseButton :disabled="true"> Football Game </BaseButton>
        </div>
      </div>
    </div>
  </MainLayout>
</template>
