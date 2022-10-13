<template>
  <transition name="slide-fade">
    <div v-show="showMenu">
      <div class="serch-menu-wrapper">
        <input
          id="searchbar"
          ref="searchbar"
          v-model="inputData"
          aria-label="search"
          type="text"
          placeholder="Search"
          @keydown="goSearchPage"
        >
        <button
          class="HeaderSearchMenu__submit"
          aria-label="Submit Search"
          @click="submitSearch"
        />
        <div
          tabindex="0"
          @focus="handleBlur"
        />
      </div>
    </div>
  </transition>
</template>
<script>
import eventBus from '@/js/util/eventBus'

export default {
  data() {
    return {
      showMenu: false,
      inputData: null,
    }
  },

  created() {
    eventBus.$on('toggle:searchmenu', this.handleToggleMenu)
  },

  methods: {
    handleToggleMenu(flag) {
      this.showMenu = flag

      if (flag) {
        setTimeout(() => {
          if (this.$refs.searchbar) {
            this.$refs.searchbar.focus()
          }
        }, 10)
      }
    },
    handleBlur() {
      eventBus.$emit('toggle:menu', false)
      eventBus.$emit('toggle:searchmenu', false)
    },
    submitSearch() {
      const { inputData } = this

      if (!inputData) {
        return
      }

      window.localStorage.setItem('keyword', inputData)
      window.location.href = '/search-results'
    },
    goSearchPage({ key }) {
      if (key !== 'Enter') {
        return
      }

      this.submitSearch()
    },
  },
}
</script>
