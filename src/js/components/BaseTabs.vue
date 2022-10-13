<template>
  <TabsContainer
    tag="section"
    class="BaseTabs"
  >
    <TabsContainerTablist class="BaseTabs__tablist">
      <TabsContainerTablistTab
        v-for="({ heading }, index) in items"
        :key="index"
        :aria-controls="`base-tabs-${id(index)}`"
        :id="`base-tabs-tab-${id(index)}`"
        class="BaseTabs__tablist-tab"
      >
        {{ heading }}
      </TabsContainerTablistTab>
    </TabsContainerTablist>
    <div class="BaseTabs__panel-wrap">
      <TabsContainerTabPanel
        v-for="({ content }, index) in items"
        :key="index"
        :id="`base-tabs-${id(index)}`"
        class="BaseTabs__panel"
      >
        {{ content }}
      </TabsContainerTabPanel>
    </div>
  </TabsContainer>
</template>

<script>
const props = {
  items: {
    type: Array,
    required: true,
  },
}
// if using this._uid is not a desired solution you can use for generating uid
// https://gitlab.com/160over90/agen/191-16w/random-id/tree/master/src/components

// eslint-disable-next-line no-underscore-dangle
export default { props, methods: { id(index) { return index * this._uid } } }
</script>
