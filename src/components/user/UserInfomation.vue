<template>
  <div class="cs-pane">
    <div class="cs-pane__inner--e">
      <div class="pm-usr-2-profile">
        <div class="pm-usr-2-profile__image-area">
          <div
            v-bind:style="{
              'background-image': 'url(' + $auth.user.picture + ')',
            }"
            class="pm-usr-2-profile__image"
          ></div>
          <div class="pm-usr-2-profile__follow-count-group">
            <a href="#" class="pm-usr-2-profile__follow-count-item">
              <div class="pm-usr-2-profile__follow-count">240</div>
              <div class="pm-usr-2-profile__follow-text">フォロー中</div></a
            ><a href="#" class="pm-usr-2-profile__follow-count-item">
              <div class="pm-usr-2-profile__follow-count">12</div>
              <div class="pm-usr-2-profile__follow-text">フォロワー</div></a
            >
          </div>
        </div>
        <div class="pm-usr-2-profile__avatar">
          <div
            v-bind:style="{
              'background-image': 'url(' + $auth.user.picture + ')',
            }"
            class="cs-avatar-2__photo--ambassador"
          ></div>
        </div>
        <div class="pm-usr-2-profile__nav-group">
          <div class="pm-usr-2-profile__sns-list">
            <div class="pm-usr-2-profile__sns-item">
              <a href="#" class="pm-usr-2-profile__sns-button--instagram"></a>
            </div>
            <div class="pm-usr-2-profile__sns-item">
              <a href="#" class="pm-usr-2-profile__sns-button--twitter"></a>
            </div>
            <div class="pm-usr-2-profile__sns-item">
              <a href="#" class="pm-usr-2-profile__sns-button--facebook"></a>
            </div>
          </div>
          <div class="pm-usr-2-profile__edit-group">
            <label class="pm-usr-2-profile__edit-label">
              <input type="checkbox" class="pm-usr-2-profile__edit-checkbox" />
              <div class="pm-usr-2-profile__edit-button"></div>
              <div class="pm-usr-2-profile__edit-menu-list">
                <a href="" class="pm-usr-2-profile__edit-menu-link"
                  >プロフィールを編集</a
                ><a href="" class="pm-usr-2-profile__edit-menu-link"
                  >アカウント設定</a
                ><a href="" class="pm-usr-2-profile__edit-menu-link"
                  >配送先情報編集</a
                >
                <a @click="logout" class="pm-usr-2-profile__edit-menu-link">ログアウト</a>
              </div>
            </label>
          </div>
        </div>
        <div class="pm-usr-2-profile__detail">
          <div class="pm-usr-2-profile__detail-lank-label">
            <div class="pm-usr-2__lank-label--a">ブロンズステージ</div>
          </div>
          <div class="pm-usr-2-profile__user-name">
            {{ $auth.user.name }}
            <div class="cs-label-round--a">Official</div>
            <i class="cs-avatar-2__beginner"></i>
          </div>
          <div class="pm-usr-2-profile__user-info-list">
            <div class="pm-usr-2-profile__user-info">東京都</div>
            <div class="pm-usr-2-profile__user-info">女性</div>
          </div>
          <div class="pm-usr-2-profile__introduction">
            旅が好きで、国内、海外問わず、３ヶ月おきに何処かへ行ってます。旅が好きで、国内、海外問わず、３ヶ月おきに何処かへ行ってます。旅が好きで、３ヶ月おきに何処かへ行ってます。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfomation",
  data(){
    return{

    }
  },
  methods:{
    logout() {
      this.$auth.logout();
      this.$router.push({ path: "/" });
    },
  }
};
</script>

<style></style>
