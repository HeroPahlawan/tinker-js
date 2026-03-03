<script setup>
  import { navTitle } from '~/stores/mystore';
  const nTitle  = navTitle();
  const sidebar = useState('tinker_sidebar', () => true);
</script>

<template>
  <!-- Top navbar -->
  <header class="tk-navbar">

    <!-- Left: hamburger + page title -->
    <div class="tk-navbar-left">
      <button class="tk-hamburger" @click="sidebar = !sidebar" aria-label="Toggle menu">
        <span class="tk-ham-line"/>
        <span class="tk-ham-line tk-ham-line--mid"/>
        <span class="tk-ham-line"/>
      </button>
      <h1 class="tk-page-title">{{ nTitle.name }}</h1>
    </div>

    <!-- Right: action buttons + user dropdown -->
    <div class="tk-navbar-right">

      <!-- Reload local data -->
      <button class="tk-action-btn" @click="reloadLocalData" title="Reload master data">
        <i class="fa-solid fa-rotate-right"/>
      </button>

      <!-- User menu -->
      <div class="tk-user-wrap" v-click-outside="() => userOpen = false">
        <button class="tk-user-btn" @click="userOpen = !userOpen">
          <span class="tk-user-avatar">
            <i class="fa-solid fa-user"/>
          </span>
          <span class="tk-user-name">{{ sess.name }}</span>
          <i :class="['fa-solid fa-angle-down tk-user-chevron', userOpen && 'tk-user-chevron--open']"/>
        </button>

        <Transition name="tk-drop">
          <div v-if="userOpen" class="tk-dropdown">
            <div class="tk-dropdown-header">
              <p class="tk-dh-name">{{ sess.name }}</p>
              <p class="tk-dh-role">{{ sess.role || 'User' }}</p>
            </div>
            <div class="tk-dropdown-divider"/>
            <button class="tk-dropdown-item" @click="openChgPass">
              <i class="fa-solid fa-key tk-ddi-icon"/>
              Change Password
            </button>
            <button class="tk-dropdown-item tk-dropdown-item--danger" @click="logout">
              <i class="fa-solid fa-arrow-right-from-bracket tk-ddi-icon"/>
              Sign out
            </button>
          </div>
        </Transition>
      </div>
    </div>
  </header>

  <!-- Global overlays (kept for compatibility with loading() / alert helpers) -->
  <div id="alert-wrapper" class="fixed z-[9999] top-4 right-4 flex flex-col gap-2 max-w-sm pointer-events-none"/>

  <div id="loading-overlay" style="display:none"
    class="fixed inset-0 bg-slate-950/80 z-[2000] flex items-center justify-center backdrop-blur-sm">
    <div class="flex items-center gap-3 bg-white/10 border border-white/15 rounded-2xl px-7 py-5 shadow-2xl">
      <i class="fa-solid fa-circle-notch fa-xl animate-spin text-white"/>
      <span id="loading-text" class="text-white font-semibold text-base">Loading…</span>
    </div>
  </div>

  <!-- Change password modal -->
  <Modal ref="modalPass" title="Change Password">
    <form id="form-pass" class="flex flex-col gap-3">
      <Input type="password" name="oldpass" id="oldpass" label="Current Password"/>
      <Input type="password" name="newpass" id="newpass" label="New Password"/>
      <Input type="password" name="repass"  id="repass"  label="Confirm New Password"/>
      <p v-if="error" class="text-sm text-red-500 flex items-center gap-1.5">
        <i class="fa-solid fa-circle-exclamation"/>{{ error }}
      </p>
      <div class="flex justify-end pt-1">
        <button type="button" class="btn-success" @click="submitPass">Save Changes</button>
      </div>
    </form>
  </Modal>
</template>

<script>
  export default {
    // Simple click-outside directive for closing dropdowns
    directives: {
      'click-outside': {
        mounted(el, binding) {
          el._clickOutsideHandler = (e) => { if (!el.contains(e.target)) binding.value(e); };
          document.addEventListener('click', el._clickOutsideHandler, true);
        },
        unmounted(el) {
          document.removeEventListener('click', el._clickOutsideHandler, true);
        }
      }
    },
    data: () => ({
      sess:     {},
      userOpen: false,
      error:    '',
    }),
    mounted() {
      this.sess = getSess() || {};
      this.loadLocalData();
    },
    methods: {
      async loadLocalData() {
        if (localStorage.getItem('xdump') == null) await this.masterData();
      },
      async reloadLocalData() {
        await this.masterData();
      },
      async masterData() {
        loading(true, 'Downloading master data…');
        const obj = {};
        for (const [k, v] of Object.entries(appcfg.localData)) {
          const res = await call.get(v.url);
          obj[k]   = res.data.docs;
        }
        localStorage.setItem('xdump', JSON.stringify(obj));
        loading(false);
      },
      openChgPass() {
        this.userOpen = false;
        this.error    = '';
        this.$refs.modalPass?.toggle();
      },
      async submitPass() {
        try {
          const obj = dataForm('form-pass');
          obj._id   = getSess()._id;
          const res = await call.post('/api/setting/chgpass', obj);
          if (res.status.code === 200) {
            this.$refs.modalPass?.toggle();
            delSess();
            navigateTo('/main/login');
          } else {
            this.error = res.status.message;
          }
        } catch (e) {
          this.error = e.message;
        }
      },
      logout() {
        delSess();
        location.href = '/main/login';
      }
    }
  }
