<template>
  <div class="auth-page">
    <div class="login-wrapper">
      <h1 class="title">What Do I Do Today?</h1>
      <div class="classic-login">
        <input type="text" placeholder="Email">
        <input type="password" placeholder="Password">
        <button class="btn-primary">Login</button>
      </div>
      <div class="third-party-login">
        <button class="google"><img src="../assets/icons8-logo-google.svg" alt=""><span>Login in with Google</span></button>
        <button class="fb"><img src="../assets/icons8-facebook.svg" alt=""><span>Login with Facebook</span></button>
      </div>
    </div>
    <div class="create-account">
      <h4 class="subtitle">Don't have an account?</h4>
      <button class="btn-primary">Create One</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthComponent'
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
  }
  .title {
    margin-bottom: 2rem;
    color: #fff;
    font-size: 3rem;
  }

  .login-wrapper, .create-account{
    width: 100%;
    max-width: 70vw;
  }
  button {
    min-height: 3rem;

    &.btn-primary {
      border: none;
      background-color: #4c3211;
      color: #fff;
      border-radius: 5px;
      font-size: 0.9rem;
      font-weight: 700;
    }
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
