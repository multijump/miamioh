<template>
  <button
    :aria-controls="disclosureId"
    :aria-expanded="expanded.toString()"
    :class="{ expanded }"
    @click="maybeExpanded"
  >
    <slot />
  </button>
</template>

<script>
import eventBus from '@/js/util/eventBus'

export default {
  props: {
    happensOnce: {
      type: Boolean,
      default: false,
    },
    disclosureId: {
      type: String,
      required: true,
    },
    initiallyExpanded: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      expanded: this.initiallyExpanded,
    }
  },
  watch: {
    expanded() {
      eventBus.$emit('toggle', {
        expanded: this.expanded,
        controls: this.disclosureId,
      })
    },
  },
  created() {
    eventBus.$on('created:container', this.createdContainer)
  },
  methods: {
    toggleExpanded() {
      this.expanded = !this.expanded
    },
    maybeExpanded() {
      if (!this.happensOnce) {
        this.toggleExpanded()
        return
      }
      this.expanded = true
    },
    createdContainer(disclosureId) {
      eventBus.$emit('toggle', {
        expanded: this.expanded,
        controls: disclosureId,
      })
    },
  },
}
</script>
