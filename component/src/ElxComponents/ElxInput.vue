<template>
  <el-input
    v-model="data"
    @change="dataChange"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot slot="suffix" name="suffix"></slot>
  </el-input>
</template>

<script>
export default {
  props: {
    value: {},
    valueType: {
      default: "default",
    },
  },
  data() {
    return {
      data: "",
    };
  },
  watch: {
    value: {
      handler() {
        if (this.valueType === "object" || this.valueType === "array") {
          this.data = JSON.stringify(this.value);
        } else {
          this.data = this.value;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    dataChange() {
      if (this.valueType === "default") {
        this.$emit("update:value", this.data);
      } else if (this.valueType === "pixel") {
        // 像素类型
        this.$emit("update:value", this.data);
      } else if (this.valueType === "object" || this.valueType === "array") {
        // 对象类型
        this.$emit("update:value", JSON.parse(this.data));
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
