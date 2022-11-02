<template>
  <div class="cs-container--type-b pm-lgn__content">
    <div class="cs-container__inner">
      <div class="cs-container__main">
        <div data-cstabs="container" class="pm-lgn-panes">
          <div
            id="js-signin"
            data-cstabs="pane"
            class="pm-lgn-panes__item is-active"
          >
            <div class="pm-lgn-sns">
              <ul class="pm-lgn-sns__list">
                <li class="pm-lgn-sns__link">
                  <a
                    href="/auth/social-login/type/twitter"
                    class="pm-lgn-sns__link-tw"
                    ><span>Twitter アカウントを使用</span></a
                  >
                </li>
                <li class="pm-lgn-sns__link">
                  <a
                    href="/auth/social-login/type/facebook"
                    class="pm-lgn-sns__link-fb"
                    ><span>Facebook アカウントを使用</span></a
                  >
                </li>
                <li class="pm-lgn-sns__link">
                  <a
                    href="/auth/social-login/type/instagram"
                    class="pm-lgn-sns__link-ig"
                    ><span>Instagram アカウントを使用</span></a
                  >
                </li>
                <li class="pm-lgn-sns__link">
                  <a
                    href="/auth/social-login/type/line"
                    class="pm-lgn-sns__link-line"
                    ><span>LINE アカウントを使用</span></a
                  >
                </li>
              </ul>
            </div>
            <div class="pm-lgn-form">
              <div class="pm-lgn-form__heading">
                <span>または</span>メールアドレスでログインする
              </div>
              <form action="/auth/do-login" method="post">
                <input id="redir" type="hidden" name="redir" value="" />
                <input
                  id="target_form_id"
                  type="hidden"
                  name="target_form_id"
                  value=""
                />
              </form>
              <div class="pm-lgn-form__label">
                メールアドレス
                <div class="pm-lgn-form__field">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value=""
                    class="cs-field-a cs-field--w-100p"
                  />
                </div>
                <div class="pm-lgn-form__label">パスワード</div>
                <div class="pm-lgn-form__field">
                  <input
                    id="passwd"
                    type="password"
                    name="passwd"
                    value=""
                    class="cs-field-a cs-field--w-100p"
                  />
                </div>
                <div class="pm-lgn-form__remember">
                  <label>
                    <input
                      id="is_remember-1"
                      type="checkbox"
                      name="is_remember"
                      value=""
                      class="left20"
                    />&nbsp;次回から自動ログイン
                  </label>
                </div>
                <div>
                  <button class="cs-button-a--1-l cs-button--w-100p">
                    ログイン
                  </button>
                </div>
              </div>
              <div class="pm-lgn-form__forgot">
                <router-link :to="{ name: 'password-reminder' }"
                  >パスワードを忘れた場合</router-link
                >
              </div>
              <div class="u-mt-30 u-mb-60">
                <router-link
                  :to="{ name: 'register' }"
                  class="cs-button-b--1-l cs-button--w-100p"
                  >新規会員登録</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style></style>
