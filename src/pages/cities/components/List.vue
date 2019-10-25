<template>
  <div class="list" ref="wrapper">
    <div>
      <div class="area">
        <div class="title border-topbottom">current location</div>
        <div class="button-list">
          <div class="button-wrapper">
            <div class="button">{{currentCity}}</div>
          </div>
        </div>
      </div>
      <div class="area">
        <div class="title border-topbottom">popular location</div>
        <div class="button-list">
          <div
            class="button-wrapper"
            v-for="item of hot"
            :key="item.id"
            @click="handleClickCity(item.name)"
          >
            <div class="button">{{item.name}}</div>
          </div>
        </div>
      </div>
      <div class="area" v-for="(item, key) of cities" :key="key" :ref="key">
        <div class="title border-topbottom">{{key}}</div>
        <div class="item-list">
          <div
            class="item border-bottom"
            v-for="innerItem of item"
            :key="innerItem.id"
            @click="handleClickCity(innerItem.name)"
          >{{innerItem.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// a plugin which is aimed at solving scrolling circumstances on the mobile side (PC supported already).
import BScroll from "better-scroll";
import { mapState, mapMutations } from "vuex";
export default {
  name: "CityList",
  props: {
    cities: Object,
    hot: Array,
    letter: String
  },
  methods: {
    handleClickCity(city) {
      // since mapMutation has been used, commit method is not needed.
      // this.$store.commit("changeCity", city);
      this.changeCity(city);
      this.$router.push("/");
    },
    //mapMutations 工具函数会将 store 中的 commit 方法映射到组件的 methods 中
    ...mapMutations(["changeCity"])
  },
  computed: {
    ...mapState({
      // mapping city in vuex.state into currentCity property
      currentCity: "city"
    })
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper);
  },
  watch: {
    // watch letter changes
    letter() {
      if (this.letter) {
        // one key(from letter A-Z) for one item in cities, so refs[key] means there is a letter reference based on your clicked letter
        // returning value is an DOM array, so used [0] to get the DOM
        // can't write as this.$refs.(this.letter)
        // element is a DOM element scrollToElement needs a DOM as arg
        const element = this.$refs[this.letter][0];
        this.scroll.scrollToElement(element);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/variables.styl';

.list {
  overflow: hidden;
  position: absolute;
  top: 1.58rem;
  bottom: 0;
  left: 0;
  right: 0;

  .border-topbottom {
    &:before {
      border-color: #777;
    }

    &:after {
      border-color: #777;
    }
  }

  .border-bottom {
    &:before {
      border-color: #777;
    }
  }

  .title {
    line-height: 0.54rem;
    background: #eee;
    padding: left 0.2rem;
    color: #666;
    font-size: 0.26rem;
  }

  .button-list {
    overflow: hidden;
    padding: 0.1rem 0.6rem 0.1rem 0.1rem;

    .button-wrapper {
      float: left;
      width: 33.33%;

      .button {
        padding: 0.1rem 0;
        margin: 0.1rem;
        text-align: center;
        border: 0.02rem solid #ccc;
        border-radius: 0.06rem;
      }
    }
  }

  .item-list {
    .item {
      line-height: 0.76rem;
      padding-left: 0.2rem;
    }
  }
}
</style>