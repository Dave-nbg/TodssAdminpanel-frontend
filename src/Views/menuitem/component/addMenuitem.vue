<script setup>
import {onMounted, ref} from "vue";
import {MenuitemService} from "../service/menuitemService";
import {Dialog, DialogPanel, DialogTitle} from '@headlessui/vue'
import {LocationService} from "../../location/service/locationService";
import {MenuitemDTO} from "../domain/menuitemDTO";


const menuitemIdEdit = ref(0);
const isOpen = ref(false);
const menuitems = ref([]);
const locations = ref([]);
const menuItemService = new MenuitemService();
const locationService = new LocationService();
const allergenen = ref([]);
const checkedAllergens = ref("");

onMounted(async () => {
    allergenen.value = ["Selderij", "Ei", "Vis", "Gluten", "Lupine", "Melk", "Weekdieren", "Mosterd", "Noten", "Pinda", "Sesam", "Schaaldieren", "Soja", "Zwaveldioxide"];
    menuitems.value = await menuItemService.getMenuitems();
    locations.value = await locationService.getLocations();

})

function setIsOpen(value) {
    isOpen.value = value
}

function openEditMenu(menuItemId) {
    document.querySelector('#menuItemEdit').style.display = 'block'
    menuitemIdEdit.value = menuItemId;
}


function closeEditMenu() {
    document.querySelector('#menuItemEdit').style.display = 'none'
}

async function editMenuitem() {
    const menuitemName = document.querySelector('#menuitemEditName').value
    const locationId = document.querySelector('#locationId').value.split(' ')[0]
    console.log(locationId)
    if (menuitemName !== "") {
        await menuItemService.editMenuItem(menuitemIdEdit.value, menuitemName, locationId);
        menuitems.value = await menuItemService.getMenuitems();
    } else {
        alert("Er is niks ingevuld.")
    }
}

async function deleteMenuitem(menuitemId) {
    await menuItemService.deleteMenuItem(menuitemId);
    menuitems.value = await menuItemService.getMenuitems();
}

class Feature {
    constructor(beschrijving, allergenen) {
        this.beschrijving = beschrijving;
        this.allergenen = allergenen;
    }

}

async function addMenuitem() {
    const name = document.querySelector('#menuitemName').value;
    const price = document.getElementById("menuItemPrice").value;
    const beschrijving = document.querySelector('#menuitemDescription').value;


    const image = document.getElementById("itemImage");
    console.log(image.files[0]);
    const locationId = document.querySelector('#menuitemLocationId').value.split(' ')[0]

    let features = new Feature(beschrijving, checkedAllergens.value)
    let menuitemDTO = new MenuitemDTO(name, price, features, locationId, "");
    menuItemService.postMenuitem(menuitemDTO, image.files[0]).then(async response => {
        menuitems.value = await menuItemService.getMenuitems();
    });

    setIsOpen(false);
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
            <div class="hidden" id="menuItemEdit">
                <label>menuitem naam</label>
                <input id="menuitemEditName" class="rounded border-2 m-2">
                <select>
                    <option id="locationId" v-for="location in locations">{{ location.id + " " + location.name }}
                    </option>
                </select>
                <button class="bg-primary-500 text-white m-2  rounded" @click="editMenuitem()">Edit locatie</button>
                <button class="bg-red-700 text-white m-2 w-5" @click="closeEditMenu">X</button>
            </div>
            <label class="opmerking-item" for="opmerking">
                <span class="ml-10">{{ menuitem.name }}</span>
            </label>
            <input type="button" @click="openEditMenu(menuitem.id)" value="✏️" class="edit">
            <input type="button" value="🗑️" @click="deleteMenuitem(menuitem.id)" class="delete">

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


                    <form id="test" class="mt-8">
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
                            <input type="file" id="itemImage" name="itemImage" accept="image/png">
                            <label for="PrepareLocation">Bereidings locatie: </label>
                            <select name="PrepareLocation" id="menuitemLocation">
                                <option id="menuitemLocationId" v-for="location in locations">
                                    {{ location.id + " " + location.name }}
                                </option>
                            </select>


                        </div>
                    </form>
                    <button @click="addMenuitem" class="bg-primary-500 my-2 h-12 rounded p-3">Locatie toevoegen</button>
                </div>
            </DialogPanel>

        </div>
    </Dialog>
</template>