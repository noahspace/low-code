export default {
  getToken() {
    return sessionStorage.getItem("token");
  },
  setToken(token) {
    sessionStorage.setItem("token", token);
  },
  getUserRole() {
    return sessionStorage.getItem("role");
  },
  setUserRole(role) {
    sessionStorage.setItem("role", role);
  },
  getUserInfo() {
    return JSON.parse(sessionStorage.getItem("userinfo"));
  },
  setUserInfo(userinfo) {
    sessionStorage.setItem("userinfo", JSON.stringify(userinfo));
  },
  clearAll() {
    sessionStorage.clear();
  },
};
