export default {
  data() {
    return {
      currentIndex: 0,
      nextIndex: 0,
      lastIndex: 0,
      inputEls: [],
    };
  },
  mounted() {
    this.inputEls = document.getElementsByTagName("input");
    this.lastIndex = this.inputEls.length - 1;
  },
  methods: {
    focusNext() {
      this.nextIndex = this.currentIndex + 1;
      const currentElement = this.inputEls[this.currentIndex];
      const nextElement = this.inputEls[this.nextIndex];
      if (!currentElement) {
        return;
      }
      if (this.currentIndex === this.lastIndex) {
        const allButtons = document.getElementsByTagName("button");
        const lastButton = allButtons[allButtons.length - 1];
        lastButton.blur();
        lastButton.click();
        return;
      }
      nextElement.focus();
      this.currentIndex++;
    },
    setNextIndex() {
      if (this.currentIndex === this.lastIndex + 1) {
        return;
      }
      this.currentIndex++;
    },
    setCurrentIndex(e) {
      const currentInput = e.target;
      const arr = Object.values(this.inputEls);
      this.currentIndex = arr.findIndex((el) => el === currentInput);
    },
  },
};
