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
    script: [{}],
  });
</script>

<script>
  export default {
    computed: {
      showLayout() {
        const route = useRoute();
        return getSess() && (route.name != 'main-login') && !route.name?.includes('report');
      }
    }
  }
</script>

<template>
  <div :class="['tk-shell', showLayout && 'tk-shell--layout']">

    <LayoutSidebar v-if="showLayout"/>

    <!-- Main column: stacks navbar on top, content below -->
    <div :class="['tk-main', showLayout && 'tk-main--offset']">
      <LayoutNavbar v-if="showLayout"/>
      <div id="bodycontent" :class="showLayout ? 'tk-content' : 'tk-content--bare'">
        <NuxtPage />
      </div>
    </div>

  </div>
</template>

<style>
/* Global resets & layout primitives */
*, *::before, *::after { box-sizing: border-box; }
body {
  margin: 0;
  background: #f1f5f9;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Outer shell */
.tk-shell { min-height: 100dvh; }

/* Main column (navbar + content stacked vertically) */
.tk-main {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  min-width: 0;
}

/* On desktop, offset by sidebar width (256px) */
@media (min-width: 1024px) {
  .tk-main--offset { margin-left: 256px; }
}

/* Page content padding */
.tk-content      { flex: 1; padding: 24px; }
.tk-content--bare { flex: 1; padding: 0; }
</style>
