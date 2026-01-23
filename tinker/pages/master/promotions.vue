<script setup>
  import { navTitle } from "~/stores/mystore";
  onMounted(()=>{ navTitle().name = 'Master Promotions'; });
</script>

<template>
  <div id="mytable"></div>

  <Modal id="myModal" title="Promotions data">
    <form id="myForm">
      <Input type="text" name="_id" label="Id" style="display:none;"/>
      <Select name="branch" label="Branch" :list="dataList('branch')" />
      <Input type="text" name="title" label="Judul" />
      <Input type="text" name="descr" label="Deskripsi" />
      <Input type="text" name="keyword" label="Keyword" />
      <div class="col-span-12 md:col-span-12 xl:col-span-12 mb-3">
          <label for="formFile" class="mb-2 inline-block text-neutral-500 dark:text-neutral-400">Upload Image</label>
          <input class="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white  file:dark:text-white"
          type="file" id="file-upl" ref="file" @change="upload(event, upl_id)" />
      </div>
      <div class="col-span-12 md:col-span-12 xl:col-span-12 mb-3">
        <span v-if="upl_img" :id="`showfile-upl`">
          <div class="grid grid-cols-12 gap-4">
            <div v-for="(item, index) in upl_img" class="col-span-12 mb-5">
              <i class="fa-solid fa-circle-minus fa-xl text-red-500 hover:cursor-pointer mt-4 mr-2" @click="delFile(event, index)"></i>
              <img :src="`${appcfg.awsupl.bucketuri}img/promos/${upl_id}/${item.filename}`" alt="upload-image" class="rounded-lg m-3 h-40 w-11/12 object-cover">
            </div>
          </div>
          <!-- <img :src="dataToRender.attachments" class="h-[30px] hover:cursor-pointer" @click="showImg"/> -->
        </span>
      </div>
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
  import dayjs from "dayjs";
  import axios from "axios";
  export default {
    data:()=>({
      xdt:'',myModal:'',alert:'',upl_id:'',upl_img:''
    }),
    async mounted(){
      try {
        const { Select,Modal,initTE } = await import('tw-elements');
        initTE({ Modal });
        this.myModal = new Modal(document.getElementById('myModal'), {});
        this.alert = await alert();

        this.xdt = await datatable('mytable');
        this.xdt.init({
          title: 'Manage Promotions',
          url: `/api/master/promotions`,
          columns: [
            { label: 'Id', field: '_id' },
            { label: 'Branch', field: 'branch' },
            { label: 'Title', field: 'title' },
            { label: 'Description', field: 'descr' },
            { label: 'Keyword', field: 'keyword' },
            { label: 'Create Date', field: 'createDate' },
            { label: 'Create By', field: 'createBy' },
            { label: 'Img File', field: 'image' }
          ],
          order:['createDate','desc'],
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

                if (el.id == '_id'){
                  this.upl_id=v;
                }
                if (x.image != "-") {
                  if (x.image != ''){
                    this.upl_img=x.image;
                  }
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
            res = await call.post(`/api/master/promotions`, obj);
          }else{
            res = await call.patch(`/api/master/promotions/${obj._id}`, obj);
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
      async savefile(record){
        try{
          let sav = await call.put(`/api/master/promotions/${record._id}`, JSON.stringify(record));
          if (sav.status.code == 200){
            this.render();
            this.alert.success('File Uploaded');
          }else{
            this.alert.error('File tidak tersimpan');
          }
        } catch(error) {
          loading(false);
          console.log(error.message);
        }
      },
      async upload(event, id){
        if (id==''){
          this.alert.error('Save data terlebih dahulu!');
          document.getElementById(`file-upl`).innerHTML='';
        }else{
          loading(true);
          var formData = new FormData();
          let record = {};
          record.image = {};
          const file = document.getElementById(`file-upl`).files[0];
          const fileName = `Inshopper-${dayjs().format('YYYYMMDDHHmmss')}.jpg`;
          record._id = id;
          record.image['filename'] = fileName;
          formData.append("expirations", appcfg.awsupl.expirations);
          formData.append("key", "img/promos/"+id+"/"+fileName);
          formData.append("Content-Type", file.type);
          formData.append("success_action_redirect", "https://inshopper-storage.s3.ap-southeast-3.amazonaws.com/upload-success.html");
          formData.append("file", file);
          try {
            let res = axios.post('https://inshopper-storage.s3.ap-southeast-3.amazonaws.com/', formData, {
                headers: {
                  'Accept':'*/*',
                  'Content-Type': 'multipart/form-data',
                  'Access-Control-Allow-Origin' : '*'
                }
            }).then((result) => {
              if(result.status == 200){
                this.savefile(record);
              }else{
                this.alert.error(res.status.message);
              }
            });
            loading(false);
          } catch(error) {
            loading(false);
            console.log(error.message);
          }
        }
      },
      async delFile(event, index){
        try {
          this.upl_img.forEach((x,i) => {
            if(i == index){
              this.upl_img.splice(index, 1);
            }
          });
          let data = {};
          data.image = this.upl_img;
          if(confirm('Delete file?')){
            let res = await call.patch(`/api/master/promotions/${this.upl_id}`, data);
            if(res.status.code == 200){
              this.alert.success('File Removed');
            }else{
              this.alert.error(res.status.message);
            }
          }
          loading(false);
        } catch(error) {
          loading(false);
          console.log(error.message);
        }
      },
      dataList(item){
        let obj = [];
        for(const [k,v] of Object.entries(dataStorage(item))){
          obj.push({value:k, label:v});
        }
        return obj;
      }
    }
  }
</script>