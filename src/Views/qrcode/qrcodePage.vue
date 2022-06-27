<script setup>
import TheSidebar from "../../components/TheSidebar.vue";
import Qrcode from "./component/qrcode.vue";


</script>

<template>
  <div class="grid grid-areas-layout grid-cols-layout grid-rows-layout h-full w-full">
    <nav class="grid-in-nav">
      <TheSidebar></TheSidebar>
    </nav>
    <main class="grid-in-main grid">
      <h1 class="m-auto mt-5 font-bold text-2xl">Qr codes</h1>
      <qrcode></qrcode>
    </main>

  </div>

</template>