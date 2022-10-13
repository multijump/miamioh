<template>
  <li>
    <button
      v-if="hasChild==='false'"
      @click="goTo(menuLink)"
      @keydown="onKeyDown($event, menuLink)">{{ menuText }}</button>
    <button
      v-else
      :aria-expanded="expanded"
      class="utility-dropdown--small"
      @click="handleCaretClick"
      @keydown="handleKeyDown"
    >
      {{ menuText }}
      <span
        :class="{'caret close': !isOpen, 'caret open': isOpen}"
      />
    </button>

    <transition name="utility-slide">
      <ul
        v-show="isOpen"
        :aria-hidden="isOpen ? 'false' : 'true'"
        role="menu"
        class="sub-menu">
        <li
          v-for="(childMenu, index) in childMenus"
          :key="index">
          <button
            :href="childMenu.href"
            @blur="handleMouseOutInChild(index)"
            @click="goTo(childMenu.href)"
            @keydown="onKeyDown($event, childMenu.href)"
          >{{ childMenu.text }}</button>
        </li>
      </ul>
    </transition>
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
    isMobile() {
      return window.innerWidth < 1024
    },
  },

  created() {
    eventBus.$on('click:main:menu', this.onClickMenu)
    eventBus.$on('toggle:menu', this.onToggleMenu)
    eventBus.$on('select:menu:last', this.selectLastMenu)
  },

  methods: {
    handleCaretClick() {
      // event.preventDefault()
      this.isOpen = !this.isOpen
      eventBus.$emit('click:utility:menu', this.id)
    },

    handleMouseOutInChild(index) {
      if (index === this.childMenus.length - 1 && this.isMobile) {
        this.onToggleMenu()
        this.$el.firstChild.focus()
      } else if (index === this.childMenus.length - 1 && !this.isMobile) {
        eventBus.$emit('select:trigger')
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

    handleKeyDown(event) {
      if (!this.isOpen && this.isMobile &&
        event.key === 'Tab' && !event.shiftKey) {
        event.preventDefault()
        eventBus.$emit('select:trigger')
      }
    },

    selectLastMenu() {
      if (this.isOpen && this.isMobile) {
        this.$el.lastChild.lastChild.firstChild.focus()
      } else if (!this.isOpen && this.isMobile) {
        this.$el.firstChild.focus()
      }
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
