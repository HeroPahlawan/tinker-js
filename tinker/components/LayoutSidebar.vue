<script setup>
  const config  = useRuntimeConfig();
  const route   = useRoute();
  const sidebar = useState('tinker_sidebar', () => true);

  const menu          = appcfg.menu;
  const expandedMenus = useState('tinker_expanded', () => []);

  // On mount: collapse on small screens; auto-expand active parent
  onMounted(() => {
    if (window.innerWidth < 1024) sidebar.value = false;
    for (const m of menu) {
      if (m.submenu?.length > 0 && m.submenu.some(s => isActive(s.sublink))) {
        if (!expandedMenus.value.includes(m.name)) expandedMenus.value.push(m.name);
      }
    }
  });

  const closeSidebar   = () => { if (window.innerWidth < 1024) sidebar.value = false; };
  const toggleMenu     = (name) => {
    const idx = expandedMenus.value.indexOf(name);
    if (idx >= 0) expandedMenus.value.splice(idx, 1);
    else expandedMenus.value.push(name);
  };

  const isExpanded     = (name)    => expandedMenus.value.includes(name);
  const isActive       = (link)    => !!link && link !== '#' && (route.path === link || route.path.startsWith(link + '/'));
  const isParentActive = (submenu) => submenu?.some(s => isActive(s.sublink));

  const appName = config.public?.APP_NAME || appcfg.appName || 'App';
</script>

<template>
  <!-- Mobile backdrop -->
  <Transition name="tk-fade">
    <div v-if="sidebar" class="tk-backdrop lg:hidden" @click="sidebar = false"/>
  </Transition>

  <!-- Sidebar -->
  <aside :class="['tk-sidebar', sidebar ? 'tk-sidebar--open' : 'tk-sidebar--closed']">

    <!-- Brand -->
    <div class="tk-brand">
      <!--
        LOGO: Replace .tk-brand-icon below with your own logo:
        <img src="/img/your-logo.png" class="tk-brand-img" alt="logo">
      -->
      <div class="tk-brand-icon">
        <svg viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="8" height="8" rx="2" fill="white" fill-opacity="0.95"/>
          <rect x="13" y="3" width="8" height="8" rx="2" fill="white" fill-opacity="0.6"/>
          <rect x="3" y="13" width="8" height="8" rx="2" fill="white" fill-opacity="0.6"/>
          <rect x="13" y="13" width="8" height="8" rx="2" fill="white" fill-opacity="0.3"/>
        </svg>
      </div>
      <span class="tk-brand-name">{{ appName }}</span>
      <button class="tk-brand-close lg:hidden" @click="sidebar = false" aria-label="Close menu">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="tk-nav" aria-label="Main navigation">
      <ul class="tk-nav-list">
        <li v-for="item in menu" :key="item.name" class="tk-nav-entry">

          <!-- Single link -->
          <a
            v-if="!item.submenu || item.submenu.length === 0"
            @click.prevent="navigateTo(item.link); closeSidebar()"
            :class="['tk-nav-item', isActive(item.link) && 'tk-nav-item--active']"
          >
            <span class="tk-nav-icon"><i :class="item.icon"/></span>
            <span class="tk-nav-label">{{ item.name }}</span>
            <span v-if="isActive(item.link)" class="tk-nav-pip"/>
          </a>

          <!-- Parent with submenu -->
          <template v-else>
            <button
              @click="toggleMenu(item.name)"
              :class="['tk-nav-item tk-nav-parent', isParentActive(item.submenu) && 'tk-nav-item--parent']"
              :aria-expanded="isExpanded(item.name)"
            >
              <span class="tk-nav-icon"><i :class="item.icon"/></span>
              <span class="tk-nav-label">{{ item.name }}</span>
              <span :class="['tk-nav-arrow', isExpanded(item.name) && 'tk-nav-arrow--open']">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
                </svg>
              </span>
            </button>

            <Transition name="tk-sub">
              <ul v-if="isExpanded(item.name)" class="tk-submenu">
                <li v-for="sub in item.submenu" :key="sub.sublink">
                  <a
                    @click.prevent="navigateTo(sub.sublink); closeSidebar()"
                    :class="['tk-sub-item', isActive(sub.sublink) && 'tk-sub-item--active']"
                  >
                    <i :class="['tk-sub-icon', sub.subicon]"/>
                    <span>{{ sub.subname }}</span>
                  </a>
                </li>
              </ul>
            </Transition>
          </template>

        </li>
      </ul>
    </nav>

    <!-- Footer -->
    <div class="tk-sidebar-foot">
      <span class="tk-sidebar-ver">Template v1.0</span>
    </div>

  </aside>
</template>

<style scoped>
/*
 * ── THEME TOKENS ──────────────────────────────────────────────────────────────
 * To retheme this sidebar, override these variables in your global CSS:
 *
 *   .tk-sidebar {
 *     --s-bg:     #1a1a2e;
 *     --s-accent: #e94560;
 *   }
 * ─────────────────────────────────────────────────────────────────────────────
 */
.tk-sidebar {
  --s-w:         256px;
  --s-bg:        #0f172a;
  --s-border:    rgba(255, 255, 255, 0.07);
  --s-text:      #94a3b8;
  --s-heading:   #f1f5f9;
  --s-accent:    #04b0c0;
  --s-accent-bg: rgba(4, 176, 192, 0.13);
  --s-hover-bg:  rgba(255, 255, 255, 0.055);
}

