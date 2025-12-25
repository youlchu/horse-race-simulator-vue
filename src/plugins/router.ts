import { createRouter, createWebHistory } from "vue-router";
import GamePage from "@/modules/horse-race/views/GamePage.vue";
import SelectPage from "@/modules/select/views/SelectPage.vue";

const routes = [
  {
    path: "/",
    name: "Select",
    component: SelectPage,
  },
  {
    path: "/game",
    name: "Game",
    component: GamePage,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
