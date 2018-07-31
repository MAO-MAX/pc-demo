<template>
  <div class="index-page">
      <div class="nav-bar">
        <img src="../../assets/img/back.png" class="icon-back" alt="">
        <ul class="tab-list">
          <!--<li v-for="tab in tabList" :class="['tab-item', {'item_active':selectTab === tab.val}]" @click="tabHandle(tab.val)">{{tab.name}}</li>-->
          <router-link v-for="tab in tabList" class="tab-item" :to="{path: tab.path, query:{user_id: userId, token_id:tokenId, sign:sign}}" :key="tab.val">{{tab.name}}</router-link>
        </ul>
      </div>
      <div class="header">
        <ul class="info">
          <li class="info-left">
            <img :src="info.logo" class="pic">
            <div class="desc">
              <p class="name">{{info.name_en}}</p>
              <div class="follow">
                <p class="item">
                  <img src="../../assets/img/eye.png" class="img_eye">
                  <span>{{info.view_count}}</span>
                </p>
                <p class="item">
                  <img src="../../assets/img/heart.png" class="img_heart">
                  <span>{{info.follow_count}}</span>
                </p>
              </div>
            </div>
          </li>

          <li class="score">
            <x-circle
              :percent="info.per_score"
              :stroke-width="6"
              :trail-width="6"
              stroke-color="#fff"
              trail-color="rgba(0,0,0,.4)">
              <div class="score-desc">
                <p><span class="score-text">{{info.per_score}}</span>/100</p>
                <p>评分</p>
              </div>
            </x-circle>
          </li>
        </ul>
        <ul class="worth-list">
          <li class="worth-item">
            <p>当前价格</p>
            <p :class="{'num': true, 'green':!info.decline, 'red':info.decline}">￥{{info.price}}</p>
          </li>
          <li class="worth-item">
            <p>1H涨跌</p>
            <p :class="{'num': true, 'green':!info.decline, 'red':info.decline}">
              <span class="decline">{{info.percent_change_1h}}%</span>
              <img src="../../assets/img/up.png" class="img-down" v-if="!info.decline">
              <img src="../../assets/img/down.png" class="img-down" v-if="info.decline">
            </p>
          </li>
          <li class="worth-item">
            <p>24H交易量</p>
            <p class="num">￥{{info.volume_24h}}</p>
          </li>
        </ul>
      </div>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      <div class="footer">
        <div class="footer-left">
            <div class="footer-left-item">
              <img src="../../assets/img/footer_heart.png" class="footer-heart_icon">
              <!--<img src="../../assets/img/redheart.png" alt="">-->
              <span>关注</span>
            </div>
          <div class="footer-left-item">
              <img src="../../assets/img/eye3.png" class="footer-eye_icon">
              <span>查看白皮书</span>
            </div>
        </div>
        <div class="footer-right">添加对比</div>
      </div>
  </div>
</template>

<script>
  import { XCircle } from 'vux'
  import { mapState } from 'vuex'
  export default {
      components: {XCircle},
      data: function () {
          return {
              percent: 83,
              tabList: [
                  {
                      name: '介绍',
                      path: '/index/introduce',
                      val: 0
                  },
                  {
                      name: 'TOKEN',
                      path: '/index/token',
                      val: 1
                  },
                  {
                      name: '生态',
                      path: '/index/ecology',
                      val: 2
                  },
                  {
                      name: '追踪',
                      path: '/index/track',
                      val: 3
                  }
              ],
              userId: '',
              tokenId: '',
              sign: ''
          }
      },
      computed: {
          ...mapState({
              info: state => state.info
          })
      },
      created () {
          this.tokenId = this.$route.query.token_id
          this.sign = this.$route.query.sign
          this.userId = this.$route.query.user_id
          window.sessionStorage.setItem('tokenId', this.tokenId)
          window.sessionStorage.setItem('sign', this.sign)
          window.sessionStorage.setItem('userId', this.userId)
      },
      methods: {
      }
  }
</script>

<style lang="less" scoped>

  .index-page {
    font-size: .24rem;
    
    .nav-bar {
      height: .9rem;
      padding: .3rem;
      font-size: .26rem;
      display: flex;
      align-items: center;

      .icon-back {
          display: block;
          height: .32rem;
          width: .32rem;
      }

      .tab-list {
        flex-grow: 1;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .tab-item {
          line-height: .32rem;
          color: #666;
        }

        .router-link-active {
          font-size: .3rem;
          font-weight: bolder;
          color: #2b5ef8;
        }
      }
    }

    .header {
      height: 3.6rem;
      background-color: #326cf7;
      padding: .3rem;

      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: .5rem;

        .pic {
          width: 1.6rem;
          height: 1.6rem;
          border-radius: 50%;
        }

        .desc {
          height: 1.3rem;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          color: #fff;
          margin-left: .2rem;

          .name {
            font-size: .3rem;
          }

          .follow {
            display: flex;

            .item {
                margin-right: .2rem;

              .img_eye {
                height: .22rem;
              }

              .img_heart {
                height: .22rem;
              }
            }
          }
        }

        .score {
          width: 1.6rem;
          height: 1.6rem;

          .score-desc {
            color: #fff;

            .score-text {
              color: #fc9510;
            }
          }
        }
      }

      .info-left {
        display: flex;
        align-items: center;
      }

      .worth-list {
        display: flex;
        color: #fff;

        .worth-item {
          flex-grow: 1;
          width: 30%;
          border-right: 1px solid #5581f9;
          display: flex;
          flex-direction: column;
          align-items: center;

          .num {
            font-size: .26rem;
            font-weight: bolder;
          }

          .red {
            color: #f00;
          }
          .green {
            color: #09BB07;
          }

          .img-down {
            height: .24rem;
            vertical-align: middle;
          }
        }

        .worth-item:last-child {
          border: none;
        }
      }
    }

    .footer {
      width: 100%;
      position: fixed;
      bottom: 0;
      z-index: 99;
      height: 1rem;
      display: flex;
      background-color: #fff;
      font-size: .3rem;

      .footer-left {
        flex-grow: 1;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .footer-left-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .footer-heart_icon {
          width: .34rem;
          height: .32rem;

        }
        .footer-eye_icon {
          width: .43rem;
          height: .32rem;
        }
      }
      .footer-right{
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #326cf7;
        color: #fff;
      }
    }

  }

</style>
