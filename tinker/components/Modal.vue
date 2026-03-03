<script setup>
/**
 * Modal Component
 * ─────────────────────────────────────────────────────────────────────────────
 * Pure-Vue modal — no tw-elements dependency.
 *
 * Props
 *   title  {String}  Header title text.
 *   icon   {String}  Optional Font Awesome class for the header icon badge,
 *                    e.g. "fa-solid fa-code-branch".
 *   size   {String}  Dialog width preset: 'sm' | 'md' | 'lg' | 'xl'
 *                    Defaults to 'md'.
 *
 * Exposed (via ref)
 *   toggle()  – Open if closed, close if open.
 *   open()    – Open the modal.
 *   close()   – Close the modal.
 *
 * ─── Usage ────────────────────────────────────────────────────────────────────
 *
 *   <Modal ref="myModal" title="Edit User" icon="fa-solid fa-user" size="lg">
 *     <!-- slot content -->
 *   </Modal>
 *
 *   // From Options API parent:
 *   this.$refs.myModal.toggle()
 *   this.$refs.myModal.close()
 * ─────────────────────────────────────────────────────────────────────────────
 */

const props = defineProps({
  title: { type: String, default: '' },
  icon:  { type: String, default: null },
  size:  { type: String, default: 'md' },
});

const isOpen = ref(false);

const open   = () => { isOpen.value = true;  };
const close  = () => { isOpen.value = false; };
const toggle = () => { isOpen.value = !isOpen.value; };

defineExpose({ open, close, toggle });

// Close on Escape key
onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen.value) close();
  });
});
</script>

<template>
  <Teleport to="body">
    <Transition name="tk-modal">
      <div v-if="isOpen" class="tk-modal-overlay" @click.self="close">
        <div :class="['tk-modal-dialog', `tk-modal-dialog--${size}`]" role="dialog" aria-modal="true">

          <!-- Header -->
          <div class="tk-modal-header">
            <div class="tk-modal-title">
              <span v-if="icon" class="tk-modal-icon-badge">
                <i :class="icon"></i>
              </span>
              {{ title }}
            </div>
            <button type="button" class="tk-modal-close" @click="close" aria-label="Close">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <!-- Body -->
          <div class="tk-modal-body">
            <slot />
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* ── Overlay ─────────────────────────────────────────────────────────────── */
.tk-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

/* ── Dialog ──────────────────────────────────────────────────────────────── */
.tk-modal-dialog {
  --m-accent:   #04b0c0;
  --m-accent-2: #0284c7;
  --m-bg:       #ffffff;
  --m-border:   #e5e7eb;
  --m-radius:   16px;

  position: relative;
  width: 100%;
  max-height: calc(100dvh - 2rem);
  display: flex;
  flex-direction: column;
  background: var(--m-bg);
  border-radius: var(--m-radius);
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.06),
    0 24px 48px -8px rgba(0, 0, 0, 0.24),
    0 8px 20px -4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.tk-modal-dialog--sm { max-width: 400px; }
.tk-modal-dialog--md { max-width: 580px; }
.tk-modal-dialog--lg { max-width: 760px; }
.tk-modal-dialog--xl { max-width: 980px; }

/* ── Header ──────────────────────────────────────────────────────────────── */
.tk-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem 0.875rem;
  /* 3-px gradient accent bar at the very top */
  background:
    linear-gradient(90deg, var(--m-accent) 0%, var(--m-accent-2) 100%)
    no-repeat top / 100% 3px,
    #f8fafc;
  padding-top: calc(1rem + 3px);   /* push content below the accent bar */
  border-bottom: 1px solid var(--m-border);
  flex-shrink: 0;
}

.tk-modal-title {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 0.9375rem;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.015em;
}

.tk-modal-icon-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.875rem;
  height: 1.875rem;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--m-accent), var(--m-accent-2));
  color: #fff;
  font-size: 0.75rem;
  flex-shrink: 0;
}

.tk-modal-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.875rem;
  height: 1.875rem;
  padding: 0;
  border: 1px solid var(--m-border);
  border-radius: 8px;
  background: transparent;
  color: #64748b;
  cursor: pointer;
  font-size: 0.8125rem;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  flex-shrink: 0;
}
.tk-modal-close:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  color: #0f172a;
}

/* ── Body ────────────────────────────────────────────────────────────────── */
.tk-modal-body {
  padding: 1.375rem 1.25rem 1.25rem;
  overflow-y: auto;
  flex: 1;
}

/* ── Transition ──────────────────────────────────────────────────────────── */
/* Overlay: fade */
.tk-modal-enter-active { transition: opacity 0.2s ease; }
.tk-modal-leave-active { transition: opacity 0.18s ease; }
.tk-modal-enter-from,
.tk-modal-leave-to    { opacity: 0; }

/* Dialog: slide up + slight scale on enter, reverse on leave */
.tk-modal-enter-active .tk-modal-dialog {
  animation: tk-modal-in 0.26s cubic-bezier(0.34, 1.45, 0.64, 1) both;
}
.tk-modal-leave-active .tk-modal-dialog {
  animation: tk-modal-out 0.18s ease both;
}

@keyframes tk-modal-in {
  from { transform: translateY(-20px) scale(0.96); opacity: 0; }
  to   { transform: translateY(0)     scale(1);    opacity: 1; }
}
@keyframes tk-modal-out {
  from { transform: translateY(0)   scale(1);    opacity: 1; }
  to   { transform: translateY(8px) scale(0.97); opacity: 0; }
}
</style>
