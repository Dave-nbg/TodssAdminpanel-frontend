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
  <div class="grid">
  <div id="addTableNumber" class="hidden">
  <label>tafel nummer: </label>
  <input id="tablenumber" class="rounded mt-2 border-2">

  <button @click="createQr" class="mb-4 bg-primary-500 ml-2 text-white rounded">Upload qr</button>
    <button class="ml-2 bg-red-700 text-white content-center rounded"
            @click="closeMenu()">X
    </button>
  </div>
    <button @click="openMenu" id="aanmaakButton" class="w-40 m-auto rounded bg-primary-500 text-white">maak Qr aan</button>
    <div id="plaatje" v-for="qr in images">
    <p>Tafelnummer: {{qr.tableNumber}} <input type="button" value="🗑️" @click="deleteQr(qr.uuid)" class="delete"></p>
    <img  :src="qr.url" alt="qr code plaatje" :id="qr.tableNumber+qr.uuid" class="rounded h-20 w-20 ">
    <button @click="print(qr.tableNumber+qr.uuid)">print image</button>
    </div>

  </div>
</template>