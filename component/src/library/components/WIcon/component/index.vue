<template>
  <i class="w-icon" v-bind="data.attribs" v-on="events"></i>
</template>

<script>
import componentMixin from "../../../componentMixin";
export default {
  mixins: [componentMixin],
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
