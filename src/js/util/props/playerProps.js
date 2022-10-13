// Shared props for good-video related components

export default {
  url: {
    type: String,
    requried: true,
  },

  options: {
    type: Object,
    default: () => ({}),
  },

  playerId: {
    type: String,
    requried: true,
  },

  useModal: {
    type: Boolean,
    default: false,
  },
}
