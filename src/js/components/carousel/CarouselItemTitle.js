import carousel from '@/js/util/symbols/carousel'

export default {
  inject: { carousel },
  props: {
    tag: {
      type: String,
      default: 'h3',
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
    this.carousel.$on('set:item:title', this.focusTitle)
  },
  methods: {
    focusTitle() {
      this.$el.focus()
    },
  },
  render(createElement) {
    const elementData = {
      on: {
        keydown: (event) => {
          if (event.key === 'Tab' && event.shiftKey && !this.isMobile) {
            event.preventDefault()
            this.carousel.$emit('select:slider:self')
          } else if (event.key === 'Tab' && event.shiftKey && this.isMobile) {
            this.carousel.$emit('select:slider:prev', this.items[this.currentItemIndex])
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
