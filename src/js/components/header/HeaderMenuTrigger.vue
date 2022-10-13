<template>
  <button
    v-if="showButton"
    :class="{'trigger-menu': !showMenu, 'trigger-menu close': showMenu,}"
    :aria-expanded="showMenu ? 'true' : 'false'"
    aria-label="Menu"
    @click="handleTriggerMenu"
    @keydown="handleTabKey"
  />
</template>

<script>
import eventBus from '@/js/util/eventBus'

export default {
  props: {
    isDesktop: {
      type: String,
      default: 'true',
    },
  },
  data() {
    return {
      showMenu: false,
      isMobile: window.innerWidth < 1024,
    }
  },
  computed: {
    showButton() {
      if (this.isDesktop === 'true' && !this.isMobile) {
        return true
      } else if (this.isDesktop === 'false' && this.isMobile) {
        return true
      }

      return false
    },
  },
  created() {
    // window.addEventListener('resize', this.handleResize)
    eventBus.$on('toggle:menu', this.handleToggleButton)
    eventBus.$on('select:trigger', this.selectToggleButton)
    window.addEventListener('keyup', this.handleEsc)
  },
  destroyed() {
    window.removeEventListener('keyup', this.handleEsc)
  },
  methods: {
    handleTriggerMenu() {
      this.$el.focus()
      this.showMenu = !this.showMenu
      eventBus.$emit('toggle:menu', this.showMenu)
      eventBus.$emit('toggle:searchmenu', false)
      if (this.showMenu === false) {
        if (this.$el.nodeName === 'BUTTON') {
          this.$el.focus()
        }
      }
    },

    handleToggleButton(hidden) {
      this.showMenu = hidden
    },

    handleEsc(e) {
      if (e.keyCode === 27) {
        if (this.showMenu) {
          eventBus.$emit('toggle:menu', false)
          // if (this.$el.nodeName === 'BUTTON') {
          this.$el.focus()
          // }
        }
        this.showMenu = false
      }
    },

    handleTabKey(event) {
      if (this.showMenu && event.key === 'Tab' && !event.shiftKey) {
        event.preventDefault()
        eventBus.$emit('select:menu:first')
      } else if (this.showMenu && event.key === 'Tab' && event.shiftKey) {
        event.preventDefault()
        event.stopPropagation()
        eventBus.$emit('select:menu:last')
      }
    },

    selectToggleButton() {
      if (this.$el.nodeName === 'BUTTON') {
        this.$el.focus()
      }
    },

    // handleResize() {
    //   this.showMenu = false
    //   eventBus.$emit('toggle:menu', this.showMenu)
    // },
  },
}
</script>
