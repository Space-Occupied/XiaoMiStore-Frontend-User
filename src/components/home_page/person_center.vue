<template>
  <div class="person_center center">
    <avatarModal ref="avatar"></avatarModal>
    <h1>个人信息</h1>
    <form action="">
      <div class="info_item" @click="myUpload">
        <label for="">头像</label>
        <div class="info_content" :class="{ 'avatar': state }">
          <b-img :src="computed_path" rounded="circle" alt="Circle image"></b-img>
          <i class="fa fa-angle-right" v-if="state"></i>
        </div>
      </div>
      <div class="info_item">
        <label for="">昵称</label>
        <div class="info_content">
          <p class="notice" v-if="!state">{{ uname ? uname : `请输入昵称！` }}</p>
          <input v-if="state" type="text" v-model="$store.state.username">
        </div>
      </div>
      <div class="info_item">
        <label for="">性别</label>
        <div class="info_content">
          <p class="notice" v-if="!state">{{
            gender === '男'
              ?
              '男' :
              gender === '女' ?
                '女' :
                gender === '保密' ?
                  '保密' :
                  '请填写性别！'
          }}</p>
          <div class="choice" v-if="state">
            <input type="radio" id="male" name="gender" value="男" v-model="$store.state.gender">
            <label for="male">
              男
            </label>
            <input type="radio" id="female" name="gender" value="女" v-model="$store.state.gender">
            <label for="female">
              女
            </label>
            <input type="radio" id="nosay" name="gender" value="保密" v-model="$store.state.gender">
            <label for="nosay">
              保密
            </label>
          </div>
        </div>
      </div>

      <div class="info_item">
        <label for="">账号id</label>
        <div class="info_content">
          <p class="constant">{{ userid }}</p>
        </div>
      </div>
      <div class="info_item">
        <label for="">默认手机号</label>
        <div class="info_content">
          <p class="notice" v-if="!state">
            {{
              default_phone
                ?
                default_phone
                :
                `请输入默认手机号！`
            }}
          </p>
          <input v-else type="text" v-model="$store.state.default_phone">
        </div>
      </div>
      <div class="info_item">
        <label for="">默认收货地址</label>
        <div class="info_content">
          <p class="notice" v-if="!state">
            {{
              default_addr
                ?
                default_addr
                :
                `请输入默认收货地址！`
            }}
          </p>
          <textarea v-else v-model="$store.state.default_addr">
                    </textarea>
        </div>
      </div>

      <div class="info_item">
        <label for="">默认收货人姓名</label>
        <div class="info_content">
          <p class="notice" v-if="!state">
            {{
              realname && realname.length
                ?
                realname
                :
                `请输入默认收货人姓名！`
            }}
          </p>
          <input v-else type="text" v-model="$store.state.realname">
        </div>
      </div>

      <div class="info_item">
        <label for=""></label>
        <!-- <img src="../assets/logo.png" alt=""> -->
        <div class="info_content">
          <b-button class="edit" @click="edit_save">{{ state ? '保存' : "编辑" }}</b-button>
        </div>
      </div>
      <!-- <div>
                <input type="text" v-model="uname" />
                <p>{{ this.uname }}</p>
            </div> -->






    </form>
  </div>
</template>
<!-- <script setup>

import avatarModal from './avatarModal.vue';
import { mapActions, mapState, useStore } from 'vuex';
import { ref, computed } from 'vue';

const store = useStore();
const location_prefix = computed(() => store.state.location_prefix);
const userid = computed(() => store.state.userid);
const uname = computed(() => store.state.username);
const default_addr = computed(() => store.state.default_addr);
const default_phone = computed(() => store.state.default_phone);
const realname = computed(() => store.state.realname);
const gender = computed(() => store.state.gender);
const avatar_path = computed(() => store.state.avatar_path);
const state = ref(false);

const post_data = computed(() => {
  return {
    id: userid.value,
    uname: uname.value,
    default_addr: default_addr.value,
    default_phone: default_phone.value,
    realname: realname.value,
    gender: gender.value,
    avatar_path: avatar_path.value
  }
});

const computed_path = computed(() => {
  // return avatar_path.value.length > 300
  //   ?
  //   avatar_path.value
  //   :
  //   location_prefix.value + avatar_path.value
  return avatar_path.value;
});

