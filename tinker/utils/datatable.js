import alert from './alert.js';

/*
 * ── DATATABLE STYLE INJECTION ─────────────────────────────────────────────────
 * Injected once into <head>. Override .dtk-wrap CSS custom properties in your
 * global stylesheet to retheme without touching this file:
 *
 *   .dtk-wrap { --dtk-accent: #6366f1; --dtk-accent-2: #8b5cf6; }
 * ─────────────────────────────────────────────────────────────────────────────
 */
const injectStyles = () => {
  if (document.getElementById('dtk-injected-styles')) return;
  const s = document.createElement('style');
  s.id = 'dtk-injected-styles';
  s.textContent = `
/* ── Theme tokens ── */
.dtk-wrap {
  --dtk-accent:      #04b0c0;
  --dtk-accent-2:    #045db5;
  --dtk-accent-soft: rgba(4,176,192,0.1);
  --dtk-accent-ring: rgba(4,176,192,0.2);
  --dtk-bg:          #ffffff;
  --dtk-border:      #e2e8f0;
  --dtk-text:        #1e293b;
  --dtk-text-muted:  #64748b;
  --dtk-row-hover:   #f8fafc;
  --dtk-stripe:      #fafafa;
  --dtk-header-bg:   #f8fafc;
  --dtk-radius:      12px;
  --dtk-shadow:      0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.05);
}

/* ── Wrapper card ── */
.dtk-wrap {
  background: var(--dtk-bg);
  border: 1px solid var(--dtk-border);
  border-radius: var(--dtk-radius);
  box-shadow: var(--dtk-shadow);
  overflow: hidden;
}

/* ── Toolbar ── */
.dtk-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--dtk-border);
  flex-wrap: wrap;
}
.dtk-toolbar-left  { display: flex; align-items: center; gap: 10px; min-width: 0; }
.dtk-toolbar-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; flex-wrap: wrap; }

.dtk-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--dtk-text);
  letter-spacing: -0.01em;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Filter toggle button */
.dtk-filter-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 12px;
  border: 1px solid var(--dtk-border);
  border-radius: 8px;
  background: transparent;
  color: var(--dtk-text-muted);
  font-size: 0.8125rem; font-weight: 500;
  cursor: pointer;
  transition: background 0.14s, border-color 0.14s, color 0.14s;
  white-space: nowrap;
}
.dtk-filter-btn:hover,
.dtk-filter-btn--active {
  background: var(--dtk-accent-soft);
  border-color: var(--dtk-accent);
  color: var(--dtk-accent);
}
.dtk-filter-btn i { font-size: 12px; }

/* Action buttons */
.dtk-action-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 14px;
  border-radius: 8px; border: none;
  background: linear-gradient(135deg, var(--dtk-accent) 0%, var(--dtk-accent-2) 100%);
  color: #fff;
  font-size: 0.8125rem; font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 8px var(--dtk-accent-ring);
  transition: opacity 0.14s, transform 0.14s, box-shadow 0.14s;
  white-space: nowrap;
}
.dtk-action-btn:hover  { opacity: 0.88; transform: translateY(-1px); box-shadow: 0 4px 14px var(--dtk-accent-ring); }
.dtk-action-btn:active { transform: translateY(0); }

/* ── Filter panel ── */
.dtk-filter-panel {
  border-bottom: 1px solid var(--dtk-border);
  background: var(--dtk-stripe);
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.24s ease, padding 0.24s ease;
  padding: 0 20px;
}
.dtk-filter-panel--open { max-height: 140px; padding: 14px 20px; }

.dtk-filter-inner { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

.dtk-filter-select {
  height: 34px; padding: 0 8px;
  border: 1px solid var(--dtk-border); border-radius: 7px;
  background: white; color: var(--dtk-text);
  font-size: 0.8125rem; outline: none; cursor: pointer; min-width: 130px;
  transition: border-color 0.14s, box-shadow 0.14s;
}
.dtk-filter-select:focus { border-color: var(--dtk-accent); box-shadow: 0 0 0 3px var(--dtk-accent-ring); }

.dtk-filter-input {
  height: 34px; padding: 0 10px;
  border: 1px solid var(--dtk-border); border-radius: 7px;
  background: white; color: var(--dtk-text);
  font-size: 0.8125rem; outline: none; min-width: 150px; flex: 1;
  transition: border-color 0.14s, box-shadow 0.14s;
}
.dtk-filter-input:focus { border-color: var(--dtk-accent); box-shadow: 0 0 0 3px var(--dtk-accent-ring); }
.dtk-filter-input::placeholder { color: #c0ccda; }

.dtk-filter-apply {
  height: 34px; padding: 0 14px;
  border-radius: 7px; border: none;
  background: var(--dtk-accent); color: #fff;
  font-size: 0.8125rem; font-weight: 500; cursor: pointer;
  transition: opacity 0.14s; white-space: nowrap;
}
.dtk-filter-apply:hover { opacity: 0.85; }

/* Active filter badges */
.dtk-badges { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.dtk-badge {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 3px 8px 3px 10px; border-radius: 999px;
  background: var(--dtk-accent-soft); color: var(--dtk-accent);
  font-size: 0.75rem; font-weight: 500;
  border: 1px solid rgba(4,176,192,0.22);
}
.dtk-badge-remove {
  display: inline-flex; align-items: center; justify-content: center;
  width: 16px; height: 16px; border-radius: 50%;
  border: none; background: transparent; color: inherit;
  cursor: pointer; font-size: 11px; padding: 0; opacity: 0.7;
  transition: opacity 0.12s, background 0.12s;
}
.dtk-badge-remove:hover { opacity: 1; background: rgba(4,176,192,0.2); }

/* ── Table overrides (tw-elements Datatable output) ── */
.dtk-table-wrap { width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }

/* Top controls row (entries select + search input) */
.datatables > div:first-child {
  display: flex !important; align-items: center !important;
  justify-content: space-between !important; gap: 12px !important;
  padding: 14px 20px 10px !important; flex-wrap: wrap !important;
}
/* "Show N entries" area */
.datatables > div:first-child > div:first-child {
  font-size: 0.8125rem !important; color: var(--dtk-text-muted) !important;
  display: flex !important; align-items: center !important; gap: 6px !important;
}
.datatables > div:first-child > div:first-child select {
  height: 30px !important; padding: 0 8px !important;
  border: 1px solid var(--dtk-border) !important; border-radius: 6px !important;
  font-size: 0.8125rem !important; color: var(--dtk-text) !important;
  background: white !important; outline: none !important;
  cursor: pointer !important; box-shadow: none !important;
}
.datatables > div:first-child > div:first-child select:focus {
  border-color: var(--dtk-accent) !important;
}

/* Search input */
.datatables > div:first-child input[type="search"],
.datatables > div:first-child input[type="text"] {
  height: 34px !important; padding: 0 12px 0 34px !important;
  border: 1px solid var(--dtk-border) !important; border-radius: 8px !important;
  font-size: 0.8125rem !important; color: var(--dtk-text) !important;
  background: white url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='%2394a3b8' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.15z'/%3E%3C/svg%3E") no-repeat 10px center / 15px 15px !important;
  outline: none !important; min-width: 180px !important;
  transition: border-color 0.14s, box-shadow 0.14s !important; box-shadow: none !important;
}
.datatables > div:first-child input[type="search"]:focus,
.datatables > div:first-child input[type="text"]:focus {
  border-color: var(--dtk-accent) !important;
  box-shadow: 0 0 0 3px var(--dtk-accent-ring) !important;
}

/* Table */
.datatables table { width: 100% !important; border-collapse: collapse !important; font-size: 0.875rem !important; }

/* Header */
.datatables thead tr { background: var(--dtk-header-bg) !important; border-bottom: 2px solid var(--dtk-border) !important; }
.datatables thead th {
  padding: 11px 16px !important;
  font-size: 0.75rem !important; font-weight: 600 !important;
  color: var(--dtk-text-muted) !important;
  text-transform: uppercase !important; letter-spacing: 0.04em !important;
  white-space: nowrap !important; text-align: left !important;
  border: none !important; cursor: pointer !important; user-select: none !important;
  transition: color 0.12s !important;
}
.datatables thead th:hover { color: var(--dtk-accent) !important; }

/* Body */
.datatables tbody tr {
  border-bottom: 1px solid var(--dtk-border) !important;
  transition: background 0.1s !important; cursor: pointer !important;
}
.datatables tbody tr:last-child   { border-bottom: none !important; }
.datatables tbody tr:hover        { background: var(--dtk-row-hover) !important; }
.datatables tbody tr:nth-child(even) { background: var(--dtk-stripe) !important; }
.datatables tbody tr:nth-child(even):hover { background: var(--dtk-row-hover) !important; }

.datatables tbody td {
  padding: 11px 16px !important; color: var(--dtk-text) !important;
  border: none !important; vertical-align: middle !important;
  max-width: 220px !important; overflow: hidden !important;
  text-overflow: ellipsis !important; white-space: nowrap !important;
}
/* Empty / loading state */
.datatables tbody td[colspan] {
  text-align: center !important; padding: 40px 16px !important;
  color: var(--dtk-text-muted) !important; font-size: 0.875rem !important;
  white-space: normal !important; max-width: none !important;
}

/* Bottom bar */
.datatables > div:last-child {
  display: flex !important; align-items: center !important;
  justify-content: space-between !important;
  padding: 12px 20px !important; border-top: 1px solid var(--dtk-border) !important;
  flex-wrap: wrap !important; gap: 10px !important;
  background: var(--dtk-header-bg) !important;
}
.datatables > div:last-child > div:first-child {
  font-size: 0.8125rem !important; color: var(--dtk-text-muted) !important;
}
/* Pagination */
.datatables > div:last-child ul,
.datatables > div:last-child nav ul {
  display: flex !important; align-items: center !important;
  gap: 4px !important; list-style: none !important; margin: 0 !important; padding: 0 !important;
}
.datatables > div:last-child ul li button,
.datatables > div:last-child ul li a,
.datatables > div:last-child nav ul li button,
.datatables > div:last-child nav ul li a {
  display: inline-flex !important; align-items: center !important; justify-content: center !important;
  min-width: 32px !important; height: 32px !important; padding: 0 8px !important;
  border-radius: 7px !important; border: 1px solid var(--dtk-border) !important;
  background: white !important; color: var(--dtk-text-muted) !important;
  font-size: 0.8125rem !important; font-weight: 500 !important;
  cursor: pointer !important; transition: background 0.12s, border-color 0.12s, color 0.12s !important;
  text-decoration: none !important; box-shadow: none !important;
}
.datatables > div:last-child ul li button:hover,
.datatables > div:last-child ul li a:hover,
.datatables > div:last-child nav ul li button:hover,
.datatables > div:last-child nav ul li a:hover {
  background: var(--dtk-accent-soft) !important;
  border-color: var(--dtk-accent) !important; color: var(--dtk-accent) !important;
}
.datatables > div:last-child ul li.active button,
.datatables > div:last-child ul li.active a,
.datatables > div:last-child nav ul li.active button,
.datatables > div:last-child nav ul li.active a {
  background: var(--dtk-accent) !important;
  border-color: var(--dtk-accent) !important; color: white !important;
}
.datatables > div:last-child ul li.disabled button,
.datatables > div:last-child ul li.disabled a,
.datatables > div:last-child nav ul li.disabled button,
.datatables > div:last-child nav ul li.disabled a {
  opacity: 0.4 !important; cursor: not-allowed !important;
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .dtk-toolbar { padding: 12px 14px; gap: 8px; }
  .dtk-filter-panel--open { max-height: 220px; }
  .datatables > div:first-child { padding: 12px 14px 8px !important; }
  .datatables > div:first-child input[type="search"],
  .datatables > div:first-child input[type="text"] { min-width: 120px !important; }
  .datatables thead th { padding: 9px 10px !important; font-size: 0.6875rem !important; }
  .datatables tbody td { padding: 9px 10px !important; font-size: 0.8125rem !important; max-width: 140px !important; }
  .datatables > div:last-child { padding: 10px 14px !important; }
}
  `;
  document.head.appendChild(s);
};

