<template>
  <div class="auth-page" :class="className">
    <!-- LOGIN VIEW -->
    <div class="login-section" v-if="viewLogin">
      <!-- <h1 class="title">What Do I Do Today?</h1> -->
      <img class="title" src="../assets/wdidt-logo.svg" alt="">
      <!-- <img class="title" src="../assets/wdidt-logo2.svg" alt=""> -->
      <div class="classic-login">
        <input type="text" placeholder="Email" v-model="emailInput" @keyup.enter="callLoginUser">
        <input type="password" placeholder="Password" v-model="pswInput" @keyup.enter="callLoginUser">
        <button class="btn-fill" @click="callLoginUser" >Login</button>
      </div>
      <div class="third-party-login">
        <button class="google"><img src="../assets/icons8-logo-google.svg" alt=""><span>Login with Google</span></button>
        <button class="fb"><img src="../assets/icons8-facebook.svg" alt=""><span>Login with Facebook</span></button>
        <button class="apple"><img src="../assets/icons8-apple.svg" alt=""><span>Login with Apple ID</span></button>
      </div>
    </div>
    <!-- REGISTER VIEW -->
    <div class="register-section" v-else>
      <!-- <h1 class="title">What Do I Do Today?</h1> -->
      <img class="title" src="../assets/wdidt-logo.svg" alt="">
      <div class="classic-login">
        <!-- <input type="text" placeholder="Username"> -->
        <input type="text" placeholder="Email" v-model="emailInput" @keyup.enter="callRegisterNewUser">
        <input type="password" placeholder="Password" v-model="pswInput" @keyup.enter="callRegisterNewUser">
        <button class="btn-fill" @click="callRegisterNewUser" @keyup.enter="callLoginUser">Register</button>
      </div>
      <div class="third-party-login">
        <button class="google"><img src="../assets/icons8-logo-google.svg" alt=""><span>Register with Google</span></button>
        <button class="fb"><img src="../assets/icons8-facebook.svg" alt=""><span>Register with Facebook</span></button>
        <button class="apple"><img src="../assets/icons8-apple.svg" alt=""><span>Register with Apple ID</span></button>
      </div>
    </div>
    <!-- SWITCH VIEW -->
    <div class="create-account">
      <h4 class="subtitle">{{ switchQuestion }} have an account?</h4>
      <button class="btn-fill" @click="changeView"> {{ switchText }}</button>
    </div>
  </div>
</template>

<script>
import { state, registerNewUser, loginUser, throwAlert } from "../state.js"
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
        state.loadingClass = "show";
        registerNewUser(this.emailInput, this.pswInput)
          .then(() => {
            throwAlert("Utente creato con Successo!", "success");
            this.viewLogin = true;
            this.switchQuestion = "Don't";
            this.switchText = "Create One";
            this.className = "login";
            state.loadingClass = "hidden";
          })
          .catch(error => {
             throwAlert(error, "error");
              state.loadingClass = "hidden";
          });        
      } else {
        throwAlert("Attenzione! Inserisci Email e Passowrd", "error")
      }
      this.emailInput = ''
      this.pswInput = ''
    },
    callLoginUser: function(){
      if(this.emailInput != '' && this.pswInput != '') {
        state.loadingClass = "show";
        loginUser(this.emailInput, this.pswInput)
          .then(() => {
            throwAlert("Login Effettuato con Successo!", "success");
            state.loadingClass = "hidden"
          })
          .catch(error => {
             throwAlert(error, "error");
             state.loadingClass = "hidden"
          });        
      } else {
        throwAlert("Attenzione! Inserisci Email e Passowrd", "error")
      }
      this.emailInput = ''
      this.pswInput = ''
    },
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
    // color: #fff;
    // font-size: 3rem;
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
        margin-right: 0.5rem;
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
      &.apple {
        background-color: #000;
        color: #fff;
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
