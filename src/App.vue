<template>
  <div class="container">
    <nav class="bd-navbar navbar">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <figure class="image">
            <img src="./assets/logo.png" alt="logo">
          </figure>
        </router-link>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
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
  <br>
  <section class="section">
    <router-view :oficialToday="this.dollar.oficial"/>
  </section>
  <footer class="footer">
  <div class="content has-text-centered">
    <p>
      <strong>Calculadora financiera</strong> por <a href="https://mariomori.ar">Mario Mori</a>. The source code is licensed
      <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
    </p>
  </div>
</footer>
</template>

<style lang="scss">
@import '../node_modules/bulma/';

</style>

<script>
import axios from 'axios'

export default {
  name: "App",
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
