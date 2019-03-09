// import Vue from 'vue'
import axios from 'axios'

var baseUrl = process.env.VUE_APP_BACKEND_API_URL || 'http://localhost:8081/'

const client = axios.create({
  baseURL: baseUrl,
  json: true
})

export default {
  async execute (method, resource, data) {
    // inject the accessToken for each request
    // let accessToken = await Vue.prototype.$auth.getAccessToken()
    return client({
      method,
      url: resource,
      data
      // headers: {
      //   Authorization: `Bearer ${accessToken}`
      // }
    }).then(req => {
      return req.data
    })
  },
  getUsers () {
    return this.execute('get', '/users')
  },
  getUser (id) {
    return this.execute('get', `/users/${id}`)
  },
  createUser (data) {
    return this.execute('post', '/users', data)
  },
  updateUser (id, data) {
    return this.execute('put', `/users/${id}`, data)
  },
  deleteUser (id) {
    return this.execute('delete', `/users/${id}`)
  },
  getProducts () {
    return this.execute('get', '/products')
  },
  getProduct (id) {
    return this.execute('get', `/products/${id}`)
  },
  createProduct (data) {
    return this.execute('post', '/products', data)
  },
  updateProduct (id, data) {
    return this.execute('put', `/products/${id}`, data)
  },
  deleteProduct (id) {
    return this.execute('delete', `/products/${id}`)
  },
  createLedger (data) {
    return this.execute('post', '/ledger', data)
  },
  getCurrenttUser () {
    return this.execute('get', `/current_user`)
  },
  deleteCurrenttUser () {
    return this.execute('delete', `/current_user`)
  }
}
