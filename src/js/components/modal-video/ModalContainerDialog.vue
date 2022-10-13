<script>
import { TimelineLite, Back } from 'gsap'

import propsTag from '@/js/util/props/propsTag'

export default {
  name: 'ModalContainerDialog',
  inject: ['modal'],
  props: {
    ...propsTag,
  },

  data: () => ({
    timeline: new TimelineLite(),
  }),

  // Watches parent "ModalContainer" for when
  // its expanded and then calls the triggerAnimation method
  watch: {
    'modal.expanded': 'triggerAnimation',
  },

  mounted() {
    const { $el } = this

    this.timeline.fromTo(
      $el,
      0.8,
      {
        y: '+=50',
        opacity: 0,
      },
      {
        y: '0',
        opacity: 1,
        ease: Back.easeOut,
      },
    )
      .paused(this.modal.mode === 'show')
  },

  created() {
    this.$emit('createsModalDialog', this)

    this.$on('focus-last-descendant', this.focusLastDescendant)
    this.$on('focus-first-descendant', this.focusFirstDescendant)
  },

  methods: {
    triggerAnimation(expanded) {
      const { timeline } = this
      return expanded ? timeline.play() : timeline.pause(0)
    },

    focusFirstDescendant(el = this.$el) {
      return Array.from(el.children).find(child => (
        this.attemptFocus(child) || this.focusFirstDescendant(child)
      ))
    },

    focusLastDescendant(el = this.$el) {
      return Array.from(el.children).reverse().find(child => (
        this.attemptFocus(child) || this.focusLastDescendant(child)
      ))
    },
    attemptFocus(el) {
      el.focus()

      return el === document.activeElement
    },
  },

  render(createElement) {
    const elementData = {
      staticClass: 'ModalContainerDialog',
      attrs: {
        role: 'dialog',
        'aria-modal': 'true',
      },
    }

    return createElement(this.tag, elementData, this.$slots.default)
  },
}
</script>
