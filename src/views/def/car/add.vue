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
              <span>Create</span>
          </div>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 xl12 class="pl-10 pa-2">
          <div class="form-title">
            <span>
                <v-icon class="pink--text" small>fa fa-plus</v-icon>
                 Add new item
            </span> 
            </div>
          <v-form ref="additemformref" :class="inEditMode ? 'edit-mode':''">
              <span class="edit-mode-exit" @click="exitEditMode"><i class=" fa fa-times"></i></span>
            <v-layout row wrap justify-space-around>
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-text-field v-model="FormModel.name" outlined dense :rules="rules.checkempty" label="Alias name" dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-text-field v-model="FormModel.carBrand" outlined dense :rules="rules.checkempty" label="Brand name" dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-text-field v-model="FormModel.carModel" outlined dense :rules="rules.checkempty" label="Model name" dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-text-field v-model="FormModel.yearOfCar" outlined dense :rules="rules.checkempty" label="Year of construction" dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-text-field v-model="FormModel.carPlates" outlined dense :rules="rules.checkempty" label="Wagon plate" dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-text-field v-model="FormModel.carBodyNum" outlined dense :rules="rules.checkempty" label="Body number" dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-text-field v-model="FormModel.carChassisNum" outlined dense :rules="rules.checkempty" label="VIN(Vehicle Identification Number)" dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-text-field v-model="FormModel.carEngineNum" outlined dense :rules="rules.checkempty" label="Engine number" dark class="pa-5"></v-text-field>
                        </v-flex>
                        
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-dialog ref="cartechexpdatedialog" v-model="carTechDiafExpModal" :return-value.sync="FormModel.technicalDiagnosisExpDate" persistent width="290px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field readonly v-bind="attrs" v-on="on" v-model="FormModel.technicalDiagnosisExpDate" outlined dense :rules="rules.checkempty" label="Technical diagnosis expire" dark class="pa-5"></v-text-field>
                                </template>
                                <v-date-picker active-picker.sync="YEAR" v-model="FormModel.technicalDiagnosisExpDate" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="carTechDiafExpModal = false">
                                        Cancel
                                    </v-btn>
                                    <v-btn text color="primary" @click="$refs.cartechexpdatedialog.save(FormModel.technicalDiagnosisExpDate)" >
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-autocomplete :items="validWagons" item-value="value" v-model="FormModel.carType" outlined dense  label="Wagon type" dark class="pa-5"></v-autocomplete>
                        </v-flex>
                         <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-autocomplete :items="wagonConditions" item-value="value" v-model="FormModel.carCondition" outlined dense  label="Wagon health status" dark class="pa-5"></v-autocomplete>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-text-field v-model="FormModel.carInsuranceNum" outlined dense :rules="rules.checkempty" label="Insurance number" dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-autocomplete :items="InsuranceTypes" item-value="value" v-model="FormModel.insuranceType" outlined dense  label="Insurance type" dark class="pa-5"></v-autocomplete>
                        </v-flex>
                        <v-flex xs12 sm12 md9 lg9 xl9 class="pa-5" style="justify-content:flex-end;display: flex;">
                             <v-btn block color="green accent-3"  @click="AddItem"  dark><v-icon class="pr-5" small>fas fa-check</v-icon> Save </v-btn>
                        </v-flex>
            </v-layout>
          </v-form>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 xl12 class="pl-10 pa-2">
          <div class="page-divider">
              <span>Archive</span>
          </div>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 xl12 class="pl-10 pa-2">
        <v-card class="card-container">
          <v-card-title class="styled-card-title">Today tasks</v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm12 md12 lg12 xl12 style="padding:10px">
               <v-data-table dark :items="UserTableItems" :headers="taskTableHeader">
                  <template v-slot:[`item.counter`]="{item}">
                       {{UserTableItems.indexOf(item)+1}}
                   </template>
                   <template v-slot:[`item.operation`]="{item}">
                       <v-icon small class="mr-2" color="orange lighten-1" @click="EditItem(item)">fas fa-edit</v-icon>&nbsp;
                       <v-icon small class="mr-2" color="red lighten-1" @click="DeleteItem(item)">fas fa-trash</v-icon>&nbsp;
                   </template>
                   <template v-slot:[`item.carType`]="{item}">
                       <v-chip small color="rgba(0,0,0,0.5)" dark>{{getWagonTypeByValue(item.carType)}}</v-chip>
                   </template>
                   <template v-slot:[`item.wstate`]="{item}">
                       <v-chip small :color="getStateInfo(item.workStatus).color" dark>{{getStateInfo(item.workStatus).text}}</v-chip>
                   </template>
               </v-data-table>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <c-warn @Confirmed="ConfirmedDeleteItem" ref="warningDialog"></c-warn>
  </div>
</template>

<script>
const Enums = require("../../../const/enums.js");
const URL = require("../../../const/url.js");
const MSGHNDL = require("../../../components/notify.js");
const axios = require('axios');

