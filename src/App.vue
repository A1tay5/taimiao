<template>
  <RouterView v-slot="{ Component }">
    <keep-alive :include="keepAliveNameList2">
      <component :is="Component" :key="$route.path" />
    </keep-alive>
  </RouterView>
</template>
<script setup lang="ts">
const keepAliveNameList2 = ['home', 'focus', 'my', 'BasicLayoutPage']
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
