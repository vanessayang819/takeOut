<template>
  <div id="home">
    <Head :headTitle="title" goBack="true"></Head>
    <router-link to='/address'>地址</router-link>
    <div id="user-info">
      <label class="avatar" for="file">
        <img :src="avatar" />
      </label>
      <router-link v-if="!username" class="login" to="/login"
        >登录/注册</router-link
      >
      <span v-else class="username">{{ username }}</span>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import { userInfo } from "../../api/user";
import { getInfo } from "../../utils/auth";

export default {
  data() {
    return {
      title: "主页",
      username: null,
      avatar: "http://i.waimai.meituan.com/static/img/default-avatar.png",
    };
  },

  mounted() {
    this.username = getInfo();
    if (this.username) {
      userInfo().then((response) => {
        this.avatar = response.data.data.avatar;
      });
    }
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../style/common.scss";
@import "../../style/mixin.scss";

#home {
  height: 100%;
  background: rgb(244, 244, 244);
}

#user-info {
  @include px2rem(height, 200);
  color: #000;
  display: flex;
  align-items: center;
  background: #fff;
  .avatar {
    @include px2rem(width, 115);
    @include px2rem(height, 115);
    text-align: center;
    margin: 0 0.8rem;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #333;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .login {
    font-size: 0.45rem;
  }
  .username {
    font-size: 0.5rem;
  }
}
</style>