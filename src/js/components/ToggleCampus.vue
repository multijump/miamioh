<template>
  <div>
    <div class="toggle-campus__select-wrap">
      <select
        v-model="activeItem"
        aria-label="Campuses"
        class="toggle-campus__select"
      >
        <option value="placeholder">Select a Campus</option>
        <option
          v-for="(item, index) in items"
          :key="`ToggleCampus--${index}`"
          :value="item"
        >
          {{ item.panelTitle }}
        </option>
      </select>
    </div>
    <slot/>
  </div>
</template>

<script>
export default {
  provide() {
    return { container: this }
  },
  data() {
    return {
      items: [],
      activeItem: 'placeholder',
    }
  },
  created() {
    this.$on('create:panel', this.createdPanel)
  },
  methods: {
    createdPanel(panel) {
      this.items.push(panel)
    },
  },
}
</script>
