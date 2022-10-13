<template>
  <ModalContainer
    :modal-id="`video-${id}`"
  >
    <div class="video-modal__video-wrapper">
      {{ url }}
      <ModalButton
        :modal-id="`video-${id}`"
        class="ModalButton ModalButton--close"
      >
        Close Video
      </ModalButton>
      <PlayerLoader
        :player-id="`video-${id}`"
        :url="url"
        use-modal
      />
    </div>
  </ModalContainer>
</template>

<script>
import FocusTrap from '@/js/components/FocusTrap'

export default {
  components: {
    FocusTrap,
  },
  props: {
    id: {
      type: String,
      default: '1',
    },
    url: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      modalActive: false,
    }
  },
}
</script>
