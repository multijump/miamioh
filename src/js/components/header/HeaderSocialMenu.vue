<template>
  <li @keydown="onTabKey">
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
    index: {
      type: String,
      default: '0',
    },
  },

  data() {
    return {
      showMenu: false,
      isOpen: false,
    }
  },

  computed: {
    isMobile() {
      return window.innerWidth < 1024
    },
  },

  created() {
    eventBus.$on('select:menu:last', this.selectLastMenu)
    eventBus.$on('select:social:first', this.selectFirstMenu)
  },

  // mounted() {
  //   if (this.isLast === '1' && !this.isMobile) {
  //     this.$slots.default[0].elm.addEventListener('focusout', this.closeMenu)
  //   }
  // },

  // destroyed() {
  //   if (this.isLast === '1' && !this.isMobile) {
  //     this.$slots.default[0].elm.removeEventListener('focusout', this.closeMenu)
  //   }
  // },

  methods: {
    closeMenu() {
      if (!this.isMobile) {
        eventBus.$emit('toggle:menu', false)
      }
    },

    selectLastMenu() {
      if (this.isLast === '1' && !this.isMobile) {
        this.$el.lastChild.focus()
      }
    },

    selectFirstMenu() {
      if (this.index === '0') {
        this.$el.lastChild.focus()
      }
    },

    onTabKey(event) {
      if (this.isLast && !this.isMobile &&
        event.key === 'Tab' && !event.shiftKey) {
        event.preventDefault()
        eventBus.$emit('select:trigger')
      }
    },
  },
}
</script>
