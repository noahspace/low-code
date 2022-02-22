// 区域选择组件
<template>
  <div class="areaSelect-wrap">
    <el-select
      v-model="provinceValue"
      placeholder="省"
      @change="provinceChange"
      :style="{ width: width }"
    >
      <el-option
        v-for="item in provinceOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-select
      v-model="cityValue"
      placeholder="市"
      @change="cityChange"
      :style="{ width: width }"
    >
      <el-option
        v-for="item in cityOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-select
      v-model="countryValue"
      placeholder="区"
      @change="countryChange"
      :style="{ width: width }"
    >
      <el-option
        v-for="item in countryOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <p></p>
    <!--    <el-button @click="btnClick">提交</el-button>-->
  </div>
</template>

<script>
import area from "./areaJs";
export default {
  name: "areaSelect",
  components: {},
  filters: {},
  mixins: [],
  props: {
    provinceProp: {
      type: String,
      default: "",
    },
    cityProp: {
      type: String,
      default: "",
    },
    countryProp: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "10%",
    },
  },
  data() {
    return {
      provinceValue: "",
      cityValue: "",
      countryValue: "",
      provinceOptions: [],
      cityOptions: [],
      countryOptions: [],
      areaData: null,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.handleArea();
    let that = this;
    this.$nextTick(function () {
      setTimeout(() => {
        that.init();
      }, 1000);
    });
  },
  methods: {
    init() {
      if (this.provinceProp) {
        this.provinceValue = this.provinceProp;
        //this.provinceChange();
      }
      if (this.cityProp) {
        this.cityValue = this.cityProp;
        // this.cityChange();
      }
      if (this.countryProp) {
        this.countryValue = this.countryProp;
        //this.countryChange();
      }
    },
    handleArea() {
      this.provinceOptions = [];
      this.provinceValue = "";
      for (const key in area["86"]) {
        this.provinceOptions.push({
          value: key,
          label: area["86"][key],
        });
      }
    },
    resetCityAndCountryData() {
      this.cityValue = "";
      this.countryValue = "";
      this.cityOptions = [];
      this.countryOptions = [];
    },
    resetCountryData() {
      this.countryValue = "";
      this.countryOptions = [];
    },
    provinceChange() {
      this.resetCityAndCountryData();
      for (const key in area[this.provinceValue]) {
        this.cityOptions.push({
          value: key,
          label: area[this.provinceValue][key],
        });
      }
      this.chooseData();
    },
    cityChange() {
      this.resetCountryData();
      for (const key in area[this.cityValue]) {
        this.countryOptions.push({
          value: key,
          label: area[this.cityValue][key],
        });
      }
      this.chooseData();
    },
    countryChange() {
      this.chooseData();
    },
    chooseData() {
      // console.log(this.provinceValue, this.cityValue, this.countryValue)
      // console.log(area['86'][this.provinceValue], area[this.provinceValue][this.cityValue], area[this.cityValue][this.countryValue])
      let data = null;
      if (this.countryValue) {
        data = {
          province: {
            code: this.provinceValue,
            name: area["86"][this.provinceValue],
          },
          city: {
            code: this.cityValue,
            name: area[this.provinceValue][this.cityValue],
          },
          country: {
            code: this.countryValue,
            name: area[this.cityValue][this.countryValue],
          },
        };
      } else if (this.cityValue) {
        data = {
          province: {
            code: this.provinceValue,
            name: area["86"][this.provinceValue],
          },
          city: {
            code: this.cityValue,
            name: area[this.provinceValue][this.cityValue],
          },
        };
      } else if (this.provinceValue) {
        data = {
          province: {
            code: this.provinceValue,
            name: area["86"][this.provinceValue],
          },
        };
      } else {
        data = null;
      }
      console.log(data);
      this.areaData = data;
      this.$emit("serArea", data);
    },
  },
};
</script>
<style lang="scss" scoped></style>
