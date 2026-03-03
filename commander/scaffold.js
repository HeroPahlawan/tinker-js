/**
 * scaffold.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Tinker code-generator module.
 *
 * Given a table name from erd.json it produces:
 *   1. pages/{group}/{name}.vue          — DataTable + Modal CRUD page
 *   2. server/api/{group}/{name}/        — 5 Nitro route files (GET list,
 *                                          GET by id, POST, PATCH, DELETE)
 *   3. utils/appcfg.js                   — menu entry injection via
 *                                          [TINKER:SUBMENU:{group}] markers
 *
 * Table-name → group mapping
 *   m_xxx  →  master
 *   t_xxx  →  transaction
 *   r_xxx  →  report
 *   c_xxx  →  config
 *   other  →  main
 *
 * System tables (c_user, c_role) are skipped when scaffolding --all.
 * ─────────────────────────────────────────────────────────────────────────────
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ── Constants ─────────────────────────────────────────────────────────────────

const SYSTEM_TABLES = new Set(['c_user', 'c_role']);

const PREFIX_MAP = {
  m_: 'master',
  t_: 'transaction',
  r_: 'report',
  c_: 'config',
};

const GROUP_ICONS = {
  master:      'fa-solid fa-folder',
  transaction: 'fa-solid fa-shopping-cart',
  report:      'fa-solid fa-chart-bar',
  config:      'fa-solid fa-gear',
  main:        'fa-solid fa-house',
};

// ── Helpers ───────────────────────────────────────────────────────────────────

/** "branch_code" → "Branch Code" */
const toLabel = (s) =>
  s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

/**
 * Replace a marker comment line in `text`, preserving its leading indentation.
 *   Before:  {indent}// [TINKER:...]
 *   After:   {indent}{newLine}\n{indent}// [TINKER:...]
 */
const replaceMarkerLine = (text, markerText, newLine) => {
  const escaped = markerText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(
    new RegExp(`^([ \\t]*)${escaped}`, 'm'),
    (_, indent) => `${indent}${newLine}\n${indent}${markerText}`,
  );
};

/** ERD type → HTML input type */
const toInputType = (erdType) =>
  ({ String: 'text', Number: 'number', Boolean: 'checkbox', Date: 'date' }[erdType] ?? 'text');

/** "m_branch" → { group: "master", name: "branch" } */
const parseTable = (tableName) => {
  for (const [pfx, grp] of Object.entries(PREFIX_MAP)) {
    if (tableName.startsWith(pfx)) {
      return { group: grp, name: tableName.slice(pfx.length) };
    }
  }
  return { group: 'main', name: tableName };
};

// ── Vue page generator ────────────────────────────────────────────────────────

