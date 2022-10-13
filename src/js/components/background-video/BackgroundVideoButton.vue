<script>
import eventBus from '@/js/util/eventBus'

export default {
  props: {
    videoId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      toggle: false,
    }
  },

  created() {
    eventBus.$on('toggle', this.maybeToggle)
  },

  methods: {
    maybeToggle(id) {
      if (id !== this.videoId) {
        return
      }
      this.toggle = !this.toggle
    },
  },
  render(createElement) {
    const { toggle } = this
    const elementData = {
      on: {
        click: () => {
          eventBus.$emit('toggle', this.videoId)
        },
      },
      attrs: {
        'aria-label': toggle ? 'Play video' : 'Pause video',
      },
      class: toggle || 'isPlaying',
    }
    return createElement('button', elementData, this.$slots.default)
  },
}
</script>
