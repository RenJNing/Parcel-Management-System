<template>
  <div>
    <ul>
      <li v-for="value in TopicList" :key="value.topic_id">
        <div>
          <div>{{value.title}}</div>
          <div>{{value.nickname}}</div>
          <div>{{value.leasttime}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  data () {
    return {
      TopicList: []
    }
  },
  mounted: function () {
    const self = this
    this.$axios.get('user/community')
      .then(function (response) {
        if (response.data.code === 200) {
          response.data.obj.forEach(function (element) {
            self.TopicList.push({title: element.title, nickname: element.nickname, leasttime: element.leasttime, topic_id: element.topic_id})
          })
        } else {
          console.log(response.data.code)
        }
      })
      .catch(function (err) {
        console.log(err)
        Message({
          message: '请检查网络并重试',
          type: 'error',
          center: true
        })
      })
  }
}
</script>

<style scoped>

</style>
