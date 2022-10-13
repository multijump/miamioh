import { TweenLite } from 'gsap'

import carousel from '@/js/util/symbols/carousel'
import BaseWindowWidth from '@/js/components/BaseWindowWidth'

export default {
  inject: { carousel },
  extends: BaseWindowWidth,
  props: {
    scaleMobile: {
      type: Object,
      default: () => ({}),
    },
    scaleDesktop: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      defaultClass: undefined,
    }
  },

  mounted() {
    [this.defaultClass] = this.$el.classList
  },

  created() {
    this.emitEvent('create:items', this)
  },

  computed: {
    evaluateItem() {
      return this.carousel.currentItem === this
    },
  },

  methods: {
    emitEvent(...events) {
      this.carousel.$emit(...events)
    },

    handleEvent() {
      this.emitEvent('set:item', this)
    },

    handleFocus(e) {
      e.preventDefault()
      this.$el.click()
    },

    scale(scale) {
      TweenLite.to(
        this.$el.children[0],
        0.25,
        scale,
      )
    },
    scaleFirst({ first }) {
      this.scale(first)
    },
    scaleSecond({ second }) {
      this.scale(second)
    },
    determineScale(value) {
      const scale = value ? 'First' : 'Second'
      const device = this.width >= 640 ? 'Desktop' : 'Mobile'

      this[`scale${scale}`](this[`scale${device}`])
    },
  },

  watch: {
    evaluateItem: 'determineScale',
  },

  render(createElement) {
    const elementData = {
      // attrs: {
      //   tabindex: 0,
      // },
      on: {
        click: this.handleEvent,
        focus: this.handleFocus,
      },
      class: {
        [`${this.defaultClass}--isActive`]: this.evaluateItem,
      },
    }

    const createsChild = createElement('div', { staticClass: 'CarouselContainerListItem' }, this.$slots.default)

    return createElement('li', elementData, [createsChild])
  },
}

