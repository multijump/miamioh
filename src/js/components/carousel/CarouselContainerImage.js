import propsTag from '@/js/util/props/propsTag'
import carousel from '@/js/util/symbols/carousel'

export default {
  props: {
    ...propsTag,
  },
  inject: { carousel },
  computed: {
    currentItemIndex() {
      // for this component to work you have to bind the index to the
      // component's key property. :key="index"
      return `${this.carousel.currentItemIndex}` === this.$vnode.key
    },
  },

  render(createElement) {
    const elementData = {
      // attrs: {
      //   tabindex: 0,
      // },
      directives: [{
        name: 'show',
        value: this.currentItemIndex,
      }],
    }
    return createElement(this.tag, elementData, this.$slots.default)
  },
}
