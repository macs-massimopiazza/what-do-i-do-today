<template>
  <div class="auth-page" :class="className">
    <div class="alert-box" :class="alertClass"> {{alertMessage}} </div>
    <!-- LOGIN VIEW -->
    <div class="login-section" v-if="viewLogin">
      <h1 class="title">What Do I Do Today?</h1>
      <div class="classic-login">
        <input type="text" placeholder="Email" v-model="emailInput">
        <input type="text" placeholder="Password" v-model="pswInput">
        <button class="btn-primary" @click="callLoginUser">Login</button>
      </div>
      <div class="third-party-login">
        <button class="google"><img src="../assets/icons8-logo-google.svg" alt=""><span>Sign in with Google</span></button>
        <button class="fb"><img src="../assets/icons8-facebook.svg" alt=""><span>Sign with Facebook</span></button>
      </div>
    </div>
    <!-- REGISTER VIEW -->
    <div class="register-section" v-else>
      <h1 class="title">What Do I Do Today?</h1>
      <div class="classic-login">
        <!-- <input type="text" placeholder="Username"> -->
        <input type="text" placeholder="Email" v-model="emailInput">
        <input type="text" placeholder="Password" v-model="pswInput">
        <button class="btn-primary" @click="callRegisterNewUser">Register</button>
      </div>
      <div class="third-party-login">
        <button class="google"><img src="../assets/icons8-logo-google.svg" alt=""><span>Sign in with Google</span></button>
        <button class="fb"><img src="../assets/icons8-facebook.svg" alt=""><span>Sign with Facebook</span></button>
      </div>
    </div>
    <!-- SWITCH VIEW -->
    <div class="create-account">
      <h4 class="subtitle">{{ switchQuestion }} have an account?</h4>
      <button class="btn-primary" @click="changeView"> {{ switchText }}</button>
    </div>
  </div>
</template>

<script>
import { registerNewUser, loginUser } from "../state.js"
export default {
  name: 'AuthComponent',
  data(){
    return {
      viewLogin: true,
      switchQuestion: "Don't",
      switchText: "Create One",
      className: "login",
      emailInput: '',
      pswInput: '',
      alertClass: "hidden",
      alertMessage: '--'
    }
  },
  methods: {
    changeView: function() {
      if(this.viewLogin) {
        this.viewLogin = false;
        this.switchQuestion = "Already";
        this.switchText = "Go to Login";
        this.className = "register";
      } else {
        this.viewLogin = true;
        this.switchQuestion = "Don't";
        this.switchText = "Create One";
        this.className = "login";
      }
    },
    callRegisterNewUser: function(){
      if(this.emailInput != '' && this.pswInput != '') {
        registerNewUser(this.emailInput, this.pswInput)
          .then(() => {
            this.throwAlert("Utente creato con Successo!", "success");
            this.viewLogin = true;
          })
          .catch(error => {
             this.throwAlert(error, "error");
          });        
      } else {
        this.throwAlert("Attenzione! Inserisci Email e Passowrd", "error")
      }
      this.emailInput = ''
      this.pswInput = ''
    },
    callLoginUser: function(){
      if(this.emailInput != '' && this.pswInput != '') {
        loginUser(this.emailInput, this.pswInput)
          .then(() => {
            this.throwAlert("Login Effettuato con Successo!", "success");
          })
          .catch(error => {
             this.throwAlert(error, "error");
          });        
      } else {
        this.throwAlert("Attenzione! Inserisci Email e Passowrd", "error")
      }
      this.emailInput = ''
      this.pswInput = ''
    },
    throwAlert: function(alertText, alertType){
      this.alertMessage = alertText;
      this.alertClass = "show " + alertType;
      setTimeout(() => {
        this.alertMessage = '--';
        this.alertClass = "hidden";
      }, 4000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .auth-page {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    transition: all 1s;

    .alert-box {
      color: #fff;
      padding: 1rem;
      border-radius: 5px;
      position: absolute;
      width: 100%;
      max-width: min(70vw, 350px);
      transition: all 300ms ease-out;
      &.success {
        background: #11998e;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #38ef7d, #11998e);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #38ef7d, #11998e); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      }
      &.error {
        background: #FF416C;
        background: -webkit-linear-gradient(to right, #FF4B2B, #FF416C);
        background: linear-gradient(to right, #FF4B2B, #FF416C);
      }
      &.hidden {
        top: -100px;
      }
      &.show {
        top: 20px;
      }
  }

    button {
      min-height: 3rem;

      &.btn-primary {
        border: none;
        color: #fff;
        background-color: #4c3211;

        border-radius: 5px;
        font-size: 0.9rem;
        font-weight: 700;
      }
    }
    &.login {
      background: #eacda3;  /* fallback for old browsers */
      background: -webkit-linear-gradient(300deg , #d6ae7b, #eacda3);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(300deg, #d6ae7b, #eacda3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
    &.register {
      background: #eacda3;  /* fallback for old browsers */
      background: -webkit-linear-gradient(300deg , #d6ae7b, #eacda3);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(300deg, #d6ae7b, #eacda3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
  }
  .title {
    margin-bottom: 2rem;
    color: #fff;
    font-size: 3rem;
  }

  .login-section, .register-section, .create-account{
    width: 100%;
    max-width: min(70vw, 350px);
  }
  

  .classic-login {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;
    input {
      padding: 0.5rem;
      font-size: 1.5rem;
      border-radius: 5px;
      border: none;
    }
    input {
      margin-bottom: 0.5rem;
    }
  }

  .third-party-login {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    button {
      border: none;
      border-radius: 5px;
      font-size: 0.9rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 25px;
        margin-right: 5px;
      }
      &.google {
        background-color: #fff;
        color: #2c2c2c;
      }
      &.fb {
        background-color:#4267B2;
        color: #fff;

        img {
          width: 20px;
        }
      }
    }
    input {
      margin-bottom: 0.5rem;
    }
  }

  .create-account {
    .subtitle {
      color: #fff;
      margin-bottom: 0.4rem;
    }
    button {
      width: 100%;
    }
  }
</style>
