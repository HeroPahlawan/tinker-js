<script setup>
const config = useRuntimeConfig();
</script>

<template>
  <div class="login-root">

    <!-- Left Panel: Branding -->
    <div class="panel-left">
      <canvas ref="bgCanvas" class="bg-canvas"></canvas>
      <div class="grid-overlay"></div>
      <div class="glow-blob glow-1"></div>
      <div class="glow-blob glow-2"></div>
      <div class="geo-ring ring-a"></div>
      <div class="geo-ring ring-b"></div>
      <div class="geo-ring ring-c"></div>

      <!-- Logo -->
      <div class="panel-logo">
        <div class="logo-icon">
          <svg class="icon-bolt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
        </div>
        <span class="logo-name">{{ config.public.APP_NAME }}</span>
      </div>

      <!-- Hero -->
      <div class="panel-hero">
        <div class="badge">
          <span class="badge-dot"></span>
          Secure &amp; Reliable
        </div>
        <h1 class="hero-title">Built for teams<br/>that move fast.</h1>
        <p class="hero-sub">
          A unified workspace to manage your operations, streamline workflows,
          and scale with confidence.
        </p>
        <div class="feat-list">
          <div v-for="feat in features" :key="feat" class="feat-item">
            <div class="feat-check">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <span>{{ feat }}</span>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <p class="panel-foot">© {{ new Date().getFullYear() }} {{ config.public.APP_NAME }}. All rights reserved.</p>
    </div>

    <!-- Right Panel: Form -->
    <div class="panel-right">

      <!-- Mobile logo -->
      <div class="mobile-logo">
        <div class="logo-icon logo-icon-sm">
          <svg class="icon-bolt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
        </div>
        <span class="logo-name logo-name-dark">{{ config.public.APP_NAME }}</span>
      </div>

      <div class="form-card form-enter">

        <!-- Brand: Replace .brand-icon with <img src="/your-logo.png" class="brand-img" alt="logo"> -->
        <div class="form-brand">
          <div class="brand-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="8" height="8" rx="2" fill="white" fill-opacity="0.95"/>
              <rect x="13" y="3" width="8" height="8" rx="2" fill="white" fill-opacity="0.6"/>
              <rect x="3" y="13" width="8" height="8" rx="2" fill="white" fill-opacity="0.6"/>
              <rect x="13" y="13" width="8" height="8" rx="2" fill="white" fill-opacity="0.3"/>
            </svg>
          </div>
          <span class="brand-name">{{ config.public.APP_NAME }}</span>
        </div>

        <div class="form-heading">
          <h2>Welcome back</h2>
          <p>Sign in to continue to your workspace</p>
        </div>

        <form id="myForm" @submit.prevent="save_form">
          <!-- Username -->
          <div class="field-group">
            <label for="username" class="field-label">Username</label>
            <div class="field-wrap">
              <span class="field-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </span>
              <input id="username" type="text" name="username"
                autocomplete="username" placeholder="Enter your username" class="field-input"/>
            </div>
          </div>

          <!-- Password -->
          <div class="field-group">
            <label for="password" class="field-label">Password</label>
            <div class="field-wrap">
              <span class="field-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </span>
              <input id="password" type="password" name="password"
                autocomplete="current-password" placeholder="Enter your password" class="field-input"/>
            </div>
            <p v-if="error" class="field-error">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"/>
              </svg>
              {{ error }}
            </p>
          </div>

          <!-- Submit -->
          <button type="submit" :disabled="isLoading" class="btn-signin">
            <span v-if="!isLoading">Sign in</span>
            <span v-else class="btn-loading">
              <svg fill="none" viewBox="0 0 24 24" class="spin-icon">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Signing in...
            </span>
          </button>
        </form>

        <p class="form-foot">© {{ new Date().getFullYear() }} {{ config.public.APP_NAME }}</p>
      </div>
    </div>

    <!-- Alert Wrapper -->
    <div id="alert-wrapper" class="fixed z-[9999] top-4 right-4 flex flex-col gap-2 max-w-sm"></div>
  </div>
</template>

