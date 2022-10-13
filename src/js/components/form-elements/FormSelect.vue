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
      <select
        :id="id"
        :class="focusClass"
        :name="name"
        :value="value"
        :aria-labelledby="`${id}-label`"
        @input="onInput"
        @focus="setFocusToLabel"
        @blur="removeFocusToLabel">
        <option value="">
          {{ placeholder }}
        </option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value">
          {{ option.text }}
        </option>
      </select>
      <span
        :class="focusClass"
        class="caret-down"/>
    </div>
    <p>{{ valid ? '' : `Please enter the ${placeholder}` }}</p>
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
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
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
    focusClass() {
      return this.value ? 'focus' : ''
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
