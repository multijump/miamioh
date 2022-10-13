<script>
import { container } from '@/js/util/symbols/tabs'

import TabsAnimation from './TabsAnimation'

export default {
  inject: { container },
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    id: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      default: 'show',
      validator: value => [
        'if',
        'show',
      ].includes(value),
    },
  },
  computed: {
    active() {
      return this.container.activeTabpanel === this
    },
    ariaLabelledby() {
      return this.container.tabs.find(this.isControlledByTab).id
    },
  },
  created() {
    this.container.$emit('created:tabpanel', this)
    this.$on('delete', this.delete)
  },
  beforeDestroy() {
    this.$el.remove()
  },
  methods: {
    delete() {
      this.$destroy()
    },
    isControlledByTab({ controls }) {
      return controls === this.id
    },
    createEl(createElement, data) {
      if (!(this.mode === 'show' || this.active)) {
        return undefined
      }

      return createElement(TabsAnimation, data, this.$slots.default)
    },
  },
  render(createElement) {
    const { id, ariaLabelledby, active } = this
    const data = {
      attrs: {
        id,
        role: 'tabpanel',
        'aria-labelledby': ariaLabelledby,
      },
      class: { expanded: active },
      key: active,
      props: {
        tag: this.tag,
        change: active,
        options: {
          config: {
            opacity: 0,
          },
          duration: 0.4,
        },
      },
    }

    if (this.mode === 'show') {
      data.directives = [{
        name: 'show',
        value: active,
      }]
    }

    return this.createEl(createElement, data)
  },
}
</script>
