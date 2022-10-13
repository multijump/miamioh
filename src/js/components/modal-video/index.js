import BackgroundImage from './BackgroundImage'
import ModalButton from './ModalButton'
import ModalContainer from './ModalContainer'
import ModalContainerDialog from './ModalContainerDialog'
import ModalPlayButton from './ModalPlayButton'
import PlayerLoader from './PlayerLoader'
import PlayerVimeo from './PlayerVimeo'
import PlayerYoutube from './PlayerYoutube'
import VideoModal from './VideoModal'

// helper function
import register from '../../util/functions/register'

const ModalVideo = {
  BackgroundImage,
  ModalButton,
  ModalContainer,
  ModalContainerDialog,
  PlayerLoader,
  PlayerVimeo,
  PlayerYoutube,
  VideoModal,
  ModalPlayButton,
}

export default { install: Vue => register(Vue, ModalVideo) }
