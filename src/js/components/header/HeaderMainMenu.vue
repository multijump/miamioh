<template>
  <li
    tabindex="0"
    @keydown="handleKeyDown"
    @mouseover="onMouseOver"
  >
    <a
      :class="!isActive ? 'not-active': 'active'"
      :href="menuLink"
      class="HeaderMainMenu__link"
      tabindex="-1"
      @click="handleMenuClick"
      @keydown="handleMenuClick"
    >
      {{ menuText }}
    </a>
    <button
      v-show="hasChild"
      :aria-expanded="isActive ? 'true' : 'false'"
      :aria-controls="getControlText(menuText)"
      :aria-label="`Expand ${menuText.toLowerCase()} menu`"
      :class="['expander-wrap']"
      @click="handleExpander"
      @keydown="handleExpanderEnter"
    >
      <span
        v-show="hasChild"
        :class="isExpanded ? 'expander-minus' : 'expander-plus'"
      />
    </button>
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
    previousId: {
      type: String,
      required: true,
    },
    nextId: {
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
      type: Boolean,
      default: false,
    },
    indexOrder: {
      type: String,
      default: '0',
    },
    menuLength: {
      type: String,
      default: '0',
    },
  },

  data() {
    return {
      isActive: false,
      isExpanded: false,
      isExpanderActive: false,
    }
  },

  computed: {
    isMobile() {
      return window.innerWidth < 1024
    },
  },

  created() {
    eventBus.$on('select:menu:first', this.onSelectFirstMenuItem)
    eventBus.$on('click:main:menu', this.onClickMenu)
    eventBus.$on('select:main:caret', this.onSelectMenuItem)
    eventBus.$on('click:main:menu:collepse', this.onCollepseExpander)
    eventBus.$on('selected:main:menu', this.selectedMainMenuItem)
  },

  methods: {
    handleMenuClick() {
      // this.isMobile = window.innerWidth < 1024
      // if (!this.isMobile) {
      //   eventBus.$emit('click:main:menu', { menuId: this.id })
      // } else {
      window.location.href = this.menuLink
      // }
    },

    handleExpander(event) {
      event.preventDefault()
      this.isExpanded = !this.isExpanded
      eventBus.$emit('click:main:menu', { menuId: this.id, show: this.isExpanded })

      if (this.isMobile) {
        eventBus.$emit('hide:main:menu', {})
      }
    },

    handleExpanderEnter(event) {
      event.stopPropagation()
      if (event.keyCode === 13 || event.keyCode === 32) {
        event.preventDefault()
        this.isExpanded = !this.isExpanded
        eventBus.$emit('click:main:menu', { menuId: this.id, show: this.isExpanded })

        if (this.isMobile) {
          eventBus.$emit('hide:main:menu', {})
        }
      } else if (event.key === 'Tab' && event.shiftKey) {
        event.preventDefault()
        if (this.isExpanded) {
          eventBus.$emit('click:main:menu', { menuId: this.id, childMenu: 'last' })
        } else {
          this.$el.focus()
        }
      } else if (event.key === 'Tab') {
        this.$el.lastChild.blur()
        event.preventDefault()
        if (this.isExpanded) {
          eventBus.$emit('click:main:menu', { menuId: this.id, childMenu: 'first' })
        } else if (parseInt(this.indexOrder, 10) !== this.menuLength - 1) {
          eventBus.$emit('click:main:menu', { menuId: this.nextId })
        } else if (parseInt(this.indexOrder, 10) === this.menuLength - 1 && this.isMobile) {
          eventBus.$emit('select:social:first')
        } else {
          eventBus.$emit('select:other:first')
        }
      }
    },

    handleKeyDown(event) {
      if (this.isMobile && event.key === 'Enter') {
        event.preventDefault()
        this.$el.firstChild.click()
        return
      }

      if (event.key === 'Tab' && !event.shiftKey) {
        event.preventDefault()
        this.$el.lastChild.focus()
        this.isExpanderActive = true
      } else if (event.key === 'Tab' &&
        event.shiftKey && this.indexOrder !== '0') {
        event.preventDefault()
        eventBus.$emit('click:main:menu', { menuId: this.previousId, goExpander: true })
      } else if (event.key === 'Tab' &&
        event.shiftKey && this.indexOrder === '0') {
        event.preventDefault()
        eventBus.$emit('select:trigger')
      } else if (event.key === 'Enter') {
        event.preventDefault()
        this.$el.firstChild.click()
      }
    },

    onClickMenu(activeMenuData) {
      if (!activeMenuData) {
        this.isActive = false
        return
      }

      if (activeMenuData.menuId === this.id && activeMenuData.goExpander) {
        this.isActive = true
        this.isExpanderActive = true
        setTimeout(() => {
          this.$el.lastChild.focus()
        }, 20)
      } else if (activeMenuData.menuId === this.id &&
        typeof activeMenuData.goExpander === 'undefined' &&
        typeof activeMenuData.show === 'undefined' &&
        typeof activeMenuData.childMenu === 'undefined') {
        this.isActive = true
        this.isExpanderActive = false
        setTimeout(() => {
          this.$el.focus()
        }, 20)
      } else if (activeMenuData.menuId === this.id &&
        typeof activeMenuData.goExpander === 'undefined' &&
        typeof activeMenuData.show !== 'undefined') {
        this.isActive = this.isExpanded
      } else if (activeMenuData.menuId === this.id &&
        (activeMenuData.childMenu === 'first' || activeMenuData.childMenu === 'last')) {
        this.isActive = false
      } else {
        this.isActive = false
      }
    },

    onMouseOver() {
      if (this.isMobile) {
        return
      }

      this.isActive = true
      this.isExpanded = true
      eventBus.$emit('click:main:menu', { menuId: this.id, show: true })
      eventBus.$emit('selected:main:menu', { menuId: this.id })
    },

    selectedMainMenuItem({ menuId }) {
      if (menuId !== this.id) {
        this.isActive = false
        this.isExpanded = false
      }
    },

    // for mobile now
    onSelectMenuItem(activeMenuId) {
      if (!activeMenuId || activeMenuId !== this.id) {
        return
      }

      this.$el.firstChild.focus()
    },

    onCollepseExpander() {
      this.isExpanded = false
    },

    onSelectFirstMenuItem() {
      if (parseInt(this.indexOrder, 10) === 0) {
        setTimeout(() => {
          this.$el.focus()
        }, 50)
      }
    },

    getControlText(text) {
      return text.toLowerCase().split(' ').join('')
    },
  },
}
</script>
