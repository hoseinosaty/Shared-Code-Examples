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
      <v-flex xs12 sm12 md12 lg12 xl12 class="pa-6">
          <div class="page-divider">
              <span>Create</span>
          </div>
      </v-flex>
      <v-flex xs12 sm12 md6 lg6 xl6 class="pa-6">
          <v-text-field readonly outlined dense hide-details v-model="FormModel.taskNumber" dark label="Task number" prepend-inner-icon="fa fa-qrcode"></v-text-field>
      </v-flex>
      <v-flex xs12 sm12 md6 lg6 xl6 class="pa-6">
          <v-btn class="mr-5" color="red darken-1" dark><v-icon small class="pr-5">fa fa-map-marker-alt</v-icon>Routing</v-btn>
          <v-btn class="mr-5" color="blue darken-1" dark><v-icon small class="pr-5">fa fa-copy</v-icon>Duplicate task</v-btn>
          <v-btn class="mr-5" color="purple darken-1" dark><v-icon small class="pr-5">fa fa-redo-alt</v-icon>Invert task</v-btn>
      </v-flex>
      
      <v-flex xs12 sm12 md12 lg12 xl12 class="pa-6">
          <div class="form-title">
            <span>
                <v-icon class="pink--text" small>fa fa-plus</v-icon>
                 Add new item
            </span> 
            </div>
          <v-form ref="newadminformref">
              <v-stepper dark v-model="FormStep">
                  <v-stepper-header>
                      <v-stepper-step editable step="1" color="pink">
                          Applicant and Patient
                      </v-stepper-step>
                      <v-divider></v-divider>
                      <v-stepper-step editable step="2" color="pink">
                          Insurance and Task type
                      </v-stepper-step>
                      <v-divider></v-divider>
                      <v-stepper-step editable  step="3" color="pink">
                          Addresses
                      </v-stepper-step>
                  </v-stepper-header>
                  <v-stepper-content step="1">
                      <v-layout row wrap>
                          <v-flex xs12 sm12 md4 lg4 xl4 class="pa-4">
                              <div class="form-box">
                                <div class="form-box-title white--text">Applicant</div>
                                  <v-row>
                                      <v-col cols="12">
                                          <v-text-field hide-details dark outlined dense label="Search in google"></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                          <v-text-field v-model="FormModel.applicant.name" hide-details dark outlined dense label="First name"></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                          <v-text-field v-model="FormModel.applicant.family" hide-details dark outlined dense label="Last name"></v-text-field>
                                      </v-col>
                                      <v-col cols="12">
                                          <v-autocomplete :items="Jobtitles" v-model="FormModel.applicant.jobtitleId" item-text="title" item-value="id"  hide-details dark outlined dense label="Job title"></v-autocomplete>
                                      </v-col>
                                      <v-col cols="12">
                                        <span class="pr-2 white--text">Gender:</span>
                                        <v-btn-toggle   dense background-color="transparent" mandatory dark  v-model="FormModel.applicant.gender" active-class="body-1 bg-green-gradient">
                                            <v-btn text :value="i.value" v-for="(i,index) in Genders" :key="index" small>{{i.text}}</v-btn>
                                        </v-btn-toggle>
                                      </v-col>
                                      <v-col cols="12">
                                          <v-text-field v-model="FormModel.applicant.mobile" hide-details dark outlined dense label="Mobile nummer"></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                          <v-text-field v-model="FormModel.applicant.tell" hide-details dark outlined dense label="Tell nummer"></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                          <v-text-field v-model="FormModel.applicant.fax" hide-details dark outlined dense label="Fax nummer"></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                          <v-text-field v-model="FormModel.applicant.email" hide-details dark outlined dense label="Email"></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                          <v-text-field v-model="FormModel.applicant.street" hide-details dark outlined dense label="Street"></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                          <v-text-field v-model="FormModel.applicant.plz" hide-details dark outlined dense label="PLZ"></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                          <v-text-field v-model="FormModel.applicant.city" hide-details dark outlined dense label="City"></v-text-field>
                                      </v-col>
                                      <v-col cols="12">
                                          <v-textarea v-model="FormModel.applicant.info" hide-details dark outlined dense label="Descriptions"></v-textarea>
                                      </v-col>
                                  </v-row>
                              </div>
                          </v-flex>
                          <v-flex xs12 sm12 md4 lg4 xl4 class="pa-4">
                              <div class="form-box">
                                  <div class="form-box-title white--text">Patient</div>
                                  <v-row>
                                      <v-col cols="12">
                                          <v-text-field hide-details dark outlined dense label="Search in google"></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                          <v-text-field v-model="FormModel.patient.name" hide-details dark outlined dense label="First name"></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                          <v-text-field v-model="FormModel.patient.family" hide-details dark outlined dense label="Last name"></v-text-field>
                                      </v-col>
                                      <v-col cols="12">
                                          <v-autocomplete :items="Jobtitles" v-model="FormModel.patient.jobtitleId" item-text="title" item-value="id"  hide-details dark outlined dense label="Job title"></v-autocomplete>
                                      </v-col>
                                      <v-col cols="12">
                                        <span class="pr-2 white--text">Gender:</span>
                                        <v-btn-toggle   dense background-color="transparent" mandatory dark  v-model="FormModel.patient.gender" active-class="body-1 bg-green-gradient">
                                            <v-btn text :value="i.value" v-for="(i,index) in Genders" :key="index" small>{{i.text}}</v-btn>
                                        </v-btn-toggle>
                                      </v-col>
                                      <v-col cols="12">
                                          <v-text-field v-model="FormModel.patient.email" hide-details dark outlined dense label="Email"></v-text-field>
                                      </v-col>
                                      
                                      <v-col cols="6">
                                          <v-text-field v-model="FormModel.patient.fax" hide-details dark outlined dense label="Fax nummer"></v-text-field>
                                      </v-col>

                                      <v-col cols="6">
                                        <v-dialog ref="dialog" v-model="selectBirthdateDialog" :return-value.sync="FormModel.patient.birthday" persistent  width="290px">
                                            <template v-slot:activator="{ on, attrs }">
                                            <v-text-field  hide-details dark outlined dense label="Birth date" v-model="FormModel.patient.birthday"  readonly v-bind="attrs" v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker  v-model="FormModel.patient.birthday" scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="selectBirthdateDialog = false" >
                                                Cancel
                                            </v-btn>
                                            <v-btn text color="primary" @click="$refs.dialog.save(FormModel.patient.birthday)">
                                                OK
                                            </v-btn>
                                            </v-date-picker>
                                        </v-dialog>
                                      </v-col>
                                      <v-col cols="6">
                                          <v-text-field v-model="FormModel.patient.mobile" hide-details dark outlined dense label="Mobile nummer"></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                          <v-text-field v-model="FormModel.patient.tell" hide-details dark outlined dense label="Tell nummer"></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                          <v-text-field v-model="FormModel.patient.street" hide-details dark outlined dense label="Street"></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                          <v-text-field v-model="FormModel.patient.plz" hide-details dark outlined dense label="PLZ"></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                          <v-text-field v-model="FormModel.patient.city" hide-details dark outlined dense label="City"></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                          <v-text-field v-model="FormModel.patient.state" hide-details dark outlined dense label="State"></v-text-field>
                                      </v-col>
                                      <v-col cols="12">
                                          <v-textarea v-model="FormModel.patient.info" hide-details dark outlined dense label="Descriptions"></v-textarea>
                                      </v-col>
                                  </v-row>
                              </div>
                          </v-flex>
                          <v-flex xs12 sm12 md4 lg4 xl4 class="pa-4">
                              <div class="form-box">
                                  <div class="form-box-title white--text">Wagon</div>
                                  <v-row>
                                      <v-col cols="12">
                                        <span class="pr-11 white--text">Wagon type:</span>
                                        <v-btn-toggle @change="loadTariffs()"  dense background-color="transparent" mandatory dark  v-model="FormModel.carType" active-class="body-1 bg-green-gradient">
                                            <v-btn text :value="i.value" v-for="(i,index) in validWagons" :key="index" small>{{i.text}}</v-btn>
                                        </v-btn-toggle>
                                      </v-col>
                                  </v-row>
                              </div>
                              <div class="form-box mt-5">
                                  <div class="form-box-title white--text">Transport</div>
                                  <v-row>
                                      <v-col cols="12">
                                        <span class="pr-7 white--text">Transport type:</span>
                                        <v-btn-toggle   dense background-color="transparent" mandatory dark  v-model="FormModel.transportTypeId" active-class="body-1 bg-green-gradient">
                                            <v-btn text :value="i.id" v-for="(i,index) in transportTypes" :key="index" small>{{i.title}}</v-btn>
                                        </v-btn-toggle>
                                      </v-col>
                                  </v-row>
                              </div>
                              <div class="form-box mt-5">
                                  <div class="form-box-title white--text">Infektion</div>
                                  <v-row>
                                      <v-col cols="12">
                                          <v-autocomplete :disabled="FormModel.carType != 3" :items="infektions" v-model="FormModel.infectionTypeId" item-text="title" item-value="id" hide-details dark outlined dense label="Infektion type"></v-autocomplete>
                                      </v-col>
                                      <v-col cols="12">
                                          <v-textarea :disabled="FormModel.carType != 3" v-model="FormModel.infectionInfo" hide-details dark outlined dense label="Patient fahrt descriptions"></v-textarea>
                                      </v-col>
                                  </v-row>
                              </div>
                          </v-flex>
                          <v-flex xs12 sm12 md12 lg12 xl12 class="pa-4 d-flex align-center justify-end">
                              <v-btn color="orange" @click="FormStep++"  dark> Next <v-icon class="pl-5" small>fas fa-chevron-right</v-icon></v-btn>
                          </v-flex>
                      </v-layout>
                  </v-stepper-content>
                  <v-stepper-content step="2">
                       <v-layout row wrap>
                           <v-flex xs12 sm12 md4 lg4 xl4 class="pa-4">
                              <div class="form-box">
                                  <div class="form-box-title white--text">Insurance</div>
                                  <v-row>
                                      <v-col cols="12">
                                        <span class="pr-11 white--text">Insurance type:</span>
                                        <v-btn-toggle   dense background-color="transparent" mandatory dark  v-model="FormModel.insuranceType" active-class="body-1 bg-green-gradient">
                                            <v-btn text :value="i.value" v-for="(i,index) in incuranceTypes" :key="index" small>{{i.text}}</v-btn>
                                        </v-btn-toggle>
                                      </v-col>
                                      <v-col cols="12">
                                          <v-autocomplete v-model="FormModel.tarrifId" :items="tariffs" item-text="tariffNum" item-value="triffNum" hide-details dark outlined dense label="Tariff nummer"></v-autocomplete>
                                      </v-col>
                                      <v-col cols="12">
                                          <v-text-field v-model="FormModel.insuranceName"  hide-details dark outlined dense label="Insurance Co. name"></v-text-field>
                                      </v-col>
                                      <v-col cols="12">
                                          <v-text-field v-model="FormModel.insuranceNumber" hide-details dark outlined dense label="Insurance Co. nummer"></v-text-field>
                                      </v-col>
                                      <v-col cols="12">
                                          <v-text-field v-model="FormModel.insuranceSupplementNumber" hide-details dark outlined dense label="Insured nummer"></v-text-field>
                                      </v-col>
                                  </v-row>
                              </div>
                          </v-flex>
                          <v-flex xs12 sm12 md4 lg4 xl4 class="pa-4">
                            <div class="form-box">
                                <div class="form-box-title white--text">Genehmigung</div>
                                <v-row>
                                  <v-col cols="12">
                                      <span class="pr-11 white--text">Type:</span>
                                      <v-btn-toggle   dense background-color="transparent" mandatory dark  v-model="FormModel.approvalType" active-class="body-1 bg-green-gradient">
                                          <v-btn text :value="i.value" v-for="(i,index) in Genehmigungs" :key="index" small>{{i.text}}</v-btn>
                                      </v-btn-toggle>
                                  </v-col>
                                  <v-col cols="12">
                                      <v-textarea v-model="FormModel.approvalInfo" hide-details dark outlined dense label="Description"></v-textarea>
                                  </v-col>
                                </v-row>
                            </div>
                            <div class="form-box mt-5">
                                <div class="form-box-title white--text">Transportchein</div>
                                <v-row>
                                  <v-col cols="12">
                                      <span class="pr-11 white--text">Transportchein:</span>
                                      <v-btn-toggle   dense background-color="transparent" mandatory dark  v-model="FormModel.transeportChein" active-class="body-1 bg-green-gradient">
                                          <v-btn text :value="i.value" v-for="(i,index) in TransportcheinEnum" :key="index" small>{{i.text}}</v-btn>
                                      </v-btn-toggle>
                                  </v-col>
                                </v-row>
                            </div>
                          </v-flex>
                          <v-flex xs12 sm12 md4 lg4 xl4 class="pa-4">
                            <div class="form-box">
                                <div class="form-box-title white--text">Task type</div>
                                <v-row>
                                  <v-col cols="5">
                                      <v-autocomplete v-model="FormModel.taskType" :items="TaskTypes" hide-details dark outlined dense label="Task type"></v-autocomplete>
                                  </v-col>
                                  <v-col cols="7">
                                      <v-autocomplete :items="TaskTitles" v-model="FormModel.taskTitleId" item-text="title" item-value="id" hide-details dark outlined dense label="Task title"></v-autocomplete>
                                  </v-col>
                                </v-row>
                            </div>
                            <div class="form-box mt-5">
                                <div class="form-box-title white--text" style="width:150px">Task senstive</div>
                                <v-row>
                                  <v-col cols="12">
                                      <span class="pr-11 white--text">Senstivity:</span>
                                      <v-btn-toggle  dense background-color="transparent" :mandatory="FormModel.taskType != 3" dark  v-model="TaskSenstiveId" active-class="body-1 bg-green-gradient">
                                          <v-btn :disabled="FormModel.taskType == 3" text :value="i.value" v-for="(i,index) in TaskSenstives" :key="index" small>{{i.text}}</v-btn>
                                      </v-btn-toggle>
                                  </v-col>
                                </v-row>
                            </div>
                            <div v-if="FormModel.taskType != 0" class="form-box mt-5">
                                <div class="form-box-title white--text" style="width:150px">Date/Time</div>
                                <v-row v-if="FormModel.taskType == 1">
                                    <v-col cols="6">
                                        <v-dialog ref="onWayDialogStartDate" v-model="selectStartDateOneWayDialog" :return-value.sync="FormModel.taskOneWay.date" persistent  width="290px">
                                            <template v-slot:activator="{ on, attrs }">
                                            <v-text-field  hide-details v-model="FormModel.taskOneWay.date" outlined dense label=" Start date"  readonly v-bind="attrs" v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker  v-model="FormModel.taskOneWay.date" scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="selectStartDateOneWayDialog = false" >
                                                Cancel
                                            </v-btn>
                                            <v-btn text color="primary" @click="$refs.onWayDialogStartDate.save(FormModel.taskOneWay.date)">
                                                OK
                                            </v-btn>
                                            </v-date-picker>
                                        </v-dialog>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-dialog ref="onWayDialogSelectTimeDialog" v-model="onWayDialogSelectTime" :return-value.sync="FormModel.taskOneWay.time" persistent width="290px">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="FormModel.taskOneWay.time" outlined dense hide-details label=" Start time" readonly v-bind="attrs" v-on="on"></v-text-field>
                                            </template>
                                            <v-time-picker format="24hr" v-if="onWayDialogSelectTime" v-model="FormModel.taskOneWay.time" full-width>
                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="onWayDialogSelectTime = false">
                                                Cancel
                                                </v-btn>
                                                <v-btn text color="primary" @click="$refs.onWayDialogSelectTimeDialog.save(FormModel.taskOneWay.time)">
                                                OK
                                                </v-btn>
                                            </v-time-picker>
                                        </v-dialog>
                                    </v-col>
                                </v-row>
                                <v-row v-if="FormModel.taskType == 2">
                                    <v-col cols="6">
                                        <v-dialog ref="goDialogStartDate" v-model="selectStartDateGoDialog" :return-value.sync="FormModel.taskGoAndReturn.goDate" persistent  width="290px">
                                            <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="FormModel.taskGoAndReturn.goDate" outlined dense hide-details label=" Go date"  readonly v-bind="attrs" v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker  v-model="FormModel.taskGoAndReturn.goDate" scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="selectStartDateGoDialog = false" >
                                                Cancel
                                            </v-btn>
                                            <v-btn text color="primary" @click="$refs.goDialogStartDate.save(FormModel.taskGoAndReturn.goDate)">
                                                OK
                                            </v-btn>
                                            </v-date-picker>
                                        </v-dialog>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-dialog ref="returnDialogEndDate" v-model="selectEndDateReturnDialog" :return-value.sync="FormModel.taskGoAndReturn.returnDate" persistent  width="290px">
                                            <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="FormModel.taskGoAndReturn.returnDate" outlined dense hide-details label="Return date" readonly v-bind="attrs" v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker  v-model="FormModel.taskGoAndReturn.returnDate" scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="selectEndDateReturnDialog = false" >
                                                Cancel
                                            </v-btn>
                                            <v-btn text color="primary" @click="$refs.returnDialogEndDate.save(FormModel.taskGoAndReturn.returnDate)">
                                                OK
                                            </v-btn>
                                            </v-date-picker>
                                        </v-dialog>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-dialog ref="goDialogSelectstarttimeDialog" v-model="goDialogSelectStartTime" :return-value.sync="FormModel.taskGoAndReturn.goStartTime" persistent width="290px">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="FormModel.taskGoAndReturn.goStartTime" outlined dense hide-details label=" Go start time" readonly v-bind="attrs" v-on="on"></v-text-field>
                                            </template>
                                            <v-time-picker format="24hr" v-if="goDialogSelectStartTime" v-model="FormModel.taskGoAndReturn.goStartTime" full-width>
                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="goDialogSelectStartTime = false">
                                                Cancel
                                                </v-btn>
                                                <v-btn text color="primary" @click="$refs.goDialogSelectstarttimeDialog.save(FormModel.taskGoAndReturn.goStartTime)">
                                                OK
                                                </v-btn>
                                            </v-time-picker>
                                        </v-dialog>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-dialog ref="returnDialogSelectstarttimeDialog" v-model="returnDialogSelectStartTime" :return-value.sync="FormModel.taskGoAndReturn.returnStartTime" persistent width="290px">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="FormModel.taskGoAndReturn.returnStartTime" outlined dense hide-details label="Return start time" readonly v-bind="attrs" v-on="on"></v-text-field>
                                            </template>
                                            <v-time-picker format="24hr" v-if="returnDialogSelectStartTime" v-model="FormModel.taskGoAndReturn.returnStartTime" full-width>
                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="returnDialogSelectStartTime = false">
                                                Cancel
                                                </v-btn>
                                                <v-btn text color="primary" @click="$refs.returnDialogSelectstarttimeDialog.save(FormModel.taskGoAndReturn.returnStartTime)">
                                                OK
                                                </v-btn>
                                            </v-time-picker>
                                        </v-dialog>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-dialog ref="goDialogSelectendtimeDialog" v-model="goDialogSelectendTime" :return-value.sync="FormModel.taskGoAndReturn.goEndTime" persistent width="290px">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="FormModel.taskGoAndReturn.goEndTime" outlined dense hide-details label=" Go end time" readonly v-bind="attrs" v-on="on"></v-text-field>
                                            </template>
                                            <v-time-picker format="24hr" v-if="goDialogSelectendTime" v-model="FormModel.taskGoAndReturn.goEndTime" full-width>
                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="goDialogSelectendTime = false">
                                                Cancel
                                                </v-btn>
                                                <v-btn text color="primary" @click="$refs.goDialogSelectendtimeDialog.save(FormModel.taskGoAndReturn.goEndTime)">
                                                OK
                                                </v-btn>
                                            </v-time-picker>
                                        </v-dialog>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-dialog ref="returnDialogSelectendtimeDialog" v-model="returnDialogSelectendTime" :return-value.sync="FormModel.taskGoAndReturn.returnEndTime" persistent width="290px">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="FormModel.taskGoAndReturn.returnEndTime" outlined dense hide-details label="Return end time" readonly v-bind="attrs" v-on="on"></v-text-field>
                                            </template>
                                            <v-time-picker format="24hr" v-if="returnDialogSelectendTime" v-model="FormModel.taskGoAndReturn.returnEndTime" full-width>
                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="returnDialogSelectendTime = false">
                                                Cancel
                                                </v-btn>
                                                <v-btn text color="primary" @click="$refs.returnDialogSelectendtimeDialog.save(FormModel.taskGoAndReturn.returnEndTime)">
                                                OK
                                                </v-btn>
                                            </v-time-picker>
                                        </v-dialog>
                                    </v-col>
                                </v-row>
                                <div class="d-flex flex-column" style="width:100%" v-if="FormModel.taskType == 3">
                                    <v-row v-for="(i,index) in FormModel.taskSeries" :key="index" >
                                        <v-col cols="4">
                                            <v-dialog :ref="'taskseriesstartdateref'+index" v-model="dynamicContents['taskseriesstartdateref'+index]" :return-value.sync="i.date" persistent  width="290px">
                                                <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="i.date" outlined dense hide-details label="Start date"  readonly v-bind="attrs" v-on="on"></v-text-field>
                                                </template>
                                                <v-date-picker  v-model="i.date" scrollable>
                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="dynamicContents['taskseriesstartdateref'+index] = false" >
                                                    Cancel
                                                </v-btn>
                                                <v-btn text color="primary" @click="$refs['taskseriesstartdateref'+index][0].save(i.date)">
                                                    OK
                                                </v-btn>
                                                </v-date-picker>
                                            </v-dialog>
                                        </v-col>
                                        <v-col cols="3">
                                            <v-dialog :ref="'refdlgtaskseriesstarttime'+index" v-model="dynamicContents['refdlgtaskseriesstarttime'+index]" :return-value.sync="i.startTime" persistent width="290px">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field v-model="i.startTime" outlined dense hide-details label="Start time" readonly v-bind="attrs" v-on="on"></v-text-field>
                                                </template>
                                                <v-time-picker format="24hr" v-if="dynamicContents['refdlgtaskseriesstarttime'+index]" v-model="i.startTime" full-width>
                                                    <v-spacer></v-spacer>
                                                    <v-btn text color="primary" @click="dynamicContents['refdlgtaskseriesstarttime'+index] = false">
                                                    Cancel
                                                    </v-btn>
                                                    <v-btn text color="primary" @click="$refs['refdlgtaskseriesstarttime'+index][0].save(i.startTime)">
                                                    OK
                                                    </v-btn>
                                                </v-time-picker>
                                            </v-dialog>
                                        </v-col>
                                        <v-col cols="3">
                                            <v-dialog :ref="'refdlgtaskseriesendtime'+index" v-model="dynamicContents['refdlgtaskseriesendtime'+index]" :return-value.sync="i.endTime" persistent width="290px">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field v-model="i.endTime" outlined dense hide-details label="End time" readonly v-bind="attrs" v-on="on"></v-text-field>
                                                </template>
                                                <v-time-picker format="24hr" v-if="dynamicContents['refdlgtaskseriesendtime'+index]" v-model="i.endTime" full-width>
                                                    <v-spacer></v-spacer>
                                                    <v-btn text color="primary" @click="dynamicContents['refdlgtaskseriesendtime'+index] = false">
                                                    Cancel
                                                    </v-btn>
                                                    <v-btn text color="primary" @click="$refs['refdlgtaskseriesendtime'+index][0].save(i.endTime)">
                                                    OK
                                                    </v-btn>
                                                </v-time-picker>
                                            </v-dialog>
                                        </v-col>
                                        <v-col cols="2" class="d-flex align-center">
                                            <v-icon @click="AddTaskSeriesRow" small color="green" class="pr-2">fa fa-plus</v-icon>&nbsp;
                                            <v-icon @click="RemoveTaskSeriesRow(i)" small color="red">fa fa-trash</v-icon>&nbsp;
                                        </v-col>
                                    </v-row>
                                </div>
                                
                            </div>
                          </v-flex>
                          <v-flex xs12 sm12 md12 lg12 xl12 class="pa-5 d-flex align-center justify-space-between">
                            <v-btn color="grey" @click="FormStep--"   dark><v-icon class="pr-5" small>fas fa-chevron-left</v-icon> Previous </v-btn>
                            <v-btn color="orange" @click="FormStep++"  dark> Next <v-icon class="pl-5" small>fas fa-chevron-right</v-icon></v-btn>
                          </v-flex>
                       </v-layout>
                  </v-stepper-content>
                  <v-stepper-content step="3" >
                     <v-layout row wrap>
                         <v-flex xs12 sm12 md6 lg6 xl6 class="pa-4">
                              <div class="form-box">
                                <div class="form-box-title white--text" style="width:170px">Pickup address</div>
                                  <v-row>
                                      <v-col cols="12">
                                        <span class="pr-11 white--text">Address source:</span>
                                        <v-btn-toggle   dense background-color="transparent" mandatory dark  v-model="FormModel.pickupAddresType" active-class="body-1 bg-green-gradient">
                                            <v-btn text :value="i.value" v-for="(i,index) in AddressSources" :key="index" small>{{i.text}}</v-btn>
                                        </v-btn-toggle>
                                      </v-col>
                                      <v-col cols="12">
                                          <v-text-field hide-details dark outlined dense label="Search in google"></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                          <v-autocomplete :items="Placenames" v-model="FormModel.placenameId" item-text="title" item-value="id"  hide-details dark outlined dense label="Place name"></v-autocomplete>
                                      </v-col>
                                      <v-col cols="6">
                                          <v-autocomplete :items="Jobtitles" v-model="FormModel.pickupJobtitleId" item-text="title" item-value="id"  hide-details dark outlined dense label="Job title"></v-autocomplete>
                                      </v-col>
                                      <v-col cols="6">
                                          <v-text-field v-model="FormModel.pickupMobile" hide-details dark outlined dense label="Mobile"></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                          <v-text-field v-model="FormModel.pickupTellNumber" hide-details dark outlined dense label="Tell nummer"></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                          <v-text-field v-model="FormModel.pickupFax" hide-details dark outlined dense label="Fax"></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                          <v-text-field v-model="FormModel.pickupEmail" hide-details dark outlined dense label="Email"></v-text-field>
                                      </v-col>
                                      
                                      <v-col cols="6">
                                          <v-text-field v-model="FormModel.pickupStreet" hide-details dark outlined dense label="Street"></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                          <v-text-field v-model="FormModel.pickupPlz" hide-details dark outlined dense label="PLZ"></v-text-field>
                                      </v-col>
                                      <v-col cols="12">
                                          <v-text-field v-model="FormModel.pickupCity" hide-details dark outlined dense label="City"></v-text-field>
                                      </v-col>
                                      <v-col cols="12">
                                          <v-textarea v-model="FormModel.pickupInfo" hide-details dark outlined dense label="Descriptions"></v-textarea>
                                      </v-col>
                                  </v-row>
                              </div>
                          </v-flex>
                          <v-flex xs12 sm12 md6 lg6 xl6 class="pa-4">
                              <div class="form-box">
                                <div class="form-box-title white--text" style="width:170px">Destination address</div>
                                  <v-row>
                                      <v-col cols="12">
                                          <v-text-field hide-details dark outlined dense label="Search in google"></v-text-field>
                                      </v-col>
                                  
                                      <v-col cols="6">
                                          <v-autocomplete :items="Placenames" v-model="FormModel.destinationPlacenameId" item-text="title" item-value="id"  hide-details dark outlined dense label="Place name"></v-autocomplete>
                                      </v-col>
                                      <v-col cols="6">
                                          <v-autocomplete :items="Jobtitles" v-model="FormModel.destinationJobtitleId" item-text="title" item-value="id"  hide-details dark outlined dense label="Job title"></v-autocomplete>
                                      </v-col>
                                      <v-col cols="6">
                                          <v-text-field v-model="FormModel.destinationTellNumber" hide-details dark outlined dense label="Tell nummer"></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                          <v-text-field v-model="FormModel.destinationMobile" hide-details dark outlined dense label="Mobile"></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                          <v-text-field v-model="FormModel.destinationFax" hide-details dark outlined dense label="Fax"></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                          <v-text-field v-model="FormModel.destinationEmail" hide-details dark outlined dense label="Email"></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                          <v-text-field v-model="FormModel.destinationStreet" hide-details dark outlined dense label="Street"></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                          <v-text-field v-model="FormModel.destinationPlz" hide-details dark outlined dense label="PLZ"></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                          <v-text-field v-model="FormModel.destinationCity" hide-details dark outlined dense label="City"></v-text-field>
                                      </v-col>
                                      <v-col cols="12">
                                          <v-textarea v-model="FormModel.destinationInfo" hide-details dark outlined dense label="Descriptions"></v-textarea>
                                      </v-col>
                                  </v-row>
                              </div>
                          </v-flex>
                          <v-flex xs12 sm12 md12 lg12 xl12 class="pa-5 d-flex align-center justify-space-between">
                            <v-btn color="grey" @click="FormStep--"   dark><v-icon class="pr-5" small>fas fa-chevron-left</v-icon> Previous </v-btn>
                            <v-btn color="green accent-3" @click="AddTask"  dark><v-icon class="pr-5" small>fas fa-check</v-icon> Save </v-btn>
                          </v-flex>
                     </v-layout>
                  </v-stepper-content>
              </v-stepper>
          </v-form>
      </v-flex>
      <v-flex v-if="100 == 101" xs12 sm12 md12 lg12 xl12 class="pl-10 pa-2">
          <div class="page-divider">
              <span>Archive</span>
          </div>
      </v-flex>
      <v-flex v-if="100 == 101" xs12 sm12 md12 lg12 xl12 class="pl-10 pa-2">
        <v-card class="card-container">
          <v-card-title class="styled-card-title">Today tasks</v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm12 md12 lg12 xl12 style="padding:10px">
               <v-data-table dark :items="UserTableItems" :headers="taskTableHeader">
                   <template v-slot:[`item.isActive`]="{item}">
                       <v-chip color="green lighten-2" @click="changeItemStatus(item.userId,false)" v-if="item.isActive" dark>Active</v-chip>
                       <v-chip color="red lighten-2" @click="changeItemStatus(item.userId,true)" v-else dark>InActive</v-chip>
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
  </div>
