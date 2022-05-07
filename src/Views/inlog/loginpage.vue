<script setup>
function loggedIn(){
  location.href="/gebruiker"
}
</script>

<template>

  <div class="m-auto grid ">
  <div class="m-auto">

    <strong>
    <h1 class="text-2xl">Kikkerberg</h1>
    </strong>
    <img src="/public/images/kikker.png" alt="logo" class="h-12 w-12 my-4 mx-10">
  </div>

  <form class="border-2 rounded">
    <div class="grid p-10">
      <label for="email">email</label>
      <input type="text" id="email" name="email" class="border-2 mb-3 rounded">
      <label for="password">wachtwoord</label>
      <input type="password" name="password" id="password" class="border-2 mb-3 rounded">
      <button type="button" class="bg-primary-500 h-10 rounded text-white my-3" @click="loggedIn">Inloggen</button>
      <a href="" class="underline text-primary-500 m-auto">Wachtwoord vergeten?</a>
    </div>
  </form>
  </div>
</template>