function genVuePage({ group, name, fields }) {
  const label   = toLabel(name);
  const apiPath = `/api/${group}/${name}/`;

  const columnsLines = Object.keys(fields)
    .map((f) => `        { label: '${toLabel(f)}', field: '${f}' },`)
    .join('\n');

  const formFields = Object.entries(fields)
    .map(([f, t]) =>
      [
        `          <div class="brf-field">`,
        `            <label class="brf-label" for="${f}">${toLabel(f)}</label>`,
        `            <input type="${toInputType(t)}" id="${f}" name="${f}" class="brf-input" />`,
        `          </div>`,
      ].join('\n')
    )
    .join('\n');

  const lines = [
    `<script setup>`,
    `  import { navTitle } from "~/stores/mystore";`,
    `  onMounted(()=>{ navTitle().name = '${label}'; });`,
    `</script>`,
    ``,
    `<template>`,
    `  <DataTable`,
    `    ref="xdt"`,
    `    title="Manage ${label}"`,
    `    url="${apiPath}"`,
    `    :columns="columns"`,
    `    :order="false"`,
    `    modal-title="${label}"`,
    `    modal-icon="fa-solid fa-table"`,
    `    @save="onSave"`,
    `    @delete="onDelete"`,
    `  >`,
    `    <template #form>`,
    `      <div class="brf-section">`,
    `        <div class="brf-section-label">Details</div>`,
    `        <div class="brf-grid-2">`,
    formFields,
    `        </div>`,
    `      </div>`,
    `    </template>`,
    `  </DataTable>`,
    `</template>`,
    ``,
    `<script>`,
    `  export default {`,
    `    data: () => ({`,
    `      alert: '',`,
    `      columns: [`,
    columnsLines,
    `        { label: 'Create By',   field: 'createBy' },`,
    `        { label: 'Create Date', field: 'createDate' },`,
    `        { label: 'Id',          field: '_id' },`,
    `      ],`,
    `    }),`,
    ``,
    `    async mounted() {`,
    `      try {`,
    `        this.alert = await alert();`,
    `      } catch (error) {`,
    `        console.log(error);`,
    `      }`,
    `    },`,
    ``,
    `    methods: {`,
    `      async onSave({ action, data }) {`,
    `        loading(true);`,
    `        try {`,
    `          const res = action === 'add'`,
    `            ? await call.post('${apiPath}', data)`,
    `            : await call.patch('${apiPath}/' + data._id, data);`,
    `          res.status.code == 200`,
    `            ? this.alert.success('Saved successfully')`,
    `            : this.alert.error(res.status.message);`,
    `          this.$refs.xdt.reload();`,
    `          this.$refs.xdt.closeModal();`,
    `        } catch (err) {`,
    `          this.alert.error(err);`,
    `          this.$refs.xdt.closeModal();`,
    `        }`,
    `        loading(false);`,
    `      },`,
    ``,
    `      async onDelete({ data }) {`,
    `        if (!confirm('Delete this record?')) return;`,
    `        loading(true);`,
    `        try {`,
    `          const res = await call.delete('${apiPath}/' + data._id);`,
    `          res.status.code == 200`,
    `            ? this.alert.success('Deleted successfully')`,
    `            : this.alert.error(res.status.message);`,
    `          this.$refs.xdt.reload();`,
    `          this.$refs.xdt.closeModal();`,
    `        } catch (err) {`,
    `          this.alert.error(err);`,
    `          this.$refs.xdt.closeModal();`,
    `        }`,
    `        loading(false);`,
    `      },`,
    `    },`,
    `  }`,
    `</script>`,
    ``,
    `<style scoped>`,
    `.brf-section       { margin-bottom: 1.5rem; }`,
    `.brf-section-label {`,
    `  display: block; font-size: 0.6875rem; font-weight: 700;`,
    `  text-transform: uppercase; letter-spacing: 0.09em; color: #94a3b8;`,
    `  border-bottom: 1px solid #f1f5f9; padding-bottom: 0.5rem; margin-bottom: 0.75rem;`,
    `}`,
    `.brf-grid-2 {`,
    `  display: grid; grid-template-columns: 1fr 1fr; gap: 0 1rem;`,
    `}`,
    `@media (max-width: 500px) { .brf-grid-2 { grid-template-columns: 1fr; } }`,
    `.brf-field { flex: 1; }`,
    `.brf-label {`,
    `  display: block; font-size: 0.6875rem; font-weight: 600;`,
    `  color: #64748b; margin-bottom: 0.3125rem; letter-spacing: 0.01em;`,
    `}`,
    `.brf-input {`,
    `  width: 100%; border: 1px solid #d1d5db; border-radius: 8px;`,
    `  padding: 0.4375rem 0.6875rem; font-size: 0.875rem; color: #0f172a;`,
    `  background: #fff; outline: none; transition: border-color 0.15s, box-shadow 0.15s;`,
    `}`,
    `.brf-input::placeholder { color: #cbd5e1; }`,
    `.brf-input:focus {`,
    `  border-color: #04b0c0; box-shadow: 0 0 0 3px rgba(4, 176, 192, 0.14);`,
    `}`,
    `</style>`,
    ``,
  ];

  return lines.join('\n');
}

