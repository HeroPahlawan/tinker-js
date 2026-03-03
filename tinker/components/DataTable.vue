<script setup>
/**
 * DataTable Component
 * ─────────────────────────────────────────────────────────────────────────────
 * Combines the datatable() table with an integrated Modal form.
 *
 * Props
 *   title      {String}         Table heading shown in the toolbar.
 *   url        {String}         API endpoint, e.g. "/api/master/branches".
 *   columns    {Array}          Column definitions: [{ label, field }]
 *   order      {Array|Boolean}  Default sort: ['fieldName', 'asc'|'desc'] or false.
 *   addable    {Boolean}        Show the + button (default true).
 *   limit      {Number}         Max records fetched per request (default 500).
 *   modalTitle {String}         Modal header title (falls back to `title`).
 *   modalIcon  {String}         Font Awesome class for modal header icon badge,
 *                               e.g. "fa-solid fa-code-branch".
 *   modalSize  {String}         Modal width preset: 'sm' | 'md' | 'lg' | 'xl'
 *                               Defaults to 'md'.
 *
 * Slot
 *   #form   – Place plain <input>/<select>/<textarea> fields here.
 *             The _id hidden field is always injected automatically —
 *             do NOT add a second _id field in your slot.
 *
 * Emits
 *   open({ action, data })
 *     Fired before the modal opens.
 *     action = 'add'  – + button clicked; form will be cleared.
 *     action = 'edit' – row clicked; form will be filled with row data.
 *     data            – the full row object (null on 'add').
 *     Use this to restore Vue-reactive or complex fields (e.g. arrays).
 *
 *   save({ action, data })
 *     Fired when Save Changes is clicked.
 *     data  – flat key/value object of all named inputs in the form.
 *     After your API call succeeds, call:
 *       this.$refs.xdt.reload()
 *       this.$refs.xdt.closeModal()
 *
 *   delete({ data })
 *     Fired when Delete is clicked. data._id holds the record ID.
 *     After your API call succeeds, call reload() + closeModal().
 *
 * Exposed (via ref)
 *   reload()      – Reload table data.
 *   update(param) – Merge new options and reload.
 *   closeModal()  – Close the modal (call after a successful save/delete).
 *
 * ─── Usage ────────────────────────────────────────────────────────────────────
 *
 *   <DataTable
 *     ref="xdt"
 *     title="Manage Branches"
 *     url="/api/master/branches"
 *     :columns="columns"
 *     :order="['code', 'asc']"
 *     modal-title="Branch"
 *     modal-icon="fa-solid fa-code-branch"
 *     modal-size="lg"
 *     @open="onOpen"
 *     @save="onSave"
 *     @delete="onDelete"
 *   >
 *     <template #form>
 *       <label>Name</label>
 *       <input type="text" name="name" />
 *     </template>
 *   </DataTable>
 *
 *   methods: {
 *     onOpen({ action, data }) {
 *       // restore Vue-reactive fields (e.g. arrays) before modal renders
 *       this.items = action === 'edit' ? data.items : [];
 *     },
 *     async onSave({ action, data }) {
 *       data.items = this.items;
 *       const res = action === 'add'
 *         ? await call.post('/api/...', data)
 *         : await call.patch(`/api/.../${data._id}`, data);
 *       if (res.status.code == 200) this.alert.success('Saved');
 *       this.$refs.xdt.reload();
 *       this.$refs.xdt.closeModal();
 *     },
 *     async onDelete({ data }) {
 *       if (!confirm('Delete?')) return;
 *       await call.delete(`/api/.../${data._id}`);
 *       this.$refs.xdt.reload();
 *       this.$refs.xdt.closeModal();
 *     },
 *   }
 * ─────────────────────────────────────────────────────────────────────────────
 */

const props = defineProps({
  title:      { type: String,           default: '' },
  url:        { type: String,           required: true },
  columns:    { type: Array,            required: true },
  order:      { type: [Array, Boolean], default: false },
  addable:    { type: Boolean,          default: true },
  limit:      { type: Number,           default: 500 },
  modalTitle: { type: String,           default: null },
  modalIcon:  { type: String,           default: null },
  modalSize:  { type: String,           default: 'md' },
});

const emit = defineEmits(['open', 'save', 'delete']);

// Unique IDs per instance — supports multiple DataTables on the same page.
const tableId       = `dtk-${Math.random().toString(36).slice(2, 9)}`;
const formId        = `${tableId}-form`;
const modalRef      = ref(null);
const currentAction = ref('add');

let _xdt = null;

/* ── Form helpers ─────────────────────────────────────────────────────────── */

const getForm = () => document.getElementById(formId);

/**
 * Clear every input / textarea / select inside the internal form.
 * Called after the modal is open (nextTick) so the DOM exists.
 */
const clearForm = () => {
  const form = getForm();
  if (!form) return;
  form.querySelectorAll('input, textarea, select').forEach((el) => {
    if (el.type === 'checkbox' || el.type === 'radio') el.checked = false;
    else el.value = '';
  });
};

/**
 * Fill inputs from a row object.
 * Skips object/array values (parent handles them via @open).
 * Matches by [name] attribute first, then falls back to [id].
 */
