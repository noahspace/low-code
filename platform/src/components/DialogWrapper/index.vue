<template>
  <el-dialog :visible.sync="visible" v-bind="attributes">
    <slot v-if="visible" v-bind="data" />
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      attributes: {},
      data: {},
    };
  },
  methods: {
    /**
     * 显示弹窗
     *
     * @param object attributes 属性
     * @param object data 数据
     */
    show(attributes = {}, data = {}) {
      this.attributes = attributes;
      this.data = { close: this.close, ...data };
      this.visible = true;
    },
    /**
     * 关闭弹窗
     */
    close() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
