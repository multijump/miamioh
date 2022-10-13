import carousel from '@/js/util/symbols/carousel'

export default {
  inject: { carousel },
  props: {
    direction: {
      type: String,
      required: true,
      validator: direction => [
        'next',
        'previous',
      ].includes(direction),
    },
  },
  methods: {
    setsCarouselDirection(direction) {
      this.carousel.$emit('carousel:direction', direction)
    },
    handleKeyUpevent(event) {
      const { direction } = this
      const eventToEmit = {
        ArrowLeft: direction,
        ArrowRight: direction,
      }[event.key]

      if (!eventToEmit) {
        return
      }

      event.preventDefault()
      this.setsCarouselDirection(eventToEmit)
    },
  },
  render(createElement) {
    const elementData = {
      on: {
        keyup: this.handleKeyUpevent,
        click: () => this.setsCarouselDirection(this.direction),
      },
    }

    return createElement('button', elementData, this.$slots.default)
  },
}

