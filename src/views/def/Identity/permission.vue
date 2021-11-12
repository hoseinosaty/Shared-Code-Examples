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
                        <v-flex xs12 sm12 md4 lg4 xl4 class="pa-5">
                            <v-autocomplete v-model="FormModel.parentId" item-text="title" item-value="id" :items="Permissions" outlined dense label="Permission title" dark class="pa-5"></v-autocomplete>
                        </v-flex>
                        <v-flex xs12 sm12 md4 lg4 xl4 class="pa-5">
                            <v-text-field v-model="FormModel.title" outlined dense :rules="rules.checkempty" label="Permission title" dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md4 lg4 xl4 class="pa-5">
                            <v-text-field v-model="FormModel.url" outlined dense :rules="rules.checkempty" label="Permission url" dark class="pa-5"></v-text-field>
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
          <v-card-title class="styled-card-title">Permissions</v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm12 md12 lg12 xl12 style="padding:10px">
               <v-data-table dark :items="PermissionTitleTableItems" :headers="PermissionTitleTableHeaders">
                   <template v-slot:[`item.counter`]="{item}">
                       {{PermissionTitleTableItems.indexOf(item)+1}}
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
    url:"",
    parentId:0,
    id:0
});
export default {
  Name: "addPermission",
  components: {
  },
  data:()=>({
      PermissionTitleTableHeaders:[
        {text:"#",value:"counter",align:"left"},
        {text:"Title",value:"title",align:"left"},
        {text:"Operation",value:"operation",align:"left"},
      ],
      breadCrumb:[
          {text: 'Dashboard',disabled: false,href: '/'},
          {text: 'Definations',link:false},
          {text: 'Identity',link:false},
          {text: 'Define permission',disabled: false,href:'/identity/permission/add'},
      ],
      validWagons:Enums.WagonTypes,
      FormModel:Object.assign({}, defultFormModel),
      rules:{
          checkempty:[val => (val || '').length > 0 || 'This field is required'],
          checkemptyarr:[val => (val || []).length > 0 || 'This field is required']
      },
      PermissionTitleTableItems:[],
      SwapId:0,
      inEditMode:false,
      Permissions:[]
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
      async ConfirmedDeleteItem()
      {
          let vm = this;
          await axios.delete(URL.Permission.deleteItem+vm.SwapId).then(async (res)=>{
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
          vm.inEditMode = true;
          window.scrollTo({top:0,behavior:"smooth"});
      },
      async LoadItems()
      {
          let vm = this;
          await axios.get(URL.Permission.public).then((res)=>{
                  if(MSGHNDL.resultChk(res.data))
                  {
                      console.warn(res.data.data);
                     vm.PermissionTitleTableItems = res.data.data;
                     vm.Permissions = res.data.data;
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
                  await axios.post(URL.Permission.public,vm.FormModel).then(async (res)=>{
                  if(MSGHNDL.resultChk(res.data))
                  {
                     await vm.LoadItems();
                     vm.exitEditMode();
                  }
                  }).catch((err)=>{
                      console.error(err);
                      MSGHNDL.ERR(err.message)
                    });
              }
              else
              {
                  await axios.put(URL.Permission.public,vm.FormModel).then(async (res)=>{
                  if(MSGHNDL.resultChk(res.data))
                  {
                     await vm.LoadItems();
                     vm.exitEditMode();
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
