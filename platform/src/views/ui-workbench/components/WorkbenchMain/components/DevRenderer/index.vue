<template>
  <component
    ref="componentRef"
    v-if="currentData.show"
    class="dev-renderer"
    :class="{ active: currentActive.component === currentData }"
    :is="currentData.name"
    :data="currentData"
    draggable
    @click.native.stop="handleActiveComponentClick"
    @dragstart.native.stop="handleDragStart($event)"
    @drop.native.stop="handleDrop"
    @contextmenu.native.prevent.stop="handleContextmenu($event, currentData)"
    @dragover.native.stop="handleDragover($event, currentData)"
  >
    <DevRenderer
      v-for="component in currentData.children"
      :slot="component.slot"
      :key="component.id"
      :current-data="component"
      :parent-data="currentData.children"
    ></DevRenderer>
  </component>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  name: "DevRenderer",
  props: ["currentData", "parentData"],
  inject: ["config", "currentActive"],
  created() {
    if (this.currentData.show == undefined) {
      this.currentData.show = true;
    }
  },
  mounted() {
    this.$refs["componentRef"].$el.addEventListener("mouseover", function (e) {
      e.stopPropagation();
      this.classList.add("hover");
    });
    this.$refs["componentRef"].$el.addEventListener("mouseout", function (e) {
      e.stopPropagation();
      this.classList.remove("hover");
    });
  },
  methods: {
    // 激活组件
    handleActiveComponentClick() {
      this.currentActive.component = this.currentData;
    },
    // 处理开始拖拽事件
    handleDragStart(event) {
      event.dataTransfer.setData(
        "dragData",
        JSON.stringify({
          type: "move",
          data: this.currentData,
        })
      );
    },
    // 拖拽过程中
    handleDragover(event, data) {
      if (data.slotName) {
        event.preventDefault();
      }
    },
    // 拖拽到画布成功
    handleDrop(event) {
      try {
        const dragData = JSON.parse(event.dataTransfer.getData("dragData"));
        if (dragData.type === "add") {
          this.currentData.children.push({
            id: nanoid(),
            name: dragData.name,
            children: [],
            slot: this.currentData.slotName,
            show: true,
            ...JSON.parse(JSON.stringify(this.$configLibrary[dragData.name])),
          });
        } else if (dragData.type === "move") {
          if (dragData.data.id !== this.currentData.id) {
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
            this.currentData.children.push({
              slot: this.currentData.slotName,
              ...dragData.data,
            });
          }
        } else if (dragData.type === "addIcon") {
          const WIconConfig = JSON.parse(
            JSON.stringify(this.$configLibrary["WIcon"])
          );
          WIconConfig.attribs.class = dragData.class;
          this.currentData.children.push({
            id: nanoid(),
            name: "WIcon",
            slot: this.currentData.slotName,
            children: [],
            show: true,
            ...WIconConfig,
          });
        } else if (dragData.type === "addImage") {
          const WIconConfig = JSON.parse(
            JSON.stringify(this.$configLibrary["WImage"])
          );
          WIconConfig.attribs.src = dragData.src;
          this.currentData.children.push({
            id: nanoid(),
            name: "WImage",
            slot: this.currentData.slotName,
            children: [],
            show: true,
            ...WIconConfig,
          });
        } else if (dragData.type === "addConfig") {
          this.currentData.children.push(dragData.config);
        }
      } catch (error) {
        console.error("数据异常", error);
      }
    },
    // 组件鼠标右键
    handleContextmenu(event, data) {
      // 激活当前组件
      this.currentActive.component = data;
      // 打开菜单
      this.$contextmenu({
        items: [
          {
            label: "与上一个组件交换位置",
            icon: "el-icon-top",
            disabled: false,
            onClick: () => {
              const index = this.parentData.findIndex(
                (obj) => obj.id === data.id
              );
              if (this.parentData[index - 1]) {
                this.parentData[index] = this.parentData.splice(
                  index - 1,
                  1,
                  this.parentData[index]
                )[0];
              }
            },
          },
          {
            label: "与下一个组件交换位置",
            icon: "el-icon-bottom",
            disabled: false,
            divided: true,
            onClick: () => {
              const index = this.parentData.findIndex(
                (obj) => obj.id === data.id
              );
              if (this.parentData[index + 1]) {
                this.parentData[index] = this.parentData.splice(
                  index + 1,
                  1,
                  this.parentData[index]
                )[0];
              }
            },
          },
          {
            label: "删除当前组件",
            icon: "el-icon-delete",
            onClick: () => {
              this.parentData.splice(
                this.parentData.findIndex((obj) => obj.id === data.id),
                1
              );
              this.currentActive.component = null;
            },
          },
        ],
        event,
        zIndex: 10000,
        minWidth: 230,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
