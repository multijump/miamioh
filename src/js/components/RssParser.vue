<template>
  <div>
    <slot :articles="articles" />
  </div>
</template>

<script>
import Parser from 'rss-parser'

export default {
  data() {
    return {
      articles: [],
    }
  },
  mounted() {
    this.getFeed('https://miamioh.meritpages.com/?format=rss&p=9b19e')
  },
  methods: {
    async getFeed(feedUrl) {
      const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/'
      const parser = new Parser()
      const { items } = await parser.parseURL(corsAnywhereUrl + feedUrl)

      this.articles = items.slice(0, 6)

      this.articles = this.articles.map((article) => {
        const newArticle = article

        let imgStr = newArticle.content.substr(newArticle.content.indexOf('<img'))
        imgStr = imgStr.substr(0, imgStr.indexOf('>') + 1)

        let imgSrc = imgStr.substr(imgStr.indexOf('src="') + 5)
        imgSrc = imgSrc.substr(0, imgSrc.indexOf('"'))

        let imgAlt = imgStr.substr(imgStr.indexOf('alt="') + 5)
        imgAlt = imgAlt.substr(0, imgAlt.indexOf('"'))

        newArticle.imgSrc = imgSrc
        newArticle.imgAlt = imgAlt

        return newArticle
      })
    },
  },
}
</script>
