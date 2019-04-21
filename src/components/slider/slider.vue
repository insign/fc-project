<template>
   <div class="comp-slider text-center bg-primary" @mouseenter="mouseIn=true" @mouseleave="mouseIn=false">
      <transition-group tag="div" class="img-slider" name="slide">
         <div v-for="number in [currentGroup]" :key="number">
            <div class="group">
               <div class="row">
                  <div class="col-6"
                       v-for="(slide, n) in finalSlides[currentGroup]"
                       :key="'s' + (number + currentMove + n)"
                  >
                     <q-img :src="slide.url"
                     >
                        <div class="absolute-bottom text-body1 text-center">
                           {{ slide.title }}
                           {{ slide.availability }}
                        </div>
                     </q-img>
                  </div>
               </div>
            </div>
         </div>
      </transition-group>
      <div class="text-center"><q-icon :color="isPaused ? 'accent' : 'transparent'" name="pause" size="2rem" /></div>
   </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    props:    {
      slides:       Array,
      chunk:        Number,
      max:          Number,
      random:       Boolean,
      paused:       Boolean,
      pauseOnMouse: Boolean,
    },
    mounted() {
      setInterval(() => {
        this.nextGroup();
      }, 3000);
    },
    data() {
      return {
        currentMove:  0,
        currentGroup: 0,
        mouseIn:      false,
      };
    },
    computed: {
      finalSlides() {
        let slides = this.slides;

        if (this.random) {
          slides = this.shuffle(slides);
        }

        if (this.max) {
          slides = slides.slice(0, this.max);
        }

        if (this.chunk) {
          slides = this.chunker(slides, this.chunk);
        }

        return slides;
      },
      isPaused() {
        return this.paused || (this.pauseOnMouse && this.mouseIn);
      },
    },
    methods:  {
      nextGroup() {
        if (!this.isPaused) {
          this.currentMove++;
          if (this.currentGroup === (this.finalSlides.length - 1)) {
            this.currentGroup = 0;
          } else {
            this.currentGroup++;
          }
        }
      },
      chunker(arr, chunks) {
        return arr.reduce((accumulator, currentValue) => {
          if ((accumulator.length == 0) || (accumulator[ accumulator.length - 1 ].length >= chunks)) {
            accumulator.push([]);
          }

          accumulator[ accumulator.length - 1 ].push(currentValue);

          return accumulator;

        }, []);
      },
      shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
          const j            = Math.floor(Math.random() * (i + 1));
          [ a[ i ], a[ j ] ] = [ a[ j ], a[ i ] ];
        }
        return a;
      },
    },
  };
</script>

<style lang="scss" scoped>

   .slide-leave-active,
   .slide-enter-active {
      transition: 1s;
   }

   .slide-enter {
      transform: translate(100%, 0);
   }

   .slide-leave-to {
      transform: translate(-100%, 0);
   }

   .img-slider {
      overflow: hidden;
      position: relative;
      height: 600px;
      width: 600px
   }

   .img-slider .group {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
   }
</style>
