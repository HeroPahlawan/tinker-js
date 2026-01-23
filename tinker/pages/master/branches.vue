<script setup>
  import { navTitle } from "~/stores/mystore";
  onMounted(()=>{ navTitle().name = 'Master Branches'; });
</script>

<template>
  <div id="mytable"></div>

  <Modal id="myModal" title="Branches data">
    <form id="myForm">
      <Input type="text" name="_id" label="Id" style="display:none;"/>
      <Input type="text" name="code" label="Alias" />
      <Input type="text" name="name" label="Nama" />
      <div class="col-span-12 md:col-span-12 xl:col-span-12" id="outlets" v-for="(input,k) in outlets" :key="k">
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-3 md:col-span-3 xl:col-span-3">
              <small>Kode Outlet</small>
              <input type="text" name="outletcode" class="w-full border-2 rounded-sm" v-model="input.outletcode" />
            </div>
            <div class="col-span-3 md:col-span-3 xl:col-span-3">
              <small>Lokasi</small>
              <input type="text" name="location" class="w-full border-2 rounded-sm" v-model="input.location" />
            </div>
              <span class="col-span-1 badge-danger h-5 m-auto" @click="removeoutlets(k)" v-show="k || ( !k && outlets.length > 1)"><i class="fa-solid fa-minus fa-xl"></i></span>
              <span class="col-span-1 badge-info h-5 m-auto" @click="addoutlets(k)" v-show="k == outlets.length-1"><i class="fa-solid fa-plus fa-xl"></i></span>
          </div> 
      </div>
      <Input type="email" name="email" label="e-mail" />
      <Input type="phone" name="phone" label="No.Telp" />
    </form>
    <div class="flex flex-wrap items-center justify-end">
      <button type="button" class="ml-1 btn-primary" @click="save_form()">
        <i class="fa-solid fa-save fa-xl mr-2"></i>
        Submit
      </button>
      <button type="button" class="ml-1 btn-danger" @click="del_record()">
        <i class="fa-solid fa-close fa-xl mr-2"></i>
        Delete
      </button>
    </div>
  </Modal>
</template>

<script>
  export default {
    data:()=>({
      xdt:'',myModal:'',alert:'',
      outlets: [{
        outletcode: '',
        location: ''
      }]
    }),
    async mounted(){
      try {
        const { Modal,initTE } = await import('tw-elements');
        initTE({ Modal });
        this.myModal = new Modal(document.getElementById('myModal'), {});
        this.alert = await alert();

        this.xdt = await datatable('mytable');
        this.xdt.init({
          title: 'Manage Branches',
          url: `/api/master/branches`,
          columns: [
            { label: 'Alias', field: 'code' },
            { label: 'Nama', field: 'name' },
            { label: 'e-mail', field: 'email' },
            { label: 'Phone', field: 'phone' },   
            { label: 'Create By', field: 'createBy' },
            { label: 'Create Date', field: 'createDate' },
            { label: 'Edit By', field: 'editBy' },
            { label: 'Edit Date', field: 'editDate' },
            { label: 'Id', field: '_id' },
            { label: 'Outlets', field: 'outlets' },
          ],
          order:['code','asc'],
          actions: [
            {label: '<i class="fa-solid fa-plus"></i>', onclick:()=>{
              for(const[k,v] of Object.entries(dataForm('myForm'))){
                let el = document.getElementById(k);
                if(el!=null){ document.getElementById(k).value = ''; }
              }
              this.myModal.toggle();
            }}
          ],
          onRowclick:(x)=>{
            for(const[k,v] of Object.entries(x)){
              let el = document.getElementById(k);
              if(el!=null){
                if(el.tagName == 'SELECT'){
                  Select.getInstance(el).setValue(v);
                }else{
                  el.value = v;
                }
                if(el.id == 'outlets'){
                  this.outlets = v;
                }else{
                  el.value = v;
                }
              }
            }
            this.myModal.toggle();
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    methods:{
      async save_form(){
        loading(true);
        try {
          let obj = dataForm('myForm');
          let res = '';
          obj.outlets=this.outlets;
          if(obj._id == ""){
            res = await call.post(`/api/master/branches`, obj);
          }else{
            res = await call.patch(`/api/master/branches/${obj._id}`, obj);
          }

          if(res.status.code == 200){
            this.alert.success('Save successfully');
          }else{
            this.alert.error(res.status.message);
          }
          this.xdt.reload();
          this.myModal.toggle();
        } catch (err) {
          this.alert.error(err);
          this.myModal.toggle();
        }
        loading(false);
      },
      async del_record(){
        if (confirm('Hapus data ?')) {
          loading(true);
          try {
            let obj = dataForm('myForm');
            let res = '';
            res = await call.delete(`/api/master/branches/${obj._id}`);
            if(res.status.code == 200){
              this.alert.success('Deleted successfully');
            }else{
              this.alert.error(res.status.message);
            }
            this.xdt.reload();
            this.myModal.toggle();
          } catch (err) {
            this.alert.error(err);
            this.myModal.toggle();
          }
          loading(false);
        }
      },
      addoutlets () {
        this.outlets.push({
            outletcode: '',
            location: ''
        });
      },
      removeoutlets (index) {
        this.types.splice(index, 1);
      },
      createInputFields(data) {
        const container = document.getElementById('outletsContainer');
        data.forEach(item => {
          const input = document.createElement('input');
          input.type = 'text';
          input.class = 'w-full border-2 rounded-sm';
          input.value = item;
          container.appendChild(input);
          container.appendChild(document.createElement('br'));
        });
      }
    }
  }
</script>