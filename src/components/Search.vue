<template>
  <div id="search-container">
    <i class="iconfont">&#xe626;</i>
    <input
      type="text"
      autofocus="autofocus"
      v-model.trim="searchValue"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
//v-model.trim用于去掉输入框内首尾空格
//每当输入框内容发生变化，就会触发oninput ，把最新的value赋值给searchValue变量。

export default {
  props: ["placeholder", "searchFn"],

  data() {
    return {
      searchValue: "",
    };
  },

  watch: {
    searchValue(newVal) {
      if (newVal !== "") {
        this.searchFn(newVal);
      }
    },
  },
};
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
.search-container {
  display: flex;
  padding-bottom: 0.2rem;
  background: #fff;
  justify-content: space-between;
}

.iconfont {
  font-size: 0.5rem;
}

input {
  width: 85%;
  height: 100%;
  border: none;
  text-indent: 20px;
  outline: none;
  background: #ccc;
}
</style>