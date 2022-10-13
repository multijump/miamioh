<template>
  <div>
    <slot/>
  </div>
</template>

<script>
import createFocusTrap from 'focus-trap'

export default {
  props: {
    trapActive: {
      type: Boolean,
      default: false,
    },
    initialFocus: {
      default: undefined,
      validator: prop => typeof prop === 'function' || prop instanceof HTMLElement,
    },
  },
  data() {
    return {
      trap: undefined,
      mounted: false,
    }
  },

  watch: {
    trapActive: 'handleActive',
  },

  beforeDestroy() {
    this.deactivateTrap()
    this.trap = undefined
  },

  methods: {
    handleActive(active) {
      if (active) {
        this.trap = createFocusTrap(
          this.$el,
          {
            escapeDeactivates: true,
            allowOutsideClick: () => true,
            initialFocus: this.initialFocus || (() => this.$el),
          },
        )

        return
      }

      this.deactivateTrap()
    },
    deactivateTrap() {
      if (this.trap) {
        this.trap.deactivate()
      }
    },
  },
}
</script>
