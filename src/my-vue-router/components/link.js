export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  render (h) {
    // 通过插槽获取'a'标签内的 文本
    return h('a', { domProps: { href: '#' + this.to } }, [this.$slots.default])
  }
}
