import Vue from "vue";

import { convertDateTime } from "@/utils/helpers";

Vue.filter("convertDateTime", function (value) {
  return convertDateTime(value);
});
