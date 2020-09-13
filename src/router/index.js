import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../components/Home";
import ContactInfo from "../components/ContactInfo";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/contacts/:id",
    name: "ContactInfo",
    component: ContactInfo,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
