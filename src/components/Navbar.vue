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
          <p class="heading">Dolar Oficial</p>
          <p class="title">{{ dollarOficial }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Dolar Blue</p>
          <p class="title">{{ dollarBlue }}</p>
        </div>
      </div>
    </nav>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  data() {
    return {
      bluelyticsUrl: "https://api.bluelytics.com.ar/v2/latest",
      dollar: {
        oficial: 0.0,
        blue: 0.0
      }
    }
  },
  computed: {
    dollarOficial() {
      if (this.dollar.oficial === 0.0) {
        this.dollarCardsUpdate()
      }
      return this.dollar.oficial
    },
    dollarBlue() {
      if (this.dollar.blue === 0.0) {
        this.dollarCardsUpdate()
      }
      return this.dollar.blue
    }
  },
  methods: {
    dollarCardsUpdate(){
      axios.get(this.bluelyticsUrl)
      .then((response) => {
        this.dollar["oficial"] = response["data"]["oficial"]["value_sell"]
        this.dollar["blue"] = response["data"]["blue"]["value_sell"]
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>