/* ── Main datatable factory ─────────────────────────────────────────────────── */
const te_table = async (el) => {
  const { Datatable, initTE } = await import('tw-elements');
  initTE({ Datatable }, { allowReinits: true });
  const myAlert = await alert();

  injectStyles();

  var state;
  var TBL = {
    option: {
      title: '', url: '', actions: false, columns: [], onRowclick: false,
      limit: 500, perPage: 10, order: false,
      filtered: {}, search: '', payload: false, customRender: false
    },

    init: (param) => {
      TBL.option = Object.assign(TBL.option, param);
      TBL.createHeader();
      state = new Datatable(
        document.getElementById(`render-${el}`),
        { columns: TBL.option.columns },
        {
          loading: true,
          clickableRows: true,
          entries: TBL.option.perPage,
          entriesOptions: [5, 10, 20, 50, 100],
          loadingMessage: 'Loading data...',
          noFoundMessage: 'No data found',
          sortField: TBL.option.order[0] ?? '',
          sortOrder: TBL.option.order[1] ?? ''
        }
      );
      TBL.fetchData();
    },

    update: (param) => {
      TBL.option = Object.assign(TBL.option, param);
      TBL.fetchData();
    },

    createHeader: () => {
      document.getElementById(el).innerHTML = `
        <div class="dtk-wrap">

          <!-- Toolbar -->
          <div class="dtk-toolbar">
            <div class="dtk-toolbar-left">
              <button class="dtk-filter-btn" id="dtk-filter-btn-${el}" type="button" title="Toggle filters">
                <i class="fa-solid fa-sliders"></i>
                <span>Filter</span>
              </button>
              <h3 class="dtk-title">${TBL.option.title}</h3>
            </div>
            <div class="dtk-toolbar-right">
              <div id="actions-wrapper-${el}" style="display:flex;gap:6px;flex-wrap:wrap;"></div>
            </div>
          </div>

          <!-- Filter panel (pure CSS max-height transition, no tw-elements Collapse) -->
          <div class="dtk-filter-panel" id="tablefilter-${el}">
            <div class="dtk-filter-inner">
              <select class="dtk-filter-select" id="filterSelect-${el}"></select>
              <input type="text" class="dtk-filter-input" id="filterValue-${el}" placeholder="Enter filter value…" />
              <button class="dtk-filter-apply" id="btn-search-${el}" type="button">
                <i class="fa-solid fa-magnifying-glass" style="margin-right:5px;font-size:11px;"></i>Apply
              </button>
              <div id="badge-wrapper-${el}" class="dtk-badges"></div>
            </div>
          </div>

          <!-- Table render target (scrollable on mobile) -->
          <div class="dtk-table-wrap">
            <div id="render-${el}" class="datatables"></div>
          </div>

        </div>
      `;

      // Pure-JS filter toggle — no tw-elements Collapse needed
      const filterBtn   = document.getElementById(`dtk-filter-btn-${el}`);
      const filterPanel = document.getElementById(`tablefilter-${el}`);
      filterBtn.addEventListener('click', () => {
        const open = filterPanel.classList.toggle('dtk-filter-panel--open');
        filterBtn.classList.toggle('dtk-filter-btn--active', open);
      });
    },

    fetchData: async (reload = false) => {
      state.update({}, { loading: true });
      let uri = TBL.option.url;
      TBL.option.filtered['limit'] = TBL.option.limit;
      TBL.option.search = new URLSearchParams(TBL.option.filtered).toString();
      uri += '?' + TBL.option.search;
      if (TBL.option.payload) {
        uri += '&' + new URLSearchParams(TBL.option.payload).toString();
      }
      call.get(uri).then(d => {
        try {
          if (d.status.code == 200) {
            state.update({
              rows: d.data.docs.map((mapp) => {
                let obj = { ...mapp };
                if (TBL.option.customRender) {
                  Object.assign(obj, TBL.option.customRender(mapp));
                }
                return obj;
              }),
            }, { loading: false });
            TBL.render(reload);
          } else {
            myAlert.error(d.status.message);
            state.update({}, { loading: false });
          }
        } catch (error) {
          myAlert.error(error.message);
        }
      });
    },

    reload: () => {
      TBL.fetchData(true);
    },

    addFilter: () => {
      const col = document.getElementById(`filterSelect-${el}`).value;
      const val = document.getElementById(`filterValue-${el}`).value;
      TBL.option.filtered[col] = val;
      TBL.option.search = new URLSearchParams(TBL.option.filtered).toString();
      TBL.fetchData(true);
    },

    delFilter: (key) => {
      delete TBL.option.filtered[key];
      TBL.option.search = new URLSearchParams(TBL.option.filtered).toString();
      TBL.fetchData(true);
    },

    render: (reload = false) => {
      if (reload) {
        // Re-render active filter badges
        document.getElementById(`badge-wrapper-${el}`).innerHTML = '';
        for (const [k, v] of Object.entries(TBL.option.filtered)) {
          if (k === 'limit') continue;
          const badgeId = `badge-${el}-${k}`;
          document.getElementById(`badge-wrapper-${el}`).insertAdjacentHTML('beforeend', `
            <span class="dtk-badge">
              <button type="button" class="dtk-badge-remove" id="${badgeId}" title="Remove filter">
                <i class="fa-solid fa-xmark"></i>
              </button>
              <span>${k}: ${v}</span>
            </span>
          `);
          (function (key) {
            document.getElementById(`badge-${el}-${key}`).addEventListener('click', () => {
              TBL.delFilter(key);
            });
          })(k);
        }
      } else {
        // Wire up filter apply button and Enter key
        document.getElementById(`btn-search-${el}`).onclick = () => TBL.addFilter();
        document.getElementById(`filterValue-${el}`).addEventListener('keydown', (e) => {
          if (e.key === 'Enter') TBL.addFilter();
        });

        // Populate filter column dropdown
        TBL.option.columns.forEach((x) => {
          document.getElementById(`filterSelect-${el}`).insertAdjacentHTML(
            'beforeend',
            `<option value="${x.field}">${x.label}</option>`
          );
        });

        // Render action buttons
        if (TBL.option.actions) {
          TBL.option.actions.forEach((x, i) => {
            const id = btoa(x.label) + el;
            document.getElementById(`actions-wrapper-${el}`).insertAdjacentHTML('beforeend', `
              <button type="button" id="${id}" class="dtk-action-btn">${x.label}</button>
            `);
            document.getElementById(id).addEventListener('click', () => {
              TBL.option.actions[i].onclick(x.onclick);
            });
          });
        }

        // Row click handler
        if (TBL.option.onRowclick) {
          document.getElementById(`render-${el}`).addEventListener('rowClick.te.datatable', (e) => {
            TBL.option.onRowclick(e.row);
          });
        }
      }
    }
  };

  return TBL;
};

export default te_table;
