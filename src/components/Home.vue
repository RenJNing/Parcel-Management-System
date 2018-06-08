<template>
  <div id="home">
    <el-container>
        <el-header>
            <div class='logo'>快递管理系统</div>
            <el-menu class='menu' :default-active="activeIndex" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">首页</el-menu-item>
                <el-menu-item index="2">运单查询</el-menu-item>
                <el-menu-item index="3">我要寄件</el-menu-item>
                <el-menu-item index="4">快递签收</el-menu-item>
                <el-submenu index="5">
                    <template slot="title">论坛</template>
                    <el-menu-item index="5-1">进入论坛</el-menu-item>
                    <el-menu-item index="5-2">新建帖子</el-menu-item>
                </el-submenu>
            </el-menu>
            <div class='user_info'>
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">账户</span>
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
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key === '1') { this.$router.push('/Home') };
      if (key === '2') { this.$router.push('/Home/trackparcel') };
      if (key === '3') { this.$router.push('/Home/sendparcel') };
      if (key === '5-1') { this.$router.push('/Home/community') };
      if (key === '5-2') { this.$router.push('/Home/newtopic') };
    },
    handleCommand (command) {
      if (command === 'a') { this.$router.push('/Home/modifypassword') }
      // if (command === 'b') { this.$router.push('/Home/trackparcel') };
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
