import carousel from '@/js/util/symbols/carousel'

export default {
  inject: { carousel },
  props: {
    tag: {
      type: String,
      default: 'p',
    },
    tabindex: {
      type: String,
      default: '0',
    },
    index: {
      type: String,
      default: '0',
    },
  },
  computed: {
    items() {
      return this.carousel.items
    },
    currentItemIndex() {
      return this.carousel.currentItemIndex || 0
    },
    isMobile() {
      return window.innerWidth < 1024
    },
    evaluateItem() {
      return this.carousel.currentItemIndex === parseInt(this.index, 10)
    },
  },
  created() {
  },
  methods: {
    emitEvent(...events) {
      this.carousel.$emit(...events)
    },
  },
  render(createElement) {
    const elementData = {
      on: {
        keydown: (event) => {
          if (event.key === 'Tab' && !event.shiftKey) {
            if (!this.isMobile || this.currentItemIndex !== this.items.length - 1) {
              event.preventDefault()
              this.emitEvent('select:slider:next')
            } else if (this.isMobile && this.currentItemIndex !== this.items.length - 1) {
              this.carousel.$emit('select:slider:next', this.items[this.currentItemIndex])
            }
          }
        },
      },
      attrs: {
        tabindex: !this.isMobile ? this.tabindex : '0',
        'aria-hidden': !this.evaluateItem ? 'true' : 'false',
      },
    }
    return createElement(this.tag, elementData, this.$slots.default)
  },
}
