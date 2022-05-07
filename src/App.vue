<script setup>
import TheSidebar from './components/TheSidebar.vue';

</script>

<template>
    <div class="flex-col sm:flex-row flex">

        <router-view><TheSidebar/></router-view>
    </div>
</template>