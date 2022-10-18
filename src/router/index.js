import Vue from "vue";
import VueRouter from "vue-router";
import { DEFAULT_TITLE } from "@/constants/common";
import Home from "@/pages/Home.vue";
import PlacegalleryList from "@/pages/Placegallery/index";
import PlacegalleryDetail from "@/pages/Placegallery/detail";
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
    path: "/placegallery/:id",
    name: "placegallery-detail",
    component: PlacegalleryDetail,
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
