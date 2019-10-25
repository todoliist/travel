<template>
  <div>
    <home-header></home-header>
    <home-swiper :list="swiperList"></home-swiper>
    <home-icons :list="iconsList"></home-icons>
    <hot-deals :list="hotList"></hot-deals>
    <winter-recommend :list="weekendList"></winter-recommend>
  </div>
</template>
<script>
import HomeHeader from "./components/Header";
import HomeSwiper from "./components/Swiper";
import HomeIcons from "./components/Icons";
import HotDeals from "./components/HotDeals";
import WinterRecommend from "./components/WinterRecommend";
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    HomeHeader,
    HomeSwiper,
    HomeIcons,
    HotDeals,
    WinterRecommend
  },
  data() {
    return {
      // the user picked city last time
      lastCity: "",
      swiperList: [],
      iconsList: [],
      hotList: [],
      weekendList: []
    };
  },
  methods: {
    getHomeInfo() {
      // using api instead of static/mock, because for production env is api/..., so we go to config/index.js, config in proxytable, use word api to replace static/mock
      // this means any request for json file under api folder will be forward to local static/mock folder
      axios.get("/api/index.json?city=" + this.city).then(this.getHomeInfoSucc);
    },
    getHomeInfoSucc(res) {
      // get data from response
      res = res.data;
      if (res.ret && res.data) {
        const data = res.data;
        this.swiperList = data.swiperList;
        this.iconsList = data.iconsList;
        this.hotList = data.hotList;
        this.weekendList = data.weekendList;
      }
    }
  },
  computed: {
    ...mapState(["city"])
  },
  mounted() {
    this.lastCity = this.city;
    this.getHomeInfo();
  },
  // when keep-alive is used (in App.vue), mounted hook only actiave once, but activated hook will be activated everytime pages was reload or refresh
  activated() {
    // only if lastcity=this city, axios was not needed to get data from server.
    // lastcity=thiscity, means user didn't pick different city in list page
    // refresh page or pick the same city in list page wont change lastCity
    if (this.lastCity !== this.city) {
      this.lastCity = this.city;
      this.getHomeInfo();
    }
  }
};
</script>
