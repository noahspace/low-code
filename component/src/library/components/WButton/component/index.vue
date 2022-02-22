<template>
  <el-button class="w-button" v-bind="data.attribs" v-on="events">
    {{ buttonText }}
  </el-button>
</template>

<script>
import componentMixin from "../../../componentMixin";
export default {
  mixins: [componentMixin],
  data() {
    return {
      buttonText: this.data.datas.find((obj) => obj.attribs === "buttonText")
        .defaultValue,
    };
  },
};
</script>

<style lang="scss" scoped></style>
