<template>
  <div class="pm-lgn">
    <div class="pm-lgn__header cs-container--type-c">
      <div class="cs-container__inner">
        <div class="cs-container__main">
          <img src="http://dummyimage.com/1000x200/333/666" width="100%" />
          <ul data-cstabs="tablist" class="pm-lgn-tabs">
            <li class="pm-lgn-tabs__item">
              <a
                @click.prevent="goTo('login')"
                data-cstabs="tab"
                class="pm-lgn-tabs__item-link"
                >ログイン</a
              >
            </li>
            <li class="pm-lgn-tabs__item">
              <a
                @click.prevent="goTo('register')"
                data-cstabs="tab"
                class="pm-lgn-tabs__item-link is-active"
                >会員登録</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="pm-lgn__content cs-container--type-b">
      <div class="cs-container__inner">
        <div class="cs-container__main">
          <div data-cstabs="container" class="pm-lgn-panes">
            <div data-cstabs="pane" id="js-signin" class="pm-lgn-panes__item">
              <div class="pm-lgn-form">
                <form>
                  <div class="pm-lgn-form__label">メール</div>
                  <div class="pm-lgn-form__field">
                    <input type="email" class="cs-field-a cs-field--w-100p" />
                  </div>
                  <div class="pm-lgn-form__label">パスワード</div>
                  <div class="pm-lgn-form__field">
                    <input
                      type="password"
                      class="cs-field-a cs-field--w-100p"
                    />
                  </div>
                  <div class="pm-lgn-form__remember">
                    <label
                      ><input type="checkbox" /> パスワードを記憶させる</label
                    >
                  </div>
                  <div>
                    <button class="cs-button-a--1-l cs-button--w-100p">
                      ログイン
                    </button>
                  </div>
                </form>
                <div class="pm-lgn-form__forgot">
                  <a href="#">パスワードを忘れた場合</a>
                </div>
              </div>
              <div class="pm-lgn-sns">
                <div class="pm-lgn-sns__heading">
                  <span>または</span>SNSアカウントでログインする
                </div>
                <ul class="pm-lgn-sns__list">
                  <li class="pm-lgn-sns__link">
                    <a href="#" class="pm-lgn-sns__link-tw"
                      ><span>Twitter アカウントを使用</span></a
                    >
                  </li>
                  <li class="pm-lgn-sns__link">
                    <a href="#" class="pm-lgn-sns__link-fb"
                      ><span>Facebook アカウントを使用</span></a
                    >
                  </li>
                  <li class="pm-lgn-sns__link">
                    <a href="#" class="pm-lgn-sns__link-line"
                      ><span>LINE アカウントを使用</span></a
                    >
                  </li>
                </ul>
              </div>
            </div>
            <div
              data-cstabs="pane"
              id="js-signup"
              class="pm-lgn-panes__item is-active"
            >
              <div class="pm-lgn-form">
                <form>
                  <div class="pm-lgn-form__label">
                    メール <span>半角英数字</span>
                  </div>
                  <div class="pm-lgn-form__field">
                    <input type="email" class="cs-field-a cs-field--w-100p" />
                  </div>
                  <div class="pm-lgn-form__label">
                    パスワード <span>半角英数字6文字以上</span>
                  </div>
                  <div class="pm-lgn-form__field">
                    <input
                      type="password"
                      class="cs-field-a cs-field--w-100p"
                    />
                  </div>
                  <div class="pm-lgn-form__label">
                    ユーザ名 <span>半角または全角で15文字以内</span>
                  </div>
                  <div class="pm-lgn-form__field">
                    <input type="text" class="cs-field-a cs-field--w-100p" />
                  </div>
                  <div class="pm-lgn-form__remember">
                    <label
                      ><input type="checkbox" /> メールマガジンを受け取る</label
                    >
                  </div>
                  <div class="pm-lgn-form__agree">
                    <a href="#">会員規約</a>と<a href="#"
                      >プライバシーポリシー</a
                    >に同意の上、登録してください。
                  </div>
                  <div>
                    <button class="cs-button-a--1-l cs-button--w-100p">
                      確認
                    </button>
                  </div>
                </form>
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
  name: "Register",
  data() {
    return {};
  },
  methods: {
    goTo(name) {
      this.$router.push({ name });
    },
  },
};
</script>

<style></style>
