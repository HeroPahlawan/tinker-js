<script setup>
  import { navTitle } from "~/stores/mystore";
  const startdate = ref(new Date());
  const enddate = ref(new Date());
  onMounted(()=>{ navTitle().name = 'Earnings Report'; });
</script>

<template>
  <div class="card font-medium">
    <div class="items-center justify-between p-6">
      <div class="flex items-center justify-between">
        <h1 class="text-lg mb-2">Earnings Report</h1>
      </div>
      <form id="myForm">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 md:col-span-6 xl:col-span-6">
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-12 md:col-span-6 xl:col-span-6">
                <small>Tanggal Keberangkatan</small>
                <vue-date-picker v-model="startdate" id="startDate" name="startDate" ></vue-date-picker>
              </div>
              <div class="col-span-12 md:col-span-6 xl:col-span-6">
                <small>Tanggal Pulang</small>
                <vue-date-picker v-model="enddate" id="endDate" name="endDate" ></vue-date-picker>
              </div>
            </div>
          </div>
        </div>

        <button type="button" class="btn-primary mt-5" @click="getData">
          Submit
        </button>
        <div v-if="outpdata != ''" id="App" class="hidden">
            <downloadexcel
              class="btn btn-success"
              :fetch= "fetchData()"
              :fields="json_fields"
              :before-generate = "startDownload()"
              :before-finish   = "finishDownload()"
            >
              Download Excel
            </downloadexcel> 
        </div>
      </form>
    </div>

    <div v-if="outpdata != ''" class="mt-5">
      <div>
        <h1 class="text-2xl">Laporan Konsolidasi</h1>
        <h3>Periode :</h3>
      </div>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-x-scroll">
              <table
                class="min-w-full text-left text-sm font-light text-surface dark:text-white">
                <thead
                  class="border-b border-neutral-200 bg-white font-medium dark:border-white/10 dark:bg-body-dark">
                  <tr>
                    <th scope="col" class="px-6 py-4">No Surat</th>
                    <th scope="col" class="px-6 py-4">Tgl Submit</th>
                    <th scope="col" class="px-6 py-4">Agenda</th>
                    <th scope="col" class="px-6 py-4">Nama</th>
                    <th scope="col" class="px-6 py-4">Origin</th>
                    <th scope="col" class="px-6 py-4">Destination</th>
                    <th scope="col" class="px-6 py-4">Start Date</th>
                    <th scope="col" class="px-6 py-4">End Date</th>
                    <th scope="col" class="px-6 py-4">Hotel</th>
                    <th scope="col" class="px-6 py-4">Tiket Berangkat</th>
                    <th scope="col" class="px-6 py-4">Tiket Pulang</th>
                    <th scope="col" class="px-6 py-4">Transportasi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in outpdata"
                    class="border-b border-neutral-200 bg-black/[0.02] dark:border-white/10">
                    <td class="whitespace-nowrap px-6 py-4">{{ item.no_surat }}</td>
                    <td class="whitespace-nowrap px-6 py-4">{{ item.date }}</td>
                    <td class="whitespace-nowrap px-6 py-4">{{ item.agenda }}</td>
                    <td class="whitespace-nowrap px-6 py-4">{{ item.name }}</td>
                    <td class="whitespace-nowrap px-6 py-4">{{ item.origin }}</td>
                    <td class="whitespace-nowrap px-6 py-4">{{ item.destination }}</td>
                    <td class="whitespace-nowrap px-6 py-4">{{ item.start_date }}</td>
                    <td class="whitespace-nowrap px-6 py-4">{{ item.end_date }}</td>
                    <td class="whitespace-nowrap px-6 py-4">{{ item.hotel_acc }}</td>
                    <td class="whitespace-nowrap px-6 py-4">{{ item.dep_acc }}</td>
                    <td class="whitespace-nowrap px-6 py-4">{{ item.arr_acc }}</td>
                    <td class="whitespace-nowrap px-6 py-4">{{ item.transport_acc }}</td>
                  </tr>
                  <tr class="border-b border-neutral-200 bg-black/[0.02] dark:border-white/10">
                    <td class="whitespace-nowrap px-6 py-4 text-xl" colspan="1"><b>Grand Total</b></td>
                    <td class="whitespace-nowrap px-6 py-4" colspan="7"></td>
                    <td class="whitespace-nowrap px-6 py-4 text-l" colspan="1" v-for="(item, index) in outpdata.g_total"><b>{{ item }}</b></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import downloadexcel from "vue-json-excel3";
  import dayjs from "dayjs";

  export default {
    name: "App",
    components: {
      downloadexcel,
    },
    data(){
      return {
        outpdata:[],
        json_fields: {
          "Complete name": "name",
          "No Surat":"no_surat",
          "Tgl Submit":"date",
          "Agenda":"agenda",
          "Nama":"name",
          "Origin":"origin",
          "Destination":"destination",
          "Start Date":"start_date",
          "End Date":"end_date",
          "Hotel":"hotel_acc",
          "Tiket Berangkat":"dep_acc",  
          "Tiket Pulang":"arr_acc",
          "transportasi":"transport_acc"
        }
      }
    },
    // data:()=>({
    //   outpdata:[]
    // }),
    async mounted(){
    },
    methods:{
      calctotal(){
        let val_total = {};let hotel=0;let dep_plane=0; arr_plane=0;
        this.outpdata.forEach(val => {
            hotel += parseFloat(val.hotel_acc);
            dep_plane += parseFloat(val.dep_acc);
            arr_plane += parseFloat(val.arr_acc);
        });
        val_total.hotel = hotel;val_total.dep_plane = dep_plane;val_total.arr_plane = arr_plane;
        this.outpdata.g_total=val_total;
      },
      async getData(){
        try {
          let data=dataForm('myForm');
          let params={
            date: {
              gte: data.startDate,
              lte: data.endDate
            }
          }
          //let book = await call.getbyparams(`/api/report/earnings/`, params);
          let book = await call.get(`/api/transaction/booking/`);
          this.outpdata = book.data['docs'];
          this.calctotal();
        } catch (error) {
          this.alert.error(error.message);
        }
      },
      async fetchData(){
        const response = await call.get(`/api/transaction/booking/`);
        return response.data['docs'];
      },
      startDownload(){
          alert('show loading');
      },
      finishDownload(){
          alert('hide loading');
      }
    },
    computed:{ 
    }
  }
</script>