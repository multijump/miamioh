import { TweenMax } from 'gsap'
import Hammer from 'hammerjs'

import carousel from '@/js/util/symbols/carousel'
import BaseWindowWidth from '@/js/components/BaseWindowWidth'

export default {
  inject: { carousel },
  extends: BaseWindowWidth,
  props: {
    tag: {
      type: String,
      default: 'ul',
      validator: value => [
        'ul',
        'ol',
      ].includes(value),
    },
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resetTweenPosition)
  },

  computed: {
    currentItem() {
      return this.carousel.currentItem
    },
    currentItemIndex() {
      return this.carousel.currentItemIndex
    },
  },

  mounted() {
    const hammer = new Hammer(this.$el)
    const events = {
      swipeleft: 'next',
      swiperight: 'previous',
    }
    Object.keys(events).forEach((event) => {
      hammer.on(event, () => this.setCarouselDirection(events[event]))
    })
    window.addEventListener('resize', this.resetTweenPosition)
  },

  methods: {
    emitEvent(...events) {
      this.carousel.$emit(...events)
    },

    setCarouselDirection(direction) {
      this.emitEvent('carousel:direction', direction)
    },

    resetTweenPosition() {
      const { $el } = this
      const index = this.carousel.currentItemIndex

      if (this.width > 768 && index <= this.carousel.items.length - 2) {
        TweenMax.to($el, 0.25, { x: -(index * this.currentItem.$el.offsetWidth) })
      } else if (this.width <= 768) {
        TweenMax.to($el, 0.25, { x: -(index * this.currentItem.$el.offsetWidth) })
      }
    },
  },

  watch: {
    currentItemIndex(index) {
      const { $el } = this

      if (this.width > 768 && index <= this.carousel.items.length - 2) {
        TweenMax.to($el, 0.25, { x: -(index * this.currentItem.$el.offsetWidth) })
      } else if (this.width <= 768) {
        TweenMax.to($el, 0.25, { x: -(index * this.currentItem.$el.offsetWidth) })
        $el.parentElement.scrollLeft = 0
      }
    },
  },

  render(createElement) {
    return createElement(this.tag, this.$slots.default)
  },
}
