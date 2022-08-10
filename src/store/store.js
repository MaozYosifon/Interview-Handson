import Vuex from 'vuex'

// import { userStore } from './modules/user.store.js'
import { taskStore } from './modules/task.store.js'

export const store = Vuex.createStore({
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
