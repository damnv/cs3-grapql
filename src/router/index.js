import Vue from "vue";
import VueRouter from "vue-router";
import { DEFAULT_TITLE } from "@/constants/common";
import Home from "@/pages/Home.vue";
import PlacegalleryList from "@/pages/placegallery/index";
import PlacegalleryDetail from "@/pages/placegallery/detail";
import PlacegalleryPost from "@/pages/placegallery/post";
import PlacegalleryEdit from "@/pages/placegallery/edit";
import UserHome from "@/pages/user/home";
import UserProfile from "@/pages/user/profile";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import PasswordReminder from "@/pages/auth/password-reminder";
import NotFound from "@/pages/404/index";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/placegallery",
    name: "placegallery-list",
    component: PlacegalleryList,
  },

  {
    path: "/placegallery/post",
    name: "placegallery-post",
    component: PlacegalleryPost,
  },
  {
    path: "/placegallery/edit/:id",
    name: "placegallery-edit",
    component: PlacegalleryEdit,
  },
  {
    path: "/placegallery/:id",
    name: "placegallery-detail",
    component: PlacegalleryDetail,
  },
  {
    path: "/user/home",
    name: "user-home",
    component: UserHome,
  },
  {
    path: "/user/profile/:id",
    name: "user-profile",
    component: UserProfile,
  },
  {
    path: "/auth/register",
    name: "register",
    component: Register,
  },
  {
    path: "/auth/login",
    name: "login",
    component: Login,
  },
  {
    path: "/auth/password-reminder",
    name: "password-reminder",
    component: PasswordReminder,
  },
  {
    path: "*",
    name: "not-found",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    const pageTitle = to.matched.find((item) => item.meta.title);
    if (pageTitle) window.document.title = pageTitle.meta.title;
  }

  Vue.nextTick(() => {
    window.document.title = to.meta.title || DEFAULT_TITLE;
  });

  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

export default router;
