import { createStore } from 'vuex'

const default_avatar = `/images/users/default.png`

// 准备 actions —— 用于响应组件中的动作
const actions = {
  stateModalShow({ commit }, { description, cb }) {
    // 准备不用bvModal了，直接手撸modal代替
    // 假设 $bvModal 是一个全局安装的插件
    //this._vm?.$bvModal?.show('stateModal')
    let _this = this
    cb().then((res) => {
      console.log(res)
      commit('SMD', res)
      setTimeout(() => {
        //_this._vm?.$bvModal?.hide('stateModal')
        commit('SMD', null)
      }, 2000)
    })
  },
  setUserinfo({ commit }, value) {
    console.log('set user info:@@')
    commit('username', value.uname || value.uid)
    commit('userid', value.uid)
    commit('avatar', value.avatar_path || default_avatar)
    commit('default_addr', value.default_addr)
    commit('default_phone', value.default_phone)
    commit('gender', value.gender)
    commit('realname', value.realname)
  },
  modal({ commit }, value) {
    // 准备不用bvModal了，直接手撸modal代替
    // 假设 $bvModal 是一个全局安装的插件
    // this._vm?.$bvModal?.show('myModal')
    commit('modal', value)
  }
}

// 准备 mutations —— 用于操作数据（state）
const mutations = {
  bc2top(state, value) {
    state.bc2top_show = value
  },
  modal(state, value) {
    state.modal = value
  },
  cart_calc_modify_modal(state, value) {
    state.cart_calc_modify_modal = value
  },
  avatar_modal(state, value) {
    state.avatar_modal = value
  },
  username(state, value) {
    state.username = value
  },
  userid(state, value) {
    state.userid = value
  },
  avatar(state, value) {
    state.avatar_path = value
  },
  realname(state, value) {
    state.realname = value
  },
  default_addr(state, value) {
    state.default_addr = value
  },
  default_phone(state, value) {
    state.default_phone = value
  },
  gender(state, value) {
    state.gender = value
  },
  cart_list(state, value) {
    state.cart_list = value
  },
  SMD(state, value) {
    state.stateModalDescription = value
  },
  select_list(state, value) {
    state.select_list = value
  }
}

// 准备 state —— 用于存储数据
const state = {
  bc2top_show: false,
  // location_prefix: 'http://localhost:3000',//原后端
  // location_prefix: 'http://localhost:8001',
  location_prefix: '/api',
  opts_choosen: new Map(),
  modal: 0,
  username: null,
  userid: null,
  avatar_path: null,
  default_addr: null,
  default_phone: null,
  gender: null,
  realname: null,
  cart_list: [],
  stateModalDescription: null,
  select_list: null,
  cart_calc_modify_modal: false,
  avatar_modal: false
}

// 创建并导出 store
export default createStore({
  actions,
  mutations,
  state
})