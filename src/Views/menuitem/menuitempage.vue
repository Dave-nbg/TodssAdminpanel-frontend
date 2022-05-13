<script setup>
import TheSidebar from "../../components/TheSidebar.vue";
</script>

<template>
  <body class="grid grid-areas-layout grid-cols-layout grid-rows-layout h-full w-full">
  <nav class="grid-in-nav">
    <TheSidebar></TheSidebar>
  </nav>
  <main class="grid-in-main grid">
    <h1>Menu items</h1>
  </main>
  </body>
</template>