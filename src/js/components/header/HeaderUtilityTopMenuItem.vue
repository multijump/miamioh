<template>
  <li>
    <button
      v-if="hasChild === 'false'"
      @keydown="onKeyDown($event, menuLink)"
      @click="goTo(menuLink)"
    >{{ menuText }}</button>
    <button
      v-else
      :aria-expanded="expanded"
      @click="handleDropdownClick">
      {{ menuText }}
      <div class="sub-menu-carat-wrapper">
        <div class="sub-menu-carat" />
      </div>
    </button>
    <ul
      v-if="hasChild === 'true'"
      v-show="isOpen"
      :aria-hidden="isOpen ? 'false' : 'true'"
      role="menu"
      class="sub-menu"
    >
      <li
        v-for="(childMenu, index) in childMenus"
        :key="index">
        <button
          @keydown="handleMouseOutInChild($event, index, childMenu.href)"
          @click="goTo(childMenu.href)"
        >{{ childMenu.text }}</button>
      </li>
      <slot />
    </ul>
  </li>
</template>

<script>
import eventBus from '@/js/util/eventBus'

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    menuText: {
      type: String,
      default: 'Menu',
    },
    menuLink: {
      type: String,
      default: '/',
    },
    hasChild: {
      type: String,
      default: 'false',
    },
    childLinks: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      showMenu: false,
      isOpen: false,
    }
  },

  computed: {
    expanded() {
      const open = this.isOpen ? 'true' : 'false'
      return this.hasChild === 'true' ? open : false
    },
    childMenus() {
      if (this.childLinks === '') {
        return []
      }

      return JSON.parse(this.childLinks)
    },
  },

  created() {
    eventBus.$on('click:main:menu', this.onClickMenu)
    eventBus.$on('toggle:menu', this.onToggleMenu)
  },

  methods: {
    handleMouseOutInChild(event, index, menuLink) {
      if (event.key === 'Enter') {
        window.location.href = menuLink
      }
      if (index === this.childMenus.length - 1) {
        event.preventDefault()
        this.onToggleMenu()
        this.$el.firstChild.focus()
      }
    },

    onClickMenu(activeMenuData) {
      if (!activeMenuData) {
        this.isActive = true
        return
      }
      if (activeMenuData.menuId === this.id) {
        this.isActive = true
      } else {
        this.isActive = false
      }
    },

    handleDropdownClick() {
      this.isOpen = !this.isOpen
      // eventBus.$emit('click:utility:menu', this.id)
    },

    onToggleMenu() {
      this.isOpen = false
      this.showMenu = false
    },

    goTo(menuLink) {
      window.location.href = menuLink
    },

    onKeyDown(event, menuLink) {
      if (event.key === 'Enter') {
        window.location.href = menuLink
      }
    },
  },
}
</script>
