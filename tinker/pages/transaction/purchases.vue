<script setup>
  import { navTitle } from "~/stores/mystore";
  onMounted(()=>{ navTitle().name = 'Purchased Transactions'; });
</script>

<template>
  <div id="mytable"></div>

  <Modal id="myModal" title="Transaction data">
        <form id="myForm">
          <ol v-if="clickedval.trstatus==3"
            class="border-s-0 border-primary dark:border-primary md:flex md:justify-center md:gap-6 md:border-s-0 md:border-t-4">
            <!--First item-->
            <li>
              <div class="flex-start flex items-center justify-items-center pt-2 md:block md:pt-0">
                <div
                  class="-ms-[10px] me-3 h-[15px] w-[15px] rounded-full bg-primary dark:bg-primary md:-mt-[10px] md:me-0 md:ms-0"></div>
                  <button
                    type="button"
                    class="inline-block mt-2 rounded-full bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-200 focus:bg-primary-accent-200 focus:outline-none focus:ring-0 active:bg-primary-accent-200 motion-reduce:transition-none dark:bg-primary-300 dark:hover:bg-primary-400 dark:focus:bg-primary-400 dark:active:bg-primary-400">
                    <i class="fa-solid fa-shopping-cart fa-xl mr-2"></i>
                    Order
                  </button>
              </div>
              <div class="ms-4 mt-2 pb-5 md:ms-0">
                <p class="text-base italic text-neutral-500 dark:text-neutral-400 mb-4">{{ clickedval.createDate }}</p>
              </div>
            </li>

            <!--Second item-->
            <li>
              <div class="flex-start flex items-center justify-items-center pt-2 md:block md:pt-0">
                <div
                  class="-ms-[10px] me-3 h-[15px] w-[15px] rounded-full bg-primary dark:bg-primary md:-mt-[10px] md:me-0 md:ms-0"></div>
                  <button
                    type="button"
                    class="inline-block mt-2 rounded-full bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                    <i class="fa-solid fa-receipt fa-xl mr-2"></i>
                    Processed
                  </button>
              </div>
              <div class="ms-4 mt-2 pb-5 md:ms-0">
                <p class="text-base italic text-neutral-500 dark:text-neutral-400 mb-4">{{ clickedval.paymentdate }}</p>
              </div>
            </li>

            <!--Third item-->
            <li>
              <div class="flex-start flex items-center justify-items-center pt-2 md:block md:pt-0">
                <div
                  class="-ms-[10px] me-3 h-[15px] w-[15px] rounded-full bg-primary dark:bg-primary md:-mt-[10px] md:me-0 md:ms-0"></div>
                  <button
                    type="button"
                    class="inline-block mt-2 rounded-full bg-success px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-success-3 transition duration-150 ease-in-out hover:bg-success-accent-300 hover:shadow-success-2 focus:bg-success-accent-300 focus:shadow-success-2 focus:outline-none focus:ring-0 active:bg-success-600 active:shadow-success-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                    <i class="fa-solid fa-check fa-xl mr-2"></i>
                    Done
                  </button>
              </div>
              <div class="ms-4 mt-2 pb-5 md:ms-0">
                <p class="text-base italic text-neutral-500 dark:text-neutral-400 mb-4">{{ clickedval.closedate }}</p>
              </div>
            </li>
          </ol>
          <Input type="text" name="trannbr" label="Nomor Transaksi" :readonly="readonly" />
          <Input type="text" name="_id" label="Id" style="display:none;"/>
          <div class="mb-3 col-span-12 md:col-span-4 xl:col-span-4">
          <small>Tipe Pembayaran</small>
            <select v-model="clickedval.paytipe" data-te-select-init id="paytipe" name="paytipe">
              <option value="" >-</option>
              <option value="1" :selected="clickedval.paytipe == '1'">EDC</option>
              <option value="2" :selected="clickedval.paytipe == '2'">Cash</option>
              <option value="3" :selected="clickedval.paytipe == '3'">Virtual Account</option>
              <option value="4" :selected="clickedval.paytipe == '4'">QRIS</option>
            </select>
          </div>
          <Select class="hidden"></Select>
          <Input v-if="clickedval.paytipe!='2'" type="text" name="ref_number" label="Ref Number" />
          <Input type="text" name="branch" label="Branch" style="display:none;" />
          <Input type="text" label="Branch" :value=clickedval.buname :readonly="readonly" />
          <div v-if="clickedval && clickedval.detail" class="mt-6">
            <small>Items Details</small>
              <div v-for="(value, index) in clickedval.detail" class="mt-6 grid grid-cols-12 w-full p-3 rounded-lg border-solid border-2 border-grey-600">
                  <div class="col-span-8 flex">
                      <img class="h-32 w-20 object-cover rounded" :src="value.item.image" alt="cart image">
                      <div class="mx-3">
                          <h3 class="text-gray-600">{{ value.item.name }}</h3>
                          <span class="text-gray-600">Type : {{ value.item.type }}</span><br>
                          <span class="text-gray-700">Qty: {{ value.item.qty }}</span><br>
                          <span class="text-gray-600">Price : {{ curr(value.item.price) }}</span><br>
                          <span class="text-gray-600">Total : {{ curr(value.item.subtotal) }}</span>
                      </div>
                  </div>
              </div>
          </div>
          <Input type="number" name="subtotal" label="Subtotal" />
          <Input type="number" name="tax" label="Tax" />
          <Input type="number" name="total" label="Total" />
          <Input type="text" name="buyername" label="Buyer" :readonly="readonly" />
          <Input type="text" name="phone" label="Phone" :readonly="readonly" />
          <Input type="text" name="email" label="Email Buyer" :readonly="readonly" />
        </form>
        <div v-if="clickedval.trstatus!=3" class="flex flex-wrap items-center justify-end">
          <button v-if="clickedval.trstatus==1" type="button" class="ml-1 btn-primary" @click="save_form(2)">
            <i class="fa-solid fa-save fa-xl mr-2"></i>
            Process
          </button>
          <button v-else type="button" class="ml-1 btn-success" @click="save_form(3)">
            <i class="fa-solid fa-check fa-xl mr-2"></i>
            Mark as Complete
          </button>
          <button v-if="clickedval.trstatus==1" type="button" class="ml-1 btn-danger" @click="del_record()">
            <i class="fa-solid fa-close fa-xl mr-2"></i>
            Delete
          </button>
        </div>
      </Modal>
