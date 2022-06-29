<script setup>
import {qrcodeService} from "../service/qrcodeService";
import {onMounted, ref} from "vue";


const QrcodeService = new qrcodeService();
const image = ref("test");
const images = ref([]);

onMounted(getAllQrs())

async function getAllQrs(){
  const items = await QrcodeService.getAllQrs();
  let uuid = [];
  items.map(item => {uuid.push({uuid: item.uuid, tafelNummer: item.tableNumber})})
  const r = []
  uuid.map(async a => {
    r.push(images.value.push({url : "data:image/png;base64," + await QrcodeService.getQr(a.uuid), tableNumber:a.tafelNummer, uuid:a.uuid}))
  });
}

async function createQr(){

  const uuid = await QrcodeService.createQr(document.querySelector("#tablenumber").value)
  const r = await QrcodeService.getQr(uuid.uuid);
  image.value= "data:image/png;base64," +  r;
  images.value = []
  getAllQrs();

}

function openMenu(){
  document.querySelector("#addTableNumber").style.display = "block";
  document.querySelector("#aanmaakButton").style.display = "none"
}

function closeMenu(){
  document.querySelector("#addTableNumber").style.display = "none";
  document.querySelector("#aanmaakButton").style.display = "block"
}

function print(id){
  let image;
  document.querySelectorAll("img").forEach(item => {
    if(id === item.id){
      image = item
    }
  })


  const win = window.open('');
  win.document.write('<img src="' + image.src + '" onload="window.print();window.close()" />');
  win.focus();

  return true;
}

 async function deleteQr(uuid){

  await QrcodeService.deleteQr(uuid)
  images.value = []
  await getAllQrs()
}


</script>

<template>
  <div class="grid m-5">
  <div id="addTableNumber" class="hidden m-auto">
  <label class="py-0.5">tafel nummer: </label>
  <input id="tablenumber" class="rounded mt-2 border-2 py-0.5">

  <button @click="createQr" class="mb-4 bg-primary-500 ml-2 text-white rounded px-1.5 py-0.5">Upload qr</button>
    <button class="ml-2 w-6 bg-red-700 text-white content-center rounded py-0.5"
            @click="closeMenu()">X
    </button>
  </div>
    <button @click="openMenu" id="aanmaakButton" class="w-40 m-auto rounded bg-primary-500 text-white">maak Qr aan</button>
    <div id="plaatje" v-for="qr in images">
    <p>Tafelnummer: {{qr.tableNumber}}
    <button @click="print(qr.tableNumber+qr.uuid)" class="mx-1.5">🖨️</button>
    <input type="button" value="🗑️" @click="deleteQr(qr.uuid)" class="delete mx-1.5">
    </p>

    <img  :src="qr.url" alt="qr code plaatje" :id="qr.tableNumber+qr.uuid" class="rounded h-20 w-20 ">

    </div>

  </div>
</template>