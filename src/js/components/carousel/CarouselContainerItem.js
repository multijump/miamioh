import Hammer from 'hammerjs'

import carousel from '@/js/util/symbols/carousel'

import CarouselContainerAnimation from '@/js/components/carousel/CarouselContainerAnimation'

export default {
  inject: { carousel },

  props: {
    animationType: {
      type: String,
      default: 'fadeFromLeft',
    },
  },

  data() {
    return {
      defaultClass: undefined,
    }
  },

  mounted() {
    [this.defaultClass] = this.$el.classList

    const hammer = new Hammer(this.$el)

    hammer.on('swipeleft', () => this.setCarouselDirection('next'))
    hammer.on('swiperight', () => this.setCarouselDirection('previous'))
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

    // if click is needed
    handleEvent() {
      this.emitEvent('set:item', this)
    },

    setCarouselDirection(direction) {
      this.emitEvent('carousel:direction', direction)
    },
  },

  render(createElement) {
    const { evaluateItem } = this
    const elementData = {
      attrs: {
        'aria-hidden': (!evaluateItem).toString(),
      },
      directives: [{
        name: 'show',
        value: evaluateItem,
      }],
      class: {
        [`${this.defaultClass}--isActive`]: evaluateItem,
      },
    }

    const createsListItem = createElement(CarouselContainerAnimation, {
      props: {
        animationType: evaluateItem ? this.animationType : null,
      },
    }, this.$slots.default)

    return createElement('li', elementData, [createsListItem])
  },
}

