import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import Vue from "vue";

const customRules = {
  phoneNumber: {
    message: "Must Be phone number",
    validate(value) {
      const regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
      if (value.match(regex)) return true;
    },
  },
};
// eslint-disable-next-line no-import-assign
for (const rule in Object.assign(rules, customRules)) {
  extend(rule, rules[rule]);
}

// Register it globally
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
