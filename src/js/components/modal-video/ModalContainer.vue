<script>
import EventBus from '@/js/util/eventBus'
import propsTag from '@/js/util/props/propsTag'
import propsModalId from '@/js/util/props/propsModalId'

import ModalContainerDialog from './ModalContainerDialog'

export default {
  provide() {
    return { modal: this }
  },
  props: {
    ...propsTag,
    ...propsModalId,
    mode: {
      type: String,
      default: 'show',
      validator: mode => [
        'if',
        'show',
      ].includes(mode),
    },
    initiallyExpanded: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      expanded: false,
      modalDialog: undefined,
    }
  },

  created() {
    EventBus.$on('toggle:modal', this.maybeToggleModal)
  },
  mounted() {
    if (this.initiallyExpanded) {
      this.toggleModal()
    }

    document.addEventListener('keyup', this.handleKeyEvent)
  },

  beforeDestroy() {
    document.addEventListener('keyup', this.handleKeyEvent)
  },

  methods: {
    handleKeyEvent({ keyCode }) {
      if (keyCode !== 27) {
        return
      }

      EventBus.$emit('toggle:modal', this.modalId)
    },
    maybeToggleModal(buttonId) {
      if (buttonId !== this.modalId) {
        return
      }

      this.toggleModal()
    },

    toggleModal() {
      const { expanded } = this

      this.expanded = !expanded

      this.$emit(`modal-${this.expanded ? 'open' : 'close'}`)
    },

    createsFocusTrap(createElement, position) {
      return createElement('div', {
        attrs: { tabindex: 0 },
        on: { focus: () => this.modalDialog.$emit(`focus-${position}-descendant`) },
      })
    },

    createsModalButton(createElement) {
      const { modalButton } = this.$slots
      const elementData = {
        class: 'ModalButton--close',
        props: { modalId: this.modalId },
      }

      return modalButton
        ? createElement('ModalButton', elementData, modalButton)
        : undefined
    },

    createsModalDialog(createElement) {
      const modalDialog = createElement(ModalContainerDialog, {
        on: {
          createsModalDialog: (dialog) => {
            this.modalDialog = dialog
          },
        },
      }, this.$slots.default)

      return [
        this.createsFocusTrap(createElement, 'first'),
        this.createsModalButton(createElement),
        modalDialog,
        this.createsFocusTrap(createElement, 'last'),
      ]
    },
  },

  render(createElement) {
    const elementData = { staticClass: 'ModalContainer' }

    const { expanded, mode } = this

    if (mode === 'show') {
      elementData.directives = [{
        name: 'show',
        value: expanded,
      }]
    }

    const modalOverlay = createElement('div', {
      staticClass: 'ModalContainer__overlay',
      on: { click: () => EventBus.$emit('toggle:modal', this.modalId) },
    })

    const modalDialog = this.createsModalDialog(createElement)

    return mode === 'show' || expanded
      ? createElement(this.tag, elementData, [modalOverlay, modalDialog])
      : undefined
  },
}
</script>
