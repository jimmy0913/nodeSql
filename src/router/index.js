/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import BookList from '@/components/BookList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'BookList',
      component: BookList,
      /*meta:{
      	keepAlive:true
      }*/
    },
  ]
})
