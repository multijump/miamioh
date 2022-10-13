<template>
  <component
    :is="tag"
    :aria-orientation="ariaOrientation"
    role="tablist"
  >
    <slot/>
  </component>
</template>

<script>
import { mod } from '@/js/util/functions/helpers'
import { container, tablist } from '@/js/util/symbols/tabs'

export default {
  provide() {
    return {
      [tablist]: this,
    }
  },
  inject: { container },
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    orientation: {
      type: String,
      default: 'horizontal',
      validator: value => ['horizontal', 'vertical'].includes(value),
    },
    automatic: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      tabs: [],
    }
  },
  computed: {
    focusedTab() {
      return this.container.focusedTab
    },
    activeTab() {
      return this.container.activeTab
    },
    previousTab() {
      return this.tabs[this.getPreviousTabIndex()]
    },
    nextTab() {
      return this.tabs[this.getNextTabIndex()]
    },
    firstTab() {
      return this.tabs[0]
    },
    lastTab() {
      const { tabs } = this

      return tabs[tabs.length - 1]
    },
    ariaOrientation() {
      return this.orientation === 'vertical' ? 'vertical' : null
    },
  },
  created() {
    this.$on('created:tab', this.createdTab)
    this.$on('delete:tab', this.deleteTab)

    this.$on('clicked:tab.el', this.clickedTabEl)
    this.$on('focused:tab.el', this.focusedTabEl)

    this.$on('focus:tab.previous', this.focusPreviousTab)
    this.$on('focus:tab.next', this.focusNextTab)
    this.$on('focus:tab.first', this.focusFirstTab)
    this.$on('focus:tab.last', this.focusLastTab)

    this.container.$emit('created:tablist', this)
  },
  methods: {
    // Lifecycle
    createdTab(tab) {
      this.tabs.push(tab)

      if (!this.activeTab || tab.initiallyActive) {
        this.activateTab(tab)
      }
    },
    deleteTab() {
      const { tabs } = this
      const tab = this.focusedTab

      this.container.$emit('delete:tabpanel')
      this.focusPreviousTab()

      if (!this.automatic) {
        this.activateTab(this.focusedTab)
      }

      tabs.splice(tabs.indexOf(tab), 1)
      tab.$emit('delete')
    },
    // Dispatchers
    focusTab(tab) {
      tab.$emit('focus')

      if (this.automatic) {
        this.activateTab(tab)
      }
    },
    activateTab(tab) {
      this.container.$emit('activate:tab', tab)
    },
    // DOM Events
    focusedTabEl(tab) {
      this.container.$emit('focus:tab', tab)
    },
    clickedTabEl(tab) {
      this.activateTab(tab)
    },
    // Focus Helpers
    focusPreviousTab() {
      this.focusTab(this.previousTab)
    },
    focusNextTab() {
      this.focusTab(this.nextTab)
    },
    focusFirstTab() {
      this.focusTab(this.firstTab)
    },
    focusLastTab() {
      this.focusTab(this.lastTab)
    },
    // Other Helpers
    getPreviousTabIndex() {
      const { tabs } = this

      return mod(tabs.indexOf(this.focusedTab) - 1, tabs.length)
    },
    getNextTabIndex() {
      const { tabs } = this

      return (tabs.indexOf(this.focusedTab) + 1) % tabs.length
    },
  },
}
</script>
