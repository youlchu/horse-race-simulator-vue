<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <header
      class="h-16 bg-orange-600 text-white flex items-center px-6 shadow-md"
    >
      <h1 class="text-xl font-bold tracking-tight">HORSE RACING GAME</h1>
    </header>

    <main class="flex-1 container mx-auto py-6">
      <slot />
    </main>

    <footer class="p-4 text-center text-gray-500 text-sm">
      © 2024 Horse Race Simulation
    </footer>
  </div>
</template>
