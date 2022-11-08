<template>
  <div class="pm-pla-post mt-9">
    <div class="cs-pane">
      <div class="cs-pane__inner--a">
        <div class="pm-pla-form-container">
          <div class="pm-pla-form-container__list">
            <div class="pm-pla-form-container__item">
              <div class="pm-pla-form-container__title-group">
                <div class="cs-title--common-m">写真/動画*</div>
                <div class="cs-text-s">最大5枚</div>
              </div>
              <!-- 画像/動画のブロック-->
              <div id="media" class="pm-pla-post__media">
                <div id="media-list" class="pm-pla-post__media-list mb-2">
                  <div v-for="(image, index) in images" :key="index">
                    <div
                      :ref="`image`"
                      class="pm-pla-post__media-upload"
                      :style="{
                        'background-image': 'url(' + image + ')',
                      }"
                    >
                      <span
                        class="cs-media-upload__button-delete"
                        @click="removeImage(index)"
                      ></span>
                    </div>
                  </div>
                </div>
                <div id="media-ui" class="pm-pla-post__media-ui">
                  <div id="media-uploader" class="pm-pla-post__media-uploader">
                    <div class="pm-pla-post__media-uploader-button-group">
                      <label>
                        <input
                          type="file"
                          name="file"
                          ref="file"
                          id="media-uploader-input"
                          multiple
                          accept="image/jpeg"
                          @change="addImage"
                        />
                        <div class="cs-media-upload__button-add"></div>
                      </label>
                    </div>
                  </div>
                  <div id="media-text" class="pm-pla-post__media-text">
                    【ご注意】投稿いただく写真は、ご自身で撮影したものに限ります。他サイトに掲載済みの画像、また画像とコメントから第三者の著作権、肖像権を侵害するおそれのある投稿、その他事務局が不適切と判断した投稿は非公開とさせていただく場合がございます。予めご了承ください。
                  </div>
                </div>
                <!-- <div
                          id="media-error"
                          class="pm-pla-post__media-error-text"
                        >
                        error message
                        </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <form action="" method="post">
      <div class="cs-pane">
        <div class="cs-pane__inner--a">
          <div class="pm-pla-form-container">
            <div class="pm-pla-form-container__list">
              <div class="pm-pla-form-container__item">
                <div class="pm-pla-form-container__title-group">
                  <div class="cs-title--common-m">体験内容*</div>
                  <div class="pm-pla-post__limit-warning-text">
                    あと<span id="body-input-counter"></span>文字
                  </div>
                </div>
                <textarea
                  name="body"
                  data-csdraft="target"
                  data-csfield="h-auto"
                  data-pla-counter-limit="1000"
                  rows="5"
                  id="body-input"
                  v-model="form.description"
                  class="cs-field-a cs-field--w-100p"
                ></textarea>
                <div class="pm-pla-post__hashtags-title">
                  よく使われるハッシュタグ
                </div>
                <div class="pm-pla-post__hashtags-list">
                  <div id="tag-suggest" class="cs-tag-list">
                    <div class="cs-tag-list__item">
                      <span data-pla-tag-suggest class="cs-tag">#タグ1</span>
                    </div>
                    <div class="cs-tag-list__item">
                      <span data-pla-tag-suggest class="cs-tag">#タグ2</span>
                    </div>
                    <div class="cs-tag-list__item">
                      <span data-pla-tag-suggest class="cs-tag">#タグ3</span>
                    </div>
                    <div class="cs-tag-list__item">
                      <span data-pla-tag-suggest class="cs-tag">#タグ4</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cs-pane">
        <div class="cs-pane__inner--a">
          <div class="pm-pla-form-container">
            <button
              @click.prevent="handleSubmit"
              type="submit"
              id="submit-button"
              class="cs-button-a--1-xl cs-button--w-100p"
            >
              投稿する
            </button>
          </div>
          <div class="pm-pla-form-container">
            <div
              @click.prevent="handleClose"
              data-csdraft="button"
              class="cs-button-b--3-l cs-button--w-100p"
            >
              キャンセル
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import commonMixins from "@/mixins/common";
import { UPDATE_ENTRY_MUTATION } from "@/graphql/mutations";
import { GET_ENTRY_QUERY } from '@/graphql/queries';

