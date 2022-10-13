import Vue from "vue";
import VueCookies from "vue-cookies";
import { tokenKey, refreshTokenKey, sessionKyash } from "@/constants/common";
Vue.use(VueCookies);

export function getToken() {
  return Vue.$cookies.get(tokenKey);
}

export function setToken(token) {
  localStorage.setItem(sessionKyash, true);
  return Vue.$cookies.set(tokenKey, token);
}

export function removeToken() {
  localStorage.removeItem(sessionKyash);
  return Vue.$cookies.remove(tokenKey);
}

export function getRefreshToken() {
  return Vue.$cookies.get(refreshTokenKey);
}

export function setRefreshToken(token) {
  return Vue.$cookies.set(refreshTokenKey, token);
}

export function removeRefreshToken() {
  return Vue.$cookies.remove(refreshTokenKey);
}
