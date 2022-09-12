import { createRouter, createWebHashHistory } from "vue-router";
import home from "../views/AppHome.vue";
import login from "../views/AppLogin.vue";
import register from "../views/AppRegister.vue";
import store from "@/store";

const routes = [
  {
    name: "HomePage",
    path: "/",
    component: home,
  },
  {
    name: "login",
    path: "/login",
    component: login,
  },
  {
    name: "register",
    path: "/register",
    component: register,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authRequiredRoutes = ["HomePage"];
  const _isAuthenticated = store.getters._isAuthenticated
  if (authRequiredRoutes.indexOf(to.name) > -1) {
    if (_isAuthenticated) next()
    else next({name:"login"})
  } else{
    next()
  }
});

router.beforeEach((to, from, next) => {
  const authRequiredRoutes = ["HomePage"];

  const _isAuthenticated = store.getters._isAuthenticated

  if ( _isAuthenticated && to.fullPath =="/login"  ) {
    next(from)
  }

  console.log(to,"to",from,"from",next,"next");


  if (authRequiredRoutes.indexOf(to.name) > -1) {
    if (_isAuthenticated) next()
    else next({name:"login"})
  } else{
    next()
  }
});



export default router;