// ── API route templates ───────────────────────────────────────────────────────
// All routes are identical pass-throughs regardless of table — the URL path
// carries all the information the backend needs.

const API_INDEX_GET = `\
import axios from "axios";
import appcfg from "@/utils/appcfg.js"
import { crypt } from "@/utils/app_helper.js";

export default defineEventHandler(async (event) => {
  try {
    let head = getHeaders(event);
    let sess = JSON.parse(crypt(atob(head[appcfg.realm])));
    let auth = { auth: { username:sess.username, password:sess.password } };
    let path = event.path.replace('/api','');
    let req = await axios.get(appcfg.apiUrl + path, auth);
    let res = req.data;
    return res;
  } catch (error) {
    return { status: { code:500, message: error.message } };
  }
})
`;

const API_INDEX_POST = `\
import axios from "axios";
import appcfg from "@/utils/appcfg.js";
import { crypt } from "@/utils/app_helper.js";

export default defineEventHandler(async (event) => {
  try {
    let head = getHeaders(event);
    let sess = JSON.parse(crypt(atob(head[appcfg.realm])));
    let body = await readBody(event);
    let path = event.path.replace('/api','');
    if ('_id' in body) { delete body._id; }
    const options = {
      method: 'POST',
      url: appcfg.apiUrl + path,
      auth: { username: sess.username, password: sess.password },
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000,
      data: body,
    };
    let req = await axios.request(options);
    let res = req.data;
    return res;
  } catch (error) {
    return { status: { code:500, message: error.message } };
  }
});
`;

const API_ID_GET = `\
import axios from "axios";
import appcfg from "@/utils/appcfg.js"
import { crypt } from "@/utils/app_helper.js";

export default defineEventHandler(async (event) => {
  try {
    let head = getHeaders(event);
    let sess = JSON.parse(crypt(atob(head[appcfg.realm])));
    let auth = { auth: { username:sess.username, password:sess.password } };
    let path = event.path.replace('/api','');
    let req = await axios.get(appcfg.apiUrl + path, auth);
    let res = req.data;
    return res;
  } catch (error) {
    return { status: { code:500, message: error.message } };
  }
})
`;

const API_ID_PATCH = `\
import axios from "axios";
import appcfg from "@/utils/appcfg.js";
import { crypt } from "@/utils/app_helper.js";

export default defineEventHandler(async (event) => {
  try {
    let head = getHeaders(event);
    let sess = JSON.parse(crypt(atob(head[appcfg.realm])));
    let body = await readBody(event);
    let path = event.path.replace('/api','');
    if ('_id' in body) { delete body._id; }
    const options = {
      method: 'PATCH',
      url: appcfg.apiUrl + path,
      auth: { username: sess.username, password: sess.password },
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000,
      data: body,
    };
    let req = await axios.request(options);
    let res = req.data;
    return res;
  } catch (error) {
    return { status: { code:500, message: error.message } };
  }
});
`;

const API_ID_DELETE = `\
import axios from "axios";
import appcfg from "@/utils/appcfg.js";
import { crypt } from "@/utils/app_helper.js";

export default defineEventHandler(async (event) => {
  try {
    let head = getHeaders(event);
    let sess = JSON.parse(crypt(atob(head[appcfg.realm])));
    let auth = { auth: { username: sess.username, password: sess.password } };
    let path = event.path.replace('/api','');
    let req = await axios.delete(appcfg.apiUrl + path, auth);
    let res = req.data;
    return res;
  } catch (error) {
    return { status: { code:500, message: error.message } };
  }
});
`;

// ── API controller generator ──────────────────────────────────────────────────

/**
 * Generate an Express controller for tinker_api.
 * Master tables have public GETs; all other groups require auth on every route.
 */