</script>

<style scoped>
/*
 * ── THEME TOKENS ──────────────────────────────────────────────────────────────
 * Override in your global CSS to retheme without touching this file:
 *
 *   .tk-navbar { --n-accent: #6366f1; }
 * ─────────────────────────────────────────────────────────────────────────────
 */
.tk-navbar {
  --n-h:        60px;
  --n-bg:       #ffffff;
  --n-border:   #f1f5f9;
  --n-text:     #1e293b;
  --n-muted:    #64748b;
  --n-accent:   #04b0c0;
  --n-hover-bg: #f8fafc;
  --n-ring:     rgba(4, 176, 192, 0.18);
}

/* ── Shell ── */
.tk-navbar {
  position: sticky;
  top: 0;
  z-index: 900;
  height: var(--n-h);
  background: var(--n-bg);
  border-bottom: 1px solid var(--n-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  gap: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

/* ── Left ── */
.tk-navbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

/* Animated hamburger */
.tk-hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4.5px;
  width: 34px;
  height: 34px;
  padding: 0 6px;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.14s;
}
.tk-hamburger:hover { background: var(--n-hover-bg); }

.tk-ham-line {
  display: block;
  height: 1.75px;
  width: 100%;
  background: var(--n-muted);
  border-radius: 2px;
  transform-origin: center;
  transition: transform 0.22s ease, opacity 0.22s ease, width 0.22s ease;
}
.tk-ham-line--mid { width: 75%; }


.tk-page-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--n-text);
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}

/* ── Right ── */
.tk-navbar-right {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

/* Icon-only action buttons */
.tk-action-btn {
  width: 34px; height: 34px;
  display: flex; align-items: center; justify-content: center;
  border: none;
  background: transparent;
  color: var(--n-muted);
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  transition: background 0.14s, color 0.14s;
}
.tk-action-btn:hover { background: var(--n-hover-bg); color: var(--n-text); }

/* ── User pill button ── */
.tk-user-wrap { position: relative; }

.tk-user-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 10px 4px 5px;
  border: 1px solid var(--n-border);
  border-radius: 10px;
  background: transparent;
  color: var(--n-text);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background 0.14s, border-color 0.14s, box-shadow 0.14s;
}
.tk-user-btn:hover {
  background: var(--n-hover-bg);
  border-color: #cbd5e1;
  box-shadow: 0 0 0 3px var(--n-ring);
}

.tk-user-avatar {
  width: 26px; height: 26px;
  border-radius: 7px;
  background: linear-gradient(135deg, var(--n-accent) 0%, #045db5 100%);
  display: flex; align-items: center; justify-content: center;
  color: #fff;
  font-size: 11px;
  flex-shrink: 0;
}
.tk-user-name {
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
@media (max-width: 480px) { .tk-user-name { display: none; } }

.tk-user-chevron {
  font-size: 11px;
  color: var(--n-muted);
  transition: transform 0.2s ease;
  flex-shrink: 0;
}
.tk-user-chevron--open { transform: rotate(180deg); }

/* ── Dropdown panel ── */
.tk-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 200px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06);
  overflow: hidden;
  z-index: 1000;
}
.tk-dropdown-header { padding: 12px 14px 10px; }
.tk-dh-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 2px;
}
.tk-dh-role {
  font-size: 0.75rem;
  color: #94a3b8;
  margin: 0;
}
.tk-dropdown-divider { height: 1px; background: #f1f5f9; }

.tk-dropdown-item {
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  padding: 9px 14px;
  border: none;
  background: transparent;
  color: #374151;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  text-align: left;
  transition: background 0.12s;
}
.tk-dropdown-item:hover                { background: #f8fafc; }
.tk-dropdown-item--danger              { color: #ef4444; }
.tk-dropdown-item--danger:hover        { background: #fef2f2; }
.tk-ddi-icon { width: 14px; text-align: center; opacity: 0.7; }

/* ── Dropdown animation ── */
.tk-drop-enter-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.tk-drop-leave-active { transition: opacity 0.11s ease, transform 0.11s ease; }
.tk-drop-enter-from   { opacity: 0; transform: translateY(-6px) scale(0.97); }
.tk-drop-leave-to     { opacity: 0; transform: translateY(-4px) scale(0.97); }
</style>
