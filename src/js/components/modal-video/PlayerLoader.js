import getVideoId from 'get-video-id'

import playerProps from '@/js/util/props/playerProps'

import PlayerVimeo from '@/js/components/modal-video/PlayerVimeo'
import PlayerYoutube from '@/js/components/modal-video/PlayerYoutube'

export default {
  components: {
    PlayerVimeo,
    PlayerYoutube,
  },
  props: { ...playerProps },

  data() {
    const { service } = getVideoId(this.url)

    return { service }
  },

  computed: {
    PlayerLoaded() {
      return `Player${this.playerService}`
    },
    playerService() {
      const { service } = this

      return service.charAt(0).toUpperCase().concat(`${service.slice(1)}`)
    },
  },

  render(createElement) {
    const props = {
      url: this.url,
      options: this.options,
      useModal: this.useModal,
      playerId: this.playerId,
    }

    return createElement(this.PlayerLoaded, { props })
  },
}
