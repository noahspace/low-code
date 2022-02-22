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
        <div class="header">样式</div>
        <div class="body">
          <el-form-item label="线方向">
            <elx-select :value.sync="currentActive.component.attribs.direction">
              <el-option label="横向" value="top"></el-option>
              <el-option label="竖向" value="left"></el-option>
            </elx-select>
          </el-form-item>
          <el-form-item label="线类型">
            <elx-select :value.sync="currentActive.component.attribs.type">
              <el-option label="实线" value="solid"></el-option>
              <el-option label="点线" value="dotted"></el-option>
              <el-option label="虚线" value="dashed"></el-option>
            </elx-select>
          </el-form-item>
          <el-form-item label="线颜色">
            <elx-color-picker
              :value.sync="currentActive.component.attribs.color"
            ></elx-color-picker>
          </el-form-item>
          <el-form-item label="线宽度">
            <elx-input
              :value.sync="currentActive.component.attribs.width"
            ></elx-input>
          </el-form-item>
          <el-form-item label="线长度">
            <elx-input
              :value.sync="currentActive.component.attribs.length"
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
