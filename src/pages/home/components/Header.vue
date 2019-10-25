<template>
  <div class="header">
    <div class="header-left">
      <div class="iconfont back-icon">&#xe624;</div>
    </div>
    <div class="header-input">
      <span class="iconfont">&#xe632;</span>
      search the cities/place/topic
    </div>
    <router-link to="/cities">
      <div class="header-right">
        {{this.city}}
        <span class="iconfont arrow-icon">&#xe62d;</span>
      </div>
    </router-link>
  </div>
</template>

<script>
//mapState 的作用就是帮我们把store state的值转化成计算属性的写法
import { mapState } from "vuex";

export default {
  name: "HomeHeader",

  computed: {
    // ...展开语法(Spread syntax), 可以在函数调用/数组构造时, 将数组表达式或者string在语法层面展开
    ...mapState(["city"])
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/variables.styl';

.header {
  display: flex;
  line-height: $headerHeight;
  background: $bgColor;
  color: #fff;
}

.header-left {
  width: 0.64rem;
  float: left;
  text-align: center;

  .back-icon {
    text-align: center;
    font-size: 0.4rem;
  }
}

.header-input {
  flex: 1;
  color: #ccc;
  height: 0.64rem;
  line-height: 0.64rem;
  padding-left: 0.2rem;
  margin-top: 0.12rem;
  margin-left: 0.2rem;
  background: #fff;
  border-radius: 0.1rem;
}

.header-right {
  min-width: 1.04rem;
  padding: 0 0.1rem;
  float: right;
  text-align: center;
  color: #fff;
  font-family: $fontFamily;

  .arrow-icon {
    font-size: 0.24rem;
    margin-left: -0.04rem;
  }
}
</style>
