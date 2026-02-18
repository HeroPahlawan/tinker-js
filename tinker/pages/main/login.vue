<script setup>
const config = useRuntimeConfig();
</script>
<template>
    <div class="w-full h-screen bg-white overflow-hidden">
      <form id="myForm">
        <div class="container-fluid h-full m-auto">
          <div
            class="flex h-full flex-wrap items-center">
            <!-- Left column container with background-->
            <div class="hidden md:block w-100 lg:w-5/12 text-center">
              <img
                src="/img/runway.jpg"
                class="w-screen h-screen object-cover"
                alt="Travel" />
            </div>
            <!-- Right column container with form -->
            <div class="md:w-8/12 lg:w-5/12 m-auto text-center py-6">
              <div class="m-auto w-fit">
                <div class="flex align-middle mb-3">
                  <img src="/img/Injourney-Aviation-Services-icon.png" alt="logo" width="50px" height="auto" />
                  <h1 class="text-2xl font-bold p-2">{{ config.public.APP_NAME }}</h1>
                </div>
              </div>
              <small class="mb-4">Welcome to {{ config.public.APP_NAME }}!, have a nice day and keep the good work</small>
              <h1 class="text-xl font-bold text-grey-900 p-2" >SIGN IN</h1>
              <!-- Username input -->
              <div class="relative mb-6" data-twe-input-wrapper-init>
                <Input type="text" name="username" label="Username" />
              </div>
              <!-- Password input -->
              <div class="relative mb-6" data-twe-input-wrapper-init>
                <Input type="password" name="password" label="Password" />
                <p class="text-red-500">{{ error }}</p>
              </div>
              <!-- <div class="mb-6 flex items-center justify-between"> -->
                <!-- Forgot password link -->
                <!-- <a
                  href="#!"
                  class="text-grey-900 focus:outline-none dark:text-grey-900-400"
                  >Forgot password?</a> -->
              <!-- </div> -->
              <!-- Submit button -->
              <button type="button" class="btn-primary block w-full mt-4" @click="save_form()">
                Login
              </button>
              <div class="mt-4">
                <small>Copyright © | {{ new Date().getFullYear() }} Injourney Aviation Services</small>
              </div>
            </div>
          </div>
        </div>
      </form>
    
      <!-- Alert Wrapper -->
      <div id="alert-wrapper" class="fixed z-50 top-0 right-0 mt-5 mx-5 flex flex-col max-w-lg"></div>
    </div>
</template>

<script>
  import { dataForm, setSess } from '~/utils/app_helper';
  import alertHelper from '~/utils/alert';

  export default {
    data:()=>({
      alert: null,
      error:'',
      isLoading: false
    }),
    async mounted(){
      try {
        this.alert = await alertHelper();
        console.log('Alert helper initialized');
      } catch (err) {
        console.error('Failed to initialize alert helper:', err);
      }
    },
    methods:{
      async save_form(){
        console.log('Login form submitted');

        // Prevent multiple submissions
        if (this.isLoading) {
          console.log('Already loading, preventing duplicate submission');
          return;
        }

        // Clear previous errors
        this.error = '';
        this.isLoading = true;

        try {
          // Get form data
          const obj = dataForm('myForm');
          console.log('Form data collected:', { username: obj.username, hasPassword: !!obj.password });

          // Basic validation
          if (!obj.username || !obj.password) {
            this.error = 'Please enter both username and password';
            this.isLoading = false;
            console.warn('Validation failed: missing username or password');
            return;
          }

          console.log('Sending login request to API...');
          const res = await $fetch(`/api/main/login`, {
            method: 'post',
            body: obj
          });

          console.log('API response received:', res);

          if(res.status.code == 200){
            console.log('Login successful, creating session');

            const sess = {
              _id: res.data._id,
              username: res.data.username,
              password: document.getElementById('password').value,
              email: res.data.email,
              company: res.data.company_id,
              name: res.data.name,
              branch: res.data.branch,
              role: res.data.role
            };

            setSess(sess);
            console.log('Session saved');

            // Show success message before redirecting
            if (this.alert) {
              this.alert.success('Login successful! Redirecting...');
            }

            // Small delay for better UX
            setTimeout(() => {
              console.log('Redirecting to home page');
              location.href = '/';
            }, 500);
          }else{
            console.warn('Login failed:', res.status);
            this.error = res.status.message || 'Login failed. Please try again.';
            this.isLoading = false;

            if (this.alert) {
              this.alert.error(this.error);
            }
          }
        } catch (err) {
          console.error('Login error:', err);
          this.error = err.message || 'An error occurred. Please check your connection and try again.';
          this.isLoading = false;

          if (this.alert) {
            this.alert.error(this.error);
          }
        }
      }
    }
  }
</script>

<style scoped>
/* Additional component-specific animations */
@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.05);
  }
}

.animate-pulse {
  animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Stagger pulse animations for geometric circles */
.animate-pulse.animation-delay-2000 {
  animation-delay: 0.7s;
}

.animate-pulse.animation-delay-4000 {
  animation-delay: 1.4s;
}

/* Smooth color transitions for gradient background */
@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
</style>