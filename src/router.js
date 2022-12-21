import TeamsList from './components/teams/TeamsList.vue';

import UsersList from './components/users/UsersList.vue';

import TeamMembers from './components/teams/TeamMembers.vue';

import NotFound from './components/nav/NotFound.vue';

import TeamsFooter from './components/teams/TeamsFooter.vue';

import UsersFooter from './components/users/UsersFooter.vue';

import {createRouter,createWebHistory} from 'vue-router';

const router=createRouter({
    history:createWebHistory(),
    routes:[
        {path:'/',redirect:'/teams'},
        {
            name:'teams',
            path:'/teams',
            meta:{
needsAuth:true
            },
            components:{
default:TeamsList,
footer:TeamsFooter
            },
            children:[
                {
                    name:'team-member',
                    path:':teamId',
                    component:TeamMembers,
                    props:true
                }
            ]
        },
        {
            path:'/users',
            components:{
                default:UsersList,
                footer:UsersFooter

            },
            beforeEnter(_,_from,next){
next();
            }
        },
        {path:'/:notFound(.*)',component:NotFound}
    ],
    linkActiveClass:'active',
    scrollBehavior(to,from,savedPosition){
        console.log(to,from,savedPosition);
        if(savedPosition){
            return savedPosition;
        }
return {left:0,top:0};
    }
}); 

router.beforeEach(function ( to,_2 ,next){
    if(to.meta.needsAuth){
        next();
    }else{
        next();
    }
    // if(to.name==='team-member'){
    //     next();
    // }else{

    //     next({name:'team-member',params:{teamId:'t2'}});
    // }
    next();
});

export default router;