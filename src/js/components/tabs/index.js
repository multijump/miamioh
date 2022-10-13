import TabsContainer from './TabsContainer'
import TabsAnimation from './TabsAnimation'
import TabsContainerTablist from './TabsContainerTablist'
import TabsContainerTabPanel from './TabsContainerTabPanel'
import TabsContainerTablistTab from './TabsContainerTablistTab'

// helper function
import register from '../../util/functions/register'

const Tabs = {
  TabsContainer,
  TabsAnimation,
  TabsContainerTablist,
  TabsContainerTabPanel,
  TabsContainerTablistTab,
}

export default { install: Vue => register(Vue, Tabs) }
