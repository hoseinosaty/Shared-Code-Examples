<template>
    <div class="page-container">
        <notifications reverse group="Barayand" style="direction:ltr" position="bottom right"></notifications>
        <div class="login-container">
            <div class="login-left-side">
                <img class="bg-image" :src="require('../assets/login-bg.png')"/>
                <div class="left-side-info">
                    <div class="left-side-info-logo">
                        <img :src="require('../assets/logo.png')"/>
                        <span>Abadis</span>
                    </div>
                    <div class="left-side-welcome-message">
                        <h4>Welcome to Abadis</h4>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur repudiandae deleniti quod blanditiis velit modi, nisi hic atque corrupti? Magnam, rerum. Velit, similique accusantium! Ducimus nobis esse itaque perferendis fugit!
                    </div>
                </div>
                
            </div>
            <div class="login-right-side">
                <div class="login-right-side-title">
                    Control panel login
                </div>
                <div class="login-right-side-form-holder">
                    <div class="form-row">
                        <div class="form-row-1">Username</div>
                        <div class="form-row-2"><input v-model="loginDto.UserName" placeholder="Username usualy is your email address" type="text"/></div>
                    </div>
                    <div class="form-row">
                        <div class="form-row-1">Password</div>
                        <div class="form-row-2"><input v-model="loginDto.Password" placeholder="Password" type="password"/></div>
                    </div>
                    <div class="form-row pt-5">
                        <v-btn @click="Login" color="blue" dark block>Login</v-btn>
                    </div>
                    <div class="form-row pt-5">
                        <a href="#">Forget password?</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import '../assets/css/login.css';
const MSGHNDL = require("../components/notify.js");
const APIURL = require("../const/url.js");
const axios = require('axios');
import { mapActions } from 'vuex'
export default{
name:"login",
data:()=>({
    loginDto:{
        UserName:null,
    Password:null
    }
}),
methods:{
    ...mapActions(['CPLOGIN','CPLOGOFF']),
    // Login()
    // {
    //     var vm = this;
    //     if(vm.username != null && vm.password != null)
    //     {
    //         if(vm.username != "admin@abadis.de")
    //         {
    //             MSGHNDL.ERR("Username is incorrect.");
    //             return;
    //         }
    //         if(vm.password != "A@Abadis2021")
    //         {
    //             MSGHNDL.ERR("Password is incorrect.");
    //             return;
    //         }
    //         window.localStorage.setItem("loginInfo",true);
    //         vm.$router.push('/');
    //     }
    //     else
    //     {
    //         MSGHNDL.ERR("Username and password is required");
    //     }
    // },
    async Login()
    {
        var vm = this;
        if(vm.loginDto.UserName != null && vm.loginDto.Password != null)
        {
          await axios.post(APIURL.user.CpAuth,vm.loginDto).then(res=>{
              var data = res.data;
              console.warn(data);
              if(data.status == false)
              {
                  MSGHNDL.ERR(data.msg);
              }
              else
              {
                  vm.CPLOGIN(data.data.user);
                  axios.defaults.headers.common['Authorization'] = data.data.token;
                  vm.$router.push('/');
              }
          }).catch(err=>{console.error(err)});  
        }
        else
        {
            MSGHNDL.ERR("Username and password is required");
        }
    }
}
}
</script>
