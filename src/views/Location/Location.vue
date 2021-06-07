<template>
  <div id="location">
    <Head :headTitle="title"></Head>
    <Search :searchFn="searchFn" placeholder="请输入地址"></Search>
    <div class="lists">
      <ul>
        <li
          v-for="item in suggestionLists"
          :key="item.id"
          @click="selectAddress(item)"
        >
          <h3>{{ item.title }}</h3>
          <span>{{ item.address }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Search from "../../components/Search.vue";
import { suggestion } from "../../api/location";
export default {
  components: { Search },
  data() {
    return {
      title: "选择收货地址",
      suggestionLists: [],
      fromIndex: false,
    };
  },

  methods: {
    searchFn(searchVal) {
      console.log(searchVal);
      //需要赋值给变量用以渲染数据，可以通过=>函数，这时this为Vue
      suggestion(searchVal).then((response) => {
        this.suggestionLists = response.data.data.data;
      });
    },

    selectAddress(item) {
      if (this.fromIndex) {
        console.log(item);
        //       this.$store.dispatch('clearAddress');
        //      this.$store.dispatch('recordAddress', {address: item.title, ...item.location})
        this.$router.push("/index");
      } else {
        //新增收货地址
        //  this.$store.dispatch('recodeDeliveryAddress', item)
        console.log("新增");
        this.$router.go(-1); //返回上一个路由
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#location {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  background: #ccc;
}
</style>