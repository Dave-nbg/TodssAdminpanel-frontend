<script setup>
import AddLocation from "./components/addLocation.vue";
import TheSidebar from "../../components/TheSidebar.vue";
</script>

<template>

  <body class="grid grid-areas-layout grid-cols-layout grid-rows-layout h-full w-full">
  <nav class="grid-in-nav">
    <TheSidebar></TheSidebar>
  </nav>
  <main class="grid-in-main grid">
    <h1 class="m-auto mt-5 font-bold text-2xl">Locatie</h1>
    <div class="flex m-10">
    <p>zoekbalk</p>
    <add-location></add-location></div>
  </main>
  </body>
</template>