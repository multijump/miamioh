<template>
  <p>
    {{ formattedValue }}
  </p>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    decimalCount: {
      type: Number,
      default: 0,
    },
    decimal: {
      type: String,
      default: '.',
    },
    thousands: {
      type: String,
      default: ',',
    },
  },
  computed: {
    formattedValue() {
      const { value, decimal, thousands } = this
      if (isNaN(value)) {
        return value
      }
      let decimalCount = Math.abs(this.decimalCount)
      decimalCount = isNaN(decimalCount) ? 0 : decimalCount
      const negativeSign = value < 0 ? '-' : ''
      let amount = 0
      const i = parseInt(amount = Math.abs(Number(value) || 0).toFixed(decimalCount), 10).toString()
      const j = (i.length > 3) ? i.length % 3 : 0
      const formattedNumber1 = j ? i.substr(0, j) + thousands : ''
      const formattedNumber2 = i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousands}`)
      const formattedNumber3 = decimalCount ? `${decimal}${Math.abs(amount - i).toFixed(decimalCount).slice(2)}` : ''
      const formattedNumber = `${negativeSign}${formattedNumber1}${formattedNumber2}${formattedNumber3}`
      return formattedNumber
    },
  },
}
</script>
