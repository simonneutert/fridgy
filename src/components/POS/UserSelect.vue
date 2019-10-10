<template>
  <div class="user" v-on:click="click(user)">
    <div class="avatar">
      {{user.name.substr(0,1)}}
    </div>
    <div class="username">
      {{user.name}}
    </div>
  </div>
</template>

<script>

export default {
  name: 'UserSelect',
  props: {
    idx: Number,
    user: Object,
    click: Function
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user{
  width: 100px;
  margin-right: 10px;
  text-align: center;
  float: left;
  cursor: pointer;
}

.avatar{
  background: orange;
  border-radius: 99px;
  height: 50px;
  width: 50px;
  font-size: 30px;
  padding-top: 5px;
  margin: auto;
  margin-bottom: 5px;
}  
</style>
