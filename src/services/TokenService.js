export default class TokenService {
  static getRefreshToken() {
    return window.localStorage.getItem("refreshToken");
  }

  static getAccessToken() {
    return window.localStorage.getItem("accessToken");
  }

  static setTokens(tokens) {
    window.localStorage.setItem("accessToken", tokens);
    // window.localStorage.setItem("refreshToken", tokens.refresh.token);
  }

  static getUserData() {
    return JSON.parse(localStorage.getItem("accessToken"));
  }

  static setUserData(user) {
    window.localStorage.setItem("accessToken", JSON.stringify(user));
  }

  static removeUserData() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("accessToken");
  }
}
