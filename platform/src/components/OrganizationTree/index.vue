<template>
  <div class="organization-tree">
    <el-tree :data="data" :props="defaultProps" highlight-current></el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          label: "本部研发中心",
          children: [
            {
              label: "系统方案",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
            {
              label: "产品部门",
            },
          ],
        },
        {
          label: "分公司",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.organization-tree {
  ::v-deep.el-tree-node__content {
    height: 30px;
  }
}
</style>