<script>
  import { dataForm, setSess } from '~/utils/app_helper';
  import alertHelper from '~/utils/alert';

  export default {
    data: () => ({
      alert: null,
      error: '',
      isLoading: false,
      features: [
        'Enterprise-grade security & encryption',
        'Real-time collaboration and sync',
        'Scalable infrastructure for any team size',
      ]
    }),
    async mounted() {
      try {
        this.alert = await alertHelper();
      } catch (err) {
        console.error('Failed to initialize alert helper:', err);
      }
      this.initCanvas();
    },
    beforeUnmount() {
      if (this._raf) cancelAnimationFrame(this._raf);
      window.removeEventListener('resize', this._onResize);
    },
    methods: {
      initCanvas() {
        const canvas = this.$refs.bgCanvas;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        this._onResize = () => {
          canvas.width  = canvas.offsetWidth;
          canvas.height = canvas.offsetHeight;
        };
        this._onResize();
        window.addEventListener('resize', this._onResize);

        const pts = Array.from({ length: 55 }, () => ({
          x:  Math.random() * canvas.width,
          y:  Math.random() * canvas.height,
          r:  Math.random() * 1.2 + 0.4,
          vx: (Math.random() - 0.5) * 0.32,
          vy: (Math.random() - 0.5) * 0.32,
        }));

        const draw = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          for (let i = 0; i < pts.length; i++) {
            for (let j = i + 1; j < pts.length; j++) {
              const dx = pts[i].x - pts[j].x;
              const dy = pts[i].y - pts[j].y;
              const d  = Math.hypot(dx, dy);
              if (d < 130) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(4,176,192,${0.13 * (1 - d / 130)})`;
                ctx.lineWidth = 0.6;
                ctx.moveTo(pts[i].x, pts[i].y);
                ctx.lineTo(pts[j].x, pts[j].y);
                ctx.stroke();
              }
            }
          }

          for (const p of pts) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(4,176,192,0.5)';
            ctx.fill();
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height)  p.vy *= -1;
          }

          this._raf = requestAnimationFrame(draw);
        };
        draw();
      },
      async save_form() {
        if (this.isLoading) return;
        this.error = '';
        this.isLoading = true;
        try {
          const obj = dataForm('myForm');
          if (!obj.username || !obj.password) {
            this.error = 'Please enter both username and password';
            this.isLoading = false;
            return;
          }
          const res = await $fetch(`/api/main/login`, { method: 'post', body: obj });
          if (!res || !res.status) throw new Error(res ? JSON.stringify(res) : 'Empty response from server');
          if (res.status.code == 200) {
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
            if (this.alert) this.alert.success('Login successful! Redirecting...');
            setTimeout(() => { location.href = '/'; }, 500);
          } else {
            this.error = res.status.message || 'Login failed. Please try again.';
            this.isLoading = false;
            if (this.alert) this.alert.error(this.error);
          }
        } catch (err) {
          this.error = err.message || 'An error occurred. Please check your connection and try again.';
          this.isLoading = false;
          if (this.alert) this.alert.error(this.error);
        }
      }
    }
  }
</script>

<style scoped>
/* ── Root ── */
.login-root {
  min-height: 100vh;
  display: flex;
  overflow: hidden;
  background: #fff;
}

/* ── Left panel ── */
.panel-left {
  display: none;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  padding: 3.5rem;
  overflow: hidden;
  background: linear-gradient(145deg, #0a1628 0%, #112240 45%, #0d1f3c 100%);
}
@media (min-width: 1024px) {
  .panel-left { display: flex; width: 58%; }
}

/* Canvas */
.bg-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 48px 48px;
  animation: grid-drift 12s linear infinite;
}
@keyframes grid-drift {
  from { background-position: 0 0; }
  to   { background-position: 48px 48px; }
}

/* Glow blobs */
.glow-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  z-index: 2;
}
.glow-1 {
  top: -8%;  left: -8%;
  width: 420px; height: 420px;
  background: radial-gradient(circle, rgba(4,176,192,0.18) 0%, transparent 70%);
  animation: breathe-1 7s ease-in-out infinite;
}
.glow-2 {
  bottom: -8%; right: -5%;
  width: 340px; height: 340px;
  background: radial-gradient(circle, rgba(4,93,181,0.2) 0%, transparent 70%);
  animation: breathe-2 9s ease-in-out infinite;
}
@keyframes breathe-1 {
  0%, 100% { transform: scale(1)   translate(0, 0); opacity: 0.9; }
  50%       { transform: scale(1.2) translate(20px, 15px); opacity: 1; }
}
@keyframes breathe-2 {
  0%, 100% { transform: scale(1)   translate(0, 0); opacity: 0.9; }
  50%       { transform: scale(1.15) translate(-15px, -20px); opacity: 1; }
}

/* Rotating arc rings */
.geo-ring {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 3;
  top: 50%; left: 50%;
}
.ring-a {
  width: 520px; height: 520px;
  margin: -260px 0 0 -260px;
  border: 1px solid transparent;
  border-top-color:  rgba(4,176,192,0.25);
  border-right-color: rgba(4,176,192,0.08);
  animation: arc-spin 22s linear infinite;
}
.ring-b {
  width: 340px; height: 340px;
  margin: -170px 0 0 -170px;
  border: 1px solid transparent;
  border-bottom-color: rgba(4,93,181,0.28);
  border-left-color:   rgba(4,93,181,0.08);
  animation: arc-spin 15s linear infinite reverse;
}
.ring-c {
  width: 180px; height: 180px;
  margin: -90px 0 0 -90px;
  border: 1px solid transparent;
  border-top-color:  rgba(4,176,192,0.35);
  border-left-color: rgba(4,176,192,0.1);
  animation: arc-spin 10s linear infinite;
}
@keyframes arc-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* Logo */
.panel-logo {
  position: relative;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 10px;
}
.logo-icon {
  width: 36px; height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #04b0c0, #045db5);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.logo-icon-sm { width: 30px; height: 30px; border-radius: 8px; }
.icon-bolt { width: 18px; height: 18px; color: #fff; }
.logo-name {
  color: #fff;
  font-size: 1.0625rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}
.logo-name-dark { color: #1e293b; }

/* Hero */
.panel-hero {
  position: relative;
  z-index: 20;
  max-width: 480px;
}
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 13px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
  color: #04b0c0;
  background: rgba(4,176,192,0.12);
  border: 1px solid rgba(4,176,192,0.24);
  margin-bottom: 1.5rem;
}
.badge-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #04b0c0;
}
.hero-title {
  font-size: 2.625rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 1.25rem;
}
.hero-sub {
  font-size: 0.9375rem;
  color: #94a3b8;
  line-height: 1.7;
  margin-bottom: 2.5rem;
}

/* Feature list */
.feat-list { display: flex; flex-direction: column; gap: 12px; }
.feat-item {
  display: flex; align-items: center; gap: 10px;
  font-size: 0.875rem; color: #cbd5e1;
}
.feat-check {
  width: 20px; height: 20px;
  border-radius: 50%;
  background: rgba(4,176,192,0.16);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  color: #04b0c0;
}
.feat-check svg { width: 11px; height: 11px; }

.panel-foot {
  position: relative;
  z-index: 20;
  font-size: 0.75rem;
  color: #475569;
}

/* ── Right panel ── */
.panel-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  background: #fff;
}

.mobile-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 2.5rem;
  align-self: flex-start;
  width: 100%;
  max-width: 360px;
  margin-left: auto;
  margin-right: auto;
}
@media (min-width: 1024px) { .mobile-logo { display: none; } }

/* Form card */
.form-card { width: 100%; max-width: 360px; }

/* Brand block */
.form-brand {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 1.75rem;
}
.brand-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, #04b0c0 0%, #045db5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 18px rgba(4,93,181,0.28);
  flex-shrink: 0;
}
.brand-icon svg { width: 28px; height: 28px; }
/* When swapping to a custom image: <img src="..." class="brand-img" alt="logo"> */
.brand-img {
  width: 52px;
  height: 52px;
  object-fit: contain;
  border-radius: 14px;
}
.brand-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.025em;
}

.form-heading { margin-bottom: 2rem; }
.form-heading h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.02em;
  margin-bottom: 4px;
}
.form-heading p {
  font-size: 0.875rem;
  color: #64748b;
}

/* Fields */
.field-group { margin-bottom: 1.25rem; }
.field-label {
  display: block;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
}
.field-wrap { position: relative; }
.field-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  display: flex; align-items: center;
  pointer-events: none;
}
.field-icon svg { width: 16px; height: 16px; }
.field-input {
  width: 100%;
  padding: 10px 12px 10px 38px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #1e293b;
  background: #f8fafc;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
}
.field-input::placeholder { color: #c0ccda; }
.field-input:focus {
  border-color: #04b0c0;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(4,176,192,0.12);
}
.field-error {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 6px;
  font-size: 0.75rem;
  color: #ef4444;
}
.field-error svg { width: 13px; height: 13px; flex-shrink: 0; }

/* Button */
.btn-signin {
  width: 100%;
  padding: 11px;
  margin-top: 0.5rem;
  border-radius: 8px;
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  background: linear-gradient(135deg, #04b0c0 0%, #045db5 100%);
  box-shadow: 0 4px 14px rgba(4,93,181,0.28);
  transition: opacity 0.15s, transform 0.15s, box-shadow 0.15s;
}
.btn-signin:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(4,93,181,0.35);
}
.btn-signin:active:not(:disabled) { transform: translateY(0); }
.btn-signin:disabled { opacity: 0.55; cursor: not-allowed; }

.btn-loading {
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.spin-icon {
  width: 16px; height: 16px;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.form-foot {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.75rem;
  color: #94a3b8;
}

/* Form entrance */
.form-enter {
  animation: form-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes form-in {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
