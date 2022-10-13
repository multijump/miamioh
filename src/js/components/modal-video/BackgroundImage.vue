<script>
import eventBus from '@/js/util/eventBus'
import getVideoId from 'get-video-id'
import { fetch } from 'whatwg-fetch'
import ES6Promise from 'es6-promise'

ES6Promise.polyfill()

export default {
  props: {
    videoId: {
      type: Number,
      required: true,
    },
    videoSrc: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    const { service } = getVideoId(this.videoSrc)

    return {
      service,
      imageUrl: '',
    }
  },

  created() {
    this.getImageUrl()
  },

  methods: {
    getImageUrl() {
      const { service } = this
      const { id } = getVideoId(this.videoSrc)

      if (service === 'youtube') {
        this.imageUrl = `https://img.youtube.com/vi/${id}/hqdefault.jpg`
      } else {
        this.getJson(`https://vimeo.com/api/v2/video/${id}.json`)
      }
    },
    getJson(url) {
      const self = this
      fetch(url)
        .then(res => res.json())
        .then((data) => {
          self.imageUrl = data[0].thumbnail_large
        })
    },
    createImage(createElement) {
      const attrs = Object.assign(
        {
          alt: '',
          'aria-hidden': true,
        },
        this.options,
      )
      const elementData = {
        domProps: {
          src: this.imageUrl,
        },
        attrs,
      }
      return createElement('img', elementData)
    },
  },

  render(createElement) {
    return createElement('a', {
      attrs: {
        href: '',
        'aria-label': this.label,
      },
      on: {
        click: (e) => {
          e.preventDefault()
          eventBus.$emit('toggle:modal', `video-${this.videoId}`)
        },
        keyup: (e) => {
          e.preventDefault()
          if (e.keyCode !== 27) {
            return
          }

          eventBus.$emit('toggle:modal', `video-${this.videoId}`)
        },
      },
    }, [this.createImage(createElement)])
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
img {
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
