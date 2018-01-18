**PlayListInfo 碰到的坑**
`在mounted生命周期内部使用this.$refs时候 获取不到下面的元素`
`解决问题：在组件渲染的时候，如果ref是定在有if  for show中的节点，返回是undefined`
`因为在mounted阶段他们根本不存在。`
`最后解决方法：在updated周期内部调用。`
