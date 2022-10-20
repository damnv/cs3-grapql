<template>
  <div class="pm-lgn__content cs-container--type-b">
    <div class="cs-container__inner">
      <div class="cs-container__main">
        <div data-cstabs="container" class="pm-lgn-panes">
          <div
            data-cstabs="pane"
            id="js-signin"
            class="pm-lgn-panes__item is-active"
          >
            <div class="pm-lgn-message">
              <div class="pm-lgn-message__content">
                会員登録されているメールアドレスを入力後、「送信」ボタンをクリックしてください。<br />
                <br />
                ご登録のメールアドレス宛に、「パスワードの再登録」メールをお送りします。メールに記載のURLをクリックしていただき、パスワードを再登録してください。
              </div>
            </div>
            <div class="pm-lgn-form">
              <form>
                <div class="pm-lgn-form__label">メール</div>
                <div class="pm-lgn-form__field">
                  <input type="email" class="cs-field-a cs-field--w-100p" />
                </div>
                <div>
                  <button class="cs-button-a--1-l cs-button--w-100p">
                    送信
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "passwordReminder",
};
</script>

<style></style>
