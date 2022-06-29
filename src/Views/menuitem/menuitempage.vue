<script setup>
import TheSidebar from "../../components/TheSidebar.vue";
import Searchbar from "../searchbar/searchbar.vue";
import {onMounted, ref} from "vue";
import {MenuitemService} from "./service/menuitemService";
import AddMenuitem from "./component/addMenuitem.vue";

const items = ref(null);

onMounted(async () => {
  const service = new MenuitemService();
  const getItems = await service.getMenuitems();
  const array = [];
  getItems.forEach(item => {array.push(item)})
  items.value = array;
});

</script>

<template>
  <div class="grid grid-areas-layout grid-cols-layout grid-rows-layout h-full w-full">
    <nav class="grid-in-nav">
      <TheSidebar></TheSidebar>
    </nav>
    <main class="grid-in-main grid">
      <h1 class="m-auto mt-5 font-bold text-2xl">Menu-items</h1>
      <add-menuitem></add-menuitem>
    </main>

  </div>

</template>