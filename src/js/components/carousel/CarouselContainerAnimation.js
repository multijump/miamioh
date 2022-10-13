import { TweenLite } from 'gsap'

import propsTag from '@/js/util/props/propsTag'

export default {
  name: 'CarouselContainerAnimation',
  props: {
    ...propsTag,

    animationType: {
      type: String,
      requried: true,
    },
    animationConfig: {
      type: Object,
      default: () => ({}),
    },
  },

  mounted() {
    // this function gets called when the component mounts
    // with the animationType prop being passed in. If no
    // prop is provided the default is the string fadeInLeft
    this.registerAnimation(this.animationType)
  },

  methods: {
    fadeFromLeft() {
      TweenLite.fromTo(
        this.$el,
        1,
        {
          x: 20,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
        },
      )
    },

    // set's animation
    registerAnimation(animationType) {
      if (!animationType) {
        return
      }
      this[animationType]()
    },
  },

  watch: {
    animationType: 'registerAnimation',
  },

  render(createElement) {
    return createElement(this.tag, this.$slots.default)
  },
}
