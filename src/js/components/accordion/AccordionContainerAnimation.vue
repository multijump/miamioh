<script>
import { TimelineMax, Power1 } from 'gsap'

export default {
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    expanded: {
      type: Boolean,
      required: true,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    timeline: new TimelineMax({ paused: true }),
  }),
  computed: {
    duration() {
      return this.options.duration || 1
    },
  },
  watch: {
    expanded: 'handleExpanded',
  },
  mounted() {
    this.registerAnimation()

    if (!this.expanded) {
      return
    }
    this.handleExpanded()
  },
  methods: {
    registerAnimation() {
      const config = {
        height: 0,
        overflow: 'hidden',
        display: 'none',
        ease: Power1.easeInOut,
      }
      this.timeline.from(this.$el, this.duration, Object.assign(config, this.options.config))
    },

    // handler
    handleExpanded(expanded = true) {
      const { timeline } = this
      return expanded ? timeline.play() : timeline.reverse()
    },
  },
  render(createElement) {
    return createElement(this.tag, this.$slots.default)
  },
}
</script>
