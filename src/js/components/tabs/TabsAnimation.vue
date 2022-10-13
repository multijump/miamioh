<script>
import { TweenLite, Power1 } from 'gsap'

export default {
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    animationType: {
      type: String,
      requried: true,
      default: 'fadeIn',
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    this[this.options.animation]()
  },
  methods: {
    fadeIn() {
      const config = {
        // could be dynamic
        ease: Power1.easeInOut,
      }
      TweenLite.from(
        this.$el,
        this.options.duration || 1,
        Object.assign(config, this.options.config),
      )
    },
  },
  render(createElement) {
    return createElement(this.tag, this.$slots.default)
  },
}
</script>
