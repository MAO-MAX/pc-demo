<template>
    <div class="page-introduce">
        <div class="notice">
          <div class="notice-tit">
            <img src="../../assets/img/voice.png" class="icon-notice">
            <span>项目公告: </span>
          </div>
          <marquee :interval="3000">
            <marquee-item>
              <a class="notice-item">项目公告1</a>
            </marquee-item>
            <marquee-item>
              <a class="notice-item">项目公告2</a>
            </marquee-item>
            <marquee-item>
              <a class="notice-item">项目公告3</a>
            </marquee-item>
          </marquee>
        </div>
        <div class="block">
          <h3 class="tit">项目概况</h3>
          <ul class="list">
            <li class="item">
              <span class="item-tit">项目名称</span>
              <span>{{info.name_zh}}</span>
            </li>
            <li class="item">
              <span class="item-tit">上线时间</span>
              <span>{{info.online_time}}</span>
            </li>
             <li class="item">
              <span class="item-tit">创始人</span>
              <span>{{summary.founder_name_zh ? summary.founder_name_zh : '- -'}}</span>
            </li>
             <li class="item">
              <span class="item-tit">项目官网</span>
              <span class="website" @click="goWebsite(summary.official_website)">{{summary.official_website}}</span>
            </li>
             <li class="item">
              <span class="item-tit">项目SNS</span>
               <p class="sns-icon">
                 <a v-if="sns.github_url" @click="goSNS(sns.github_url)">
                   <img src="../../assets/img/con_icon_mao_sel.png" alt="">
                 </a>
                 <img src="../../assets/img/con_icon_mao_nor.png" v-else alt="">

                 <a v-if="sns.twitter_url" @click="goSNS(sns.twitter_url)">
                   <img src="../../assets/img/con_icon_niao_sel.png" alt="">
                 </a>
                 <img src="../../assets/img/con_icon_niao_nor.png" v-else alt="">

                 <a v-if="sns.facebook_url" @click="goSNS(sns.facebook_url)">
                   <img src="../../assets/img/con_icon_f_sel.png" alt="">
                 </a>
                 <img src="../../assets/img/con_icon_f_nor.png" v-else alt="">

                 <a v-if="sns.telegram_url" @click="goSNS(sns.telegram_url)">
                   <img src="../../assets/img/con_icon_feixing_sel.png" alt="">
                 </a>
                 <img src="../../assets/img/con_icon_feixing_nor.png" v-else alt="">

                 <a v-if="sns.weibo_url" @click="goSNS(sns.weibo_url)">
                   <img src="../../assets/img/con_icon_weibo_sel.png" alt="">
                 </a>
                 <img src="../../assets/img/con_icon_weibo_nor.png" v-else alt="">
               </p>
            </li>
             <li class="item">
              <span class="item-tit">项目区块浏览器</span>
               <p>
                 <a v-if="false">
                   <img src="../../assets/img/con_icon_sousuo_sel.png" alt="">
                 </a>
                 <img src="../../assets/img/con_icon_sousuo_nor.png" v-else alt="">
               </p>
            </li>
             <li class="item-block">
              <span class="item-block_tit">项目介绍</span>
              <p>{{summary.desc_zh}}</p>
            </li>
            <li class="item-block">
              <span class="item-block_tit">项目特点</span>
              <p>{{summary.tech_characteristics_zh}}</p>
            </li>

          </ul>
        </div>
        <div class="block">
          <div class="tit-wrap">
            <h3 class="tit">板块概况</h3>
            <div class="grade">
              <span class="tit-score">{{summary.cat_score}} </span>
              <span> &nbsp;/ 100</span>
            </div>
          </div>
          <ul class="list">
            <li class="item">
              <span class="item-tit">所属板块</span>
              <span class="fold-font">{{summary.category_name}}</span>
            </li>
            <li class="item">
              <span class="item-tit">板块排名</span>
              <span class="fold-font">{{summary.category_rank}}</span>
            </li>
            <li class="item">
              <span class="item-tit">板块内市值占比</span>
              <span class="fold-font">{{summary.category_proportion}}%</span>
            </li>
            <li>
              <div class="item">
                <span class="item-tit">同板块项目</span>
                <span class="more" @click="goMore(summary.cat_id, summary.category_name)">查看更多</span>
              </div>
            </li>
            <li>
              <swiper :options="swiperOption" class="swiper-list">
                <!--<swiper-slide v-for="(val,ind) in obj.adviser" :key="ind" >-->
                  <swiper-slide class="swiper-item" v-for="item in category" @click="goSamePlate(item.token_id)" :key="item.token_id">
                    <img :src="item.logo" class="swiper-logo">
                    <span>{{item.token_short_name}}</span>
                  </swiper-slide>
              </swiper>
            </li>
          </ul>
        </div>
        <div class="block">
          <div class="tit-wrap">
            <h3 class="tit">项目团队</h3>
            <div class="grade">
              <span class="tit-score">{{info.team_score}} </span>
              <span> &nbsp;/ 100</span>
            </div>
          </div>
          <ul class="list">
            <li >
              <div class="item">
                <span class="item-tit">创始团队</span>
              </div>
            </li>
            <li>
              <swiper :options="swiperOption" class="swiper-list">
                <!--<swiper-slide v-for="(val,ind) in obj.adviser" :key="ind" >-->
                <swiper-slide class="swiper-item" v-for="i in team" :key="i.person_id" @click="goTeam(i.peroson_id)">
                  <img :src="i.avatar" class="swiper-logo">
                  <span>{{i.name_en}}</span>
                </swiper-slide>
              </swiper>
            </li>
          </ul>
        </div>
    </div>
