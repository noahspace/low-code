<template>
  <div>
    <div
      :style="{ backgroundImage: data }"
      class="elx-image"
      v-bind="$attrs"
      v-on="$listeners"
      @click="openBackgroundImageResource"
    >
      <i
        v-if="data !== 'none'"
        class="el-icon-close close"
        @click.stop="remove"
      ></i>
    </div>
    <dialog-wrapper ref="dialogWrapperRef">
      <template slot-scope="{ success }">
        <ImageResources @success="success" />
      </template>
    </dialog-wrapper>
  </div>
</template>

<script>
import ImageResources from "./components/ImageResources";
export default {
  components: { ImageResources },
  props: ["value"],
  data() {
    return {
      data: this.value,
    };
  },
  watch: {
    value: {
      handler() {
        this.data = this.value;
      },
      deep: true,
    },
  },
  methods: {
    remove() {
      this.$emit("update:value", `none`);
    },
    // 打开背景图片资源
    openBackgroundImageResource() {
      this.$refs["dialogWrapperRef"].show(
        { title: "资源", width: "1200px" },
        {
          success: (url) => {
            this.$emit("update:value", `url("${url}")`);
            this.$refs["dialogWrapperRef"].close();
          },
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.elx-image {
  width: 100px;
  height: 80px;
  background-color: #fff;
  border-radius: 6px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
  position: relative;
  overflow: hidden;
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color 0.3s ease-out;
  }
  &:hover {
    &::after {
      background-color: rgba(0, 0, 0, 0.2);
    }
    .close {
      display: block;
    }
  }
  .close {
    position: absolute;
    font-size: 20px;
    right: 6px;
    top: 6px;
    display: none;
    color: #74b1ff;
    z-index: 10;
    &:hover {
      color: #559eff;
    }
  }
}
</style>
