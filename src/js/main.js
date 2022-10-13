import Vue from 'vue'

import Highcharts from 'highcharts'
import HighchartsVue from 'highcharts-vue'

// Pollyfills
import svg4everybody from 'svg4everybody'
import objectFitImages from 'object-fit-images'

// SASS
import '../styles/main.scss'

// Components
import ToggleCampus from './components/ToggleCampus'
import BaseWindowWidth from './components/BaseWindowWidth'
import ToggleCampusPanel from './components/ToggleCampusPanel'
import NumberPrecision from './components/NumberPrecision'
import Alerts from './components/Alerts'
import SearchResults from './components/SearchResults'
import SwitchTabinfo from './components/SwitchTabinfo'
import SwitchTabinfoPanel from './components/SwitchTabinfoPanel'
import PieChart from './components/PieChart'
import EventDate from './components/EventDate'
import LinkCover from './components/LinkCover'

// Helper function for registration
import register from './util/functions/register'

// Plugins
import Header from './components/header/index'
import Tabs from './components/tabs/index'
import Carousel from './components/carousel/index'
import Accordion from './components/accordion/index'
import BackgroundVideo from './components/background-video/index'
import ModalVideo from './components/modal-video/index'
import FormElements from './components/form-elements/index'

// Accessibility
import DicernableContent from './components/DicernableContent'

// RSS Parser
import RssParser from './components/RssParser'

// disclosure
import Dislcosure from './components/disclosure/index'
// remount on window width
import RemountOnWindowWidth from './components/RemountOnWindowWidth'

const Components = {
  ...Dislcosure,
  RemountOnWindowWidth,
  ToggleCampus,
  BaseWindowWidth,
  ToggleCampusPanel,
  DicernableContent,
  NumberPrecision,
  Alerts,
  SearchResults,
  SwitchTabinfo,
  SwitchTabinfoPanel,
  PieChart,
  EventDate,
  LinkCover,
  RssParser,
}

// Component Registration
register(Vue, Components)

// Plugin Invocation
Vue.use(Header)
Vue.use(Tabs)
Vue.use(Carousel)
Vue.use(Accordion)
Vue.use(BackgroundVideo)
Vue.use(HighchartsVue, {
  highcharts: Highcharts,
})
Vue.use(ModalVideo)
Vue.use(FormElements)

new Vue({
  delimiters: ['<%', '%>'],
  mounted() {
    svg4everybody()
    objectFitImages()
  },
}).$mount('#app')
