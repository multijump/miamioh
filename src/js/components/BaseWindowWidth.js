export default {
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    dispatch: {
      type: Boolean,
      default: true,
    },
    callback: {
      type: Function,
      default: () => ({}),
    },
  },

  data() {
    return {
      width: window.innerWidth,
    }
  },
  mounted() {
    window.addEventListener('resize', this.setWidth)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.setWidth)
  },

  methods: {
    setWidth() {
      this.width = window.innerWidth

      if (!this.callback) {
        return
      }

      this.callback(this.width)
    },
  },

  render(createElement) {
    const slotData = { width: this.width, small: this.width < 640 }
    const slotType = this.dispatch
      ? this.$scopedSlots.default(slotData)
      : this.$slots.default

    return createElement(this.tag, slotType)
  },
}
