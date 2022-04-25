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
    <div class="activities-section">
      <h3>Today's Activities:</h3>
      <span v-if="getActivitesData == null"> It's a new day, get today's activites </span>
      <div class="activity-card" v-for="(activity, index) in getActivitesData" :key="index">
        {{activity.activity}}
      </div>
    </div>
    <div class="landing-section">
      <button class="btn-fill" @click="startGame">Get Today's Activities</button>
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
            <div class="update-name-wrapper" v-if="getUserInfo.displayName == null">
              <input @keyup.enter="updateUser" type="text" v-model="userName" placeholder="Your name">
              <button @click="updateUser" class="btn-fill btn-email-verify">Update Name</button>
            </div>
            <span v-else>{{ getUserInfo.displayName }}</span>
          </div>
          <div class="email-wrapper">
            <strong>Email: </strong> 
            <span>{{ getUserInfo.email }}</span>
          </div>
          <!-- Image:
          <span> {{ getUserInfo.photoURL }}</span> -->
          <div class="email-verification-wrapper">
            <span :class="getUserInfo.emailVerified ? 'green' : 'red'"> {{ getUserInfo.emailVerified ? 'Email verified' : 'Email not verified' }}</span>
            <button v-if="!getUserInfo.emailVerified" @click="getSendEmailVerification" class="btn-fill btn-email-verify">Send Email</button>
          </div>
        </div>
        <!-- <pre>{{ getUserInfo }}</pre> -->
        <button class="btn-outline" @click="logout">Logout</button>
        <button class="btn-fill" @click="toggleSettings">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  logoutUser, 
  getCurrentSignedInUserData, 
  updateUser, 
  throwAlert, 
  toggleSettings, 
  throwSendEmailVerification, 
  state,
  getActivities,
  writeUserData,
  getCurrentUserActivitiesUpdateDate,
  getCurrentUserActivities,
  } from "../state.js"

  const dayjs = require('dayjs');

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
            throwAlert("Name Updated", "success");
            state.loadingClass = "hidden";
          })
          .catch(error => {
             throwAlert(error, "error");
              state.loadingClass = "hidden";
          });        
    },
    toggleSettings: function() {
      toggleSettings();
    },
    getSendEmailVerification: function(){
        throwSendEmailVerification()
          .then(() => {
            throwAlert("Email Verification Sent", "success");
            state.loadingClass = "hidden";
          })
          .catch(error => {
             throwAlert(error, "error");
              state.loadingClass = "hidden";
          });        
    },
    setDailyActivities: async function(){
      let latestUpdateDate = await getCurrentUserActivitiesUpdateDate()
      if (dayjs().format("DD-MM-YYYY") == latestUpdateDate) {
        throwAlert("Hey, those are the activities for the day. You can't change them ehehe :)", "error");
      } else {
        let activities = await getActivities(4);
        writeUserData(activities);
      }
    },
    startGame: async function() {
      await this.setDailyActivities();
      state.currentActivities = await getCurrentUserActivities()
    }
  },
  computed: {
    getUserInfo() {
      return getCurrentSignedInUserData();
    },
    getShowSettings() {
      return state.showSettings;
    },
    getActivitesData() {
      return state.currentActivities;
    }
  },
  async created() {
    let latestUpdateDate = await getCurrentUserActivitiesUpdateDate()
    if(dayjs().format("DD-MM-YYYY") == latestUpdateDate) {
      state.currentActivities = await getCurrentUserActivities()
    } else {
      state.currentActivities = null;
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
        .update-name-wrapper {
          display: flex;
          gap: 0.3rem;
          input{
            width: 100%;
          }
        }
        input {
          padding: 0.5rem;
          border-radius: 5px;
          border: none;
        }
        button, button.btn-email-verify {
          width: fit-content;
          min-height: fit-content;
          padding: 0.3rem;
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
  width: 100%;
  max-width: min(70vw, 350px);

  button {
    margin-bottom: 0.5rem;
  }
}

.activities-section {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: min(70vw, 350px);
  margin-top: 220px;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 3px dashed #4c3211;

  .activity-card {
    text-align: center;
    border: none;
    color: #4c3211;
    background-color: #ffeccd;
    border-radius: 5px;
    font-size: 0.9rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    width: 100%;
    min-height: min(3rem, 7vh);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;

    &:last-child{
      margin-bottom: 0;
    }
  }
  
  h3 {
    font-family: "Nighty Demo";
    color: #4c3211;
    font-size: 2.2rem;
    letter-spacing: 1px;
    font-weight: 400;
    margin-bottom: 1rem;
  }
}
</style>
