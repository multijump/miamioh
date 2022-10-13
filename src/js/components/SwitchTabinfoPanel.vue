<template>
  <div v-show="isActive">
    <slot/>
  </div>
</template>

<script>
export default {
  inject: ['container'],
  computed: {
    activeItem() {
      return this.container.activeItem || this
    },
    isActive() {
      return this.activeItem.id === this
    },
  },
  created() {
    this.container.$emit('create:panel', {
      id: this,
      panelTitle: this.$attrs['panel-title'],
    })
  },
}
</script>
