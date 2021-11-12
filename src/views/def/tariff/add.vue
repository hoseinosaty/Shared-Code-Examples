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
                        <v-flex xs12 sm12 md5 lg5 xl5 class="pa-2">
                            <v-layout row wrap>
                                <v-flex xs12 sm12 md12 lg12 xl12 class="pa-7 d-flex align-center">
                                    <span class="white--text caption pr-2">Wagon Type:</span>
                                    <v-btn-toggle @change="LoadItems()"  dense background-color="transparent" mandatory dark  v-model="WagonType" active-class="body-1 bg-green-gradient">
                                        <v-btn text :value="i.value" v-for="(i,index) in WagonTypesEnum" :key="index" small>{{i.text}}</v-btn>
                                    </v-btn-toggle>
                                </v-flex>
                                <v-flex xs12 sm12 md12 lg12 xl12 class="pa-2 d-inline-flex align-center">
                                    <v-text-field v-model="FormModel.tariffNum"  outlined dense  label="Tariff number" dark class="pa-5"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12 lg12 xl12 class="pa-2 d-inline-flex align-center">
                                    <v-dialog ref="startTimeDialog" v-model="startTimeModal" :return-value.sync="FormModel.startTime" persistent width="290px">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field readonly v-bind="attrs" v-on="on" v-model="FormModel.startTime" outlined dense  label="Start date" dark class="pa-5"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="FormModel.startTime" scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="startTimeModal = false">
                                            Cancel
                                        </v-btn>
                                        <v-btn text color="primary" @click="$refs.startTimeDialog.save(FormModel.startTime)">
                                            OK
                                        </v-btn>
                                        </v-date-picker>
                                    </v-dialog>
                                </v-flex>
                                <v-flex xs12 sm12 md12 lg12 xl12 class="pa-2 d-inline-flex align-center">
                                    <v-dialog ref="endTimeDialog" v-model="endTimeModal" :return-value.sync="FormModel.endTime" persistent width="290px">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field readonly v-bind="attrs" v-on="on" v-model="FormModel.endTime" outlined dense  label="End date" dark class="pa-5"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="FormModel.endTime" scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="endTimeModal = false">
                                            Cancel
                                        </v-btn>
                                        <v-btn text color="primary" @click="$refs.endTimeDialog.save(FormModel.endTime)">
                                            OK
                                        </v-btn>
                                        </v-date-picker>
                                    </v-dialog>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 sm12 md7 lg7 xl7 class="pa-2">
                            <v-layout row wrap>
                                <v-flex xs12 sm12 md12 lg12 xl12 class="pa-10 bordered">
                                    <v-layout row wrap>

                                        <v-flex xs12 sm12 md8 lg8 xl8 class="pa-2 border-bottom">
                                            <span class="white--text font-weight-bolder body-2">
                                                Title
                                            </span>
                                        </v-flex>
                                        <v-flex xs12 sm12 md4 lg4 xl4 class="pa-2 border-bottom">
                                            <span class="white--text font-weight-bolder body-2">
                                            Price
                                            </span>
                                        </v-flex>

                                        <v-flex xs12 sm12 md8 lg8 xl8 class="pa-2 border-bottom border-left ">
                                            <span class="white--text">
                                                Distance to <v-text-field v-model="FormulaForm.distTo" dark outlined dense class="mr-5 ml-5" style="width:60px;display:inline-flex"></v-text-field>KM
                                            </span>
                                        </v-flex>
                                        <v-flex xs12 sm12 md4 lg4 xl4 class="pa-2 border-bottom border-left border-right">
                                            <span>
                                                <v-text-field v-model="FormulaForm.distToPrice" dark outlined dense></v-text-field>
                                            </span>
                                        </v-flex>

                                        <v-flex xs12 sm12 md8 lg8 xl8 class="pa-2 border-bottom border-left">
                                            <span class="white--text">
                                                Distance more than <v-text-field v-model="FormulaForm.distTo" dark outlined dense class="mr-5 ml-5" style="width:60px;display:inline-flex"></v-text-field> each KM
                                            </span>
                                        </v-flex>
                                        <v-flex xs12 sm12 md4 lg4 xl4 class="pa-2 border-bottom border-left border-right">
                                            <span>
                                                <v-text-field v-model="FormulaForm.distMorePrice" dark outlined dense></v-text-field>
                                            </span>
                                        </v-flex>

                                        <v-flex xs12 sm12 md8 lg8 xl8 class="pa-2 border-bottom border-left">
                                            <span class="white--text">
                                                Weekend and Holiday price
                                            </span>
                                        </v-flex>
                                        <v-flex xs12 sm12 md4 lg4 xl4 class="pa-2 border-bottom border-left border-right">
                                            <span>
                                                <v-text-field v-model="FormulaForm.wD" dark outlined dense></v-text-field>
                                            </span>
                                        </v-flex>

                                        <v-flex xs12 sm12 md8 lg8 xl8 class="pa-2 border-bottom border-left">
                                            <span class="white--text">
                                                Night time
                                            </span>
                                        </v-flex>
                                        <v-flex xs12 sm12 md4 lg4 xl4 class="pa-2 border-bottom border-left border-right">
                                            <span>
                                                <v-text-field v-model="FormulaForm.nT" dark outlined dense></v-text-field>
                                            </span>
                                        </v-flex>

                                        <v-flex xs12 sm12 md8 lg8 xl8 class="pa-2 border-bottom border-left">
                                            <span class="white--text">
                                                Waiting time to each <v-text-field v-model="FormulaForm.wT" dark outlined dense class="mr-5 ml-5" style="width:60px;display:inline-flex"></v-text-field> Minutes
                                            </span>
                                        </v-flex>
                                        <v-flex xs12 sm12 md4 lg4 xl4 class="pa-2 border-bottom border-left border-right">
                                            <span>
                                                <v-text-field v-model="FormulaForm.wTPrice" dark outlined dense></v-text-field>
                                            </span>
                                        </v-flex>

                                        <v-flex xs12 sm12 md8 lg8 xl8 class="pa-2 border-bottom border-left">
                                            <span class="white--text">
                                                Desinfektion
                                            </span>
                                        </v-flex>
                                        <v-flex xs12 sm12 md4 lg4 xl4 class="pa-2 border-bottom border-left border-right">
                                            <span>
                                                <v-text-field v-model="FormulaForm.ink" dark outlined dense></v-text-field>
                                            </span>
                                        </v-flex>

                                        <v-flex xs12 sm12 md8 lg8 xl8 class="pa-2 border-bottom border-left">
                                            <span class="white--text">
                                            Patient weight more than <v-text-field v-model="FormulaForm.pW" dark outlined dense class="mr-5 ml-5" style="width:60px;display:inline-flex"></v-text-field> each KG
                                            </span>
                                        </v-flex>
                                        <v-flex xs12 sm12 md4 lg4 xl4 class="pa-2 border-bottom border-left border-right">
                                            <span>
                                                <v-text-field v-model="FormulaForm.pWPrice" dark outlined dense></v-text-field>
                                            </span>
                                        </v-flex>

                                        <v-flex xs12 sm12 md8 lg8 xl8 class="pa-2 border-bottom border-left">
                                            <span class="white--text">
                                                Cancel task after start
                                            </span>
                                        </v-flex>
                                        <v-flex xs12 sm12 md4 lg4 xl4  class="pa-2 border-bottom border-left border-right">
                                            <span>
                                                <v-text-field dark v-model="FormulaForm.aS" outlined dense></v-text-field>
                                            </span>
                                        </v-flex>

                                        <v-flex xs12 sm12 md8 lg8 xl8 class="pa-2 border-bottom border-left">
                                            <span class="white--text">
                                                Cancel task before start
                                            </span>
                                        </v-flex>
                                        <v-flex xs12 sm12 md4 lg4 xl4 class="pa-2 border-bottom border-left border-right">
                                            <span>
                                                <v-text-field v-model="FormulaForm.bS" dark outlined dense></v-text-field>
                                            </span>
                                        </v-flex>

                                        <v-flex xs12 sm12 md8 lg8 xl8 class="pa-2 border-bottom border-left">
                                            <span class="white--text">
                                                Special cases 1
                                            </span>
                                        </v-flex>
                                        <v-flex xs12 sm12 md4 lg4 xl4 class="pa-2 border-bottom border-left border-right">
                                            <span>
                                                <v-text-field dark v-model="FormulaForm.sC1" outlined dense></v-text-field>
                                            </span>
                                        </v-flex>

                                        <v-flex xs12 sm12 md8 lg8 xl8 class="pa-2 border-bottom border-left">
                                            <span class="white--text">
                                                Special cases 2
                                            </span>
                                        </v-flex>
                                        <v-flex xs12 sm12 md4 lg4 xl4 class="pa-2 border-bottom border-left border-right">
                                            <span>
                                                <v-text-field v-model="FormulaForm.sC2" dark outlined dense></v-text-field>
                                            </span>
                                        </v-flex>

                                        <v-flex xs12 sm12 md8 lg8 xl8 class="pa-2 border-bottom border-left">
                                            <span class="white--text">
                                                Special cases 3
                                            </span>
                                        </v-flex>
                                        <v-flex xs12 sm12 md4 lg4 xl4 class="pa-2 border-bottom border-left border-right">
                                            <span>
                                                <v-text-field v-model="FormulaForm.sC3" dark outlined dense></v-text-field>
                                            </span>
                                        </v-flex>

                                        <v-flex xs12 sm12 md8 lg8 xl8 class="pa-2 border-bottom border-left">
                                            <span class="white--text">
                                            Tax
                                            </span>
                                        </v-flex>
                                        <v-flex xs12 sm12 md4 lg4 xl4 class="pa-2 border-bottom  border-left border-right">
                                            <span>
                                                <v-text-field  v-model="FormulaForm.Tax" dark outlined dense></v-text-field>
                                            </span>
                                        </v-flex>

                                    </v-layout> 
                                </v-flex>
                            </v-layout>
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
                <v-card-title class="styled-card-title">Tariff titles</v-card-title>
                <v-card-text>
                    <v-layout row wrap>
                    <v-flex xs12 sm12 md12 lg12 xl12 style="padding:10px">
                    <v-data-table dark :items="tariffTableItems" :headers="tariffTableHeaders">
                        <template v-slot:[`item.counter`]="{item}">
                            {{tariffTableItems.indexOf(item)+1}}
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
const defaultFormula = Object.freeze({
    distTo:0,
    distToPrice:0,
    distMore:0,
    distMorePrice:0,
    wD:0,//weekend
    nT:0,//nighttime
    wT:0,//Waiting time
    wTPrice:0,//waitngTimePrice
    ink:0,//desinfektion
    pW:0,//Patient Weight
    pWPrice:0,//PatienWeight price
    aS:0,//Cancel task after start price
    bS:0,//Cancel task before start price
    sC1:0,//Special case 1
    sC2:0,//Special case 1
    sC3:0,//Special case 1
    Tax:0
});
const defultFormModel = Object.freeze({
    title:"",
    startTime:"",
    endTime:"",
    tariffNum:"",
    type:1,
    tariffTitle:[],
    id:0,
    formulaObject:"",
    formula:""
});
export default {
  Name: "addTariff",
  components: {
  },
  data:()=>({
      breadCrumb:[
          {text: 'Dashboard',disabled: false,href: '/'},
          {text: 'Definations',link:false},
          {text: 'Tariffs',link:false},
          {text: 'Define tariff',disabled: false,href:'/tarrif/add'},
      ],
      tariffTitles:[],
      WagonTypesEnum:Enums.WagonTypes,
      WagonType:1,
      FormModel:Object.assign({},defultFormModel),
      rules:{
          checkempty:[val => (val || '').length > 0 || 'This field is required'],
          checkemptyarr:[val => (val || []).length > 0 || 'This field is required']
      },
      startTimeModal:false,
      endTimeModal:false,
      tariffTableItems:[],
      tariffTableHeaders:[
        {text:"#",value:"counter",align:"left"},
        {text:"Tariff number",value:"tariffNum",align:"left"},
        {text:"Start at",value:"startTime",align:"left"},
        {text:"End at",value:"endTime",align:"left"},
        {text:"Wagon type",value:"wt",align:"left"},
        {text:"Operation",value:"operation",align:"left"},
      ],
      inEditMode:false,
      SwapId:"",
      FormulaForm:Object.assign({},defaultFormula)
      
  }),
 async created()
  { 
      await this.LoadItems()
  },
  methods:{
      exitEditMode()
      {
          let vm = this;
          vm.inEditMode = false;
          vm.FormModel = Object.assign({}, defultFormModel);
          vm.FormulaForm = Object.assign({}, defaultFormula);
          vm.$refs.additemformref.reset();
      },
      getWagonTypeTitle(t)
      {
          let vm = this;
          var indx = vm.WagonTypesEnum.findIndex(x=>x.value == t);
          return vm.WagonTypesEnum[indx].text;
      },
      EditItem(item)
      {
          let vm = this;
          console.error("Item",item);
          window.scrollTo({top:0,behavior:"smooth"});
          vm.wagonType = item.type;
          vm.FormulaForm = Object.assign({},JSON.parse(item.formulaObject));
          vm.FormModel = item;
          vm.inEditMode = true;
      },
      async ConfirmedDeleteItem()
      {
          let vm = this;
          await axios.delete(URL.Tarrif.deleteItem+vm.SwapId).then(async (res)=>{
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
        this.SwapId = item.tariffNum;
        vm.$refs.warningDialog.ShowDialog();
      },
     
      async AddItem()
      {
          var vm = this;
          var Formula = `(${vm.FormulaForm.distToPrice} + ((D-${vm.FormulaForm.distTo}) > ${vm.FormulaForm.distTo}) ? ((D-${vm.FormulaForm.distTo}) * ${vm.FormulaForm.distMorePrice}) : 0)+`;
          Formula += `((W > 0) ? (${vm.FormulaForm.wD}): 0)+`;
          Formula += `((N > 0) ? (${vm.FormulaForm.nT}): 0)+`;
          Formula += `((WAIT >= ${vm.FormulaForm.wT}) ? ((WAIT/${vm.FormulaForm.wT}) * ${vm.FormulaForm.wTPrice}): 0)+`;
          Formula += `((INK > 0) ? (${vm.FormulaForm.ink}): 0)+`;
          Formula += `((PW >= ${vm.FormulaForm.pW}) ? (${vm.FormulaForm.pWPrice}): 0)+`;
          Formula += `(${vm.FormulaForm.sC1})+`;
          Formula += `(${vm.FormulaForm.sC2})+`;
          Formula += `(${vm.FormulaForm.sC3})+`;
          Formula += `(${Formula})+((${vm.FormulaForm.Tax}*${Formula}) / 100)`;
          vm.FormModel.formula = Formula;
          vm.FormModel.formulaObject = JSON.stringify(vm.FormulaForm);
          if(!vm.inEditMode)
          {
            vm.FormModel.type = vm.WagonType;
            await axios.post(URL.Tarrif.public,vm.FormModel).then(async (res)=>{
                    if(MSGHNDL.resultChk(res.data))
                    {
                        
                        vm.exitEditMode();
                        await vm.LoadItems();
                    }
                    }).catch((err)=>{
                        console.error(err);
                        MSGHNDL.ERR(err.message)
                        });
          }
          else
          {
            await axios.put(URL.Tarrif.public,vm.FormModel).then(async (res)=>{
                  if(MSGHNDL.resultChk(res.data))
                  {
                     vm.$refs.additemformref.reset();
                     vm.exitEditMode();
                     await vm.LoadItems();
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
          await axios.get(URL.Tarrif.load+vm.WagonType).then((res)=>{
                  if(MSGHNDL.resultChk(res.data))
                  {
                      console.warn("Tariffs : ",res.data.data);
                     vm.tariffTableItems = res.data.data;
                     if(vm.tariffTableItems.length > 0)
                     {
                         var it = parseInt(vm.tariffTableItems[vm.tariffTableItems.length - 1].tariffNum);
                         if(it < 10)
                         {
                             var h = (parseInt(it+1)).toString();
                             vm.FormModel.tariffNum ="00"+h;
                         }
                         if(it > 9 && it < 100)
                         {
                             vm.FormModel.tariffNum = "0"+(it+1);
                         }
                         if(it > 100)
                         {
                             vm.FormModel.tariffNum = it;
                         }
                         
                     }
                     else
                     {
                         vm.FormModel.tariffNum = "001";
                     }
                  }
                  }).catch((err)=>{
                      console.error(err);
                      MSGHNDL.ERR(err.message)
                    });
      },
  }
}
</script>