const defultFormModel = Object.freeze({
    name:"",
    carType:null,
    carCondition:null,
    carBrand:'',
    carModel:'',
    yearOfCar:'',
    carBodyNum:'',
    carChassisNum:'',
    carEngineNum:'',
    technicalDiagnosisExpDate:'',
    carPlates:'',
    carInsuranceNum:'',
    insuranceType:null,
    id:0
});
export default {
  Name: "addCar",
  components: {
  },
  data:()=>({
      taskTableHeader:[
        {text:"#",value:"counter",align:"left"},
        {text:"Alias name",value:"name",align:"left"},
        {text:"Brand name",value:"carBrand",align:"left"},
        {text:"Wagon model",value:"carModel",align:"left"},
        {text:"Wagon type",value:"carType",align:"left"},
        {text:"Year of Construction",value:"yearOfCar",align:"left"},
        {text:"Wagon plate",value:"carPlates",align:"left"},
        {text:"Insurance number",value:"carInsuranceNum",align:"left"},
        {text:"Work status",value:"wstate",align:"left"},
        {text:"Operation",value:"operation",align:"left"},
      ],
      breadCrumb:[
          {text: 'Dashboard',disabled: false,href: '/'},
          {text: 'Definations',link:false},
          {text: 'Wagons',link:false},
          {text: 'Define wagon',disabled: false,href:'/car/addcar'},
      ],
      validWagons:Enums.WagonTypes,
      FormModel:Object.assign({}, defultFormModel),
      rules:{
          checkempty:[val => (val || '').length > 0 || 'This field is required'],
          checkemptyarr:[val => (val || []).length > 0 || 'This field is required']
      },
      UserTableItems:[],
      SwapId:0,
      inEditMode:false,
      carTechDiafExpModal:false,
      CertExpPickerModal:false,
      wagonConditions:Enums.WagonHealthState,
      InsuranceTypes:Enums.WagonInsuranceType,
      wagonStates:Enums.WagonStatus
  }),
  async created()
  {
      await this.LoadItems();
  },
  methods: {
      exitEditMode()
      {
          let vm = this;
          vm.inEditMode = false;
          vm.FormModel = Object.assign({}, defultFormModel);
          vm.$refs.additemformref.reset();
      },
      getStateInfo(stateId)
      {
          let vm = this;
          var indx = vm.wagonStates.findIndex(x=>x.value == stateId);
          return vm.wagonStates[indx];
      },
      getWagonTypeByValue(val)
      {
          let vm = this;
          var index = vm.validWagons.findIndex(el => 
                 el.value == val
            );
        return vm.validWagons[index].text;
      },
     
      async ConfirmedDeleteItem()
      {
          let vm = this;
          await axios.delete(URL.car.deleteItem+vm.SwapId).then(async (res)=>{
                  if(MSGHNDL.resultChk(res.data))
                  {
                      console.warn(res.data.data);
                     vm.$refs.warningDialog.CloseDialog();
                     await vm.LoadItems();
                  }
                  else
                  {
                      vm.$refs.warningDialog.OperationEnd();
                  }
                  }).catch((err)=>{
                      console.error(err);
                      vm.$refs.warningDialog.OperationEnd();
                      MSGHNDL.ERR(err.message)
                    });
      },
      DeleteItem(item)
      {
        let vm = this;
        console.warn(item);
        this.SwapId = item.id;
        vm.$refs.warningDialog.ShowDialog();
      },
      EditItem(item)
      {
          let vm = this;
          vm.SwapId = item.id;
          vm.FormModel = Object.assign({},item);
          var split = vm.FormModel.technicalDiagnosisExpDate.split("T");
          vm.FormModel.technicalDiagnosisExpDate = split[0];
          window.scrollTo({top:0,behavior:"smooth"});
          vm.inEditMode = true;
      },
      async LoadItems()
      {
          let vm = this;
          await axios.get(URL.car.public).then((res)=>{
                  if(MSGHNDL.resultChk(res.data))
                  {
                      console.warn(res.data.data);
                     vm.UserTableItems = res.data.data;
                  }
                  }).catch((err)=>{
                      console.error(err);
                      MSGHNDL.ERR(err.message)
                    });
      },
      async AddItem()
      {
          let vm = this;
          if(vm.$refs.additemformref.validate())
          {
              if(!vm.inEditMode)
              {
                  await axios.post(URL.car.public,vm.FormModel).then(async (res)=>{
                  if(MSGHNDL.resultChk(res.data))
                  {
                     await vm.LoadItems();
                     vm.$refs.additemformref.reset();
                     vm.FormModel = Object.assign({}, defultFormModel);
                  }
                  }).catch((err)=>{
                      console.error(err);
                      MSGHNDL.ERR(err.message)
                    });
              }
              else
              {
                  await axios.put(URL.car.public,vm.FormModel).then(async (res)=>{
                  if(MSGHNDL.resultChk(res.data))
                  {
                     await vm.LoadItems();
                     vm.$refs.additemformref.reset();
                     vm.FormModel = Object.assign({}, defultFormModel);
                     vm.inEditMode = false;
                  }
                  }).catch((err)=>{
                      console.error(err);
                      MSGHNDL.ERR(err.message)
                    });
              }
          }
      }
    },
};

</script>
