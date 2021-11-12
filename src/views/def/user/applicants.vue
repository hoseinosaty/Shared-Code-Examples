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
              <span>Registered applicants</span>
          </div>
      </v-flex>
      
      <v-flex xs12 sm12 md12 lg12 xl12 class="pl-10 pa-2">
        <v-card class="card-container">
          <v-card-title class="styled-card-title">Applicants</v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm12 md12 lg12 xl12 style="padding:10px">
               <v-data-table dark :items="UserTableItems" :headers="tariffTitleTableHeaders">
                   <template v-slot:[`item.counter`]="{item}">
                       {{UserTableItems.indexOf(item)+1}}
                   </template>
                   <template v-slot:[`item.operation`]="{item}">
                       <v-btn v-if="item.accountStatus == false" small @click="Accept(item.id)"  color="green accent-1" light>Accept</v-btn>
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
  Name: "Applicants",
  components: {
  },
  data:()=>({
      tariffTitleTableHeaders:[
        {text:"#",value:"counter",align:"left"},
        {text:"Name",value:"name",align:"left"},
        {text:"Family",value:"family",align:"left"},
        {text:"Gender",value:"gender",align:"left"},
        {text:"Email",value:"email",align:"left"},
        {text:"Mobile",value:"mobile",align:"left"},
        {text:"Birth date",value:"birthDate",align:"left"},
        {text:"Job title",value:"jobTitle.title",align:"left"},
        {text:"Work place name",value:"workPlace.title",align:"left"},
        {text:"Operation",value:"operation",align:"left"},
      ],
      breadCrumb:[
          {text: 'Dashboard',disabled: false,href: '/'},
          {text: 'Definations',link:false},
          {text: 'Users',link:false},
          {text: 'Applicants',disabled: false,href:'/users/applicants'},
      ],
        UserTableItems:[],
      EditTimeDialog:false
  }),
  async created()
  {
     await this.getApplicants();
  },
  methods: {
      ConfirmedDeleteItem()
      {

      },
      async Accept(id)
      {
           var vm = this;
          await axios.post(URL.Applicant.activeApplicants,{id:id}).then(async res=>{
              if(MSGHNDL.resultChk(res.data))
                  {
                      MSGHNDL.OK(res.data.msg);
                     await vm.getApplicants();
                  }
                 
          }).catch((err)=>{console.error(err)});
      },
      async getApplicants()
      {
          var vm = this;
          await axios.post(URL.Applicant.getApplicants).then(res=>{
              if(MSGHNDL.resultChk(res.data))
                  {
                      console.warn(res.data.data);
                     vm.UserTableItems = res.data.data;
                  }
                 
          }).catch((err)=>{console.error(err)});
      }
    },
};

</script>
