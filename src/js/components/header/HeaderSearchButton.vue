<template>
  <button
    :class="{
      'search-icon': !showMenu,
      'close-icon': showMenu
    }"
    :aria-expanded="showMenu.toString()"
    aria-label="Search"
    @click="handleTriggerMenu"
  />
</template>

<script>
import eventBus from '@/js/util/eventBus'

export default {
  data() {
    return {
      showMenu: false,
    }
  },
  created() {
    eventBus.$on('toggle:searchmenu', this.handleToggleButton)
    window.addEventListener('keyup', this.handleEsc)
  },
  methods: {
    handleTriggerMenu() {
      this.showMenu = !this.showMenu
      eventBus.$emit('toggle:searchmenu', this.showMenu)
      eventBus.$emit('toggle:menu', false)
    },

    handleToggleButton(hidden) {
      if (this.showMenu) {
        this.$el.focus()
      }
      this.showMenu = hidden
    },

    handleEsc(e) {
      if (e.keyCode === 27) {
        eventBus.$emit('toggle:searchmenu', false)
        eventBus.$emit('toggle:menu', false)
        this.showMenu = false
      }
    },
  },
}
</script>

