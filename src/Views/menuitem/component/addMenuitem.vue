<script setup>
import {onMounted, ref} from "vue";
import {MenuitemService} from "../service/menuitemService";
import {Dialog, DialogPanel, DialogTitle} from '@headlessui/vue'
import {LocationService} from "../../location/service/locationService";
import {MenuitemDTO} from "../domain/menuitemDTO";


const menuitemIdEdit = ref(0);
const isOpen = ref(false);
let isEditOpen = ref(false);
const menuitems = ref([]);
const locations = ref([]);
const menuItemService = new MenuitemService();
const locationService = new LocationService();
const allergenen = ref([]);
const checkedAllergens = ref("");
let url = ref(null);


onMounted(async () => {
    allergenen.value = ["Selderij", "Ei", "Vis", "Gluten", "Lupine", "Melk", "Weekdieren", "Mosterd", "Noten", "Pinda", "Sesam", "Schaaldieren", "Soja", "Zwaveldioxide"];
    menuitems.value = await menuItemService.getMenuitems();
    locations.value = await locationService.getLocations();

})

class Feature {
  constructor(beschrijving, allergenen) {
    this.beschrijving = beschrijving;
    this.allergenen = allergenen;
  }}

function setIsOpen(value) {
    isOpen.value = value
}

function openEditMenu(menuItem) {
  isEditOpen.value = !isEditOpen.value;
  menuitemIdEdit.value = menuItem.id;
}

async function editMenuitem() {
    const menuitemName = document.querySelector('#menuitemEditName').value
    const menuitemPrice = document.querySelector('#menuitemEditPrice').value
    const locationId = document.querySelector('#locationId').value.split(' ')[0]
    console.log(locationId)
    if (menuitemName !== "" && menuitemPrice !== "") {
        await menuItemService.editMenuItem(menuitemIdEdit.value, menuitemName, locationId, menuitemPrice);
        menuitems.value = await menuItemService.getMenuitems();
    } else {
        alert("Er is niks ingevuld.")
    }
}

async function deleteMenuitem(menuitemId) {
    await menuItemService.deleteMenuItem(menuitemId);
    menuitems.value = await menuItemService.getMenuitems();
}



async function addMenuitem(e) {
    e.preventDefault();

    const name = document.querySelector('#menuitemName').value;
    const price = document.getElementById("menuItemPrice").value;
    const beschrijving = document.querySelector('#menuitemDescription').value;


    const locationId = document.querySelector('#menuitemLocationId').value.split(' ')[0]

    let features = "Beschrijving: " + beschrijving + "; Allergenen: " + checkedAllergens.value
    let menuitemDTO = new MenuitemDTO(name, price, features, locationId, "");


    const file = document.getElementById("itemImage").files[0];



        menuItemService.postMenuitem(menuitemDTO, file).then(async response => {
            menuitems.value = await menuItemService.getMenuitems();
        });


    setIsOpen(false);
}

function previewImage(input) {
    let image = input.target.files[0];
    url.value = URL.createObjectURL(image);
}

function test() {
    var allergens = "";
    for (let i = 0; i < document.querySelectorAll("#allergeenInfo").length; i++) {
        let item = document.querySelectorAll("#allergeenInfo")[i];
        if (item.children[0].checked) {
            if (allergens !== "") {
                allergens += ", " + item.children[1].innerHTML
            } else {
                allergens += item.children[1].innerHTML;
            }
        }
    }
    checkedAllergens.value = allergens
    console.log(checkedAllergens.value);
    // console.log(document.querySelectorAll("input[type='checkbox']"));

}

</script>

