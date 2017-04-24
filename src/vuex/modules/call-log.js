import call from '../../api/call-log'
import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
  list: [],
  next_page: true
}

// getters
const getters = {
  callLogCurrentList: state => state.list,
  callLogCurrentListNextPage: state => state.next_page
}

// actions
const actions = {
  getCurrentList ({ commit, state }, params) {
    call.getCurrentList(params).then((res) => {
      const list = res.data.data
      commit(types.CALLLOG_REQUEST_CURRENT_LIST, list)
    })
  },
  getCurrentListMore ({ commit, state }, params) {
    call.getCurrentList(params).then((res) => {
      const list = res.data.data
      commit('calllog_request_current_list_more', list)
    })
  }
}

// mutations
const mutations = {
  [types.CALLLOG_REQUEST_CURRENT_LIST] (state, list, page) {
    // clear cart
    state.list = list
    if (list.length === 0) {
      state.next_page = false
    }
  },
  calllog_request_current_list_more (state, list, page) {
    state.list = [...state.list, ...list]
    if (list.length === 0) {
      state.next_page = false
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
