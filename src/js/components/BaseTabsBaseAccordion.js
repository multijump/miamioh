import BaseTabs from './BaseTabs'
import BaseAccordion from './BaseAccordion'
import windowWidth from '../mixins/windowWidth'

export default {
  components: {
    BaseTabs,
    BaseAccordion,
  },
  mixins: [windowWidth],
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  render(createElement) {
    return createElement(`Base${this.large ? 'Tabs' : 'Accordion'}`, { props: { items: this.items } })
  },
}
