import AccordionContainer from './AccordionContainer'
import AccordionContainerPanel from './AccordionContainerPanel'
import AccordionContainerHeader from './AccordionContainerHeader'
import AccordionContainerAnimation from './AccordionContainerAnimation'
import AccordionContainerHeaderButton from './AccordionContainerHeaderButton'

// helper function
import register from '../../util/functions/register'

const Accordion = {
  AccordionContainer,
  AccordionContainerPanel,
  AccordionContainerHeader,
  AccordionContainerAnimation,
  AccordionContainerHeaderButton,
}

export default { install: Vue => register(Vue, Accordion) }