</template>

<script>
    import { Marquee, MarqueeItem } from 'vux'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import { mapMutations, mapState } from 'vuex'
    import * as api from '../../api/index.js'
    import * as untils from '../../untils/index.js'

    export default {
        components: { Marquee, MarqueeItem, swiper, swiperSlide },
        data: function () {
            return {
                swiperOption: {
                    slidesPerView: 2,
                    spaceBetween: 10
                },
                summary: {},
                team: [],
                category: {},
                sns: {},
                system: ''
            }
        },
        computed: {
            ...mapState({
                info: state => state.info
            })
        },
        created() {
            this.system = untils.getSystem()
            this.getInfo()
        },
        methods: {
            ...mapMutations(['SET_HEADER']),
            // 获取数据
            getInfo () {
                let params = {
                    tokenId: this.$route.query.token_id || window.sessionStorage.getItem('tokenId'),
                    query: {
                        sign: this.$route.query.sign || window.sessionStorage.getItem('sign'),
                        aspect: 'intro'
                    }
                }
                api.getData(params).then(
                    res => {
                        let info = res.data.header_data
                        info.cost_price = info.cost_price ? (info.cost_price * 1).toFixed(2) : '- -'
                        info.flow_rate = info.flow_rate ? (info.flow_rate * 100).toFixed(2) : '- -'
                        info.price = info.price ? info.price.toFixed(2) : '- -'
                        if (info.percent_change_1h) {
                            info.percent_change_1h < 0 ? info.decline = true : info.decline = false
                            info.percent_change_1h = Math.abs(info.percent_change_1h)
                        } else {
                            info.percent_change_1h = '- -'
                        }
                        this.SET_HEADER(info)
                        this.summary = res.data.summary
                        this.category = res.data.category_project
                        this.team = res.data.founder_team
                        this.summary.category_proportion = this.summary.category_proportion ? ((this.summary.category_proportion * 100).toFixed(2)) : ''
                        this.sns = res.data.summary.sns_json
                        for (let key in this.sns) {
                            if (this.sns[key] && this.sns[key].indexOf('https://') === -1) {
                                this.sns[key] = 'https://' + this.sns[key]
                            }
                        }
                    }
                )
            },
            // 官网
            goWebsite (url) {
                if (this.system === 'ios') {
                    window.webkit.messageHandlers.goBackwebsite.postMessage(url)
                } else if (this.system === 'android') {
                    android.gotoProjectNetwork(url)
                }
            },
            goSNS (url) {
                if (this.system === 'ios') {
                    window.webkit.messageHandlers.gotoPlate.postMessage(url)
                } else if (this.system === 'android') {
                    android.gotoPlate(url)
                }
            },
            // 查看更多
            goMore (id, name) {
                let catData = JSON.stringify({
                    cat_id: id.toString(),
                    cat_name: name
                })
                if (this.system === 'ios') {
                    window.webkit.messageHandlers.lookMore.postMessage(catData)
                } else if (this.system === 'android') {
                    android.lookMore(catData)
                }
            },
            // go
            goSamePlate (id) {
                if (this.system === 'ios') {
                    window.webkit.messageHandlers.samePlate.postMessage(id)
                } else if (this.system === 'android') {
                    android.samePlate(id)
                }
            },
            goTeam (id, index) {
                let founderData = JSON.stringify(this.founderTeam[index])
                if (this.system === 'ios') {
                    window.webkit.messageHandlers.foundingTeam.postMessage(founderData)
                } else if (this.system === 'android') {
                    android.foundingTeam(id)
                }
            }
        }
    }
</script>

<style lang="less" scoped>
  .page-introduce {
    background-color: #f1f4fe;
    margin-bottom: 1.4rem;

    .notice {
      height: .8rem;
      display: flex;
      align-items: center;
      padding: 0 .2rem;
      background-color: #fff;

      .notice-tit {
        flex-shrink: 0;
        display: flex;
        line-height: .2rem;
        color: #db2525;
        margin-right: .1rem;

        .icon-notice {
          width: .22rem;
          height: .2rem;
          vertical-align: middle;
          margin-right: .1rem;
        }
      }

      .notice-item {
        color: #666;
      }
    }
    .box-list {
      position: relative;
      white-space: nowrap;
    }
    .box-item {
     display: inline-block;
      width: 3.2rem;
      height: 2rem;
      margin-right: .1rem;
      border: red 1px solid;
    }
    .swiper-list {
      width: 100%;

      .swiper-item {
        height: 1.9rem;
        display: flex;
        align-items: center;
        border: #f2f2f2 1px solid;

        .swiper-logo {
          height: 1.2rem;
          width: 1.2rem;
          border-radius: 50%;
          margin-right: .2rem;
          margin-left: .4rem;
        }
      }
    }
  }
</style>
