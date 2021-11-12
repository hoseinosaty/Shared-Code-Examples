<template>
  <div>
    <div class="page-title">
      <v-breadcrumbs :items="breadCrumb">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item :href="item.href" :link="item.link" :disabled="item.disabled">
            {{ item.text }}
          </v-breadcrumbs-item>
        </template>
        <template v-slot:divider>
          <span style="color: #eee">/</span>
        </template>
      </v-breadcrumbs>
    </div>
    <v-layout row wrap justify-space-between>
      <v-flex xs12 sm12 md12 lg12 xl12 class="pa-7">
        <div class="page-divider">
          <span>Manage shifts</span>
        </div>
      </v-flex>
      <v-flex  xs12 sm12 md12 lg12 xl12 class="pa-10">
          <v-layout row wrap>
              <v-flex xs12 sm12 md3 lg3 xl3 class="pa-2"><!--Date selection-->
                <v-row>
                  <v-col cols="6">
                    <v-dialog ref="startDateSelectDialog" v-model="startDateSelectDialogModal" :return-value.sync="startDate" persistent width="290px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field v-model="startDate" dark outlined dense label="From date" readonly v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker locale="de" v-model="startDate" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="startDateSelectDialogModal = false">
                            Cancel
                          </v-btn>
                          <v-btn text color="primary" @click="$refs.startDateSelectDialog.save(startDate)">
                            OK
                          </v-btn>
                        </v-date-picker>
                    </v-dialog>
                  </v-col>
                  <v-col cols="6">
                    <v-dialog ref="endDateSelectDialog" v-model="endDateSelectDialogModal" :return-value.sync="endDate" persistent width="290px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field v-model="endDate" dark outlined dense label="To date" readonly v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker locale="de" :min="startDate" v-model="endDate" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="endDateSelectDialogModal = false">
                            Cancel
                          </v-btn>
                          <v-btn text color="primary" @click="drawCalendar">
                            OK
                          </v-btn>
                        </v-date-picker>
                    </v-dialog>
                  </v-col>
                </v-row>
              </v-flex><!--End Date Selection-->
              <v-flex xs12 sm12 md3 lg3 xl3 class="pa-2">
                <v-row>
                  <v-col cols="6">
                    <v-dialog ref="startTimeDialog" v-model="startTimeDialogModal" :return-value.sync="startTime" persistent width="290px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field v-model="startTime" dark outlined dense label="Start time" readonly v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-time-picker format="24hr" v-if="startTimeDialogModal" v-model="startTime" full-width >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="startTimeDialogModal = false">
                            Cancel
                          </v-btn>
                          <v-btn text color="primary" @click="$refs.startTimeDialog.save(startTime)">
                            OK
                          </v-btn>
                        </v-time-picker>
                    </v-dialog>
                  </v-col>
                  <v-col cols="6">
                    <v-dialog ref="endTimeDialog" v-model="endTimeDialogModal" :return-value.sync="endTime" persistent width="290px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field v-model="endTime" dark outlined dense label="End time" readonly v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-time-picker format="24hr" :min="startTime" v-if="endTimeDialogModal" v-model="endTime" full-width >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="endTimeDialogModal = false">
                            Cancel
                          </v-btn>
                          <v-btn text color="primary" @click="$refs.endTimeDialog.save(endTime)">
                            OK
                          </v-btn>
                        </v-time-picker>
                    </v-dialog>
                  </v-col>
                </v-row>
              </v-flex>

              <v-flex xs12 sm12 md4 lg4 xl4 class="pa-2 d-inline-flex align-center">
                  <span class="white--text caption pr-2">Wagon Type:</span>
                  <v-btn-toggle @change="drawCalendar" dense background-color="transparent" mandatory dark  v-model="WagonType" active-class="body-1 bg-green-gradient">
                      <v-btn text :value="i.value" v-for="(i,index) in WagonTypesEnum" :key="index" small>{{i.text}}</v-btn>
                      <v-btn text value="4" small>Disponent</v-btn>
                  </v-btn-toggle>
              </v-flex>

              <v-flex xs12 sm12 md2 lg2 xl2 class="pa-2 d-inline-flex align-center">
                <v-btn v-print="'#printWagon'" small block color="purple accent-3"  dark><v-icon class="pr-5" small>fa fa-print</v-icon>Print</v-btn>
              </v-flex>

              <v-flex  v-if="WagonType != 4" xs12 sm12 md12 lg12 class="pa-2">
                <div id="printWagon" style="display:flex;width:100%;height:100%">
                                    <table border="1px" bordercolor="#fff" class="table-full-width">
                      <v-btn class="mb-5" @click="SaveShift()" block color="green accent-3" dark><v-icon small class="pr-5">fa fa-check</v-icon>Save</v-btn>
                      
                      <tr style="height:50px;vertical-align: middle">
                          <th scope="col" class="text-center  white--text max-width-30">Day</th>
                          <th scope="col" class="text-center white--text  max-width-50" v-for="(i,index) in TableHorizontalHeaders" :key="index">{{i.name}}</th>
                      </tr>
                      <tr style="height:50px;vertical-align: middle;" :class="i.holiday ? 'holiday-row' : ''" v-for="(i,index) in Days" :key="index">
                          <td class="white--text text-center max-width-30">
                            <div class="">{{i.dayName}}</div>
                            <span class="body-1">{{i.day}}</span>&nbsp;
                            <v-menu rounded offset-y>
                              <template v-slot:activator="{ attrs, on }">
                                <v-icon small color="white" v-bind="attrs" v-on="on">fa fa-caret-down</v-icon>
                              </template>
                              <div style="padding:5px;background:#fff;width:120px">
                                <v-checkbox label="Holiday" @change="SetHolidy(i.date,i.holiday)" v-model="i.holiday" light></v-checkbox>
                              </div>
                            </v-menu>
                            <div class="td-caption" v-if="i.holiday">HOLIDAY</div>
                          </td>
                          <td class="max-width-50 pa-5 " v-for="(j,jndex) in TableVerticalHeaders[index]" :key="jndex">
                            <v-row>
                              <v-col cols="6">
                                <v-dialog :ref="'startTimeDialog'+index+''+jndex" v-model="DynamicModels['startTimeDialogModal'+index+''+jndex]" :return-value.sync="j.startTime" persistent width="290px">
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field v-model="j.startTime" dark outlined dense label="Start time" readonly v-bind="attrs" v-on="on"></v-text-field>
                                    </template>
                                    <v-time-picker :min="startTime" :max="endTime" format="24hr" v-if="DynamicModels['startTimeDialogModal'+index+''+jndex]" v-model="j.startTime" full-width >
                                      <v-spacer></v-spacer>
                                      <v-btn text color="primary" @click="DynamicModels['startTimeDialogModal'+index+''+jndex] = false">
                                        Cancel
                                      </v-btn>
                                      <v-btn text color="primary" @click="$refs['startTimeDialog'+index+''+jndex][0].save(j.startTime)">
                                        OK
                                      </v-btn>
                                    </v-time-picker>
                                </v-dialog>
                              </v-col>
                              <v-col cols="6">
                                <v-dialog :ref="'endTimeDialog'+jndex+''+index" v-model="DynamicModels['endTimeDialogModal'+jndex+''+index]" :return-value.sync="j.endTime" persistent width="290px">
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field v-model="j.endTime" dark outlined dense label="End time" readonly v-bind="attrs" v-on="on"></v-text-field>
                                    </template>
                                    <v-time-picker  :max="endTime" format="24hr" :min="j.startTime" v-if="DynamicModels['endTimeDialogModal'+jndex+''+index]" v-model="j.endTime" full-width >
                                      <v-spacer></v-spacer>
                                      <v-btn text color="primary" @click="DynamicModels['endTimeDialogModal'+jndex+''+index] = false">
                                        Cancel
                                      </v-btn>
                                      <v-btn text color="primary" @click="$refs['endTimeDialog'+jndex+''+index][0].save(j.endTime)">
                                        OK
                                      </v-btn>
                                    </v-time-picker>
                                </v-dialog>
                              </v-col>
                              <v-col :cols="[2,3].includes(WagonType) ? '6':'12'" class="relative-pos">
                                
                                <div class="user-color-displayer" >
                                    <v-autocomplete :background-color="getUserColor(j.firstDriver)+' !important'" v-model="j.firstDriver" @change="FilterUsers(j.firstDriver,TableVerticalHeaders[index][jndex],1)" solo-inverted dark label="First driver" dense :items="UserList" item-value="id" item-text="name"></v-autocomplete>
                                </div>
                              </v-col>
                              <v-col v-if="[2,3].includes(WagonType)" cols="6" class="relative-pos">
                                <div class="user-color-displayer">
                                  <v-autocomplete :background-color="getUserColor(j.secondDriver)+' !important'" @change="FilterUsers(j.secondDriver,TableVerticalHeaders[index][jndex],2)"  :color="getUserColor(j.secondDriver)" v-model="j.secondDriver" solo-inverted dark label="Second driver" dense :items="UserList" item-value="id" item-text="name"></v-autocomplete>
                                </div>
                              </v-col>
                            </v-row>
                            
                          </td>
                      </tr>
                  </table>

                </div>
              </v-flex>


              <v-flex id="printUser" v-if="WagonType == 4" xs12 sm12 md12 lg12 class="pa-2" style="overflow: hidden;overflow-x: auto;max-width: 100%;">
                  <table border="1px" bordercolor="#fff" class="table-full-width">
                      <v-btn class="mb-5" @click="SaveShift()" block color="green accent-3" dark><v-icon small class="pr-5">fa fa-check</v-icon>Save</v-btn>
                      
                      <tr style="height:50px;vertical-align: middle">
                          <th scope="col" class="text-center  white--text max-width-30">Day</th>
                          <th scope="col" class="text-center white--text  max-width-50" v-for="(i,index) in UserList" :key="index">{{i.name}}</th>
                      </tr>
                      <tr style="height:50px;vertical-align: middle;" :class="i.holiday ? 'holiday-row' : ''" v-for="(i,index) in Days" :key="index">
                          <td class="white--text text-center max-width-30">
                            <div class="">{{i.dayName}}</div>
                            <span class="body-1">{{i.day}}</span>&nbsp;
                            <v-menu rounded offset-y>
                              <template v-slot:activator="{ attrs, on }">
                                <v-icon small color="white" v-bind="attrs" v-on="on">fa fa-caret-down</v-icon>
                              </template>
                              <div style="padding:5px;background:#fff;width:120px">
                                <v-checkbox label="Holiday" @change="SetHolidy(i.date,i.holiday)" v-model="i.holiday" light></v-checkbox>
                              </div>
                            </v-menu>
                            <div class="td-caption" v-if="i.holiday">HOLIDAY</div>
                          </td>
                          <td class="max-width-50 pa-5 " v-for="(j,jndex) in TableVerticalHeaders[index]" :key="jndex">
                            <v-row>
                              <v-col cols="6">
                                <v-dialog :ref="'startTimeDialog'+index+''+jndex" v-model="DynamicModels['startTimeDialogModal'+index+''+jndex]" :return-value.sync="j.startTime" persistent width="290px">
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field v-model="j.startTime" dark outlined dense label="Start time" readonly v-bind="attrs" v-on="on"></v-text-field>
                                    </template>
                                    <v-time-picker :min="startTime" :max="endTime" format="24hr" v-if="DynamicModels['startTimeDialogModal'+index+''+jndex]" v-model="j.startTime" full-width >
                                      <v-spacer></v-spacer>
                                      <v-btn text color="primary" @click="DynamicModels['startTimeDialogModal'+index+''+jndex] = false">
                                        Cancel
                                      </v-btn>
                                      <v-btn text color="primary" @click="$refs['startTimeDialog'+index+''+jndex][0].save(j.startTime)">
                                        OK
                                      </v-btn>
                                    </v-time-picker>
                                </v-dialog>
                              </v-col>
                              <v-col cols="6">
                                <v-dialog :ref="'endTimeDialog'+jndex+''+index" v-model="DynamicModels['endTimeDialogModal'+jndex+''+index]" :return-value.sync="j.endTime" persistent width="290px">
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field v-model="j.endTime" dark outlined dense label="End time" readonly v-bind="attrs" v-on="on"></v-text-field>
                                    </template>
                                    <v-time-picker :max="endTime" format="24hr" :min="j.startTime" v-if="DynamicModels['endTimeDialogModal'+jndex+''+index]" v-model="j.endTime" full-width >
                                      <v-spacer></v-spacer>
                                      <v-btn text color="primary" @click="DynamicModels['endTimeDialogModal'+jndex+''+index] = false">
                                        Cancel
                                      </v-btn>
                                      <v-btn text color="primary" @click="$refs['endTimeDialog'+jndex+''+index][0].save(j.endTime)">
                                        OK
                                      </v-btn>
                                    </v-time-picker>
                                </v-dialog>
                              </v-col>
                              <v-col cols="12" class="relative-pos">
                                <div class="user-color-displayer">
                                  <v-autocomplete :background-color="getUserColor(j.employeesId)+' !important'" @change="FilterUsers(j.employeesId,index)"  :color="getUserColor(j.employeesId)" v-model="j.employeesId" solo-inverted dark label="Empolyee" dense :items="UserRepository[index]" item-value="id" item-text="name"></v-autocomplete>
                                </div>
                              </v-col>
                            </v-row>
                            
                          </td>
                      </tr>
                  </table>
              </v-flex>

          </v-layout>
      </v-flex>
    </v-layout>

  </div>
