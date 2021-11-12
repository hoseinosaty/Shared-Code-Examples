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
                        <v-flex xs12 sm12 md12 lg12 xl12 class="pa-7 d-inline-flex align-center">
                            <span class="white--text caption pr-2">Protocol type:</span>
                            <v-btn-toggle @change="LoadItems()"  dense background-color="transparent" mandatory dark  v-model="DesinfektionType" active-class="body-1 bg-green-gradient">
                                <v-btn text :value="i.value" v-for="(i,index) in DesinfektionEnum" :key="index" small>{{i.text}}</v-btn>
                            </v-btn-toggle>
                        </v-flex>
                        <v-flex xs12 sm12 md6 lg6 xl6 class="pa-2 d-inline-flex align-center">
                            <v-text-field v-model="FormModel.title" outlined dense  label="Protocol title" dark class="pa-5"></v-text-field>
                        </v-flex>
                        
                        <v-flex xs12 sm12 md6 lg6 xl6 class="pa-2" >
                            <v-layout row wrap>
                                <v-flex xs12 sm12 md12 lg12 xl12 style="flex-direction:column" class="pa-2 d-flex align-center">
                                    <div style="width:100%;    justify-content: space-evenly !important;" class="d-flex justify-space-between align-center">
                                        <v-btn @click="increaseProtcolCount" fab small dark color="green">
                                           <v-icon small>fa fa-chevron-up</v-icon>
                                        </v-btn>
                                        <span class="caption white--text">Protocol lows  </span>
                                        <v-btn @click="decreaseProtcolCount" fab small dark color="red">
                                           <v-icon small>fa fa-chevron-down</v-icon>
                                        </v-btn>
                                    </div>
                                    <div class="d-flex flex-column" style="width:100%">
                                        <v-row class="pa-5" v-for="(item,i) in FormModel.rows" :key="i">
                                            <v-col cols="7"><v-text-field v-model="item.title" outlined dense  label="Title" dark></v-text-field></v-col>
                                            <v-col cols="4"><v-autocomplete :items="DesinfektionTypes" outlined dense v-model="item.type" label="Type" dark ></v-autocomplete></v-col>
                                            <v-col cols="1"><v-btn @click="deleteRow(item)" icon small><v-icon small color="red">fa fa-trash</v-icon></v-btn></v-col>
                                        </v-row>
                                    </div>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 sm12 md6 lg6 xl6 class="pa-2 d-inline-flex align-center">
                            <v-text-field v-model="FormModel.protocolnum" outlined dense  label="Protocol nummer" dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md6 lg6 xl6 class="pa-2 d-inline-flex align-center">
                            <v-text-field v-model="FormModel.lownum" outlined dense  label="Low nummer" dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md12 lg12 xl12 class="pa-2 d-inline-flex align-center">
                            <v-text-field v-model="FormModel.description" outlined dense  label="Description" dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md12 lg12 xl12 class="pa-5" style="justify-content:flex-end;display: flex;">
                            <v-btn  color="green accent-3"  @click="AddItem"  dark><v-icon class="pr-5" small>fas fa-check</v-icon> Save </v-btn>
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
                <v-card-title class="styled-card-title">Protocols</v-card-title>
                <v-card-text>
                    <v-layout row wrap>
                    <v-flex xs12 sm12 md12 lg12 xl12 style="padding:10px">
                    <v-data-table dark :items="protocolTableItems" :headers="tariffTableHeaders">
                        <template v-slot:[`item.counter`]="{item}">
                            {{protocolTableItems.indexOf(item)+1}}
                        </template>
                        <template v-slot:[`item.wt`]="{item}">
                            {{getWagonTypeTitle(item.type)}}
                        </template>
                        <template v-slot:[`item.operation`]="{item}">
                            <v-icon small class="mr-2" color="orange lighten-1" @click="EditItem(item)">fas fa-edit</v-icon>&nbsp;
                            <v-icon small class="mr-2" color="red lighten-1" @click="DeleteItem(item)">fas fa-trash</v-icon>&nbsp;
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
    title:"",
    lownum:"",
    protocolnum:"",
    type:1,
    description:null,
    rows:[],
    infectionTypeId:null,
    id:0
});
export default {
  Name: "addDesinfektion",
  components: {
  },
  data:()=>({
      breadCrumb:[
          {text: 'Dashboard',disabled: false,href: '/'},
          {text: 'Definations',link:false},
          {text: 'Desinfektion',link:false},
          {text: 'Define desinfektion',disabled: false,href:'/desinfektion/add'},
      ],
      tariffTitles:[],
      DesinfektionEnum:Enums.DesinfektionTypes,
      DesinfektionTypes:Enums.DesinfektionLocation,
      WagonType:1,
      FormModel:Object.assign({},defultFormModel),
      rules:{
          checkempty:[val => (val || '').length > 0 || 'This field is required'],
          checkemptyarr:[val => (val || []).length > 0 || 'This field is required']
      },
      startTimeModal:false,
      endTimeModal:false,
      protocolTableItems:[],
      tariffTableHeaders:[
        {text:"#",value:"counter",align:"left"},
        {text:"Protocol title",value:"title",align:"left"},
        {text:"Low nummer",value:"lownum",align:"left"},
        {text:"Protocol nummer",value:"protocolnum",align:"left"},
        {text:"Type",value:"wt",align:"left"},
        {text:"Operation",value:"operation",align:"left"},
      ],
      inEditMode:false,
      SwapId:"",
      protocolCounts:1,
      DesinfektionType:1
  }),
 async created()
  { 
      await this.LoadItems();
  },
  methods:{
      exitEditMode()
      {
          let vm = this;
          vm.inEditMode = false;
          vm.FormModel = Object.assign({}, defultFormModel);
          vm.$refs.additemformref.reset();
      },
      deleteRow(item)
      {
          let vm = this;
          vm.FormModel.rows = vm.FormModel.rows.filter(x=>x != item);
      },
      increaseProtcolCount()
      {
          let vm = this;
          vm.FormModel.rows.push({title:"",type:0,desinfectionId:0});
      },
      decreaseProtcolCount()
      {
          let vm = this;
          vm.FormModel.rows.pop();
      },
      getWagonTypeTitle(t)
      {
          let vm = this;
          var indx = vm.DesinfektionEnum.findIndex(x=>x.value == t);
          return vm.DesinfektionEnum[indx].text;
      },
      EditItem(item)
      {
          let vm = this;
          vm.FormModel = item;
          vm.SwapId = item.id;
          window.scrollTo({top:0,behavior:"smooth"});
          vm.inEditMode = true;
      },
      async ConfirmedDeleteItem()
      {
          let vm = this;
          await axios.delete(URL.Desinfektion.deleteItem+vm.SwapId).then(async (res)=>{
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
      
      async AddItem()
      {
          var vm = this;
          if(!vm.inEditMode)
          {
            vm.FormModel.type = vm.DesinfektionType;
            await axios.post(URL.Desinfektion.public,vm.FormModel).then(async (res)=>{
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
            await axios.put(URL.Desinfektion.public,vm.FormModel).then(async (res)=>{
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
      },
      async LoadItems()
      {
           let vm = this;
          await axios.get(URL.Desinfektion.loadByType+vm.DesinfektionType).then((res)=>{
                  if(MSGHNDL.resultChk(res.data))
                  {
                      console.warn(res.data.data);
                     vm.protocolTableItems = res.data.data;
                  }
                  }).catch((err)=>{
                      console.error(err);
                      MSGHNDL.ERR(err.message)
                    });
      },
  }
}
</script>