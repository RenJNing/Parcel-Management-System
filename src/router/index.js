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
      component: resolve => require(['../components/Login.vue'], resolve)
    },
    {
      path: '/Home',
      component: resolve => require(['../components/Home.vue'], resolve),
      children: [{
        path: '/Home/sendparcel',
        component: resolve => require(['../components/SendParcel.vue'], resolve)
      }, {
        path: '/Home/trackparcel',
        component: resolve => require(['../components/TrackParcel.vue'], resolve)
      }, {
        path: '/Home/modifypassword',
        component: resolve => require(['../components/Modifypassword.vue'], resolve)
      }]
    }
  ]
})
