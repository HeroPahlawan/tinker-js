<script setup>
  import { navTitle } from "~/stores/mystore";
  onMounted(()=>{ navTitle().name = 'Master Inventory'; });
</script>

<template>
  <div id="mytable"></div>

  <Modal id="myModal" title="Inventory Data">
    <form id="myForm">
      <div class="grid grid-cols-12 gap-4">
        <Input type="text" name="_id" label="Id" style="display:none;"/>
        <Select name="branch" label="Cabang" class="col-span-12 md:col-span-12 xl:col-span-12" :list="dataList('branch')" />
        <Input type="text" name="name" label="Nama Item" class="col-span-12 md:col-span-12 xl:col-span-12" />
        <div class="col-span-12 md:col-span-12 xl:col-span-12" id="types" v-for="(input,k) in types" :key="k">
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-3 md:col-span-3 xl:col-span-3">
                <small>Tipe</small>
                <input type="text" name="type" class="w-full border-2 rounded-sm" v-model="input.type" />
              </div>
              <div class="col-span-3 md:col-span-3 xl:col-span-3">
                <small>Quantity</small>
                <input type="number" name="qty" class="w-full border-2 rounded-sm" v-model="input.qty" />
              </div>
              <div class="col-span-4 md:col-span-4 xl:col-span-4">
                <small>Price</small>
                <input type="number" name="price" class="w-full border-2 rounded-sm" v-model="input.price" />
              </div>
                <span class="col-span-1 badge-danger h-5 m-auto" @click="removetypes(k)" v-show="k || ( !k && types.length > 1)"><i class="fa-solid fa-minus fa-xl"></i></span>
                <span class="col-span-1 badge-info h-5 m-auto" @click="addtypes(k)" v-show="k == types.length-1"><i class="fa-solid fa-plus fa-xl"></i></span>
            </div> 
        </div>
        <Select name="tenant" label="Tenant" class="col-span-12 md:col-span-12 xl:col-span-12" :list="dataList('company')" />
        <Input type="text" name="category" label="Kategori" class="col-span-12 md:col-span-12 xl:col-span-12" />
        <TagInput v-model="tags" label="Tags (* enter to add)" desc="tuliskan kata-kata kunci untuk membantu pencarian produk" :modelValue="tags" class="col-span-12 md:col-span-12 xl:col-span-12 mt-20" />
        <Textarea type="textarea" name="desc" label="Description" class="col-span-12 md:col-span-12 xl:col-span-12" />
        <div class="col-span-12 md:col-span-12 xl:col-span-12 mb-3">
            <label for="formFile" class="mb-2 inline-block text-neutral-500 dark:text-neutral-400">Upload Image</label>
            <input class="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white  file:dark:text-white"
            type="file" id="file-upl" ref="file" @change="upload(event, upl_id)" />
        </div>
        <div class="col-span-12 md:col-span-12 xl:col-span-12 mb-3">
            <div v-if="upl_img && Array.isArray(upl_img) && upl_img.length > 0" class="w-full">
              <label class="mb-2 inline-block text-neutral-500 dark:text-neutral-400">Uploaded Images</label>
              <div class="grid grid-cols-12 gap-4">
                <div v-for="(item, index) in upl_img" :key="index" class="col-span-12 md:col-span-4 xl:col-span-4 mb-5">
                  <div class="relative">
                    <i class="fa-solid fa-circle-minus fa-xl text-red-500 hover:cursor-pointer absolute top-0 left-0 z-10" @click="delFile(event, index)"></i>
                    <img :src="`${appcfg.awsupl.bucketuri}img/${upl_id}/${item.filename}`" alt="upload-image" class="rounded-lg h-40 w-40 object-cover">
                  </div>
                </div>
              </div>
            </div>
        </div>
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
      xdt:'',myModal:'',alert:'',upl_id:'',upl_img:[], tags: [],
      types: [{
        type: '',
        qty: '',
        price: ''
      }]
    }),
    async mounted(){
      try {
        const { Select,Modal,initTE } = await import('tw-elements');
        initTE({ Modal });
        this.myModal = new Modal(document.getElementById('myModal'), {});
        this.alert = await alert();
        this.xdt = await datatable('mytable');
        this.xdt.init({
          title: 'List of Inventory',
          url: `/api/transaction/inventory`,
          payload: getSess().branch=='PST'?false:{ branch: getSess().branch },
          columns: [
            { label: 'Branch', field: 'branch' },
            { label: 'Nama Item', field: 'name' },
            { label: 'Tenant', field: 'tenant' },
            { label: 'Available Qty', field: 'total_qty' },
            { label: 'Price', field: 'price' },
            { label: 'Description', field: 'desc' },
            { label: 'Category', field: 'category' },
            { label: 'Tags', field: 'tags' },
            { label: 'Type', field: 'types' },
            { label: 'files', field: 'image' },
            { label: 'created by', field: 'createBy' },
            { label: 'created date', field: 'createDate' },
            { label: 'Id', field: '_id' }
          ],
          order: ['name','desc'],
          actions: [
            {label: '<i class="fa-solid fa-plus"></i>', onclick:()=>{
              // Reset all form fields
              for(const[k,v] of Object.entries(dataForm('myForm'))){
                let el = document.getElementById(k);
                if(el!=null){ el.value = ''; }
              }

              // Reset types array
              this.types = [{
                type: '',
                qty: '',
                price: ''
              }];

              // Reset tags array
              this.tags = [];

              // Reset image data
              this.upl_id = '';
              this.upl_img = [];

              // Clear file input
              const fileInput = document.getElementById('file-upl');
              if (fileInput) {
                fileInput.value = '';
              }

              this.myModal.toggle();
            }}
          ],
          onRowclick:(x)=>{
            console.log('Row clicked - Full data:', x); // Debug: see full row data

            // Reset form state
            this.upl_img = []; // Reset images first
            this.upl_id = ''; // Reset upload ID

            for(const[k,v] of Object.entries(x)){
              let el = document.getElementById(k);
              if(el!=null){
                if(el.tagName == 'SELECT'){
                  Select.getInstance(el).setValue(v);
                }else if(el.id == 'types'){
                  // Handle types array
                  this.types = v;
                }else{
                  // Set regular input values
                  el.value = v;
                }

                // Handle ID and tags
                if (el.id == '_id'){
                  this.upl_id=v;
                  this.tags.splice(0, this.tags.length);
                  if (x.tags && Array.isArray(x.tags)) {
                    x.tags.forEach(item =>{
                      this.tags.push(item);
                    });
                  }
                }
              }
            }

            // Handle images - moved outside el!=null check
            if (x.image && Array.isArray(x.image) && x.image.length > 0) {
              this.upl_img = x.image;
              console.log('Images loaded:', this.upl_img); // Debug log
            } else if (x.image && x.image != "-" && x.image != '') {
              // Handle case where image might be a single object
              this.upl_img = [x.image];
              console.log('Single image loaded:', this.upl_img); // Debug log
            } else {
              console.log('No images to display'); // Debug log
            }

            console.log('Modal data loaded - upl_id:', this.upl_id, 'upl_img:', this.upl_img); // Debug log

            // Clear file input
            const fileInput = document.getElementById('file-upl');
            if (fileInput) {
              fileInput.value = '';
            }

            this.myModal.toggle();
          }
        });
        const bodyElement = document.querySelector('body');
        if (!bodyElement.hasAttribute('data-te-modal-open')) {
          this.tags.length=0;
        }
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
          obj.types=this.types;
          obj.tags=this.tags; // Fixed: was obj.categories
          if(obj._id == ""){
            res = await call.post(`/api/transaction/inventory`, obj);
          }else{
            res = await call.patch(`/api/transaction/inventory/${obj._id}`, obj);
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
            res = await call.delete(`/api/transaction/inventory/${obj._id}`);
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
          formData.append("key", "img/"+id+"/"+fileName);
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
      async savefile(record){
        try{
          let sav = await call.put(`/api/transaction/inventory/${record._id}`, JSON.stringify(record));
          if (sav.status.code == 200){
            this.xdt.reload(); // Fixed: was this.render()
            this.alert.success('File Uploaded');
          }else{
            this.alert.error('File tidak tersimpan');
          }
        } catch(error) {
          loading(false);
          console.log(error.message);
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
            let res = await call.patch(`/api/transaction/inventory/${this.upl_id}`, data);
            if(res.status.code == 200){
              this.xdt.reload(); // Fixed: was this.render()
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
      },
      addtypes () {
        this.types.push({
            type: '',
            qty: '',
            price: ''
        });
      },
      removetypes (index) {
        this.types.splice(index, 1);
      }
    }
  }
</script>