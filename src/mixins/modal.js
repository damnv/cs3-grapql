export default {
  methods: {
    openModal(action) {
      this[`isShow${action}Modal`] = true;
    },
    closeModal(action) {
      this[`isShow${action}Modal`] = false;
    },
  },
};
