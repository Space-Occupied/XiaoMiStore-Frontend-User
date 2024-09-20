<template>
  <mobile_side_panel v-if="notCC" />
  <mytopbar v-if="notCC"></mytopbar>
  <mynavbar v-if="notCC"></mynavbar>
  <myModal v-show="notCC"></myModal>
  <!-- xxx   <cart_calc_top></cart_calc_top> -->
  <stateModal></stateModal>
  <router-view></router-view>
  <bottom_area></bottom_area>
  <post_area></post_area>
  <side_panel v-if="notCC"></side_panel>
</template>

<script setup>
import mynavbar from './components/front_page/mynavbar.vue'
import mobile_side_panel from './components/mobile_side_panel.vue'
import { setBC2Top } from './assets/js/bc2top_function.js'
import mytopbar from './components/mytopbar.vue'
import bottom_area from './components/bottom_area.vue'
import post_area from './components/post_area.vue'
import side_panel from './components/side_panel.vue'
import myModal from './components/myModal.vue'
import stateModal from './components/home_page/stateModal.vue'
import { useRoute } from 'vue-router';
import { computed, onMounted, getCurrentInstance } from 'vue'
const route = useRoute();
const notCC = computed(() => {
  if (route != null) {
    return !route.path.includes('cart_calc')
  } else {
    return true;
  }

  // return true;
});
onMounted(() => {
  console.log(useRoute().path.includes('cart_calc'));
  setBC2Top();
});
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}

:root {
  --topbar_color: rgb(176, 176, 176);
  --shadow1: 0px 8px 16px 0px rgba(0, 0, 0, 0.5);
  --gray_bg: rgb(245, 245, 245);
  --dark_bg: rgb(51, 51, 51);
}

#app {
  height: 100%;
  width: 100%;
  // overflow-x: hidden;
}

.clear_fix::after {
  content: "";
  clear: both;
  display: table;
  margin: 20px 0;
}

// #app .mobile_side_panel {
//   display: none;

// }</style>