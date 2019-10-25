<template>
  <ul class="list">
    <li
      class="item"
      v-for="item of letters"
      :key="item"
      :ref="item"
      @touchstart.prevent="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @click="handleLetterClick"
    >{{item}}</li>
  </ul>
</template>

<script>
export default {
  name: "CityAlphabet",
  props: {
    cities: Object
  },
  data() {
    return {
      touchStatus: false,
      startY: 0,
      timer: null
    };
  },
  updated() {
    // distance between element A to blue search areas bottom, which always equal to 74
    this.startY = this.$refs["A"][0].offsetTop;
  },
  computed: {
    letters() {
      const letters = [];
      for (let i in this.cities) {
        letters.push(i);
      }
      return letters;
    }
  },
  methods: {
    handleLetterClick(e) {
      // pass this clicked letter to Cities.vue first
      this.$emit("change", e.target.innerText);
    },
    handleTouchStart() {
      this.touchStatus = true;
    },
    handleTouchMove(e) {
      // see 8-6
      if (this.touchStatus) {
        if (this.timer) {
          // if timer exist and operate emit action happend within 16ms,counted time will be clear, so emit action will happen in new 16ms
          clearTimeout(this.timer);
        }
        // 16ms later to operate emit
        this.timer = setTimeout(() => {
          // e.touches[0] is finger's info, e.touches[0].clientY is distance from current finger to page top
          // 79=pick cities + search cities part, so touchY is current finger to search area blue bottom
          const touchY = e.touches[0].clientY - 79;

          // 20=letter's height, index is how many index from A to finger
          const index = Math.floor((touchY - this.startY) / 20);
          if (index >= 0 && index < this.letters.length) {
            // pass this letter with related index to Cities.vue first
            this.$emit("change", this.letters[index]);
          }
        }, 16);
      }
    },
    handleTouchEnd() {
      this.touchStatus = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/variables.styl';

.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 1.58rem;
  right: 0;
  bottom: 0;
  width: 0.4rem;

  .item {
    line-height: 0.4rem;
    text-align: center;
    color: $bgColor;
  }
}
</style>