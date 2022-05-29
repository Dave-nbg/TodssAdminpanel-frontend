<script setup>
import {SearchIcon} from '@heroicons/vue/outline';
const props = defineProps({
  items: Object
});
function searchItem() {

}
</script>


<template>
  <section class="flex py-2">
    <div class="flex justify-center">
      <search-icon class="w-10 h-10 mr-2" @click="searchItem"></search-icon>
      <input placeholder="Zoek een item op." id="selectedItem" list="Items"  @keydown.enter="searchItem"
             class="p-2 border-2 border-gray-200 h-10 rounded focus:border-2 focus:border-indigo-200">
      <datalist id="Items">
        <option v-for="item in items">{{ item.name }}</option>
      </datalist>
    </div>
    <div class="flex-1"></div>
  </section>
</template>
