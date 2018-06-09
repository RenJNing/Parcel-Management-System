<template>
  <div class="login">
    <div class="background-div">
      <img :src="location" width='100%' height='100%'>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import BGimg from '../assets/background.jpg'
export default {
  data () {
    return {
      location: BGimg
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.background-div{
  position: fixed;
  margin-left:-0.5%;
  margin-top:-0.5%;
  width:100%;
  height:100%;
}
</style>
