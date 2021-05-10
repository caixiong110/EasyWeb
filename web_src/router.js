import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import AdminLTE from 'components/AdminLTE.vue'

const Dashboard = () => import(/* webpackChunkName: 'dashboard' */ 'components/Dashboard.vue')
const PusherList = () => import(/* webpackChunkName: 'pushers' */ 'components/PusherList.vue')
const PlayerList = () => import(/* webpackChunkName: 'players' */ 'components/PlayerList.vue')
const User = () => import(/* webpackChunkName: 'user' */ 'components/User.vue')
const About = () => import(/* webpackChunkName: 'about' */ 'components/About.vue')
const NaviBar = () => import(/* webpackChunkName: 'NaviBar' */ 'components/NaviBar.vue')

//1级路由
import AboutViedo from 'components/viedoplay/AboutViedo.vue'
//const AboutViedo = () => import(/* webpackChunkName: 'AboutViedo' */ 'components/viedoplay/AboutViedo.vue')

//二级路由
import News from 'components/viedoplay/News.vue'
import Contact from 'components/viedoplay/Contact.vue'
import Donate from 'components/viedoplay/Donate.vue'
import Guide from 'components/viedoplay/Guide.vue'
//const News = () => import(/* webpackChunkName: 'News' */ 'components/viedoplay/News.vue')
//const Contact = () => import(/* webpackChunkName: 'Contact' */ 'components/viedoplay/Contact.vue')
//const Donate = () => import(/* webpackChunkName: 'Donate' */ 'components/viedoplay/Donate.vue')
//const Guide = () => import(/* webpackChunkName: 'Guide' */ 'components/viedoplay/Guide.vue')

//3级路由
import WechatDonate from 'components/viedoplay/donate/WechatDonate.vue'
import AlipayDonate from 'components/viedoplay/donate/AlipayDonate.vue'

Vue.use(Router);

const router = new Router({
    routes: [
        {
              path: 'NaviBar',
              component: NaviBar
        },
        {path: '/viedoplay',component: AboutViedo ,children :[
            {path: '/viedoplay/news',component: News},
            {path: '/viedoplay/contact',component: Contact},
            {path: '/viedoplay/donate',component: Donate,children:[
                {path: '/viedoplay/donate/wechat',component: WechatDonate},
                {path: '/viedoplay/donate/alipay',component: AlipayDonate},
                {path: '/viedoplay/donate*', redirect:'/viedoplay/donate/alipay'}
              ]
            },
            {path: '/viedoplay/guide',component: Guide},
            {path:'/viedoplay*',redirect:'/viedoplay/News'}
          ]
        }, 
        {
            path: '/',
            component: AdminLTE,
            // meta: { needLogin: true },
            children: [
                {
                    path: '',
                    component: Dashboard,
                    props: true
                }, {
                    path: 'pushers/:page?',
                    component: PusherList,
                    props: true
                }, {
                    path: 'players/:page?',
                    component: PlayerList,
                    props: true
                }, {
                    path: 'users/:page?',
                    component: User,
                    props: true                    
                }, {
                    path: 'about',
                    component: About
                }, {     
                    path: 'logout',
                    async beforeEnter(to, from, next) {
                      await store.dispatch("logout");
                      window.location.href = `/login.html`;
                    }
                }, {                                   
                    path: '*',
                    redirect: '/'
                }
            ]
        }
    ],
    linkActiveClass: 'active'
})

router.beforeEach(async (to, from, next) => {
    var userInfo = await store.dispatch("getUserInfo");
    if (!userInfo) {
        if (to.matched.some((record => {
            return record.meta.needLogin || record.meta.role;
        }))) {
            window.location.href = '/login.html';
            return;
        }
    } else {
        var roles = userInfo.roles||[];
        var menus = store.state.menus.reduce((pval, cval) => {
            pval[cval.path] = cval;
            return pval;
        },{})
        var _roles = [];
        var menu = menus[to.path];
        if(menu) {
            _roles.push(...(menu.roles||[]));
        }
        if(_roles.length > 0 && !_roles.some(val => {
            return roles.indexOf(val) >= 0;
        })) {
            return;
        }
    }
    next();
})

export default router;