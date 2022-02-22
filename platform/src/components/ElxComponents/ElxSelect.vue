<template>
  <el-select
    v-model="data"
    @change="dataChange"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </el-select>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      data: this.value,
    };
  },
  watch: {
    value: {
      handler() {
        this.data = this.value;
      },
      deep: true,
    },
  },
  methods: {
    dataChange() {
      this.$emit("update:value", this.data);
    },
  },
};
</script>

<style lang="scss" scoped></style>
