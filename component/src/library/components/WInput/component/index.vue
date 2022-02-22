<template>
  <el-input v-model="value" class="w-input" v-bind="data.attribs" v-on="events">
  </el-input>
</template>

<script>
import componentMixin from "../../../componentMixin";
export default {
  mixins: [componentMixin],
  data() {
    return {
      value: this.data.datas.find((obj) => obj.attribs === "value")
        .defaultValue,
    };
  },
};
</script>

<style lang="scss" scoped></style>
