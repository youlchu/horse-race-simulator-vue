<template>
  <div class="min-h-screen flex flex-col">
    <header class="h-16 text-white flex items-center px-6 shadow-md">
      <h1 class="text-xl font-bold tracking-tight">Insider One Case</h1>
    </header>

    <main class="flex-1 container mx-auto py-6">
      <slot />
    </main>

    <footer class="p-4 text-center text-gray-500 text-sm">© 2025 Horse Race Simulation</footer>
  </div>
</template>
