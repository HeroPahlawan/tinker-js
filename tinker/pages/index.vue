<script setup>
  import VueDatePicker from "@vuepic/vue-datepicker";
  import "@vuepic/vue-datepicker/dist/main.css";
  import InputAutocomplete from '../components/InputAutocomplete.vue';
</script>

<template>
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