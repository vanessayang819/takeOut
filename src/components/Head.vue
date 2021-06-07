<template>
  <header id="head" :style="{color:color,background:bgColor}">
    <span class="head-goBack" @click="goBack()">
      <i class="iconfont">&#xe61c;</i>
    </span>
    <span class="head-title">{{ headTitle }}</span>
  </header>
</template>

<script>
export default {
  props: {
    headTitle:  {default:""},
    color:  {default:"#333"},
    bgColor: {default:"#fff"},
  },

  methods: {
    goBack() {
      if (this.$route.fullPath.indexOf("/store") !== -1) {
        //fullPath匹配路由，path匹配路径
        //indexOf返回某个指定的字符串值在字符串中首次出现的位置,没有出现-1
        this.$router.push({ path: "/index" });
      } else {
        this.$router.go(-1);
      }
    },

    data() {
      return {};
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #head {
    font-size:0.5rem;
    position: relative;
    padding: 0 0.2rem;
    .go-back, .more {
      position: absolute;
      i {
        font-size: 0.5rem;
      }
    }
    .title {
      flex: 1;
      font-size: 0.5rem;
      font-weight: bold;
    }

  }
</style>