import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/home-view.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/quiz",
    name: "quiz",
    component: () => import("../views/quiz-view.vue"),
  },
  {
    path: "/summary",
    name: "summary",
    component: () => import("../views/summary-view.vue"),
  },
];

const router = createRouter({
  history: createWebHistory("/quiz-app/"),
  routes,
});

export default router;