</template>

<script>
  export default {
    data:()=>({
      xdt:'',myModal:'',alert:'', clickedval:{}
    }),
    async mounted(){
      try {
        const { Select,Modal,initTE } = await import('tw-elements');
        initTE({ Modal });
        this.myModal = new Modal(document.getElementById('myModal'), {});
        this.alert = await alert();

        this.xdt = await datatable('mytable');
        this.xdt.init({
          title: 'Manage Transactions',
          url: `/api/transaction/purchases`,
          columns: [
            { label: 'Id', field: '_id' },
            { label: 'Transaction.no', field: 'trannbr' },
            { label: 'Ref. Number', field: 'ref_number' },
            { label: 'Branch', field: 'branch' },
            { label: 'Status', field: 'trstatus', format(el,val){
              let color; let text;
              const numVal = typeof val === 'string' ? parseInt(val) : val;
              switch (numVal) {
                case 1: color = 'primary'; text = 'Open'; break;
                case 2: color = 'warning'; text = 'Processed'; break;
                case 3: color = 'success'; text = 'Done'; break;
                default: color = ''; text = '-'; break;
              }
              el.innerHTML = `<span class="badge-${color} ml-2">${text}</span>`;
            } },
            { label:'Payment Type', field: 'paytipe', format(el,val){
              let color; let text;
              switch (val) {
                case '1': color = 'primary'; text = 'EDC'; break;
                case '2': color = 'primary'; text = 'Cash'; break;
                case '3': color = 'primary'; text = 'Virtual Account'; break;
                default: color = ''; text = '-'; break;
              }
              el.innerHTML = `<span class="badge-${color} ml-2">${text}</span>`;
            }},
            { label: 'Buyer Name', field: 'buyername' },
            { label: 'Email', field: 'email' },
            { label: 'Phone', field: 'phone' },
            { label: 'Create Date', field: 'createDate' },
            { label: 'Payment Date', field: 'paymentdate' },
            { label: 'Closed Date', field: 'closedate' },
            { label: 'Subtotal', field: 'subtotal' },
            { label: 'Tax', field: 'tax' },
            { label: 'Total', field: 'total' },
            { label: 'Detail', field: 'detail' },
          ],
          order:['createDate','desc'],
          onRowclick:(x)=>{
            this.clickedval = x;
            this.getbudata();
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
            res = await call.post(`/api/transaction/purchases`, obj);
          }else{
            res = await call.patch(`/api/transaction/purchases/${obj._id}`, obj);
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
            res = await call.delete(`/api/transaction/purchases/${obj._id}`);
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
      async getbudata(){
        try {
          let budata=await getBu(this.clickedval.branch);
          this.clickedval.buname=budata[0].name;
        } catch (err) {
          this.alert.error(err);
          this.myModal.toggle();
        }
      }
    }
  }
</script>