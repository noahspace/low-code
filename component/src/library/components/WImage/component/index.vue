<template>
  <img class="w-image" v-bind="data.attribs" v-on="events" />
</template>

<script>
import componentMixin from "../../../componentMixin";
export default {
  mixins: [componentMixin],
};
</script>

<style lang="scss" scoped></style>
