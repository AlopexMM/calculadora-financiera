import axios from 'axios'

export async function bluelyticsHistorical(date) {
    /**
    * Get the historical data of dollar
    * @param String with the format yyyy-MM-dd
    * @returns Object with dollar blue and oficial 
    */
    const params = {
        day: date
    }
    const url = 'https://api.bluelytics.com.ar/v2/historical'
    let data = {}
    await axios.get(url, { params: params })
    .then(res => { data = res.data })
    .catch(err => { console.log(err) })
    return data
}

export async function bluelyticsLatest() {
    /**
     * Get the price of dollar at that moment
     * @returns Object with dollar blue and oficial
     */
    const url = 'https://api.bluelytics.com.ar/v2/latest'
    let data = {}
    await axios.get(url)
    .then(res => { data = res.data })
    .catch(err => { console.log(err) })
    return data
}

export function salaryCheck(salary) {
    /**
     * This check if salary is grater than 0
     * @param String salary
     * @returns Boolean
     */
    if (isNaN(salary)) return false
    if (parseFloat(salary) > 0) return true
    return false
}

export function currencyFormat(amount) {
    let currency = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'})
    return currency.format(amount)
}
