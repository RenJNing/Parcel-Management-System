<template>
  <div id="home">
    <el-container>
        <el-header>
            <div class='logo'>快递管理系统</div>
            <el-menu class='menu' :default-active="activeIndex" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">首页</el-menu-item>
                <el-menu-item index="2">我的订单</el-menu-item>
                <el-menu-item index="3">我要寄件</el-menu-item>
                <el-submenu index="4">
                    <template slot="title">多说两句</template>
                    <el-menu-item index="4-1">进入话题区</el-menu-item>
                    <el-menu-item index="4-2">创建话题</el-menu-item>
                </el-submenu>
            </el-menu>
            <div class='user_info'>
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">{{email}}</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">修改密码</el-dropdown-item>
                        <el-dropdown-item command="b">注销</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      activeIndex: '1',
      email: sessionStorage.getItem('ms_email')
    }
  },
  methods: {
    gotoCommunity () {
      this.$router.push('/Home/community')
    },
    handleSelect (key, keyPath) {
      if (key === '1') { this.$router.push('/Home') };
      if (key === '2') { this.$router.push('/Home/myparcel') };
      if (key === '3') { this.$router.push('/Home/sendparcel') };
      if (key === '4-1') { this.$router.push('/Home/community') };
      if (key === '4-2') { this.$router.push('/Home/community/newtopic') };
    },
    handleCommand (command) {
      if (command === 'a') { this.$router.push('/Home/modifypassword') }
      if (command === 'b') {
        this.$router.push('/login')
        sessionStorage.clear()
      };
    }
  }
}
</script>

<style scoped>
#home{
    margin:0px;
}
.el-header{
    box-sizing: border-box;
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
.logo{
    float:left;
    text-align:center;
    width:300px;
    font-size:28px;
}
.menu{
    float:left;
}
.user_info{
    float:right;
    margin-right: 50px;
}
.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}
.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
}

</style>
