import Vue from 'vue'

export default {

  /**
   * 初始化Axios
   */
  init () {
    Vue.axios.defaults.baseURL = 'http://47.107.241.57:8080/Entity/U1c365fdb24129c/hospital/'
    Vue.axios.defaults.headers.post['Content-Type'] = 'application/json'
    Vue.axios.defaults.timeout = 5000
  },

  /**
   * post请求封装方案
   * @param url {string} 请求路径
   * @param data {object} 请求的数据
   * @returns {Promise} Promise对象，用于异步请求
   */
  post (url, data) {
    return Vue.axios({
      method: 'post',
      url: url,
      // 对象变点  device[id] => device.id
      data: data
    })
  },

  /**
   * patch请求封装方案
   * @param url {string} 请求路径
   * @param data {object} 请求的数据
   * @returns {Promise} Promise对象，用于异步请求
   */
  patch (url, data) {
    return Vue.axios({
      method: 'patch',
      url: url,
      data: data
    })
  },

  /**
   * put请求封装方案
   * @param url {string} 请求路径
   * @param data {object} 请求的数据
   * @returns {Promise} Promise对象，用于异步请求
   */
  put (url, data) {
    return Vue.axios({
      method: 'put',
      url: url,
      data: data
    })
  },

  /**
   * delete请求封装方案
   * @param url {string} 请求路径
   * @returns {Promise} Promise对象，用于异步请求
   */
  delete (url) {
    return Vue.axios({
      method: 'delete',
      url: url
    })
  },
  /**
   * get请求封装方案
   * @param url {string} 请求路径
   * @param data {object} 请求参数
   * @returns {Promise} Promise对象，用于异步请求
   */
  get (url, data = null) {
    return Vue.axios({
      method: 'get',
      url: url,
      params: data
    })
  }
}
