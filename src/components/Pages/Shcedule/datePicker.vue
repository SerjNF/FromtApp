<template>
  <v-date-picker
    v-model="date"
    :locale="datePickerLocale"
    :weekday-format="weekFormat"
    :month-format="monthFormat"
    :first-day-of-week="1"
    :title-date-format="titleDateFormat"

    :show-current="currentDate"

    width="auto">
  </v-date-picker>

</template>

<script>
    import ruDatepicker from "vuetify/lib/locale/ru"

    const weekDayName = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"]
    const monthName = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"]
    export default {
        props: ['somedata'],
        data: () => {
            return {
                name: 'datePicker',
                currentDate : new Date().toISOString().substr(0, 10),
                datePickerLocale: "ruDatepicker",
                date: new Date().toISOString().substr(0, 10),
            }
        },
        methods: {
            monthFormat(date){
                let i = new Date(date).getMonth(date)
                return monthName[i]
            },

            weekFormat(date){
                let i = new Date(date).getDay(date)
                return weekDayName[i]
            },

            titleDateFormat(date){
                return new Date(date).toLocaleDateString()
            },
        },

        watch: {
            date: function(){
                this.$emit('setCurrentDate', this.date);
            },

            somedata: function () {
                this.date = this.somedata.split(".").reverse().join("-")
            }
        },
    }
</script>

<style scoped>

</style>
