<template>
  <div class="options-pane">
    <div @click="closeOptionsPane" class="close">
      <i class="ri-close-line"></i>
    </div>
    <el-tabs v-model="activeTabComponent">
      <el-tab-pane label="基础属性" name="1">
        <component :is="baseOptionComponentName" />
      </el-tab-pane>
      <el-tab-pane label="数据绑定" name="2">
        <DataOption></DataOption>
      </el-tab-pane>
      <el-tab-pane label="事件交互" name="3">
        <EventOption></EventOption>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DataOption from "./components/DataOption";
import EventOption from "./components/EventOption";
export default {
  components: { DataOption, EventOption },
  inject: ["config", "currentActive"],
  data() {
    return {
      activeTabComponent: "1",
    };
  },
  computed: {
    baseOptionComponentName() {
      if (this.currentActive.component.name) {
        return this.currentActive.component.name + "Option";
      } else {
        return "";
      }
    },
  },
  watch: {
    "currentActive.component.id": {
      handler() {
        this.activeTabComponent = "1";
      },
      deep: true,
    },
  },
  methods: {
    closeOptionsPane() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
