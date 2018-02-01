const state = {
  errorInfo: {
    status: false,
    text: '暂未开发'
  },
  PlayMusicList: [], //播放列表
  currentIndex: 0, //播放索引
  playMode: { //播放模式
    loop: 0,
    sequence: 1,
    random: 2
  },
  playModeNum: 1,
  playing: false,
  loadingShow: true
}
export default state
