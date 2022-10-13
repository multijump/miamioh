<template>
  <div>
    <div class="tabs-info_inner">
      <div class="tabs-info__header-container">
        <div class="tabs-info__header-inner">
          <h2 class="tabs-info__header-heading">{{ heading }}</h2>
        </div>
      </div>
      <div class="tabs-info__select-container">
        <span class="tabs-info__select-title">{{ filterTitle }}</span>
        <div class="switch-tab-info__select-wrap">
          <select
            v-model="activeItemId"
            :aria-label="filterTitle"
            class="tabs-info__select"
            @change="handleChange($event.target.value)"
          >
            <option
              v-for="(item, index) in items"
              :key="`SwitchTabinfo--${index}`"
              :value="item.panelTitle"
            >
              {{ item.panelTitle }}
            </option>
          </select>
        </div>
      </div>
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
      heading: null,
      activeItemId: 'placeholder',
      activeItem: null,
      filterTitle: '',
    }
  },
  created() {
    this.filterTitle = this.$attrs['filter-title']
    this.activeItemId = this.$attrs['active-item'] ? this.$attrs['active-item'] : 'placeholder'
    this.heading = this.$attrs.heading ? this.$attrs.heading : ''
    this.$on('create:panel', this.createdPanel)
  },
  methods: {
    createdPanel(panel) {
      this.items.push(panel)
      this.handleChange(this.activeItemId)
    },
    handleChange(value) {
      this.activeItemId = value
      // For IE11
      // this.activeItem = this.items.find((item) => item.panelTitle === value )
      for (let i = 0; i < this.items.length; i += 1) {
        if (this.items[i].panelTitle === value) {
          this.activeItem = this.items[i]
        }
      }
    },
  },
}
</script>
