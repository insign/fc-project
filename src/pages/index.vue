<template>
   <q-page  style="min-height: 80vh;" class="flex flex-center">
      <div>
         <div class="row items-center text-center">
            <div class="col-7">
               <h2  style="font-family: Satisfy;font-size: 5rem" class="text-accent">Be welcome to our website!</h2>
               <h3 class="text-white">Here you will find the best products for your need!</h3>
               <h4 class="text-white">We have the best quality for the best price.</h4>
            </div>
            <div class="col-5">
               <slider class="slider" :slides="slides" :chunk="4" :random="true" :max="8" :pause-on-mouse="true"/>
            </div>
         </div>
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
   .slider {
      max-width: 600px;
   }
   h1,h2,h3 {
      margin-bottom: 3rem
   }
</style>
