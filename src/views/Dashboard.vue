<template>
  <div class="flex flex-col  ">
    <div class=" boxSize boxShadow flex justify-between p-5 font-sans font-bold text-5xl color-dark-blue mx-16">
      
      <h2 class=" text-center"> Dashboard </h2>
        <div class=" flex flex-col">
        <button @click="insertColumn()"  class="addColBtt flex justify-evenly items-center bg-cyan-500 rounded-full p-3 shadow-md shadow-gray-400 w-44">
          <p class=" text-xs">New column</p>
          <img src="../img/icono_suma.png" alt="icono add column" width ="25" >
        </button>
      </div>
    </div>
   
    <div class="colHeight flex lg:flex-row flex-col items-start gap-x-3 overflow-x-auto mx-16">
     
      <Columns />
    
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import columnsStore from "../stores/columns";
import userStore from "../stores/user";
import tasksStore from "../stores/tasks"
import Columns from "../components/columns.vue";



export default {

  components: {
    Columns,
  },

  data(){
    return{
    }
  },
  computed: {
    ...mapStores(columnsStore),
    ...mapStores(userStore),
    ...mapStores(tasksStore),
  },

  methods:{

    async insertColumn() {
      let order = 0;
      if(this.columnsStore.columns.length > 0){
        order = this.columnsStore.getColumnsByOrder+1;

      }
      await this.columnsStore.insertColumns(
        this.userStore.user.id,
        order
      );


      await this.columnsStore.fetchColumns();
    },

  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}


.colHeight{
  height: 80vh;
}

.boxShadow{

  box-shadow: 0 5px 5px -5px #333;
}

.boxSize{
  height: 10vh;
}

.addColBtt:hover {
  background-color: white;
  color: #023047;
  border-width: 2px;
  border-color: #fb8500;
}

</style>
