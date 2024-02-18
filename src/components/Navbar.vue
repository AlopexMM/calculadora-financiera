<template>
    <div class="container">
    <nav class="bd-navbar navbar">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <figure class="image">
            <img src="../assets/logo.png" alt="logo">
          </figure>
        </router-link>
      </div>
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