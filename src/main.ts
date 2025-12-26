import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./plugins/router";
import "./assets/style.css";
import { raceStore } from "./modules/horse-race/store";

const app = createApp(App);
app.use(router);
app.use(raceStore);
app.mount("#app");
