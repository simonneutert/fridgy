<template>
  <transition name="fade">
    <div class="productItemInCart" v-on:click='onClick({product: product, idx: idx})'>
      <p class="title">
        {{product.name}} <span class="price">{{product.price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}}</span>
      </p>
      <div v-if="compact!='true'">
        <span class="description">{{product.description}}</span>
      </div>
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
.productItemInCart{
  padding: 5px 0 0 10px;
  background: #FFF;
  color: #555;
  width: 100%;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
  cursor: pointer;
  position: relative;
  border-radius: 3px;
}

.productItemInCart:active{
  transform: scale(0.95);
  opacity: 0.7;
}

.price{
  font-weight: lighter;
  float: right;
  position: absolute; 
  right: 10px;
}
</style>
