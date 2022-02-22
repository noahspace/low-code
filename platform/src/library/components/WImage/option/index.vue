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
        <div class="header">
          <span>基本样式属性</span>
        </div>
        <div class="body">
          <el-form-item label="宽度">
            <el-input
              v-model="style.width"
              @change="inputAutoUnitChange('style', 'width')"
            ></el-input>
          </el-form-item>
          <el-form-item label="高度">
            <el-input
              v-model="style.height"
              @change="inputAutoUnitChange('style', 'height')"
            ></el-input>
          </el-form-item>
          <el-form-item label="外边距">
            <el-input
              v-model="style.margin"
              @change="inputAutoUnitChange('style', 'margin')"
            ></el-input>
          </el-form-item>
          <el-form-item label="自适应">
            <el-select
              v-model="style.objectFit"
              @change="inputAutoUnitChange('style', 'objectFit')"
            >
              <el-option label="拉伸" value="fill"></el-option>
              <el-option
                label="保持原有尺寸比例，缩放"
                value="contain"
              ></el-option>
              <el-option
                label="保持原有尺寸比例，剪切"
                value="cover"
              ></el-option>
              <el-option
                label="保留原有元素内容的长度和宽度"
                value="none"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  inject: ["config", "currentActive"],
  data() {
    return {
      style: Object.assign({}, this.currentActive.component.attribs.style),
    };
  },
  watch: {
    "currentActive.component.attribs.style": {
      handler(newVal) {
        this.style = Object.assign({}, newVal);
      },
    },
  },
  methods: {
    inputBaseChange(type, attribs) {
      this.currentActive.component.attribs[type][attribs] = this[type][attribs];
    },
    inputAutoUnitChange(type, attribs) {
      this[type][attribs] = this[type][attribs] ? this[type][attribs] : "0";
      if (!isNaN(this[type][attribs])) {
        this[type][attribs] = this[type][attribs] + "px";
      }
      this.currentActive.component.attribs[type][attribs] = this[type][attribs];
    },
  },
};
</script>

<style lang="scss" scoped></style>
