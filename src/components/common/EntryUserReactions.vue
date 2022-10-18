<template>
  <div class="cs-liked-list" v-if="users.length">
    <div class="cs-liked-list__header">
      <span data-cslike-counter="12345">{{ total }}</span
      >人のメンバーがいいね！と言ってます
    </div>
    <ul class="cs-liked-list__members cs-reaction-list-a">
      <li
        v-for="(user, index) in users"
        :key="index"
        v-bind:style="{
          'background-image': 'url(' + user.profile_img + ')',
        }"
        class="cs-liked-list__avatar"
      >
        <i
          data-csreaction-icon="3"
          @click="handleShowReacted"
          class="cs-button-reaction-a__icon"
        ></i>
      </li>
    </ul>

    <div class="cs-modal-liked cs-modal-reacted" v-if="isShowReacted">
      <div class="cs-modal-liked__header" v-click-outside="handleCloseReacted">
        全100件の「いいね！」がありました。
        <div data-csmodal="hide" class="cs-modal-liked__close">
          <a @click="handleCloseReacted">閉じる</a>
        </div>
      </div>
      <div class="cs-modal-liked__contents">
        <div class="cs-modal-liked__icon-counts">
          <ul class="cs-modal-liked__icon-counts-list">
            <li class="cs-modal-liked__icon-counts-list-item">
              <i data-csreaction-icon="1" class="cs-button-reaction-a__icon"></i
              >20
            </li>
            <li class="cs-modal-liked__icon-counts-list-item">
              <i data-csreaction-icon="2" class="cs-button-reaction-a__icon"></i
              >20
            </li>
            <li class="cs-modal-liked__icon-counts-list-item">
              <i data-csreaction-icon="3" class="cs-button-reaction-a__icon"></i
              >20
            </li>
            <li class="cs-modal-liked__icon-counts-list-item">
              <i data-csreaction-icon="4" class="cs-button-reaction-a__icon"></i
              >20
            </li>
            <li class="cs-modal-liked__icon-counts-list-item">
              <i data-csreaction-icon="5" class="cs-button-reaction-a__icon"></i
              >20
            </li>
          </ul>
        </div>
        <ul class="cs-modal-liked-persons">
          <li class="cs-modal-liked-persons__item">
            <a href="#" class="cs-modal-liked-person">
              <div
                style="
                  background-image: url('http://placeimg.com/300/200/people');
                "
                class="cs-modal-liked-person__image"
              >
                <i
                  data-csreaction-icon="3"
                  class="cs-button-reaction-a__icon"
                ></i>
              </div>
              <div class="cs-modal-liked-person__text">
                <div class="cs-modal-liked-person__name">まゆみん</div>
                <div class="cs-h-search-member__description">
                  2016年4月9日0時すぎ、一ヶ月ちょっと早く生まれました。でもとても元気ですくすくと育っています。
                </div>
              </div></a
            >
          </li>
          <li class="cs-modal-liked-persons__item">
            <a href="#" class="cs-modal-liked-person">
              <div
                style="
                  background-image: url('http://placeimg.com/300/200/people');
                "
                class="cs-modal-liked-person__image"
              >
                <i
                  data-csreaction-icon="3"
                  class="cs-button-reaction-a__icon"
                ></i>
              </div>
              <div class="cs-modal-liked-person__text">
                <div class="cs-modal-liked-person__name">まゆみん</div>
                <div class="cs-h-search-member__description">
                  2016年4月9日0時すぎ、一ヶ月ちょっと早く生まれました。でもとても元気ですくすくと育っています。
                </div>
              </div></a
            >
          </li>
          <li class="cs-modal-liked-persons__item">
            <a href="#" class="cs-modal-liked-person">
              <div
                style="
                  background-image: url('http://placeimg.com/300/200/people');
                "
                class="cs-modal-liked-person__image"
              >
                <i
                  data-csreaction-icon="3"
                  class="cs-button-reaction-a__icon"
                ></i>
              </div>
              <div class="cs-modal-liked-person__text">
                <div class="cs-modal-liked-person__name">まゆみん</div>
                <div class="cs-h-search-member__description">
                  2016年4月9日0時すぎ、一ヶ月ちょっと早く生まれました。でもとても元気ですくすくと育っています。
                </div>
              </div></a
            >
          </li>
          <li class="cs-modal-liked-persons__item">
            <a href="#" class="cs-modal-liked-person">
              <div
                style="
                  background-image: url('http://placeimg.com/300/200/people');
                "
                class="cs-modal-liked-person__image"
              >
                <i
                  data-csreaction-icon="3"
                  class="cs-button-reaction-a__icon"
                ></i>
              </div>
              <div class="cs-modal-liked-person__text">
                <div class="cs-modal-liked-person__name">まゆみん</div>
                <div class="cs-h-search-member__description">
                  2016年4月9日0時すぎ、一ヶ月ちょっと早く生まれました。でもとても元気ですくすくと育っています。
                </div>
              </div></a
            >
          </li>
          <li class="cs-modal-liked-persons__item">
            <a href="#" class="cs-modal-liked-person">
              <div
                style="
                  background-image: url('http://placeimg.com/300/200/people');
                "
                class="cs-modal-liked-person__image"
              >
                <i
                  data-csreaction-icon="3"
                  class="cs-button-reaction-a__icon"
                ></i>
              </div>
              <div class="cs-modal-liked-person__text">
                <div class="cs-modal-liked-person__name">まゆみん</div>
                <div class="cs-h-search-member__description">
                  2016年4月9日0時すぎ、一ヶ月ちょっと早く生まれました。でもとても元気ですくすくと育っています。
                </div>
              </div></a
            >
          </li>
          <li class="cs-modal-liked-persons__item">
            <a href="#" class="cs-modal-liked-person">
              <div
                style="
                  background-image: url('http://placeimg.com/300/200/people');
                "
                class="cs-modal-liked-person__image"
              >
                <i
                  data-csreaction-icon="3"
                  class="cs-button-reaction-a__icon"
                ></i>
              </div>
              <div class="cs-modal-liked-person__text">
                <div class="cs-modal-liked-person__name">まゆみん</div>
                <div class="cs-h-search-member__description">
                  2016年4月9日0時すぎ、一ヶ月ちょっと早く生まれました。でもとても元気ですくすくと育っています。
                </div>
              </div></a
            >
          </li>
          <li class="cs-modal-liked-persons__item">
            <a href="#" class="cs-modal-liked-person">
              <div
                style="
                  background-image: url('http://placeimg.com/300/200/people');
                "
                class="cs-modal-liked-person__image"
              >
                <i
                  data-csreaction-icon="3"
                  class="cs-button-reaction-a__icon"
                ></i>
              </div>
              <div class="cs-modal-liked-person__text">
                <div class="cs-modal-liked-person__name">まゆみん</div>
                <div class="cs-h-search-member__description">
                  2016年4月9日0時すぎ、一ヶ月ちょっと早く生まれました。でもとても元気ですくすくと育っています。
                </div>
              </div></a
            >
          </li>
          <li class="cs-modal-liked-persons__item">
            <a href="#" class="cs-modal-liked-person">
              <div
                style="
                  background-image: url('http://placeimg.com/300/200/people');
                "
                class="cs-modal-liked-person__image"
              >
                <i
                  data-csreaction-icon="3"
                  class="cs-button-reaction-a__icon"
                ></i>
              </div>
              <div class="cs-modal-liked-person__text">
                <div class="cs-modal-liked-person__name">まゆみん</div>
                <div class="cs-h-search-member__description">
                  2016年4月9日0時すぎ、一ヶ月ちょっと早く生まれました。でもとても元気ですくすくと育っています。
                </div>
              </div></a
            >
          </li>
          <li class="cs-modal-liked-persons__item">
            <a href="#" class="cs-modal-liked-person">
              <div
                style="
                  background-image: url('http://placeimg.com/300/200/people');
                "
                class="cs-modal-liked-person__image"
              >
                <i
                  data-csreaction-icon="3"
                  class="cs-button-reaction-a__icon"
                ></i>
              </div>
              <div class="cs-modal-liked-person__text">
                <div class="cs-modal-liked-person__name">まゆみん</div>
                <div class="cs-h-search-member__description">
                  2016年4月9日0時すぎ、一ヶ月ちょっと早く生まれました。でもとても元気ですくすくと育っています。
                </div>
              </div></a
            >
          </li>
          <li class="cs-modal-liked-persons__item">
            <a href="#" class="cs-modal-liked-person">
              <div
                style="
                  background-image: url('http://placeimg.com/300/200/people');
                "
                class="cs-modal-liked-person__image"
              >
                <i
                  data-csreaction-icon="3"
                  class="cs-button-reaction-a__icon"
                ></i>
              </div>
              <div class="cs-modal-liked-person__text">
                <div class="cs-modal-liked-person__name">まゆみん</div>
                <div class="cs-h-search-member__description">
                  2016年4月9日0時すぎ、一ヶ月ちょっと早く生まれました。でもとても元気ですくすくと育っています。
                </div>
              </div></a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EntryUserReactions",
  props: {
    users: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {
      isShowReacted: false,
    };
  },
  methods: {
    handleShowReacted() {
      this.isShowReacted = true;
    },
    handleCloseReacted() {
      this.isShowReacted = false;
    },
  },
};
</script>

<style></style>
