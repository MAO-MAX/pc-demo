<template>
    <div class="introduce_box">
        <div class="title">
            <span @click="gotoExtend"> <img src="../img/voice.png" alt=""><i>项目公告：</i> 暂无项目公告</span>
        </div>
        <ul class="proSurvey">
            <li><h2 class="scoreBox">项目概况</h2></li>
            <li><span>项目名称</span><p> {{header_data['name_zh']?header_data['name_zh']:header_data['name_en']}}</p></li>
            <li><span>上线时间</span><p>{{header_data['online_time']? header_data['online_time'] :'- -'}}</p></li>
            <li><span>创始人</span><p>{{summary['founder_name_zh']?summary['founder_name_zh']: '- -'}}</p></li>
            <li><span>项目官网</span> <span class="url" @click="goBackwebsite(summary.official_website)">{{summary.official_website}}</span></li>
            <li><span>项目SNS</span>
                <p>
                    <a :href="github_url" v-if="github_url" @click="getIconUrl(github_url)">
                      <img src="../img/con_icon_mao_sel.png" alt="">
                    </a>
                    <img src="../img/con_icon_mao_nor.png" v-else alt="">

                    <a :href="twitter_url" v-if="twitter_url" @click="getIconUrl(twitter_url)">
                      <img src="../img/con_icon_niao_sel.png" alt="">
                    </a>
                    <img src="../img/con_icon_niao_nor.png" v-else alt="">

                    <a :href="facebook_url" v-if="facebook_url" @click="getIconUrl(facebook_url)">
                      <img src="../img/con_icon_f_sel.png" alt="">
                    </a>
                    <img src="../img/con_icon_f_nor.png" v-else alt="">

                    <a :href="telegram_url" v-if="telegram_url" @click="getIconUrl(telegram_url)">
                      <img src="../img/con_icon_feixing_sel.png" alt="">
                    </a>
                    <img src="../img/con_icon_feixing_nor.png" v-else alt="">

                    <a :href="weibo_url" v-if="weibo_url"  @click="getIconUrl(weibo_url)">
                      <img src="../img/con_icon_weibo_sel.png" alt="">
                    </a>
                    <img src="../img/con_icon_weibo_nor.png" v-else alt="">
                </p>
            </li>
            <li class="search">
              <span>项目区块浏览器</span>
              <p>
                <a :href="block_browser" v-show="block_browser"  @click="getIconUrl(block_browser)">
                  <img src="../img/con_icon_sousuo_sel.png" alt="">
                </a>
                <img src="../img/con_icon_sousuo_nor.png" v-show="!block_browser" alt="">
              </p>
              </li>
            <li>
                <span>项目介绍</span>
            </li>
            <li class="conbox">
                <div class="con">{{summary.desc_zh? summary.desc_zh :summary.desc_en}}</div>
            </li>
            <li>
                <span>项目特点</span>
            </li>
            <li class="conbox">
                <div class="con">{{summary.tech_characteristics_zh? summary.tech_characteristics_zh :summary.tech_characteristics_zh}}</div>
            </li>
        </ul>
        <ul class="plateSurvey">
            <li>
              <h2 class="scoreBox"><b>板块概况</b> <p><span>{{summary.cat_score}}</span>/ 100</p></h2>
            </li>
            <li><span>所属板块</span> <b>{{summary.category_name}}</b></li>
            <li><span>板块排名</span> <b>{{summary.category_rank}}</b></li>
            <li><span>板块内市值占比</span> <b>{{(summary.category_proportion*100).toFixed(2)+'%'}}</b></li>
            <li style="border:none;padding-top:.15rem;"><span>同板块项目</span> <b style="color:#326cf7" @click="lookMore(summary.cat_id, summary.category_name)">查看更多</b></li>
            <li class="team_content">
                <swiper :options="swiperOption" class="swiperBox">
                    <swiper-slide v-for="(val,ind) in obj.category_project" :key="ind">
                        <dl @click="samePlate(val.token_id)">
                            <dt><img :src="val.logo ? val.logo : '../img/bitebi.png'" alt=""></dt>
                            <dd>
                                <p>{{val.token_short_name}}</p>
                            </dd>
                        </dl>
                    </swiper-slide>
                </swiper>
            </li>
            <li v-if="category_project==0">
              <div class="project_tip">
                  <img src="../img/tip.png" alt="">
                  <h3>暂无数据</h3>
              </div>
            </li>
            <!--<li style="border:none;" v-if="obj.founder_team"><span>基于{{token_short_name}}开发的项目</span></li>
            <li class="team_content" v-if="obj.founder_team">
                <dl v-for="(val,ind) in obj.founder_team" :key="ind">
                    <dt><img src="../img/bitebi.png" alt="" v-if="!val.avatar"><img :src="val.avatar" alt="" v-if="val.avatar"></dt>
                    <dd>
                        <p>{{val.name_zh? val.name_zh :val.name_en}}</p>
                    </dd>
                </dl>
            </li>
             <li><span style="color:#000;">NEO链上的项目总值</span><b style="margin-right:10%;color:#142f82;">￥1,164,048,243,456</b></li> -->
        </ul>
        <ol class="team">
            <li>
                <h2 class="scoreBox"><b>项目团队</b> <p><span>{{header_data.team_score?header_data.team_score:'- -'}} </span>/ 100</p></h2>
            </li>
            <li v-if="founderTeam.length>0"><p>创始团队</p></li>
            <li class="team_content" v-if="founderTeam.length>0">
                <swiper :options="swiperOption" class="swiperBox">
                    <swiper-slide v-for="(val,ind) in obj.founder_team" :key="ind" >
                        <dl @click="foundingTeam(val.person_id, ind)">
                            <dt><img :src="val.avatar" alt=""></dt>
                            <dd>
                                <p>{{val.name_zh? val.name_zh :val.name_en}}</p>
                            </dd>
                        </dl>
                    </swiper-slide>
                </swiper>
            </li>
            <li v-if="founderTeam.length==0 && adviser.length==0 && investor.length==0">
              <div class="project_tip">
                  <img src="../img/tip.png" alt="">
                  <h3>暂无数据</h3>
              </div>
            </li>
            <li v-if="adviser.length>0"><p>顾问团队</p></li>
            <li class="team_content" v-if="adviser.length>0">
                <swiper :options="swiperOption" class="swiperBox">
                    <swiper-slide v-for="(val,ind) in obj.adviser" :key="ind" >
                        <dl @click="foundingTeam(val.person_id, ind)">
                            <dt><img :src="val.avatar" alt=""></dt>
                            <dd>
                                <p>{{val.name_zh? val.name_zh :val.name_en}}</p>
                            </dd>
                        </dl>
                    </swiper-slide>
                </swiper>
            </li>
            <li v-if="investor.length>0"><p>投资人</p></li>
            <li class="team_content" v-if="investor.length>0">
                <swiper :options="swiperOption" class="swiperBox">
                    <swiper-slide v-for="(val,ind) in obj.investor" :key="ind" >
                        <dl @click="foundingTeam(val.person_id)">
                            <dt><img :src="val.avatar" alt=""></dt>
                            <dd>
                                <p>{{val.name_zh? val.name_zh :val.name_en}}</p>
                                <p style="margin-top:5px;">{{val.title_zh[0]?val.title_zh[0]:(val.title_en[0]?val.title_en[0]:'')}}</p>
                            </dd>
                        </dl>
                    </swiper-slide>
                </swiper>
            </li>
            <!-- <li><p class="titl">技术特点</p></li>
            <li class="conbox">
                <div class="con">{{obj.tech_characteristics_zh ? obj.tech_characteristics_zh: obj.tech_characteristics_en}}</div>
            </li> -->
        </ol>
    </div>
