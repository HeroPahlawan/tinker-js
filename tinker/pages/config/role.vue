<script setup>
  import { navTitle } from "~/stores/mystore";
  onMounted(()=>{ navTitle().name = 'Role'; });
</script>

<template>
  <div id="mytable"></div>

  <Modal id="myModal" title="Role data">
    <form id="myForm">
      <Input type="text" name="_id" label="Id" style="display:none;"/>
      <Input type="text" name="code" label="Code" />
      <Input type="text" name="name" label="name" />
      <p>Available menu</p>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full text-center text-sm font-light">
                <thead class="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" class="px-6 py-2">Menu</th>
                    <th scope="col" class="px-6 py-2">None</th>
                    <th scope="col" class="px-6 py-2">Read</th>
                    <th scope="col" class="px-6 py-2">Read & Write</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in flatMenu" :key="item.name">
                    <td class="text-left">{{ item.name }}</td>
                    <td>
                      <input v-if="item.link != '' "
                        class="relative -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                        type="radio" :name="item.link" :id="item.link+'-N'" value="N" />
                    </td>
                    <td>
                      <input v-if="item.link != '' "
                        class="relative -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                        type="radio" :name="item.link" :id="item.link+'-R'" value="R" />
                    </td>
                    <td>
                      <input v-if="item.link != '' "
                        class="relative -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                        type="radio" :name="item.link" :id="item.link+'-W'" value="W" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="flex flex-wrap items-center justify-end">
      <button type="button" class="ml-1 btn-primary" @click="save_form()">
        Submit
      </button>
    </div>
  </Modal>
</template>

<script>
  export default {
    data:()=>({
      xdt:'',myModal:'',alert:'',
      menuChoice: appcfg.roleMenu
    }),
    async mounted(){
      try {
        const { Modal,initTE } = await import('tw-elements');
        initTE({ Modal });
        this.myModal = new Modal(document.getElementById('myModal'), {});
        this.alert = await alert();

        this.xdt = await datatable('mytable');
        this.xdt.init({
          title: 'Manage Role',
          url: `/api/config/role`,
          columns: [
            { label: 'Code', field: 'code' },
            { label: 'Name', field: 'name' },
            { label: 'Id', field: '_id' },
            { label: 'Option', field: 'option' },
            { label: 'Create By', field: 'createBy' },
            { label: 'Create Date', field: 'createDate' },
            { label: 'Edit By', field: 'editBy' },
            { label: 'Edit Date', field: 'editDate' },
          ],
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
            //remove all checked radio first before initialization
            this.flatMenu.forEach((item) => {
              if(item.link!=''){
                let el = document.querySelectorAll(`[name="${item.link}"]`);
                el.forEach((x)=>{
                  x.checked = false;
                });
              }
            });

            for(const[k,v] of Object.entries(x)){
              let el = document.getElementById(k);
              if(el!=null){
                if(el.tagName == 'SELECT'){
                  Select.getInstance(el).setValue(v);
                }else{
                  el.value = v;
                }
              }
              if(typeof v === 'object'){
                for(const [x,y] of Object.entries(v)){
                  let el = document.getElementById(x+`-${y}`);
                  if(el!=null){
                    el.checked = true;
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
          obj.option = {}
          for(const [k,v] of Object.entries(obj)){
            if(k.startsWith('/')){
              obj.option[k] = v;
              delete obj[k];
            }
          }

          let res = '';
          if(obj._id == ""){
            res = await call.post(`/api/config/role`, obj);
          }else{
            res = await call.patch(`/api/config/role/${obj._id}`, obj);
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
      }
    },
    computed: {
      flatMenu() {
        const result = [];
        this.menuChoice.forEach((item) => {
          result.push({ name: item.name, link: item.link });
          if (item.submenu && item.submenu.length > 0) {
            item.submenu.forEach((subItem) => {
              result.push({ name: subItem.subname, link: subItem.sublink });
            });
          }
        });
        return result;
      },
    },
  }
</script>