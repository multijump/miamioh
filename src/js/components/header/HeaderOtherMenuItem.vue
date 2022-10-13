<template>
  <li>
    <slot/>
  </li>
</template>

<script>
import eventBus from '@/js/util/eventBus'

export default {
  props: {
    last: {
      type: String,
      default: '0',
    },
    index: {
      type: String,
      default: '0',
    },
  },

  data() {
    return {
      showMenu: false,
      isOpen: false,
    }
  },

  computed: {
    isMobile() {
      return window.innerWidth < 1024
    },
  },

  created() {
    eventBus.$on('select:other:last', this.selectLastMenu)
    eventBus.$on('select:other:first', this.selectFirstMenu)
  },

  methods: {
    selectLastMenu() {
      if (parseInt(this.last, 10) === parseInt(this.index, 10) && !this.isMobile) {
        this.$el.lastChild.focus()
      }
    },

    selectFirstMenu() {
      if (this.index === '0') {
        this.$el.lastChild.focus()
      }
    },

    // onTabKey(event) {
    //   if (this.isLast && !this.isMobile &&
    //     event.key === 'Tab' && !event.shiftKey) {
    //     event.preventDefault()
    //     eventBus.$emit('select:trigger')
    //   }
    // },
  },
}
</script>
