<template>
  <div id="store">
    <div class="skeleton-loading" v-if="!poiInfo.name">
      <img src="../../assets/restaurant.jpg" />
    </div>

    <div class="head-container">
      <Head :headTitle="poiInfo.name"></Head>
      <div class="store-info">
        <div class="logo">
          <img :src="poiInfo.pic_url" />
        </div>
        <div class="deliver-info">
          <span
            >{{ poiInfo.min_price_tip }} | {{ poiInfo.shipping_fee_tip }} |
            {{ poiInfo.delivery_time_tip }}</span
          >
          <p>
            <i class="iconfont icon-broadcast">&#xe62d;</i
            >{{ poiInfo.bulletin }}
          </p>
        </div>
      </div>
    </div>
    <!--导航 有3个路由  点菜 评价 和商家-->
    <div class="nav">
      <router-link
        :to="{ path: '/store/menu', query: { id: restaurant_id } }"
        class="menu"
      >
        <span>点菜</span>
      </router-link>
      <router-link
        :to="{ path: '/store/comment', query: { id: restaurant_id } }"
        class="comment"
      >
        <span>评价</span>
      </router-link>
      <router-link
        :to="{ path: '/store/seller', query: { id: restaurant_id } }"
        class="seller"
      >
        <span>商家</span>
      </router-link>
    </div>
    <!--点菜 评价 和商家-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>


<script>
export default {
  data() {
    return {
      showDetail: false, //商家详情显示
      restaurant_id: 0, //商店id
    };
  },
  computed: {
    poiInfo() {
      return this.$store.state.poiInfo;
    },
    discountsLength() {
      //打折列表数量
      return this.poiInfo.discounts2 ? this.poiInfo.discounts2.length : 0;
    },
  },

  created() {
    //根据路由query获得商店id
    this.restaurant_id = this.$route.query.id;
    //根据商店id获取店家信息
    this.$store.dispatch("getRestaurant", this.restaurant_id);
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../style/mixin.scss";

#store {
  height: 100%;
  display: flex;
  flex-direction: column;
  /* skeleton-screen-loading样式*/
  .skeleton-loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1001;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .head-container {
    background: rgb(51, 51, 51);
    #head {
      background: rgb(51, 51, 51);
    }
    .store-info {
      display: flex;
      margin-top: 0.2rem;
      padding-bottom: 0.2rem;
      border-bottom: 1px solid $mtGrey;
      .logo {
        @include px2rem(width, 82);
        @include px2rem(height, 82);
        margin: 0 0.2rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .deliver-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: 100%;
        span,
        p {
          color: $mtGrey;
          font-size: 0.35rem;
          margin-top: 0.1rem;
        }
        p {
          @include px2rem(width, 500);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .icon-broadcast {
            display: inline-block;
            font-size: 0.4rem;
            margin-right: 0.1rem;
            vertical-align: middle;
          }
        }
      }
    }
  }
  .nav {
    display: flex;
    flex-shrink: 0;
    .menu,
    .seller,
    .comment {
      flex: 1;
      text-align: center;
      @include px2rem(line-height, 80);
      font-size: 0.4rem;
      span {
        display: inline-block;
      }
    }
  }
}
</style>
