<template>
   <q-layout view="lHh Lpr lFf" style="background: linear-gradient(135deg, #B803FF 0%,#E504D2 100%);">
      <div class="header bg-accent">
         <div class="row content-center items-center">
            <div class="col-md-4">
               <h1>Look After&trade;</h1>
            </div>
            <div class="col-md-4 offset-md-4">
               <div class="text-right q-px-md">
                  <q-btn flat color="primary" class="q-mr-md" @click="createWindow=true">Create User</q-btn>
                  <q-btn color="primary" @click="loginWindow=true">Login</q-btn>
               </div>
            </div>
         </div>
      </div>
      <q-page-container>
         <router-view/>
      </q-page-container>
      <div class="footer bg-secondary fixed-bottom text-white">
         <div class="row content-center items-center">
            <div class="col-5">
               <h1>Look After&trade;</h1>
            </div>
            <div class="col-md-7 links text-center">
               <q-icon name="mdi-phone"/>&nbsp;
               <a class="text-accent" href="tel:1-971-diaper">1-971-diaper</a> &nbsp;
               <q-icon name="mdi-email"/>&nbsp;
               <a class="text-accent" href="mailto:confort@lookafter.com">confort@lookafter.com</a> &nbsp;
               <q-btn glossy round @click="openURL('https://facebook.com/lookafter')" color="primary" icon="mdi-facebook"
               /> &nbsp;
               <q-btn glossy round @click="openURL('https://youtube.com/lookafter')" color="primary" icon="mdi-youtube"
               /> &nbsp;
               <q-btn glossy round @click="openURL('https://instagram.com/lookafter')" color="primary" icon="mdi-instagram"
               /> &nbsp;
            </div>
         </div>
      </div>
      <q-dialog v-model="loginWindow">
         <q-card>
            <q-card-section>
               <div class="text-h6">Login</div>
            </q-card-section>

            <q-separator/>

            <q-card-section style="max-height: 50vh;min-height: 25vh;width: 30vw" class="scroll">
               <div class="row q-col-gutter-lg items-center content-center justify-center">
                  <div class="col-10">
                     <q-input outlined v-model="login_email" label="E-mail"/>
                  </div>
                  <div class="col-10">
                     <q-input type="password" outlined v-model="login_pass" label="Password"/>
                  </div>
               </div>
            </q-card-section>

            <q-separator/>

            <q-card-actions align="right">
               <q-btn flat label="Cancel" color="primary" v-close-popup/>
               <q-btn flat label="Enter" color="primary" v-close-popup/>
            </q-card-actions>
         </q-card>
      </q-dialog>
      <q-dialog v-model="createWindow">
         <q-card>
            <q-card-section>
               <div class="text-h6">Create User</div>
            </q-card-section>
            <q-separator/>
            <q-card-section style="max-height: 50vh;min-height: 25vh;width: 30vw" class="scroll">
               <div class="row q-col-gutter-lg items-center content-center justify-center">
                  <div class="col-10">
                     <q-input outlined v-model="create_name" ref="create_name" label="Full Name" :rules="[
          val => !!val || '* Required',
          val => val.length > 2 || 'Please use at least 3 characters',
        ]" lazy-rules
                     />
                  </div>
                  <div class="col-10">
                     <q-input outlined v-model="create_phone" ref="create_phone" label="Phone" :rules="[
          val => !!val || '* Required',
          val => (val.match(/\d/g) || []).length === 9 || 'Use a 9 digits number'
        ]" lazy-rules
                     />
                  </div>
                  <div class="col-10">
                     <q-input outlined v-model="create_email" ref="create_email" label="E-mail" :rules="[
          val => !!val || '* Required',
          val => val.match(/[@\.]/g) || 'Please use a valid e-mail',
        ]" lazy-rules
                     />
                  </div>
                  <div class="col-10">
                     <q-input type="password" outlined v-model="create_pass" ref="create_pass" label="Password" :rules="[
          val => !!val || '* Required',
        ]" lazy-rules
                     />
                  </div>
               </div>
            </q-card-section>

            <q-separator/>

            <q-card-actions align="right">
               <q-btn flat label="Cancel" @click="onReset" color="primary"/>
               <q-btn flat label="Create" @click="onSubmit" color="primary"/>
            </q-card-actions>
         </q-card>
      </q-dialog>
   </q-layout>
</template>

<script>
  import { openURL } from 'quasar';

  export default {
    name:    'MyLayout',
    data() {
      return {
        loginWindow:  false,
        login_email:  '',
        login_pass:   '',
        createWindow: false,
        create_name:  '',
        create_phone: '',
        create_email: '',
        create_pass:  '',
      };
    },
    methods: {
      openURL,
      onSubmit() {
        this.$refs.create_name.validate();
        this.$refs.create_phone.validate();
        this.$refs.create_email.validate();
        this.$refs.create_pass.validate();

        if (this.$refs.create_name.hasError || this.$refs.create_phone.hasError || this.$refs.create_email.hasError || this.$refs.create_pass.hasError) {
          this.$q.notify({
                           color:   'negative',
                           message: 'Double check your filled data',
                         });
        } else {
          this.$q.notify({
                           icon:    'mdi-done',
                           color:   'positive',
                           message: 'Created',
                         });
          this.createWindow = false;
        }
      },

      onReset() {
        this.createWindow = false;

        this.create_name  = null;
        this.create_phone = null;
        this.create_email = null;
        this.create_pass  = null;

        this.$refs.create_name.resetValidation();
        this.$refs.create_phone.resetValidation();
        this.$refs.create_email.resetValidation();
        this.$refs.create_pass.resetValidation();
      },
    },
  };
</script>

<style lang="scss">
   h1, h2, h3, h4, h5, h6 {
      margin: 0;
   }

   h1 {
      font-size: 2.5rem;
      margin: 0 0 0 1rem;
   }

   .footer .links {
      font-size: 1.5rem;
   }

</style>
