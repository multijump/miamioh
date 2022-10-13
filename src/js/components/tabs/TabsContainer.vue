<template>
  <component :is="tag">
    <slot
      :tabs="tabs"
      :activeTab="activeTab"
      :activateTab="activateTab"
    />
  </component>
</template>

<script>
import { container } from '@/js/util/symbols/tabs'

export default {
  props: {
    tag: {
      type: String,
      default: 'div',
    },
  },
  provide() {
    return {
      [container]: this,
    }
  },
  data() {
    return {
      tabpanels: [],
      tablist: undefined,
      activeTab: undefined,
      focusedTab: undefined,
    }
  },
  computed: {
    tabs() {
      const { tablist } = this

      return tablist ? tablist.tabs : []
    },
    focusedTabpanel() {
      return this.tabpanels.find(this.isControlledByFocusedTab)
    },
    activeTabpanel() {
      return this.tabpanels.find(this.isControlledByActiveTab)
    },
  },
  created() {
    this.$on('created:tablist', this.createdTablist)
    this.$on('created:tabpanel', this.createdTabpanel)
    this.$on('delete:tabpanel', this.deleteTabpanel)

    this.$on('focus:tab', this.focusTab)
    this.$on('activate:tab', this.activateTab)
  },
  methods: {
    // Lifecycle
    createdTablist(tablist) {
      this.tablist = tablist
    },
    createdTabpanel(tabpanel) {
      this.tabpanels.push(tabpanel)
    },
    deleteTabpanel() {
      const { tabpanels } = this
      const tabpanel = this.focusedTabpanel

      tabpanels.splice(tabpanels.indexOf(tabpanel), 1)
      tabpanel.$emit('delete')
    },
    // State Management
    focusTab(tab) {
      this.focusedTab = tab
    },
    activateTab(tab) {
      this.activeTab = tab
    },
    // Helpers
    isControlledByFocusedTab({ id }) {
      return this.focusedTab.controls === id
    },
    isControlledByActiveTab({ id }) {
      return this.activeTab.controls === id
    },
  },
}
</script>
