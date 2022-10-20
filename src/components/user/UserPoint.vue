<template>
  <div class="cs-pane">
    <div class="cs-pane__inner--a">
      <div class="pm-usr-2-point">
        <div class="pm-usr-2-point__current-lank">
          あなたのランクは
          <div class="pm-usr-2__lank-label--a">ブロンズステージ</div>
          です。
        </div>
        <div class="pm-usr-2-point__header">
          <div class="pm-usr-2-point__header-title">ポイント</div>
        </div>
        <div class="pm-usr-2-point__count-group">
          <div class="pm-usr-2-point__count-group-left">
            <div class="pm-usr-2-point__current-point">99999</div>
          </div>
          <div class="pm-usr-2-point__count-group-right">
            <div class="pm-usr-2-point__next-lank">
              ゴールドステージまで 70ポイント
            </div>
            <div class="pm-usr-2-point__bar-base">
              <div class="pm-usr-2-point__bar"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserPoint",
};
</script>

<style></style>
