<template xmlns="http://www.w3.org/1999/html">
  <div id="app">
    <header>
      <span class="time">{{currentTime}}</span>
      <span class="user" v-if="currentUser">
        <a v-on:click="logoutAction()" class="logout" href="javascript:void(0)">Logout</a>
        <v-icon name="user"></v-icon> <router-link to="/me"><a style="color:#fff">{{currentUser.name}}
        <small>
          ({{ ledgerDebt(ledgersSum) }})
          </small>
        </a></router-link>
      </span>
      <span><router-link to="/"><a style="color:#fff"><v-icon name='beer'></v-icon> {{currentViewTitle}}</a></router-link></span>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'

  export default {
    name: 'app',
    data () {
      return {
        ledgerDebt (ledgersSum) {
          return (ledgersSum).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
        }
      }
    },
    created () {
      this.currentTime = ''
      setInterval((e) => {
        this.currentTime = new Date().toLocaleTimeString('de-DE', {hour: '2-digit', minute: '2-digit'})
      }, 1000)
    },
    computed: {
      ...mapState(['currentUser', 'currentViewTitle', 'ledgers', 'ledgersSum']),
      ...mapActions(['logoutAction'])
    }
  }
</script>

<style>
body{
  background-color: #4096ee;
  @include filter-gradient(#4096ee, #4096ee, vertical);
  @include background-image(linear-gradient(top, #4096ee 0%,#4096ee 100%));
  color: #eee;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}

button{
  background: rgba(0, 0, 0, 0.2);
  background: #3FCA8C;
  font-size: 22px;
  font-weight: lighter;
  padding: 8px 15px ;
  border: none;
  border-radius: 5px;
  margin: 2px auto;
  color: white;
  cursor: pointer;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.1);
}

button:active{
  opacity: 0.6;
  transform: scale(0.95);
}

.card {
  background-color:#1a79e3;
  color:white;
}

.table , .table a{
  color:#fff;
}

.jumbotron {
  background: #1979e3;
  padding:2rem 1rem;
}

.time{
  padding: 20px;
  float: right;
  opacity: 0.5;
}

.user{
  padding: 20px;
  float: right;
  z-index: 3;
}

.user a.logout{
  background: rgb(243, 82, 82);
  border-radius: 3px;
  padding: 5px 8px;
  color: white;
  margin-right:15px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #1a79e3;
  color: #ffffff;
  box-shadow: 0 0 3px rgba(0,0,0,0.2);
}

header span {
  display: inline-block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
