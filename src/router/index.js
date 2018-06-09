import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Login'
    },
    {
      path: '/Login',
      component: resolve => require(['../components/Login.vue'], resolve),
      redirect: '/Login/user',
      children: [{
        path: '/Login/user',
        component: resolve => require(['../components/Userlogin.vue'], resolve)
      },
      {
        path: '/Login/admin',
        component: resolve => require(['../components/Adminlogin.vue'], resolve)
      }]
    },
    {
      path: '/Home',
      component: resolve => require(['../components/Home.vue'], resolve),
      children: [{
        path: '/Home/sendparcel',
        component: resolve => require(['../components/SendParcel.vue'], resolve)
      }, {
        path: '/Home/myparcel',
        component: resolve => require(['../components/Myparcel.vue'], resolve)
      }, {
        path: '/Home/modifypassword',
        component: resolve => require(['../components/Modifypassword.vue'], resolve)
      }, {
        path: '/Home/community',
        component: resolve => require(['../components/Community.vue'], resolve)
      }, {
        path: '/Home/community/topic',
        component: resolve => require(['../components/Topic.vue'], resolve)
      }, {
        path: '/Home/community/newtopic',
        component: resolve => require(['../components/Newtopic.vue'], resolve)
      }]
    }, {
      path: '/admin',
      component: resolve => require(['../components/Admin.vue'], resolve),
      children: [
        {
          path: '/admin/trackparcel',
          component: resolve => require(['../components/TrackParcel.vue'], resolve)
        },
        {
          path: '/admin/acceptparcel',
          component: resolve => require(['../components/Accept.vue'], resolve)
        },
        {
          path: '/admin/community',
          component: resolve => require(['../components/Community.vue'], resolve)
        }, {
          path: '/admin/community/topic',
          component: resolve => require(['../components/Topic.vue'], resolve)
        }, {
          path: '/admin/community/newtopic',
          component: resolve => require(['../components/Newtopic.vue'], resolve)
        }
      ]
      // component: resolve => require(['../components/Accept.vue'], resolve)
    }

  ]
})
