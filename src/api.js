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
      data,
      headers: {
        Authorization: `Bearer xxx`
      }
    }).then(req => {
      return req.data
    })
  },
  // Users
  getCurrenttUser () {
    return this.execute('get', `/user`)
  },
  deleteCurrenttUser () {
    return this.execute('delete', `/user`)
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
  // Products
  getProducts () {
    return this.execute('get', '/products?sort=name')
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
  // Ledger
  createLedger (data) {
    return this.execute('post', '/ledgers', data)
  },
  getLedgers (userid) {
    return this.execute('get', `/ledgers?userId=${userid}&sort=-date`)
  },
  getLedgersSum (userid) {
    return this.execute('get', `/ledgers/sum/${userid}`)
  }
}
