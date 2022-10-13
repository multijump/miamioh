<template>
  <div>
    <label
      :id="`${id}-label`"
      :class="showLabel"
    >
      {{ label }}
    </label>
    <div
      :class="showBorder"
      class="m_form-input">
      <input
        :id="id"
        :name="name"
        :type="type"
        :placeholder="!focus && label"
        :value="value"
        :aria-labelledby="`${id}-label`"
        @input="onInput"
        @focus="setFocusToLabel"
        @blur="removeFocusToLabel">
    </div>
    <p
      :id="`${id}-message`"
    >
      {{ valid ? '' : `Please enter a valid ${placeholder}` }}
    </p>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    required: {
      type: Number,
      default: 0,
    },
    submitted: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      focus: false,
      touched: false,
    }
  },
  computed: {
    label() {
      return this.placeholder + (this.required === 1 ? '*' : '')
    },
    showLabel() {
      const labelClasses = []
      if (this.focus) {
        labelClasses.push('focus')
      }
      if (this.value) {
        labelClasses.push('no-empty')
      }
      return labelClasses
    },
    showBorder() {
      return this.focus ? 'focus' : ''
    },
    valid() {
      return this.value || !(this.touched || this.submitted) || !this.required
    },
  },
  methods: {
    setFocusToLabel(event) {
      event.preventDefault()
      this.focus = true
    },
    removeFocusToLabel(event) {
      event.preventDefault()
      this.focus = false
      this.touched = true
    },
    onInput(event) {
      this.$emit('input', event.target.value)
    },
  },
}
</script>
