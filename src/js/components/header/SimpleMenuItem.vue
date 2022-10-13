<template>
  <li>
    <!-- this component is not used -->
    <slot/>
  </li>
</template>

<script>
import eventBus from '@/js/util/eventBus'

export default {
  props: {
    isLast: {
      type: String,
      default: '0',
    },
  },

  data() {
    return {
      showMenu: false,
      isOpen: false,
      isMobile: window.innerWidth < 1024,
    }
  },

  mounted() {
    if (this.isLast === '1' && this.isMobile) {
      this.$slots.default[0].elm.addEventListener('focusout', this.closeMenu)
    }
  },

  destroyed() {
    if (this.isLast === '1' && this.isMobile) {
      this.$slots.default[0].elm.removeEventListener('focusout', this.closeMenu)
    }
  },

  methods: {
    closeMenu() {
      if (this.isMobile) {
        eventBus.$emit('toggle:menu', false)
      }
    },
  },
}
</script>
