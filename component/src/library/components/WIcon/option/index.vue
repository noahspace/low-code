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
          <el-form-item label="颜色">
            <el-color-picker
              v-model="style.color"
              show-alpha
              @change="inputBaseChange('style', 'color')"
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="字体大小">
            <el-input
              v-model="style.fontSize"
              @change="inputAutoUnitChange('style', 'fontSize')"
            ></el-input>
          </el-form-item>
          <el-form-item label="外边距">
            <el-input
              v-model="style.margin"
              @change="inputAutoUnitChange('style', 'margin')"
            ></el-input>
          </el-form-item>
          <el-form-item label="内边距">
            <el-input
              v-model="style.padding"
              @change="inputAutoUnitChange('style', 'padding')"
            ></el-input>
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
