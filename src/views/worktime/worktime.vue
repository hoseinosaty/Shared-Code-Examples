<template>
  <div>
    <div class="page-title">
        <v-breadcrumbs :items="breadCrumb">
            <template v-slot:item="{ item }">
            <v-breadcrumbs-item
                :href="item.href" :link="item.link"
                :disabled="item.disabled" 
            >
                {{ item.text }}
            </v-breadcrumbs-item>
            </template>
            <template v-slot:divider>
                <span style="color:#eee">/</span>
            </template>
        </v-breadcrumbs>
    </div>
    <v-layout row wrap justify-space-between>
      <v-flex xs12 sm12 md12 lg12 xl12 class="pl-10 pa-2">
          <div class="page-divider">
              <span>Work times</span>
          </div>
      </v-flex>
      <v-flex xs12 sm12 md3 lg3 xl3 class="pa-2">
          <v-btn small text dark class="mr-5" @click="PrevMonth()"><v-icon small>fas fa-chevron-left</v-icon></v-btn>
          <span  class="body-1 d-inline-flex justify-center align-center white--text">{{currentMonthName}} {{currentYear}}</span>
          <v-btn small text dark class="ml-5" @click="NextMonth()"><v-icon small>fas fa-chevron-right</v-icon></v-btn>
      </v-flex>
      <v-flex xs12 sm12 md3 lg3 xl3 class="pa-2 d-inline-flex align-center">
          <v-btn small text dark class="mr-5" @click="PrevDay()"><v-icon small>fas fa-chevron-left</v-icon></v-btn>
          <span class="white--text body-1">Day {{currentDay}} - {{currentDayName}}</span>
          <v-btn small text dark class="ml-5" @click="NextDay()"><v-icon small>fas fa-chevron-right</v-icon></v-btn>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 xl12 class="pl-10 pa-2">
        <v-card class="card-container">
          <v-card-title class="styled-card-title">Work times</v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm12 md12 lg12 xl12 style="padding:10px">
               <v-data-table dark :items="workItems" :headers="tariffTitleTableHeaders">
                   <template v-slot:[`item.counter`]="{item}">
                       {{workItems.indexOf(item)+1}}
                   </template>
                   <template v-slot:[`item.operation`]="{item}">
                       <v-btn small @click="Accept(item)"  color="green accent-1" light>Accept</v-btn>
                   </template>
                   <template v-slot:[`item.entertime`]="{item}">
                       <span class="body-1 mr-2">{{item.entertime}}</span><v-btn small icon @click="EditTimeDialog = true"> <v-icon  small color="blue">fas fa-edit</v-icon></v-btn>
                   </template>
                   <template v-slot:[`item.exittime`]="{item}">
                       <span class="body-1 mr-2">{{item.exittime}}</span><v-icon @click="EditTimeDialog = true" small color="blue">fas fa-edit</v-icon>
                   </template>
                   <template v-slot:[`item.excess`]="{item}">
                       <v-chip small v-if="item.excess < 0" color="red darken-1" dark>{{item.excess}}</v-chip>
                       <v-chip small v-if="item.excess > 0" color="green darken-1" dark>{{item.excess}}</v-chip>
                       <v-chip small v-if="item.excess == 0" color="grey lighten-1" light>{{item.excess}}</v-chip>
                   </template>
               </v-data-table>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <c-warn @Confirmed="ConfirmedDeleteItem" ref="warningDialog"></c-warn>
    <template>
        <v-dialog max-width="290" v-model="EditTimeDialog">
            <v-card>
                <v-card-text class="pa-0">
                    <v-time-picker full-width format="24hr"></v-time-picker>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn small color="blue" text>Update</v-btn>
                    <v-btn small @click="EditTimeDialog = false" text>Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </template>
  </div>
</template>

