<template>
    <div class="card">
        <div class="card-content">
            <div class="content">
                <p>Si conoce su sueldo en dolares calcule cuanto tendria que cobrar en pesos hoy</p>
            </div>
            <hr>
            <div class="content">
                <div class="field">
                    <div class="control has-icons-right" v-if="enteredSalary">
                        <input type="text" class="input" placeholder="Sueldo en dolares" ref="salaryInDollars">
                    </div>
                    <div class="control has-icons-right" v-else>
                        <input type="text" class="input is-danger" placeholder="Sueldo en dolares" ref="salaryInDollars">
                        <p class="help is-danger">No se puede ingresar un valor igual o menor a 0, ni estar vacio.</p>
                    </div>
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
                <table class="table is-fullwidth">
                    <thead>
                    <tr>
                        <th>Moneda</th>
                        <th>Monto</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Salario calculado con dolar blue</td>
                        <td>{{ currencyFormat(salaryFromDollarBlueToPesos) }}</td>
                    </tr>
                    <tr>
                        <td>Salario calculado con dolar oficial</td>
                        <td>{{ currencyFormat(salaryFromDollarOficialToPesos) }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import { salaryCheck, bluelyticsLatest } from '@/assets/tools.js'

    export default {
        data() {
            return {
                enteredSalary: true,
                warning: false,
                salaryFromDollarBlueToPesos: 0,
                salaryFromDollarOficialToPesos: 0,
            }
        },
        methods: {
            async calculateSalary(){
                const salaryInDollars = this.$refs.salaryInDollars.value
                if (salaryCheck(salaryInDollars)) {
                    try {
                        const dollarToday = await bluelyticsLatest()
                        this.salaryFromDollarBlueToPesos = parseFloat(salaryInDollars).toFixed(2) * dollarToday.blue.value_sell.toFixed(2)
                        this.salaryFromDollarOficialToPesos = parseFloat(salaryInDollars).toFixed(2) * dollarToday.oficial.value_sell.toFixed(2)
                    } catch (err) {
                        this.warning = true
                        console.log(err)
                    }
                } else this.enteredSalary = false
            },
            currencyFormat(amount) {
                let currency = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'})
                return currency.format(amount)
            },
        }
    }
</script>