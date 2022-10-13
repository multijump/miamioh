<template>
  <!-- BaseWindowWidth is globally registered -->
  <BaseWindowWidth
    :tag="tag"
    :key="remount"
    :callback="handleCallback"
  >
    <slot/>
  </BaseWindowWidth>
</template>

<script>

export default {
  props: {
    tag: {
      type: String,
      default: 'div',
    },
  },
  data() {
    return {
      remount: false,
    }
  },
  methods: {
    handleCallback(width) {
      this.remount = width > 1024
    },
  },
}
</script>
