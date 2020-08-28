import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', name: 'Home', component: () => import('@/views/Home') },
        { path: '/study', name: 'Study', component: () => import('@/views/Study') },
        { path: '/give-classes', name: 'Give-Classes', component: () => import('@/views/GiveClasses') }
    ]
}) 