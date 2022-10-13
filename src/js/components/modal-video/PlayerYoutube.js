import Player from 'youtube-player'
import getVideoId from 'get-video-id'

import EventBus from '@/js/util/eventBus'
import playerProps from '@/js/util/props/playerProps'

// Both PlayerYoutube and PlayerVimeo work outisde of
// the loader without any aditional configuration

export default {
  props: {
    // shared props with
    // PlayerLoader, PlayerVimeo
    ...playerProps,
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
    // if you are using this with the modal you
    // will have to pass in the prop useModal
    EventBus.$on(`toggle:${this.determineModalUsage ? 'modal' : 'video'}`, this.maybeToggle)
  },

  mounted() {
    const { id } = getVideoId(this.url)
    const options = {
      videoId: id,
    }

    this.player = new Player(this.$el, Object.assign(options, this.options))
    this.player.on('stateChange', this.handleStateChange)
    // EventBus.$on('modal:focus', this.handleFocus)
  },

  methods: {
    maybeToggle(playerId) {
      // if the VideoButton and the VideoPlayer
      // dont have same the id prop do nothing
      if (playerId !== this.playerId) {
        return
      }

      this.toggle = !this.toggle

      this.player[this.toggle ? 'playVideo' : 'pauseVideo']()
    },
    handleStateChange({ data }) {
      const stateNames = { 2: 'paused' }[data]
      if (!stateNames) {
        return
      }

      this.player.pauseVideo()
    },
    handleFocus(modalId) {
      if (modalId === this.playerId) {
        this.player.getIframe()
          .then((iframe) => {
            iframe.focus()
          })
      }
    },
  },

  render: createElement => createElement('div'),
}
