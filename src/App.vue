<template>
  <v-app>
    <v-app-bar  shrink-on-scroll dense prominent v-if="$route.name != 'login'" app color="orange-gradient-toolbar" dark flat class="app-toolbar top--zindex v-app-bar--is-scrolled" fixed>
     

      <v-spacer></v-spacer>
      
      <div class="toolbarItems">
        <input type="text" placeholder="Search dashboard"/>
        <div class="toolbarInit">
          <v-avatar size="35">
            <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            >
          </v-avatar>
          <span style="color:#0a143c">admin@abadis.de</span>
          <v-icon small class="grey--text">fas fa-chevron-down</v-icon>
        </div>
        <div class="toolbarIcon">
          <v-badge  color="red" content="4">
            <v-icon color="#0a143c" small>fa fa-bell</v-icon>
            
          </v-badge>
          <v-icon color="#0a143c" small>fa fa-cog</v-icon>
          <v-icon color="#be0d00" small>fa fa-power-off</v-icon>
        </div>
      </div>
      
      <template v-slot:extension>
        <v-slide-group show-arrows>
          <v-slide-item v-for="(user,index) in OnlineUsers" :key="index+''+user.value">
            <span class="user-state-user-item" :style="'color:'+user.color">{{user.name}} <span :class="user.status ? 'user-state-status online-state':'user-state-status offline-state'"></span></span>
          </v-slide-item>
        </v-slide-group>
      </template>
    </v-app-bar>
    <notifications reverse group="Barayand" style="direction:ltr" position="bottom right"></notifications>
    <v-navigation-drawer v-if="$route.name != 'login'" class="transparent-0" app permanent stateless fixed>
      <div class="drawer-header">
         <div class="d-flex align-center">
            <v-img
              alt="Vuetify Logo"
              class="shrink mr-2"
              contain
              :src="require('./assets/logo.png')"
              transition="scale-transition"
              width="40"
            />

            <span
              class="shrink mt-1 hidden-sm-and-down app-bar-logo-name"
              min-width="100"
            >
            Abadis
            </span>
          </div>
        </div>
        <v-list style="padding-left:8px">
          <v-list-item class="list-item-hover">
            <v-list-item-icon>
              <v-icon class="list-item-icon-color">fa fa-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="list-item-text-color">Dashboard</v-list-item-title>
          </v-list-item>
          <v-list-group :value="true" active-class="list-item-hover">
              <template v-slot:prependIcon>
                <v-icon class="list-item-icon-color">fas fa-cogs</v-icon>
              </template>
              <template v-slot:appendIcon>
                <v-icon class="list-item-icon-color" small>fas fa-chevron-down</v-icon>
              </template>
              <template v-slot:activator>
                <v-list-item-title class="list-item-text-color">Definations</v-list-item-title>
              </template>

              <v-list-item-group class="list-item-expanded">
                <v-list-group :value="true"  sub-group>
                  <template v-slot:prependIcon>
                    <v-icon small class="list-item-icon-color">fas fa-chevron-down</v-icon>
                  </template>
                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title class="list-item-text-color">Identity</v-list-item-title>
                    </v-list-item-content>
                  </template>
                  <v-list-item link href="/identity/role/add">
                    <v-list-item-icon>
                      <v-icon class="list-item-icon-color" x-small>fas fa-chevron-right</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="list-item-text-color">Roles</v-list-item-title>
                  </v-list-item>
                  <v-list-item link href="/identity/permission/add">
                    <v-list-item-icon>
                      <v-icon class="list-item-icon-color" x-small>fas fa-chevron-right</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="list-item-text-color">Role permissions</v-list-item-title>
                  </v-list-item>
                </v-list-group>
                <v-list-group :value="true"  sub-group>
                  <template v-slot:prependIcon>
                    <v-icon small class="list-item-icon-color">fas fa-chevron-down</v-icon>
                  </template>
                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title class="list-item-text-color">Employees</v-list-item-title>
                    </v-list-item-content>
                  </template>
                  <v-list-item link href="/users/staffs">
                    <v-list-item-icon>
                      <v-icon class="list-item-icon-color" x-small>fas fa-chevron-right</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="list-item-text-color">Employees</v-list-item-title>
                  </v-list-item>
                  <v-list-item link href="/users/staffs/state">
                    <v-list-item-icon>
                      <v-icon class="list-item-icon-color" x-small>fas fa-chevron-right</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="list-item-text-color">Employee state</v-list-item-title>
                  </v-list-item>
                </v-list-group>
                <v-list-group :value="false"  sub-group>
                  <template v-slot:prependIcon>
                    <v-icon small class="list-item-icon-color">fas fa-chevron-down</v-icon>
                  </template>
                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title class="list-item-text-color">Wagons</v-list-item-title>
                    </v-list-item-content>
                  </template>
                  <v-list-item link href="/cars/addcar">
                    <v-list-item-icon>
                      <v-icon class="list-item-icon-color" x-small>fas fa-chevron-right</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="list-item-text-color">Define wagon</v-list-item-title>
                  </v-list-item>
                  <v-list-item link href="/cars/status">
                    <v-list-item-icon>
                      <v-icon class="list-item-icon-color" x-small>fas fa-chevron-right</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="list-item-text-color">Wagon state</v-list-item-title>
                  </v-list-item>
                  <v-list-item link href="/cars/tuv">
                    <v-list-item-icon>
                      <v-icon class="list-item-icon-color" x-small>fas fa-chevron-right</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="list-item-text-color">TÜV state</v-list-item-title>
                  </v-list-item>
                  <v-list-item link href="/cars/statusdriver">
                    <v-list-item-icon>
                      <v-icon class="list-item-icon-color" x-small>fas fa-chevron-right</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="list-item-text-color">Wagon and driver status</v-list-item-title>
                  </v-list-item>
                </v-list-group>
                <v-list-group :value="false"  sub-group>
                  <template v-slot:prependIcon>
                    <v-icon small class="list-item-icon-color">fas fa-chevron-down</v-icon>
                  </template>
                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title class="list-item-text-color">Desinfektion</v-list-item-title>
                    </v-list-item-content>
                  </template>
                  <v-list-item link href="/desinfektion/add">
                    <v-list-item-icon>
                      <v-icon class="list-item-icon-color" x-small>fas fa-chevron-right</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="list-item-text-color">Define desinfektion</v-list-item-title>
                  </v-list-item>
                </v-list-group>
                <v-list-group :value="false"  sub-group>
                  <template v-slot:prependIcon>
                    <v-icon small class="list-item-icon-color">fas fa-chevron-down</v-icon>
                  </template>
                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title class="list-item-text-color">Tarrifs</v-list-item-title>
                    </v-list-item-content>
                  </template>
                  <v-list-item link href="/tariff/titles/add">
                    <v-list-item-icon>
                      <v-icon class="list-item-icon-color" x-small>fas fa-chevron-right</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="list-item-text-color">Define tarrif titles</v-list-item-title>
                  </v-list-item>
                  <v-list-item link href="/tariff/add">
                    <v-list-item-icon>
                      <v-icon class="list-item-icon-color" x-small>fas fa-chevron-right</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="list-item-text-color">Define tarrif</v-list-item-title>
                  </v-list-item>
                </v-list-group>
                <v-list-group :value="false"  sub-group>
                  <template v-slot:prependIcon>
                    <v-icon small class="list-item-icon-color">fas fa-chevron-down</v-icon>
                  </template>
                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title class="list-item-text-color">Tasks</v-list-item-title>
                    </v-list-item-content>
                  </template>
                  <v-list-item link href="/task/placename/add">
                    <v-list-item-icon>
                      <v-icon class="list-item-icon-color" x-small>fas fa-chevron-right</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="list-item-text-color">Define placename</v-list-item-title>
                  </v-list-item>
                  <v-list-item link href="/task/Jobtitle/add">
                    <v-list-item-icon>
                      <v-icon class="list-item-icon-color" x-small>fas fa-chevron-right</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="list-item-text-color">Define Jobtitle</v-list-item-title>
                  </v-list-item>
                  <v-list-item link href="/task/titles/add">
                    <v-list-item-icon>
                      <v-icon class="list-item-icon-color" x-small>fas fa-chevron-right</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="list-item-text-color">Make new task title</v-list-item-title>
                  </v-list-item>
                  <v-list-item link href="/task/add">
                    <v-list-item-icon>
                      <v-icon class="list-item-icon-color" x-small>fas fa-chevron-right</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="list-item-text-color">Make new task</v-list-item-title>
                  </v-list-item>
                  <v-list-item link href="/task/list">
                    <v-list-item-icon>
                      <v-icon class="list-item-icon-color" x-small>fas fa-chevron-right</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="list-item-text-color">Task list</v-list-item-title>
                  </v-list-item>
                </v-list-group>
                <v-list-group :value="false"  sub-group>
                  <template v-slot:prependIcon>
                    <v-icon small class="list-item-icon-color">fas fa-chevron-down</v-icon>
                  </template>
                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title class="list-item-text-color">Other</v-list-item-title>
                    </v-list-item-content>
                  </template>
                  <v-list-item link href="/other/transporttype/add">
                    <v-list-item-icon>
                      <v-icon class="list-item-icon-color" x-small>fas fa-chevron-right</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="list-item-text-color">Transport type</v-list-item-title>
                  </v-list-item>
                  <v-list-item link href="/other/infektion/add">
                    <v-list-item-icon>
                      <v-icon class="list-item-icon-color" x-small>fas fa-chevron-right</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="list-item-text-color">Infektion</v-list-item-title>
                  </v-list-item>
                </v-list-group>
                <v-list-group :value="true"  sub-group>
                  <template v-slot:prependIcon>
                    <v-icon small class="list-item-icon-color">fas fa-chevron-down</v-icon>
                  </template>
                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title class="list-item-text-color">Users</v-list-item-title>
                    </v-list-item-content>
                  </template>
                  <v-list-item link href="/users/applicants">
                    <v-list-item-icon>
                      <v-icon class="list-item-icon-color" x-small>fas fa-chevron-right</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="list-item-text-color">Applicants</v-list-item-title>
                  </v-list-item>
                  <v-list-item link href="/users/staffs/state">
                    <v-list-item-icon>
                      <v-icon class="list-item-icon-color" x-small>fas fa-chevron-right</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="list-item-text-color">Employee state</v-list-item-title>
                  </v-list-item>
                </v-list-group>
              </v-list-item-group>
              
          </v-list-group>


          <v-list-group :value="false" active-class="list-item-hover">
              <template v-slot:prependIcon>
                <v-icon class="list-item-icon-color">fas fa-grip-vertical</v-icon>
              </template>
              <template v-slot:appendIcon>
                <v-icon class="list-item-icon-color" small>fas fa-chevron-down</v-icon>
              </template>
              <template v-slot:activator>
                <v-list-item-title class="list-item-text-color">Work audit</v-list-item-title>
              </template>

              <v-list-item-group class="list-item-expanded">
                <v-list-group :value="false"  sub-group>
                  <template v-slot:prependIcon>
                    <v-icon small class="list-item-icon-color">fas fa-chevron-down</v-icon>
                  </template>
                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title class="list-item-text-color">Work shift</v-list-item-title>
                    </v-list-item-content>
                  </template>
               
                  <v-list-item link href="/shifts/wagonshift">
                    <v-list-item-icon>
                      <v-icon class="list-item-icon-color" x-small>fas fa-chevron-right</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="list-item-text-color">Define entities shift</v-list-item-title>
                  </v-list-item>
                </v-list-group>
                <v-list-group :value="false"  sub-group>
                  <template v-slot:prependIcon>
                    <v-icon small class="list-item-icon-color">fas fa-chevron-down</v-icon>
                  </template>
                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title class="list-item-text-color">Work time</v-list-item-title>
                    </v-list-item-content>
                  </template>
                  <v-list-item link href="/workaudit/worktime/manage">
                    <v-list-item-icon>
                      <v-icon class="list-item-icon-color" x-small>fas fa-chevron-right</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="list-item-text-color">Manage</v-list-item-title>
                  </v-list-item>
                </v-list-group>
              </v-list-item-group>
              
          </v-list-group>
          <v-list-group v-if="43 == 33" :value="false" active-class="list-item-hover">
              <template v-slot:prependIcon>
                <v-icon class="list-item-icon-color">fas fa-tasks</v-icon>
              </template>
              <template v-slot:appendIcon>
                <v-icon class="list-item-icon-color" small>fas fa-chevron-down</v-icon>
              </template>
              <template v-slot:activator>
                <v-list-item-title class="list-item-text-color">Tasks</v-list-item-title>
              </template>

              <v-list-item-group class="list-item-expanded">
                <v-list-group :value="false"  sub-group>
                  <template v-slot:prependIcon>
                    <v-icon small class="list-item-icon-color">fas fa-chevron-down</v-icon>
                  </template>
                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title class="list-item-text-color">Work shift</v-list-item-title>
                    </v-list-item-content>
                  </template>
                  <v-list-item link>
                    <v-list-item-icon>
                      <v-icon class="list-item-icon-color" x-small>fas fa-chevron-right</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="list-item-text-color">Define shift</v-list-item-title>
                  </v-list-item>
                  <v-list-item link>
                    <v-list-item-icon>
                      <v-icon class="list-item-icon-color" x-small>fas fa-chevron-right</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="list-item-text-color">Employee function</v-list-item-title>
                  </v-list-item>
                </v-list-group>
                <v-list-group :value="false"  sub-group>
                  <template v-slot:prependIcon>
                    <v-icon small class="list-item-icon-color">fas fa-chevron-down</v-icon>
                  </template>
                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title class="list-item-text-color">Vacations</v-list-item-title>
                    </v-list-item-content>
                  </template>
                  <v-list-item link>
                    <v-list-item-icon>
                      <v-icon class="list-item-icon-color" x-small>fas fa-chevron-right</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="list-item-text-color">Leave requests</v-list-item-title>
                  </v-list-item>
                  <v-list-item link>
                    <v-list-item-icon>
                      <v-icon class="list-item-icon-color" x-small>fas fa-chevron-right</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="list-item-text-color">Report</v-list-item-title>
                  </v-list-item>
                </v-list-group>
              </v-list-item-group>
              
          </v-list-group>
        </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import './assets/css/font.css';
import './assets/css/style.css';
import './assets/css/color-def.css';
export default {
  name: "App",

  data: () => ({
    ActiveDetails : true,
    OnlineUsers:[
      {name:"Admin" ,color:"purple" , value:1 , status:true},
      {name:"Kate" ,color:"pink" , value:2 , status:false},

    ]
    //
  }),
  beforeRouteEnter:function(to,from,next)
  {
    console.error("TO ",to);
    if(to.path == "login")
    {
      alert("Login page")
    }
  }
};
</script>
