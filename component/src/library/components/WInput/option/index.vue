<template>
  <div class="option">
    <el-form label-width="90px" :model="currentActive.component">
      <div class="card">
        <div class="body">
          <el-form-item label="组件 ID">
            <el-input disabled v-model="currentActive.component.id"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="card">
        <div class="header">基本样式</div>
        <div class="body">
          <el-form-item label="宽度">
            <elx-input
              valueType="pixel"
              v-model="currentActive.component.attribs.style.width"
            ></elx-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  inject: ["config", "currentActive"],
};
</script>

<style lang="scss" scoped></style>