</template>
<script>
import '../assets/css/detail.css'
import store from "../store/store.js";
import { mapActions, mapState } from "vuex";
import { bus, event } from "../eventbus/index";
import { formatDate } from "../common/date.js";
import "swiper/dist/css/swiper.min.css";
import "swiper/dist/js/swiper.min";
import Swiper from "swiper";

export default {
  data() {
    return {
      character: "",
      isShow: true,
      twitter_url: "",
      weibo_url: "",
      telegram_url: "",
      github_url: "",
      facebook_url: "",
      block_browser: "",
      header_data: {},
      summary: {},
      category_project: [],
      founderTeam: [],
      adviser: [],
      investor: [],
      token_short_name: "",
      swiperOption: {
        slidesPerView: 2,
        spaceBetween: 10
      },
    };
  },
  store,
  methods: {
    gotoExtend(){
      // this.$router.replace('/activity')
    },
    ...mapActions(["getData"]),
    goBackwebsite(con) {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/iPhone/i) == "iphone") {
        window.webkit.messageHandlers.goBackwebsite.postMessage(con);
      } else if (ua.match(/Android/i) == "android") {
        android.gotoProjectNetwork(con);
      }
    },
    getIconUrl(url) {
      //系统判断
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/iPhone/i) == "iphone") {
        window.webkit.messageHandlers.gotoPlate.postMessage(url);
      } else if (ua.match(/Android/i) == "android") {
        android.gotoPlate(url);
      }
    },
    onDataInitFinish() {
      // console.log(this.obj)
      this.header_data = this.obj.header_data;
      this.summary = this.obj.summary;
      let sns_json = this.obj.summary.sns_json;
      this.category_project = this.obj.category_project.length;
      this.founderTeam = this.obj.founder_team;
      // console.log(this.founderTeam, 'founder')
      this.adviser = this.obj.adviser;
      this.investor = this.obj.investor;
      this.token_short_name = this.obj.header_data.token_short_name;
      // console.log(sns_json)
      if (
        sns_json.twitter_url &&
        sns_json.twitter_url.indexOf("https://") == -1
      ) {
        this.twitter_url = "https://" + sns_json.twitter_url;
      } else {
        this.twitter_url = sns_json.twitter_url;
      }
      if (sns_json.weibo_url && sns_json.weibo_url.indexOf("https://") == -1) {
        this.weibo_url = "https://" + sns_json.weibo_url;
      } else {
        this.weibo_url = sns_json.weibo_url;
      }
      if (
        sns_json.telegram_url &&
        sns_json.telegram_url.indexOf("https://") == -1
      ) {
        this.telegram_url = "https://" + sns_json.telegram_url;
      } else {
        this.telegram_url = sns_json.telegram_url;
      }
      if (
        sns_json.github_url &&
        sns_json.github_url.indexOf("https://") == -1
      ) {
        this.github_url = "https://" + sns_json.github_url;
      } else {
        this.github_url = sns_json.github_url;
      }

      if (
        sns_json.facebook_url &&
        sns_json.facebook_url.indexOf("https://") == -1
      ) {
        this.facebook_url = "https://" + sns_json.facebook_url;
      } else {
        this.facebook_url = sns_json.facebook_url;
      }
      if (
        this.obj.summary.block_browser &&
        this.obj.summary.block_browser.indexOf("https://") == -1
      ) {
        this.block_browser = "https://" + this.obj.summary.block_browser;
      } else {
        this.block_browser = this.obj.summary.block_browser;
      }
    },
    lookMore(cat_id, cat_name) {
      // console.log(catCon)
      //系统判断
      let catData = {
        cat_id: cat_id.toString(),
        cat_name: cat_name
      };
      console.log();
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/iPhone/i) == "iphone") {
        window.webkit.messageHandlers.lookMore.postMessage(
          JSON.stringify(catData)
        );
      } else if (ua.match(/Android/i) == "android") {
        android.lookMore(JSON.stringify(catData));
      }
    },
    samePlate(token_id) {
      //系统判断
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/iPhone/i) == "iphone") {
        window.webkit.messageHandlers.samePlate.postMessage(token_id);
      } else if (ua.match(/Android/i) == "android") {
        android.samePlate(token_id);
      }
    },
    foundingTeam(person_id, ind) {
      // console.log(this.founderTeam[ind], '22222');
      let founderData = JSON.stringify(this.founderTeam[ind]);
      debugger;

      //系统判断
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/iPhone/i) == "iphone") {
        window.webkit.messageHandlers.foundingTeam.postMessage(founderData);
      } else if (ua.match(/Android/i) == "android") {
        android.foundingTeam(person_id);
      }
    }
  },
  computed: {
    ...mapState({
      scored: state => state.scored,
      obj: state => state.nameData
    })
  },
  created() {
    this.token_id = this.$route.query.token_id;
    this.sign = this.$route.query.sign;
    this.getData({
      token_id: this.token_id,
      sign: this.sign ? this.sign : ""
    });
    bus.$on(event.detail_init_finish, this.onDataInitFinish);
  },
  mounted () {
  },

  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    }
  },
  beforeDestroy() {
    bus.$off(event.detail_init_finish, this.onDataInitFinish);
  }
};
</script>
<style scoped>
.search p a {
  width: 0.6rem;
  height: 100%;
  display: inline-block;
  z-index: 999;
}
.title {
  width: 100%;
  line-height: 0.8rem;
  background: #fff;
}
.title span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.24rem;
  color: #666;
  display: block;
}
.title img {
  vertical-align: middle;
  margin-right: 0.2rem;
  padding-left: 0.3rem;
  width: .5rem;
}
.title i {
  font-style: normal;
  color: #db2525;
}
.score {
  display: flex;
  justify-content: space-around;
  padding: 0.45rem 0;
  border-top: 1px solid #e6ecf9;
}
.score span {
  width: 30%;
  text-align: center;
}
.score span:nth-child(2) {
  flex: 1.5;
}
.score span i {
  font-style: normal;
  display: block;
  font-size: 0.26rem;
  color: #7a7a7a;
}
.score span b {
  color: #142f82;
  font-size: 0.36rem;
}
.score span img {
  width: 0.24rem;
}
.score span:last-child {
  border-left: 1px solid #f2f2f2;
}
.proSurvey,
.team {
  padding: 0 0.3rem;
  background: #fff;
  margin: 0.3rem 0;
}
.team {
  margin-bottom: 0;
  padding-bottom: 0.4rem !important;
}
.proSurvey li {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #f2f2f2;
  line-height: 0.8rem;
  font-size: 0.24rem;
}
.proSurvey li:nth-child(1) {
  font-size: 0.3rem;
  font-weight: bolder;
  color: #000;
  margin-bottom: 0;
}
.proSurvey li:nth-child(2) {
  border-top: none;
}
.proSurvey li span {
  color: #7a7a7a;
}
.proSurvey li p img {
  margin-left: 0.3rem;
  vertical-align: middle;
  width: 0.4rem;
}
.proSurvey li .url {
  display: inline-block;
  width: 80%;
  text-align: right;
  color: #142f82;
  text-decoration: underline;
  font-size: 0.3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
li.conbox {
  border-top: none;
  line-height: 0.4rem;
}
li .con {
  display: block;
  line-height: 0.4rem;
  padding-bottom: 0.3rem;
  font-size: 0.24rem;
}
.plateSurvey {
  padding: 0 0.3rem;
  background: #fff;
}
.plateSurvey li:nth-child(1) {
  padding-top: 0.38rem;
  line-height: 0.75rem;
  border: none;
}
.plateSurvey li {
  display: flex;
  justify-content: space-between;
  font-size: 0.24rem;
  line-height: 0.85rem;
  border-bottom: 1px solid #e6ecf9;
}
.plateSurvey li span {
  color: #999;
}
.plateSurvey li:last-child {
  border: none;
}
.team_content {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  border: none !important;
}
.team_content dl {
  display: flex;
  align-items: center;
  width: 100% !important;
  height: 1.9rem;
  border: 1px solid #f2f2f2;
}
.team_content dl:nth-child(1),
.team_content dl:nth-child(2) {
  margin-top: 0;
}
.team_content dl dt {
  margin: 10px;
  width: 1.2rem;
  height: 1.2rem;
  overflow: hidden;
  border-radius: 50%;
}
.team_content dl dt img {
  vertical-align: middle;
  width: 100% ;
  height:auto;
}
.team_content dl dd {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  width: 50%;
  line-height: 0.3rem;
}
.team_content > li dl span {
  font-size: 0.25rem;
  color: #666;
}
.team li {
  line-height: 0.75rem;
}
.team li:nth-child(1) {
  font-size: 0.3rem;
  font-weight: bolder;
  color: #000;
  padding-top: 0.38rem;
}
.team li > p {
  line-height: 0.95rem;
  font-size: 0.24rem;
  color: #c1c1c1;
}
.team > li {
  display: flex;
  justify-content: space-between;
}
.team > li > dl {
  display: flex;
  align-items: center;
  width: 48%;
  border: 1px solid #f2f2f2;
}
.team_content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.team dl dt {
  margin: 10px;
  width: 1.2rem;
  height: 1.2rem;
}
.team dl dd {
  width: 50%;
  line-height: 0.3rem;
}
.team > li dl span {
  font-size: 0.25rem;
  color: #666;
}
li dl dd p {
  font-size: 0.24rem !important;
}
.titl {
  font-size: 0.3rem;
  font-weight: bolder;
  color: #000 !important;
}
.swiperBox{
  padding-bottom: .25rem;
}
</style>
