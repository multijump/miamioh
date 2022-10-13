import BackgroundVideo from './BackgroundVideo'
import BackgroundVideoButton from './BackgroundVideoButton'

// helper function
import register from '../../util/functions/register'

const BackgroundVideoComponents = {
  BackgroundVideo,
  BackgroundVideoButton,
}

export default { install: Vue => register(Vue, BackgroundVideoComponents) }
