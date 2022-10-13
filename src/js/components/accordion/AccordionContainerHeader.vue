<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    level: {
      type: Number,
      default: null,
      validator: value => Number.isInteger(value) && value >= 1,
    },
  },
  computed: {
    isHeadingElement() {
      return ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(this.tag)
    },
    role() {
      return this.isHeadingElement ? null : 'heading'
    },
  },
  created() {
    if (process.env.NODE_ENV !== 'production') {
      if (!(this.isHeadingElement || this.ariaLevel)) {
        // eslint-disable-next-line no-console
        console.error(`
          Each accordion header button is wrapped in an element with role heading that has a value set for aria-level that is appropriate for the information architecture of the page.\n
          - If the native host language has an element with an implicit heading and aria-level, such as an HTML heading tag, a native host language element may be used.\n
          See https://www.w3.org/TR/wai-aria-practices/#wai-aria-roles-states-and-properties for more information.
        `)
      }
    }
  },
  render(createElement) {
    const attrs = { role: this.role }
    return createElement(this.tag, { attrs }, this.$slots.default)
  },
}
</script>
