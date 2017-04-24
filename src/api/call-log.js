import http from "../config/http"

const api = http()

export default {
  getCurrentList(params) {
    return api.get('user/calllog/current/list', params)
  }
}
