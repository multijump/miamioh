<template>
  <div
    v-show="!closed"
    class="alerts"
  >
    <div class="alerts__text-container">
      <span class="alerts__text-heading">{{ heading }} :</span>
      <span class="alerts__text-copy">{{ copy }}</span>
    </div>
    <div class="alerts__button-container">
      <button :class="btnClasses">Learn More</button>
      <button
        :class="btnClasses"
        @click="close"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    heading: {
      type: String,
      required: true,
    },
    copy: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'success',
    },
    classObject: {
      type: String,
      default: 'alerts--success',
    },
    mode: {
      type: String,
      default: 'light',
    },
  },
  data() {
    return {
      closed: false,
      btnClasses: `base-btn-primary base-btn-primary--${this.mode}`,
    }
  },
  mounted() {
    document.getElementById('alerts-base').appendChild(this.$el)
  },
  methods: {
    close() {
      this.closed = true
    },
  },
}
</script>
