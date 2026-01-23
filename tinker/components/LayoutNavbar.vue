<script setup>
  import { navTitle } from "~/stores/mystore";
  const nTitle = navTitle();
</script>

<template>
  <nav
    class="flex-no-wrap relative flex w-full items-center justify-between bg-[#FBFBFB] dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start py-2">
    <div class="flex w-full flex-wrap items-center justify-between px-3">
      <!-- Hamburger button for mobile view -->
      <button
        class="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
        type="button"
        data-te-sidenav-toggle-ref
        data-te-target="#sidenav"
        aria-controls="sidenav"
        aria-haspopup="true">
        <!-- Hamburger icon -->
        <span class="[&>svg]:w-7">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-7 w-7">
            <path
              fill-rule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clip-rule="evenodd" />
          </svg>
        </span>
      </button>

      <!-- Collapsible navigation container -->
      <div
        class="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto" style="padding-left: 256px;"
        id="navbarSupportedContent1"
        data-te-collapse-item>
        <span class="text-lg font-bold">{{ nTitle.name }}</span>
      </div>

      <!-- Right elements -->
      <div class="relative flex items-center">
        <div
          class="relative"
          data-te-dropdown-ref
          data-te-dropdown-alignment="end">
          <!-- First dropdown trigger -->
          <a
            class="hidden-arrow mr-4 flex items-center text-neutral-600 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
            href="#"
            id="userdropdown"
            role="button"
            data-te-dropdown-toggle-ref
            aria-expanded="false">
            <!-- Dropdown trigger icon -->
            <span class="[&>svg]:w-5">
              <i class="fa-solid fa-database fa-lg"></i>
            </span>
            <span class="ml-2">Local Data</span>
          </a>
          <ul
            class="absolute z-40 float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
            aria-labelledby="userdropdown"
            data-te-dropdown-menu-ref>
            <li>
              <a
                class="block w-full whitespace-nowrap bg-transparent px-4 py-2 font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                data-te-dropdown-item-ref
                href="#"
                @click="reloadLocalData"
              >
                <i class="fa-solid fa-rotate-right mr-2"></i>
                Reload data
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- User -->
      <div class="relative flex items-center">
        <div
          class="relative"
          data-te-dropdown-ref
          data-te-dropdown-alignment="end">
          <!-- First dropdown trigger -->
          <a
            class="hidden-arrow mr-4 flex items-center text-neutral-600 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
            href="#"
            id="userdropdown"
            role="button"
            data-te-dropdown-toggle-ref
            aria-expanded="false">
            <!-- Dropdown trigger icon -->
            <span class="[&>svg]:w-5">
              <i class="fa-solid fa-circle-user fa-lg"></i>
            </span>
            <span class="ml-2">{{ sess.name }}</span>
          </a>
          <ul
            class="absolute z-40 float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
            aria-labelledby="userdropdown"
            data-te-dropdown-menu-ref>
            <li>
              <a
                class="block w-full whitespace-nowrap bg-transparent px-4 py-2 font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                data-te-dropdown-item-ref
                href="#"
                @click="chgpass"
              >
                <i class="fa-solid fa-key mr-2"></i>
                Change Password
              </a>
            </li>
            <li>
              <a
                class="block w-full whitespace-nowrap bg-transparent px-4 py-2 font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                data-te-dropdown-item-ref
                href="#"
                @click="logout"
              >
                <i class="fa-solid fa-arrow-right-from-bracket mr-2"></i>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>

  <div id="alert-wrapper" class="fixed z-50 top-0 right-0 mt-5 mx-5 flex flex-col max-w-lg"></div>

  <div id="loading-overlay" style="display: none;" class="w-full h-full fixed top-0 left-0 bg-neutral-950 opacity-75 z-[2000]">
    <div class="flex justify-center items-center mt-[50vh]">
      <i class="fa-solid fa-circle-notch fa-2xl animate-spin text-white"></i>
      <span id="loading-text" class="ml-5 text-xl text-white font-bold">Loading ...</span>
    </div>
  </div>

  <Modal id="modalPass" title="Change Password">
    <form id="form-pass">
      <Input type="password" name="oldpass" id="oldpass" label="Enter Old Password"/>
      <Input type="password" name="newpass" id="newpass" label="Enter New Pass"/>
      <Input type="password" name="repass" id="repass" label="Confirm New Pass"/>
      <p class="text-red-500">{{ error }}</p>
      <div class="flex justify-end">
        <button type="button" class="btn-success" @click="submitPass">Submit Change</button> <br>
      </div>
    </form>
  </Modal>

</template>

<script>
  export default {
    data:()=>({
      alert:'', sess:{}, modalPass:'', error:''
    }),
    async mounted(){
      const { Modal,initTE } = await import('tw-elements');
      initTE({ Modal });
      this.modalPass = new Modal(document.getElementById('modalPass'), {});
      this.alert = await alert();

      this.sess = getSess()
      this.loadLocalData();
    },
    methods:{
      async loadLocalData(){
        let lx = localStorage.getItem('xdump');
        if(lx == null){
          await this.masterData();
        }
      },
      async reloadLocalData(){
        await this.masterData();
      },
      async masterData(){
        loading(true, 'Downloading master data ...');
        let prepare = appcfg.localData;
        let obj = {};
        for(const [k,v] of Object.entries(prepare)){
          let res = await call.get(v.url);
          obj[k] = res.data.docs;
        }
        localStorage.setItem('xdump', JSON.stringify(obj));
        loading(false);
      },
      chgpass(){
        this.modalPass.toggle();
      },
      async submitPass(){
        try {
          let obj = dataForm('form-pass');
          obj._id = getSess()._id;
          let res = await call.post(`/api/setting/chgpass`, obj);
          if(res.status.code == 200){
            this.modalPass.toggle();
            delSess(); navigateTo('/main/login')
          }else{
            this.error = res.status.message;
          }
        } catch (error) {
          this.alert.error(error.message);
        }
      },
      logout(){
        delSess(); location.href = '/main/login';
      }
    }
  }
</script>