<template>
    <main>
        <div id="addLocationMenu" class="w-full h-full">
            <button id="addButton" class="bg-primary-500 text-white float-right h-10 p-2 mr-2 rounded"
                    @click="setIsOpen(true)">menuitem toevoegen
            </button>
        </div>

        <div v-for="(menuitem, index) in menuitems" :key="index">
          <Dialog :open="isEditOpen" @close="" class="relative z-50">
            <div class="fixed inset-0 bg-black/70" aria-hidden="true"></div>
            <div class="fixed flex items-center inset-0 justify-center">
              <DialogPanel class="bg-white rounded">
                <button class="float-right bg-red-700 text-white w-9 h-9 content-center rounded-tr " @click="openEditMenu">X</button>
            <div class=" border-2 mt-10 p-2 bg-white m-3" id="menuItemEdit">
                <label>menuitem naam: </label>
                <input id="menuitemEditName" class="rounded border-2 m-2" :value="menuitem.name">
                <label>menuitem price: </label>
                <input id="menuitemEditPrice" type="number" class="rounded border-2 m-2" :value="menuitem.price" >
              <select>
                    <option id="locationId" v-for="location in locations">{{ location.id + " " + location.name }}
                    </option>
                </select>
              <br>
              <fieldset class="border-2 mt-2 p-2 flex flex-col ">
                <legend>Menuitem eigenschappen:</legend>
                <br>
                <label for="menuitemDescription">Beschrijving: </label>
                <input id="menuitemDescription" name="menuitemDescription"
                       class="rounded border-2 mt-1 p-2" placeholder="beschrijving">
                <label for="menuitemAllergens">Allergenen: </label>


                <div class="grid-cols-4 grid">
                  <div v-for="allergen in allergenen">
                    <div id="allergeenInfo">
                      <input id="menuitemAllergens" class="mr-2" type="checkbox" @click="test()"/>
                      <label for="menuitemAllergens">{{ allergen }}</label>
                    </div>
                  </div>
                </div>


              </fieldset>
                <button class="bg-primary-500 text-white m-2  rounded" @click="editMenuitem()">Edit locatie</button>

            </div>
              </DialogPanel>
            </div>
          </Dialog>



          <div id="menuitemDisplay" class="mt-1">
            <label class="opmerking-item" for="opmerking">
                <span class="ml-10">{{ menuitem.name }}</span>
            </label>
            <input type="button" @click="openEditMenu(menuitem)" value="✏️" class="edit">
            <input type="button" value="🗑️" @click="deleteMenuitem(menuitem.id)" class="delete">
        </div>
        </div>
    </main>

    <Dialog :open="isOpen" @close="setIsOpen" class="relative z-50">
        <div class="fixed inset-0 bg-black/70" aria-hidden="true"></div>
        <div class="fixed flex items-center inset-0 justify-center">
            <DialogPanel class="bg-white rounded">
                <button class="float-right bg-red-700 text-white w-9 h-9 content-center rounded-tr"
                        @click="setIsOpen(false)">X
                </button>
                <div class="p-8">
                    <DialogTitle class="text-lg ">Menuitem Aanmaken</DialogTitle>


                    <form id="addItemForm" class="mt-8" method="post" @submit="addMenuitem">
                        <div class="flex flex-col mb-10">
                            <label for="menuitemName">Menuitem naam:</label>
                            <input id="menuitemName" name="menuitemName" class="rounded border-2 mt-1 p-2"
                                   placeholder="Menuitem">
                            <label for="menuItemPrice">Menuitem prijs:</label>
                            <input id="menuItemPrice" name="menuItemPrice" class="rounded border-2 mt-1 p-2"
                                   placeholder="Menuitem prijs" type="number">
                            <fieldset class="border-2 mt-2 p-2 flex flex-col ">
                                <legend>Menuitem eigenschappen:</legend>
                                <br>
                                <label for="menuitemDescription">Beschrijving: </label>
                                <input id="menuitemDescription" name="menuitemDescription"
                                       class="rounded border-2 mt-1 p-2" placeholder="beschrijving">
                                <label for="menuitemAllergens">Allergenen: </label>


                                <div class="grid-cols-4 grid">
                                    <div v-for="allergen in allergenen">
                                        <div id="allergeenInfo">
                                            <input id="menuitemAllergens" class="mr-2" type="checkbox" @click="test()"/>
                                            <label for="menuitemAllergens">{{ allergen }}</label>
                                        </div>
                                    </div>
                                </div>


                            </fieldset>

                            <label for="itemImage">Upload een afbeelding</label>
                            <input type="file" id="itemImage" name="itemImage" accept="image/png, .jpg, .jpeg" @change="previewImage">
                            <div id="imagePreview" class="py-4">
                                <p v-if="url">Afbeelding preview</p>
                                <img v-if="url" :src="url" alt="image preview" width="100" height="100"/>
                            </div>

                            <label for="PrepareLocation">Bereidings locatie: </label>
                            <select name="PrepareLocation" id="menuitemLocation">
                                <option id="menuitemLocationId" v-for="location in locations">
                                    {{ location.id + " " + location.name }}
                                </option>
                            </select>


                        </div>
                        <button type="submit" class="bg-primary-500 my-2 h-12 rounded p-3">Locatie toevoegen</button>
                    </form>
                </div>
            </DialogPanel>

        </div>
    </Dialog>
</template>