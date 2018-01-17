<template>
    <div class="slider" ref="slider">
      <div class="slider-group" ref="sliderGroup">
        <slot></slot>
      </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'slider',
  data () {
    return {
      timer: null
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 1000
    },
    click: {
      type: Boolean,
      default: true
    },
    speed: {
      type: Number,
      default: 400
    }
  },
  mounted () {
    setTimeout(() => {
      this._initWidth(true)
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
    }, 20)
    window.addEventListener('resize', () => {
      if (!this.slider) return
      this._initWidth(true)
      this.slider.refresh()
    })
  },
  methods: {
    _initWidth (resize) {
      let Group = this.$refs.sliderGroup.children
      let ClientWidth = this.$refs.slider.clientWidth
      let width = 0
      for (let i = 0; i < Group.length; i++) {
        width += ClientWidth
        Group[i].children[0].style.width = `${ClientWidth}px`
      }
      if (this.loop && resize) {
        width += 2 * ClientWidth
      }
      this.$refs.sliderGroup.style.width = `${width}px`
    },
    _initSlider () {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: true,
        snap: {
          loop: true,
          speed: this.speed
        },
        bounce: false,
        click: true
      })
      this.slider.on('scrollEnd', () => {
        if (this.autoPlay) {
          clearInterval(this.timer)
          this._play()
        }
      })
    },
    _play () {
      this.timer = setInterval(() => {
        this.slider.next()
      }, this.interval)
    }
  },
  destroyed () {
    clearTimeout(this.timer)
  }
}
</script>
<style scoped>
  .slider{
    overflow: hidden;
  }
  .slider-group a{
    display: block;
    width: 100%;
    height: 100%;
  }
  .slider img{
    width: 100%;
    height: auto;
  }
  .slider-item{
    float: left;
    box-sizing:border-box;
    overflow:hidden;
    text-align:center;
  }
</style>
