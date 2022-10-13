<script>
import EventBus from '@/js/util/eventBus'
import propsModalId from '@/js/util/props/propsModalId'

export default {
  props: {
    tag: {
      type: String,
      default: 'button',
    },

    ...propsModalId,
  },

  methods: {
    handleClickEvent() {
      EventBus.$emit('toggle:modal', this.modalId)
    },

    // handleKeyUpevent(event) {
    // event.preventDefault()

    // if (event.key === 'Tab') {
    //   EventBus.$emit('modal:focus', this.modalId)
    // }
    // },
  },
  render(createElement) {
    const elementData = {
      staticClass: 'ModalButton',
      on: {
        // keydown: this.handleKeyUpevent,
        click: this.handleClickEvent,
      },
    }
    return createElement(this.tag, elementData, this.$slots.default)
  },
}
</script>
