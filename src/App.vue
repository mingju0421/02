<template>
  <div id="app">
    <Dashboard></Dashboard>
    <!-- <router-view/> -->
  </div>
</template>
<script>
const Dashboard = () => import('./views/a')
export default {
  components: {
    Dashboard,
  }
}
</script>
<style>
html,body{height: 100%; width: 100%;}
#app{height: 100%; width: 100%;}
</style>
