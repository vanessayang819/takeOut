<template>
  <div id="selector">
    <div class="ball-container" @click="reduceCart()" v-if="food_num">
      <span class="reduce"><i class="iconfont icon-reduce">&#xe613;</i></span>
    </div>
    <span class="num">{{ food_num }}</span>
    <div class="ball-container" @click="addCart($event)">
      <span class="add"><i class="iconfont icon-add">&#xe6a9;</i></span>
    </div>
  </div>
</template>
<script>
export default {
  //    接收父组件传递进来的货物  和 商店 id
  props: ["food_id", "name", "price"],
  methods: {
    addCart(event) {
      let elRight = event.target.getBoundingClientRect().right; //选择器的右边 离左边页面的位置
      let elBottom = event.target.getBoundingClientRect().bottom; //选择器的底部  离顶部页面的位置
      this.$store.dispatch("addCart", {
        name: this.name,
        price: this.price,
        food_id: this.food_id,
        restaurant_id: this.poiInfo.id,
      });
      this.$emit("showDot", elRight, elBottom);
    },

    reduceCart() {
      this.$store.dispatch("reduceCart", {
        restaurant_id: this.poiInfo.id,
        food_id: this.food_id,
      });
    },
  },

  computed: {
    poiInfo: function () {
      return this.$store.state.poiInfo;
    },
    cartList: function () {
      return this.$store.state.cartList;
    },
    food_num() {
      let restaurant = this.cartList[this.poiInfo.id];

      if (restaurant) {
        if (restaurant[this.food_id]) {
          return restaurant[this.food_id].num;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../style/mixin.scss";

#selector {
  position: absolute;
  right: 0.2rem;
  bottom: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .reduce,
  .add {
    display: flex;
    border-radius: 50%;
  }
  .reduce {
    border: 1px solid $mtGrey;
    margin: 0 0.1rem;
  }
  .num {
    display: inline-block;
    margin: 0 0.15rem;
    font-size: 0.3rem;
  }

  .add {
    margin: 0 0.1rem;
    background: $mtYellow;
  }
  .icon-reduce,
  .icon-add {
    display: flex;
    font-size: 0.3rem;
    @include px2rem(width, 30);
    @include px2rem(height, 30);
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
}
</style>