function genController({ group, name, tableName }) {
  const publicGet  = group === 'master';
  const getAuth    = publicGet ? '' : 'auth(), ';

  return `import { Router } from "express";
import crud from "../../model/crud.mjs";
import auth from "../../helper/auth_helper.mjs";
const route = Router();

export default (app) => {
  app.use('/${group}/${name}', route);
  const collection = '${tableName}';

  /* Get One */
  route.get("/:id", ${getAuth}async (req, res)=>{
    let d = await crud.getOne(collection,req.params.id);
    res.send(d);
  });

  /* Get All */
  route.get("/", ${getAuth}async (req, res)=>{
    let d = await crud.getAll(collection,req.query);
    res.send(d);
  });

  /* Insert */
  route.post("/", auth(), async (req, res)=>{
    let data = req.body;
    let d = await crud.insert(collection,data);
    res.send(d);
  });

  /* Update */
  route.patch("/:id", auth(), async (req, res)=>{
    let data = req.body;
    let d = await crud.update(collection,data,req.params.id);
    res.send(d);
  });

  /* Delete */
  route.delete("/:id", auth(), async (req, res)=>{
    let d = await crud.delete(collection,req.params.id);
    res.send(d);
  });

}
`;
}

// ── tinker_api index.mjs injection ───────────────────────────────────────────

/**
 * Register the new controller in tinker_api/index.mjs using [TINKER:CTRL:*] markers.
 *
 * Injection rules (mirrors injectMenu logic):
 *   - If the import path already exists → skip (idempotent).
 *   - If [TINKER:CTRL:{group}] exists → insert the import line before it.
 *   - If the group marker is absent but [TINKER:CTRL:END] exists → create the
 *     entire group block (comment header + import + marker) before the end marker.
 *
 * Returns { ok: boolean, message: string }
 */
function injectController(indexPath, group, name) {
  if (!fs.existsSync(indexPath)) {
    return { ok: false, message: `tinker_api/index.mjs not found at ${indexPath}` };
  }

  let content = fs.readFileSync(indexPath, 'utf8');
  const importPath = `'./controller/${group}/${name}.mjs'`;

  if (content.includes(importPath) || content.includes(`"./controller/${group}/${name}.mjs"`)) {
    return { ok: false, message: `controller/${group}/${name}.mjs already registered in index.mjs` };
  }

  const ctrlMarker = `// [TINKER:CTRL:${group}]`;
  const endMarker  = `// [TINKER:CTRL:END]`;
  const importLine = `import ${name} from ${importPath}; ${name}(app);`;

  if (content.includes(ctrlMarker)) {
    content = replaceMarkerLine(content, ctrlMarker, importLine);
  } else if (content.includes(endMarker)) {
    const groupBlock =
      `\n/* ${toLabel(group)} */\n` +
      `${importLine}\n` +
      `${ctrlMarker}\n` +
      endMarker;
    content = content.replace(endMarker, groupBlock);
  } else {
    return {
      ok: false,
      message: 'No [TINKER:CTRL:END] marker in tinker_api/index.mjs — add markers first (see README)',
    };
  }

  fs.writeFileSync(indexPath, content, 'utf8');
  return { ok: true };
}

// ── Menu injection ────────────────────────────────────────────────────────────

/**
 * Inject a menu entry into appcfg.js using [TINKER:SUBMENU:{group}] markers.
 *
 * Injection rules:
 *   - If the link already exists anywhere in the file → skip (idempotent).
 *   - If [TINKER:SUBMENU:{group}] exists → insert the new subname line before it.
 *   - If the group marker is absent but [TINKER:MENU:END] exists → create the
 *     entire group block before the end marker.
 *   - Same logic repeated for roleMenu using [TINKER:ROLEMENU:*] markers.
 *
 * Returns { ok: boolean, message: string }
 */
