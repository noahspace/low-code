<template>
  <div
    class="workbench-main"
    @dragover.prevent
    @drop.stop="handleDrop"
    @click="cancelComponentActive"
    :style="{
      transform: `scale(${workbenchslider / 100}, ${workbenchslider / 100})`,
    }"
  >
    <DevRenderer
      v-for="component in config.components"
      :key="component.id"
      :current-data="component"
      :parent-data="config.components"
    ></DevRenderer>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import DevRenderer from "./components/DevRenderer"; // 开发渲染器
export default {
  components: { DevRenderer },
  props: ["workbenchslider"],
  inject: ["config", "currentActive"],
  methods: {
    // 拖拽到画布成功
    handleDrop(event) {
      try {
        const dragData = JSON.parse(event.dataTransfer.getData("dragData"));
        if (dragData.type === "add") {
          this.config.components.push({
            id: nanoid(),
            name: dragData.name,
            children: [],
            slot: "default",
            show: true,
            ...JSON.parse(JSON.stringify(this.$configLibrary[dragData.name])),
          });
        } else if (dragData.type === "move") {
          // 删除
          try {
            const traversal = (obj) => {
              obj.forEach((item, index) => {
                if (item.id === dragData.data.id) {
                  obj.splice(index, 1);
                  throw Error;
                }
                traversal(item.children);
              });
            };
            traversal(this.config.components);
          } catch (error) {
            //
          }
          // 添加
          this.config.components.push({ slot: "default", ...dragData.data });
        } else if (dragData.type === "addIcon") {
          const WIconConfig = JSON.parse(
            JSON.stringify(this.$configLibrary["WIcon"])
          );
          WIconConfig.attribs.class = dragData.class;
          this.config.components.push({
            id: nanoid(),
            name: "WIcon",
            children: [],
            slot: "default",
            show: true,
            ...WIconConfig,
          });
        } else if (dragData.type === "addImage") {
          const WIconConfig = JSON.parse(
            JSON.stringify(this.$configLibrary["WImage"])
          );
          WIconConfig.attribs.src = dragData.src;
          this.config.components.push({
            id: nanoid(),
            name: "WImage",
            children: [],
            slot: "default",
            show: true,
            ...WIconConfig,
          });
        } else if (dragData.type === "addConfig") {
          this.config.components.push(dragData.config);
        }
      } catch (error) {
        console.error("数据异常", error);
      }
    },
    // 取消激活
    cancelComponentActive() {
      this.currentActive.component = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.workbench-main {
  transform-origin: top left;
  width: 100%;
  height: 100%;
}
</style>
