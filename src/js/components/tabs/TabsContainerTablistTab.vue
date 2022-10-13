<template>
  <component
    :id="id"
    :is="tag"
    :type="type"
    :tabindex="tabindex"
    :aria-selected="ariaSelected"
    :aria-controls="controls"
    role="tab"
    @focus="handleFocusEvent"
    @click="handleClickEvent"
    @keydown="handleKeydownEvent"
  >
    <slot/>
  </component>
</template>

<script>
import { tablist } from '@/js/util/symbols/tabs'

export default {
  inject: { tablist },
  props: {
    tag: {
      type: String,
      default: 'button',
    },
    id: {
      type: String,
      required: true,
    },
    controls: {
      type: String,
      required: true,
      validator: value => !value.includes(' '),
    },
    deletable: {
      type: Boolean,
      default: false,
    },
    initiallyActive: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    active() {
      return this.tablist.activeTab === this
    },
    focused() {
      return this.tablist.focusedTab === this
    },
    // Attributes
    tabindex() {
      if (this.tag === 'button' && this.active) {
        return null
      }

      return this.active ? '0' : '-1'
    },
    type() {
      return this.tag === 'button' ? 'button' : null
    },
    orientation() {
      return this.tablist.orientation
    },
    previousKey() {
      return {
        horizontal: ['ArrowLeft', 'Left'],
        vertical: ['ArrowUp', 'Up'],
      }[this.orientation]
    },
    nextKey() {
      return {
        horizontal: ['ArrowRight', 'Right'],
        vertical: ['ArrowDown', 'Down'],
      }[this.orientation]
    },
    ariaSelected() {
      return this.active.toString()
    },
  },
  created() {
    this.tablist.$emit('created:tab', this)

    this.$on('focus', this.focus)
    this.$on('delete', this.delete)
  },
  beforeDestroy() {
    this.$el.remove()
  },
  methods: {
    delete() {
      this.$destroy()
    },
    focus() {
      this.$el.focus()
    },
    handleFocusEvent() {
      this.tablist.$emit('focused:tab.el', this)
    },
    handleClickEvent() {
      this.tablist.$emit('clicked:tab.el', this)
    },
    handleKeydownEvent(event) {
      const { key } = event
      const eventToEmit = {
        [this.previousKey[0]]: 'focus:tab.previous',
        [this.previousKey[1]]: 'focus:tab.previous',
        [this.nextKey[0]]: 'focus:tab.next',
        [this.nextKey[1]]: 'focus:tab.next',
        Home: 'focus:tab.first',
        End: 'focus:tab.last',
        Delete: 'delete:tab',
      }[key]

      if (!eventToEmit) {
        return
      }
      if (!this.deletable && key === 'Delete') {
        return
      }

      event.preventDefault()

      this.tablist.$emit(eventToEmit)
    },
  },
}
</script>
