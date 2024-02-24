<template>
  <div class="container mt-2">
    <nav class="level">
      <router-link to="/" class="level-item has-text-centered">
        <figure class="image is-48x48">
          <img src="../assets/logo.png" alt="logo">
        </figure>
      </router-link>
    </nav>
    <nav class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Dolar Oficial Compra</p>
          <p class="title">{{ oficialCompra }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Dolar Oficial Venta</p>
          <p class="title">{{ oficialVenta }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Dolar Blue Compra</p>
          <p class="title">{{ blueCompra }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Dolar Blue Venta</p>
          <p class="title">{{ blueVenta }}</p>
        </div>
      </div>
    </nav>
  </div>
</template>


<script>
import { bluelyticsLatest } from '@/assets/tools'

export default {
  data() {
    return {
      oficialVenta: 0,
      oficialCompra: 0,
      blueVenta: 0,
      blueCompra: 0,
    }
  },
  methods: {
    async getDollarPrices() {
      const dollarPrice = await bluelyticsLatest()
      this.oficialVenta = dollarPrice.oficial.value_sell
      this.oficialCompra = dollarPrice.oficial.value_buy
      this.blueVenta = dollarPrice.blue.value_sell
      this.blueCompra = dollarPrice.blue.value_buy
    },
  },
  async created() {
    await this.getDollarPrices()
  },
}
</script>