</template>

<script>
const MSGHNDL = require("../../../components/notify.js");
const URL = require("../../../const/url.js");
const Enums = require("../../../const/enums.js");
const axios = require('axios');
var moment = require('moment');
moment.locales("de")
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const defultFormModel = Object.freeze({
  
  taskType: 0,
  taskTitleId:0,
  carType: 0,
  pickupAddresType: 0,
  pickupFax: "",
  pickupMobile: "",
  pickupGender: 0,
  placenameId: 0,
  pickupEmail: null,
  pickupJobtitleId:0,
  pickupTellNumber: "",
  pickupStreet: "",
  pickupCity: "",
  pickupPlz: "",
  pickupInfo: "",
  destinationFax: "",
  destinationMobile: "",
  destinationGender: 0,
  destinationPlacenameId: 0,
  destinationEmail: null,
  destinationJobtitleId:0,
  destinationTellNumber: "",
  destinationStreet: "",
  destinationCity: "",
  destinationPlz: "",
  destinationInfo: "",
  insuranceType: 0,
  emmergencyDate: "",
  emmergencyTime: "",
  insuranceName: "",
  insuranceNumber: "",
  insuranceSupplementNumber: "",
  approvalType: 0,
  approvalInfo: "",
  infectionInfo: "",
  taskNumber: "",
  transportTypeId: 0,
  infectionTypeId: 0,
  applicantId: 0,
  patientId: 0,
  transeportChein: 0,
  tarrifId:0,
  taskOneWay: {
    id: 0,
    taskId: 0,
    date: "",
    time: "",
    status: 0,
    taskSenstive: 0
  },
  taskGoAndReturn: {
    id: 0,
    taskId: 0,
    status: 0,
    goDate: "",
    returnDate: "",
    goStartTime: "",
    goEndTime: "",
    returnStartTime: "",
    returnEndTime: "",
    taskSenstive: 0
  },
  applicant: {
    name: "",
    family: "",
    street: "",
    plz: "",
    city: "",
    tell: "",
    info: "",
    gender:0,
    fax:null,
    mobile:null,
    email:null,
    JobtitleId:0
  },
  patient: {
    name: "",
    family: "",
    birthday: "",
    street: "",
    plz: "",
    city: "",
    tell: "",
    state: "",
    mobile: "",
    info: "",
    gender:0,
    fax:null,
    email:null,
    JobtitleId:0
  },
  taskSeries: [
    {
      id: 0,
      date: "",
      startTime: "",
      endTime: "",
      taskId: 0
    }
  ]
});
export default {
  Name: "newtask",
  components: {
  },
  data:()=>({
    
      taskTableHeader:[
        {text:"#",value:"counter",align:"left"},
        {text:"Name",value:"name",align:"left"},
        {text:"Family",value:"family",align:"left"},
        {text:"Personal id",value:"personnelId",align:"left"},
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
          {text: 'Tasks',link:false},
          {text: 'Make new task',disabled: false,href:'/task/add'},
      ],
      validWagons:Enums.WagonTypes,
      transportTypes:[],
      infektions:[],
      systemRoles:Enums.UserTypes,
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
      WagonType:1,
      transportType:1,
      InsuranceType:1,
      Genehmigungs:Enums.Genehmigung,
      AddressSources:Enums.AddressSources,
      incuranceTypes:Enums.InsuranceTypes,
      TaskTypes:Enums.TaskTypes,
      TaskSenstives:Enums.TaskSenstive,
      TransportcheinEnum:Enums.Transportchein,
      tariffs:[],
      TaskTitles:[],
      TaskSenstiveId:0,
      Placenames:[],
      Jobtitles:[],
      Genders:Enums.Gender,
      selectBirthdateDialog:false,
      selectStartDateOneWayDialog:false,
      onWayDialogSelectTime:false,
      selectStartDateGoDialog:false,
      goDialogSelectStartTime:false,
      selectEndDateReturnDialog:false,
      returnDialogSelectStartTime:false,
      TaskNumber:0,
      goDialogSelectendTime:false,
      returnDialogSelectendTime:false,
      dynamicContents:[]
  }),
  async created()
  {
      await this.loadTrnasportTypes();
      await this.getNewTaskId();
    //   this.TaskNumber = moment().format("YY-01-MM-00000001");
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
      RemoveTaskSeriesRow(item)
      {
          let vm = this;
          if(vm.FormModel.taskSeries.length < 2)
          return;

          vm.FormModel.taskSeries = vm.FormModel.taskSeries.filter(x=>x != item);
      },
      async getNewTaskId()
      {
          let vm = this;
          await axios.get(URL.Task.newId).then((res)=>{
                  if(MSGHNDL.resultChk(res.data))
                  {
                      console.warn(res.data.data);
                     vm.FormModel.taskNumber = res.data.data;
                  }
                  }).catch((err)=>{
                      console.error(err);
                      MSGHNDL.ERR(err.message)
                    });
      },
      async AddTask()
      {
          let vm = this;
          vm.FormModel.taskGoAndReturn.taskSenstive = vm.TaskSenstiveId;
          vm.FormModel.taskOneWay.taskSenstive = vm.TaskSenstiveId;
          console.warn(vm.FormModel);
          await axios.post(URL.Task.public,vm.FormModel).then(async (res)=>{
                  if(MSGHNDL.resultChk(res.data))
                  {
                     await vm.LoadUsers();
                     vm.$refs.newadminformref.reset();
                     vm.FormModel = Object.assign({}, defultFormModel);
                  }
                  }).catch((err)=>{
                      console.error(err);
                      MSGHNDL.ERR(err.message)
                    });
      },
      AddTaskSeriesRow()
      {
          let vm = this;
          vm.FormModel.taskSeries.push({
            id: 0,
            date: "",
            startTime: "",
            endTime: "",
            taskId: 0
            });
      },
      async loadTaskTitles()
      {
          let vm = this;
          await axios.get(URL.TaskTitle.public).then(async (res)=>{
                  if(MSGHNDL.resultChk(res.data))
                  {
                      console.warn(res.data.data);
                     vm.TaskTitles = res.data.data;
                  }
                  }).catch((err)=>{
                      console.error(err);
                      MSGHNDL.ERR(err.message)
                    });
                    await vm.loadPlacenames();
      },
      async loadPlacenames()
      {
          let vm = this;
          await axios.get(URL.Placename.public).then((res)=>{
                  if(MSGHNDL.resultChk(res.data))
                  {
                      console.warn(res.data.data);
                     vm.Placenames = res.data.data;
                  }
                  }).catch((err)=>{
                      console.error(err);
                      MSGHNDL.ERR(err.message)
                    });
                    await vm.loadJobtitles();
      },
      async loadJobtitles()
      {
          let vm = this;
          await axios.get(URL.Jobtitle.public).then((res)=>{
                  if(MSGHNDL.resultChk(res.data))
                  {
                      console.warn(res.data.data);
                     vm.Jobtitles = res.data.data;
                  }
                  }).catch((err)=>{
                      console.error(err);
                      MSGHNDL.ERR(err.message)
                    });
      },
      async loadTariffs()
      {
          let vm = this;
          await axios.get(URL.Tarrif.load+vm.FormModel.carType).then(async (res)=>{
                  if(MSGHNDL.resultChk(res.data))
                  {
                      console.warn(res.data.data);
                     vm.tariffs = res.data.data;
                  }
                  }).catch((err)=>{
                      console.error(err);
                      MSGHNDL.ERR(err.message)
                    });
            await vm.loadTaskTitles();
      },
      async loadInfektions()
      {
          let vm = this;
          await axios.get(URL.Other.infektion).then((res)=>{
                  if(MSGHNDL.resultChk(res.data))
                  {
                      console.warn(res.data.data);
                     vm.infektions = res.data.data;
                  }
                  }).catch((err)=>{
                      console.error(err);
                      MSGHNDL.ERR(err.message)
                    });
                    await vm.loadTariffs();
      },
      async loadTrnasportTypes()
      {
          let vm = this;
          await axios.get(URL.Other.transportType).then(async (res)=>{
                  if(MSGHNDL.resultChk(res.data))
                  {
                      console.warn(res.data.data);
                     vm.transportTypes = res.data.data;
                  }
                  }).catch((err)=>{
                      console.error(err);
                      MSGHNDL.ERR(err.message)
                    });
                    await  vm.loadInfektions();
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
          var splitxp = item.nationalCardExpirationDate.split(' ');
          var splitdate = splitxp[0].split('/');
          item.nationalCardExpirationDate = splitdate[2]+'-'+splitdate[1]+'-'+splitdate[0];
          vm.FormModel = Object.assign({},item);
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
                     vm.$refs.newadminformref.reset();
                     vm.FormModel = Object.assign({}, defultFormModel);
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
                     vm.$refs.newadminformref.reset();
                     vm.FormModel = Object.assign({}, defultFormModel);
                     vm.inEditMode = false;
                  }
                  }).catch((err)=>{
                      console.error(err);
                      MSGHNDL.ERR(err.message)
                    });
              }
          }
      },
      functionEvents (date) {
        const [,, day] = date.split('-')
        if ([12, 17, 28].includes(parseInt(day, 10))) return true
        if ([1, 19, 22].includes(parseInt(day, 10))) return ['red', '#00f']
        return false
      },
    },
};

</script>
