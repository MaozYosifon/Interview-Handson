import Vuex from 'vuex'

// import { userStore } from './modules/user.store.js'
import { taskStore } from './modules/task.store.js'

const store = Vuex.createStore({
  strict: true,
  modules: {
    taskStore
  },
  state: {
  },
  mutations: {
  },
  actions: {

  }
})
export default store