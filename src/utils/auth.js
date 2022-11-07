import Vue from "vue";
import VueCookies from "vue-cookies";
import { tokenKey, refreshTokenKey } from "@/constants/common";
Vue.use(VueCookies);

export function getToken() {
  return Vue.$cookies.get(tokenKey);
}

export function setToken(token) {
  return Vue.$cookies.set(tokenKey, token);
}

export function removeToken() {
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
