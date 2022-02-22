<template>
  <div class="error-container">
    <img :src="require('./images/404.png')" alt="404" />
  </div>
</template>

<script>
export default {
  methods: {},
};
</script>

<style lang="scss" scoped>
.error-container {
  height: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 600px;
  }
}
</style>
