import carousel from '@/js/util/symbols/carousel'

export default {
  inject: { carousel },

  computed: {
    items() {
      return this.carousel.items
    },
    currentItemIndex() {
      return this.carousel.currentItemIndex || 0
    },
  },

  created() {
    this.carousel.$on('select:slider:next', this.nextItem)
    this.carousel.$on('select:slider:self', this.currentItem)
    this.carousel.$on('select:slider:prev', this.previousItem)
  },

  methods: {
    handleEvent({ target: { value } }) {
      if (value !== this.currentItemIndex) {
        this.carousel.$emit('set:item', this.carousel.items[value])
      }
    },
    handleKey(event) {
      if (event.key === 'Tab' && event.shiftKey &&
        this.currentItemIndex > 0) {
        event.preventDefault()
        this.previousItem()
      } else if (event.key === 'Tab' &&
        !event.shiftKey &&
        this.currentItemIndex !== this.items.length - 1) {
        event.preventDefault()
        this.nextItem()
      } else if (event.key === 'Enter') {
        event.preventDefault()
        this.carousel.$emit('set:item:title', this.carousel.items[this.currentItemIndex])
      }
    },

    nextItem() {
      if (this.currentItemIndex !== this.items.length - 1) {
        this.carousel.$emit('set:item:next')
        this.$el.focus()
      } else if (this.currentItemIndex === this.items.length - 1) {
        // Create new tab event without keyboard
        this.$el.focus()
      }
    },

    currentItem(index) {
      if (typeof index === 'undefined') {
        this.$el.focus()
      } else {
        this.$el.value = index
      }
    },

    previousItem() {
      this.carousel.$emit('set:item:prev')
    },
  },

  render(createElememt) {
    const elementData = {
      attrs: {
        type: 'range',
        min: 0,
        max: this.items.length - 1,
        value: this.currentItemIndex,
        title: 'Carousel controller',
      },
      on: {
        // input: this.handleEvent,
        change: this.handleEvent,
        keydown: this.handleKey,
      },

    }
    return createElememt('input', elementData)
  },
}
