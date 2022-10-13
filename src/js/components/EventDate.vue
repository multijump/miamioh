<template>
  <div :aria-label="formattedDate">
    {{ formattedValue }}
  </div>
</template>

<script>
export default {
  props: {
    eventDate: {
      type: String,
      required: true,
    },
    eventName: {
      type: String,
      default: '',
    },
  },
  computed: {
    formattedDate() {
      const MONTHES = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]
      const { eventDate } = this
      const rawDate = new Date(eventDate)
      const year = rawDate.getFullYear()
      const month = MONTHES[rawDate.getMonth()]
      const days = `${rawDate.getDate()}`

      const formatDate = `${month} ${days}, ${year}`

      return formatDate
    },

    formattedValue() {
      return this.eventName ? `${this.formattedDate} | ${this.eventName}` : this.formattedDate
    },
  },
}
</script>