</template>
<script>
const defultFormModel = Object.freeze({
    name:null,
    start:"",
    end:"",
    startTime:null,
    endTime:'',
    color:'',
    employeeId:0,
    details:null,
    dateId:"",
    month:"",
    year:"",
    day:"",
    id:0,
    carId:0,
    secendEmployeeId:0,
    category:null
});
const MSGHNDL = require("../../../components/notify.js");
const URL = require("../../../const/url.js");
const Enums = require("../../../const/enums.js");
const axios = require('axios');
import print from 'vue-print-nb'
var moment = require('moment');
require('moment/locale/de');
moment.locales("de")
export default {
  directives: {
    print   
},
  name: "wagonshift",
  data:()=>({
      breadCrumb:[
          {text: 'Dashboard',disabled: false,href: '/'},
          {text: 'Definations',link:false},
          {text: 'Shifts',link:false},
          {text: 'Define entities shift',disabled: false,href:'/shifts/wagonshift'},
      ],
      WagonType:4,
      WagonTypesEnum:Enums.WagonTypes,
      UserTableHorizontalHeaders:[
        {name:'Early',value:1},
        {name:'Middle',value:3},
        {name:'Late',value:3},
      ],
      TableHorizontalHeaders:[
         
      ],
      TableVerticalHeaders:[
      ],
      events:[
      ],
      currentYear:"",
      currentMonth: "",
      currentDay: "",
      currentDayName:"",
      currentMonthName:"",
      startYear:0,
      endYear:0,
      dateId:"",
      addEventDialog:false,
      startTimeModal:false,
      endTimeModal:false,
      EditMode:false,
      EditItemId:0,
      form:Object.assign({},defultFormModel),
      events:[],
      startDateSelectDialogModal:false,
      endDateSelectDialogModal:false,
      startDate:"",
      endDate:"",
      startTimeDialogModal:false,
      endTimeDialogModal:false,
      startTime:"",
      endTime:"",
      UserList:[],
      Days:[],
      DynamicModels:[],
      UserRepository:[],
      SelectedUserIds:[]
  }),
  async created(){
      this.InitialCalendar();
  },
  methods:{
    invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // http://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
},
    FilterUsers(id,index)
    {
      let vm = this;
      vm.UserRepository[index].forEach(x=>{
        if(x.id == id)
        {
          x.disabled = true;
        }
      });
      vm.disableUserIds();
    },
    disableUserIds()
    {
      let vm = this;
      var userIds = [];
      vm.TableVerticalHeaders.forEach(item=>{
        item.map(function(i){
          userIds.push(i.firstDriver);
          userIds.push(i.secondDriver);
        })
      });
      // vm.UserList.forEach(item=>{
      //   if(userIds.includes(item.id))
      //   {
      //     item.disabled = true;
      //   }
      // });
    },
    SetHolidy(date,value)
    {
      let vm = this;
      vm.TableVerticalHeaders.forEach(item => {
        
        var indx = item.findIndex(x=>x.dateId == date);
        if(indx != -1)
        {
          item.forEach(i=>{console.warn("I Item : ",i); i.isHoliday = value;})
        }
        console.warn(item);
      });
    },
    async getStaffsShifts(sd,ed)
    {
      let vm = this;
      vm.TableVerticalHeaders = [];
      await axios.get(URL.shift.loadShifts+sd+"/"+ed).then(async (res)=>{
          if(MSGHNDL.resultChk(res.data))
          {
            console.warn(res.data.data);
            console.warn("Day List Before Staffs shift Loaded : ", vm.Days);
            vm.TableVerticalHeaders = res.data.data;

             vm.Days.forEach(item=>{
               vm.TableVerticalHeaders.forEach(xitem=>{
                 xitem.forEach(yitem=>{
                   if(yitem.dateId == item.date)
                   {
                     item.holiday = yitem.isHoliday;
                   }
                 });
               });
             });
             console.warn("Day List After Staffs shift Loaded : ", vm.Days);
          }
          }).catch((err)=>{
              console.error(err);
              MSGHNDL.ERR(err.message)
       });
    },
    async getWagonShifts(sd,ed)
    {
      let vm = this;
      vm.TableVerticalHeaders = [];
      await axios.get(URL.WagonShift.loadRange+"/"+sd+"/"+ed+"/"+vm.WagonType).then(async (res)=>{
          if(MSGHNDL.resultChk(res.data))
          {
            console.warn(res.data.data);
             vm.TableVerticalHeaders = res.data.data;

             vm.Days.forEach(item=>{
               vm.TableVerticalHeaders.forEach(xitem=>{
                 xitem.forEach(yitem=>{
                   if(yitem.dateId == item.date)
                   {
                     item.holiday = yitem.isHoliday;
                   }
                 });
               });
             });
             vm.disableUserIds();
          }
          }).catch((err)=>{
              console.error(err);
              MSGHNDL.ERR(err.message)
       });
    },
    async SaveShift()
    {
      let vm = this;
      console.clear();
      console.warn(vm.TableVerticalHeaders);
      await vm.SaveEvent();
    },
    getUserColor(id)
    {
      let vm = this;
      if(id != 0)
      {
       
      
          var indx = vm.UserList.findIndex(x=> x.id == id);
          console.warn("INDEX    ",indx);
          if(indx != -1)
          {
            return vm.UserList[indx].employeeColor
          }
       
        console.warn("USER LISTTTTTTTTTTT : ",vm.UserList);
        
      }
      return "transparent";
    },
    getDaysBetweenTwoDate(startDate, endDate) {
        var now = startDate.clone(), dates = [];
  
        while (now.isSameOrBefore(endDate)) {
            dates.push(now.format('YYYY-MM-DD'));
            now.add(1, 'days');
        }
        console.warn(dates);
        return dates;
    },
    async drawCalendar()
    {
      let vm = this;
      vm.$refs.endDateSelectDialog.save(vm.endDate);
      vm.UserList = [];
      if(vm.startDate != null && vm.startDate != "" && vm.endDate != null && vm.endDate != "")
        {
      var dates = vm.getDaysBetweenTwoDate(moment(vm.startDate),moment(vm.endDate));
      vm.Days = [];
      vm.UserList = [];
      dates.forEach(async item => {
      
          vm.Days.push({
            day:(item.split('-'))[2],
            date:item,
            holiday: false,
            dayName:moment(item).format('dddd')
          });
      });
        
          if(vm.WagonType == 4)
          {
            await vm.LoadStaffs();
               await vm.getStaffsShifts(vm.startDate,vm.endDate);
           
          }
          else
          {
            await vm.LoadWagons();
            await vm.LoadDrivers();
            await vm.getWagonShifts(vm.startDate,vm.endDate);
            
            
          }
          
        
    
        }
    },
      async SaveEvent()
      {
        let vm = this;
        
        if(vm.WagonType != 4)
        {
          await axios.post(URL.WagonShift.AddRange,vm.TableVerticalHeaders).then(async (res)=>{
                  if(MSGHNDL.resultChk(res.data))
                  {
                     vm.form = Object.assign({}, vm.defultFormModel);
                  }
                  }).catch((err)=>{
                      console.error(err);
                      MSGHNDL.ERR(err.message)
                    });
        }
        else
        {
          console.warn("User shifts model : ",vm.TableVerticalHeaders);
          await axios.post(URL.shift.AddRange,vm.TableVerticalHeaders).then(async (res)=>{
                  if(MSGHNDL.resultChk(res.data))
                  {
                     vm.form = Object.assign({}, vm.defultFormModel);
                  }
                  }).catch((err)=>{
                      console.error(err);
                      MSGHNDL.ERR(err.message)
                    });
        }

        console.warn(vm.events);
        vm.cancelEvent();
      },
      cancelEvent()
      {
        let vm = this;
        vm.form = Object.assign({},defultFormModel);
      },
      async InitialCalendar()
      {
          let vm = this;
          await vm.LoadWagons();  
      },
      async LoadWagons()
      {
        var vm = this;
        await axios.get(URL.car.byType+vm.WagonType).then(async (res)=>{
          if(MSGHNDL.resultChk(res.data))
          {
             vm.TableHorizontalHeaders = res.data.data;
            //  await vm.LoadDrivers();
          }
          }).catch((err)=>{
              console.error(err);
              MSGHNDL.ERR(err.message)
       });
      },
       async LoadDrivers()
      {
        var vm = this;
        await axios.get(URL.user.byWagontype+`/${vm.WagonType}`).then(async (res)=>{
            console.warn(res);
          if(MSGHNDL.resultChk(res.data))
          {
             vm.UserList = res.data.data;
             vm.UserRepository = Array(vm.Days.length).fill(vm.UserList);
             console.warn("User Repository Content :::: ",vm.UserRepository);
          }
          }).catch((err)=>{
              console.error(err);
              MSGHNDL.ERR(err.message)
       });
      },
      async LoadStaffs()
      {
        var vm = this;
        vm.UserList = [];
        await axios.get(URL.user.loadStaffs).then(async (res)=>{
            console.warn(res);
          if(MSGHNDL.resultChk(res.data))
          {
            console.warn("Staffs List : ",res.data.data);
             vm.UserList = res.data.data;
             vm.UserRepository = Array(vm.Days.length).fill(vm.UserList);
             console.warn("User Repository Content :::: ",vm.UserRepository);
          }
          }).catch((err)=>{
              console.error(err);
              MSGHNDL.ERR(err.message)
       });
      },
  }
}
</script>
