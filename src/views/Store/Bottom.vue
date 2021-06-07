<template>
  <div id="bottom">
    <article class="cart-list-container" v-show="cartDetail">
      <section
        class="cart-list"
        v-for="item in restaurantCartList"
        :key="item.id"
      >
        <span
          >{{ item.name }} ￥{{
            Number((item.price * item.num).toFixed(2))
          }}</span
        >
        <Selector
          :name="item.name"
          :food_id="item.id"
          :price="item.price"
        ></Selector>
      </section>
    </article>
    <div class="bottom-bar">
      <div class="price-container" @click="showCartDetail()">
        <span class="total-price" v-if="totalPrice"
          >￥{{ totalPrice.toFixed(2) }}</span
        >
      </div>
      <span @click="prepareOrder()" class="submit go-buy">去结算</span>
    </div>
    <div v-show="cartDetail" @click="cartDetail = false"></div>
  </div>
</template>

<script>
import { getInfo } from "../../utils/auth";
import Selector from "../../components/Selector";

export default {
  data() {
    return {
      cartDetail: false,
      restaurant_id: this.$route.query.id,
    };
  },
  computed: {
    poiInfo() {
      return this.$store.state.poiInfo;
    },
    cartList() {
      return this.$store.state.cartList;
    },
    totalPrice() {
      if (this.cartList[this.restaurant_id]) {
        return this.cartList[this.restaurant_id].totalPrice;
      } else {
        return 0;
      }
    },

    restaurantCartList() {
      let lists = this.cartList[this.restaurant_id];
      let arr = [];
      for (let p in lists) {
        if (lists[p].num > 0) {
          arr.push(lists[p]);
        }
      }
      return arr;
    },
  },
  methods: {
    showCartDetail() {
      if (this.cartDetail) this.cartDetail = false;
      else this.cartDetail = this.totalPrice > 0;
    },

    prepareOrder() {
      let data = {
        restaurant_id: this.restaurant_id,
        foods: this.cartList[this.restaurant_id],
      };

      if (getInfo) {
        localStorage.setItem("confirmOrderData", JSON.stringify(data));
        this.$router.push({ path: "/pay" });
      } else {
        this.$router.push({ path: "/login" });
      }
    },
  },
  created() {
    this.restaurant_id = this.$route.query.id;
  },

  watch: {
    totalPrice(val) {
      if (val === 0) this.cartDetail = false;
    },
  },
  components: {
    Selector,
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../style/mixin";

#bottom {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  .cart-list-container {
    position: fixed;
    left: 0;
    right: 0;

    @include px2rem(bottom, 90);
    background: grey;
    section {
      padding: 0 0.1rem;
      display: flex;
      align-items: center;
    }
    .cart-list {
      display: flex;
      justify-content: start;
      position: relative;
      @include px2rem(height, 120);
      background: #fff;
      span {
        font-size: 0.4rem;
      }
    }
  }
  .bottom-bar {
    display: flex;
    @include px2rem(height, 90);
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgb(51, 51, 51);
    .price-container {
      flex: 1;
      height: 100%;
      padding-left: 2rem;
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      .total-price {
        display: inline-block;
        font-size: 0.6rem;
        color: #fff;
      }
    }
    .submit {
      color: rgb(165, 165, 165);
      @include px2rem(line-height, 90);
      @include px2rem(width, 200);
      height: 100%;
      font-weight: 500;
      font-size: 0.4rem;
      background: #2c2c2c;
      text-align: center;
      &.go-buy {
        color: #000;
        background: $mtYellow;
      }
    }
  }
}
</style>
