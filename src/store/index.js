import Vue from 'vue'
import Vuex from 'vuex'
import Graph from './modules/Graph'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Graph
  }
})