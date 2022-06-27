<script setup>
import {qrcodeService} from "../service/qrcodeService";
import {ref} from "vue";


const qrcodeServices = new qrcodeService();
const image = ref("test");
async function createQr(){
  const uuid = await qrcodeServices.createQr(document.querySelector("#tablenumber").value)
  const r = await qrcodeServices.getQr(uuid.uuid);
  image.value= "data:image/png;base64," +  r;
  console.log(r)
}

function print(){
  var mywindow = window.open('', 'PRINT', 'height=400,width=600');

  mywindow.document.write(document.querySelector("#plaatje").innerHTML);


  mywindow.document.close(); // necessary for IE >= 10
  mywindow.focus(); // necessary for IE >= 10*/

  mywindow.print();
  mywindow.close();

  return true;
}


</script>

<template>
  <div class="grid">
  <div>
  <label>tafel nummer: </label>
  <input id="tablenumber" class="h-4 mt-2 border-2">
  <button @click="createQr" class="mb-4">Upload qr</button>
  </div>
    <div id="plaatje">
  <img  :src="image" alt="qr code plaatje"  class="rounded h-20 w-20 ">
    </div>
  <button @click="print">print image</button>
  </div>
</template>