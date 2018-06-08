<template>
  <div>
    <el-form ref="topic" :rules='rules' :model="topic">
      <el-form-item prop="title">
        <el-input v-model="topic.title" placeholder="输入标题"></el-input>
      </el-form-item>
      <el-form-item prop="content">
        <el-input type="textarea" v-model="topic.content" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-button type="primary" @click="onSubmit('topic')">发表</el-button>
      <el-button>取消</el-button>
    </el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  data () {
    return {
      topic: {
        title: '',
        content: ''
      },
      rules: {
        title: [{required: true, message: '请输入标题！', trigger: 'blur'}],
        content: [{required: true, message: '请输入内容！', trigger: 'blur'},
          {max: 255, message: '内容长度不能超过255字！', trigger: 'change'}]
      }
    }
  },
  methods: {
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
    onSubmit (formName) {
      const self = this
      this.$refs[formName].validate((validate) => {
        if (validate) {
          this.$axios.post('user/newtopic', {
            title: this.topic.title,
            content: this.topic.content,
            nickname: localStorage.getItem('ms_nickname'),
            createtime: self.getNowFormatDate(),
            leasttime: self.getNowFormatDate()
          })
            .then(function (response) {
              if (response.data.code === 200) {
                Message({
                  message: '成功发表',
                  type: 'success',
                  center: true
                })
                self.$router.push({path: '/Home/community'})
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
          Message({
            message: '格式错误，请检查输入',
            type: 'error',
            center: true
          })
          return false
        }
      }
      )
    }
  }
}
</script>

<style scoped>

</style>
