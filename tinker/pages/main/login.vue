<script setup>
const config = useRuntimeConfig();
</script>
<template>
<<<<<<< HEAD
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
=======
    <div class="min-h-screen w-full relative flex items-center justify-center p-4 overflow-y-auto" style="background: #9796f0; background: linear-gradient(to right, #fbc7d4, #9796f0);">
      <!-- Mesh gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-400/20 to-transparent"></div>

      <!-- Animated geometric shapes -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <!-- Large blob animations with matching palette -->
        <div class="absolute -top-40 -right-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style="background-color: #9796f0;"></div>
        <div class="absolute -bottom-40 -left-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" style="background-color: #fbc7d4;"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" style="background-color: #c5a3d8;"></div>

        <!-- Geometric circles -->
        <div class="absolute top-20 left-20 w-32 h-32 border-4 border-white/20 rounded-full animate-pulse"></div>
        <div class="absolute top-40 right-40 w-24 h-24 border-4 border-white/20 rounded-full animate-pulse animation-delay-2000"></div>
        <div class="absolute bottom-20 left-1/3 w-40 h-40 border-4 border-white/20 rounded-full animate-pulse animation-delay-4000"></div>

        <!-- Diagonal lines -->
        <div class="absolute top-0 left-0 w-full h-full" style="background-image: linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.05) 55%, transparent 55%); background-size: 100px 100px;"></div>
      </div>

      <!-- Gradient orbs with palette colors -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-1/4 left-1/4 w-64 h-64 rounded-full filter blur-2xl opacity-40" style="background: linear-gradient(to bottom right, #fbc7d4, #e8a8c5);"></div>
        <div class="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full filter blur-2xl opacity-40" style="background: linear-gradient(to bottom right, #9796f0, #b8a8e8);"></div>
      </div>

      <div class="w-full max-w-6xl mx-auto relative z-10">
        <div class="grid md:grid-cols-2 gap-0 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          <!-- Left column - Image & Branding -->
          <div class="hidden md:flex relative bg-gradient-to-br from-[#192445] to-[#0e658a] p-12 flex-col justify-between">
            <!-- Decorative pattern overlay -->
            <div class="absolute inset-0 opacity-10">
              <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
            </div>

            <div class="relative">
              <div class="flex items-center justify-center mb-6">
                <img src="/img/Inshopper.png" alt="InShopper Logo" class="h-16 w-auto" />
                <h1 class="text-3xl text-white font-bold pl-3">InShopper</h1>
              </div>
              <p class="text-blue-100 text-lg leading-relaxed text-center">Your Premium Airport Travel Shopping Experience</p>
            </div>

            <div class="relative">
              <img src="/img/loungebg1.jpg" class="rounded-lg shadow-xl w-full h-64 object-cover mb-6" alt="Shopping">
              <div class="space-y-4">
                <div class="flex items-start">
                  <div class="bg-white bg-opacity-20 p-2 rounded-lg mr-3">
                    <i class="fa-solid fa-shopping-bag text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 class="text-white font-semibold">Seamless Shopping</h3>
                    <p class="text-blue-100 text-sm">Browse and purchase duty-free items effortlessly</p>
                  </div>
                </div>
                <div class="flex items-start">
                  <div class="bg-white bg-opacity-20 p-2 rounded-lg mr-3">
                    <i class="fa-solid fa-plane-departure text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 class="text-white font-semibold">Travel Ready</h3>
                    <p class="text-blue-100 text-sm">Collect at the gate or delivered to your destination</p>
                  </div>
                </div>
>>>>>>> 2f1a13d40c318c734983f9a6b6598965e9d3e940
              </div>
            </div>
          </div>

          <!-- Right column - Login Form -->
          <div class="p-8 sm:p-12 flex flex-col justify-center">
            <!-- Mobile Logo -->
            <div class="md:hidden flex items-center justify-center mb-8">
              <img src="/img/Inshopper.png" alt="InShopper Logo" class="h-12 w-auto" />
              <h1 class="text-xl font-bold pl-3">InShopper</h1>
            </div>

            <div class="mb-8">
              <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
              <p class="text-gray-500">Please sign in to your account</p>
            </div>

            <form id="myForm" @submit.prevent="save_form">
              <!-- Username input -->
              <div class="mb-6">
                <label for="username" class="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fa-solid fa-user text-gray-400"></i>
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-900 placeholder-gray-400"
                    placeholder="Enter your username"
                    autocomplete="username"
                  />
                </div>
              </div>

              <!-- Password input -->
              <div class="mb-6">
                <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fa-solid fa-lock text-gray-400"></i>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-900 placeholder-gray-400"
                    placeholder="Enter your password"
                    autocomplete="current-password"
                  />
                </div>
                <p v-if="error" class="text-red-500 text-sm mt-2 flex items-center">
                  <i class="fa-solid fa-circle-exclamation mr-2"></i>{{ error }}
                </p>
              </div>

              <!-- Submit button -->
              <button
                type="submit"
                :disabled="isLoading"
                class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i v-if="!isLoading" class="fa-solid fa-right-to-bracket mr-2"></i>
                <i v-else class="fa-solid fa-circle-notch fa-spin mr-2"></i>
                {{ isLoading ? 'Signing in...' : 'Sign In' }}
              </button>
            </form>

            <!-- Footer -->
            <div class="mt-8 text-center">
              <p class="text-gray-400 text-sm">
                Copyright © {{ new Date().getFullYear() }} Injourney Aviation Services
              </p>
            </div>
          </div>
        </div>
      </div>

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