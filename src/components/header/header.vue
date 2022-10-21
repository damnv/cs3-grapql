<template>
  <header id="js-cs-header" class="cs-header-2">
    <div class="cs-header-2-navbar">
      <div class="cs-header-2-navbar__inner">
        <router-link
          :to="{ name: 'home' }"
          class="cs-header-2-navbar__brand-logo"
          >みんなの眠ラボ | 西川ふとん</router-link
        >
        <div v-if="$auth.isAuthenticated">
          <div class="cs-header-2-navbar__nav d-flex">
            <router-link :to="{ name: 'user-home' }">
              <v-avatar size="36">
                <img
                  v-if="$auth.user.picture"
                  alt="Avatar"
                  :src="`${$auth.user.picture}`"
                />
              </v-avatar>
            </router-link>
            <router-link :to="{ name: 'user-home' }"
              ><span class="ml-3">{{ $auth.user.name }}</span></router-link
            >
          </div>
        </div>
        <div class="cs-header-2-navbar__nav" v-else>
          <a
            @click="signup"
            class="cs-header-2-navbar__button-login mr-2 primary--text"
            >新規会員登録</a
          >
          <a
            @click="login"
            class="cs-header-2-navbar__button-login primary--text"
            >ログイン</a
          >
        </div>
        <div
          data-header-menu="trigger"
          data-target="#js-header-nav"
          class="cs-header-2-navbar__button-menu"
        >
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  methods: {
    signup() {
      this.$auth.loginWithRedirect({
        screen_hint: "signup",
      });
    },
    login() {
      this.$auth.loginWithRedirect({
        redirect_uri: "http://localhost:8080/callback",
      });
    },
    logout() {
      this.$auth.logout();
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style lang="scss" scoped>
.cs-header-2-navbar__nav {
  position: relative;
  top: -22px;
}
</style>