export default {
  name: "PlacegalleryEdit",
  mixins: [commonMixins],
  data() {
    return {
      form: {
        tags: [],
        items: [],
        cateId: "",
        moduleId: "",
        existImgs: [],
        description: "",
        images: "",
      },
      images: [],
      imageFiles: [],
      desLength: 0,
      isDisabled: false,
      entryId: parseInt(this.$route.params.id),
    };
  },
  watch: {
    imageFiles() {
      this.checkImageLimit(false);
    },
    form: {
      handler(val) {
        this.form = val;
      },
      deep: true,
    },
  },
  methods: {
    getData() {
      this.setLoading(true);
      this.$apollo
        .query({
          query: GET_ENTRY_QUERY,
          variables: {
            entryId: this.entryId
          },
          update: () => {},
          error(error) {
            console.log(error);
          },
        })
        .then(({ data }) => {
          this.form.tags = data.getEntryById.data.tags;
          this.form.cateId = data.getEntryById.data.category.id;
          this.form.moduleId = data.getEntryById.data.module.id;
          this.form.description = data.getEntryById.data.description;
          this.form.images = data.getEntryById.data.medias;
          this.getUrlImages(this.form.images);
          this.setLoading(false);
        })
        .catch(({ graphQLErrors, networkError }) => {
          this.setLoading(false);
          setTimeout(() => {
            if (graphQLErrors) {
              graphQLErrors.forEach(({ message }) => {
                this.newToast({
                  type: "error",
                  message: message,
                });
              });
            }
            if (networkError) {
              networkError.result.errors.forEach(({ message }) => {
                this.newToast({
                  type: "error",
                  message: message,
                });
              });
            }
          }, 200);
        });
    },
    handleClose() {
      this.$emit("onClose");
    },
    async handleSubmit() {
      console.log(this.form.description);
      await this.$apollo
        .mutate({
          mutation: UPDATE_ENTRY_MUTATION,
          variables: {
            description: this.form.description,
            entry_id: this.entryId,
            images: this.form.images,
            caption: this.form.description,
            category_l_id: this.form.cateId,
            module_id: this.form.moduleId,
          },
          context: {
            hasUpload: true,
          },
          update: () => {},
        })
        .then(({ data }) => {
          console.log(data.updateEntry);
          if (data.updateEntry.result_code == 1) {
            this.newToast({
              type: "error",
              message: data.updateEntry.error.error_message,
            });
          } else {
            this.$router.push({
              name: "placegallery-detail",
              params: { id: data.updateEntry.data.id },
            });
            setTimeout(() => {
              this.newToast({
                type: "success",
                message: "Update Entry Success",
              });
            }, 100);
          }
          // this.$emit("onChangeData", data);
        })
        .catch((error) => {
          if (error.graphQLErrors) {
            error.graphQLErrors.forEach(({ message }) => {
              this.newToast({
                type: "error",
                message: message,
              });
            });
          }
        });

      await this.handleClose();
    },
    addImage(e) {
      const tmpFiles = e.target.files;
      if (tmpFiles.length === 0) {
        return false;
      }
      for (let i = 0; i < tmpFiles.length; i++) {
        if (this.checkImageFile(tmpFiles[i]) || this.checkImageLimit(true))
          return false;
        this.imageFiles.push(tmpFiles[i]);
        this.createImage(tmpFiles[i]);
      }
    },
    createImage(file) {
      var reader = new FileReader();
      var vm = this;
      reader.onload = (e) => {
        vm.images.push(e.target.result);
      };
      reader.readAsDataURL(file);
      if (this.checkImageLimit(false)) {
        return false;
      }
    },
    removeImage(index) {
      if (this.checkImageLimit(false)) this.checkChooseFile(false);
      this.imageFiles.splice(index, 1);
      this.images.splice(index, 1);
    },
    checkImageLimit(isShowMessage = true) {
      if (this.imageFiles.length >= 5) {
        this.checkChooseFile();
        if (isShowMessage)
          this.setError("image-error", "写真の数が制限を超えています。");
        return true;
      }
      return false;
    },
    checkImageFile(file) {
      if (file.size > 1024 * 1024 * 10) {
        this.setError("image-error", "画像サイズが10MBを超えています。");
        return true;
      }
      return false;
    },
    checkChooseFile(disabled = true) {
      this.$refs.file.disabled = disabled;
    },
    onUpdateImage(value) {
      console.log(value);
      this.images = value;
    },
    getUrlImages(formImages) {
      for(let i = 0; i < formImages.length; i++){
        this.images.push(formImages[i].url);
      }
    }
  },
  apollo: {},
  created() {
  },
  mounted() {
    if (!this.$auth.user){
      this.$router.push({
        name: "placegallery-list",
      });
    }
    else {
      this.getData();
    }
  },
};
</script>

<style></style>
