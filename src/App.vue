<template>
  <div id="app">
    <div class="container">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
 

export default {
  name: 'App',
  components: {
     
  }
}
</script>

<style>
.container{
  width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  overflow: hidden;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
}
</style>
