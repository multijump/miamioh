<template>
  <a
    :href="href"
    :target="target"
  />
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
    href: {
      type: String,
      default: '/',
    },
    target: {
      type: String,
      default: '_self',
    },
    location: {
      type: String,
      default: '',
    },
    startTime: {
      type: String,
      default: '',
    },
    endTime: {
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
      const { eventDate, eventName, startTime, endTime, location } = this
      const rawDate = new Date(eventDate)
      const year = rawDate.getFullYear()
      const month = MONTHES[rawDate.getMonth()]
      const days = `${rawDate.getDate()}th`

      const formatDate = `${month} ${days} ${year}, ${eventName}, ${startTime} - ${endTime}, ${location}`

      return this.ariaLabel ? this.ariaLabel : formatDate
    },
  },
}
</script>
