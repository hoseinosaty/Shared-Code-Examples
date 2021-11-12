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
              <span>Manage shifts</span>
          </div>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 xl12 class="pl-10 pa-2">
          <div class="form-title">
            <span>
                <v-icon class="pink--text" small>fa fa-plus</v-icon>
                Work shifts
            </span> 
            </div>
          <v-form ref="additemformref">
            <v-layout row wrap justify-space-around>
              <v-flex xs12 sm12 md5 lg5 xl5 style="padding:10px">
                <div class="caption white--text" style="display: flex;align-items: center;justify-content: right;width: 291px;">
                  <span style="padding-right:10px">Events color type : <v-chip small>{{EventColorType == false ? "Staff color":"Work type color"}}</v-chip> </span>&nbsp;
                  <v-switch @change="MonthChanged(null,true)" v-model="EventColorType"></v-switch>
                </div>
              </v-flex>
              <v-flex  xs12 sm12 md5 lg5 xl5 style="padding:10px">
                <div v-if="EventColorType" class="FlexBox" style="height:66px">
                  <div class="white--text caption">Color help:</div>
                  <div class="FlexBox"><v-chip small v-for="(index,i) in WorkDayTypes" :key="i" :color="index.color">{{index.text}}</v-chip></div>
                </div>
              </v-flex>
              <v-flex xs12 sm12 md12 lg12 xl12 class="pa-5">
                   <v-row class="fill-height">
                        <v-col>
                        <v-sheet height="64">
                            <v-toolbar
                            flat
                            >
                            <v-btn
                                outlined
                                class="mr-4"
                                color="grey darken-2"
                                @click="setToday"
                            >
                                Today
                            </v-btn>
                            <v-btn
                                fab
                                text
                                small
                                color="grey darken-2"
                                @click="prev"
                            >
                                <v-icon small>
                                fas fa-chevron-left
                                </v-icon>
                            </v-btn>
                            <v-btn
                                fab
                                text
                                small
                                color="grey darken-2"
                                @click="next"
                            >
                                <v-icon small>
                                fas fa-chevron-right
                                </v-icon>
                            </v-btn>
                            <v-toolbar-title v-if="$refs.calendar">
                                {{ $refs.calendar.title }}
                            </v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-menu
                                bottom
                                right
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    outlined
                                    color="grey darken-2"
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    <span>{{ typeToLabel[type] }}</span>
                                    <v-icon right>
                                    mdi-menu-down
                                    </v-icon>
                                </v-btn>
                                </template>
                                <v-list>
                                <v-list-item @click="type = 'day'">
                                    <v-list-item-title>Day</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="type = 'week'">
                                    <v-list-item-title>Week</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="type = 'month'">
                                    <v-list-item-title>Month</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="type = '4day'">
                                    <v-list-item-title>4 days</v-list-item-title>
                                </v-list-item>
                                </v-list>
                            </v-menu>
                            </v-toolbar>
                        </v-sheet>
                        <v-sheet height="600">
                            <v-calendar
                            ref="calendar"
                            v-model="focus"
                            color="primary"
                            :events="events"
                            :event-ripple="false"
                            event-timed="true"
                            :event-color="getEventColor"
                            :type="type"
                            locale="de"
                            @click:event="showEvent"
                            @click:more="viewDay"
                            @click:date="dayClicked"
                            @change="MonthChanged"
                            >
                          
                            </v-calendar>
                            <v-menu
                            v-model="selectedOpen"
                            :close-on-content-click="false"
                            :activator="selectedElement"
                            offset-x
                            >
                            <v-card
                                color="grey lighten-4"
                                min-width="350px"
                                flat
                            >
                                <v-toolbar
                                :color="selectedEvent.color"
                                dense flat
                                dark
                                >
                                {{selectedEvent.name}}&nbsp;-&nbsp;{{selectedEvent.dateId}}
                                </v-toolbar>
                                <v-card-text>
                                <span class="body-1" v-html="selectedEvent.details"></span>
                                </v-card-text>
                                <v-card-actions>
                                <v-btn
                                    text
                                    color="secondary"
                                    @click="selectedOpen = false"
                                >
                                    Cancel
                                </v-btn>&nbsp;
                                <v-btn
                                    text
                                    color="orange darken-3"
                                    dark
                                    @click="EditEvent(selectedEvent)"
                                >
                                    Edit
                                </v-btn>&nbsp;
                                <v-btn
                                    text
                                    color="red darken-3"
                                    dark
                                    @click="RemoveEvent(selectedEvent.id)"
                                >
                                    Remove
                                </v-btn>
                                </v-card-actions>
                            </v-card>
                            </v-menu>
                        </v-sheet>
                        </v-col>
                    </v-row>
                </v-flex>
            </v-layout>
          </v-form>
      </v-flex>
    </v-layout>
    <template><!--Add event dialog-->
      <v-dialog max-width="600px" persistent v-model="addEventDialog">
        <v-card class="bg-dark-gradient">
          <v-card-title>
            <div class="white--text body-1">{{EditMode ? "Edit event":"Add event"}}</div>
            <v-spacer></v-spacer>
            <v-icon @click="cancelEvent" color="red">fas fa-times</v-icon>
          </v-card-title>
          <v-divider dark></v-divider>
          <v-card-text class="pl-10 pa-2">
            <v-form ref="neweventformref">
              <v-layout row wrap class="pt-5">
                <v-flex xs12 sm12 md12 lg12 xl12 class="pl-10 pa-2">
                  <v-autocomplete v-model="form.employeesId" :items="userItems" item-value="userId"  label="Select user" outlined dense dark>
                    <template slot="selection" slot-scope="data">
                      {{ data.item.name}} {{data.item.family}}
                    </template>
                    <template slot="item" slot-scope="data">
                      <div>
                        <v-list-item-title v-html="`${data.item.name} ${data.item.family}`">
                        </v-list-item-title>
                      </div>
                    </template>
                  </v-autocomplete>
                </v-flex>
                <v-flex xs12 sm12 md4 lg4 xl4 class="pl-10 pa-2">
                  <v-dialog ref="starttimedialog" v-model="startTimeModal" :return-value.sync="form.stime" persistent width="290px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="form.stime" outlined dark dense label="Start time" prepend-icon="fas fa-clock" readonly v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-time-picker format="24hr" v-if="startTimeModal" v-model="form.stime" full-width>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="startTimeModal = false" >
                        Cancel
                      </v-btn>
                      <v-btn text color="primary" @click="$refs.starttimedialog.save(form.stime)">
                        OK
                      </v-btn>
                    </v-time-picker>
                  </v-dialog>
                </v-flex>
                <v-flex xs12 sm12 md4 lg4 xl4 class="pl-10 pa-2">
                  <v-dialog ref="endtimedialog" v-model="endTimeModal" :return-value.sync="form.etime" persistent width="290px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="form.etime" outlined dark dense label="End time" prepend-icon="fas fa-clock" readonly v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-time-picker  format="24hr" v-if="endTimeModal" v-model="form.etime" full-width>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="endTimeModal = false" >
                        Cancel
                      </v-btn>
                      <v-btn text color="primary" @click="$refs.endtimedialog.save(form.etime)">
                        OK
                      </v-btn>
                    </v-time-picker>
                  </v-dialog>
                </v-flex>
                <v-flex xs12 sm12 md4 lg4 xl4 class="pl-10 pa-2">
                  <v-autocomplete :items="WorkDayTypes" v-model="form.status" outlined dark dense label="Type">
                    <template v-slot:item="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-item-content v-text="data.item"></v-list-item-content>
                      </template>
                      <template v-else>
                        <v-list-item-avatar>
                          <v-chip small label :color="data.item.color"><span :style="'color:'+data.item.color">#</span></v-chip>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title v-html="data.item.text"></v-list-item-title>
                        </v-list-item-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
          <v-divider dark></v-divider>
          <v-card-actions class="d-flex justify-end">
            <v-btn small v-if="!EditMode" color="green accent-3" @click="SaveEvent" dark>Add</v-btn>
            <v-btn small v-else color="green accent-3" @click="UpdateEvent" dark>Update</v-btn>
            <v-btn small color="grey accent-3" @click="cancelEvent" dark>Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </div>
