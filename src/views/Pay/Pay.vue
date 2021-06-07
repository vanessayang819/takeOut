<template>
  <div id="pay">
    <Head title="w"></Head>
    {{ restaurant_id }}
    <div class="submit" :class="{ disabled: preventRepeat }" @click="submit()">
      确定支付提交订单
    </div>
  </div>
</template>

<script>
import Head from "../../components/Head.vue";
import { initPay, orderInfo } from "../../api/order";
import { submitOrder} from "../../api/order";

export default {
  components: { Head },
  data() {
    return {
      order_data: null,
      restaurant_id: null,
      order_id: null,
      orderData: {},

      defineAddress: {},
      alertText: "", //提示
      showTip: false,
      order_info: null,
      preventRepeat: false, //阻止多次点击
    };
  },

  created() {
    let confirmOrderData = JSON.parse(localStorage.getItem("confirmOrderData")); //获取当前准备下单的商品
    this.restaurant_id = confirmOrderData.restaurant_id; //餐馆id
    this.order_data = confirmOrderData.foods;
  },
  methods: {
    async submit() {
      if (this.preventRepeat) return;
      this.preventRepeat = true;
      let foods = [];
      let keys = Object.keys(this.order_data);
      keys.forEach((key) => {
        if (Number(key))
          foods.push({ skus_id: key, num: this.order_data[key]["num"] });
      });

      await submitOrder({
        restaurant_id: this.restaurant_id,
        foods,
        address_id: 100,
      }).then((response) => {
        if (response.data.status === 200) {
          this.order_id = response.data.order_id;
          orderInfo({ order_id: this.order_id }).then((response) => {
            this.order_info = response.data.data;
            this.restaurant_info = this.order_info.restaurant; //商家信息
          });
          console.log("提交订单成功", this.order_id);
        }
      });

      initPay({
        order_id: this.order_id,
        payType: 1,
        method: "trpay.trade.create.scan",
      }).then((response) => {
        let res = response.data;
        console.log("发起支付");
        this.preventRepeat = false;

        if (res.status === 302) {
          //判断该订单是否已经支付完成
          let _this = this;
          this.alertText = res.message; //提示
          this.showTip = true;
          setTimeout(() => {
            _this.$router.push("/order");
          }, 1000);
          return;
        }
        this.orderData = response.data.data;
      });
    },

  },
};
</script>

<style>
</style>