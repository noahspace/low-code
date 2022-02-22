<template>
  <div class="w-streak" :style="lengthOption">
    <div class="streak" :style="styleOption" v-on="events"></div>
  </div>
</template>

<script>
import componentMixin from "../../../componentMixin";
export default {
  mixins: [componentMixin],
  computed: {
    styleOption() {
      let border = `border-${this.data.attribs.direction}: ${this.data.attribs.width} ${this.data.attribs.type} ${this.data.attribs.color};`;
      return border + this.lengthOption;
    },
    lengthOption() {
      return this.data.attribs.direction === "top"
        ? `width: ${this.data.attribs.length};`
        : `height: ${this.data.attribs.length};`;
    },
  },
};
</script>

<style lang="scss" scoped>
.w-streak {
  font-size: 0;
  display: inline-block;
  .streak {
    display: inline-block;
  }
}
</style>
