<template>
  <div id="menu">
    <div class="left" ref="left">
      <ul>
        <li v-for="(category,index) in foodsData" :key="category.id" @click="mappingScroll(index)"
            :class="{'activity-menu': index == menuIndex}">
          {{category.name}}
        </li>
      </ul>
    </div>
    <div class="right" ref="right">
      <article ref="categorys">
        <section v-for="category in foodsData" :key="category.id">
          <h2>{{category.name}}</h2>
          <article>
            <section v-for="spus in category.spus" :key="spus.id">
              <div class="img">
                <img :src="spus.pic_url">
              </div>
              <div class="info">
                <div class="name">{{spus.name}}</div>
                <div class="sell-num">月售 {{spus.month_saled_content}}</div>
                <span class="price"> ￥{{spus.skus[0].price}}</span>
              </div>
              <Selector
                :name="spus.name"
                :food_id="spus.skus[0].id"
                :price="spus.skus[0].price"
              >
              </Selector>
            </section>
          </article>
        </section>
      </article>
    </div>

    <Bottom v-if="getInfoReady"></Bottom>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {getFoods} from '../../api/restaurant'
  import Bottom from './Bottom'
  import Selector from '../../components/Selector'

  export default {
    data() {
      return {
        categoryPosition: [],    //存放各个分类的categoryPosition 为了点击左侧让右侧对应滚动
        menuIndex: 0,   //左侧当前是第几个分类
        elRight: 0, //当前点击加按钮在网页中的绝对top值
        elBottom: 0, //当前点击加按钮在网页中的绝对left值
        foodsData: [],       //食物数据
        getInfoReady: false,
        hasLoadArr: []    //用来保存已经点击过的分类 如果点击过就不用再去判断懒加载
      }
    },
    methods: {
      mappingScrolli(pos) {   //右侧滚动时  判断当前左侧是第几个分类
        for (let i = 0; i < this.categoryPosition.length; i++) {
          if (this.categoryPosition[i] <= Math.ceil(Math.abs(pos.y)) && i === this.categoryPosition.length - 1 || this.categoryPosition[i + 1] > Math.ceil(Math.abs(pos.y))) {
            this.menuIndex = i;
            break;
          }
        }
      },
      mappingScroll(index) {    //点击左侧  右侧滚动到对应的位置
        this.rightScroll.off('scroll', this.mappingScrolli)
        this.rightScroll.scrollTo(0, -this.categoryPosition[index], 500);
        this.menuIndex = index;
        setTimeout(this.listenScroll, 500);
      },
      listenScroll() {  //监听滚动事件
        this.rightScroll.on('scroll', this.mappingScrolli)
      },

    },
    created() {
      this.windowHeight = window.innerHeight;       //设备显示高度
      let restaurant_id = this.$route.query.id;
      //根据餐馆id获取食物
      getFoods({restaurant_id}).then((response) => {
        this.foodsData = response.data.data;
        this.getInfoReady = true;
        this.$nextTick(() => {       //初始化better-scroll
          this.leftScroll = new BScroll(this.$refs.left, {click: true});
          this.rightScroll = new BScroll(this.$refs.right, {click: true, probeType: 3,});
          let dom = (this.$refs.right.children)[0];   //确定各分类categoryPosition
          let listsArr = Array.from(dom.childNodes);
          listsArr.forEach((item, index) => {
            this.categoryPosition[index] = item.offsetTop;
          });
          this.listenScroll();    //监听滚动
        })
      })
    },
    components: {
      Bottom,
      Selector
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/mixin.scss";

  #menu {
    display: flex;
    flex: 1;
    padding-bottom: 1.368rem;
    overflow: hidden;
    .left, .right {
      overflow: hidden;
    }
    /*菜单左侧列表样式*/
    .left {
      @include px2rem(width, 140);
      background: rgb(244, 244, 244);
      ul {
        li {
          display: flex;
          @include px2rem(height, 100);
          padding: 0 0.2rem;
          /*justify-content: center;*/
          align-items: center;
          font-size: 0.3rem;
          @include px2rem(line-height, 40);
          border-bottom: 1px dashed $mtGrey;
          &.activity-menu {
            background: #fff;
          }
        }
      }
    }
    /*右侧商品样式*/
    .right {
      position: relative;
      flex: 1;
      article {
        & > section {
          padding-top: 0.2rem;
          h2 {
            font-size: 0.4rem;
            font-weight: bold;
            margin: 0 0.2rem;
            padding-left: 0.2rem;
            border-left: 3px solid $mtYellow;
          }
          article {
            section {
              display: flex;
              position: relative;
              margin: 0 0.5rem;
              padding: 0.2rem 0;
              border-bottom: 1px solid $mtGrey;
              .img {
                @include px2rem(width, 122);
                @include px2rem(height, 126);
                margin-right: 0.2rem;
                img {
                  width: 100%;
                  height: 100%;
                }
              }

              .info {
                flex: 1;
                vertical-align: top;
                .name, .price {
                  font-weight: bold;
                }
                .name {
                  font-size: 0.3rem;
                }
                .sell-num {
                  font-size: 0.3rem;
                  margin: 0.2rem 0;
                }
                .price {
                  color: rgb(251, 79, 69);
                  font-size: 0.4rem;

                }
              }
            }
          }
        }
      }
    }
  }

</style>
