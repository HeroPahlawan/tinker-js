
<template>
    <div class="relative">
      <div class="block rounded-lg bg-white text-white shadow-secondary-1 dark:bg-surface-dark">
        <img
          class="rounded-lg"
          :src="bgurl"
          alt="" />
        <div class="absolute top-0 p-6">
          <div class="flex flex-items items-center">
              <i :class='geticon(icon)' id='icon'></i>
              <h5 class="mb-2 ml-2 text-xl font-medium leading-tight ">
                {{ title }}
              </h5>
          </div>
          <p class="mb-4 text-base">
            {{ content }}
          </p>
          <button v-if="prompt && prompt.trim()"
            type="button"
            :href="href"
            class="inline-block btn-sm rounded bg-white px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
            data-twe-ripple-init
            data-twe-ripple-color="light">
            {{ prompt }}
            </button>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    props: ['title','content','href','prompt', 'bgurl', 'icon'],
    async mounted(){
      const { Input, initTE } = await import("tw-elements");
      initTE({ Input }, { allowReinits: true });
    },
    methods: {
      geticon(icon) {
        return 'fa-solid fa-'+icon+' fa-xl mb-2 ';
      }
    }
  }
</script>