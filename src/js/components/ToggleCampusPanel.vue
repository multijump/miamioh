<template>
  <transition name="expand">
    <div v-show="isActive">
      <slot/>
    </div>
  </transition>
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

<style scoped>
/* always present */
.expand-enter-active {
  transition: all .8s ease;
}

.expand-leave {
  transition: all .5s ease;
}
/* .expand-enter defines the starting state for entering */
/* .expand-leave defines the ending state for leaving */
.expand-enter, .expand-leave {
  transform: translateX(20px);
  opacity: 0;
}
</style>
