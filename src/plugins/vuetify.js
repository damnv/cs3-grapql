import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import LikeGray from "@/components/icons/LikeGray";
import LikeBlue from "@/components/icons/LikeBlue";
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
        gray700: "#565659",
        gray600: "#A0A0A0",
        gray500: "#808084",
        gray400: "#9A9A9E",
        gray300: "#B8B8BC",
        gray200: "#d2d2d6",
        gray100: "#EAEAEF",
        gray50: "#F7F8F9",
      },
    },
  },
  icons: {
    values: {
      likeGray: {
        component: LikeGray,
      },
      likeBlue: {
        component: LikeBlue,
      },
    },
  },
});