function injectMenu(appcfgPath, group, name) {
  if (!fs.existsSync(appcfgPath)) {
    return { ok: false, message: 'appcfg.js not found — skipping menu injection' };
  }

  let content = fs.readFileSync(appcfgPath, 'utf8');
  const label = toLabel(name);
  const link  = `/${group}/${name}/`;

  if (content.includes(`'${link}'`) || content.includes(`"${link}"`)) {
    return { ok: false, message: `"${link}" already present in appcfg.js` };
  }

  // ── menu[] ──────────────────────────────────────────────────────────────────
  const subMarker = `// [TINKER:SUBMENU:${group}]`;
  const endMarker = `// [TINKER:MENU:END]`;
  const subLine   = `{subname: '${label}', subicon: 'fa-regular fa-circle', sublink: '${link}'},`;

  if (content.includes(subMarker)) {
    content = replaceMarkerLine(content, subMarker, subLine);
  } else if (content.includes(endMarker)) {
    const icon       = GROUP_ICONS[group] ?? 'fa-solid fa-circle';
    const groupBlock =
      `    { name: '${toLabel(group)}', icon: '${icon}', link: '', submenu: [\n` +
      `      ${subLine}\n` +
      `      ${subMarker}\n` +
      `    ]},\n    ${endMarker}`;
    content = content.replace(endMarker, groupBlock);
  } else {
    return {
      ok: false,
      message: 'No [TINKER:MENU:END] marker found in appcfg.js — add markers first (see README)',
    };
  }

  // ── roleMenu[] ──────────────────────────────────────────────────────────────
  const roleSubMarker = `// [TINKER:ROLEMENU:${group}]`;
  const roleEndMarker = `// [TINKER:ROLEMENU:END]`;
  const roleSubLine   = `{subname: '${label}', sublink: '${link}'},`;

  if (content.includes(roleSubMarker)) {
    content = replaceMarkerLine(content, roleSubMarker, roleSubLine);
  } else if (content.includes(roleEndMarker)) {
    const groupBlock =
      `    { name: '${toLabel(group)}', link: '', submenu: [\n` +
      `      ${roleSubLine}\n` +
      `      ${roleSubMarker}\n` +
      `    ]},\n    ${roleEndMarker}`;
    content = content.replace(roleEndMarker, groupBlock);
  }

  fs.writeFileSync(appcfgPath, content, 'utf8');
  return { ok: true };
}

// ── Core scaffold function ────────────────────────────────────────────────────

/**
 * Scaffold a single table.
 *
 * @param {string} tableName  - Key from erd.json, e.g. "m_branch"
 * @param {string} projectRoot - Absolute path to the Nuxt project root
 * @returns {boolean} true if anything was generated
 */