const fillForm = (row) => {
  const form = getForm();
  if (!form) return;
  for (const [k, v] of Object.entries(row)) {
    const el =
      form.querySelector(`[name="${k}"]`) ??
      form.querySelector(`#${CSS.escape(k)}`);
    if (!el) continue;
    el.value = v != null && typeof v !== 'object' ? v : '';
  }
};

/* ── Modal triggers ───────────────────────────────────────────────────────── */

/**
 * Open modal for a new record.
 * Emits @open first so parent can reset reactive fields, then clears the form.
 */
const openAdd = async () => {
  currentAction.value = 'add';
  emit('open', { action: 'add', data: null });
  modalRef.value?.open();
  await nextTick(); // wait for modal DOM to mount before clearing
  clearForm();
};

/**
 * Open modal for an existing record.
 * Emits @open first so parent can restore reactive/array fields,
 * then fills plain inputs after DOM is ready.
 */
const openEdit = async (row) => {
  currentAction.value = 'edit';
  emit('open', { action: 'edit', data: row });
  modalRef.value?.open();
  await nextTick(); // wait for modal DOM to mount before filling
  fillForm(row);
};

/* ── Save / Delete ────────────────────────────────────────────────────────── */

/**
 * Collect all named form fields and emit @save.
 * Parent is responsible for the API call and calling closeModal() on success.
 */
const onSave = () => {
  const form = getForm();
  if (!form) return;
  const data = {};
  form.querySelectorAll('[name]').forEach((el) => { data[el.name] = el.value; });
  emit('save', { action: currentAction.value, data });
};

/**
 * Collect form fields and emit @delete.
 * Parent shows confirm dialog and handles the API call.
 */
const onDelete = () => {
  const form = getForm();
  if (!form) return;
  const data = {};
  form.querySelectorAll('[name]').forEach((el) => { data[el.name] = el.value; });
  emit('delete', { data });
};

/* ── Exposed API ──────────────────────────────────────────────────────────── */

defineExpose({
  reload:     ()      => _xdt?.reload(),
  update:     (param) => _xdt?.update(param),
  closeModal: ()      => modalRef.value?.close(),
});

/* ── Mount ────────────────────────────────────────────────────────────────── */

onMounted(async () => {
  _xdt = await datatable(tableId);

  const initOptions = {
    title:      props.title,
    url:        props.url,
    columns:    props.columns,
    order:      props.order,
    limit:      props.limit,
    onRowclick: (row) => openEdit(row),
  };

  if (props.addable) {
    initOptions.actions = [{
      label:   '<i class="fa-solid fa-plus"></i>',
      onclick: openAdd,
    }];
  }

  _xdt.init(initOptions);
});
</script>

<template>
  <!-- ── Table render target ──────────────────────────────────────────────── -->
  <div :id="tableId" />

  <!-- ── Integrated modal ─────────────────────────────────────────────────── -->
  <Modal
    ref="modalRef"
    :title="modalTitle ?? title"
    :icon="modalIcon"
    :size="modalSize"
  >
    <!--
      The form element is owned by DataTable so save/delete can read it.
      _id is always present as a hidden field — pages do NOT add a second _id.
      All other fields come through the #form slot.
    -->
    <form :id="formId" autocomplete="off">
      <input type="hidden" name="_id" value="" />
      <slot name="form" />
    </form>

    <!-- Footer is outside <form> so buttons don't trigger native form submit -->
    <div class="dtk-modal-footer">
      <button type="button" class="dtk-modal-btn dtk-modal-btn--danger" @click="onDelete">
        <i class="fa-solid fa-trash-can"></i>
        Delete
      </button>
      <button type="button" class="dtk-modal-btn dtk-modal-btn--primary" @click="onSave">
        <i class="fa-solid fa-floppy-disk"></i>
        Save Changes
      </button>
    </div>
  </Modal>
</template>

<style scoped>
/* ── Modal footer ────────────────────────────────────────────────────────── */
.dtk-modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1.125rem;
  margin-top: 0.75rem;
  border-top: 1px solid #f1f5f9;
}

.dtk-modal-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4375rem;
  padding: 0.5625rem 1.25rem;
  border-radius: 10px;
  font-size: 0.8125rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: opacity 0.15s, transform 0.1s, box-shadow 0.15s;
}
.dtk-modal-btn:hover  { opacity: 0.88; }
.dtk-modal-btn:active { transform: scale(0.97); }

.dtk-modal-btn--primary {
  background: linear-gradient(135deg, #04b0c0 0%, #0284c7 100%);
  color: #fff;
  box-shadow: 0 4px 14px rgba(4, 176, 192, 0.35);
}
.dtk-modal-btn--primary:hover {
  opacity: 1;
  box-shadow: 0 6px 18px rgba(4, 176, 192, 0.45);
}

.dtk-modal-btn--danger {
  background: transparent;
  color: #dc2626;
  border: 1.5px solid #fca5a5;
}
.dtk-modal-btn--danger:hover {
  background: #fff5f5;
  border-color: #f87171;
  opacity: 1;
}
</style>
