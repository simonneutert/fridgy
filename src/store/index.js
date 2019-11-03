import api from '@/api'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentViewTitle: 'Login',
    currentUser: false,
    loginState: 'loggedOut',
    products: [{
      name: 'Unloaded'
    }],
    ledgers: [{
      test: 'tt'
    }],
    ledgersSum: 0.0,
    users: [],
    cart: []
  },
  mutations: {
    INITIALISE_STORE (state) {
      if (localStorage.getItem('store')) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store')))
        )
      }
    },
    LOGIN (state, user) {
      state.loginState = 'loggedIn'
      state.cart = []
      state.ledgers = []
      state.ledgersSum = 0.0
      state.currentUser = user
    },
    LOGOUT (state) {
      state.loginState = 'loggedOut'
      state.currentUser = false
      state.cart = []
      state.ledgers = []
      state.ledgersSum = 0.0
    },
    ADD_TO_CART ({
      cart
    }, product) {
      cart.push(product)
    },
    REMOVE_FROM_CART ({
      cart
    }, idx) {
      cart.splice(idx, 1)
    },
    SET_LEDGERS (state, {
      ledgers
    }) {
      state.ledgers = ledgers
    },
    SET_LEDGERS_SUM (state, {
      ledgersSum
    }) {
      state.ledgersSum = ledgersSum
    }
  },
  getters: {
    cartCount ({
      cart
    }) {
      return cart.length
    },
    cartSum ({
      cart
    }) {
      return cart.reduce(function (prev, item) {
        return prev + item.price
      }, 0)
    }
  },
  actions: {
    addToCart (context, {
      product
    }) {
      context.commit('ADD_TO_CART', product)
    },
    removeFromCart (context, {
      idx
    }) {
      context.commit('REMOVE_FROM_CART', idx)
    },
    async refreshLedgers (context) {
      let ledgers = await api.getLedgers(this.state.currentUser.id)
      context.commit('SET_LEDGERS', {
        ledgers
      })
    },
    async refreshLedgersSum (context) {
      let ledgersSum = await api.getLedgersSum(this.state.currentUser.id)
      context.commit('SET_LEDGERS_SUM', {
        ledgersSum
      })
    },
    async refreshProducts ({
      state
    }) {
      state.products = await api.getProducts()
    },
    async refreshUsers ({
      state
    }) {
      state.users = await api.getUsers()
    },
    login (context, user) {
      context.commit('LOGIN', user)
      context.dispatch('refreshLedgers')
      context.dispatch('refreshLedgersSum')
    },
    logoutAction () {
      Vue.router.push('/')
      this.commit('LOGOUT')
    },
    checkoutCart ({
      state
    }) {
      let audio = new Audio('/static/checkout.mp3')
      audio.play()
      Promise.all(state.cart.map(async (product) => api.createLedger({
        userId: state.currentUser.id,
        productId: product.id,
        amount: product.price * -1,
        purpose: 'Einkauf: ' + product.name,
        date: Date.now()
      }))).then((e) => {
        this.dispatch('refreshLedgersSum')
        // Triggers Logout.vue
        state.loginState = 'loggingOut'
        if (state.cart.length === 0) {
          this.dispatch('logoutAction')
        }
      })
    },
    chargeBalance (context, {
      amount
    }) {
      api.createLedger({
        userId: context.state.currentUser.id,
        amount: amount * 1,
        purpose: 'Einzahlung: ' + amount.toLocaleString('de-DE', {
          style: 'currency',
          currency: 'EUR'
        }),
        date: Date.now()
      }).then(
        (e) => {
          // context.dispatch('refreshLedgers')
          context.dispatch('refreshLedgersSum')
          let audio = new Audio('/static/charge.mp3')
          audio.play()
        })
    }
  }
})
