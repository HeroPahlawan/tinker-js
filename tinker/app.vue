<script setup>
  useHead({
    title: appcfg.appName,
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      {rel: 'stylesheet', type: 'text/css', href: '/fontawesome/all.min.css'},
      {rel: 'stylesheet', type: 'text/css', href: '/tailwind.css'}
    ],
    script: [
      {}
    ],
    bodyAttrs: {
      class: 'bg-neutral-300'
    }
  });
</script>

<script>
  export default {
    computed: {
      bodyContent(){
        return this.showLayout ? 'p-4' : '!p-0';
      },
      showLayout(){
        const route = useRoute();
        return getSess() && (route.name != 'main-login') && !route.name.includes('report');
      }
    }
  }
</script>
<template>
  <LayoutSidebar v-if="showLayout"/>
  <LayoutNavbar v-if="showLayout"/>
    <div id="bodycontent" :class="bodyContent">
      <NuxtPage />
    </div>
</template>
