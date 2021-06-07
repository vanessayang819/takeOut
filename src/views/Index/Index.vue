<template>
  <div id="index" ref="scrollWrapper">
    <div class="main-container">
      <Head :headTitle="title"></Head>
      <div class="guide-cntainer">
        <router-link to="/location?fromIndex=true" class="location">
          <span>{{ address.address }}</span>
          <Search />
        </router-link>
      </div>
      <div class="head">
        <span class="line"></span>
        <h2>附近商家</h2>
        <span class="line"></span>
      </div>
      <NearbyShops :scrollWrapper="scrollWrapper"></NearbyShops>
      
    </div>
    <Foot />
  </div>
</template>


<script>
import NearbyShops from "./NearbyShops";
import Search from "../../components/Search";

export default {
  components: {
    NearbyShops,
    Search,
  },

  data() {
    return {
      title: "首页",
      scrollWrapper: null,
    };
  },

  computed: {
    //监听指定数据，当指定数据发生改变时，才会被触发
    address: function () {
      return this.$store.state.address;
    },
    locationReady: function () {
      return this.$store.state.locationReady;
    },
  },

  created() {
    let { lat, lng } = this.address; //解构赋值
    if (!lat || !lng) {
      //如果没有定位 进行定位
      this.getLocation(); //定位
    }
  },

  methods: {
    getLocation() {
      //获取当前定位
      this.$store.dispatch("location");
    },
  },

  mounted() {
    this.scrollWrapper = this.$refs.scrollWrapper; //把DOM元素赋值 用于传递给子组件nearbyShops
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../style/mixin.scss";
#index {
  height: 100%;
  overflow: hidden;
}
.main-container {
  padding-bottom: 1rem;
    span {
      font-size: 0.5rem;
  }
  /*标题*/
  .head {
    text-align: center;
    padding-bottom: 0.1rem;
    border-bottom: 1px solid $bottomLine;
    .line {
      vertical-align: middle;
      display: inline-block;
      @include px2rem(width, 70);
      height: 0;
      border-bottom: 1px solid #000;
    }
    h2 {
      font-size: 0.5rem;
      display: inline-block;
      margin: 0.2rem;
    }
  }
}
</style>