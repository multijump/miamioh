<template>
  <transition name="child-slide">
    <nav
      v-show="showMenu"
      :aria-label="menuText"
      :id="getIdText(menuText)"
      class="header__main_menu_child"
    >
      <div
        class="header__main_menu_child_title"
        @click="showMainMenu"
      >
        <button
          aria-label="back to main menu"
          @click="showMainMenu"
        >
          <span
            class="caret"
          />
        </button>
        <h1>
          {{ menuText }}
        </h1>
      </div>
      <ul>
        <li
          v-for="(menu, index) in menus"
          :key="index"
          @click="goToHref(menu.href)"
          @keydown="keyDownEnter($event, menu.href)"
        >
          <button
            :data-index="index"
            @keydown="onKeyUpMenu($event, menu.href)"
            @click="goToHref(menu.href)"
          >
            {{ menu.text }}
          </button>
        </li>
      </ul>
    </nav>
  </transition>
</template>

<script>
import eventBus from '@/js/util/eventBus'

export default {
  props: {
    menuId: {
      type: String,
      required: true,
    },
    previousMenuId: {
      type: String,
      default: '',
    },
    nextMenuId: {
      type: String,
      default: '',
    },
    menuText: {
      type: String,
      default: 'Menu',
    },
    links: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      showMenu: false,
      isMobile: window.innerWidth < 1024,
    }
  },

  computed: {
    menus() {
      if (this.links === '') {
        return []
      }

      return JSON.parse(this.links)
    },
  },

  created() {
    eventBus.$on('click:main:menu', this.onClickMenu)
    eventBus.$on('click:child:menu', this.onClickChildMenu)
    eventBus.$on('toggle:child:menu', this.onToggleMenu)
    eventBus.$on('toggle:menu', this.onHideMenu)
  },

  methods: {
    onClickMenu(activeMenuData) {
      if (activeMenuData.menuId === this.menuId &&
        activeMenuData.childMenu === 'first') {
        this.showMenu = true
        setTimeout(() => {
          this.$el.lastChild.firstChild.firstChild.focus()
        }, 20)
      } else if (activeMenuData.menuId === this.menuId &&
        activeMenuData.childMenu === 'last') {
        this.showMenu = true
        setTimeout(() => {
          this.$el.lastChild.lastChild.firstChild.focus()
        }, 20)
      } else if (activeMenuData.menuId === this.menuId &&
        typeof activeMenuData.childMenu === 'undefined' &&
        typeof activeMenuData.show !== 'undefined') {
        this.showMenu = activeMenuData.show

        if (this.isMobile) {
          setTimeout(() => {
            this.$el.firstChild.firstChild.focus()
          }, 20)
        }
      } else if (activeMenuData.menuId === this.menuId &&
        activeMenuData.from === 'child' &&
        !this.isMobile) {
        this.showMenu = true
      } else {
        this.showMenu = false
      }
    },
    onClickChildMenu(activeMenuId) {
      if (activeMenuId === this.menuId) {
        this.$el.lastChild.firstChild.firstChild.focus()
      }
    },
    onKeyUpMenu(event, menuLink) {
      event.stopPropagation()

      if (event.key === 'Tab' &&
        event.shiftKey &&
        parseInt(event.srcElement.getAttribute('data-index'), 10) === 0) {
        event.preventDefault()
        event.srcElement.blur()
        if (this.isMobile) {
          this.$el.firstChild.firstChild.focus()
        } else {
          eventBus.$emit('click:main:menu', { menuId: this.menuId, goExpander: true, from: 'child' })
        }
      } else if (event.key === 'Tab' &&
        !event.shiftKey &&
        parseInt(event.srcElement.getAttribute('data-index'), 10) === this.menus.length - 1) {
        event.preventDefault()
        event.srcElement.blur()
        if (this.isMobile) {
          this.$el.firstChild.firstChild.focus()
        } else {
          eventBus.$emit('click:main:menu', { menuId: this.menuId, goExpander: true, from: 'child' })
        }
      } else if (event.key === 'Enter') {
        window.location.href = menuLink
      }
    },
    goToHref(menuLink) {
      window.location.href = menuLink
    },
    keyDownEnter(event, menuLink) {
      if (event.key === 'Enter') {
        window.location.href = menuLink
      }
    },
    showMainMenu(event) {
      event.preventDefault()
      eventBus.$emit('toggle:child:menu', false)
      eventBus.$emit('disable:main:caret', this.menuId)
    },
    onToggleMenu(show) {
      this.showMenu = show
    },
    onHideMenu() {
      this.showMenu = false
    },
    getIdText(text) {
      return text.toLowerCase().split(' ').join('')
    },
  },
}
</script>
