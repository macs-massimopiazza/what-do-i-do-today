<template>
  <div class="game-home">
    <lord-icon
        src="https://cdn.lordicon.com/apuwlldu.json"
        trigger="loop"
        colors="primary:#ffffff,secondary:#4c3211"
        stroke="35"
        style="width:250px;height:250px"
        class="disco-ball">
    </lord-icon>
    <!-- <pre> {{ getUserInfo }} </pre> -->
    <div class="landing-section">
      <button class="btn-fill">Start the game</button>
      <button class="btn-outline">How it works</button>
    </div>
    <pre class="lord-icons-disclaimer">
      Animated icons by <a target="_blank" href="https://lordicon.com">Lordicon</a>
      <a target="_blank" href="https://icons8.com/icon/83214/impostazioni">Settings</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
      </pre>
    <img @click="toggleSettings" class="settings-icon" src="../assets/icons8-settings.svg" alt="">
    <div class="settings-modal" v-if="getShowSettings">
      <div class="settings-modal_dialog">
        <div class="user-info">
          <div class="name-wrapper">
            <strong>Name: </strong> 
            <input @keyup.enter="updateUser" v-if="getUserInfo.displayName == null" type="text" v-model="userName" placeholder="Your name">
            <span v-else>{{ getUserInfo.displayName }}</span>
          </div>
          <div class="email-wrapper">
            <strong>Email: </strong> 
            <span>{{ getUserInfo.email }}</span>
          </div>
          <!-- Image:
          <span> {{ getUserInfo.photoURL }}</span> -->
          <span :class="getUserInfo.emailVerified ? 'green' : 'red'"> {{ getUserInfo.emailVerified ? 'Verificata' : 'Email non verificata' }}</span>
        </div>
        <!-- <pre>{{ getUserInfo }}</pre> -->
        <button class="btn-outline" @click="logout">Logout</button>
        <button class="btn-fill" @click="toggleSettings">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { logoutUser, getCurrentSignedInUserData, updateUser, throwAlert, toggleSettings, state } from "../state.js"

export default {
  name: 'GameHome',
  data() {
    return {
      userName: ''
    }
  },
  methods: {
    logout: function(){
      state.showSettings = false;
      logoutUser();
    },
    updateUser: function(){
        updateUser({displayName: this.userName})
          .then(() => {
            throwAlert("Nome aggiornato", "success");
            state.loadingClass = "hidden";
          })
          .catch(error => {
             throwAlert(error, "error");
              state.loadingClass = "hidden";
          });        
    },
    toggleSettings: function() {
      toggleSettings();
    }
  },
  computed: {
    getUserInfo() {
      return getCurrentSignedInUserData();
    },
    getShowSettings() {
      return state.showSettings;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.game-home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .settings-icon {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .settings-modal {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(31, 31, 31, 0.4);
    display: grid;
    place-content: center;
    &_dialog {
      background: #eacda3;  /* fallback for old browsers */
      background: -webkit-linear-gradient(350deg , #d6ae7b, #eacda3);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(350deg, #d6ae7b, #eacda3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      padding: 20px;
      border-radius: 10px;
      width: min(70vw, 350px);
      .user-info {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        input {
          padding: 0.5rem;
          border-radius: 5px;
          border: none;
        }
        span {
          &.green{
            color: green;
          }
          &.red{
            color: red;
          }
        }
      }
      button {
        width: 100%;
        &:not(:last-child) {
          margin-bottom: 0.5rem;
        }
      }
    }
  }
} 

.disco-ball {
  position: fixed;
  top: -50px;
}

.lord-icons-disclaimer {
  position: absolute;
  bottom: 0;
}

.landing-section {
  display: flex;
  flex-direction: column;
  margin-top: 250px;
  width: 100%;
  max-width: min(70vw, 350px);

  button {
    margin-bottom: 0.5rem;
  }
}
</style>
