<template>
  <div class="container-fluid mt-4">
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-alert :show="errorMsg" variant="danger" dismissible>{{ errorMsg }}</b-alert>
    <b-row>
      <b-col>
        <b-jumbotron lead="Dein Kontostand">
          <template slot="header">{{ ledgerDebt(ledgersSum) }}</template>
        </b-jumbotron>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Datum</th>
              <th>Vorgang</th>
              <th>Buchung</th>
              <th>Storno?</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ledger in ledgers" :key="ledger.id">
              <td>{{ new Date(ledger.date).toLocaleDateString("de-DE") + ' ' + new Date(ledger.date).toLocaleTimeString("de-DE") }}</td>
              <td>{{ ledger.purpose }}</td>
              <td>{{ ledger.amount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }) }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="refund(ledger)">STORNO KASSE 3</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="'Konto aufladen'" style="text-align:center;">
          <p>
            <span>Zahlung per Paypal an Simon oder ihm bar bezahlen, dann Button drücken:</span>
          </p>
          <p>
            <button v-on:click="chargeBalance({amount: 5})">5 EUR</button>
          </p>
          <p>
            <button v-on:click="chargeBalance({amount: 10})">10 EUR</button>
          </p>
          <p>
            <button v-on:click="chargeBalance({amount: 15})">15 EUR</button>
          </p>
          <p>
            <button v-on:click="chargeBalance({amount: 20})">20 EUR</button>
          </p>
        </b-card>

        <br />

        <b-card :title="Paypal" style="text-align:center;">
          <img src="/static/img/paypal-simon.gif" />
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      errorMsg: null,
      loading: false,
      model: {}
    }
  },
  async created () {
    if (!this.currentUser.id) {
      this.$router.push('/')
    }
    this.$store.state.currentViewTitle = 'Mein Konto'
  },
  computed: {
    ...mapState([
      'users',
      'cart',
      'loginState',
      'currentUser',
      'ledgers',
      'ledgersSum'
    ]),
    ...mapActions(['refreshLedgers', 'refreshLedgersSum'])
  },
  methods: {
    ...mapActions(['chargeBalance']),
    refund (ledger) {
      var audio = new Audio('/static/storno.mp3')
      audio.play()
      this.errorMsg = 'Oh no - Wir erlauben kein Storno...'
    },
    ledgerDebt (ledgersSum) {
      return ledgersSum.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
    }
  }
}
</script>
