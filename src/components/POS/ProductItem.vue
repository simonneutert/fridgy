<template>
  <transition name="fade">
    <div class="productItem" v-on:click='onClick({product: product, idx: idx})'>
        <strong>{{product.name}}</strong><br>
      <div v-if="compact!='true'">
        <span class="description">{{product.description}}</span>
      </div>
      <p>
        <span class="price">
          {{product.price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}}
        </span>
      </p>
      
    </div>
  </transition>
</template>

<script>

export default {
  name: 'ProductItem',
  props: {
    idx: Number,
    product: Object,
    onClick: Function,
    compact: false
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.productItem{
  padding: 15px;
  background: #FFF;
  color: #555;
  width: 160px;
  min-height: 120px;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
  cursor: pointer;
  position: relative;
  border-radius: 3px;
}

.productItem:active{
  transform: scale(0.95);
  opacity: 0.7;
}

.price{
  font-size: 12px;
  font-weight: bold;
  float: right;
  position: absolute; 
  bottom: 10px;
  right: 10px;
}
</style>
