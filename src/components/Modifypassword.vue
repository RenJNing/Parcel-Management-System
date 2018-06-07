<template>
  <div>
    <el-form label-width="80px" :rules='rules' ref='passwordform' :model="passwordform">
      <el-form-item type='password' prop='oldpassword' label="旧密码">
        <el-input v-model="passwordform.oldpassword"></el-input>
      </el-form-item>
      <el-form-item prop='newpassword' label="新密码">
        <el-input type='password' v-model="passwordform.newpassword"></el-input>
      </el-form-item>
      <el-form-item prop='confirmpassword' label="确认密码">
        <el-input type='password' v-model="passwordform.confirmpassword"></el-input>
      </el-form-item>
      <el-button type="primary" @click="confrim('passwordform')">确认</el-button>
      <el-button @click="resetForm('passwordform')">重置</el-button>
    </el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passwordform.newpassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      passwordform: {
        oldpassword: '',
        newpassword: '',
        confirmpassword: ''
      },
      rules: {
        oldpassword: [
          {required: true, message: '请输入密码！', trigger: 'blur'}
        ],
        newpassword: [
          {required: true, message: '请输入密码！', trigger: 'blur'},
          { min: 6, max: 16, message: '长度在6-16位之间', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]+$/, message: '密码仅可由数字与字母组成' }
        ],
        confirmpassword: [
          { validator: validatePass, trigger: 'blur' }
        ]
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
        case -1:
          msg('未知错误，请上报管理员')
          break
        case 301:
          msg('密码错误')
          break
        default:
          break
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    confrim (formName) {
      const self = this
      this.$refs[formName].validate((validate) => {
        if (validate) {
          this.$axios.post('user/modifypassword', {
            oldpassword: this.passwordform.oldpassword,
            newpassword: this.passwordform.newpassword
          })
            .then(function (response) {
              if (response.data.code === 200) {
                Message({
                  message: '成功修改密码',
                  type: 'success',
                  center: true
                })
                self.resetForm('passwordform')
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
