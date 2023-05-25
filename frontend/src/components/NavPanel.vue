<template>
  <div class="navigation recBG_0">
    <p class="textStyle1">QuickNote - {{ $route.name }}</p>
    <div class="menubar-container">
      <div class="menubar">
        <button
          v-if="isAdmin"
          :class="{ ui_ElementT1: true, selectedPage: $route.name == 'Admin' }"
          @click="goTo('Admin')"
          name="GoAdminButton"
        >
          Admin
        </button>
        <button
          :class="{
            ui_ElementT1: true,
            selectedPage: $route.name == 'Private',
          }"
          @click="goTo('Private')"
          name="GoPrivateButton"
        >
          Private
        </button>
        <button
          :class="{ ui_ElementT1: true, selectedPage: $route.name == 'Public' }"
          @click="goTo('Public')"
          name="GoPublicButton"
        >
          Public
        </button>
        <button
          class="ui_ElementT1 logoutButton"
          @click="logout"
          name="LogoutButton"
        >
          ↲
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useLoginStore } from "@/stores/login";

export default {
  setup() {
    const router = useRouter();
    const loginStore = useLoginStore();
    const isAdmin = loginStore.admin;

    // Logout function , send user to login page
    const logout = () => {
      const loginStore = useLoginStore();
      loginStore.Logout();
      router.push({ name: "Login" });
    };

    // Go to page function
    const goTo = (page) => {
      router.push({ name: page });
    };

    return { logout, goTo, router, isAdmin };
  },
};
</script>

<style scoped>
.selectedPage {
  background-color: rgba(255, 255, 255, 0.863) !important;
  -webkit-box-shadow: 0px 7px 11px -3px rgba(0, 0, 0, 0.822);
  -moz-box-shadow: 0px 7px 11px -3px rgba(0, 0, 0, 0.822);
  box-shadow: 0px 7px 11px -3px rgba(0, 0, 0, 0.822);
}

.navigation {
  height: 65px;
  padding: 5px;
  /* Center childrend divs one to the left one to the right */
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
}

.navigation p {
  margin-left: 20px;
}

.menubar-container {
  width: 50%;
  height: 100%;
  /* Center childrend divs one to the left one to the right */
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
}

.menubar {
  /* put children divs in line and make them equaly width */
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.menubar button {
  background-color: rgba(255, 255, 255, 0.726);
  /* add space between buttons */
  margin-right: 10px;
  padding: 0 10px;
}

.logoutButton {
  background-color: rgba(255, 255, 255, 0.726);
  margin-right: 10px;
  padding: 0 10px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
}

@media only screen and (max-width: 600px) {
  .navigation {
    height: 100px;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }

  .navigation p {
    margin-left: 0px;
  }

  .menubar-container {
    width: 90%;
    height: 100%;
  }
}
</style>
