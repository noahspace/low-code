<template>
  <div class="w-text" v-bind="data.attribs" v-on="events">{{ text }}</div>
</template>

<script>
import componentMixin from "../../../componentMixin";
export default {
  mixins: [componentMixin],
  data() {
    return {
      text: this.data.datas.find((obj) => obj.attribs === "text").defaultValue,
    };
  },
};
</script>

<style lang="scss" scoped>
.w-text {
  display: inline-block;
}
</style>
