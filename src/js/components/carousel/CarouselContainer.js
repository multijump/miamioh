import propsTag from '@/js/util/props/propsTag'
import carousel from '@/js/util/symbols/carousel'
import BaseWindowWidth from '@/js/components/BaseWindowWidth'

export default {
  provide() {
    return { [carousel]: this }
  },
  extends: BaseWindowWidth,
  props: {
    ...propsTag,
  },

  data: () => ({
    items: [],
    currentItem: undefined,
  }),

  created() {
    // carousel direction has callback which
    // is a string prop either previous or next
    this.$on('carousel:direction', direction => this[`${direction}Item`]())
    // set item
    this.$on('set:item', this.setItem)
    // creates items
    this.$on('create:items', this.createItems)
    // set next item
    this.$on('set:item:next', this.nextItem)
    // set prev item
    this.$on('set:item:prev', this.previousItem)
  },

  computed: {
    currentItemIndex() {
      return this.items.indexOf(this.currentItem)
    },
    isMobile() {
      return window.innerWidth < 1024
    },
  },

  methods: {
    setItem(item) {
      this.currentItem = item
      this.$emit('select:slider:self', this.currentItemIndex)
    },

    createItems(item) {
      this.items.push(item)

      if (!this.currentItem) {
        this.setItem(item)
      }

      // need this?
      // this.setItem(this.items[Math.floor(this.items.length / 2) - 1])
    },

    nextItem() {
      this.carouselDirection(this.currentItemIndex + 1)

      if (this.isMobile && this.currentItemIndex !== 0) {
        setTimeout(() => {
          this.$emit('set:item:title', this.items[this.currentItemIndex])
        }, 50)
      }
    },
    previousItem() {
      this.carouselDirection(this.currentItemIndex - 1)
    },

    carouselDirection(direction) {
      const { items } = this
      const { length } = items
      let currentItem = 0
      if (this.isMobile) {
        if (direction < 0) {
          currentItem = items[0]
        } else if (direction > items.length - 1) {
          currentItem = items[items.length - 1]
        } else {
          currentItem = items[(((direction) % length) + length) % length]
        }
      } else {
        currentItem = items[(((direction) % length) + length) % length]
      }

      this.setItem(currentItem)
    },
  },

  render(createElement) {
    return createElement(this.tag, this.$slots.default)
  },
}
