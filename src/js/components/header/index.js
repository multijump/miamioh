import HeaderMenu from './HeaderMenu'
import HeaderMenuTrigger from './HeaderMenuTrigger'
import HeaderSearchButton from './HeaderSearchButton'
import HeaderMainMenu from './HeaderMainMenu'
import HeaderChildMenu from './HeaderChildMenu'
import HeaderMainMenuContainer from './HeaderMainMenuContainer'
import HeaderSearchMenu from './HeaderSearchMenu'
import HeaderUtilityTopMenuItem from './HeaderUtilityTopMenuItem'
import HeaderUtilityMenuItem from './HeaderUtilityMenuItem'
import HeaderSocialMenu from './HeaderSocialMenu'
import HeaderOtherMenuItem from './HeaderOtherMenuItem'
import HeaderMenuOverlay from './HeaderMenuOverlay'

// helper function
import register from '../../util/functions/register'

const Header = {
  HeaderMenu,
  HeaderMenuTrigger,
  HeaderSearchButton,
  HeaderMainMenu,
  HeaderChildMenu,
  HeaderMainMenuContainer,
  HeaderSearchMenu,
  HeaderUtilityTopMenuItem,
  HeaderUtilityMenuItem,
  HeaderSocialMenu,
  HeaderOtherMenuItem,
  HeaderMenuOverlay,
}

export default { install: Vue => register(Vue, Header) }
