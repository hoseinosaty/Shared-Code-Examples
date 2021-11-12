<template>
    <v-dialog style="z-index:99999999999 !important" max-width="600" persistent v-model="warningModal">
        <v-card>
            <v-card-title class="bg-red-gradient">
                <span class="white--text"><v-icon small color="white" style="padding-right:5px">fas fa-exclamation-triangle</v-icon>Confirm delete item</span>
                <v-spacer></v-spacer>
                <v-icon :disabled="showLoadingBtn" @click="warningModal = false" color="white">fas fa-times</v-icon>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <div class="red--text body-1 d-flex justify-center align-center pt-5">Are you sure you want to delete the item?</div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="justify-end">
                <v-btn :loading="showLoadingBtn"   color="red lighten-1" @click="Confirmed" dark small>Delete</v-btn>&nbsp;
                <v-btn :disabled="showLoadingBtn"  @click="warningModal = false" small color="grey">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    name:"ConfirmWarning",
    data:()=>({
        warningModal:false,
        showLoadingBtn:false
    }),
    methods:{
        ShowDialog()
        {
            this.warningModal = true;
        },
        CloseDialog()
        {
            this.OperationEnd();
            this.warningModal = false;
        },
        OperationEnd()
        {
            this.showLoadingBtn = false;
        },
        Confirmed()
        {
            this.showLoadingBtn = true;
            this.$emit('Confirmed');
        }
    }
}
</script>