<script>
const Enums = require("../../const/enums.js");
const URL = require("../../const/url.js");
const MSGHNDL = require("../../components/notify.js");
const axios = require('axios');
var moment = require('moment');
moment.locales("de")
const defultFormModel = Object.freeze({
    title:"",
    isActive:true,
    id:0
});
export default {
  Name: "workTimes",
  components: {
  },
  data:()=>({
      tariffTitleTableHeaders:[
        {text:"#",value:"counter",align:"left"},
        {text:"Staff",value:"user",align:"left"},
        {text:"Role",value:"role",align:"left"},
        {text:"Time In",value:"entertime",align:"left"},
        {text:"Time Out",value:"exittime",align:"left"},
        {text:"Work Time",value:"worktime",align:"left"},
        {text:"Rest",value:"resttime",align:"left"},
        {text:"Excess/Low",value:"excess",align:"left"},
        {text:"Operation",value:"operation",align:"left"},
      ],
      breadCrumb:[
          {text: 'Dashboard',disabled: false,href: '/'},
          {text: 'Work audit',link:false},
          {text: 'Work times',link:false},
          {text: 'Manage work time',disabled: false,href:'/workaudit/worktime/manage'},
      ],
      currentYear:"",
      currentMonth: "",
      currentDay: "",
      currentDayName:"",
      currentMonthName:"",
      startYear:0,
      endYear:0,
      dateId:"",
      workItems:[
          {user:"Hosein Osati",role:"Wagon Driver",entertime:"08:00",exittime:"17:00",worktime:"36H",resttime:"06:30",excess:-4}
      ],
      EditTimeDialog:false
  }),
  async created()
  {
     this.InitialCalendar();
  },
  methods: {
      ConfirmedDeleteItem()
      {

      },
      Accept(item)
      {

      },
     async PrevMonth()
      {
          let vm = this;
          var currentDate =moment(`${vm.currentYear}-${vm.currentMonth}-${vm.currentDay}T00:00:00`);
          var nextDate = currentDate.add(-1,'M');
          vm.currentYear = nextDate.format("YYYY");
          vm.currentMonth = nextDate.format("MM");
          vm.currentMonthName = nextDate.format("MMM");
          vm.currentDay  = nextDate.format("DD");
          vm.currentDayName  = nextDate.format("ddd");
          vm.dateId = nextDate.format("YYYY-MM-DD");
      },
      async NextMonth()
      {
          let vm = this;
          var currentDate =moment(`${vm.currentYear}-${vm.currentMonth}-${vm.currentDay}T00:00:00`);
          var nextDate = currentDate.add(1,'M');
          vm.currentYear = nextDate.format("YYYY");
          vm.currentMonth = nextDate.format("MM");
          vm.currentMonthName = nextDate.format("MMM");
          vm.currentDay  = nextDate.format("DD");
          vm.currentDayName  = nextDate.format("ddd");
          vm.dateId = nextDate.format("YYYY-MM-DD");
      },
      async PrevDay()
      {
          let vm = this;
          var currentDate =moment(`${vm.currentYear}-${vm.currentMonth}-${vm.currentDay}T00:00:00`);
          var nextDate = currentDate.add(-1,'d');
          vm.currentYear = nextDate.format("YYYY");
          vm.currentMonth = nextDate.format("MM");
          vm.currentMonthName = nextDate.format("MMM");
          vm.currentDay  = nextDate.format("DD");
          vm.currentDayName  = nextDate.format("ddd");
          vm.dateId = nextDate.format("YYYY-MM-DD");
      },
      async NextDay()
      {
          let vm = this;
          var currentDate =moment(`${vm.currentYear}-${vm.currentMonth}-${vm.currentDay}T00:00:00`);
          var nextDate = currentDate.add(1,'d');
          vm.currentYear = nextDate.format("YYYY");
          vm.currentMonth = nextDate.format("MM");
          vm.currentMonthName = nextDate.format("MMM");
          vm.currentDay  = nextDate.format("DD");
          vm.currentDayName  = nextDate.format("ddd");
          vm.dateId = nextDate.format("YYYY-MM-DD");
      },
      async InitialCalendar()
      {
          let vm = this;
          var currentDate =moment();
          vm.currentYear = currentDate.format("YYYY");
          vm.currentMonth = currentDate.format("MM");
          vm.currentMonthName = currentDate.format("MMM");
          vm.currentDay  = currentDate.format("DD");
          vm.currentDayName  = currentDate.format("ddd");
          vm.dateId = currentDate.format("YYYY-MM-DD");
      },
    },
};

</script>
