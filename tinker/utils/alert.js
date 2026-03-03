/* ─── Self-contained toast notification helper ───────────────────────────────
 * No external dependencies. Injects its own <style> once on first call.
 *
 * Usage (auto-imported by Nuxt from utils/):
 *   const myAlert = alert();         // sync, no await needed
 *   myAlert.success('Record saved');
 *   myAlert.error('Something failed');
 *   myAlert.info('FYI message');
 *   myAlert.warning('Be careful');
 * ─────────────────────────────────────────────────────────────────────────── */

const STYLE_ID = 'tk-toast-css';

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
    @keyframes tk-toast-in  {
      from { opacity: 0; transform: translateX(110%) scale(0.92); }
      to   { opacity: 1; transform: translateX(0)   scale(1);    }
    }
    @keyframes tk-toast-out {
      from { opacity: 1; transform: translateX(0)   scale(1);    max-height: 120px; margin-bottom: 0; }
      to   { opacity: 0; transform: translateX(110%) scale(0.94); max-height: 0;    margin-bottom: -8px; }
    }
    @keyframes tk-toast-bar {
      from { width: 100%; }
      to   { width: 0%;   }
    }

    .tk-toast {
      pointer-events: auto;
      position: relative;
      display: flex;
      align-items: flex-start;
      gap: 11px;
      width: 320px;
      max-width: calc(100vw - 2rem);
      background: #ffffff;
      border-radius: 14px;
      border: 1px solid rgba(0,0,0,0.07);
      box-shadow:
        0 0 0 1px rgba(0,0,0,0.04),
        0 8px 24px -4px rgba(0,0,0,0.14),
        0 2px 8px -2px rgba(0,0,0,0.08);
      padding: 13px 12px 16px 16px;
      overflow: hidden;
      animation: tk-toast-in 0.38s cubic-bezier(0.34, 1.4, 0.64, 1) both;
    }
    .tk-toast.tk-toast--out {
      animation: tk-toast-out 0.28s ease forwards;
    }

    /* Coloured left-edge accent */
    .tk-toast::before {
      content: '';
      position: absolute;
      left: 0; top: 0; bottom: 0;
      width: 4px;
      border-radius: 14px 0 0 14px;
      background: var(--tk-toast-color);
    }

    /* Icon badge */
    .tk-toast-icon {
      flex-shrink: 0;
      width: 32px; height: 32px;
      border-radius: 9px;
      background: var(--tk-toast-bg-light);
      color: var(--tk-toast-color);
      display: flex; align-items: center; justify-content: center;
      font-size: 14px;
    }

    /* Text */
    .tk-toast-body { flex: 1; min-width: 0; padding-top: 1px; }
    .tk-toast-title {
      font-size: 0.8125rem;
      font-weight: 700;
      color: #0f172a;
      letter-spacing: -0.01em;
      margin-bottom: 2px;
      line-height: 1.3;
    }
    .tk-toast-msg {
      font-size: 0.75rem;
      color: #64748b;
      line-height: 1.5;
      word-break: break-word;
    }

    /* Close button */
    .tk-toast-close {
      flex-shrink: 0;
      align-self: flex-start;
      width: 22px; height: 22px;
      border: none;
      background: transparent;
      color: #94a3b8;
      border-radius: 6px;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 10px;
      margin-top: 1px;
      transition: background 0.13s, color 0.13s;
    }
    .tk-toast-close:hover { background: #f1f5f9; color: #475569; }

    /* Progress bar */
    .tk-toast-bar {
      position: absolute;
      bottom: 0; left: 0;
      height: 3px;
      border-radius: 0 0 14px 14px;
      background: var(--tk-toast-color);
      opacity: 0.55;
    }

    /* Colour variants */
    .tk-toast--success { --tk-toast-color: #22c55e; --tk-toast-bg-light: #f0fdf4; }
    .tk-toast--danger  { --tk-toast-color: #ef4444; --tk-toast-bg-light: #fef2f2; }
    .tk-toast--info    { --tk-toast-color: #04b0c0; --tk-toast-bg-light: #ecfeff; }
    .tk-toast--warning { --tk-toast-color: #f59e0b; --tk-toast-bg-light: #fffbeb; }
  `;
  document.head.appendChild(s);
}

const META = {
  success: { title: 'Success',  icon: 'fa-solid fa-circle-check',         auto: 4000 },
  danger:  { title: 'Error',    icon: 'fa-solid fa-circle-exclamation',    auto: 0    },
  info:    { title: 'Info',     icon: 'fa-solid fa-circle-info',           auto: 5000 },
  warning: { title: 'Warning',  icon: 'fa-solid fa-triangle-exclamation',  auto: 0    },
};

let _seq = 0;

function dismiss(el, delay = 0) {
  setTimeout(() => {
    if (!el.isConnected) return;
    el.classList.add('tk-toast--out');
    el.addEventListener('animationend', () => el.remove(), { once: true });
  }, delay);
}

function create(type, msg) {
  injectStyles();

  const wrapper = document.getElementById('alert-wrapper');
  if (!wrapper) return;

  const { title, icon, auto } = META[type] || META.info;
  const id = `tk-toast-${++_seq}`;

  const el = document.createElement('div');
  el.id        = id;
  el.className = `tk-toast tk-toast--${type}`;
  el.setAttribute('role', 'alert');
  el.innerHTML = `
    <div class="tk-toast-icon"><i class="${icon}"></i></div>
    <div class="tk-toast-body">
      <div class="tk-toast-title">${title}</div>
      <div class="tk-toast-msg">${msg}</div>
    </div>
    <button class="tk-toast-close" aria-label="Dismiss"><i class="fa-solid fa-xmark"></i></button>
    ${auto ? `<div class="tk-toast-bar" style="animation: tk-toast-bar ${auto}ms linear forwards;"></div>` : ''}
  `;

  wrapper.appendChild(el);

  // Close button
  el.querySelector('.tk-toast-close').addEventListener('click', () => dismiss(el));

  // Auto-dismiss
  if (auto) dismiss(el, auto);
}

export default () => ({
  success: (msg) => create('success', msg),
  error:   (msg) => create('danger',  msg),
  info:    (msg) => create('info',    msg),
  warning: (msg) => create('warning', msg),
});
