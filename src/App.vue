<template class="m-0 p-0 scroll-smooth">

  <header id="header">
    <div class="flex flex-wrap justify-between items-center navh">
      <div class="item px-20  align-middle">
        <RouterLink to="/"><img src="./assets/logo-taskie-web.png" alt="logo" width="180"/></RouterLink>
      </div>
      <div v-if="!!userStore.user" class="flex items-center item h-auto px-20 align-middle">
        <!-- <RouterLink " to="/Dashboard"><button @click="signOut" >Signout</button></RouterLink> -->
        <p class=" text-lg pr-10">Welcome, {{ userStore.user.email }}</p>
        <button  @click="signOut" class=" hoverText" data-hover="Signout">
          <img src="./img/signOutIcon.svg" alt="user" width="25" class="signOutHover border-none"/>
        </button>
        
      </div>
          
    </div>

    

  </header>
  <body>
   <RouterView  />
  </body>
</template>


<script>

import { mapStores } from 'pinia';
import userStore from './stores/user';


export default {
  computed: {
    ...mapStores(userStore)
  },

  methods: {
    async signOut() {
      await this.userStore.signOut();
      this.$router.push("/");
      // this.$forceUpdate();
      
    },

  },

  // mounted() {
  //   this.$router.push('/');
  // },
};
</script>


<style scoped>
* {
  padding: 0;
  margin: 0;
}
body{
  background-color:rgb(231 229 228);
}
#header {
  background-color: #8ecae6;
}

.navh{
  height: 10vh;
  z-index: 2;
}

.signOutHover:hover{
  filter: invert(55%) sepia(100%) saturate(3.5);
}
.hoverText {
  position: relative;
  filter: none;
}
.hoverText:before {
  content: attr(data-hover);
  visibility: hidden;
  opacity: 0;
  width: 140px;
  color: black;
  text-align: center;
  border-radius: 5px;
  padding: 5px 0;
  transition: opacity 1s ease-in-out;
  position: absolute;
  z-index: 1;
  left: -220%;
  top: 100%;
}

.hoverText:hover:before {
  opacity: 1;
  visibility: visible;
}


</style>
