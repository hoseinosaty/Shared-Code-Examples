<template>
  <div>
    <div class="page-title">
      Dashboard
    </div>
    <v-layout row wrap justify-space-between>
      <v-flex xs12 sm12 md3 lg3 xl3 class="pl-10 pa-2">
        <v-card class="card-container">
          <v-card-title class="styled-card-title">Done tasks</v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm12 md4 lg4 xl4 style="padding:10px">
                <div>
                  <div class="white__text">ToDo</div>
                  <div class="white__text">53%</div>
                </div>
              </v-flex>
              <v-flex xs12 sm12 md4 lg4 xl4 style="padding:10px">
                <div>
                  <div class="white__text">Done</div>
                  <div class="white__text">38%</div>
                </div>
              </v-flex>
              <v-flex xs12 sm12 md4 lg4 xl4 style="padding:10px">
                <div>
                  <div class="white__text">Fail</div>
                  <div class="white__text">12%</div>
                </div>
              </v-flex>
              <v-flex xs12 sm12 md12 lg12 xl12 style="padding:10px">
                <span class="white__text">38%</span>
                <v-progress-linear :value="38" color="orange" rounded></v-progress-linear>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md3 lg3 xl3 class="pl-10 pa-2">
        <v-card class="card-container">
          <v-card-title class="styled-card-title">Wagon status</v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm12 md4 lg4 xl4 style="padding:10px">
                <div>
                  <div class="white__text">In-use</div>
                  <div class="white__text">53%</div>
                </div>
              </v-flex>
              <v-flex xs12 sm12 md4 lg4 xl4 style="padding:10px">
                <div>
                  <div class="white__text">Wait</div>
                  <div class="white__text">38%</div>
                </div>
              </v-flex>
              <v-flex xs12 sm12 md4 lg4 xl4 style="padding:10px">
                <div>
                  <div class="white__text">Expired</div>
                  <div class="white__text">12%</div>
                </div>
              </v-flex>
              <v-flex xs12 sm12 md12 lg12 xl12 style="padding:10px">
                <span class="white__text">38%</span>
                <v-progress-linear :value="38" color="green" rounded></v-progress-linear>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md3 lg3 xl3 class="pl-10 pa-2">
        <v-card class="card-container">
          <v-card-title class="styled-card-title">Empolyee status</v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm12 md4 lg4 xl4 style="padding:10px">
                <div>
                  <div class="white__text">In-work</div>
                  <div class="white__text">53%</div>
                </div>
              </v-flex>
              <v-flex xs12 sm12 md4 lg4 xl4 style="padding:10px">
                <div>
                  <div class="white__text">Wait</div>
                  <div class="white__text">38%</div>
                </div>
              </v-flex>
              <v-flex xs12 sm12 md4 lg4 xl4 style="padding:10px">
                <div>
                  <div class="white__text">In-vacation</div>
                  <div class="white__text">12%</div>
                </div>
              </v-flex>
              <v-flex xs12 sm12 md12 lg12 xl12 style="padding:10px">
                <span class="white__text">38%</span>
                <v-progress-linear :value="38" color="pink" rounded></v-progress-linear>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md3 lg3 xl3 class="pl-10 pa-2">
        <v-card class="card-container">
          <v-card-title class="styled-card-title">Ready to pay</v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm12 md6 lg6 xl6 style="padding:10px">
                <v-progress-circular :value="77" color="blue" :size="80" :width="15">77%</v-progress-circular>
              </v-flex>
              <v-flex xs12 sm12 md6 lg6 xl6 style="padding:10px;color:#fff">
                Ready tasks for move to pay list.
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 xl12 class="pl-10 pa-2">
        <v-card class="card-container">
          <v-card-title class="styled-card-title">Wagons live location</v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm12 md12 lg12 xl12 style="padding:10px">
                <l-map style="height:400px"></l-map>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md4 lg4 xl4 class="pl-10 pa-2">
        <v-card class="card-container">
          <v-card-title class="styled-card-title">Work shifts</v-card-title>
          <v-card-text>
            <v-date-picker :event-color="date => date[9] % 2 ? 'red' : 'yellow'" :events="functionEvents" color="transparent-0" no-title dark>
            </v-date-picker>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md4 lg4 xl4 class="pl-10 pa-2">
        <v-card class="card-container">
          <v-card-title class="styled-card-title"><v-chip small color="red" dark style="margin-right:10px;">NEW</v-chip> Break requests</v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm12 md12 lg12 xl12 style="padding:10px">
                <v-list three-line class="transparent-0">
                  <template v-for="(item, index) in items">
                   

                    <v-divider
                      v-if="item.divider"
                      :key="index"
                      :inset="item.inset"
                    ></v-divider>

                    <v-list-item
                      v-else 
                      class="white__text"
                      :key="item.title"
                      :style="!item.status ? 'background-color:rgba(255,0,0,0.1) !important':''"
                    >
                      <v-list-item-avatar>
                        <v-img :src="item.avatar"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title class="white__text" v-html="item.title"></v-list-item-title>
                        <v-list-item-subtitle class="white__text" v-html="'<spanvclass=`grey--text`>Requested at :</span> '+item.reqDate"></v-list-item-subtitle>
                        <div>
                          <v-list-item-subtitle class="grey--text" v-html="'<spanclass=`gray--text`>Time :</span> '+item.time"></v-list-item-subtitle>
                          <v-list-item-subtitle class="orange--text" v-if="item.status" v-html="'<span class=`gray--text`>Started at :</span> '+item.startAt"></v-list-item-subtitle>
                          <v-btn v-else small style="position:relative;top:10px" color="green accent-4" outlined>Start</v-btn>
                        </div>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-list>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-text-field outlined dark label="Search" dense class="white--text" color="#fff" hide-details></v-text-field>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md4 lg4 xl4 class="pl-10 pa-2">
        <v-card class="card-container">
          <v-card-title class="styled-card-title"><v-chip small color="orange" dark style="margin-right:10px;"><v-icon small>fa fa-exclamation-triangle</v-icon></v-chip> Expired wagons</v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm12 md12 lg12 xl12 style="padding:10px">
                <v-list three-line class="transparent-0">
                  <template v-for="(item, index) in wagons">
                   

                    <v-divider
                      v-if="item.divider"
                      :key="index"
                      :inset="item.inset"
                    ></v-divider>

                    <v-list-item
                      v-else 
                      class="white__text"
                      :key="item.title"
                    >
                      <v-list-item-avatar>
                        <v-img :src="item.avatar" width="40" contain></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title class="white__text" v-html="item.title"></v-list-item-title>
                        <v-list-item-subtitle class="white__text" v-html="'<spanvclass=`grey--text`>Wagon type :</span> '+item.type"></v-list-item-subtitle>
                        <div>
                          <span :class="item.days < 50 ? 'red--text': 'orange--text'"><b >{{item.days}}</b> Days to expire</span>
                          <v-progress-linear :value="item.days" :color="item.days < 50 ? 'red': 'orange'"></v-progress-linear>
                        </div>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-list>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-text-field outlined dark label="Search" dense class="white--text" color="#fff" hide-details></v-text-field>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 xl12 class="pl-10 pa-2">
        <v-card class="card-container">
          <v-card-title class="styled-card-title">Today tasks</v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm12 md12 lg12 xl12 style="padding:10px">
               <v-data-table dark :headers="taskTableHeader"></v-data-table>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
  },
  data:()=>({
    items: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          time:"30Min",
          reqDate:"Today 18:30",
          startAt:"Today 19:00",
          status:true,
          subtitle: `<span class="gray__text">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Brunch this weekend?',
          time:"30Min",
          reqDate:"Today 18:30",
          startAt:"Today 19:00",
          status:false,
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Brunch this weekend?',
          time:"30Min",
          reqDate:"Today 18:30",
          startAt:"Today 19:00",
          status:true,
          subtitle: `<span class="gray__text">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        { divider: true, inset: true },
      
      ],
      wagons: [
        {
          avatar: require('../assets/amb.png'),
          title: 'KTW1',
          type:"KTW",
          days:90
        },
        { divider: true, inset: true },
        {
          avatar: require('../assets/amb.png'),
          title: 'KTW2',
          type:"KTW",
          days:16
        },
        { divider: true, inset: true },
        {
          avatar: require('../assets/amb.png'),
          title: 'BTW12',
          type:"BTW",
          days:70        
          },
        { divider: true, inset: true },
      
      ],
      taskTableHeader:[
        {text:"#",value:"counter",align:"left"},
        {text:"Task Num.",value:"taskNumber",align:"left"},
        {text:"Applicant",value:"taskApplicant",align:"left"},
        {text:"Patient",value:"patientApplicant",align:"left"},
        {text:"Task type",value:"taskType",align:"left"},
        {text:"Task start time",value:"taskstart",align:"left"},
        {text:"Task end time",value:"taskstart",align:"left"},
      ]
  }),
  methods: {
      functionEvents (date) {
        const [,, day] = date.split('-')
        if ([12, 17, 28].includes(parseInt(day, 10))) return true
        if ([1, 19, 22].includes(parseInt(day, 10))) return ['red', '#00f']
        return false
      },
    },
};
</script>
