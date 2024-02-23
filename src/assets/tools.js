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
    const url = `${process.env.BASE_URL}/historical`

    await axios.get(url, { params: params })
    .then(res => { return res.data })
    .catch(err => { return err })
}

export async function bluelyticsLatest() {
    /**
     * Get the price of dollar at that moment
     * @returns Object with dollar blue and oficial
     */
    const url = `${process.env.BASE_URL}/latest`
    await axios.get(url)
    .then(res => { return res.data })
    .catch(err => { return err })
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

