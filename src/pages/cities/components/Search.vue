<template>
  <div>
    <div class="search">
      <input
        v-model="keyword"
        class="search-input"
        type="text"
        placeholder="please type the name of the city"
      />
    </div>
    <div v-show="keyword" class="search-content" ref="search">
      <ul>
        <li
          class="search-item border border-bottom"
          v-for="item of list"
          :key="item.id"
           @click="handleClickCity(item.name)"
        >{{item.name}}</li>
        <li v-show="hasNoData" class="search-item border-bottom">
        no result was found
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
import {mapMutations} from 'vuex'
export default {
  name: "CitySearch",
  props: {
    cities: Object
  },
  data() {
    return {
      keyword: "",
      list: [],
      timer: null
    };
  },
   methods: {
    handleClickCity(city) {
      // clear keyword to clear search page
      this.keyword=""
      this.changeCity(city)
      this.$router.push('/')
    },
    ...mapMutations(['changeCity'])
  },
  computed: {
      hasNoData() {
          return !this.list.length
      }
  },
  watch: {
    keyword() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      // if keyword is clear, return an empty list
      if (!this.keyword) {
          this.list=[];
          return this.list
      }
      this.timer = setTimeout(() => {
        const result = [];
        // for each city
        for (let i in this.cities) {
          // for each cities key
          this.cities[i].forEach(value => {
            if (value.name.toLowerCase().indexOf(this.keyword.toLowerCase()) > -1) {
              result.push(value);
            }
          });
        }
        this.list = result;
      }, 100);
    }
  },
  mounted(){
      this.scroll=new Bscroll(this.$refs.search)
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/variables.styl';

.search {
  height: 0.72rem;
  padding: 0 0.1rem;
  background: $bgColor;

  .search-input {
    box-sizing: border-box;
    width: 100%;
    height: 0.62rem;
    line-height: 0.62rem;
    padding: 0 0.1rem;
    border-radius: 0.06rem;
    color: #666;
  }
}

.search-content {
  z-index: 1;
  overflow: hidden;
  position: absolute;
  top: 1.58rem;
  left: 0;
  right: 0;
  bottom: 0;
  background: #eee;

  .search-item {
    line-height: 0.62rem;
    padding-left: 0.2rem;
    background: #fff;
    color: #666;
  }
}
</style>