<script setup>
  import VueDatePicker from "@vuepic/vue-datepicker";
  import "@vuepic/vue-datepicker/dist/main.css";
  import InputAutocomplete from '../components/InputAutocomplete.vue';
</script>

<template>
<<<<<<< HEAD
=======
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 md:col-span-4 xl:col-span-4 mb-5">
          <CardImage icon="book" bgurl="/img/pendtrx.jpg" :title="pendtrx+` total Purchase`" content="Here is your total incoming booking"/>
        </div>
        <div class="col-span-12 md:col-span-4 xl:col-span-4 mb-5">
          <CardImage icon="list" bgurl="/img/proctrx.jpg" :title="proctrx+` total processed`" content="count of processed booking"/>
        </div>
        <div class="col-span-12 md:col-span-4 xl:col-span-4 mb-5">
          <CardImage icon="check" bgurl="/img/donetrx.jpg" :title="donetrx+` total done`" content="count of done booking"/>
        </div>
      </div>
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 md:col-span-6 xl:col-span-6 mb-5">
          <Card icon="wallet" bg="primary" :title="curr(grosscap)" content="Jumlah estimasi pendapatan dari transaksi belum dibayar" />
        </div>
        <div class="col-span-12 md:col-span-6 xl:col-span-6 mb-5">
          <Card icon="wallet" bg="primary" :title="curr(nettcap)" content="Estimasi pendapatan dari transaksi yang sudah dibayar" />
        </div>
      </div>
      <div v-if="trxs.data !== undefined" class="grid grid-cols-12 gap-4">
        <div class="col-span-12 md:col-span-4 xl:col-span-4 mb-5 block rounded-lg bg-white p-6 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white h-[500px]">
          <div class="flex flex-wrap mb-5">
            <i class='fa-solid fa-lg fa-book mt-4 mr-4' id='icon'></i>
            <h2 class="text-xl"><b>Pending Transactions</b></h2>
          </div>
          <div class="p-2 h-[400px] overflow-auto">
            <template v-if="pendingTransactions && pendingTransactions.length > 0">
              <div v-for="data in pendingTransactions" :key="data._id" class="block rounded-lg bg-danger p-6 text-white shadow-secondary-1 mb-3 cursor-pointer" @click="clicktrx(data)">
                <div class="flex flex-wrap items-center justify-between">
                  <i class='fa-solid fa-list pt-1' id='icon'></i>
                  <p class="text-base">Transaction : {{data.trannbr}}</p>
                </div>
                <div class="flex flex-wrap items-center justify-end">
                  <b class="text-base">| {{data.detail.length}} Products |</b>
                  <b>total: {{ curr(data.subtotal) }}</b>
                </div>
              </div>
            </template>
            <div v-else class="flex flex-col items-center justify-center h-full text-center px-4">
              <i class='fa-solid fa-inbox fa-4x text-gray-300 mb-4'></i>
              <h3 class="text-lg font-semibold text-gray-600 mb-2">No Pending Transactions</h3>
              <p class="text-sm text-gray-400">All orders have been processed or there are no new orders yet.</p>
            </div>
          </div>
        </div>
        <div class="col-span-12 md:col-span-4 xl:col-span-4 mb-5 block rounded-lg bg-white p-6 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white h-[500px]">
          <div class="flex flex-wrap mb-5">
            <i class='fa-solid fa-lg fa-list mt-4 mr-4' id='icon'></i>
            <h2 class="text-xl"><b>Processed Transactions</b></h2>
          </div>
          <div class="p-2 h-[400px] overflow-auto">
            <template v-if="processedTransactions && processedTransactions.length > 0">
              <div v-for="data in processedTransactions" :key="data._id" class="block rounded-lg bg-warning p-6 text-white shadow-secondary-1 mb-3 cursor-pointer" @click="clicktrx(data)">
                <div class="flex flex-wrap items-center justify-between">
                  <i class='fa-solid fa-list pt-1' id='icon'></i>
                  <p class="text-base">Transaction : {{data.trannbr}}</p>
                </div>
                <div class="flex flex-wrap items-center justify-end">
                  <b class="text-base">| {{data.detail.length}} Products |</b>
                  <b>total: {{ curr(data.subtotal) }}</b>
                </div>
              </div>
            </template>
            <div v-else class="flex flex-col items-center justify-center h-full text-center px-4">
              <i class='fa-solid fa-clock fa-4x text-gray-300 mb-4'></i>
              <h3 class="text-lg font-semibold text-gray-600 mb-2">No Processed Transactions</h3>
              <p class="text-sm text-gray-400">No transactions are currently being processed.</p>
            </div>
          </div>
        </div>
        <div class="col-span-12 md:col-span-4 xl:col-span-4 mb-5 block rounded-lg bg-white p-6 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white h-[500px]">
          <div class="flex flex-wrap mb-5">
            <i class='fa-solid fa-lg fa-check mt-4 mr-4' id='icon'></i>
            <h2 class="text-xl"><b>Done Transactions</b></h2>
          </div>
          <div class="p-2 h-[400px] overflow-auto">
            <template v-if="doneTransactions && doneTransactions.length > 0">
              <div v-for="data in doneTransactions" :key="data._id" class="block rounded-lg bg-success p-6 text-white shadow-secondary-1 mb-3 cursor-pointer" @click="clicktrx(data)">
                <div class="flex flex-wrap items-center justify-between">
                  <i class='fa-solid fa-list pt-1' id='icon'></i>
                  <p class="text-base">Transaction : {{data.trannbr}}</p>
                </div>
                <div class="flex flex-wrap items-center justify-end">
                  <b class="text-base">| {{data.detail.length}} Products |</b>
                  <b>total: {{ curr(data.subtotal) }}</b>
                </div>
              </div>
            </template>
            <div v-else class="flex flex-col items-center justify-center h-full text-center px-4">
              <i class='fa-solid fa-circle-check fa-4x text-gray-300 mb-4'></i>
              <h3 class="text-lg font-semibold text-gray-600 mb-2">No Completed Transactions</h3>
              <p class="text-sm text-gray-400">No transactions have been completed yet.</p>
            </div>
          </div>
        </div>
      </div>

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
>>>>>>> 2f1a13d40c318c734983f9a6b6598965e9d3e940
</template>

