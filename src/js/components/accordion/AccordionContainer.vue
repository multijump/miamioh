<script>
import { mod } from '@/js/util/functions/helpers'
import accordion from '@/js/util/symbols/accordion'

export default {
  provide() {
    return {
      [accordion]: this,
    }
  },
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    collapse: {
      type: Boolean,
      default: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      panels: [],
      buttons: [],
      currentButton: undefined,
    }
  },
  computed: {
    currentPanel() {
      if (!this.currentButton) {
        return undefined
      }

      return this.panels.find(this.isCurrentPanel)
    },
    expandedPanels() {
      return this.panels.filter(({ expanded }) => expanded)
    },
    shouldNotCollapse() {
      return !this.collapse && this.expandedPanels.length === 1
    },
    shouldCollapseExpandedPanels() {
      return !(this.multiple || this.currentPanel.expanded)
    },
    previousButton() {
      return this.buttons[this.getPreviousButtonIndex()]
    },
    nextButton() {
      return this.buttons[this.getNextButtonIndex()]
    },
    firstButton() {
      return this.buttons[0]
    },
    lastButton() {
      const { buttons } = this

      return buttons[buttons.length - 1]
    },
  },
  created() {
    // Create Events
    this.$on('create:panel', this.createdPanel)
    this.$on('create:button', this.createdButton)

    // DOM Events
    this.$on('focus:button', this.focusedButton)
    this.$on('click:button', this.clickedButton)

    // Container Events
    this.$on('focus:header.previous', this.focusHeaderPrevious)
    this.$on('focus:header.current', this.focusHeaderCurrent)
    this.$on('focus:header.next', this.focusHeaderNext)
    this.$on('focus:header.first', this.focusHeaderFirst)
    this.$on('focus:header.last', this.focusHeaderLast)
  },
  methods: {
    createdPanel(panel) {
      this.panels.push(panel)
    },
    createdButton(button) {
      this.buttons.push(button)
    },
    focusedButton(button) {
      this.currentButton = button
    },
    clickedButton(button) {
      this.currentButton = button

      if (this.shouldNotCollapse && this.currentPanel.expanded) {
        return
      }

      if (this.shouldCollapseExpandedPanels) {
        this.collapseExpandedPanels()
      }

      this.currentPanel.$emit('toggle')
    },
    focusHeaderPrevious() {
      this.previousButton.$emit('focus')
    },
    focusHeaderCurrent() {
      this.currentButton.$emit('focus')
    },
    focusHeaderNext() {
      this.nextButton.$emit('focus')
    },
    focusHeaderFirst() {
      this.firstButton.$emit('focus')
    },
    focusHeaderLast() {
      this.lastButton.$emit('focus')
    },
    collapseExpandedPanels() {
      this.expandedPanels.forEach(panel => panel.$emit('toggle'))
    },
    getPreviousButtonIndex() {
      const { buttons } = this

      return mod(buttons.indexOf(this.currentButton) - 1, buttons.length)
    },
    getNextButtonIndex() {
      const { buttons } = this

      return (buttons.indexOf(this.currentButton) + 1) % buttons.length
    },
    isCurrentPanel({ id }) {
      return id === this.currentButton.controls
    },
  },
  render(createElement) {
    return createElement(this.tag, this.$slots.default)
  },
}
</script>
