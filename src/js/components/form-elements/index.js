import FormContainer from './FormContainer'
import FormInput from './FormInput'
import FormTextarea from './FormTextarea'
import FormSelect from './FormSelect'

// helper function
import register from '../../util/functions/register'

const Elements = {
  FormContainer,
  FormInput,
  FormTextarea,
  FormSelect,
}

export default { install: Vue => register(Vue, Elements) }
