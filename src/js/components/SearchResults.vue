<template>
  <div>
    <div class="search-result__input-inner">
      <div class="gcse-searchbox"/>
    </div>
    <div class="gcse-searchresults"/>
  </div>
</template>

<script>
// import eventBus from '@/js/util/eventBus'

export default {
  data() {
    return {
      keywrord: '',
    }
  },
  created() {
    this.keywrord = window.localStorage.getItem('keyword')
    setTimeout(() => {
      document.getElementById('gsc-i-id1').value = this.keywrord
      document.getElementById('gsc-i-id1').focus()
      document.getElementById('gsc-i-id1').setAttribute('aria-label', 'search keywords')
      document.querySelector('.gsc-search-button-v2').click()
      document.querySelector('.gsc-search-button-v2').setAttribute('aria-label', 'search submit button')
      // document.getElementById('gs_cb50').setAttribute('aria-label', 'clear search')
      document.getElementById('gs_cb50').setAttribute('aria-hidden', true)
      window.localStorage.setItem('keyword', '')
    }, 3000)
  },
}
</script>

