import carousel from '@/js/util/symbols/carousel'

export default {
  inject: { carousel },

  data() {
    return {
      leftDisabled: true,
      rightDisabled: false,
      processing: false,
    }
  },

  computed: {
    items() {
      return this.carousel.items
    },
    currentItemIndex() {
      return this.carousel.currentItemIndex || 0
    },
  },

  methods: {
    handleLeftEvent({ target: { value } }) {
      if (this.processing) {
        return false
      }

      this.processing = true
      const calcVal = parseInt(value, 10)
      if (calcVal - 1 <= 0) {
        this.$el.lastChild.focus()
      }
      this.carousel.$emit('set:item', this.carousel.items[calcVal - 1])

      setTimeout(() => {
        this.processing = false
      }, 200)

      return true
    },
    handleRightEvent({ target: { value } }) {
      if (this.processing) {
        return false
      }

      this.processing = true
      const calcVal = parseInt(value, 10)
      if (calcVal + 1 >= this.items.length - 1) {
        this.$el.firstChild.focus()
      }
      this.carousel.$emit('set:item', this.carousel.items[calcVal + 1])

      setTimeout(() => {
        this.processing = false
      }, 200)

      return true
    },
    handleKeyUpevent(event) {
      event.preventDefault()

      if (event.key === 'ArrowLeft') {
        this.handleLeftEvent({ target: { value: this.currentItemIndex } })
      }

      if (event.key === 'ArrowRight') {
        this.handleRightEvent({ target: { value: this.currentItemIndex } })
      }
    },
  },

  render(createElememt) {
    const leftElementData = {
      domProps: {
        disabled: this.currentItemIndex <= 0,
      },
      attrs: {
        id: 'carousel-quote-left',
        type: 'button',
        value: this.currentItemIndex,
        'aria-label': 'Previous',
      },
      on: {
        keyup: this.handleKeyUpevent,
        '!click': this.handleLeftEvent,
      },
    }

    const rightElementData = {
      domProps: {
        disabled: this.currentItemIndex >= this.items.length - 1,
      },
      attrs: {
        id: 'carousel-quote-right',
        type: 'button',
        value: this.currentItemIndex,
        'aria-label': 'Next',
      },
      on: {
        keyup: this.handleKeyUpevent,
        '!click': this.handleRightEvent,
      },
    }

    const leftButton = createElememt('input', leftElementData)
    const rightButton = createElememt('input', rightElementData)
    return createElememt('div', [leftButton, rightButton])
  },
}
