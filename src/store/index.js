import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
Vue.use(Vuex)

// export a vue store to store
export default new Vuex.Store({
  // state stores global shared data
  state,
  mutations
}
)
