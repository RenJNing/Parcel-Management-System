<template>
  <div class='top'>
    <h1>{{ title }}</h1>
    <el-form :model="LoginForm" :rules='loginrules' ref='LoginForm' label-width='0px' class='LoginForm'>
      <el-form-item prop='email'>
        <el-input v-model="LoginForm.email" placeholder="管理员邮箱"></el-input>
      </el-form-item>
      <el-form-item prop='password'>
        <el-input v-model="LoginForm.password" type='password' placeholder='密码'></el-input>
      </el-form-item>
      <el-button style="width:100%" type="primary" icon="el-icon-upload" @click="login('LoginForm')">登陆</el-button>
    </el-form>
    <el-button type="text" @click="gotoUser()">用户登陆</el-button>
  </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  data () {
    return {
      title: '管理员登陆',
      LoginForm: {
        email: '',
        password: ''
      },
      loginrules: {
        email: [
          {required: true, message: '请输入账号！', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码！', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    gotoUser () {
      this.$router.push({path: '/Login/user'})
    },
    login: function (formName) {
      const self = this
      this.$refs[formName].validate((validate) => {
        if (validate) {
          if (self.LoginForm.email === 'admin@qq.com' && self.LoginForm.password === 'admin') {
            self.$router.push({path: '/admin'})
          } else {
            Message({
              message: '管理员密码错误',
              type: 'error',
              center: true
            })
          }
        } else {
          Message({
            message: '格式错误，请检查输入',
            type: 'error',
            center: true
          })
        }
      }
      )
    }
  }
}
</script>

<style>
  .top{
    position: absolute;
    width:350px;
    text-align: center;
    top:10%;
    left:50%;
    transform:translateX(-50%);
  }
  #tab-login,#tab-register{
    font-size: 20px ;
    padding:0 65px;
  }
  .top .el-tabs__item {
    padding:0 100px;
  }

</style>
