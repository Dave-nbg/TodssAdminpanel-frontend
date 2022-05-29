<script setup>
import {onMounted, ref} from "vue";
import {MenuitemService} from "../service/menuitemService";


const menuitemIdEdit = ref(0);
const isOpen = ref(false)
const menuitems = ref([])
const menuItemService = new MenuitemService()

onMounted(async () => {
  menuitems.value = await menuItemService.getMenuitems();
})

function setIsOpen(value) {
  isOpen.value = value
}

function openEditMenu(menuItemId){
  document.querySelector('#menuItemEdit').style.display = 'block'
  menuitemIdEdit.value = menuItemId;
}


function closeEditMenu(){
  document.querySelector('#menuItemEdit').style.display = 'none'
}

async function editMenuitem() {
  const menuitemName = document.querySelector('#menuitemEditName').value
  if (menuitemName !== "") {
    await menuItemService.editMenuItem(menuitemIdEdit.value, menuitemName);
    menuitems.value = await menuItemService.getMenuitems();
  } else {
    alert("Er is niks ingevuld.")
  }
}

async function deleteMenuitem(menuitemId){
  await menuItemService.deleteMenuItem(menuitemId);
  menuitems.value = await menuItemService.getMenuitems();
}

</script>

<template>
  <main>
    <div id="addLocationMenu" class="w-full h-full">
      <button id="addButton" class="bg-primary-500 text-white float-right h-10 p-2 mr-2 rounded" @click="setIsOpen(true)">menuitem toevoegen</button>
    </div>

    <div v-for="(menuitem, index) in menuitems" :key="index">
      <div class="hidden" id="menuItemEdit">
        <input id="menuitemEditName" class="rounded border-2 m-2">
        <button class="bg-primary-500 text-white m-2  rounded" @click="editMenuitem()">Edit locatie</button>
        <button class="bg-red-700 text-white m-2 w-5" @click="closeEditMenu">X</button>
      </div>
      <label class="opmerking-item" for="opmerking">
        <span class="ml-10">{{menuitem.name}}</span>
      </label>
      <input type="button" @click="openEditMenu(menuitem.id)" value="✏️" class="edit">
      <input type="button" value="🗑️" @click="deleteMenuitem(menuitem.id)" class="delete">

    </div>
  </main>
</template>