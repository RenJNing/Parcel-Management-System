<template>
  <div>
    <div>
      <h1>{{Topic.title}}</h1>
      <span>{{Topic.createtime}}</span>
      <hr>
    </div>
    <div>
      <h2>{{Topic.nickname}}</h2>
        <p>{{Topic.content}}<p>
        <hr>
    </div>
    <div>
      <h2>回复</h2>
      <el-form label-width="0px" :rules='rules' ref='commentform' :model="commentform">
        <el-form-item prop='content'>
          <el-input v-model="commentform.content" placeholder="添加评论"></el-input>
        </el-form-item>
        <el-button type="primary" @click="addcomment('commentform')">发送</el-button>
      </el-form>
      <hr>
      <ul>
        <li v-for="value in CommentList" :key="value.id">
          <div>
            <div>{{value.nickname}}</div>
            <div>{{value.time}}</div>
            <div>{{value.content}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  data () {
    return {
      CommentList: [],
      Topic: {
        title: JSON.parse(sessionStorage.getItem('topic')).title,
        createtime: JSON.parse(sessionStorage.getItem('topic')).createtime,
        nickname: JSON.parse(sessionStorage.getItem('topic')).nickname,
        content: JSON.parse(sessionStorage.getItem('topic')).content
      },
      commentform: {
        content: ''
      },
      rules: {
        content: [{required: true, message: '评论不能为空', trigger: 'change'}]
      }
    }
  },
  methods: {
    getNowFormatDate () {
      var date = new Date()
      var seperator1 = '-'
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate
      return currentdate
    },
    codeParsing (code) {
      var msg = (hint) => {
        Message({
          message: hint,
          type: 'error',
          center: true
        })
      }
      switch (code) {
        case 302:
          msg('订单号不存在')
          break
        default:
          break
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    addcomment (formName) {
      const self = this
      this.$refs[formName].validate((validate) => {
        if (validate) {
          this.$axios.post('user/addcomment', {
            content: this.commentform.content,
            nickname: sessionStorage.getItem('ms_nickname'),
            time: self.getNowFormatDate(),
            topic_id: JSON.parse(sessionStorage.getItem('topic')).topic_id
          })
            .then(function (response) {
              if (response.data.code === 200) {
                Message({
                  message: '成功发表评论',
                  type: 'success',
                  center: true
                })
                self.resetForm('commentform')
                self.CommentList.push({nickname: sessionStorage.getItem('ms_nickname'), time: self.getNowFormatDate(), content: self.commentform.content})
              } else {
                self.codeParsing(response.data.code)
              }
            })
            .catch(function (error) {
              console.log(error)
              Message({
                message: '请检查网络并重试',
                type: 'error',
                center: true
              })
            })
        } else {
          return false
        }
      }
      )
    }
  },
  mounted: function () {
    const self = this
    var url = 'user/getcomment/' + JSON.parse(sessionStorage.getItem('topic')).topic_id
    this.$axios.get(url)
      .then(function (response) {
        if (response.data.code === 200) {
          response.data.obj.forEach(function (element) {
            self.CommentList.push({nickname: element.nickname, content: element.content, time: element.time})
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
