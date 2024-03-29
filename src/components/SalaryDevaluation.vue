<template>
    <div class="card">
        <div class="card-content">
            <div class="content">
                <p>Coloque su sueldo en pesos y seleccione la fecha en la que recibio ese sueldo por primera vez.</p>
                <p>Luego presione en calcular.</p>
            </div>
            <hr>
            <div class="content">
                <div class="field">
                    <div class="control has-icons-right" v-if="enteredSalary">
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
            <hr>
            <div class="content">
                <article class="message is-warning" v-if="warning">
                    <div class="message-body">
                        Hubo un problema con la conexión de la API bluelytics.
                    </div>
                </article>
                <p>La tabla muestra su salario en dolares (segun el precio oficial) de la fecha {{ dateStr }}. <br> Si el mismo estuviera indexado cuanto seria.</p>
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
                        <td>{{ this.currencyFormat(salaryInDollars) }}</td>
                        </tr>
                        <tr>
                        <td>Pesos</td>
                        <td>{{ this.currencyFormat(salaryInPesosToday) }}</td>
                        </tr>
                    </tbody>
                </table>
                <h6 class="subtitle is-6">Hubo una variacion del {{ salaryPercentageDifference.toFixed(2) }}%</h6>
            </div>
        </div>
    </div>
</template>

<script>
import Datepicker from '@/components/Datepicker.vue'
import { bluelyticsHistorical, salaryCheck, bluelyticsLatest } from '@/assets/tools'

export default {
    data() {
        return {
            dateStr: 'YYYY-MM-DD',
            salaryInDollars: 0,
            salaryInPesosToday: 0,
            salaryPercentageDifference: 0,
            enteredSalary: true,
            warning: false,
        }
    },
    components: {
        Datepicker,
    },
    methods: {
        updateDate(d) {
            this.dateStr = d
        },
        async calculateSalary() {

            const salaryInPesos = parseFloat(this.$refs.salaryInPesos.value)

            // Calculate the salary
            if (salaryCheck(salaryInPesos)) {
                // Get historical data from bluelytics
                try {
                    const dollarHistorical = await bluelyticsHistorical(this.dateStr)
                    const dollarLatest = await bluelyticsLatest()
                    // Salary in dollars
                    this.salaryInDollars = salaryInPesos.toFixed(2) / dollarHistorical.oficial.value_sell.toFixed(2)
                    // Salary in pesos today
                    this.salaryInPesosToday = this.salaryInDollars.toFixed(2) * dollarLatest.oficial.value_sell.toFixed(2)
                    // Salary difference in percentage
                    this.salaryPercentageDifference = (this.salaryInPesosToday.toFixed(2) - salaryInPesos.toFixed(2)) / salaryInPesos.toFixed(2) * 100
                } catch(err) {
                    this.warning = true
                    console.log(err)
                }
            } else this.enteredSalary = false
        },
        currencyFormat(amount) {
            let currency = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'})
            return currency.format(amount)
        },
    },
}
</script>