<script>
  import dayjs from "dayjs";
  export default {
    components: {
      VueDatePicker, InputAutocomplete
    },
    data() {
      return {};
    },
    async mounted(){
      navTitle().name = 'Home';
      try {
        const { Select,Modal,initTE } = await import('tw-elements');
        this.alert = await alert();
      } catch (error) {
        console.log(error);
      }
      this.render();
    },
    methods:{
      async render(){
        try {
          loading(true);
<<<<<<< HEAD
=======
          let checkouts={};let bucode='';
          if (getSess().branch=='PST') {
            checkouts = await call.getprmwoauth(`/api/transaction/checkout/?limit=500`);
          }else{
            bucode = await call.getwoauth(`/api/master/branches?code=${getSess().branch}`);
            checkouts = await call.getprmwoauth(`/api/transaction/checkout/?limit=500&branch=`+ `${bucode}`);
          }
          this.trxs = checkouts;
          this.pendtrx = this.trxs.data.docs.filter(doc => doc.trstatus === 1 || doc.trstatus === '1').length;
          this.proctrx = this.trxs.data.docs.filter(doc => doc.trstatus === 2 || doc.trstatus === '2').length;
          this.donetrx = this.trxs.data.docs.filter(doc => doc.trstatus === 3 || doc.trstatus === '3').length;
          this.grosscap = this.trxs.data.docs.reduce((sum, doc) => { return (doc.trstatus === 1 || doc.trstatus === '1') ? sum + parseInt(doc.subtotal) : sum; }, 0);
          this.nettcap = this.trxs.data.docs.reduce((sum, doc) => { return (doc.trstatus !== 1 && doc.trstatus !== '1') ? sum + parseInt(doc.subtotal): sum; }, 0);
>>>>>>> 2f1a13d40c318c734983f9a6b6598965e9d3e940
          loading(false);
        } catch (error) {
          loading(false);
          alert(error);
        }
      }
    },
    computed: {
      pendingTransactions() {
        if (!this.trxs.data || !this.trxs.data.docs) return [];
        return this.trxs.data.docs.filter(doc => doc.trstatus === 1 || doc.trstatus == '1');
      },
      processedTransactions() {
        if (!this.trxs.data || !this.trxs.data.docs) return [];
        return this.trxs.data.docs.filter(doc => doc.trstatus === 2 || doc.trstatus == '2');
      },
      doneTransactions() {
        if (!this.trxs.data || !this.trxs.data.docs) return [];
        return this.trxs.data.docs.filter(doc => doc.trstatus === 3 || doc.trstatus == '3');
      }
    }
  }
</script>