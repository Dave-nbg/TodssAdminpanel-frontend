<script setup>
import {qrcodeService} from "../service/qrcodeService";
import {onMounted, ref} from "vue";


const QrcodeService = new qrcodeService();
const image = ref("test");
const images = ref([]);

onMounted(async () => {
  const items = await QrcodeService.getAllQrs();
  let uuid = [];
  items.map(item => {uuid.push({uuid: item.uuid, tafelNummer: item.tableNumber})})
  const r = []
  console.log(uuid)
  uuid.map(async a => {
    r.push(images.value.push({url : "data:image/png;base64," + await QrcodeService.getQr(a.uuid), tableNumber:a.tafelNummer}))
  });


})


async function createQr(){

  const uuid = await QrcodeService.createQr(document.querySelector("#tablenumber").value)
  const r = await QrcodeService.getQr(uuid.uuid);
  image.value= "data:image/png;base64," +  r;

}

function openMenu(){
  document.querySelector("#addTableNumber").style.display = "block";
  document.querySelector("#aanmaakButton").style.display = "none"
}

function closeMenu(){
  document.querySelector("#addTableNumber").style.display = "none";
  document.querySelector("#aanmaakButton").style.display = "block"
}

function print(){
  var mywindow = window.open('', 'PRINT', 'height=400,width=600');
  mywindow.document.write(document.querySelector("#plaatje").innerHTML);
  mywindow.document.close();
  mywindow.focus();

  mywindow.print();
  mywindow.close();

  return true;
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
      <p>Tafelnummer: {{qr.tableNumber}}</p>
  <img  :src="qr.url" alt="qr code plaatje"  class="rounded h-20 w-20 ">
    </div>
  <button @click="print">print image</button>
  </div>
</template>