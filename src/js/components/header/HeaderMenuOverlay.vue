<template>
  <div
    v-show="showMenu"
    :class="className"
    @click="handleCloseMenu"
  >
    <slot/>
  </div>
</template>
<script>
import eventBus from '@/js/util/eventBus'

export default {
  data() {
    return {
      showSearchMenu: false,
      showBigMenu: false,
      className: 'top-menu--overlay',
    }
  },

  computed: {
    showMenu() {
      return this.showSearchMenu || this.showBigMenu
    },
  },

  created() {
    eventBus.$on('toggle:searchmenu', this.handleToggleSearchMenu)
    eventBus.$on('toggle:menu', this.handleToggleBigMenu)
  },

  methods: {
    handleToggleSearchMenu(flag) {
      this.className = 'top-menu--overlay-white'
      this.showSearchMenu = flag
    },

    handleToggleBigMenu(flag) {
      this.className = 'top-menu--overlay'
      this.showBigMenu = flag
    },

    handleCloseMenu() {
      eventBus.$emit('toggle:searchmenu', false)
      eventBus.$emit('toggle:menu', false)
    },
  },
}
</script>
