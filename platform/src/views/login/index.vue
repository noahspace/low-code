<template>
  <div>
    {{ a }}
    <elx-select :value.sync="a">
      <el-option value="2"></el-option>
      <el-option value="1111"></el-option>
    </elx-select>
  </div>
</template>

<script>
export default {
  data() {
    return { a: "1" };
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
