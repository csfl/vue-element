import jsCookies from 'js-cookie'
export default class Cookies {
  static set (key, value) {
    jsCookies.set(key, value)
  }
  static get (key) {
    return jsCookies.get(key)
  }
  static remove (key) {
    jsCookies.remove(key)
  }
}
