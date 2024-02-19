<template>
    <div class="columns">
      <div class="column" >
        <div class="card" style="height:300px;">
          <div class="card-content">
            <div class="content">
              <p>Coloque su sueldo en pesos y seleccione la fecha en la que recibio ese sueldo por primera vez.</p>
              <p>Luego presione en calcular.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card" style="height:300px;">
          <div class="card-content">
            <div class="content">
              <div class="field">
                <div class="control has-icons-right" v-if="salaryCheck">
                    <input type="text" class="input" placeholder="Sueldo en pesos" ref="salaryInPesos">
                </div>
                <div class="control has-icons-right" v-else>
                    <input type="text" class="input is-danger" placeholder="Sueldo en pesos" ref="salaryInPesos">
                    <p class="help is-danger">No se puede ingresar un valor igual o menor a 0, ni estar vacio.</p>
                </div>
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
        <div class="card" style="height:300px;">
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
              <h6 class="subtitle is-6">Hubo una variacion del {{ salaryPercentageDifference.toFixed(2) }}%</h6>
              <br>
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
        salaryPercentageDifference: 0,
        bluelyticsHistoricalUrl: "https://api.bluelytics.com.ar/v2/historical",
        bluelyticsLatestUrl: "https://api.bluelytics.com.ar/v2/latest",
        salaryCheck: true,
      }
    },
    components: {
      Datepicker
    },
    methods: {
      updateDate(d) {
        this.dateStr = d
      },
      async calculateSalary() {

        // Validate the salary
        const salary = this.validateSalary()

        // Calculate the salary
        if (this.salaryCheck) {
            let oficialHistorical = 0
            let oficialToday = 0

            // Get historical data from bluelytics
            await axios.get(this.bluelyticsHistoricalUrl, {
            params:{
                day: this.dateStr,
            }
            }).then((response) => {
            oficialHistorical = response.data.oficial.value_sell
            }).catch(error => (console.log(error)))

            await axios.get(this.bluelyticsLatestUrl)
            .then(res => {
                oficialToday = res.data.oficial.value_sell
            })
            .catch( err => console.log(err))
            
            // Salary in dollars
            this.salaryInDollars = parseFloat(salary) / oficialHistorical
    
            // Salary in pesos today
            this.salaryInPesosToday = this.salaryInDollars * oficialToday

            // Salary difference in percentage
            this.salaryPercentageDifference = (this.salaryInPesosToday - parseFloat(salary)) / parseFloat(salary) * 100
        }
        
      },

      validateSalary() {
            const salary = this.$refs.salaryInPesos.value
            if (salary == '') {
                this.salaryCheck = false
            }
            if (parseFloat(salary) <= 0) {
                this.salaryCheck = false
                this.$refs.salaryInPesos.value = ''
            }
            if (parseFloat(salary) > 0) {
                this.salaryCheck = true

            }
            return salary
        },
    },
  }
  </script>