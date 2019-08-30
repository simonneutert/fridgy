<template>
  <div class="pos">
    <Login v-if="loginState=='loggedOut'" v-bind:loginCallback="login" />
    <Logout v-if="loginState=='loggingOut'"/>
    <div v-if="loginState=='loggedIn'">
      <div style="margin-right: 330px;">
        <div style="padding: 0px 60px 0px 30px;">
          <div v-if="ledgersSum >= -3.0">
            <h3>Produkte</h3>
            <ProductList v-bind:items='products' v-bind:onProductClick='addToCart' />
          </div>
          <div v-else>
            <h3>
              Bezahle deine Schulden in Höhe von {{ledgerDebtValue(ledgersSum)}}, dann geht es auch weiter!
              <b-card :title="Paypal" style="text-align:center;">
                <img src="/static/img/paypal-simon.gif" />
              </b-card>
            </h3>
          </div>
        </div>
      </div>
      <div class="cart_sidebar">
        <h3><v-icon name="shopping-cart"></v-icon> Warenkorb ({{cartCount}})</h3>
        <div class="cart_items">
          <div v-if='cartCount==0'>
            &laquo; Bitte wähle links die gewünschten Produkte aus
          </div>
            <ProductList v-bind:items='cart' v-bind:onProductClick='removeFromCart' compact="true" />
        </div>
        <div class="total" v-if="ledgersSum >= -3.0">
          <button v-on:click='checkoutCart()'>Checkout</button>
          <div style="float: right;">{{cartSum.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Login from '@/components/POS/Login'
import Logout from '@/components/POS/Logout'
import ProductList from '@/components/POS/ProductList'
import api from '@/api'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Main',
  data () {
    return {
      state: 'loggedOut',
      ledgerDebtValue (ledgersSum) {
        if (ledgersSum) {
          return ledgersSum.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
        } else {
          return 0.0
        }
      }
    }
  },
  created () {
    this.refreshProducts()
    this.refreshUsers()
    // rfid reader and autologin check is disabled by default
    if (process.env.VUE_APP_RFID) {
      this.backgroundLogin = function () {
        // GET http://localhost:8081/user
        console.log('Checking RFID...')
        api.getCurrenttUser().then(function (currentUser) {
          console.log('-> Received RFID...')
          console.log(this.currentUser)
          // && this.$store.currentUser && (currentUser.id !== this.$store.currentUser.id)
          if (this.currentUser === false || (this.currentUser && currentUser && this.currentUser.id !== currentUser.id)) {
            console.log('RFIDLogin')
            this.login(currentUser)
          }
          this.timer = setTimeout(this.backgroundLogin.bind(this), 1000)
        }.bind(this), function () {
          this.timer = setTimeout(this.backgroundLogin.bind(this), 1000)
        }.bind(this))
      }
      this.timer = setTimeout(this.backgroundLogin.bind(this), 1000)
    }
    this.$store.state.currentViewTitle = 'fridgy - serving customers since 2019'
    console.log('INIT')
  },
  computed: {
    ...mapState(['products', 'cart', 'loginState', 'currentUser', 'ledgers', 'ledgersSum']),
    ...mapGetters(['cartCount', 'cartSum'])
  },
  components: { Login, Logout, ProductList },
  methods: {
    ...mapActions(['removeFromCart', 'login', 'addToCart', 'refreshProducts', 'refreshUsers', 'checkoutCart'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.total{
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 15px 30px 30px;
  font-size: 36px;
  font-weight: lighter;
}

.cart_sidebar{
  background: rgba(0,0,0,0.1);
  /* background: #1A79E3; */
  position: fixed;
  right: 0;
  top: 55px;
  bottom: 0;
  width: 350px;
  padding: 30px;
  box-shadow: inset 8px 0 8px -8px rgba(0,0,0,0.2);
}

.cart_items{
  position: absolute;
  top: 70px;
  left: 30px;
  right: 20px;
  padding-right: 10px;
  bottom: 10px;
  margin-bottom: 100px;
  overflow: auto;
}
</style>