function myUpload() {
  if (this.state) {
    this.$root.$emit('bv::show::modal', 'avatarModal')
    this.$refs.avatar.$emit('crop')
  }
}
function edit_save() {

  if (this.state) {
    debugger
    let target = this.location_prefix + '/users/info'
    let body = JSON.stringify(this.post_data)
    this.stateModalShow({
      cb: () => {
        return fetch(target,
          {
            method: 'POST',
            body: body,
            headers: {
              "Content-Type": "application/json",
            },

          }
        ).then(res => {
          return res.json()
        })
          .then(res0 => {
            return new Promise(
              (res, rej) => {
                try {
                  console.log('this is the res of info save:@@', res0)

                  this.setUserinfo(res0.body)
                  res(`个人信息修改成功！`)
                }
                catch (err) {
                  rej(err)
                }
              })
          })
      }
    })
  }
  this.state = !this.state

} 
</script> -->

<script>
import avatarModal from './avatarModal.vue';
import { mapActions, mapState, useStore } from 'vuex';
export default {
    name: 'person_center',
    components: { avatarModal },
    data() {
        return {
            state: false,
        }
    },
    computed: {
        ...mapState({
            location_prefix: 'location_prefix',
            userid: 'userid',
            uname: 'username',
            default_addr: 'default_addr',
            default_phone: 'default_phone',
            realname: 'realname',
            gender: 'gender',
            avatar_path: 'avatar_path'
        }),
        post_data() {
            return {
                id: this.userid,
                uname: this.uname,
                default_addr: this.default_addr,
                default_phone: this.default_phone,
                realname: this.realname,
                gender: this.gender,
                avatar_path: this.avatar_path
            }
        },
        computed_path() {
            if(this.avatar_path == null)
            {
              return "";
            }
            return this.avatar_path.length > 300
                ?
                this.avatar_path
                :
                this.avatar_path
        }
    },
    methods: {
        ...mapActions(['setUserinfo', 'stateModalShow']),
        myUpload() {
            if (this.state) {
                // this.$root.$emit('bv::show::modal', 'avatarModal')
                // this.$refs.avatar.$emit('crop')
                // this.$refs.avatar.monitoring();
                this.$store.commit('avatar_modal', true);
            }
        },
        edit_save() {

            if (this.state) {
                debugger
                let target = this.location_prefix + '/users/info'
                let body = JSON.stringify(this.post_data)
                this.stateModalShow({
                    cb: () => {
                        return fetch(target,
                            {
                                method: 'POST',
                                body: body,
                                headers: {
                                    "Content-Type": "application/json",
                                },

                            }
                        ).then(res => {
                            return res.json()
                        })
                            .then(res0 => {
                                return new Promise(
                                    (res, rej) => {
                                        try {
                                            console.log('this is the res of info save:@@', res0)

                                            this.setUserinfo(res0.body)
                                            res(`个人信息修改成功！`)
                                        }
                                        catch (err) {
                                            rej(err)
                                        }
                                    })
                            })
                    }
                })
            }
            this.state = !this.state

        },


    },
    mounted() {
    }

}
</script>
<style lang="less" scoped>
@img_edge: 60px;
@person_black: rgb(51, 51, 51);
@label_size: 17px;
@notice_orange: rgb(255, 105, 0);

.person_center {
  form {
    .info_item {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 30px;
      // background-color: green;
      min-height: @img_edge;

      >label {
        padding-left: 30px;
        width: 100px;
        display: block;
        // line-height: @img_edge;
        color: @person_black;
        font-size: @label_size;

        @media (max-width:576px) {
          width: 100%;
          margin-bottom: 10px;
        }
      }

      .info_content {
        flex-grow: 1;
        padding-left: 30px;
        position: relative;

        .choice {
          label {
            padding-left: 5px;
            padding-right: 20px;
          }
        }

        &.avatar {
          cursor: pointer;
        }

        >.fa {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 20px;
        }

        img {
          width: @img_edge;
          height: @img_edge;
        }

        p.notice {
          margin: 0;
          color: @notice_orange;
        }

        p.constant {
          margin: 0;
          color: @person_black;
        }

        button.edit {
          width: 100%;
          background-color: @notice_orange;
          border: none;
        }
      }

    }
  }
}
</style>