</template>

<script>
const MSGHNDL = require("../../../components/notify.js");
const URL = require("../../../const/url.js");
const Enums = require("../../../const/enums.js");
const axios = require('axios');

const defultFormModel = Object.freeze({
    name:null,
    stime:"",
    etime:"",
    start:null,
    end:'',
    color:'',
    employeesId:0,
    details:null,
    dateId:"",
    month:"",
    year:"",
    id:0,
    status:0
});
export default {
  Name: "shift",
  components: {
  },
  data:()=>({
    
      breadCrumb:[
          {text: 'Dashboard',disabled: false,href: '/'},
          {text: 'Definations',link:false},
          {text: 'Shifts',link:false},
          {text: 'Define staff shift',disabled: false,href:'/shifts/manageshift'},
      ],
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      form:Object.assign({},defultFormModel),
      addEventDialog:false,
      startTimeModal:false,
      endTimeModal:false,
      userItems:[],
      selectedDate:null,
      selectedYear:"",
      selectedMonth:"",
      savedYear:"",
      savedMonth:"",
      WorkDayTypes:Enums.WorkdayTypes,
      EventColorType:false,//false = > staff color  true = > work status color
      EditMode:false,
      EditItemId:0
     
  }),
  async created()
  {
      await this.LoadStaffs();
  },
  mounted () {
      this.$refs.calendar.checkChange()
    },
  methods: {
      async MonthChanged(data,useSavedData=false)
      {
        let vm = this;
        let year = "";
        let month = "";
        if(useSavedData == false)
        {
          year = data.start.year+'';
          month =  data.start.month+'';
          vm.savedYear = year;
          vm.savedMonth = month;
        }
        else
        {
          year = vm.savedYear;
          month = vm.savedMonth;
        }
        await axios.get(URL.shift.loadShifts+`${month}/${year}`).then((res)=>{
          if(MSGHNDL.resultChk(res.data))
          {
            console.error("Events:",res.data.data);
            var events = res.data.data;
            if(vm.EventColorType)
            {
              events.forEach(item=>{
                let stateIndx = vm.WorkDayTypes.findIndex(x=>x.value == item.status);
                item.color = vm.WorkDayTypes[stateIndx].color;
              });
            }
            vm.events = events; 
          }
        }).catch((err)=>{
          console.error(err);
          MSGHNDL.ERR(err.message)
        });
      },
      async RemoveEvent(id)
      {
        let vm = this;
        await axios.delete(URL.shift.deleteItem+"?Id="+id).then(async (res)=>{
          if(MSGHNDL.resultChk(res.data))
          {
            await vm.MonthChanged(null,true);
          }
        }).catch(err=>{

        });
        vm.selectedOpen = false;
      },
      async EditEvent(item)
      {
        let vm = this;
        vm.EditMode = true;
        vm.form = item;
        vm.selectedDate = item.dateId;
        vm.EditItemId = item.id;
        vm.addEventDialog = true;
      },
      cancelEvent()
      {
        let vm = this;
        vm.form = Object.assign({},defultFormModel);
        vm.addEventDialog = false;
        vm.EditMode = false;
      },
      async UpdateEvent()
      {
        let vm = this;
        var findByDateId = vm.events.findIndex(x=>x.dateId == vm.selectedDate && x.id != vm.EditItemId);
        if(findByDateId != -1)
        {
          if(vm.events[findByDateId].employeesId == vm.form.employeesId)
          {
            MSGHNDL.ERR("Duplicate user shift defined in current day.");
            return;
          }
        }
        vm.form.details = `from <span style="color:${vm.form.color};font-weight:bolder">${vm.form.stime}</span> to <span style="color:${vm.form.color};font-weight:bolder">${vm.form.etime}</span>` ;
        vm.form.start = vm.selectedDate+" "+vm.form.stime;
        vm.form.end = vm.selectedDate+" "+vm.form.etime;
        vm.form.dateId = vm.selectedDate;
        vm.form.timed = true;
        
         await axios.put(URL.shift.update,vm.form).then(async (res)=>{
                  if(MSGHNDL.resultChk(res.data))
                  {
                     vm.form = Object.assign({}, vm.defultFormModel);
                     vm.MonthChanged(null,true);
                  }
                  }).catch((err)=>{
                      console.error(err);
                      MSGHNDL.ERR(err.message)
                    });

        console.warn(vm.events);
        vm.cancelEvent();
      },
      async SaveEvent()
      {
        let vm = this;

        var findByDateId = vm.events.findIndex(x=>x.dateId == vm.selectedDate);
        if(findByDateId != -1)
        {
          if(vm.events[findByDateId].employeesId == vm.form.employeesId)
          {
            MSGHNDL.ERR("Duplicate user shift defined in current day.");
            return;
          }
        }
        var indx = vm.userItems.findIndex(el=>{return el.userId == vm.form.employeesId});
        vm.form.name = vm.userItems[indx].name+" "+vm.userItems[indx].family;
        vm.form.color = vm.userItems[indx].employeeColor;
        vm.form.details = `from <span style="color:${vm.form.color};font-weight:bolder">${vm.form.stime}</span> to <span style="color:${vm.form.color};font-weight:bolder">${vm.form.etime}</span>` ;
        vm.form.start = vm.selectedDate+" "+vm.form.stime;
        vm.form.end = vm.selectedDate+" "+vm.form.etime;
        vm.form.dateId = vm.selectedDate;
        vm.form.timed = true;
        vm.form.month = vm.selectedMonth;
        vm.form.year = vm.selectedYear;
        
        await axios.post(URL.shift.public,vm.form).then(async (res)=>{
                  if(MSGHNDL.resultChk(res.data))
                  {
                     vm.form = Object.assign({}, vm.defultFormModel);
                     vm.MonthChanged(null,true);
                  }
                  }).catch((err)=>{
                      console.error(err);
                      MSGHNDL.ERR(err.message)
                    });

        console.warn(vm.events);
        vm.cancelEvent();
      },
      async LoadStaffs()
      {
        var vm = this;
        await axios.get(URL.user.loadStaffs).then((res)=>{
          if(MSGHNDL.resultChk(res.data))
          {
              console.warn("Users List",res.data.data);
             vm.userItems = res.data.data;
          }
          }).catch((err)=>{
              console.error(err);
              MSGHNDL.ERR(err.message)
       });
      },
      dayClicked(day)
      {
          let vm = this;
          console.error(day);
          vm.addEventDialog = true;
          vm.selectedDate = day.date;
          vm.selectedYear  = day.year+'';
          vm.selectedMonth = day.month+'';
      },
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        console.warn(event);
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      
  }
};

</script>
