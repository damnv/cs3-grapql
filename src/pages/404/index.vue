<template>
  <div class="pm-err">
    <div class="cs-container--type-b">
      <div class="cs-container__inner">
        <div class="cs-container__main">
          <div class="pm-err-body cs-pane">
            <h4 class="pm-err-title">
              アクセスしようとしたページが見つかりません。
            </h4>
            <p class="pm-err-lead">
              いつもパスコ・サポーターズ・クラブ「Pascoとおいしい時間」のウェブサイトをご利用いただきありがとうございます。<br />
              お探しのページは、リンクが無効になっているか、またはアドレス（URL）が間違っている可能性があります。<br />
              お手数おかけいたしますが、トップより再度お探しください。
            </p>
            <br />
            <router-link
              :to="{ name: 'home' }"
              class="cs-button-b--1-l cs-button--w-100p"
              >トップへ</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
};
</script>

<style></style>
