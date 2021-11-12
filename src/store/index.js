import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cpLoginModel:{
      loggedIn:false,
      token:"",
      userModel:null
    }
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    })
  ],
  getters:{
    cpIsLoggedIn:state=>state.cpLoginModel.loggedIn,
    cpLoggedInUser:state=>state.cpLoginModel.userModel
  },
  mutations: {
    CPLOGIN(state,payload)
    {
      console.warn("PAYLOADS : ",payload,payload.token);
      state.cpLoginModel.loggedIn = true;
      state.cpLoginModel.userModel = payload
      state.cpLoginModel.token = payload.token;
    },
    CPLOGOFF(state)
    {
      state.cpLoginModel.loggedIn = false;
      state.cpLoginModel.userModel = null;
      state.cpLoginModel.token = "";
    }
  },
  actions: {
    CPLOGIN({commit},payload)
    {
      commit('CPLOGIN',payload);
    },
    CPLOGOFF({commit})
    {
      commit('CPLOGOFF');
    }
  },
  modules: {},
});
