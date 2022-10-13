<script>
export default {
  functional: true,
  render: (createElement, { children }) => createElement('span', children),
}
</script>

<style scoped>
span {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  border: 0;
}
</style>
