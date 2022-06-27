<script setup>
import {qrcodeService} from "../service/qrcodeService";

const qrcodeServices = new qrcodeService();

function createQr(){
  qrcodeServices.createQr(document.querySelector("#tablenumber").value)
}


</script>

<template>
  <label>tafel nummer: </label>
  <input id="tablenumber">
  <button @click="createQr">Upload qr</button>
</template>