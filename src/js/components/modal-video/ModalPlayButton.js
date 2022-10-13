import eventBus from '@/js/util/eventBus'

export default {
  props: {
    videoId: {
      type: Number,
      required: true,
    },
  },

  render(createElement) {
    const elementData = {
      on: {
        click: () => {
          eventBus.$emit('toggle:modal', `video-${this.videoId}`)
        },
      },
      attrs: {
        'aria-label': 'Play video',
      },
    }
    return createElement('button', elementData, this.$slots.default)
  },
}
