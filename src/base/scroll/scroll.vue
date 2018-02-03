<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {getDeviceRatio} from '@/api/common'
export default {
  props: {
    data: {
      type: Array,
      default: null
    },
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发顶部下拉的事件，用于下拉刷新
     */
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发列表滚动开始的事件
     */
    beforeScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 当数据更新后，刷新scroll的延时。
     */
    refreshDelay: {
      type: Number,
      default: 0
    }
  },
  mounted () {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  created () { this._initScroll() },
  methods: {
    _initScroll () {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        pullUpLoad: {
          threshold: -20 * getDeviceRatio
        }
      })
      if (this.listenScroll) {
        let me = this
        this.scroll.on('scroll', (pos) => {
          me.$emit('scroll', pos)
        })
      }
      if (this.pullUpLoad) {
        this._initPullDownRefresh()
      }
    },
    enable () {
      this.scroll && this.scroll.enable()
    },
    disable () {
      this.scroll && this.scroll.disable()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    _initPullDownRefresh () { //监听滚动到底部
      this.scroll.on('scrollEnd', () => {
        // 滚动到底部
        if (this.scroll.y <= (this.scroll.maxScrollY + 150) && this.scroll.absStartY < -400) {
          this.$emit('scrollToEnd', 'text')
        }
      })
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this.refresh()
      })
    }
  }
}
</script>
