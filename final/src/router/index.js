import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/NavBar'
import Content from '@/components/Content'
import Index from '@/components/Index'
import reader from '@/components/reader/Reader'
import detail from '@/components/reader/Article'
import login from '@/components/login/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/login',
      components:{
        default:login
      }
    },
    {
      path: '/',
      name: 'Home',
      redirect:'/index',
      components: {
        default:Home,
        main:Content
      },
      children:[
        {
          path:'index',
          components:{
            default:Index
          }
        },
        {
          path:'content',
          components:{
            default:reader,
          }
        },
        {
          path:'article/:aid',
          components:{
            default:detail
          }
        }
      ]
    },
    
  ]
})
