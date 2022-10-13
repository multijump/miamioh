<template>
  <div>
    <highcharts :options="makeChart"/>
  </div>
</template>

<script>
export default {
  props: {
    series: {
      type: String,
      required: true,
    },
  },
  computed: {
    makeChart() {
      const { series } = this
      const parsedSeries = JSON.parse(series)
      const option = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
        },
        title: {
          text: '',
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false,
            },
            showInLegend: false,
          },
        },
        colors: [],
        series: [{
          name: '',
          colorByPoint: true,
          data: [],
        }],
        credits: {
          enabled: false,
        },
      }

      for (let i = 0; i < parsedSeries.length; i += 1) {
        const item = parsedSeries[i]
        option.colors.push(item.option.color)

        option.series[0].data.push({
          name: item.option.text,
          y: item.option.percentage,
        })
      }

      return option
    },
  },
}
</script>
