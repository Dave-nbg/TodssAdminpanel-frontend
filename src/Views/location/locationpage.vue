<script setup>
import AddLocation from "./components/addLocation.vue";
import EditLocation from "./components/editLocation.vue";
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
    <add-location class="flex-right"></add-location></div>
    <edit-location class="flex-left"></edit-location>
  </main>
  </body>
</template>