/* ── Backdrop ── */
.tk-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.52);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  z-index: 1040;
}

/* ── Sidebar shell ── */
.tk-sidebar {
  position: fixed;
  top: 0; left: 0;
  width: var(--s-w);
  height: 100dvh;
  background: var(--s-bg);
  display: flex;
  flex-direction: column;
  z-index: 1050;
  transition: transform 0.26s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  box-shadow: 4px 0 32px rgba(0, 0, 0, 0.22);
}
.tk-sidebar--open   { transform: translateX(0); }
.tk-sidebar--closed { transform: translateX(-100%); }

@media (min-width: 1024px) {
  /* Always visible on desktop regardless of state */
  .tk-sidebar { transform: translateX(0) !important; box-shadow: none; }
}

/* ── Brand header ── */
.tk-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 60px;
  min-height: 60px;
  padding: 0 16px;
  border-bottom: 1px solid var(--s-border);
  flex-shrink: 0;
}
.tk-brand-icon {
  width: 30px; height: 30px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--s-accent) 0%, #045db5 100%);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.tk-brand-icon svg { width: 17px; height: 17px; }
/* Custom logo image helper class */
.tk-brand-img { width: 30px; height: 30px; border-radius: 8px; object-fit: contain; flex-shrink: 0; }

.tk-brand-name {
  flex: 1;
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--s-heading);
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tk-brand-close {
  width: 26px; height: 26px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: var(--s-text);
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.14s, color 0.14s;
}
.tk-brand-close:hover { background: var(--s-hover-bg); color: var(--s-heading); }
.tk-brand-close svg { width: 15px; height: 15px; }

/* ── Navigation ── */
.tk-nav {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px 8px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.07) transparent;
}
.tk-nav-list {
  list-style: none;
  margin: 0; padding: 0;
  display: flex; flex-direction: column;
  gap: 1px;
}
.tk-nav-entry { position: relative; }

/* Nav item base (shared by <a> and <button>) */
.tk-nav-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 9px 10px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--s-text);
  background: transparent;
  border: none;
  cursor: pointer;
  text-decoration: none;
  text-align: left;
  transition: background 0.14s, color 0.14s;
  -webkit-tap-highlight-color: transparent;
}
.tk-nav-item:hover              { background: var(--s-hover-bg); color: var(--s-heading); }
.tk-nav-item--active            { background: var(--s-accent-bg); color: var(--s-accent); }
.tk-nav-item--active:hover      { background: var(--s-accent-bg); }
.tk-nav-item--parent            { color: var(--s-heading); }
.tk-nav-parent                  { justify-content: flex-start; }

.tk-nav-icon {
  width: 18px; height: 18px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  font-size: 13px;
}
.tk-nav-label { flex: 1; }

/* Active side-pip */
.tk-nav-pip {
  position: absolute;
  right: 0; top: 50%;
  transform: translateY(-50%);
  width: 3px; height: 18px;
  border-radius: 2px 0 0 2px;
  background: var(--s-accent);
}

/* Expand arrow */
.tk-nav-arrow {
  display: flex; align-items: center;
  color: var(--s-text);
  transition: transform 0.22s ease;
  flex-shrink: 0;
}
.tk-nav-arrow svg     { width: 13px; height: 13px; }
.tk-nav-arrow--open   { transform: rotate(90deg); }

/* ── Submenu ── */
.tk-submenu {
  list-style: none;
  margin: 2px 0 4px 0;
  padding: 0 0 0 28px;
  display: flex; flex-direction: column;
  gap: 1px;
}
.tk-sub-item {
  display: flex; align-items: center; gap: 9px;
  padding: 7px 10px;
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: 400;
  color: var(--s-text);
  cursor: pointer;
  text-decoration: none;
  transition: background 0.14s, color 0.14s;
  -webkit-tap-highlight-color: transparent;
}
.tk-sub-item:hover       { background: var(--s-hover-bg); color: var(--s-heading); }
.tk-sub-item--active     { color: var(--s-accent); font-weight: 500; }
.tk-sub-icon {
  width: 14px;
  text-align: center;
  flex-shrink: 0;
  font-size: 11px;
  opacity: 0.55;
}
.tk-sub-item--active .tk-sub-icon { opacity: 1; }

/* ── Sidebar footer ── */
.tk-sidebar-foot {
  padding: 12px 16px;
  border-top: 1px solid var(--s-border);
  flex-shrink: 0;
}
.tk-sidebar-ver { font-size: 0.6875rem; color: var(--s-text); opacity: 0.4; }

/* ── Transitions ── */
.tk-fade-enter-active, .tk-fade-leave-active { transition: opacity 0.22s; }
.tk-fade-enter-from,   .tk-fade-leave-to     { opacity: 0; }

.tk-sub-enter-active  { transition: opacity 0.18s ease, transform 0.18s ease; }
.tk-sub-leave-active  { transition: opacity 0.13s ease, transform 0.13s ease; }
.tk-sub-enter-from    { opacity: 0; transform: translateY(-6px); }
.tk-sub-leave-to      { opacity: 0; transform: translateY(-4px); }
</style>
