<template>
  <div class="w-container" v-bind="data.attribs" v-on="events">
    <slot :name="data.slotName"></slot>
  </div>
</template>

<script>
import componentMixin from "../../../componentMixin";
export default {
  mixins: [componentMixin],
};
</script>

<style lang="scss" scoped>
.w-container {
  width: 100px;
  height: 100px;
  background: #fff;
  font-size: 0;
}
</style>
