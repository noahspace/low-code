<template>
  <div class="projectCreat">
    <projectInfo></projectInfo>
  </div>
</template>

<script>
import projectInfo from "../components/projectInfo";

export default {
  data() {
    return {};
  },
  components: {
    projectInfo,
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.projectCreat {
  height: 100%;
  overflow: auto;
  scrollbar-gutter: stable;
}
</style>
