import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import Notifications from 'vue-notification'
import ConfirmWarning from './components/cnfwarning.vue';
import VueMask from 'v-mask'

Vue.use(VueMask);

// Or as a directive
import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);
/*

const signalR = require("@microsoft/signalr");

let connection = new signalR.HubConnectionBuilder()
    //.withUrl("https://abadis.barayand.net/wagonwatcher")
.withUrl("http://192.168.1.8:5113/wagonwatcher")
    .build();

connection.on("TestBroad", data => {
    console.log(data);
});
connection.on("Error", data => {
    console.log("ERROR : ",data);
});
connection.on("HomeMessages", data => {
    console.log(data);
});
connection.start()
    .then(() => {connection.invoke("Connect", "GRmMKzktvm7X/lYtBz8ZreYgtYgXX8Jhf4t/xU6NS1wRNBuU+2Yt8f+BvOIUm1MtscWzbSa8rg133Sh5ACHtKq90xVUw0/SBnaAn87HBdLXN9XSYHIiR3bv+xq8Q4e/kD4b/xP7SnN/Myg59OFo8F7V6+ix1ndUCMX52z+LXcrE=");
connection.invoke("BroadcastMessage","GRmMKzktvm7X/lYtBz8ZreYgtYgXX8Jhf4t/xU6NS1wRNBuU+2Yt8f+BvOIUm1MtscWzbSa8rg133Sh5ACHtKq90xVUw0/SBnaAn87HBdLXN9XSYHIiR3bv+xq8Q4e/kD4b/xP7SnN/Myg59OFo8F7V6+ix1ndUCMX52z+LXcrE=");});

*/

import { VueMaskFilter } from 'v-mask'
Vue.filter('VMask', VueMaskFilter)
Vue.use(Notifications)
Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('c-warn',ConfirmWarning);
Vue.config.productionTip = false;
Vue.prototype.$getDateString = function(date){
  if(date == "" || date == null || date.length < 1)
  {
    return "";
  }
  var splitxp = date.split(' ');
  var splitdate = splitxp[0].split('/');
  return splitdate[2]+'-'+splitdate[0]+'-'+splitdate[1];
}
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
