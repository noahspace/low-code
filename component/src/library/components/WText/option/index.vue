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
          <el-form-item label="容器宽度">
            <elx-input
              valueType="pixel"
              :value.sync="currentActive.component.attribs.style.width"
            ></elx-input>
          </el-form-item>
          <el-form-item label="容器高度">
            <elx-input
              valueType="pixel"
              :value.sync="currentActive.component.attribs.style.height"
            ></elx-input>
          </el-form-item>
          <el-form-item label="字体">
            <elx-select
              :value.sync="currentActive.component.attribs.style.fontFamily"
            >
              <el-option lable="微软雅黑" value="微软雅黑"></el-option>
              <el-option lable="黑体" value="黑体"></el-option>
              <el-option lable="仿宋" value="仿宋"></el-option>
              <el-option lable="宋体" value="宋体"></el-option>
              <el-option lable="新宋体" value="新宋体"></el-option>
              <el-option lable="楷体" value="楷体"></el-option>
            </elx-select>
          </el-form-item>
          <el-form-item label="字体大小">
            <elx-input
              valueType="pixel"
              :value.sync="currentActive.component.attribs.style.fontSize"
            ></elx-input>
          </el-form-item>
          <el-form-item label="字体颜色">
            <elx-color-picker
              :value.sync="currentActive.component.attribs.style.color"
            ></elx-color-picker>
          </el-form-item>
          <el-form-item label="字体加粗">
            <elx-select
              :value.sync="currentActive.component.attribs.style.fontWeight"
            >
              <el-option label="加粗" value="bold"></el-option>
              <el-option label="默认" value="normal"></el-option>
            </elx-select>
          </el-form-item>
          <el-form-item label="行高">
            <elx-input
              valueType="pixel"
              :value.sync="currentActive.component.attribs.style.lineHeight"
            ></elx-input>
          </el-form-item>
          <el-form-item label="内容位置">
            <elx-select
              :value.sync="currentActive.component.attribs.style.textAlign"
            >
              <el-option label="水平居左" value="left"></el-option>
              <el-option label="水平居中" value="center"></el-option>
              <el-option label="水平居右" value="right"></el-option>
            </elx-select>
          </el-form-item>
          <el-form-item label="文字转变">
            <elx-select
              :value.sync="currentActive.component.attribs.style.textTransform"
            >
              <el-option label="不转变" value="none"></el-option>
              <el-option
                label="每个单词以大写字母开头"
                value="capitalize"
              ></el-option>
              <el-option label="全部大写" value="uppercase"></el-option>
              <el-option label="全部小写" value="lowercase"></el-option>
            </elx-select>
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
