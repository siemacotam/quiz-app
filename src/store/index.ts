import { createStore } from "vuex";
import { initState } from "./const";
import { mutations } from "./mutations";
import { getters } from "./getters";

export default createStore({
  state: initState,
  mutations,
  actions: {},
  getters,
});
