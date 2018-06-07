<template>
  <div>
    <ul>
      <li v-for="value in TopicList" :key="value.topic_id">
        <div>
          <div>{{value.title}}</div>
          <div>{{value.nickname}}</div>
          <div>{{value.recenttime}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        data(){
          return {
            TopicList: [{
              title: '菜鸟教程1',
              nickname: 'http://www.runoob.com',
              recenttime: '学的不仅是技术，更是梦想！',
              topic_id:"1"
            },{
              title: '菜鸟教程2',
              nickname: 'http://www.runoob.com',
              recenttime: '学的不仅是技术，更是梦想！',
              topic_id:"2"
            }]
          }
        },
      mounted(){
        this.$nextTick(function () {
          this.$axios.get('user/community')
      }).then(function (response) {
          if (response.data.code === 200) {
            // TODO:查询后返回数据
            response.data.obj.forEach(function (element) {
              self.tableData.push({parcel_id: element.parcel_id, sendername: element.sendername, receivename: element.receivename, receiveaddress: element.receiveaddress, parcel_status: element.parcel_status})
            })
          } else {
            self.codeParsing(response.data.code)
          }
        })
      }
    }
</script>

<style scoped>

</style>
