<template>
  <div>
    <label
      v-show="false"
      :id="`${id}-label`"
    >
      {{ placeholder }}
    </label>
    <textarea
      :id="id"
      :name="name"
      :placeholder="label"
      :rows="rows"
      :value="value"
      :aria-labelledby="`${id}-label`"
      @input="onInput"/>
    <p>{{ error }}</p>
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
    rows: {
      type: Number,
      default: 10,
    },
    value: {
      type: String,
      default: '',
    },
    required: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      error: null,
    }
  },
  computed: {
    label() {
      return this.placeholder + (this.required === 1 ? '*' : '')
    },
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
    },
  },
}
</script>
