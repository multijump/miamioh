<template>
  <transition name="slide-fade">
    <div
      v-show="showMenu"
      :aria-hidden="!showMenu ? 'true' : 'false'"
    >
      <slot/>
    </div>
  </transition>
</template>
<script>
import eventBus from '@/js/util/eventBus'

export default {
  props: {
    menuItemId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      showMenu: false,
      // isMobile: window.innerWidth < 1024,
    }
  },

  created() {
    eventBus.$on('toggle:menu', this.handleToggleMenu)
  },

  methods: {
    handleToggleMenu(flag) {
      this.showMenu = flag

      // if (flag && !this.isMobile) {
      //   setTimeout(() => {
      //     eventBus.$emit('click:main:menu', { menuId: this.menuItemId })
      //   }, 400)
      // }
    },
  },
}
</script>
