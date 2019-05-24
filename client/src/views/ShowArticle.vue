<template>
    <article class="article-detail" v-html="currentArticle">
    </article>
</template>
<script>
export default {
    data() {
        return {
            currentArticle: ''
        }
    },
    mounted () {
      
    }
}
</script>
<style lang="scss">
    .article-detail {
        & img {
            width: 100%;
            height: auto;
        }
    }
</style>

