<script setup>
  import { onMounted } from 'vue';
  import { useRuntimeConfig } from '#app';
  const config = useRuntimeConfig();
  onMounted(async () => {
    const { Sidenav, Collapse, Dropdown, initTE } = await import("tw-elements");
    initTE({ Sidenav, Collapse, Dropdown });

    const sidenav2 = document.getElementById("sidenav");
    const sidenavInstance2 = Sidenav.getInstance(sidenav2);

    let innerWidth2 = null;

    const setMode2 = (e) => {
      if (window.innerWidth === innerWidth2) {
        return;
      }

      innerWidth2 = window.innerWidth;

      if (window.innerWidth < sidenavInstance2.getBreakpoint("xl")) {
        sidenavInstance2.changeMode("over");
        sidenavInstance2.hide();
      } else {
        sidenavInstance2.changeMode("side");
        sidenavInstance2.show();
      }
    };

    if (window.innerWidth < sidenavInstance2.getBreakpoint("sm")) {
      setMode2();
    }
    
    window.addEventListener("resize", setMode2);
  });
</script>
<script>
  export default {
    data: () => ({
      drawer: false,
      menu: appcfg.menu,
    })
  }
</script>

<template>
  <nav
    id="sidenav"
    class="fixed bg-[url('/img/patternbg-small.jpg')] bg-no-repeat bg-cover bg-blend-soft-light left-0 top-0 z-[1035] h-screen w-60 -translate-x-full overflow-hidden shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] dark:bg-zinc-800 xl:data-[te-sidenav-hidden='false']:translate-x-0"
    data-te-sidenav-init
    data-te-sidenav-hidden="false"
    data-te-sidenav-mode-breakpoint-over="0"
    data-te-sidenav-mode-breakpoint-side="xl"
    data-te-sidenav-content="#bodycontent"
    data-te-sidenav-accordion="true">
    <ul class="relative m-0 list-none px-[0.2rem]" data-te-sidenav-menu-ref>
      <li class="relative my-2">
        <div class="flex align-middle mb-3">
            <div class="p-2">
              <img src="/img/Injourney-Aviation-Services-icon.png" alt="Description of image" width="30px" height="auto">
            </div>
            <h1 class="text-xl font-bold p-2 ">{{ config.public.APP_NAME }}</h1>
        </div>
      </li>

      <li class="relative mt-2" v-for="main in menu">
        <template v-if="main.submenu.length == 0">
          <a @click="navigateTo(main.link)"
            class="flex cursor-pointer items-center truncate rounded-[5px] px-6 py-1  outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:outline-none focus:bg-slate-50  focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark: dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
            data-te-sidenav-link-ref>
            <span
              class="mr-4 w-4 [&>svg]:text-gray-300 dark:[&>svg]:text-gray-300">
              <i :class="main.icon" />
            </span>
            <span>{{ main.name }}</span>
          </a>
        </template>
        <template v-else-if="main.submenu.length > 0">
          <a class="flex cursor-pointer items-center truncate rounded-[5px] px-6 py-1  outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:outline-none focus:bg-slate-50 focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]: data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark: dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
            data-te-sidenav-link-ref>
            <span
              class="mr-4 w-4 [&>svg]:text-gray-300 dark:[&>svg]:text-gray-300">
              <i :class="main.icon" />
            </span>
            <span>{{ main.name }}</span>
            <span
              class="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]: dark:[&>svg]:text-gray-300"
              data-te-sidenav-rotate-icon-ref>
              <i class="fa-solid fa-angle-down" />
            </span>
          </a>
          <ul
            class="show !visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block "
            data-te-sidenav-collapse-ref>
            <li class="relative mt-2" v-for="submain in main.submenu">
              <a @click="navigateTo(submain.sublink)"
                class="flex cursor-pointer items-center truncate rounded-[5px] px-6 py-1  outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:outline-none focus:bg-slate-50 focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark: dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                data-te-sidenav-link-ref
                >
                <span
                  class="mr-4 ml-8 [&>svg]:text-gray-300 dark:[&>svg]:text-gray-300">
                  <i :class="submain.subicon" />
                </span>
                <span>{{ submain.subname }}</span>
              </a>
            </li>
          </ul>
        </template>
      </li>

    </ul>
  </nav>
</template>