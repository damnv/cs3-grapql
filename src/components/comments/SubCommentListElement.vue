<template>
  <div class="d-flex mb-2">
    <router-link
      v-if="comment.user"
      class="mr-2"
      :to="`/user/${comment.user.id}`"
    >
      <v-avatar size="30" class="user-avatar">
        <img :src="comment.user.avatar" />
      </v-avatar>
    </router-link>
    <div class="sub-comment-content">
      <div class="grey lighten-4 pl-3 rounded-lg">
        <div class="d-flex align-center">
          <router-link
            v-if="comment.user"
            :to="`/user/${comment.user.id}`"
            class="user-name"
          >
            {{ comment.user.name }}
          </router-link>
          <span class="caption grey--text">{{
            comment.created_at | timeDifference
          }}</span>
          <v-spacer></v-spacer>
          <v-menu left transition="slide-x-transition" v-if="isMyComment">
            <template v-slot:activator="{ on }">
              <v-btn icon small v-on="on" class="edit-comment-menu">
                <v-icon small>more_horiz</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="showEditCmtForm">
                <v-list-item-title link>
                  <v-icon left color="indigo" small> mdi-pencil </v-icon>
                  <span class="caption">edit</span>
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="dialogDelete = true">
                <v-list-item-title link>
                  <v-icon left color="indigo" small> delete </v-icon>
                  <span class="caption">delete</span>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <!-- delete comment dialog -->
          <v-dialog persistent v-model="dialogDelete" width="350">
            <v-card class="text-center">
              <v-card-text class="py-5 text-center title">
                confirm delete
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions class="justify-center">
                <v-btn
                  width="90"
                  :disabled="isLoadingDelete"
                  @click="dialogDelete = false"
                  >cancel</v-btn
                >
                <v-btn
                  width="90"
                  color="error"
                  :disabled="isLoadingDelete"
                  :loading="isLoadingDelete"
                  @click="handleDelete()"
                  >delete</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <form :class="['mr-3', { 'editing-comment': editingCmt }]">
          <div
            :contenteditable="editingCmt"
            ref="commentValueRef"
            placeholder="reply comment"
            @keydown.exact.enter.prevent="updateComment"
          >
            {{ comment.content }}
          </div>
          <template v-if="editingCmt">
            <v-menu
              top
              max-width="285"
              max-height="350"
              :close-on-content-click="false"
              content-class="py-2 pl-1 white sm-scrollbar"
            >
              <template v-slot:activator="{ on }">
                <v-icon class="emoji-icon" v-on="on">insert_emoticon</v-icon>
              </template>
              <div class="emoji-list">
                <span
                  class="emoji-item"
                  v-for="item in emojiList"
                  :key="item.no"
                  @click="$refs.commentValueRef.innerText += item.emoji"
                >
                  {{ item.emoji }}
                </span>
              </div>
            </v-menu>
            <v-icon @click="$refs.commentImageRef.click()">add_a_photo</v-icon>
          </template>
          <input
            hidden
            type="file"
            name="commentImage"
            ref="commentImageRef"
            accept="image/x-png,image/gif,image/jpeg"
            @change="handleCommentImage($event)"
          />
        </form>
        <div class="d-flex align-center" v-if="!editingCmt">
          <div class="d-flex align-center mr-2">
            <v-menu
              top
              origin="center center"
              transition="scale-transition"
              offset-y
              open-on-hover
              :open-delay="100"
              :close-delay="100"
              content-class="reaction-menu"
            >
              <template v-slot:activator="{ on }">
                <div class="reaction-emoji" v-on="on">
                  <v-icon small v-if="!reactedObj"> thumb_up_off_alt </v-icon>
                  <img
                    v-else
                    :src="assetBaseUrl + reactedObj.img"
                    height="15"
                  />
                </div>
              </template>
              <div class="px-3 py-2 d-flex justify-space-between">
                <div
                  class="reaction"
                  v-for="reaction in comment.reactions"
                  :key="reaction.id"
                >
                  <img
                    :src="assetBaseUrl + reaction.img"
                    height="35"
                    class="reaction-emoji"
                    @click="changeReaction(reaction)"
                  />
                  <small
                    :class="{
                      'red--text font-weight-bold': reaction.reacted,
                    }"
                  >
                    {{ reaction.count }}
                  </small>
                </div>
              </div>
            </v-menu>
            <span
              :class="[
                'ml-1',
                reactedObj ? 'red--text font-weight-bold' : 'grey--text',
                'text-caption',
              ]"
            >
              {{ reactionCount }}
            </span>
          </div>
          <div class="caption red--text mouse-pointer">
            <span v-if="user" @click="handleReply(commentId)"> reply</span>
            <router-link v-else :to="'/login'" class="text-decoration-none">
              reply</router-link
            >
          </div>
        </div>
        <div class="pb-1 mr-3 text-right" v-else>
          <v-btn x-small text @click="cancelEdit"> cancel </v-btn>
          <v-btn x-small text color="indigo" @click="updateComment">
            save
          </v-btn>
        </div>
      </div>
      <div class="mt-2 sub-comment-image" v-if="commentImage">
        <v-img
          max-height="100"
          max-width="150"
          class="rounded cursor-pointer"
          :lazy-src="assetBaseUrl + '/img/logo.png'"
          :src="commentImage"
          @click="expandImgDialog = true"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <v-btn
          x-small
          fab
          class="btn-close"
          v-if="editingCmt"
          @click="commentImage = null"
        >
          <v-icon small>close</v-icon>
        </v-btn>
        <v-dialog v-model="expandImgDialog" fullscreen>
          <div class="expand-image">
            <v-btn icon @click="expandImgDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <img :src="commentImage" />
          </div>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
// import StoryConst from "~/const/story";

export default {
  name: "SubCommentListElement",
  data() {
    return {
      assetBaseUrl: process.env.assetBaseUrl,
      editingCmt: false,
      dialogDelete: false,
      commentValue: "",
      commentImage: this.comment.img,
      expandImgDialog: false,
      emojiList: [],
    };
  },
  props: {
    comment: Object,
  },
  computed: {},
  methods: {},
};
</script>
<style lang="scss" scoped></style>
