<template>
    <div>
      <div class="index-list-title">{{lists.title}}<router-link to="/playlist" class="icon iconfont icon-more_circle"></router-link></div>
      <scroll ref="scroll">
        <div>
          <ul>
            <li></li>
          </ul>
        </div>
      </scroll>
    </div>
</template>

<script>
  import Scroll from '@/base/scroll/scroll.vue'
  export default {
    components: {Scroll},
    data () {
      return {}
    },
    props: {
      lists: {
        type: Object,
        default: null
      }
    }
  }
</script>
<style scoped>
</style>
