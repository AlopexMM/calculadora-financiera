<template>
    <input type="date" ref="calendarTrigger">
</template>

<style scoped>
    @import '../../node_modules/bulma-calendar/dist/css/bulma-calendar.min.css';
</style>

<script>
import bulmaCalendar from '../../node_modules/bulma-calendar/dist/js/bulma-calendar'

export default {
    data() {
        return {
            date: new Date(),
        }
    },
    mounted(){
        
        const calendar = bulmaCalendar.attach(this.$refs.calendarTrigger, {
            startDate: this.date,
            lang: "es",
            dateFormat: "yyyy-MM-dd",
            color: "dark",
        })[0]
        calendar.on('select', e => {
            this.date = e.data.value()
            this.$emit('selectedDate', this.date)
        })
        this.$emit('selectedDate', this.$refs.calendarTrigger.value)
    }
}
</script>