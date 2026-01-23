<script setup>
  import { navTitle } from "~/stores/mystore";
  onMounted(()=>{ navTitle().name = 'Master Companies'; });
</script>

<template>
  <div id="mytable"></div>

  <Modal id="myModal" title="Companies data">
    <form id="myForm">
      <Input type="text" name="_id" label="Id" style="display:none;"/>
      <Input type="text" name="name" label="Nama" />
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
      xdt:'',myModal:'',alert:''
    }),
    async mounted(){
      try {
        const { Modal,initTE } = await import('tw-elements');
        initTE({ Modal });
        this.myModal = new Modal(document.getElementById('myModal'), {});
        this.alert = await alert();

        this.xdt = await datatable('mytable');
        this.xdt.init({
          title: 'Manage Companies',
          url: `/api/master/company/`,
          columns: [
            { label: 'Nama', field: 'name' },
            { label: 'e-mail', field: 'email' },
            { label: 'Phone', field: 'phone' },   
            { label: 'Create By', field: 'createBy' },
            { label: 'Create Date', field: 'createDate' },
            { label: 'Edit By', field: 'editBy' },
            { label: 'Edit Date', field: 'editDate' },
            { label: 'Id', field: '_id' },
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
          if(obj._id == ""){
            res = await call.post(`/api/master/company/`, obj);
          }else{
            res = await call.patch(`/api/master/company/${obj._id}`, obj);
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
            res = await call.delete(`/api/master/company/${obj._id}`);
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
      }
    }
  }
</script>