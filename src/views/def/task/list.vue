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
              <span>Tasks</span>
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
          <v-card-title class="styled-card-title">
              Tasks
              <v-spacer></v-spacer>
              <v-icon @click="filterTableColumnsDialog = true" dark small color="orange lighten-1">fa fa-cog</v-icon>
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm12 md12 lg12 xl12 style="padding:10px">
               <v-data-table dark :items="TaskItems" :headers="FilteredTaskTableHeader">
                   <template v-slot:[`item.counter`]="{item}">
                       {{TaskItems.indexOf(item)+1}}
                   </template>
                   <template v-slot:[`item.operation`]="{item}">
                       <v-tooltip bottom color="blue darken-1">
                           <template v-slot:activator="{ on, attrs }">
                               <v-btn small v-bind="attrs" v-on="on" icon @click="Accept(item)"  color="blue darken-1" light><v-icon small>fa fa-eye</v-icon></v-btn>
                           </template>
                           <span>Task details</span>
                       </v-tooltip>
                       <v-tooltip bottom color="green darken-1">
                           <template v-slot:activator="{ on, attrs }">
                               <v-btn small v-bind="attrs" v-on="on" icon @click="AssignTask(item)"  color="green darken-1" light><v-icon small>fa fa-truck</v-icon></v-btn>
                           </template>
                           <span>Assign task</span>
                       </v-tooltip>
                       <v-tooltip bottom color="purple darken-1">
                           <template v-slot:activator="{ on, attrs }">
                               <v-btn small v-bind="attrs" v-on="on" icon @click="Accept(item)"  color="purple darken-1" light><v-icon small>fa fa-redo-alt</v-icon></v-btn>
                           </template>
                           <span>Invert task</span>
                       </v-tooltip>
                       <v-tooltip bottom color="orange darken-1">
                           <template v-slot:activator="{ on, attrs }">
                               <v-btn small v-bind="attrs" v-on="on" icon @click="Accept(item)"  color="orange darken-1" light><v-icon small>fa fa-handshake-slash</v-icon></v-btn>
                           </template>
                           <span>Cancel task</span>
                       </v-tooltip>
                   </template>
                   <template v-slot:[`item.taskType`]="{item}">
                       <v-chip small color="orange darken-2">{{getTaskTypeTitle(item.type)}}</v-chip>
                   </template>
                    <template v-slot:[`item.carType`]="{item}">
                       <v-chip small color="blue darken-2">{{getWagonTitle(item.carType)}}</v-chip>
                   </template>
                   <template v-slot:[`item.sens`]="{item}">
                       <v-chip v-if="item.taskType == 1" small color="pink darken-2">{{getSenstivityTitle(item.taskOneWay.taskSenstive)}}</v-chip>
                       <v-chip v-if="item.taskType == 2" small color="pink darken-2">{{getSenstivityTitle(1)}}</v-chip>
                       <v-chip v-if="item.taskType == 3" small color="pink darken-2">{{getSenstivityTitle(2)}}</v-chip>
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
    <template>
        <v-dialog max-width="390" v-model="AssignToWagonDialog">
            <v-card style="background-color:rgba(0,0,0,0.6)">
                <v-card-title class="d-flex align-center">
                    <span class="white--text">Assign task to wagon</span>
                    <v-spacer></v-spacer>
                    <v-btn small icon @click="AssignToWagonDialog = false"><v-icon small color="red">fa fa-times</v-icon></v-btn>
                </v-card-title>
                <v-card-text style="background-color:rgba(0,0,0,0.2)">
                    <v-layout row wrap>
                        <v-flex xs12 sm12 md12 lg12 xl12 class="pa-5">
                            <v-autocomplete dense dark outlined label="Select wagon" :items="Wagons" item-text="name" item-value="id"></v-autocomplete>
                            <v-btn color="green accent-3" dark small block>Assign</v-btn>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-dialog>
    </template>
    <template>
        <v-dialog max-width="800" v-model="filterTableColumnsDialog">
            <v-card style="background-color:rgba(0,0,0,0.6)">
                <v-card-title class="d-flex align-center">
                    <span class="white--text">Filter task table columns</span>
                    <v-spacer></v-spacer>
                    <v-btn small icon @click="filterTableColumnsDialog = false"><v-icon small color="red">fa fa-times</v-icon></v-btn>
                </v-card-title>
                <v-card-text style="background-color:rgba(0,0,0,0.2)">
                    <v-layout row wrap>
                        <v-flex xs12  sm12 md12 lg12 xl12 class="pa-5 caption white--text">Available columns :</v-flex>
                        <v-flex v-for="(i,index) in TaskTableHeaders" :key="index" xs12  sm12 md4 lg4 xl4 class="pa-5">
                            <v-row>
                                <v-col cols="6" class="white--text">{{i.text}}</v-col>
                                <v-col cols="6"><v-btn @click="displayColumn(i)" small color="green darken-2" icon dark><v-icon small>fa fa-plus</v-icon></v-btn></v-col>
                            </v-row>
                        </v-flex>
                        <v-flex xs12  sm12 md12 lg12 xl12 class="pa-5 caption white--text">Displayed columns :</v-flex>
                        <v-flex v-for="(i,index) in FilteredTaskTableHeader" :key="index" xs12  sm12 md4 lg4 xl4 class="pa-5">
                            <v-row>
                                <v-col cols="6" class="white--text">{{i.text}}</v-col>
                                <v-col cols="6"><v-btn @click="hideColumn(i)" small color="red darken-2" icon dark><v-icon small>fa fa-trash</v-icon></v-btn></v-col>
                            </v-row>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-dialog>
    </template>
  </div>
