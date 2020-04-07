<template>
  <v-date-picker
    v-model="date"
    :locale="datePickerLocale"
    :weekday-format="weekFormat"
    :month-format="monthFormat"
    :first-day-of-week="1"
    :title-date-format="titleDateFormat"
    :show-current="true"
    width="auto">
  </v-date-picker>
</template>

<script>
    import ruDatepicker from "vuetify/lib/locale/ru"

    const weekDayName = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"]
    const monthName = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"]
    export default {
        data: () => {
            return {
                name: "datePicker",
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

            }
        },
    }
</script>

<style scoped>

</style>
