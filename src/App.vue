<template>
  <Navbar />  
  <br>
  <section class="section">
    <router-view />
  </section>
  <footer class="footer mt-auto">
    <div class="content has-text-centered">
      <p>
        <strong>Calculadora financiera</strong> por <a href="https://mariomori.ar">Mario Mori</a>. El codigo se encuentra bajo licencia
        <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
      </p>
  </div>
</footer>
</template>

<style lang="scss">
@import '../node_modules/bulma/';

</style>

<script>
import Navbar from './components/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>
