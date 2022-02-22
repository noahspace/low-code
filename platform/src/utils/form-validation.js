export default {
  // 手机号码验证
  phone: (rule, value, callback) => {
    setTimeout(() => {
      const patt = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else if (!patt.test(value)) {
        callback(new Error("请输入正确的手机号码"));
      } else {
        callback();
      }
    }, 1000);
  },
  // 身份证验证
  IDCard: (rule, value, callback) => {
    setTimeout(() => {
      const patt =
        /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      if (patt.test(value)) {
        callback(new Error("请输入正确的身份证号码"));
      } else {
        callback();
      }
    }, 1000);
  },
  // 判断是否为邮箱
  isEmail: (rule, value, callback) => {
    setTimeout(() => {
      const patt =
        /^[a-zA-Z0-9]+([._-]*[a-zA-Z0-9]*)*@[a-zA-Z0-9]+.[a-zA-Z0-9{2,5}$]/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      } else if (!patt.test(value)) {
        callback(new Error("请输入正确的邮箱"));
      } else {
        callback();
      }
    }, 1000);
  },
  // IP验证
  isIp: (rule, value, callback) => {
    setTimeout(() => {
      const patt =
        /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
      if (!value) {
        return callback(new Error("IP不能为空"));
      } else if (!patt.test(value)) {
        callback(new Error("请输入正确的IP格式"));
      } else {
        callback();
      }
    }, 1000);
  },
  // 端口号验证
  isPort: (rule, value, callback) => {
    setTimeout(() => {
      const patt =
        /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
      if (!value) {
        return callback(new Error("端口号不能为空"));
      } else if (!patt.test(value)) {
        callback(new Error("请输入正确的端口号"));
      } else {
        callback();
      }
    }, 1000);
  },
};
