<script>
import accordion from '@/js/util/symbols/accordion'

import AccordionContainerAnimation from './AccordionContainerAnimation'

export default {
  inject: { accordion },
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    id: {
      type: String,
      required: true,
    },
    initiallyExpanded: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      expanded: this.initiallyExpanded,
    }
  },
  computed: {
    button() {
      return this.accordion.buttons.find(this.isLabelledbyButton)
    },
    role() {
      const accordionVm = this.accordion

      if (accordionVm.multiple && accordionVm.panels.length > 6) {
        return null
      }

      return 'region'
    },
    ariaLabelledby() {
      return this.button ? this.button.id : null
    },
  },
  watch: {
    initiallyExpanded: 'toggle',
  },
  created() {
    this.$on('toggle', this.toggle)

    this.accordion.$emit('create:panel', this)
  },
  methods: {
    toggle(expanded = !this.expanded) {
      this.expanded = expanded
    },
    handleKeydown(event) {
      if (!event.ctrlKey) {
        return
      }

      const eventToEmit = {
        PageUp: 'focus:header.current',
        PageDown: 'focus:header.next',
      }[event.key]

      if (!eventToEmit) {
        return
      }

      event.preventDefault()

      this.accordion.$emit(eventToEmit)
    },
    isLabelledbyButton({ controls }) {
      return this.id === controls
    },
  },
  render(createElement) {
    const {
      id,
      role,
      expanded,
      ariaLabelledby,
    } = this

    let data = null

    data = {
      attrs: {
        id,
        role,
        'aria-hidden': expanded === 'expanded' ? 'false' : 'true',
        'aria-labelledby': ariaLabelledby,
      },
      class: { expanded },
      props: {
        expanded,
        tag: this.tag,
        options: {
          duration: 0.4,
        },
      },
      on: { keydown: this.handleKeydown },
    }

    if (expanded) {
      data = {
        attrs: {
          id,
          role,
          'aria-hidden': expanded === 'expanded' ? 'true' : 'false',
          'aria-labelledby': ariaLabelledby,
        },
        class: { expanded },
        props: {
          expanded,
          tag: this.tag,
          options: {
            duration: 0.4,
          },
        },
        on: { keydown: this.handleKeydown },
      }
    }

    return createElement(AccordionContainerAnimation, data, this.$slots.default)
  },
}
</script>
