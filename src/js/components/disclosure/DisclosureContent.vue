<script>
import eventBus from '@/js/util/eventBus'

export default {
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    disclosureId: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      default: 'show',
      validate: value => [
        'if',
        'show',
      ].includes(value),
    },
  },
  data() {
    return {
      expanded: undefined,
    }
  },
  created() {
    eventBus.$on('toggle', this.toggle)
    eventBus.$emit('created:container', this.disclosureId)
  },
  methods: {
    toggle({ controls, expanded }) {
      if (controls === this.disclosureId) {
        this.expanded = expanded
      }
    },

    createChild(createElement, data) {
      if (!(this.mode === 'show' || this.expanded)) {
        return undefined
      }

      return createElement(this.tag, data, this.$slots.default)
    },
  },
  render(createElement) {
    const { expanded } = this
    const data = {
      attrs: {
        id: this.disclosureId,
      },
      class: { expanded },
    }

    if (this.mode === 'show') {
      data.directives = [{
        name: 'show',
        value: expanded,
      }]
    }

    return this.createChild(createElement, data)
  },
}
</script>
