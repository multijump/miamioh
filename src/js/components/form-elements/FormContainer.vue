<template>
  <form class="m_form--wrapper">
    <slot/>
    <article
      v-for="element in elements"
      :class="`form-element form-element--layout-${element.layout || 1}`"
      :key="element.id">
      <form-input
        v-if="element.elementname === 'input'"
        :id="element.id"
        :name="element.name"
        :placeholder="element.placeholder"
        :type="element.type"
        :required="element.required"
        :submitted="submitted"
        v-model="binds[element.id]"
      />
      <form-textarea
        v-else-if="element.elementname === 'textarea'"
        :id="element.id"
        :name="element.name"
        :placeholder="element.placeholder"
        :required="element.required"
        :rows="element.rows"
        v-model="binds[element.id]"
      />
      <form-select
        v-else-if="element.elementname === 'select'"
        :id="element.id"
        :name="element.name"
        :placeholder="element.placeholder"
        :required="element.required"
        :options="element.options"
        :submitted="submitted"
        v-model="binds[element.id]"
      />
    </article>
    <article
      class="form-element form-element--layout-1">
      <button
        type="submit"
        class="base-cta-primary base-cta-primary--dark"
        @click="onSubmit">
        <span class="base-cta-primary__outline"/>
        <span class="base-cta-primary__content">
          submit
          <span class="base-cta-primary__arrow"/>
        </span>
      </button>
    </article>
  </form>
</template>
<script>
export default {
  props: {
    childData: {
      type: String,
      default: '[]',
    },
  },
  data() {
    const elements = JSON.parse(this.childData)
    const binds = {}
    elements.forEach((element) => {
      binds[element.id] = ''
    })
    return {
      binds,
      submitted: false,
      elements,
    }
  },
  computed: {
    errors() {
      let error = false
      let focused = false
      this.elements.forEach((element) => {
        if (element.required && !this.binds[element.id]) {
          if (focused === false) {
            document.getElementById(element.id).focus()
            document.getElementById(element.id).setAttribute('aria-labelledby', `${element.id}-message`)
            focused = true
          }
          error = true
        }
      })
      return error
    },
  },
  methods: {
    onSubmit(event) {
      if (this.errors) {
        event.preventDefault()
        this.submitted = true
      }
    },
  },
}
</script>
