import Vuex from 'vuex'
import call from './modules/call-log'

export default function (Vue) {

 Vue.use(Vuex)
 return new Vuex.Store({
   modules: {
     call
   }
 })
}

// store.commit('increment')
// console.log(store.state.count) // -> 1
