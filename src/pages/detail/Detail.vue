<template>
  <div>
    <detail-banner :sightName="sightName" :bannerImg="bannerImg" :gallaryImgs="gallaryImgs"></detail-banner>
    <detail-header></detail-header>
    <div class="content">
      <detail-list :list="list"></detail-list>
    </div>
  </div>
</template>

<script>
import DetailBanner from "./components/Banner";
import DetailHeader from "./components/Header";
import DetailList from "./components/List";
import { mapState } from "vuex";
import axios from "axios";
export default {
  // name的用途：递归，keep-alive exclusive，以及Vue在chrome上的插件对组件的命名都会用到 
  name: "Detail",
  components: {
    DetailBanner,
    DetailHeader,
    DetailList
  },
  data() {
    return {
      sightName: "",
      bannerImg: "",
      gallaryImgs: [],
      list: []
    };
  },
  methods: {
    getDetailInfo() {
      // get current activated params and search by axios
      // similar to : axios.get('/api/detail.json?id='+this.$route.params.id)
      axios
        .get("/api/detail.json", {
          params: {
            id: this.$route.params.id
          }
        })
        .then(this.handleGetDataSucc);
    },
    handleGetDataSucc(res) {
      var json = require("../../../static/mock/index.json");
      var index = json.findIndex(obj => obj.city==this.city);
      res = res.data[index];
      if (res.ret && res.data) {
        const data = res.data;
        this.sightName = data.sightName[+this.$route.params.id-1];
        this.bannerImg = data.bannerImg[+this.$route.params.id-1];
        this.gallaryImgs = data.gallaryImgs[+this.$route.params.id-1];
        this.list = data.categoryList;
      }
    }
  },
    computed: {
    ...mapState(["city"])
  },
  // mount only executed once, so axios only exectute once because of <keep-alive>
  // so need to add exclusive for Detail page because it need to get data based on ID 
  // or we can use activated hook as well
  mounted() {
    this.getDetailInfo();
  }
};
</script>

<style lang="stylus" scoped>
.content {
  height: 50rem;
}
</style>