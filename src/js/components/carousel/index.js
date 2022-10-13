import CarouselContainer from './CarouselContainer'
import CarouselContainerItem from './CarouselContainerItem'
import CarouselContainerImage from './CarouselContainerImage'
import CarouselContainerButton from './CarouselContainerButton'
import CarouselContainerControl from './CarouselContainerControl'

// slider control
import CarouselContainerSlider from './CarouselContainerSlider'
import CarouselContainerSliderSecondary from './CarouselContainerSliderSecondary'

// list
import CarouselContainerList from './CarouselContainerList'
import CarouselContainerListSecondary from './CarouselContainerListSecondary'
import CarouselContainerListItem from './CarouselContainerListItem'

// item element
import CarouselItemTitle from './CarouselItemTitle'
import CarouselItemDescription from './CarouselItemDescription'

// helper function
import register from '../../util/functions/register'

const Carousel = {
  CarouselContainer,
  CarouselContainerList,
  CarouselContainerListSecondary,
  CarouselContainerItem,
  CarouselContainerImage,
  CarouselContainerButton,
  CarouselContainerSlider,
  CarouselContainerSliderSecondary,
  CarouselContainerControl,
  CarouselContainerListItem,
  CarouselItemTitle,
  CarouselItemDescription,
}

export default { install: Vue => register(Vue, Carousel) }
