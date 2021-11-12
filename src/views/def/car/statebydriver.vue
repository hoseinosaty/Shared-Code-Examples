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
        <v-flex xs12 sm12 md12 lg12 xl12 class="pa-10">
          <div class="page-divider">
              <span>Wagon/Driver status</span>
          </div>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 xl12 class="pa-5 d-inline-flex align-center">
          <span class="white--text caption pr-2">Wagon Type:</span>
          <v-btn-toggle @change="LoadItems" dense background-color="transparent" mandatory dark  v-model="WagonType" active-class="body-1 bg-green-gradient">
              <v-btn text :value="-1"  small>All</v-btn>
              <v-btn text :value="i.value" v-for="(i,index) in WagonTypesEnum" :key="index" small>{{i.text}}</v-btn>
          </v-btn-toggle>
      </v-flex>
      <v-flex  xs12 sm12 md7 lg7 xl7 class="pa-10">
        <div  class="FlexBox" style="height:66px">
          <div class="white--text caption" style="width:150px">Color help:</div>
          <div class="FlexBox">
              <v-chip small color="black" @click="FilterWagons(-1)" dark>All</v-chip>
              <v-chip @click="FilterWagons(index.value)" small v-for="(index,i) in Status" dark :key="i" :color="index.color">{{index.text}}</v-chip>
          </div>
        </div>
      </v-flex>
      <v-flex xs12 sm12 md5 lg5 xl5 class="pa-10 d-flex justify-start align-center caption white--text">
          <span class="body-1 red--text pr-1">*</span> click on each color to filter wagons list
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 xl12 class="pl-10 pa-2">
          <v-layout row wrap>
              <v-flex v-for="(w,index) in Wagons" :key="index" xs12 sm12 md6 lg6 xl6 class="pa-2">
                  <v-sheet class="rounded-lg pa-5" style="background-color:rgba(0,0,0,.2)">
                      <v-row>
                            <v-col cols="2"><span class="caption white--text">{{w.name}}</span></v-col>
                            <v-col cols="2">
                                <v-chip style="width:100%" small :color="getStateInfo(w.workState).color"></v-chip>
                            </v-col>
                            <v-col cols="4" class="white--text">Driver1: <span class="caption white--text pl-1">{{w.firstDriver}}</span></v-col>
                            <v-col cols="4" class="white--text">Driver2: <span class="caption white--text pl-1">{{w.secondDriver}}</span></v-col>
                        </v-row>
                  </v-sheet>
              </v-flex>
          </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
const Enums = require("../../../const/enums.js");
const URL = require("../../../const/url.js");
const MSGHNDL = require("../../../components/notify.js");
const axios = require('axios');

export default {
  Name: "StatusByDriver",
  components: {
  },
  data:()=>({
      breadCrumb:[
          {text: 'Dashboard',disabled: false,href: '/'},
          {text: 'Definations',link:false},
          {text: 'Wagons',link:false},
          {text: 'Wagon/Driver status',disabled: false,href:'/cars/statusbydriver'},
      ],
      validWagons:Enums.WagonTypes,
      Status:Enums.WagonStatus,
      Wagons:[],
      WagonRepository:[],
      WagonTypesEnum:Enums.WagonTypes,
      WagonType:0
  }),
  async created()
  {
      await this.LoadItems();
  },
  methods: {
      FilterWagons(type)
      {
          let vm = this;
          if(type == -1)
          {
              vm.Wagons = vm.WagonRepository;
              return;
          }
         vm.Wagons = vm.WagonRepository.filter(function(x){return x.workState == type});
      },
      getStateInfo(stateId)
      {
          let vm = this;
          var indx = vm.Status.findIndex(x=>x.value == stateId);
          return vm.Status[indx];
      },
      async LoadItems()
      {
          let vm = this;
          await axios.get(URL.car.driverAndStateByType+vm.WagonType).then((res)=>{
                  if(MSGHNDL.resultChk(res.data))
                  {
                      console.warn(res.data.data);
                     vm.Wagons = res.data.data;
                     vm.WagonRepository = res.data.data;
                  }
                  }).catch((err)=>{
                      console.error(err);
                      MSGHNDL.ERR(err.message)
                    });
      },
    },
};

</script>
