<template>
  <component class="prod-renderer" :is="currentData.name" :data="currentData">
    <ProdRenderer
      v-for="component in currentData.children"
      :key="component.id"
      :current-data="component"
      :parent-data="currentData.children"
    ></ProdRenderer>
  </component>
</template>

<script>
export default {
  name: "ProdRenderer",
  props: ["currentData"],
};
</script>

<style lang="scss" scoped></style>
