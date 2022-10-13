import carousel from '@/js/util/symbols/carousel'

export default {
  inject: { carousel },

  methods: {
    handleButtonClick() {
      // for this component to work you have to bind the index to the
      // component's key property. :key="index"
      this.carousel.$emit('set:item', this.carousel.items[this.$vnode.key])
    },
  },

  render(createElement) {
    const elementData = {
      on: {
        click: this.handleButtonClick,
      },
    }
    return createElement('button', elementData, this.$slots.default)
  },
}
