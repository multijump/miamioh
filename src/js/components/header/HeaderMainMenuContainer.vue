<template>
  <transition name="main-slide">
    <div v-if="!isActive">
      <slot/>
    </div>
  </transition>
</template>

<script>
import eventBus from '@/js/util/eventBus'

export default {
  data() {
    return {
      isActive: false,
      isMobile: window.innerWidth <= 1024,
    }
  },

  created() {
    eventBus.$on('hide:main:menu', this.onHideMainMenu)
    eventBus.$on('disable:main:caret', this.onDisableMenuCaret)
    eventBus.$on('toggle:menu', this.onToggleMenu)
  },

  methods: {
    onClickMenuCaret() {
      this.isActive = true
    },

    onHideMainMenu() {
      this.isActive = true
    },

    onDisableMenuCaret(menuId) {
      this.isActive = false
      eventBus.$emit('click:main:menu', { menuId, goExpander: true, from: 'child' })
    },

    onToggleMenu() {
      this.isActive = false
    },
  },
}
</script>
