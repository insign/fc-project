<template>
   <q-page class="bg-primary">
      <div>
         <h1>LookAfter</h1>
      </div>
      <div class="text-center">
         <slider class="slider" :slides="slides" :chunk="4" :random="true" :max="8" :pause-on-mouse="true"/>
      </div>

   </q-page>
</template>


<script>
  import slider from 'src/components/slider/slider';
  import slides from 'src/statics/slides.json';

  export default {
    components: { slider },
    data() {
      return {
        slides,
      };
    },
  };
</script>
<style lang="scss" scoped>
   h1 {
      margin: 0;
   }

   .slider {
      max-width: 600px;
   }
</style>
