<template>
  <div class="login">
    <div class="background-div">  
				<img :src="location" width='100%' height='100%'>
		</div>
    <div class='top'>
      <h1>{{ title }}</h1>
      <el-tabs v-model="activePane">
        <el-tab-pane label="登陆" name='login'>
          <el-form :model="LoginForm" :rules='loginrules' ref='LoginForm' label-width='0px' class='LoginForm'>
            <el-form-item prop='email'>
              <el-input v-model="LoginForm.email" placeholder="账号/邮箱"></el-input>
             </el-form-item>
            <el-form-item prop='password'>
              <el-input v-model="LoginForm.password" type='password' placeholder='密码'></el-input>
            </el-form-item>
            <el-button style="width:100%" type="primary" icon="el-icon-upload" @click="login('LoginForm')">登陆</el-button>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name='register'>
          <el-form :model="RegisterForm" :rules='registerrules' ref='RegisterForm' label-width='0px' class='RegisterForm'>
            <el-form-item prop='email'>
              <el-input v-model="RegisterForm.email" placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item prop='nickname'>
              <el-input v-model="RegisterForm.nickname" placeholder="昵称"></el-input>
            </el-form-item>
            <el-form-item prop='password'>
              <el-input v-model="RegisterForm.password" type='password' placeholder='请输入6-16位密码'></el-input>
            </el-form-item>
            <el-form-item prop='confirm'>
              <el-input v-model="RegisterForm.confirm" type='password' placeholder='确认密码'></el-input>
            </el-form-item>
            <el-button style="width:100%" type="primary" icon="el-icon-upload" @click="register('RegisterForm')">注册</el-button>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      
    </div>
  </div>
</template>

<script>
import BGimg from '../assets/background.jpg';
export default {
  data () {
    var validatePass = (rule, value, callback) => {            
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.RegisterForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      title: '快递管理系统',
      location:BGimg,
      activePane:'login',
      LoginForm:{
        email:'',
        password:''
      },
      RegisterForm:{
        email:'',
        nickname:'',
        password:'',
        confirm:''
      },
      loginrules:{
        email:[
          {required:true, message:'请输入账号！',trigger:'blur'}
        ],
        password:[
          {required:true, message:"请输入密码！",trigger:'blur'}
        ]
      },
      registerrules:{
        email:[
          {required:true, message:'请输入邮箱！',trigger:'blur'},
          { type: "email", message: '请输入正确的Email格式', trigger: 'blur' }
        ],
        nickname:[
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { pattern: /^([\u4e00-\u9fa5]|[a-zA-Z0-9])([\u4e00-\u9fa5]|[_|a-zA-Z0-9])+$/, message: '昵称仅可由中文、数字和字母组成' }
        ],
        password:[
          {required:true, message:"请输入密码！",trigger:'blur'},
          { min: 6, max: 16, message: '长度在6-16位之间', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]+$/, message: '密码仅可由数字与字母组成' }
        ],
        confirm:[
          {validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    login(formName){
      this.$refs[formName].validate((validate)=>{
        if(validate){
          this.$axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
          this.$axios.post('/user/login',{
              email:this.LoginForm.email,
              password:this.LoginForm.password
          })
          .then(function(response){
            if(response.data.code===200){
              localStorage.setItem();
              this.$router.push({ path: '/Home' });
            }
          })
          .catch(function(error){
            console.log(error);
          });
        }
        else{
          alert('请输入邮箱和密码');
          return false;
        }
      }
      );
    },
    register(formName){
      this.$refs[formName].validate((validate)=>{
        if(validate){
          this.$axios.post('/user/register',{
            email:this.RegisterForm.email,
            nickname:this.RegisterForm.nickname,
            password:this.RegisterForm.password
          })
          .then((response)=>{
            console.log(response.data);
          })
          .catch((error)=>{
            console.log(error);
          })
        }
        else{
          alert('注册失败');
          return false;
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.background-div{
  position: fixed;
  margin-left:-0.5%;
  margin-top:-0.5%;
  width:100%;
  height:100%;
}
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
