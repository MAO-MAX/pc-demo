<template>
    <div class="trans_box">
        <ul class="left">
            <li v-for="(item,index) in titl" :key="index"><span>{{item}}</span></li>
        </ul>
        <div class="right">
            <div class="swiper">
                <swiper :options="swiperOption" class="swiperBox">
                    <swiper-slide v-for="(val,ind) in proArr" :key='ind' class="ul">
                        <li>
                            <div class="imgBox">
                              <b class="del" @click="del(ind)" v-show="isShowAdd"><img src="../../img/del.png" alt=""></b>
                              <img  :src="val.logo" alt="" class="img_logo">
                              <strong>{{val.token_short_name}}</strong>
                            </div>
                        </li>
                        <li><p>{{val.token_sum_score?val.token_sum_score:'... ...'}}</p></li>
                        <li><p>{{val.cat_name_zh? val.cat_name_zh: (val.cat_name_en ? val.cat_name_en : '... ...')}}</p></li>
                        <li><p><span :class="{'rankStyle': val.category_rank*1<10}">{{val.category_rank}}</span></p></li>
                        <li><p>{{val.category_proportion?(val.category_proportion*100).toFixed(2)+'%':'... ...'}}</p></li>
                        <li><p>{{(val.online_time*1000) | formatDate}}</p></li>
                        <li><p>{{val.stage? val.stage : '... ...'}}</p></li>
                        <li><p>{{val.num_institutions? val.num_institutions+'家' :'... ...'}}</p></li>
                        <li><p>{{val.num_investors? val.num_investors+'人' : '... ...'}} </p></li>
                        <li class="last"><img src="../../img/whether_icon1.png" alt="" v-if="val.is_ico"><img src="../../img/whether_icon2.png" alt="" v-else></li>
                        <!-- <li><img :src="val.is_ico ? '../../img/whether_icon1.png' : '../../img/whether_icon2.png'" alt=""></li> -->
                    </swiper-slide>
                    <ul id="addPro" class="swiper-slide ul" v-show="isShowAdd && proLen<5">
                        <li @click="addPro">
                          <div class="imgBox">
                              <img src="../../img/addPro.png" alt=""><strong>添加项目</strong>
                          </div>
                        </li>
                        <li><i>... ...</i></li>
                        <li><i>... ...</i></li>
                        <li><i>... ...</i></li>
                        <li><i>... ...</i></li>
                        <li><i>... ...</i></li>
                        <li><i>... ...</i></li>
                        <li><i>... ...</i></li>
                        <li><i>... ...</i></li>
                        <li><i>... ...</i></li>
                    </ul>
                </swiper>
            </div>
        </div>
    </div>
</template>
<script>
import '../../assets/css/contrast.css'
import "swiper/dist/css/swiper.min.css";
import "swiper/dist/js/swiper.min";
import Swiper from "swiper";
import {formatDate} from '../../common/date.js';
import {baseUrl} from '../../config/port'
export default {
  data() {
    return {
      titl: [
        "项目名称",
        "通客评分",
        "所属板块",
        "板块排名",
        "板块市值占比",
        "上线时间",
        "开发阶段",
        "投资机构",
        "投资人数",
        "是否ICO"
      ],
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 0
      },
      flag: true,
      proArr: [],
      isShowAdd:true,
      proLen:0,
    };
  },
  updated(){
    this.proLen = sessionStorage.getItem('token_ids').split(',').length;
  },
  methods: {
    del(ind) {
      this.proArr.splice(ind, 1);
      var localArr = sessionStorage.getItem("token_ids").split(",");
      var arr = [];
      localArr.map(item => {
        if (
          item !=
          sessionStorage
            .getItem("token_ids")
            .split(",")
            .splice(ind, 1)
        ) {
          arr.push(item);
        } else {
          return;
        }
      });
      sessionStorage.setItem("default", 11);
      sessionStorage.setItem("token_ids", arr);
      var json = JSON.stringify(this.proArr);
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/iPhone/i) == "iphone") {
        window.webkit.messageHandlers.delData.postMessage(json);
      }
    },
    addPro() {
      var _this = this;
      var json = JSON.stringify(_this.proArr);
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/iPhone/i) == "iphone") {
        window.webkit.messageHandlers.getIndex.postMessage(this.$route.path.slice(1));
        window.webkit.messageHandlers.getContrastData.postMessage(json);
      } else if (ua.match(/Android/i) == "android") {
        android.getTag('tag'); 
        android.getContrastData(json);
        android.getIndex(this.$route.path.slice(1));
      }
      
    }
  },
  created() { 
    // 判断进入的是否历史记录的页面
    if(window.location.href.indexOf('come_from=history')!=-1){
        this.isShowAdd = false;
    } else{
      this.isShowAdd = true;
    }

    var sign = this.$route.query.sign;
    var token_id = this.$route.query.token_id;
    var token_ids = token_id.split(",");
    // console.log(token_ids)

    if (sessionStorage.getItem("token_ids")) {
      token_ids = sessionStorage.getItem("token_ids").split(",");
    } else if (sessionStorage.getItem("default") === null) {
      sessionStorage.setItem("token_ids", token_ids);
    } else {
      token_ids = sessionStorage.getItem("token_ids").split(",");
    }

    this.axios.post(baseUrl+"/users/" + this.$route.query.user_id + "/comparisons?sign=" + sign, {
      token_id: token_ids,
      benchmark: 'basic'
    })
    .then( res => {
      // console.log(res)
      this.proArr = res.data.data;
      // console.log( ((this.proArr[0].online_time*1000)) | formatDate)
    })
    .catch( error => {
      console.log(error)
    })
    this.proLen = sessionStorage.getItem('token_ids').split(',').length;
    
  },
  filters: {
      formatDate(time) {
          var date = new Date(time);
          return formatDate(date, 'yyyy-MM-dd');
      }
  }
};
</script>
<style scoped>
.trans_box {
  display: flex;
}
#addPro li i {
  margin: 0 auto;
  color: #666;
}
.last>img{
  width: .37rem !important;
  margin-top: 0 !important;
}
strong{
  display:block;
}
</style>
