<template>
    <div class="disp container-xl px-0">
      <div class="slide_menu" v-show="staying" @mouseover="staying = true" @mouseleave="staying = false">
        <ul v-if="fetched_category">
          <li v-for="item of category_lists[selected].array">
            <a href="javascript:;">
              <img :src="$store.state.location_prefix + item.img_src">
              <span class="d-inline-block">{{ item.name }}
              </span>
            </a>
          </li>
        </ul>
      </div>
      <div class="left">
        <ul v-if="fetched_category">
          <li v-for="item, index of category_lists" @mouseover="selected = index; staying = true"
            @mouseleave="staying = false">
            {{ item.title }}
            <i class="fa fa-angle-right"></i>
          </li>
  
        </ul>
  
      </div>
      <div class="right">
        <div class="swiper mySwiper">
          <div class="swiper-wrapper">
            <swiper_item v-if="fetched_slide" v-for="(item, index) in swiper_slide_list" :swiper_slide_item="item"
              :key="item.index" :class="'slide_' + (index + 1)">
            </swiper_item>
          </div>
          <div class="swiper-pagination"></div>
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
        </div>
      </div>
  
    </div>
  </template>
  <script setup>
  import { ref, onMounted, nextTick } from 'vue';
  import swiper_item from './swiper_item.vue'
  import Swiper from 'swiper'; // 注意引入的是Swiper
  // import 'swiper/css/swiper.min.css' // 注意这里的引入
  import 'swiper/css';
  import "swiper/bundle"
  import "swiper/css/autoplay";
  import "swiper/css/effect-fade";
  import "swiper/css/navigation";
  import "swiper/css/pagination";
  import api from "@/utils/api";
  // import "swiper/swiper-bundle.min.js.map"
  const fetched_category = ref(false);
  const fetched_slide = ref(false);
  const swiper_slide_list = ref([]);
  // slide_item_list: [
  //   '手机', '电视', '家电', '笔记本 平板', '出行 穿戴', '耳机 音箱', '健康 儿童'
  // ],
  const category_lists = ref([]);
  const staying = ref(false);
  const selected = ref(0);
  
  onMounted(() => {
    console.log('mounted')
    // debugger
  
    api({
      url: "/resources/category",
      method: "get"
    }).then(res => {
      // console.log(res)
      category_lists.value = res.data;
      fetched_category.value = true
    });
    api({
      url: "/resources/slide",
      method: "get"
    }).then(res => {
      console.log(res)
      swiper_slide_list.value = res.data;
      fetched_slide.value = true
      nextTick(() => {
        // debugger
        var mySwiper = new Swiper('.mySwiper', {
          loop: true, // 循环模式选项
          effect: 'fade',
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          },
  
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          autoplay: {
            delay: 2000
          }
  
          // 如果需要滚动条
  
        })
        mySwiper.autoplay.start()
        console.log(mySwiper)
      })
  
    })
    // this.slide_menu_list = [this.phone_list]
  
  });
  </script>
  <style lang="less">
  @left_ratio: 16.67%;
  @media (max-width:700px) {
  
  
    div.disp {
      .slide_menu {
        ul {
          li {
            a {
              span {
                font-size: 5px;
              }
            }
          }
        }
      }
  
      .left {
        font-size: 6px;
  
        ul {
          li {
            padding: 5px;
          }
        }
      }
  
      height: 250px;
    }
  
  }
  
  .disp {
    /* padding: 1px; */
    position: relative;
    /* overflow: auto; */
    width: 100%;
    height: 460px;
  
    .slide_menu {
      box-sizing: border-box;
      padding: 20px 0px;
      z-index: 100;
      position: absolute;
      // display: none;
      left: @left_ratio;
      top: 0%;
      width: 100%-@left_ratio;
      height: 100%;
      background-color: white;
      box-shadow: var(--shadow1);
  
      ul {
        width: 100%;
        height: 100%;
        list-style-type: none;
        display: flex;
        flex-wrap: wrap;
        align-content: space-around;
  
        li {
          width: 24%;
          height: 15%;
          /* float: left; */
          display: block;
  
          /* display: inline-block; */
          a {
            text-decoration: none;
            color: black;
            font-size: small;
            display: block;
            height: 100%;
            width: 100%;
  
            img {
              /* width:30px; */
              // height: 100%;
              width: 25%;
            }
  
            span {
              width: 75%;
            }
          }
  
        }
      }
    }
  
    .left {
      background-color: rgba(105, 105, 105, 0.6);
      box-sizing: border-box;
      /* overflow: hidden; */
      height: 100%;
      float: left;
      padding: 20px 0px;
      width: @left_ratio;
      margin: 0;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 20;
      font-size: 15px;
  
  
  
  
      ul {
        list-style-type: none;
        margin: 0;
        padding-left: 0px;
  
        li {
          color: #fff;
          padding-top: 10px;
          padding-bottom: 10px;
          padding-right: 10px;
          padding-left: 10px;
          height: 15%;
  
          i {
            float: right;
          }
        }
  
      }
  
    }
  
    .right {
      display: block;
      float: left;
      width: 100%;
      height: 100%;
      z-index: 10;
      /* background-color: red; */
      overflow-wrap: break-word;
      position: relative;
  
      .mySwiper {
        width: 100%;
        height: 100%;
        background-color: transparent;
        --swiper-navigation-color: rgb(124, 124, 124);
        --swiper-pagination-color: rgb(124, 124, 124);
  
        .swiper-button-prev {
          left: @left_ratio;
          /* top: 0; */
          position: absolute;
        }
  
        .swiper-pagination {
          position: absolute;
          left: @left_ratio;
          width: 80%;
        }
  
        .swiper-slide {
          img {
            width: 100%;
          }
  
          a img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
  
  
  
      }
  
    }
  
  
  
    .left ul li:hover {
      background-color: rgb(255, 106, 0);
      cursor: pointer;
    }
  
    .left ul li:hover .slide_menu {
      display: block;
    }
  
  
  
    .left .slide_menu ul li a:hover {
      color: orange;
    }
  
  
  }
  </style>