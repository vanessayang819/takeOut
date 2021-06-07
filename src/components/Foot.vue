<template>
  <div id="foot">
    <div id="foot-iconContainer">
      <div id="foot-icon" v-for="(item, id) in items" :key="id">
        <router-link :to="{ path: item.path }">
          <div class="pic">
            <img :src="getActiveIconSrc(item.src)" v-if="item.isActive" />
            <img :src="getInactiveIconSrc(item.src)" v-else />
          </div>
          <span>{{ item.iconName }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { src: "index", iconName: "首页", path: "/index", isActive: true },
        { src: "order", iconName: "订单", path: "/order", isActive: false },
        { src: "home", iconName: "我的", path: "/home", isActive: false },
      ],
    };
  },

  mounted() {
    let path = this.$route.path.slice(1);
    for (let i in this.items) {
      let item = this.items[i];
      if (item.src == path) {
        item.isActive = true;
      } else {
        item.isActive = false;
      }
    }
  },
  methods: {
    getActiveIconSrc(src) {
      return require("../assets/" + src + "-active.png");
    },

    getInactiveIconSrc(src) {
      return require("../assets/" + src + ".png");
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#foot {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
}
#foot-iconContainer {
  display: flex;
  justify-content: space-between;
}

#foot-icon {
  line-height: 0.75;
  font-size: 0.2rem;
  padding: 0, 0.1rem;
}
</style>