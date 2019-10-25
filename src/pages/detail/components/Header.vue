<template>
  <div>
    <router-link tag="div" to="/" class="header-abs" v-show="showAbs">
      <div class="iconfont header-abs-back">&#xe624;</div>
    </router-link>
    <div class="header-fixed" v-show="!showAbs" :style="opacityStyle">
      <router-link to="/">
        <div class="iconfont header-fixed-back">&#xe624;</div>
      </router-link>city detail
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailHeader",
  data() {
    return {
      showAbs: true,
      opacityStyle: {
        opacity: 0
      }
    };
  },
  methods: {
    handleScroll() {
      //number of pixels that an element's content is scrolled vertically.
      const top = document.documentElement.scrollTop;
      // if scroll down over 60px
      if (top > 60) {
        // opacity change from 0 to top/140
        let opacity = top / 140;
        // let opacity maximum =1
        opacity = opacity > 1 ? 1 : opacity;
        this.opacityStyle = {
          opacity
        };

        //header will appear,
        this.showAbs = false;
      } else {
        this.showAbs = true;
      }
    }
  },
  activated() {
    // watch scroll action and perform function
    // window事件为全局事件，任何页面scroll都会被监听
    window.addEventListener("scroll", this.handleScroll);
  },

  // 页面即将隐藏或者被替换的时候会有deactivated hook
  // 实现了解绑，否则任何页面的scroll都会被监听
  deactivated() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/variables.styl';

.header-abs {
  position: absolute;
  left: 0.2rem;
  top: 0.2rem;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 0.4rem;
  text-align: center;
  line-height: 0.8rem;
  background: rgba(0, 0, 0, 0.8);

  .header-abs-back {
    color: #fff;
    font-size: 0.4rem;
  }
}

.header-fixed {
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: $headerHeight;
  line-height: $headerHeight;
  text-align: center;
  color: #fff;
  background: $bgColor;
  font-size: 0.32rem;

  .header-fixed-back {
    position: absolute;
    top: 0;
    left: 0;
    width: 0.64rem;
    text-align: center;
    font-size: 0.4rem;
    color: #fff;
  }
}
</style>