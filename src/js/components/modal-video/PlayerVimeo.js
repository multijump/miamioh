import Player from '@vimeo/player'
import getVideoId from 'get-video-id'

import EventBus from '@/js/util/eventBus'
import playerProps from '@/js/util/props/playerProps'

export default {
  props: {
    ...playerProps,

    backgroundVideo: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    toggle: false,
    player: undefined,
  }),

  computed: {
    determineModalUsage() {
      if (!this.useModal) {
        return false
      }

      return window.innerWidth > 1024
    },
  },

  created() {
    EventBus.$on(`toggle:${this.determineModalUsage ? 'modal' : 'video'}`, this.maybeToggle)
    // EventBus.$on('modal:focus', this.handleFocus)
  },

  mounted() {
    const { backgroundVideo } = this
    const { id } = getVideoId(this.url)
    // Note: to enable the player's background mode
    // which hides the controls, autoplays and loops the
    // video, the account being used must be Plus, PRO,
    // or Business. Then you options object can look like
    //
    // const options = {
    //   id,
    //   background: backgroundVideo
    // }

    // for more information on emebed options
    // https://www.npmjs.com/package/@vimeo/player#embed-options
    const options = {
      id,
      playsinline: false,
      loop: backgroundVideo,
      muted: backgroundVideo,
      autoplay: backgroundVideo,
    }

    this.player = new Player(this.$el, Object.assign(options, this.options))
  },

  methods: {
    maybeToggle(buttonId) {
      // if the VideoButton and the VideoPlayer
      // dont have same the id prop do nothing
      if (buttonId !== this.playerId) {
        return
      }

      this.toggle = !this.toggle
      this.player[this.toggle ? 'play' : 'pause']()
    },
    // handleFocus(modalId) {
    //   if (modalId === this.playerId) {
    //     this.player.element.focus()
    //   }
    // },
  },

  render: createElement => createElement('div', { attrs: { tabindex: '0' } }),
}