function scaffoldOne(tableName, projectRoot) {
  const erdPath    = path.join(projectRoot, 'erd.json');
  const appcfgPath = path.join(projectRoot, 'utils', 'appcfg.js');

  if (!fs.existsSync(erdPath)) {
    console.error(`  ❌  erd.json not found at ${erdPath}`);
    process.exitCode = 1;
    return;
  }

  const erd = JSON.parse(fs.readFileSync(erdPath, 'utf8'));

  if (!erd[tableName]) {
    console.error(`  ❌  Table "${tableName}" not found in erd.json`);
    const available = Object.keys(erd).filter((k) => !SYSTEM_TABLES.has(k));
    console.log(`       Available: ${available.join(', ')}`);
    process.exitCode = 1;
    return;
  }

  const { group, name } = parseTable(tableName);
  const fields          = erd[tableName].structure ?? {};

  console.log(`\n  📦  ${tableName}  →  ${group}/${name}`);

  // ── 1. Vue page ─────────────────────────────────────────────────────────────
  const pageDir  = path.join(projectRoot, 'pages', group);
  const pageFile = path.join(pageDir, `${name}.vue`);

  if (fs.existsSync(pageFile)) {
    console.log(`  ⚠   Page already exists — skipped: pages/${group}/${name}.vue`);
  } else {
    fs.mkdirSync(pageDir, { recursive: true });
    fs.writeFileSync(pageFile, genVuePage({ group, name, fields }), 'utf8');
    console.log(`  ✅  Page created:       pages/${group}/${name}.vue`);
  }

  // ── 2. API routes ────────────────────────────────────────────────────────────
  const apiDir = path.join(projectRoot, 'server', 'api', group, name);

  if (fs.existsSync(apiDir)) {
    console.log(`  ⚠   API routes already exist — skipped: server/api/${group}/${name}/`);
  } else {
    fs.mkdirSync(apiDir, { recursive: true });
    fs.writeFileSync(path.join(apiDir, 'index.get.js'),   API_INDEX_GET,  'utf8');
    fs.writeFileSync(path.join(apiDir, 'index.post.js'),  API_INDEX_POST, 'utf8');
    fs.writeFileSync(path.join(apiDir, '[id].get.js'),    API_ID_GET,     'utf8');
    fs.writeFileSync(path.join(apiDir, '[id].patch.js'),  API_ID_PATCH,   'utf8');
    fs.writeFileSync(path.join(apiDir, '[id].delete.js'), API_ID_DELETE,  'utf8');
    console.log(`  ✅  API routes created: server/api/${group}/${name}/`);
  }

  // ── 3. Menu injection ────────────────────────────────────────────────────────
  const menuResult = injectMenu(appcfgPath, group, name);
  if (menuResult.ok) {
    console.log(`  ✅  Menu injected:      /${group}/${name}/  →  utils/appcfg.js`);
  } else {
    console.log(`  ⚠   Menu skipped:       ${menuResult.message}`);
  }

  // ── 4. tinker_api controller ─────────────────────────────────────────────────
  const apiRoot  = path.join(projectRoot, 'tinker_api');
  const ctrlDir  = path.join(apiRoot, 'controller', group);
  const ctrlFile = path.join(ctrlDir, `${name}.mjs`);

  if (!fs.existsSync(apiRoot)) {
    console.log(`  ⚠   tinker_api not found — skipping controller generation`);
  } else if (fs.existsSync(ctrlFile)) {
    console.log(`  ⚠   Controller exists — skipped: tinker_api/controller/${group}/${name}.mjs`);
  } else {
    fs.mkdirSync(ctrlDir, { recursive: true });
    fs.writeFileSync(ctrlFile, genController({ group, name, tableName }), 'utf8');
    console.log(`  ✅  Controller created:  tinker_api/controller/${group}/${name}.mjs`);
  }

  const indexPath  = path.join(apiRoot, 'index.mjs');
  const ctrlResult = injectController(indexPath, group, name);
  if (ctrlResult.ok) {
    console.log(`  ✅  Controller registered: /${group}/${name}  →  tinker_api/index.mjs`);
  } else {
    console.log(`  ⚠   Registration skipped:  ${ctrlResult.message}`);
  }
}

/**
 * Scaffold all eligible tables from erd.json (skips SYSTEM_TABLES).
 *
 * @param {string} projectRoot
 */
function scaffoldAll(projectRoot) {
  const erdPath = path.join(projectRoot, 'erd.json');

  if (!fs.existsSync(erdPath)) {
    console.error(`❌  erd.json not found at ${erdPath}`);
    process.exit(1);
  }

  const erd    = JSON.parse(fs.readFileSync(erdPath, 'utf8'));
  const tables = Object.keys(erd).filter((k) => !SYSTEM_TABLES.has(k));

  if (tables.length === 0) {
    console.log('ℹ   No eligible tables found in erd.json.');
    return;
  }

  console.log(`\nScaffolding ${tables.length} table(s): ${tables.join(', ')}`);
  tables.forEach((t) => scaffoldOne(t, projectRoot));
}

module.exports = { scaffoldOne, scaffoldAll, SYSTEM_TABLES };
