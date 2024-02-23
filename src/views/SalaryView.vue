<template>
    <div class="columns">
      <div class="column">
        <DollarToPesos />
      </div>
      <div class="column">
        <SalaryDevaluation />
      </div>
    </div>
  </template>
  
  <script>
  import DollarToPesos from '@/components/DollarToPesos.vue';
  import SalaryDevaluation from '@/components/SalaryDevaluation.vue'
  
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
      DollarToPesos,
      SalaryDevaluation,
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
            this.salaryInDollars = salary / oficialHistorical
    
            // Salary in pesos today
            this.salaryInPesosToday = this.salaryInDollars * oficialToday

            // Salary difference in percentage
            this.salaryPercentageDifference = (this.salaryInPesosToday - salary) / salary * 100
        }
        
      },

      validateSalary() {
            const salary = parseFloat(this.$refs.salaryInPesos.value)
            if (isNaN(salary)) {
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