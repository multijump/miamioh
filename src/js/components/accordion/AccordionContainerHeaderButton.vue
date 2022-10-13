<template>
  <component
    :id="id"
    :is="tag"
    :role="role"
    :type="type"
    :tabindex="tabindex"
    :aria-expanded="expanded.toString()"
    :aria-controls="controls"
    :aria-disabled="disabled.toString()"
    :aria-label="value"
    @click="handleClickEvent"
    @focus="handleFocusEvent"
    @keydown="handleKeydownEvent"
  >
    <slot/>
  </component>
</template>

<script>
import accordion from '@/js/util/symbols/accordion'

export default {
  inject: { accordion },
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
    value: {
      type: String,
      required: true,
    },
  },
  computed: {
    role() {
      return this.tag === 'button' ? null : 'button'
    },
    type() {
      return this.tag === 'button' ? 'button' : null
    },
    tabindex() {
      return this.role ? '0' : null
    },
    panel() {
      return this.accordion.panels.find(this.isControlledPanel)
    },
    expanded() {
      return this.panel ? this.panel.expanded : false
    },
    disabled() {
      if (!this.panel) {
        return true
      }

      return this.accordion.shouldNotCollapse && this.panel.expanded
    },
  },
  created() {
    this.$on('focus', this.focus)

    this.accordion.$emit('create:button', this)
  },
  methods: {
    focus() {
      this.$el.focus()
    },
    handleFocusEvent() {
      this.accordion.$emit('focus:button', this)
    },
    handleClickEvent() {
      this.accordion.$emit('click:button', this)
    },
    handleKeydownEvent(event) {
      const { key } = event
      const eventToEmit = {
        ArrowUp: 'focus:header.previous',
        ArrowDown: 'focus:header.next',
        Home: 'focus:header.first',
        End: 'focus:header.last',
        PageUp: 'focus:header.previous',
        PageDown: 'focus:header.next',
      }[key]

      if (!eventToEmit) {
        return
      }

      if (['PageUp', 'PageDown'].includes(key) && !event.ctrlKey) {
        return
      }

      event.preventDefault()

      this.accordion.$emit(eventToEmit)
    },
    isControlledPanel({ id }) {
      return id === this.controls
    },
  },
}
</script>
