<template>
  <div class="columns">
    <div class="column" >
      <div class="card" style="height:250px;">
        <div class="card-content">
          <div class="content">
            <p>Coloque su sueldo en pesos y seleccione la fecha en la que recibio ese sueldo por primera vez.</p>
            <p>Luego presione en calcular.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="column">
      <div class="card" style="height:250px;">
        <div class="card-content">
          <div class="content">
            <div class="field">
              <input type="text" class="input" placeholder="Sueldo en pesos" ref="salaryInPesos">
            </div>
            <div class="field">
              <Datepicker @selectedDate="updateDate"/>
            </div>
            <div class="field">
              <div class="buttons">
                <div class="button is-dark" @click="calculateSalary">
                  Calcular
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column">
      <div class="card" style="height:250px;">
        <div class="card-content">
          <div class="content">
            <p>La tabla muestra su salario en dolares de la fecha {{ dateStr }}. <br> Si el mismo estuviera indexado cuanto seria.</p>
            <table class="table is-fullwidth">
              <thead>
                <tr>
                  <th>Moneda</th>
                  <th>Monto</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Dolares</td>
                  <td>$ {{ salaryInDollars.toFixed(2) }}</td>
                </tr>
                <tr>
                  <td>Pesos</td>
                  <td>$ {{ salaryInPesosToday.toFixed(2) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Datepicker from '@/components/Datepicker.vue';

export default {
  data() {
    return {
      dateStr : 'YYYY-MM-DD',
      salaryInDollars: 0,
      salaryInPesosToday: 0,
      bluelyticsUrl: "https://api.bluelytics.com.ar/v2/historical",
    }
  },
  components: {
    Datepicker
  },
  props: [
    "oficialToday",
  ],
  methods: {
    updateDate(d) {
      this.dateStr = d
    },
    async calculateSalary() {
      let oficial = 0
      // Get data from bluelytics
      await axios.get(this.bluelyticsUrl, {
        params:{
          day: this.dateStr,
        }
      }).then((response) => {
        oficial = response.data.oficial.value_sell
      }).catch(error => (console.log(error)))

      // Salary in dollars
      this.salaryInDollars = parseFloat(this.$refs.salaryInPesos.value) / oficial

      // Salary in pesos today
      this.salaryInPesosToday = this.salaryInDollars * this.oficialToday
    }
  },
}
</script>