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
                        <v-flex xs12 sm12 md8 lg8 xl8>
                            <v-text-field v-model="FormModel.title" outlined dense :rules="rules.checkempty" label="Role title" dark class="pa-5"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md4 lg4 xl4 class="pa-5" style="justify-content:flex-end;display: flex;">
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
          <v-card-title class="styled-card-title">Roles</v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm12 md12 lg12 xl12 style="padding:10px">
               <v-data-table dark :items="RoleTitleTableItems" :headers="RoleTitleTableHeaders">
                   <template v-slot:[`item.counter`]="{item}">
                       {{RoleTitleTableItems.indexOf(item)+1}}
                   </template>
                   <template v-slot:[`item.operation`]="{item}">
                       <v-icon small class="mr-2" color="orange lighten-1" @click="EditItem(item)">fas fa-edit</v-icon>&nbsp;
                       <v-icon small class="mr-2" color="blue lighten-1" @click="setPermission(item)">fas fa-fingerprint</v-icon>&nbsp;
                       <v-icon small class="mr-2" color="red lighten-1" @click="DeleteItem(item)">fas fa-trash</v-icon>&nbsp;
                       
                   </template>
                  
               </v-data-table>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <template><!--Category Tree View-->
            <v-dialog fullscreen persistent v-model="permissionDialog">
                <v-card>
                  <v-card-title style="padding:0px !important">
                      <v-app-bar dense color="rgb(42, 45, 69)" dark>
                          <v-toolbar-title style="color:orange">Role permissions</v-toolbar-title>
                          <v-spacer></v-spacer>
                          <v-icon color="orange" @click="closePermDialog()" small>fa fa-times</v-icon>
                      </v-app-bar>
                  </v-card-title>
                  <v-card-text>
                      <v-card>
                          <v-treeview shaped open-on-click transition selection-type="leaf" v-model="SelectedPermissionsToRole" return-object selectable :items="Permissions" item-key="id" item-text="title">

                          </v-treeview>
                      </v-card>
                  </v-card-text>
                  <v-card-actions>
                      <v-btn block color="green accent-3"  @click="UpdateRolePermissions"  dark><v-icon class="pr-5" small>fas fa-check</v-icon> Save </v-btn>
                  </v-card-actions>
                </v-card>
            </v-dialog>
        </template>
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
    isActive:true,
    id:0
});
export default {
  Name: "addRole",
  components: {
  },
  data:()=>({
      RoleTitleTableHeaders:[
        {text:"#",value:"counter",align:"left"},
        {text:"Title",value:"title",align:"left"},
        {text:"Operation",value:"operation",align:"left"},
      ],
      breadCrumb:[
          {text: 'Dashboard',disabled: false,href: '/'},
          {text: 'Definations',link:false},
          {text: 'Identity',link:false},
          {text: 'Define new role',disabled: false,href:'/identity/role/add'},
      ],
      validWagons:Enums.WagonTypes,
      FormModel:Object.assign({}, defultFormModel),
      rules:{
          checkempty:[val => (val || '').length > 0 || 'This field is required'],
          checkemptyarr:[val => (val || []).length > 0 || 'This field is required']
      },
      RoleTitleTableItems:[],
      SwapId:0,
      inEditMode:false,
      permissionDialog:false,
      Permissions:[],
      RoleId:0,
      SelectedPermissionsToRole:[]
  }),
  async created()
  {
      await this.LoadItems();
      await this.LoadPermissions();
  },
  methods: {
      closePermDialog()
      {
          let vm = this;
          vm.SelectedPermissionsToRole = [];
          vm.permissionDialog = false;
      },
      async UpdateRolePermissions()
      {
          console.warn(...this.SelectedPermissionsToRole)
          let vm = this;
          if(vm.SelectedPermissionsToRole.length < 1)
          {
              MSGHNDL.ERR("Please select permissions.");
              return;
          }
          var model = [];
          vm.SelectedPermissionsToRole.forEach(el => {
              model.push({RolesId:vm.RoleId,PermissionsId:el.id});
          });
          await axios.post(URL.Role.setPerms,model).then(async (res)=>{
                  if(MSGHNDL.resultChk(res.data))
                  {
                     console.warn(res.data.data);
                     vm.$refs.warningDialog.CloseDialog();
                     vm.closePermDialog();
                     await vm.LoadItems();
                  }
                  }).catch((err)=>{
                      console.error(err);
                      MSGHNDL.ERR(err.message)
                    });
      },
      list_to_tree(arr) {
            var tree = [],
            mappedArr = {},
            arrElem,
            mappedElem;
            for(var i = 0, len = arr.length; i < len; i++) {
                arrElem = arr[i];
                mappedArr[arrElem.id] = arrElem;
                mappedArr[arrElem.id]['children'] = [];
            }
            for (var id in mappedArr) {
                if (mappedArr.hasOwnProperty(id)) {
                    mappedElem = mappedArr[id];
                    if (mappedElem.parentId) {
                        mappedArr[mappedElem['parentId']]['children'].push(mappedElem);
                    }
                    else {
                        tree.push(mappedElem);
                    }
                }
            }
            return tree;
        },
      exitEditMode()
      {
          let vm = this;
          vm.inEditMode = false;
          vm.FormModel = Object.assign({}, defultFormModel);
          vm.$refs.additemformref.reset();
      },
      async setPermission(item)
      {
          let vm = this;
          vm.RoleId = item.id;
          console.warn(item);
          vm.SelectedPermissionsToRole = item.permissions;
          vm.permissionDialog = true;
          
      },
      async ConfirmedDeleteItem()
      {
          let vm = this;
          await axios.delete(URL.Role.deleteItem+vm.SwapId).then(async (res)=>{
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
          window.scrollTo({top:0,behavior:"smooth"});
          vm.inEditMode = true;
      },
      async LoadItems()
      {
          let vm = this;
          await axios.get(URL.Role.public).then((res)=>{
                  if(MSGHNDL.resultChk(res.data))
                  {
                      console.warn(res.data.data);
                     vm.RoleTitleTableItems = res.data.data;
                  }
                  }).catch((err)=>{
                      console.error(err);
                      MSGHNDL.ERR(err.message)
                    });
      },
      async LoadPermissions()
      {
          let vm = this;
          await axios.get(URL.Permission.tree).then((res)=>{
                  if(MSGHNDL.resultChk(res.data))
                  {
                      console.warn(res.data.data);
                     vm.Permissions = vm.list_to_tree(res.data.data);
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
                  await axios.post(URL.Role.public,vm.FormModel).then(async (res)=>{
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
                  await axios.put(URL.Role.public,vm.FormModel).then(async (res)=>{
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
