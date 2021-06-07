<template>
  <div id="nearby-shops">
    <nav ref="nav">
      <ul>
        <li>综合排序</li>
        <li>销量最高</li>
        <li>距离最近</li>
        <li>筛选</li>
      </ul>
    </nav>

    <article>
      <router-link
        v-for="item in shopLists"
        :to="{ path: 'store', query: { id: item.id } }"
        :key="item.id"
        custom
        v-slot="{ navigate }"
      >
        <section @click="navigate" @keypress.enter="navigate" role="link">
          <div class="img-show">
            <img :src="item.pic_url" />
          </div>
          <div class="detail">
            <h4>{{ item.name }}</h4>
            <div class="shops-message">
              <span class="sell-num">{{ item.month_sales_tip }}</span>
              <div class="delivery-info">
                <span class="deliver-time">{{ item.delivery_time_tip }}/</span>
                <span class="distance">{{ item.distance }}</span>
              </div>
            </div>
            <div class="price-message">
              <span>{{ item.min_price_tip }} | </span>
              <span>{{ item.shipping_fee_tip }} | </span>
              <span>{{ item.average_price_tip }}</span>
            </div>
          </div>
        </section>
      </router-link>
    </article>

    <div class="loading-wrap" ref="loading">
      <span>{{loadingText}}</span>
    </div>
  </div>
</template>


<script>
import BScroll from "better-scroll";
import { getRestaurants } from "../../api/restaurant";

export default {
  data() {
    return {
      shopLists: [],
      showSort: false, //显示选择排序列表
      BScroll: null, //better-scroll实例
      loading: false,
      page: 1,
      limit: 4,
      noMore: false,
      preventRepeat: false,
      loadingText:''
    };
  },

  computed: {
    address: function () {
      return this.$store.state.address;
    },
  },

  props: ["scrollWrapper"], //进行better-scroll的DOM对象，最外层盒子
  methods: {
    //监听better-scroll滚动事件  判断是否滑动到底部
    listenScroll() {
      let _this = this;//用来存储指向
      console.log(this._this)
      _this.BScroll.on("scroll", function (obj) {
        //如果到达底部  请求加载更多数据
        if (
          Math.abs(obj.y) + _this.scrollWrapper.clientHeight >=
          _this.scrollWrapper.childNodes[0].clientHeight - 30
        ) {
          if (!_this.loading) {
            _this.loading = true;
            _this.loadingText = '刷新中...'
            _this.getRestaurants(_this.page, _this.limit, function (data) {
              _this.page++;
              for(let i of data){
                _this.shopLists.push(i);
              }
              //DOM重新渲染完毕后 重新计算better-scroll,异步函数，为了确保 DOM 已经渲染
              _this.$nextTick(() => {
                _this.loading = false;
                _this.BScroll.refresh();
              });
            });
          }
        }
      });
    },

    getRestaurants(page, limit, callback) {
      //获取餐馆列表
      console.log("开始获取餐馆列表");
      if (this.noMore) return this.loadingText = '没有更多了...';
      this.preventRepeat = true;
      let offset = (page - 1) * limit;//加载的
      let { lat, lng } = this.address;
      getRestaurants({ offset, limit, lng, lat }).then((response) => {
        let data = response.data.data;
        this.preventRepeat = false;
        this.noMore = data.length < this.limit;
        callback(data);
      });
    },
    firstFetch() {
      let _this = this;
      //获取餐馆列表
      this.page = 1;
      this.getRestaurants(this.page, this.limit, function (data) {
        _this.page++;
        _this.shopLists = data;
        _this.$nextTick(() => {
          //dom渲染完成 初始化better-scroll
          _this.BScroll = new BScroll(_this.scrollWrapper, {
            click: true,
            probeType: 2,
          });
          //监听scroll事件
          _this.listenScroll();
        });
      });
    },
  },
  created() {
    let { lat, lng } = this.address;
    if (lat && lng) {
      this.shopLists = [];
      this.firstFetch();
    } else {
      this.$store.dispatch("location");
    }
  },
  watch: {
    address(value) {
      //地址发生变化，重新获取商家
      this.noMore = false;
      this.preventRepeat = false;
      let { lat, lng } = value;
      if (lat && lng) {
        this.shopLists = [];
        this.firstFetch();
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../style/mixin.scss";

#nearby-shops {
  margin: 0.1rem 0;
}
nav {
  border-bottom: 1px solid;
  @include px2rem(line-height, 80);

  ul {
    display: flex;
    li {
      font-size: 0.3rem;
      text-align: center;
      padding: 0 0.1rem;
      flex: 1; 
    }
  }
}

section {
  display: flex;
  padding: 0.3rem 0;
  margin: 0 0.2rem;
  border-bottom: 1px solid $mtGrey;
  .img-show {
    @include px2rem(width, 170);
    @include px2rem(height, 130);
    margin-right: 0.2rem;
    border: 1px solid $mtGrey;
    text-align: center;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .detail {
    flex: 1;
    h4 {
      font-size: 0.45rem;
      font-weight: bold;
    }
    .shops-message {
      display: flex;
      margin-top: 0.3rem;
      align-items: center;
      span {
        font-size: 0.3rem;
      }
      .sell-num {
        flex: 1;
      }
      .delivery-info {
        display: flex;
        align-items: center;
      }
    }
    .price-message {
      margin: 0.2rem 0;
      display: flex;
      align-items: center;
      span {
        font-size: 0.2rem;
      }
    }
  }
}

.loading-wrap {
  @include loading;
}

</style>
