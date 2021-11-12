import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from '../store/index'
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta:{auth:true}
  },
  {
    path: "/users/applicants",
    name: "applicants",
    meta:{auth:true},
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/def/user/applicants.vue"),
      beforeEnter:(to,from,next)=>{
        if(store.state.cpLoginModel.loggedIn == false)
        {
          next('/login');
        }
        else
        {
          next();
        }
      }
  },
  {
    path: "/users/staffs",
    name: "admin",
    meta:{auth:true},
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/def/user/admin.vue"),
      beforeEnter:(to,from,next)=>{
        if(store.state.cpLoginModel.loggedIn == false)
        {
          next('/login');
        }
        else
        {
          next();
        }
      }
  },
  {
    path: "/users/staffs/state",
    name: "staffState",
    meta:{auth:true},
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/def/user/staffstate.vue"),
      beforeEnter:(to,from,next)=>{
        if(store.state.cpLoginModel.loggedIn == false)
        {
          next('/login');
        }
        else
        {
          next();
        }
      }
  },
  {
    path: "/cars/addcar",
    name: "addcar",
    meta:{auth:true},
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/def/car/add.vue"),
      beforeEnter:(to,from,next)=>{
        if(store.state.cpLoginModel.loggedIn == false)
        {
          next('/login');
        }
        else
        {
          next();
        }
      }
  },
  {
    path: "/cars/status",
    name: "wagonState",
    meta:{auth:true},
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/def/car/state.vue"),
      beforeEnter:(to,from,next)=>{
        if(store.state.cpLoginModel.loggedIn == false)
        {
          next('/login');
        }
        else
        {
          next();
        }
      }
  },
  {
    path: "/cars/statusdriver",
    name: "wagonDriverStatus",
    meta:{auth:true},
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/def/car/statebydriver.vue"),
      beforeEnter:(to,from,next)=>{
        if(store.state.cpLoginModel.loggedIn == false)
        {
          next('/login');
        }
        else
        {
          next();
        }
      }
  },
  {
    path: "/cars/tuv",
    name: "tuvStatus",
    meta:{auth:true},
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/def/car/tuvstate.vue"),
      beforeEnter:(to,from,next)=>{
        if(store.state.cpLoginModel.loggedIn == false)
        {
          next('/login');
        }
        else
        {
          next();
        }
      }
  },
  {
    path: "/shifts/manageshift",
    name: "shift",
    meta:{auth:true},
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/def/shift/shifts.vue"),
      beforeEnter:(to,from,next)=>{
        if(store.state.cpLoginModel.loggedIn == false)
        {
          next('/login');
        }
        else
        {
          next();
        }
      }
  },
  {
    path: "/shifts/wagonshift",
    name: "wagonshift",
    meta:{auth:true},
    component: () =>
    import(/* webpackChunkName: "about" */ "../views/def/shift/wagonshift.vue"),
    beforeEnter:(to,from,next)=>{
      if(store.state.cpLoginModel.loggedIn == false)
      {
        next('/login');
      }
      else
        {
          next();
        }
    }
  },
  {
    path: "/task/titles/add",
    name: "newTaskTitle",
    meta:{auth:true},
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/def/task/tasktitle.vue"),
      beforeEnter:(to,from,next)=>{
        if(store.state.cpLoginModel.loggedIn == false)
        {
          next('/login');
        }
        else
        {
          next();
        }
      }
  },
  {
    path: "/task/placename/add",
    name: "newPlacename",
    meta:{auth:true},
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/def/task/placename.vue"),
      beforeEnter:(to,from,next)=>{
        if(store.state.cpLoginModel.loggedIn == false)
        {
          next('/login');
        }
        else
        {
          next();
        }
      }
  },
  {
    path: "/task/Jobtitle/add",
    name: "newJobtitle",
    meta:{auth:true},
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/def/task/jobtitle.vue"),
      beforeEnter:(to,from,next)=>{
        if(store.state.cpLoginModel.loggedIn == false)
        {
          next('/login');
        }
        else
        {
          next();
        }
      }
  },
  {
    path: "/task/add",
    name: "newtask",
    meta:{auth:true},
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/def/task/newtask.vue"),
      beforeEnter:(to,from,next)=>{
        if(store.state.cpLoginModel.loggedIn == false)
        {
          next('/login');
        }
        else
        {
          next();
        }
      }
  },
  {
    path: "/task/list",
    name: "tasklist",
    meta:{auth:true},
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/def/task/list.vue"),
      beforeEnter:(to,from,next)=>{
        if(store.state.cpLoginModel.loggedIn == false)
        {
          next('/login');
        }
        else
        {
          next();
        }
      }
  },
  {
    path: "/tariff/titles/add",
    name: "addTariffTitle",
    meta:{auth:true},
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/def/tariff/tarifftitles.vue"),
      beforeEnter:(to,from,next)=>{
        if(store.state.cpLoginModel.loggedIn == false)
        {
          next('/login');
        }
        else
        {
          next();
        }
      }
  },
  {
    path: "/tariff/add",
    name: "addTariff",
    meta:{auth:true},
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/def/tariff/add.vue"),
      beforeEnter:(to,from,next)=>{
        if(store.state.cpLoginModel.loggedIn == false)
        {
          next('/login');
        }
        else
        {
          next();
        }
      }
  },
  {
    path: "/other/transporttype/add",
    name: "addTransportType",
    meta:{auth:true},
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/def/other/transporttype.vue"),
      beforeEnter:(to,from,next)=>{
        if(store.state.cpLoginModel.loggedIn == false)
        {
          next('/login');
        }
        else
        {
          next();
        }
      }
  },
  {
    path: "/other/infektion/add",
    name: "addInfektion",
    meta:{auth:true},
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/def/other/infektion.vue"),
      beforeEnter:(to,from,next)=>{
        if(store.state.cpLoginModel.loggedIn == false)
        {
          next('/login');
        }
        else
        {
          next();
        }
      }
  },
  {
    path: "/desinfektion/add",
    name: "addDisinfektion",
    meta:{auth:true},
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/def/desinfektion/add.vue"),
      beforeEnter:(to,from,next)=>{
        if(store.state.cpLoginModel.loggedIn == false)
        {
          next('/login');
        }
        else
        {
          next();
        }
      }
  },
  /**IDENTITY***/
  {
    path: "/identity/role/add",
    name: "roles",
    meta:{auth:true},
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/def/Identity/role.vue"),
      // beforeEnter:(to,from,next)=>{
      //   if(store.state.cpLoginModel.loggedIn == false)
      //   {
      //     next('/login');
      //   }
      //   else
      //   {
      //     next();
      //   }
      // }
  },
  {
    path: "/identity/permission/add",
    name: "permission",
    meta:{auth:true},
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/def/Identity/permission.vue"),
      beforeEnter:(to,from,next)=>{
        if(store.state.cpLoginModel.loggedIn == false)
        {
          next('/login');
        }
        else
        {
          next();
        }
      }
  },

  /*********/
  {
    path: "/workaudit/worktime/manage",
    name: "workTimes",
    meta:{auth:true},
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/worktime/worktime.vue"),
      beforeEnter:(to,from,next)=>{
        if(store.state.cpLoginModel.loggedIn == false)
        {
          next('/login');
        }
        else
        {
          next();
        }
      }
  },
  {
    path: "/login",
    name: "login",
    meta:{auth:false},
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login.vue"),
     
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.auth) && !store.getters.cpIsLoggedIn) {
//       // You can use store variable here to access globalError or commit mutation 
//       next("/login")
//   } else {
//       next()
//   }
// })
export default router;
