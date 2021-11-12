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
        <v-flex xs12 sm12 md12 lg12 xl12 class="pa-2 pl-10">
          <div class="page-divider">
              <span>Create</span>
          </div>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 xl12 class="pa-2 pl-10">
          <div class="form-title">
            <span>
                <v-icon class="pink--text" small>fa fa-plus</v-icon>
                 Add new item
            </span> 
            </div>
          <v-form ref="newadminformref" :class="inEditMode ? 'edit-mode':''">
              <span class="edit-mode-exit" @click="exitEditMode"><i class=" fa fa-times"></i></span>
              <v-stepper dark v-model="FormStep">
                  <v-stepper-header>
                      <v-stepper-step editable step="1" color="pink">
                          Personal Information
                      </v-stepper-step>
                      <v-divider></v-divider>
                      <v-stepper-step editable step="2" color="pink">
                          Tax and Insurance
                      </v-stepper-step>
                      <v-divider v-if="ActiveStep3"></v-divider>
                      <v-stepper-step editable v-if="ActiveStep3" step="3" color="pink">
                          Driving Licenses
                      </v-stepper-step>
                  </v-stepper-header>
                  <v-stepper-content step="1">
                      <v-layout row wrap justify-space-around>
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-text-field v-model="FormModel.name" outlined dense :rules="rules.checkempty" label="Name" dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-text-field v-model="FormModel.family" outlined dense :rules="rules.checkempty" label="Family" dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-text-field v-model="FormModel.personnelId" outlined dense :rules="rules.checkempty" label="Personal id" dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-text-field v-model="FormModel.birthdayFamily" outlined dense :rules="rules.checkempty" label="Birth Family" dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-text-field v-model="FormModel.email" outlined dense :rules="rules.email" label="Email" dark class="pa-5"></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-text-field v-model="FormModel.nationalNum" outlined dense :rules="rules.checkempty" label="National Num." dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-dialog ref="natxpdatedialog" v-model="NationalExpPickerModal" :return-value.sync="FormModel.nationalCardExpirationDate" persistent width="290px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field readonly v-bind="attrs" v-on="on" v-model="FormModel.nationalCardExpirationDate" outlined dense :rules="rules.checkempty" label="National Expire Date" dark class="pa-5"></v-text-field>
                                </template>
                                <v-date-picker active-picker.sync="YEAR" v-model="FormModel.nationalCardExpirationDate" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="NationalExpPickerModal = false">
                                        Cancel
                                    </v-btn>
                                    <v-btn text color="primary" @click="$refs.natxpdatedialog.save(FormModel.nationalCardExpirationDate)" >
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-text-field v-model="FormModel.placeOfBirth" outlined dense :rules="rules.checkempty" label="Place of Birth" dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-text-field v-model="FormModel.mobileNum" outlined dense :rules="rules.checkempty" label="Phone" dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-text-field v-model="FormModel.phoneNum" outlined dense :rules="rules.checkempty" label="Tel" dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-text-field v-model="FormModel.relativeMobileNum" outlined dense :rules="rules.checkempty" label="Spouse / Relatives Phone" dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3 v-if="!inEditMode">
                            <v-text-field v-model="FormModel.password" @click:append="showPassword = !showPassword" :type="showPassword ? 'text' : 'password'" :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'" outlined dense :rules="rules.checkempty" label="Password" dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3 v-if="!inEditMode">
                            <v-text-field  @click:append="showConfirm = !showConfirm" :type="showConfirm ? 'text' : 'password'" :append-icon="showConfirm ? 'fas fa-eye' : 'fas fa-eye-slash'" outlined dense :rules="rules.checkempty" label="Confirm password" dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-autocomplete small-chips deletable-chips multiple v-model="FormModel.roleId"  :items="systemRoles" item-text="title" item-value="id"  outlined dense :rules="rules.checkemptyarr" label="Role" dark class="pa-5"></v-autocomplete>
                        </v-flex>
                        <v-flex xs12 sm12 md6 lg6 xl6>
                            <v-text-field readonly v-model="FormModel.employeeColor" @click="colorPicker = true"  outlined dense :rules="rules.checkempty" label="Color" dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md12 lg12 xl12 class="pa-5">
                            <v-textarea v-model="FormModel.address" :rules="rules.checkempty" outlined dense label="address" dark>
                            </v-textarea>
                        </v-flex>
                        <v-flex xs12 sm12 md12 lg12 xl12 class="pa-5" style="justify-content:flex-end;display: flex;">
                            <v-btn color="orange" @click="FormStep++"  dark> Next <v-icon class="pl-5" small>fas fa-chevron-right</v-icon></v-btn>
                        </v-flex>
                      </v-layout>
                  </v-stepper-content>
                  <v-stepper-content step="2">
                      <v-layout row wrap justify-space-around>
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-text-field v-model="FormModel.taxClassNum" outlined dense :rules="rules.checkempty" label="Tax Num." dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-text-field v-model="FormModel.healthInsuranceNum" outlined dense :rules="rules.checkempty" label="Insurance Num." dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-text-field v-model="FormModel.pensionInsuranceNum" outlined dense :rules="rules.checkempty" label="Retirement Ins." dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-text-field v-model="FormModel.socialceNum" outlined dense :rules="rules.checkempty" label="Social Num." dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-text-field v-model="FormModel.dayWorkHours" outlined dense :rules="rules.checkempty" label="Working hours per day" dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-text-field v-model="FormModel.monthWorkHours" outlined dense :rules="rules.checkempty" label="Working hours per month" dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3 class="pa-5" style="justify-content:flex-start;display: flex;">
                            <v-btn color="grey" @click="FormStep--" block  dark><v-icon class="pr-5" small>fas fa-chevron-left</v-icon> Previous </v-btn>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3 class="pa-5" v-if="ActiveStep3" style="justify-content:flex-end;display: flex;">
                            <v-btn color="orange" @click="FormStep++" block  dark> Next <v-icon class="pl-5" small>fas fa-chevron-right</v-icon></v-btn>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3 class="pa-5" v-else style="justify-content:flex-end;display: flex;">
                             <v-btn color="green accent-3"  @click="AddUser" block  dark><v-icon class="pr-5" small>fas fa-check</v-icon> Save </v-btn>
                        </v-flex>
                        
                      </v-layout>
                  </v-stepper-content>
                  <v-stepper-content step="3" v-if="ActiveStep3">
                      <v-layout row wrap justify-space-around>
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-text-field v-model="FormModel.certificateNum" :rules="rules.checkempty" outlined dense label="Certificate Num." dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-dialog ref="certexpdatedialog" v-model="CertExpPickerModal" :return-value.sync="FormModel.certificateExpDate" persistent width="290px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field readonly v-bind="attrs" v-on="on" v-model="FormModel.certificateExpDate" :rules="rules.checkempty" outlined dense label="Certificate Expire Date" dark class="pa-5"></v-text-field>
                                </template>
                                <v-date-picker active-picker.sync="YEAR" v-model="FormModel.certificateExpDate" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="CertExpPickerModal = false">
                                        Cancel
                                    </v-btn>
                                    <v-btn text color="primary" @click="$refs.certexpdatedialog.save(FormModel.certificateExpDate)" >
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-text-field v-model="FormModel.ambulanceCertNum" :rules="rules.checkempty" outlined dense label="Ambulance Cert. Number" dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-dialog ref="ambccertexpdialog" v-model="AmbulanceCertExpPickerModal" :return-value.sync="FormModel.ambulanceCertExpDate" persistent width="290px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field readonly v-bind="attrs" v-on="on" v-model="FormModel.ambulanceCertExpDate" :rules="rules.checkempty" outlined dense label="Ambulance Cert. Expire Date" dark class="pa-5"></v-text-field>
                                </template>
                                <v-date-picker active-picker.sync="YEAR" v-model="FormModel.ambulanceCertExpDate" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="AmbulanceCertExpPickerModal = false">
                                        Cancel
                                    </v-btn>
                                    <v-btn text color="primary" @click="$refs.ambccertexpdialog.save(FormModel.ambulanceCertExpDate)" >
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </v-flex>

                        <v-flex xs12 sm12 md3 lg3 xl3>
                            <v-autocomplete v-model="FormModel.employeeCarIds" :rules="rules.checkemptyarr" :items="validWagons" multiple item-text="text" item-value="value" outlined dense label="Valid Wagons" dark class="pa-5"></v-autocomplete>
                        </v-flex>
                        
                        <v-flex xs12 sm12 md4 lg4 xl4 class="pa-5" style="justify-content:flex-end;display: flex;">
                            <v-btn color="grey" block @click="FormStep--" dark><v-icon class="pr-5" small>fas fa-chevron-left</v-icon> Previous </v-btn>
                        </v-flex>
                        <v-flex xs12 sm12 md5 lg5 xl5 class="pa-5" style="justify-content:flex-end;display: flex;">
                             <v-btn color="green accent-3" block  @click="AddUser"  dark><v-icon class="pr-5" small>fas fa-check</v-icon> Save </v-btn>
                        </v-flex>
                      </v-layout>
                  </v-stepper-content>
              </v-stepper>
          </v-form>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 xl12 class="pa-2 pl-10">
          <div class="page-divider">
              <span>Archive</span>
          </div>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 xl12 class="pa-2 pl-10">
        <v-card class="card-container">
          <v-card-title class="styled-card-title">Staffs</v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm12 md12 lg12 xl12 style="padding:10px">
               <v-data-table dark :items="UserTableItems" :headers="taskTableHeader">
                   <template v-slot:[`item.isActive`]="{item}">
                       <v-chip color="green lighten-2" @click="changeItemStatus(item.userId,false)" v-if="item.isActive" dark>Active</v-chip>
                       <v-chip color="red lighten-2" @click="changeItemStatus(item.userId,true)" v-else dark>InActive</v-chip>
                   </template>
                   <template v-slot:[`item.counter`]="{item}">
                       {{UserTableItems.indexOf(item) + 1}}
                   </template>
                   <template v-slot:[`item.employeeColor`]="{item}">
                       <v-chip small :color="item.employeeColor"></v-chip>
                   </template>
                   <template v-slot:[`item.operation`]="{item}">
                       <v-icon small class="mr-2" color="orange lighten-1" @click="EditItem(item)">fas fa-edit</v-icon>&nbsp;
                       <v-icon small class="mr-2" color="red lighten-1" @click="DeleteItem(item)">fas fa-trash</v-icon>&nbsp;
                   </template>
                   <template v-slot:[`item.roleTitles`]="{item}">
                       <v-chip small color="rgba(0,0,0,0.5)" dark v-for="(e,index) in item.roleTitles" :key="index">{{e}}</v-chip>
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
        <v-dialog v-model="colorPicker" max-width="300px">
            <v-card>
                <v-card-text>
                    <v-layout row wrap justify-center align-center>
                        <v-flex xs12 sm12 md12 lg12 xl12 class="pa-5">
                            <v-color-picker v-model="FormModel.employeeColor" dot-size="18" mode="hexa" swatches-max-height="250"></v-color-picker>
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-btn block color="blue" outlined @click="colorPicker = false">Ok</v-btn>
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
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const defultFormModel = Object.freeze({
    name:'',
    family:'',
    personnelId:'',
    birthdayFamily:'',
    address:'',
    taxClassNum:'',
    healthInsuranceNum:'',
    pensionInsuranceNum:'',
    socialceNum:'',
    nationalNum:'',
    nationalCardExpirationDate:'',
    placeOfBirth:'',
    phoneNum:'',
    mobileNum:'',
    relativeMobileNum:'',
    certificateNum:'',
    certificateExpDate:'',
    email:'',
    ambulanceCertExpDate:'',
    password:'',
    employeeCar:'',
    employeeCarIds:[],
    employeeColor:"#ffffff",
    roleId:[],
    userId:0,
    dayWorkHours:"0",
    monthWorkHours:"0"
});
export default {
  Name: "adminUsers",
  components: {
  },
  data:()=>({
    
      taskTableHeader:[
        {text:"#",value:"counter",align:"left"},
        {text:"Personal id",value:"personnelId",align:"left"},
        {text:"Name",value:"name",align:"left"},
        {text:"Family",value:"family",align:"left"},
        {text:"Email",value:"email",align:"left"},
        {text:"Color",value:"employeeColor",align:"left"},
        {text:"Phone",value:"mobileNum",align:"left"},
        {text:"National Number",value:"nationalNum",align:"left"},
        {text:"Place of Birth",value:"placeOfBirth",align:"left"},
        {text:"Role",value:"roleTitles",align:"left"},
        {text:"Status",value:"isActive",align:"left"},
        {text:"Operation",value:"operation",align:"left"},
      ],
      breadCrumb:[
          {text: 'Dashboard',disabled: false,href: '/'},
          {text: 'Definations',link:false},
          {text: 'Users',link:false},
          {text: 'Administrators',disabled: false,href:'/users/admin'},
      ],
      validWagons:Enums.WagonTypes,
      systemRoles:[],
      FormStep:1,
      FormModel:Object.assign({}, defultFormModel),
      showPassword:false,
      showConfirm:false,
      rules:{
          checkempty:[val => (val || '').length > 0 || 'This field is required'],
          checkemptyarr:[val => (val || []).length > 0 || 'This field is required'],
          email:[val => ((val || '').length > 0 && validateEmail(val)) || 'Incorrect email'],
      },
      UserTableItems:[],
      SwapId:0,
      inEditMode:false,
      ActiveStep3:false,
      NationalExpPickerModal:false,
      CertExpPickerModal:false,
      AmbulanceCertExpPickerModal:false,
        colorPicker:false
  }),
  async created()
  {
      await this.LoadUsers();
  },
  watch:{
      'FormModel.roleId':function(val){
          console.warn(val);
          if(val.includes(4))
          {
              this.ActiveStep3 = true;
          }
          else
          {
              this.ActiveStep3 = false;
          }
      }
  },
  methods: {
      async loadRoles()
      { 
        let vm = this;
        await axios.get(URL.Role.public).then((res)=>{
                  if(MSGHNDL.resultChk(res.data))
                  {
                      console.warn(res.data.data);
                     vm.systemRoles = res.data.data;
                  }
                  }).catch((err)=>{
                      console.error(err);
                      MSGHNDL.ERR(err.message)
                    });
      },
      exitEditMode()
      {
          let vm = this;
          vm.inEditMode = false;
          vm.FormStep = 1;
          vm.ActiveStep3 = false;
          vm.FormModel = Object.assign({}, defultFormModel);
          vm.$refs.newadminformref.reset();
      },
      async changeItemStatus(userid,status)
      {
          var vm = this;
          await axios.post(URL.user.changeState,{UserId:userid,IsActive:status}).then(async (res)=>{
              MSGHNDL.resultChk(res.data)
              await vm.LoadUsers();   
                  }).catch((err)=>{
                      console.error(err);
                    //   vm.$refs.warningDialog.OperationEnd();
                      MSGHNDL.ERR(err.message)
                    });
      },
      async ConfirmedDeleteItem()
      {
          let vm = this;
          await axios.delete(URL.user.deleteItem+vm.SwapId).then(async (res)=>{
                  if(MSGHNDL.resultChk(res.data))
                  {
                      console.warn(res.data.data);
                     vm.$refs.warningDialog.CloseDialog();
                     await vm.LoadUsers();
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
        this.SwapId = item.userId;
        vm.$refs.warningDialog.ShowDialog();
      },
      EditItem(item)
      {
          let vm = this;
          vm.SwapId = item.userId;
           item.nationalCardExpirationDate = vm.$getDateString(item.nationalCardExpirationDate);
           item.certificateExpDate = vm.$getDateString(item.certificateExpDate);
           item.ambulanceCertExpDate = vm.$getDateString(item.ambulanceCertExpDate);
          vm.FormModel = Object.assign({},item);
          window.scrollTo({top:0,behavior:"smooth"});
          vm.inEditMode = true;
          
      },
      async LoadUsers()
      {
          let vm = this;
          await axios.get(URL.user.public).then((res)=>{
                  if(MSGHNDL.resultChk(res.data))
                  {
                      console.warn(res.data.data);
                     vm.UserTableItems = res.data.data;
                  }
                  }).catch((err)=>{
                      console.error(err);
                      MSGHNDL.ERR(err.message)
                    });
                    await vm.loadRoles();
      },
      async AddUser()
      {
          let vm = this;
          if(vm.$refs.newadminformref.validate())
          {
              vm.FormModel.EmployeeCar = vm.FormModel.employeeCarIds.join(',');
              if(!vm.inEditMode)
              {
                  await axios.post(URL.user.public,vm.FormModel).then(async (res)=>{
                  if(MSGHNDL.resultChk(res.data))
                  {
                     await vm.LoadUsers();
                     vm.exitEditMode();
                  }
                  }).catch((err)=>{
                      console.error(err);
                      MSGHNDL.ERR(err.message)
                    });
              }
              else
              {
                  await axios.put(URL.user.public,vm.FormModel).then(async (res)=>{
                  if(MSGHNDL.resultChk(res.data))
                  {
                     await vm.LoadUsers();
                     vm.exitEditMode();
                  }
                  }).catch((err)=>{
                      console.error(err);
                      MSGHNDL.ERR(err.message)
                    });
              }
          }
      },
    },
};

</script>
