<template>
   <q-layout view="lHh Lpr lFf" style="background: linear-gradient(135deg, #B803FF 0%,#E504D2 100%);">
      <div class="header bg-accent">
         <div class="row content-center items-center">
            <div class="col-md-4 cursor-pointer" @click="$router.push('/')">
               <h1>Look After&trade;</h1>
            </div>
            <div class="col-md-8">
               <div class="text-right q-pr-md">
                  <div v-if="!isLogged">
                     <q-btn flat color="primary" class="q-mr-md" @click="createWindow=true">Create User</q-btn>
                     <q-btn color="primary" @click="loginWindow=true">Login</q-btn>
                  </div>
                  <div v-else>
                     <span class="hi">Hi, {{ loggedUser.name }} </span>&nbsp;
                     <q-btn class="q-mr-md" color="primary" to="/shop">SHOP NOW</q-btn>
                     <q-btn outline color="primary" @click="onLogout">Logout</q-btn>
                  </div>

               </div>
            </div>
         </div>
      </div>
      <q-page-container>
         <router-view/>
      </q-page-container>
      <div class="footer bg-secondary fixed-bottom text-white">
         <div class="row content-center items-center">
            <div class="col-5 cursor-pointer" @click="$router.push('/')">
               <h1>Look After&trade;</h1>
            </div>
            <div class="col-md-7 links text-center">
               <q-icon name="mdi-phone"/>&nbsp;
               <a class="text-accent" href="tel:1-971-diaper">1-971-diaper</a> &nbsp;
               <q-icon name="mdi-email"/>&nbsp;
               <a class="text-accent" href="mailto:confort@lookafter.com">confort@lookafter.com</a> &nbsp;
               <q-btn glossy round @click="openURL('https://fb.com/lookafter')" color="primary" icon="mdi-facebook"
               /> &nbsp;
               <q-btn glossy round @click="openURL('https://youtube.com/lookafter')" color="primary" icon="mdi-youtube"
               /> &nbsp;
               <q-btn glossy
                      round
                      @click="openURL('https://instagram.com/lookafter')"
                      color="primary"
                      icon="mdi-instagram"
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
               <q-btn flat label="Cancel" color="primary" @click="onResetLogin"/>
               <q-btn flat label="Enter" color="primary" @click="onLogin"/>
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
               <q-btn flat label="Cancel" @click="onResetCreation" color="primary"/>
               <q-btn flat label="Create" @click="onRegister" color="primary"/>
            </q-card-actions>
         </q-card>
      </q-dialog>
   </q-layout>
</template>

<script>
  import { openURL }                from 'quasar'
  import { mapActions, mapGetters } from 'vuex'

  export default {
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
      }
    },
    methods:  {
      ...mapActions('auth', [ 'register', 'login', 'logout' ]),
      openURL,
      onLogout() {
        this.logout()
            .then(r => {
              this.$router.push('/')

              this.$q.notify({
                               icon:    'mdi-done',
                               color:   'positive',
                               message: r.message || 'Logged out!',
                             })
            })
      },
      onLogin() {
        const combination = {
          email:    this.login_email,
          password: this.login_pass,
        }

        this.login(combination)
            .then(r => {
              this.onResetLogin()
              this.$router.push('shop')
            })
            .catch(e => {
              this.$q.notify({
                               color:   'negative',
                               message: e.message || 'Sorry, verify your data',
                             })
            })
      },
      onRegister() {
        this.$refs.create_name.validate()
        this.$refs.create_phone.validate()
        this.$refs.create_email.validate()
        this.$refs.create_pass.validate()

        if (this.$refs.create_name.hasError || this.$refs.create_phone.hasError || this.$refs.create_email.hasError || this.$refs.create_pass.hasError) {
          this.$q.notify({
                           color:   'negative',
                           message: 'Double check your filled data',
                         })
        } else {
          const new_user = {
            name:     this.create_name,
            phone:    this.create_phone,
            email:    this.create_email,
            password: this.create_pass,
          }

          this.register(new_user)
              .then(r => {
                this.$q.notify({
                                 icon:    'mdi-done',
                                 color:   'positive',
                                 message: r.message || 'Success!',
                               })
                this.onResetCreation() // closes the dialog and clears the data
              })
              .catch(e => {
                this.$q.notify({
                                 color:   'negative',
                                 message: e.message || 'Sorry, verify your data',
                               })
              })
        }
      },

      onResetCreation() {
        this.createWindow = false

        this.login_email = null
        this.login_pass  = null

        this.create_name  = null
        this.create_phone = null
        this.create_email = null
        this.create_pass  = null

        this.$refs.create_name.resetValidation()
        this.$refs.create_phone.resetValidation()
        this.$refs.create_email.resetValidation()
        this.$refs.create_pass.resetValidation()
      },
      onResetLogin() {
        this.loginWindow = false

        this.login_email = null
        this.login_pass  = null
      },
    },
    computed: {
      ...mapGetters('auth', [
        'isLogged', 'loggedUser',
      ]),
    },
  }
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
