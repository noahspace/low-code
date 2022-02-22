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
            <elx-input
              :value.sync="currentActive.component.attribs.style.width"
            ></elx-input>
          </el-form-item>
          <el-form-item label="高度">
            <elx-input
              :value.sync="currentActive.component.attribs.style.height"
            ></elx-input>
          </el-form-item>
          <el-form-item label="内边距">
            <elx-input
              :value.sync="currentActive.component.attribs.style.padding"
            ></elx-input>
          </el-form-item>
          <el-form-item label="外边距">
            <elx-input
              :value.sync="currentActive.component.attribs.style.margin"
            ></elx-input>
          </el-form-item>
          <el-form-item label="背景颜色">
            <elx-color-picker
              :value.sync="
                currentActive.component.attribs.style.backgroundColor
              "
              show-alpha
            ></elx-color-picker>
          </el-form-item>
          <el-form-item label="背景图片">
            <elx-image
              :value.sync="
                currentActive.component.attribs.style.backgroundImage
              "
            ></elx-image>
          </el-form-item>
          <el-form-item label="背景大小">
            <elx-select
              :value.sync="currentActive.component.attribs.style.backgroundSize"
            >
              <el-option label="自动" value="auto"></el-option>
              <el-option label="剪切" value="cover"></el-option>
              <el-option label="缩放" value="contain"></el-option>
              <el-option label="充满" value="100% 100%"></el-option>
            </elx-select>
          </el-form-item>
          <el-form-item label="背景重复">
            <elx-select
              :value.sync="
                currentActive.component.attribs.style.backgroundRepeat
              "
            >
              <el-option label="不重复" value="no-repeat"></el-option>
              <el-option label="重复" value="repeat"></el-option>
              <el-option label="X 轴重复" value="repeat-x"></el-option>
              <el-option label="Y 轴重复" value="repeat-y"></el-option>
            </elx-select>
          </el-form-item>
          <el-form-item label="背景定位">
            <elx-select
              :value.sync="
                currentActive.component.attribs.style.backgroundPosition
              "
            >
              <el-option label="上左" value="left top"></el-option>
              <el-option label="中左" value="left center"></el-option>
              <el-option label="下左" value="left bottom"></el-option>
              <el-option label="下右" value="right top"></el-option>
              <el-option label="中右" value="right center"></el-option>
              <el-option label="下右" value="right bottom"></el-option>
              <el-option label="上中" value="center top"></el-option>
              <el-option label="中中" value="center center"></el-option>
              <el-option label="下中" value="center bottom"></el-option>
            </elx-select>
          </el-form-item>
          <el-form-item label="内容溢出">
            <elx-select
              :value.sync="currentActive.component.attribs.style.overflow"
            >
              <el-option value="visible" label="溢出显示"></el-option>
              <el-option value="hidden" label="溢出隐藏"></el-option>
              <el-option value="auto" label="溢出以滚动条展示"></el-option>
            </elx-select>
          </el-form-item>
        </div>
      </div>
      <div class="card">
        <div class="header">
          <span>边框</span>
        </div>
        <div class="body">
          <el-form-item label="边框宽度">
            <elx-input
              :value.sync="currentActive.component.attribs.style.borderWidth"
            ></elx-input>
          </el-form-item>
          <el-form-item label="边框类型">
            <elx-select
              :value.sync="currentActive.component.attribs.style.borderStyle"
            >
              <el-option value="none" label="无"></el-option>
              <el-option value="dotted" label="点状"></el-option>
              <el-option value="dashed" label="虚线"></el-option>
              <el-option value="solid" label="实线"></el-option>
              <el-option value="double" label="双实线"></el-option>
            </elx-select>
          </el-form-item>
          <el-form-item label="边框颜色">
            <elx-color-picker
              :value.sync="currentActive.component.attribs.style.borderColor"
            ></elx-color-picker>
          </el-form-item>
          <el-form-item label="边框圆角">
            <elx-input
              :value.sync="currentActive.component.attribs.style.borderRadius"
            ></elx-input>
          </el-form-item>
        </div>
      </div>
      <div class="card">
        <div class="header">
          <span>容器属性</span>
        </div>
        <div class="body">
          <el-form-item label="布局类型">
            <elx-select
              :value.sync="currentActive.component.attribs.style.display"
            >
              <el-option value="block" label="默认布局"></el-option>
              <el-option value="grid" label="网格布局"></el-option>
            </elx-select>
          </el-form-item>
          <el-form-item
            v-if="currentActive.component.attribs.style.display === 'grid'"
            label="列设置"
          >
            <elx-input
              :value.sync="
                currentActive.component.attribs.style.gridTemplateColumns
              "
            ></elx-input>
          </el-form-item>
          <el-form-item
            v-if="currentActive.component.attribs.style.display === 'grid'"
            label="行设置"
          >
            <elx-input
              :value.sync="
                currentActive.component.attribs.style.gridTemplateRows
              "
            ></elx-input>
          </el-form-item>
          <el-form-item
            v-if="currentActive.component.attribs.style.display === 'grid'"
            label="列间隔"
          >
            <elx-input
              :value.sync="currentActive.component.attribs.style.columnGap"
            ></elx-input>
          </el-form-item>
          <el-form-item
            v-if="currentActive.component.attribs.style.display === 'grid'"
            label="行间隔"
          >
            <elx-input
              :value.sync="currentActive.component.attribs.style.rowGap"
            ></elx-input>
          </el-form-item>
          <el-form-item
            v-if="currentActive.component.attribs.style.display === 'grid'"
            label="排列方式"
          >
            <elx-select
              :value.sync="currentActive.component.attribs.style.gridAutoFlow"
            >
              <el-option value="row" label="先行后列"></el-option>
              <el-option value="column" label="先列后行"></el-option>
              <el-option
                value="row dense"
                label="先行后列，紧密填满"
              ></el-option>
              <el-option
                value="column dense"
                label="先列后行，紧密填满"
              ></el-option>
            </elx-select>
          </el-form-item>
          <el-form-item
            v-if="currentActive.component.attribs.style.display === 'grid'"
            label="容器水平"
          >
            <elx-select
              :value.sync="currentActive.component.attribs.style.justifyContent"
            >
              <el-option value="stretch" label="拉伸"></el-option>
              <el-option value="start" label="对齐容器的起始边框"></el-option>
              <el-option value="end" label="对齐容器的结束边框"></el-option>
              <el-option value="center" label="容器内部居中"></el-option>
              <el-option value="space-between" label="两端分布"></el-option>
              <el-option value="space-around" label="均匀分布"></el-option>
              <el-option
                value="space-evenly"
                label="平均分布（间隔相等）"
              ></el-option>
            </elx-select>
          </el-form-item>
          <el-form-item
            v-if="currentActive.component.attribs.style.display === 'grid'"
            label="容器垂直"
          >
            <elx-select
              :value.sync="currentActive.component.attribs.style.alignContent"
            >
              <el-option value="stretch" label="拉伸"></el-option>
              <el-option value="start" label="对齐容器的起始边框"></el-option>
              <el-option value="end" label="对齐容器的结束边框"></el-option>
              <el-option value="center" label="容器内部居中"></el-option>
              <el-option value="space-between" label="两端分布"></el-option>
              <el-option value="space-around" label="均匀分布"></el-option>
              <el-option
                value="space-evenly"
                label="平均分布（间隔相等）"
              ></el-option>
            </elx-select>
          </el-form-item>
          <el-form-item
            v-if="currentActive.component.attribs.style.display === 'grid'"
            label="内容水平"
          >
            <elx-select
              :value.sync="currentActive.component.attribs.style.justifyItems"
            >
              <el-option value="stretch" label="拉伸"></el-option>
              <el-option value="start" label="对齐单元格起始边缘"></el-option>
              <el-option value="center" label="单元格内部居中"></el-option>
              <el-option value="end" label="对齐单元格结束边缘"></el-option>
            </elx-select>
          </el-form-item>
          <el-form-item
            v-if="currentActive.component.attribs.style.display === 'grid'"
            label="内容垂直"
          >
            <elx-select
              :value.sync="currentActive.component.attribs.style.alignItems"
            >
              <el-option value="stretch" label="拉伸"></el-option>
              <el-option value="start" label="对齐单元格起始边缘"></el-option>
              <el-option value="center" label="单元格内部居中"></el-option>
              <el-option value="end" label="对齐单元格结束边缘"></el-option>
            </elx-select>
          </el-form-item>
        </div>
      </div>
      <div class="card">
        <div class="header">
          <span>项目属性</span>
        </div>
        <div class="body">
          <el-form-item label="水平开始位置">
            <elx-input
              :value.sync="currentActive.component.attribs.style.gridRowStart"
            ></elx-input>
          </el-form-item>
          <el-form-item label="水平结束位置">
            <elx-input
              :value.sync="currentActive.component.attribs.style.gridRowEnd"
            ></elx-input>
          </el-form-item>
          <el-form-item label="垂直开始位置">
            <elx-input
              :value.sync="
                currentActive.component.attribs.style.gridColumnStart
              "
            ></elx-input>
          </el-form-item>
          <el-form-item label="垂直结束位置">
            <elx-input
              :value.sync="currentActive.component.attribs.style.gridColumnEnd"
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
