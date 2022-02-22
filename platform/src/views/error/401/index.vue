<template>
  <div class="error-container">
    <img :src="require('./images/401.gif')" alt="401" />
  </div>
</template>

<script>
export default {
  name: "Page401",
  data() {
    return {
      errGif: "",
    };
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: "/dashboard" });
      } else {
        this.$router.go(-1);
      }
    },
  },
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
    width: 300px;
  }
}
</style>
