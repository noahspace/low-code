<template>
  <el-tabs
    class="w-button"
    v-model="activeName"
    @tab-click="handleClick"
    v-bind="data.attribs"
    v-on="events"
  >
    <el-tab-pane
      v-for="item in tabs"
      :key="item.name"
      :label="item.label"
      :name="item.name"
    >
      <slot :name="item.name">
        <div class="empty">拖拽至此{{ item.name }}</div>
      </slot>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import componentMixin from "../../../componentMixin";
export default {
  mixins: [componentMixin],
  data() {
    return {
      activeName: this.data.datas.find((obj) => obj.attribs === "activeName")
        .defaultValue,
      tabs: this.data.datas.find((obj) => obj.attribs === "tabs").defaultValue,
    };
  },
  methods: {
    handleClick(data) {
      this.data.slotName = data.name;
    },
  },
};
</script>

<style lang="scss" scoped></style>
