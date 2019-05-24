<template>
  <div class="home">
    <article>
      <div class="article-container" v-for="item in [1, 2, 3, 4, 5]">
        <div class="article-banner">
          <img src="../assets/article_banner.jpg">
        </div>
        <div class="article-description">
          <h3>{{ item }}Lorem</h3>
          <p class="article-publish-date">
            <i class="iconfont icon-shijian"></i>
            <span>2019-3-26</span>
          </p>
          <router-link to="article/showArticle">
            <p class="description-content">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum doloribus provident facilis magnam ipsa neque dicta fugit. Explicabo neque quod praesentium optio maiores, quis temporibus, id adipisci, commodi laudantium expedita.</p>
          </router-link>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
export default {
  name: "home",
  created() {},
  methods: {}
};
</script>
<style lang="scss">
.home {
  // background: #f5f8f9;

  & > article {
    width: 50%;
    margin: 0 auto;
    padding-top: 15px;
  }

  @media screen and(max-width: 768px) {
    & > article {
      width: 100%;
    }
  }

  .article-container {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    margin-top: 30px;
  }

  .article-banner {
    width: 100%;
    margin: 0 auto;
    overflow: hidden;

    & > img {
      width: 100%;
      height: auto;
      transition: transform 0.8s ease;
    }
  }

  .article-banner > img:hover {
    transform: scale(1.2);
    cursor: pointer;
  }

  .article-description {
    text-align: left;
    padding: 0 10px 10px 10px;

    & > .article-publish-date {
      font-size: 14px;
      line-height: 14px;
    }
  }
}
</style>

