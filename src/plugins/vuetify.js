import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import CheckedGreenIcon from "@/components/Icons/CheckedGreenIcon";
Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: { customProperties: true },
    themes: {
      light: {
        primary: "#0D97FF",
        secondary: "#2AD1FF",
        success: "#00BD71",
        success2: "#D9F3E4",
        warning: "#FF910F",
        error: "#FF6A56",
        error2: "#FDE9E8",
        black: "#000000",
        white: "#FFFFFF",
        pink: "#FF95C3",
        navy: "#003AB8",
        grayLighten2: "#EAEAEF",
        grayLighten1: "#B8B8BC",
        grayDarken1: "#9A9A9E",
        grayDarken2: "#808084",
        grayDarken3: "#565659",
        grayDarken4: "#bbbbbb",
        grayDarken5: "#F7F8F9",
        grayDarken6: "#d2d2d6",
        grayDarken7: "#767676",
        darken1: "#2D3540",
        darken2: "#26262A",
      },
    },
  },
  icons: {
    values: {
      checkedGreenIcon: {
        component: CheckedGreenIcon,
      },
    },
  },
});
