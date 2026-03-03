<script setup>
  import { navTitle } from "~/stores/mystore";
  onMounted(()=>{ navTitle().name = 'Branch'; });
</script>

<template>
  <DataTable
    ref="xdt"
    title="Manage Branch"
    url="/api/master/branch/"
    :columns="columns"
    :order="false"
    modal-title="Branch"
    modal-icon="fa-solid fa-table"
    @save="onSave"
    @delete="onDelete"
  >
    <template #form>
      <div class="brf-section">
        <div class="brf-section-label">Details</div>
        <div class="brf-grid-2">
          <div class="brf-field">
            <label class="brf-label" for="branch_code">Branch Code</label>
            <input type="text" id="branch_code" name="branch_code" class="brf-input" />
          </div>
          <div class="brf-field">
            <label class="brf-label" for="region">Region</label>
            <input type="text" id="region" name="region" class="brf-input" />
          </div>
          <div class="brf-field">
            <label class="brf-label" for="lob">Lob</label>
            <input type="text" id="lob" name="lob" class="brf-input" />
          </div>
          <div class="brf-field">
            <label class="brf-label" for="name">Name</label>
            <input type="text" id="name" name="name" class="brf-input" />
          </div>
          <div class="brf-field">
            <label class="brf-label" for="email">Email</label>
            <input type="text" id="email" name="email" class="brf-input" />
          </div>
          <div class="brf-field">
            <label class="brf-label" for="phone">Phone</label>
            <input type="number" id="phone" name="phone" class="brf-input" />
          </div>
        </div>
      </div>
    </template>
  </DataTable>
</template>

<script>
  export default {
    data: () => ({
      alert: '',
      columns: [
        { label: 'Branch Code', field: 'branch_code' },
        { label: 'Region', field: 'region' },
        { label: 'Lob', field: 'lob' },
        { label: 'Name', field: 'name' },
        { label: 'Email', field: 'email' },
        { label: 'Phone', field: 'phone' },
        { label: 'Create By',   field: 'createBy' },
        { label: 'Create Date', field: 'createDate' },
        { label: 'Id',          field: '_id' },
      ],
    }),

    async mounted() {
      try {
        this.alert = await alert();
      } catch (error) {
        console.log(error);
      }
    },

    methods: {
      async onSave({ action, data }) {
        loading(true);
        try {
          const res = action === 'add'
            ? await call.post('/api/master/branch/', data)
            : await call.patch('/api/master/branch/' + data._id, data);
          res.status.code == 200
            ? this.alert.success('Saved successfully')
            : this.alert.error(res.status.message);
          this.$refs.xdt.reload();
          this.$refs.xdt.closeModal();
        } catch (err) {
          this.alert.error(err);
          this.$refs.xdt.closeModal();
        }
        loading(false);
      },

      async onDelete({ data }) {
        if (!confirm('Delete this record?')) return;
        loading(true);
        try {
          const res = await call.delete('/api/master/branch/' + data._id);
          res.status.code == 200
            ? this.alert.success('Deleted successfully')
            : this.alert.error(res.status.message);
          this.$refs.xdt.reload();
          this.$refs.xdt.closeModal();
        } catch (err) {
          this.alert.error(err);
          this.$refs.xdt.closeModal();
        }
        loading(false);
      },
    },
  }
</script>

<style scoped>
.brf-section       { margin-bottom: 1.5rem; }
.brf-section-label {
  display: block; font-size: 0.6875rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.09em; color: #94a3b8;
  border-bottom: 1px solid #f1f5f9; padding-bottom: 0.5rem; margin-bottom: 0.75rem;
}
.brf-grid-2 {
  display: grid; grid-template-columns: 1fr 1fr; gap: 0 1rem;
}
@media (max-width: 500px) { .brf-grid-2 { grid-template-columns: 1fr; } }
.brf-field { flex: 1; }
.brf-label {
  display: block; font-size: 0.6875rem; font-weight: 600;
  color: #64748b; margin-bottom: 0.3125rem; letter-spacing: 0.01em;
}
.brf-input {
  width: 100%; border: 1px solid #d1d5db; border-radius: 8px;
  padding: 0.4375rem 0.6875rem; font-size: 0.875rem; color: #0f172a;
  background: #fff; outline: none; transition: border-color 0.15s, box-shadow 0.15s;
}
.brf-input::placeholder { color: #cbd5e1; }
.brf-input:focus {
  border-color: #04b0c0; box-shadow: 0 0 0 3px rgba(4, 176, 192, 0.14);
}
</style>
