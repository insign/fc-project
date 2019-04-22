<template>
   <div class="fixed-center text-center">
      <p>
         <q-icon size="20vw" name="mdi-basket" color="accent"/>
      </p>
      <h5 class="text-faded">The shopping will be available soon</h5> <br>

      <q-btn color="accent" textColor="secondary" style="width:200px;" @click="$router.push('/')"
      >Go back
      </q-btn>
   </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'


  export default {
    mounted() {
      if (!this.isLogged) {
        this.$router.push('/')
      }
    },
    computed: {
      ...mapGetters('auth', [
        'isLogged',
      ]),
    },
  }
</script>
