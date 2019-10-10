<template>
  <div>
    <ProductItemInCart
      v-for="(product,index) in items"
      v-bind:key="index"
      v-bind:idx="index"
      v-bind:product="product"
      v-bind:compact="compact"
      v-bind:onClick="onProductClick"
    />
  </div>
</template>

<script>
import ProductItemInCart from '@/components/POS/ProductItemInCart'

export default {
  name: 'ProductList',
  props: {
    items: Array,
    onProductClick: Function,
    compact: false
  },
  components: { ProductItemInCart }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
