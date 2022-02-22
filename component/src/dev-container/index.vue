<template>
  <div class="dev-container">
    <ul class="dev-component-list">
      <li
        @click="activeComponentNameChange(item.name)"
        v-for="item in components"
        :key="item.name"
        :class="{ active: item.name === activeComponentName }"
      >
        {{ item.title }}
      </li>
    </ul>
    <div class="dev-main">
      <component
        class="component"
        :is="activeComponentName"
        :data="currentActive.component"
      ></component>
    </div>
    <div class="dev-option">
      <el-tabs v-model="activeOption">
        <el-tab-pane label="基础属性" name="1">
          <component :is="baseOptionComponentName" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "",
      activeComponentName: "",
      components: [],
      // 页面配置
      config: {
        // 组件
        components: [],
        // 变量
        variables: [],
      },
      // 当前激活组件
      currentActive: {
        component: 111,
      },
      activeOption: "1",
    };
  },
  provide() {
    return {
      // 页面配置
      config: this.config,
      // 当前激活
      currentActive: this.currentActive,
    };
  },
  created() {
    Object.keys(this.$configLibrary).forEach((key) => {
      this.components.push({
        title: this.$configLibrary[key].options.title,
        name: key,
      });
    });
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
  methods: {
    activeComponentNameChange(val) {
      this.currentActive.component = {
        name: val,
        ...this.$configLibrary[val],
      };
      this.activeComponentName = val;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
