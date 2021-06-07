<template>
  <div id="address">
    <Head :headTitle="title"></Head>
    <nav>
      <span>{{title}}</span>
      <span v-show="manage" @click="manageAddress()">管理</span>
      <span v-show="!manage" @click="finishAddress()">完成</span>
    </nav>
    <div class="address-container">
      <ul>
        <li v-for="(item, index) in addressLists" :key="item.id" >
          <span>{{item.address}} {{item.house_number}}</span>
          <span>{{item.name}}</span>
          <span>{{item.phone}}</span>
          <i v-show="manage" @click="deleteAddress(item.id, index)">删除</i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getAllAddress, deleteAddress } from "../../api/user";

export default {
  data() {
    return {
      title: "我的收货地址",
      addressLists: [],
      manage: true,
    };
  },

  methods: {
    manageAddress() {
      this.manage = false;
    },

    finishAddress() {
      this.manage = true;
    },

    deleteAddress(id, index) {
      deleteAddress({ address_id: id }).then((response) => {
        if (response.data.status === 200) {
          this.addressLists.splice(index, 1); //arrayObject.splice(index,howmany)改变原数组
        }
      });
    },

    created() {
      getAllAddress().then((response) => {
        this.addressLists = response.data.address;
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#address {
  position: absolute;
  background-color: #ccc;
  nav {
    display: flex;
    padding: 0.3rem;
    span {
      font-size: 0.3rem;
    }
  }
}
.address-container {
  margin-top: 0.3rem;
}
</style>