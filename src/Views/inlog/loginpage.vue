<script setup>
function  loggedIn(){
    const URL = "http://localhost:8080/login";
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify({
        username: document.querySelector("#email").value,
        password: document.querySelector("#password").value
      }),
      headers: {
        "content-type": "application/json",
      },
      credentials: "include"
    };
    fetch(URL, fetchOptions)
        .then(response => response.ok
            ? window.sessionStorage.setItem("myJWT", response.headers.get("authorization").split(" ").at(1))
            : this._throwError(response.message))
        .then(() => window.location.href = "/menuitems")
        .catch(error => alert("Foute gebruikersnaam of wachtwoord."));
  }


</script>

<template>

  <div class="m-auto grid ">
  <div class="m-auto">

    <strong class="text-2xl">Kikkerberg</strong>
    <img src="/images/kikker.png" alt="logo" class="h-12 w-12 my-4 mx-10">
  </div>

  <form class="border-2 rounded">
    <div class="grid p-10">
      <label for="email">email</label>
      <input type="text" id="email" name="email" class="border-2 mb-3 rounded">
      <label for="password">wachtwoord</label>
      <input type="password" name="password" id="password" class="border-2 mb-3 rounded">
      <button type="button" class="bg-primary-500 h-10 rounded text-white my-3" @click="loggedIn">Inloggen</button>
    </div>
  </form>
  </div>
</template>
