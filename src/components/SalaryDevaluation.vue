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
                    <div class="control has-icons-right" v-if="enteredSalary == false">
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
            enteredSalary: false,
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
                    const dollarsHistorical = bluelyticsHistorical(this.dateStr)
                    const dollarsLatest = bluelyticsLatest()
                    // Salary in dollars
                    this.salaryInDollars = salaryInPesos / dollarsHistorical.oficial.value_sell
            
                    // Salary in pesos today
                    this.salaryInPesosToday = this.salaryInDollars * dollarsLatest.oficial.value_sell

                    // Salary difference in percentage
                    this.salaryPercentageDifference = (this.salaryInPesosToday - salaryInPesos) / salaryInPesos * 100
                } catch(err) {
                    console.log(err)
                }

                
            }
        },
    },
}
</script>