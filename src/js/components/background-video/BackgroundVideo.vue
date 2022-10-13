<script>
import eventBus from '@/js/util/eventBus'

export default {
  props: {
    videoSrc: {
      type: String,
      required: true,
    },
    videoId: {
      type: Number,
      required: true,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      toggle: false,
    }
  },

  watch: {
    toggle: 'toggleVideo',
  },

  created() {
    eventBus.$on('toggle', this.maybeToggle)
  },

  methods: {
    randomize(id) {
      // eslint-disable-next-line no-underscore-dangle
      return id * this._uid
    },

    maybeToggle(id) {
      const buttonId = this.randomize(id)
      const videoId = this.randomize(this.videoId)
      if (videoId !== buttonId) {
        return
      }
      this.toggle = !this.toggle
    },

    toggleVideo() {
      const { toggle } = this
      const { childNodes: [el] } = this.$el
      const player = {
        default: toggle ? el.play() : el.pause(),
        autoplay: toggle ? el.pause() : el.play(),
      }

      return !el.autoplay ? player.default : player.autoplay
    },

    createVideo(createElement) {
      const domProps = {
        muted: true,
      }
      const attrs = Object.assign(
        {
          loop: true,
          autoplay: true,
          playsinline: '',
          src: this.videoSrc,
          'aria-hidden': true,
        },
        this.options,
      )
      const elementData = {
        domProps,
        attrs,
      }
      return createElement('video', elementData)
    },
  },

  render(createElement) {
    return createElement('div', [this.createVideo(createElement)])
  },
}
</script>

<style
  scoped
  lang="scss"
>
div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
video {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: -1;
  width: auto;
  height: auto;
  min-width: 100%;
  min-height: 100%;
  transform: translate(-50%, -50%)
}
</style>