</template>

<script>
const Enums = require("../../../const/enums.js");
const URL = require("../../../const/url.js");
const MSGHNDL = require("../../../components/notify.js");
const axios = require('axios');
var moment = require('moment');
moment.locales("de")
const defultFormModel = Object.freeze({
    title:"",
    isActive:true,
    id:0
});
export default {
  Name: "taskList",
  components: {
  },
  data:()=>({
      TaskTableHeaders:[
        {text:"#",value:"counter",align:"left"},
        {text:"Task Number",value:"taskNumber",align:"left"},
        {text:"Start time",value:"time",align:"left"},
        {text:"End time",value:"endTime",align:"left"},
        {text:"Task type",value:"taskType",align:"left"},
        {text:"Wagon type",value:"carType",align:"left"},
        {text:"Sensitivity",value:"sens",align:"left"},
        {text:"Operation",value:"operation",align:"left"},
        
      ],
      FilteredTaskTableHeader:[],
      breadCrumb:[
          {text: 'Dashboard',disabled: false,href: '/'},
          {text: 'Definations',link:false},
          {text: 'Task',link:false},
          {text: 'Manage tasks',disabled: false,href:'/task/list'},
      ],
      currentYear:"",
      currentMonth: "",
      currentDay: "",
      currentDayName:"",
      currentMonthName:"",
      startYear:0,
      endYear:0,
      dateId:"",
      EditTimeDialog:false,
      TaskItems:[],
      Wagons:[],
      AssignToWagonDialog:false,
      filterTableColumnsDialog:false
  }),
  async created()
  {
      this.FilteredTaskTableHeader = this.TaskTableHeaders;
     this.InitialCalendar();
     await this.LoadItems();
  },
  methods: {
      hideColumn(item)
      {
          let vm = this;
          
          vm.FilteredTaskTableHeader = vm.FilteredTaskTableHeader.filter(x=>x.value != item.value);
      },
      displayColumn(item)
      {
          let vm = this;
          if(vm.FilteredTaskTableHeader.indexOf(item) == -1)
          {
              vm.FilteredTaskTableHeader.push(item);
          }
      },
      async AssignTask(item)
      {
          let vm = this;
          vm.AssignToWagonDialog = true;
          await axios.get(URL.car.byType+item.carType).then((res)=>{
              var data = res.data;
              if(data.status)
              {
                  vm.Wagons = data.data;
              }
          }).catch((err)=>{
              MSGHNDL.ERR(err);
          });
      },
      getSenstivityTitle(id)
      {
          var types = Enums.TaskSenstive;
          var indx = types.findIndex(x=>x.value == id);
          return types[indx].text;
      },
      getWagonTitle(id)
      {
          var types = Enums.WagonTypes;
          var indx = types.findIndex(x=>x.value == id);
          return types[indx].text;
      },
      getTaskTypeTitle(id)
      {
        //   var types = Enums.TaskTypes;
        //   var indx = types.findIndex(x=>x.value == id);
        //   return types[indx].text;
        if(id == 1)
        {
            return "GO";
        }
        return "Return";
      },
      ConfirmedDeleteItem()
      {

      },
      Accept(item)
      {

      },
      async LoadItems()
      {
          let vm = this;
          await axios.get(URL.Task.listByDate+vm.dateId).then((res)=>{
                  if(MSGHNDL.resultChk(res.data))
                  {
                      console.warn("Tasks : ",res.data.data);
                     vm.TaskItems = res.data.data;
                    
                  }
                  }).catch((err)=>{
                      console.error(err);
                      MSGHNDL.ERR(err.message)
                    });
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
          await vm.LoadItems();
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
          await vm.LoadItems();
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
          await vm.LoadItems();
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
          await vm.LoadItems();
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
          await vm.LoadItems();
      },
    },
};

</script>
